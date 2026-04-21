const {
  RankCardBuilder,
  Font,
  Builder,
  JSX,
  loadImage,
  LeaderboardBuilder,
} = require("canvacord");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const axios = require("axios");
const { PassThrough } = require("stream");

ffmpeg.setFfmpegPath(ffmpegPath);
Font.loadDefault();

// ---------- Custom Greetings Card ----------
class GreetingsCard extends Builder {
  constructor() {
    super(930, 280);
    this.bootstrap({
      displayName: "",
      type: "welcome",
      avatar: "",
      message: "",
    });
  }
  setDisplayName(value) { this.options.set("displayName", value); return this; }
  setType(value)        { this.options.set("type", value);        return this; }
  setAvatar(value)      { this.options.set("avatar", value);      return this; }
  setMessage(value)     { this.options.set("message", value);     return this; }

  async render() {
    const { type, displayName, avatar, message } = this.options.getOptions();
    const image = await loadImage(avatar || "https://cdn.discordapp.com/embed/avatars/0.png");
    return JSX.createElement(
      "div",
      { className: "h-full w-full flex flex-col items-center justify-center bg-[#23272A] rounded-xl" },
      JSX.createElement(
        "div",
        { className: "px-6 bg-[#2B2F35AA] w-[96%] h-[84%] rounded-lg flex items-center" },
        JSX.createElement("img", { src: image.toDataURL(), className: "flex h-24 w-24 rounded-full mr-6" }),
        JSX.createElement(
          "div",
          { className: "flex flex-col" },
          JSX.createElement(
            "h1",
            { className: "text-5xl text-white font-bold m-0" },
            type === "welcome" ? "Welcome" : "Goodbye", ", ",
            JSX.createElement("span", { className: "text-blue-500" }, displayName || "User", "!")
          ),
          JSX.createElement(
            "p",
            { className: "text-gray-300 text-3xl m-0 mt-2" },
            message || (type === "welcome" ? "Thanks for joining!" : "See you later!")
          )
        )
      )
    );
  }
}

// ---------- Helpers ----------
function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

/**
 * Konversi stream ke WebP dengan prioritas animated (bergerak)
 * @param {Stream} inputStream
 * @param {object} opts
 * @param {number} opts.quality - 0–100
 * @param {number} opts.fps     - frame per second (0 = ikuti asli)
 * @param {number} opts.width   - lebar output px (0 = gunakan 512)
 * @returns {Promise<Buffer>}
 */
async function _runConvertToWebP(inputStream, { quality, fps = 0, width = 0 }) {
  const targetWidth = width > 0 ? width : 512;
  
  // Helper untuk menjalankan ffmpeg dengan encoder dan opsi tertentu
  const runEncoder = (encoder, extraOptions = [], inputOptions = [], filterChain = null) => {
    return new Promise((resolve, reject) => {
      const outStream = new PassThrough();
      const chunks = [];
      outStream.on("data", chunk => chunks.push(chunk));
      outStream.on("end", () => resolve(Buffer.concat(chunks)));
      outStream.on("error", reject);

      // Bangun filter jika tidak diberikan
      let finalFilter = filterChain;
      if (!finalFilter) {
        const filters = [];
        if (fps > 0) filters.push(`fps=${fps}`);
        filters.push(`scale=${targetWidth}:-2:flags=lanczos`);
        finalFilter = filters.join(",");
      }

      let command = ffmpeg(inputStream)
        .inputOptions([
          "-analyzeduration 10M",
          "-probesize 10M",
          ...inputOptions
        ])
        .videoFilter(finalFilter)
        .outputOptions([
          `-c:v ${encoder}`,
          `-quality ${quality}`,
          "-loop 0",
          "-vsync 1",          // sinkronisasi frame lebih baik
          "-pix_fmt yuv420p",
          "-an",
          ...extraOptions
        ])
        .format("webp");

      if (encoder === "libwebp_anim") {
        command = command.outputOptions(["-g 1"]); // keyframe setiap frame
      }

      command.on("error", reject).pipe(outStream, { end: true });
    });
  };

  // Validasi header WebP
  const isValidWebP = (buf) => {
    return buf.length > 20 &&
           buf.toString("utf8", 0, 4) === "RIFF" &&
           buf.toString("utf8", 8, 12) === "WEBP";
  };

  // --- Strategi 1: coba animated dengan repair timestamp ---
  try {
    const result = await runEncoder("libwebp_anim", [], ["-fflags", "+genpts+igndts"]);
    if (isValidWebP(result)) return result;
    throw new Error("Header WebP tidak valid");
  } catch (err) {
    console.warn(`[convert] libwebp_anim dengan repair gagal: ${err.message}`);
  }

  // --- Strategi 2: coba animated dengan FPS rendah (5) ---
  if (fps === 0 || fps > 5) {
    try {
      const lowFpsFilters = [`fps=5`, `scale=${targetWidth}:-2:flags=lanczos`].join(",");
      const resultLow = await runEncoder("libwebp_anim", [], ["-fflags", "+genpts+igndts"], lowFpsFilters);
      if (isValidWebP(resultLow)) {
        console.log(`[convert] Berhasil dengan fps=5 (animated)`);
        return resultLow;
      }
    } catch (err) {
      console.warn(`[convert] libwebp_anim fps=5 gagal: ${err.message}`);
    }
  }

  // --- Strategi 3: coba animated dengan FPS sangat rendah (3) ---
  try {
    const veryLowFpsFilters = [`fps=3`, `scale=${targetWidth}:-2:flags=lanczos`].join(",");
    const resultVeryLow = await runEncoder("libwebp_anim", [], ["-fflags", "+genpts+igndts"], veryLowFpsFilters);
    if (isValidWebP(resultVeryLow)) {
      console.log(`[convert] Berhasil dengan fps=3 (animated)`);
      return resultVeryLow;
    }
  } catch (err) {
    console.warn(`[convert] libwebp_anim fps=3 gagal: ${err.message}`);
  }

  // --- Strategi 4: coba animated dengan fps=1 (paling lambat, tapi tetap animasi) ---
  try {
    const fps1Filters = [`fps=1`, `scale=${targetWidth}:-2:flags=lanczos`].join(",");
    const resultFps1 = await runEncoder("libwebp_anim", [], ["-fflags", "+genpts+igndts"], fps1Filters);
    if (isValidWebP(resultFps1)) {
      console.log(`[convert] Berhasil dengan fps=1 (animated, sangat lambat)`);
      return resultFps1;
    }
  } catch (err) {
    console.warn(`[convert] libwebp_anim fps=1 gagal: ${err.message}`);
  }

  // --- Terakhir: fallback ke static (1 frame) ---
  console.warn(`[convert] Semua upaya animated gagal, fallback ke static.`);
  return await runEncoder("libwebp", ["-vframes 1"]);
}

