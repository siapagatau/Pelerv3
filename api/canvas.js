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
    this.bootstrap({ displayName: "", type: "welcome", avatar: "", message: "" });
  }
  setDisplayName(v) { this.options.set("displayName", v); return this; }
  setType(v)        { this.options.set("type", v);        return this; }
  setAvatar(v)      { this.options.set("avatar", v);      return this; }
  setMessage(v)     { this.options.set("message", v);     return this; }

  async render() {
    const { type, displayName, avatar, message } = this.options.getOptions();
    const image = await loadImage(avatar || "https://cdn.discordapp.com/embed/avatars/0.png");
    return JSX.createElement(
      "div", { className: "h-full w-full flex flex-col items-center justify-center bg-[#23272A] rounded-xl" },
      JSX.createElement(
        "div", { className: "px-6 bg-[#2B2F35AA] w-[96%] h-[84%] rounded-lg flex items-center" },
        JSX.createElement("img", { src: image.toDataURL(), className: "flex h-24 w-24 rounded-full mr-6" }),
        JSX.createElement(
          "div", { className: "flex flex-col" },
          JSX.createElement(
            "h1", { className: "text-5xl text-white font-bold m-0" },
            type === "welcome" ? "Welcome" : "Goodbye", ", ",
            JSX.createElement("span", { className: "text-blue-500" }, displayName || "User", "!")
          ),
          JSX.createElement(
            "p", { className: "text-gray-300 text-3xl m-0 mt-2" },
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

async function fetchStream(url) {
  const res = await axios({ method: "GET", url, responseType: "stream" });
  return res.data;
}

/**
 * Satu kali run ffmpeg → animated WebP
 */
function _runWebP(inputStream, { quality, fps, width }) {
  const outputStream = new PassThrough();
  const chunks = [];

  const filters = [];
  if (fps > 0)   filters.push(`fps=${fps}`);
  if (width > 0) filters.push(`scale=${width}:-2:flags=lanczos`);
  else           filters.push("scale=512:512");

  return new Promise((resolve, reject) => {
    outputStream.on("data",  (c) => chunks.push(c));
    outputStream.on("end",   () => resolve(Buffer.concat(chunks)));
    outputStream.on("error", reject);

    ffmpeg(inputStream)
      .inputOptions(["-analyzeduration 10M", "-probesize 10M"])
      .videoFilter(filters.join(","))
      .outputOptions([
        "-c:v libwebp_anim",
        `-quality ${quality}`,
        "-loop 0",
        "-vsync 0",
        "-g 1",
        "-pix_fmt yuv420p",
        "-an",
      ])
      .format("webp")
      .on("error", (err) => reject(new Error(`FFmpeg error: ${err.message}`)))
      .pipe(outputStream, { end: true });
  });
}

/**
 * Konversi URL → animated WebP, terus kecilkan sampai < maxSize.
 *
 * Strategi (dari ringan ke agresif):
 *   Quality : [inputQuality, 60, 40, 20, 10]
 *   FPS     : [0=asli, 20, 15, 10, 8, 5]
 *   Width   : [0=512, 384, 320, 256, 192, 128, 96]
 *
 * Loop berhenti begitu buffer ≤ maxSize.
 * Jika semua opsi habis → kembalikan buffer terkecil yang ada.
 *
 * @param {string} url
 * @param {number} quality  - kualitas awal (0–100)
 * @param {number} maxSize  - batas bytes (default 1MB)
 */
async function convertToWebP(url, quality = 80, maxSize = 1 * 1024 * 1024) {
  // Deduplicate quality steps (jika input sudah 60/40/dll)
  const qualitySteps = [...new Set([quality, 60, 40, 20, 10])];
  const fpsSteps     = [0, 20, 15, 10, 8, 5];
  const widthSteps   = [0, 384, 320, 256, 192, 128, 96];

  let smallest = null;

  for (const q of qualitySteps) {
    for (const fps of fpsSteps) {
      for (const width of widthSteps) {
        let buf;
        try {
          const stream = await fetchStream(url);
          buf = await _runWebP(stream, { quality: q, fps, width });
        } catch (e) {
          console.warn(`[convertToWebP] skip q=${q} fps=${fps} w=${width}: ${e.message}`);
          continue;
        }

        if (!smallest || buf.length < smallest.length) smallest = buf;

        const sizeMB = (buf.length / 1024 / 1024).toFixed(2);
        console.log(`[convertToWebP] q=${q} fps=${fps} w=${width} → ${sizeMB}MB`);

        if (buf.length <= maxSize) {
          console.log(`[convertToWebP] ✅ q=${q} fps=${fps} w=${width}`);
          return buf;
        }
      }
    }
  }

  const sizeMB = smallest ? (smallest.length / 1024 / 1024).toFixed(2) : "?";
  console.warn(`[convertToWebP] ⚠️ Semua opsi habis. Terkecil: ${sizeMB}MB`);
  return smallest;
}

// ---------- compressImage (static image) ----------
async function compressImage(url, maxSize = 100 * 1024) {
  const qualities = [80, 65, 50, 35, 20];
  for (const quality of qualities) {
    const stream = await fetchStream(url);
    const result = await _runCompress(stream, quality);
    if (result.length <= maxSize) return result;
  }

  const scales = [0.75, 0.5, 0.35, 0.25];
  for (const scale of scales) {
    const stream = await fetchStream(url);
    const result = await _runCompress(stream, 20, scale);
    if (result.length <= maxSize) return result;
  }

  const stream = await fetchStream(url);
  return _runCompress(stream, 20, 0.25);
}

function _runCompress(inputStream, quality, scale = null) {
  const outputStream = new PassThrough();
  const chunks = [];
  const scaleFilter = scale
    ? `scale=iw*${scale}:ih*${scale}:flags=lanczos`
    : "scale=iw:ih:flags=lanczos";

  return new Promise((resolve, reject) => {
    outputStream.on("data",  (c) => chunks.push(c));
    outputStream.on("end",   () => resolve(Buffer.concat(chunks)));
    outputStream.on("error", reject);

    ffmpeg(inputStream)
      .inputOptions(["-analyzeduration 10M", "-probesize 10M"])
      .videoFilter(scaleFilter)
      .outputOptions([
        "-c:v libwebp",
        `-quality ${quality}`,
        "-loop 0",
        "-preset picture",
        "-an",
        "-vframes 1",
      ])
      .format("webp")
      .on("error", (err) => reject(new Error(`FFmpeg compress error: ${err.message}`)))
      .pipe(outputStream, { end: true });
  });
}

// ---------- Handler Utama ----------
module.exports = async (req, res) => {
  setCorsHeaders(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const { type } = req.query;

  // --- CONVERT ---
  if (type === "convert") {
    if (req.method !== "GET")
      return res.status(405).json({ error: "Convert hanya mendukung metode GET." });

    const { url, quality, maxsize } = req.query;
    if (!url) return res.status(400).json({ error: "Parameter 'url' wajib diisi." });

    try { new URL(url); } catch {
      return res.status(400).json({ error: "URL tidak valid." });
    }

    const q = parseInt(quality) || 80;
    if (q < 0 || q > 100)
      return res.status(400).json({ error: "Quality harus antara 0-100." });

    // Default 1MB, bisa di-override via ?maxsize=bytes
    const maxBytes = parseInt(maxsize) || 1 * 1024 * 1024;
    if (maxBytes < 1024 || maxBytes > 50 * 1024 * 1024)
      return res.status(400).json({ error: "maxsize harus antara 1024 (1KB) hingga 52428800 (50MB)." });

    try {
      const buf = await convertToWebP(url, q, maxBytes);
      res.setHeader("Content-Type", "image/webp");
      res.setHeader("Content-Length", buf.length);
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.setHeader("X-Output-Size", `${(buf.length / 1024 / 1024).toFixed(2)}MB`);
      return res.send(buf);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal konversi ke WebP", detail: err.message });
    }
  }

  // --- COMPRESS ---
  if (type === "compress") {
    if (req.method !== "GET")
      return res.status(405).json({ error: "Compress hanya mendukung metode GET." });

    const { url, maxsize } = req.query;
    if (!url) return res.status(400).json({ error: "Parameter 'url' wajib diisi." });

    try { new URL(url); } catch {
      return res.status(400).json({ error: "URL tidak valid." });
    }

    const maxBytes = parseInt(maxsize) || 100 * 1024;
    if (maxBytes < 1024 || maxBytes > 10 * 1024 * 1024)
      return res.status(400).json({ error: "maxsize harus antara 1024 (1KB) hingga 10485760 (10MB)." });

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