/**
 * Konversi URL ke WebP (animated jika input memiliki banyak frame, static jika benar-benar tidak bisa)
 * Otomatis mengecilkan ukuran hingga ≤ maxSize, namun tetap berusaha mempertahankan animasi
 * @param {string} url
 * @param {number} quality  - 0-100, default 80
 * @param {number} maxSize  - bytes, default 1MB
 */
async function convertToWebP(url, quality = 80, maxSize = 1 * 1024 * 1024) {
  let smallest = null;
  // Daftar fps yang dicoba: prioritaskan fps asli (0), lalu fps yang lebih rendah agar ukuran kecil
  const candidateFpsList = [0, 15, 12, 10, 8, 6, 5, 4, 3, 2, 1];

  async function attempt(fps) {
    const { data } = await axios({ method: "GET", url, responseType: "stream" });
    const buf = await _runConvertToWebP(data, { quality, fps, width: 0 });
    if (!smallest || buf.length < smallest.length) smallest = buf;
    console.log(`[convert] q=${quality} fps=${fps === 0 ? "auto" : fps} → ${(buf.length / 1024 / 1024).toFixed(2)}MB`);
    return buf;
  }

  for (const fps of candidateFpsList) {
    const buf = await attempt(fps);
    if (buf.length <= maxSize) return buf;
  }

  console.warn(`[convert] ⚠️ Semua opsi fps habis. Terkecil: ${(smallest.length / 1024 / 1024).toFixed(2)}MB (limit ${(maxSize / 1024 / 1024).toFixed(2)}MB)`);
  return smallest;
}

/**
 * Kompres gambar (static) ke WebP dengan target maxSize (default 100KB)
 * @param {string} url
 * @param {number} maxSize bytes
 */
async function compressImage(url, maxSize = 100 * 1024) {
  const getStream = () => axios({ method: "GET", url, responseType: "stream" }).then(r => r.data);

  const qualities = [80, 65, 50, 35, 20];
  for (const q of qualities) {
    const stream = await getStream();
    const result = await _runCompress(stream, q);
    if (result.length <= maxSize) return result;
  }

  const scales = [0.75, 0.5, 0.35, 0.25];
  for (const scale of scales) {
    const stream = await getStream();
    const result = await _runCompress(stream, 20, scale);
    if (result.length <= maxSize) return result;
  }

  const lastStream = await getStream();
  return _runCompress(lastStream, 20, 0.25);
}

function _runCompress(inputStream, quality, scale = null) {
  const outStream = new PassThrough();
  const chunks = [];

  const scaleFilter = scale
    ? `scale=iw*${scale}:ih*${scale}:flags=lanczos`
    : "scale=iw:ih:flags=lanczos";

  return new Promise((resolve, reject) => {
    outStream.on("data", c => chunks.push(c));
    outStream.on("end", () => resolve(Buffer.concat(chunks)));
    outStream.on("error", reject);

    ffmpeg(inputStream)
      .inputOptions(["-analyzeduration 10M", "-probesize 10M"])
      .videoFilter(scaleFilter)
      .outputOptions([
        "-c:v libwebp",
        `-quality ${quality}`,
        "-loop 0",
        "-preset picture",
        "-an",
        "-vframes 1"
      ])
      .format("webp")
      .on("error", err => reject(new Error(`FFmpeg compress error: ${err.message}`)))
      .pipe(outStream, { end: true });
  });
}

// ---------- Handler Utama ----------
module.exports = async (req, res) => {
  setCorsHeaders(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const { type } = req.query;

  // --- CONVERT (WebP animated / static) ---
  if (type === "convert") {
    if (req.method !== "GET")
      return res.status(405).json({ error: "Convert hanya mendukung metode GET." });

    const { url, quality, maxsize } = req.query;
    if (!url) return res.status(400).json({ error: "Parameter 'url' wajib diisi." });
    try { new URL(url); } catch { return res.status(400).json({ error: "URL tidak valid." }); }

    const q = parseInt(quality) || 80;
    if (q < 0 || q > 100) return res.status(400).json({ error: "Quality harus antara 0-100." });

    const maxBytes = parseInt(maxsize) || 1 * 1024 * 1024;
    if (maxBytes < 1024 || maxBytes > 50 * 1024 * 1024)
      return res.status(400).json({ error: "maxsize harus antara 1KB hingga 50MB." });

    try {
      const webpBuffer = await convertToWebP(url, q, maxBytes);
      res.setHeader("Content-Type", "image/webp");
      res.setHeader("Content-Length", webpBuffer.length);
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.setHeader("X-Output-Size", `${(webpBuffer.length / 1024 / 1024).toFixed(2)}MB`);
      return res.send(webpBuffer);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal konversi ke WebP", detail: err.message });
    }
  }

  // --- COMPRESS (static WebP) ---
  if (type === "compress") {
    if (req.method !== "GET")
      return res.status(405).json({ error: "Compress hanya mendukung metode GET." });

    const { url, maxsize } = req.query;
    if (!url) return res.status(400).json({ error: "Parameter 'url' wajib diisi." });
    try { new URL(url); } catch { return res.status(400).json({ error: "URL tidak valid." }); }

    const maxBytes = parseInt(maxsize) || 100 * 1024;
    if (maxBytes < 1024 || maxBytes > 10 * 1024 * 1024)
      return res.status(400).json({ error: "maxsize harus antara 1KB hingga 10MB." });

    try {
      const compressed = await compressImage(url, maxBytes);
      res.setHeader("Content-Type", "image/webp");
      res.setHeader("Content-Length", compressed.length);
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.setHeader("X-Compressed-Size", `${(compressed.length / 1024).toFixed(2)}KB`);
      return res.send(compressed);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal kompres gambar", detail: err.message });
    }
  }

  // --- LEADERBOARD ---
  if (type === "leaderboard") {
    if (req.method !== "POST")
      return res.status(405).json({ error: "Leaderboard requires POST method." });
    try {
      const { header, players, background, variant } = req.body;
      if (!players || !Array.isArray(players))
        return res.status(400).json({ error: "Missing players array." });
      const safeHeader = {
        title:    header?.title    || "Leaderboard",
        image:    header?.image    || "https://github.com/neplextech.png",
        subtitle: header?.subtitle || "0 members",
      };
      const lb = new LeaderboardBuilder()
        .setHeader(safeHeader)
        .setPlayers(players.slice(0, 10));
      if (background) lb.setBackground(background);
      lb.setVariant(variant === "horizontal" ? "horizontal" : "default");
      const imageBuffer = await lb.build({ format: "png" });
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=60");
      return res.send(imageBuffer);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to generate leaderboard", detail: err.message });
    }
  }

  // --- RANK / WELCOME / GOODBYE ---
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed." });
  if (!type)
    return res.status(400).json({ error: "Missing 'type' parameter." });

  try {
    let imageBuffer;
    if (type === "rank") {
      const { username, displayName, avatar, currentXP, requiredXP, level, rank, status, background } = req.query;
      const card = new RankCardBuilder()
        .setDisplayName(displayName || username || "User")
        .setUsername(username ? `@${username}` : undefined)
        .setAvatar(avatar || "https://cdn.discordapp.com/embed/avatars/0.png")
        .setCurrentXP(parseInt(currentXP) || 0)
        .setRequiredXP(parseInt(requiredXP) || 100)
        .setLevel(parseInt(level) || 1)
        .setRank(parseInt(rank) || 1)
        .setOverlay(90);
      if (status && ["online", "idle", "dnd", "offline"].includes(status)) card.setStatus(status);
      card.setBackground(background || "#2C2F33");
      imageBuffer = await card.build({ format: "png" });
    } else if (type === "welcome" || type === "goodbye") {
      const { displayName, avatar, message } = req.query;
      const card = new GreetingsCard()
        .setType(type)
        .setDisplayName(displayName || "User")
        .setAvatar(avatar || "https://cdn.discordapp.com/embed/avatars/0.png")
        .setMessage(message || (type === "welcome" ? "Welcome to the server!" : "We'll miss you!"));
      imageBuffer = await card.build({ format: "png" });
    } else {
      return res.status(400).json({ error: "Invalid type. Use 'welcome', 'goodbye', 'rank', 'leaderboard', 'convert', atau 'compress'." });
    }
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=60");
    res.send(imageBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate image", detail: err.message });
  }
};