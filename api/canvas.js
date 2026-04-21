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
const path = require("path");

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
 * Jalankan satu kali konversi WebP animated dengan opsi tertentu.
 * @param {Stream} inputStream
 * @param {object} opts
 * @param {number} opts.quality - 0–100
 * @param {number} opts.fps     - frame per second (0 = ikuti asli)
 * @param {number} opts.width   - lebar output px (0 = jangan ubah resolusi)
 * @returns {Promise<Buffer>}
 */
function _runConvertToWebP(inputStream, { quality, fps = 0, width = 0 }) {
  const outputStream = new PassThrough();
  const chunks = [];

  const filters = [];
  if (fps > 0) filters.push(`fps=${fps}`);
  // Hanya tambahkan filter scale jika width > 0 (jaga aspect ratio)
  if (width > 0) filters.push(`scale=${width}:-2:flags=lanczos`);

  return new Promise((resolve, reject) => {
    outputStream.on("data",  (chunk) => chunks.push(chunk));
    outputStream.on("end",   () => resolve(Buffer.concat(chunks)));
    outputStream.on("error", reject);

    let command = ffmpeg(inputStream)
      .inputOptions([
        "-analyzeduration 10M",
        "-probesize 10M",
        // Force input format untuk WebP pipe (mencegah salah deteksi)
        "-f", "webp_pipe"
      ])
      .outputOptions([
        "-c:v libwebp_anim",
        `-quality ${quality}`,
        "-loop 0",
        "-vsync 0",
        "-g 1",
        "-pix_fmt yuv420p",
        "-an",
        "-allow_mixed",    // dukungan untuk frame campuran (lossy/lossless)
      ])
      .format("webp");

    if (filters.length > 0) {
      command = command.videoFilter(filters.join(","));
    }

    command.on("error", (err) => reject(new Error(`FFmpeg error: ${err.message}`)))
      .pipe(outputStream, { end: true });
  });
}

/**
 * Konversi URL → animated WebP, auto-kecilkan jika hasil > maxSize (default 1MB).
 *
 * @param {string} url
 * @param {number} quality  - kualitas awal (0–100), default 80
 * @param {number} maxSize  - batas bytes, default 1 MB
 */
async function convertToWebP(url, quality = 80, maxSize = 1 * 1024 * 1024) {
  let smallest = null;

  async function attempt(fps, width = 0) {
    const { data } = await axios({ method: "GET", url, responseType: "stream" });
    const buf = await _runConvertToWebP(data, { quality, fps, width });
    if (!smallest || buf.length < smallest.length) smallest = buf;
    const mb = (buf.length / 1024 / 1024).toFixed(2);
    console.log(`[convert] q=${quality} fps=${fps} w=${width || 'auto'} → ${mb}MB`);
    return buf;
  }

  // Coba dari fps asli (0), lalu turunkan bertahap tanpa ubah resolusi
  for (const fps of [0, 24, 20, 15, 12, 10, 8, 6, 5, 3, 2, 1]) {
    const buf = await attempt(fps, 0);
    if (buf.length <= maxSize) return buf;
  }

  // Jika masih kegedean, turunkan resolusi (dimulai dari 512, 384, ...)
  for (const width of [512, 384, 256, 192, 128, 96]) {
    const buf = await attempt(10, width); // fps 10 sebagai kompromi
    if (buf.length <= maxSize) return buf;
  }

  // Terakhir, turunkan quality
  for (const q of [60, 40, 20]) {
    const buf = await attempt(8, 128);
    if (buf.length <= maxSize) return buf;
  }

  console.warn(`[convert] ⚠️ Semua opsi habis. Terkecil: ${(smallest.length / 1024 / 1024).toFixed(2)}MB (limit: ${(maxSize / 1024 / 1024).toFixed(2)}MB)`);
  return smallest;
}

/**
 * Kompres gambar ke WebP max 100KB tanpa stretch.
 * @param {string} url     - URL gambar
 * @param {number} maxSize - Batas ukuran dalam bytes (default: 100KB)
 * @returns {Promise<Buffer>}
 */
async function compressImage(url, maxSize = 100 * 1024) {
  // Helper untuk menjalankan kompres dengan parameter tertentu
  async function runCompressWithParams(quality, scale = null) {
    const response = await axios({ method: "GET", url, responseType: "stream" });
    return _runCompress(response.data, quality, scale);
  }

  // Tahap 1: turunkan quality
  const qualities = [80, 65, 50, 35, 20];
  for (const quality of qualities) {
    const result = await runCompressWithParams(quality);
    if (result.length <= maxSize) return result;
  }

  // Tahap 2: turunkan resolusi
  const scales = [0.75, 0.5, 0.35, 0.25];
  for (const scale of scales) {
    const result = await runCompressWithParams(20, scale);
    if (result.length <= maxSize) return result;
  }

  // Kembalikan hasil terkecil
  return runCompressWithParams(20, 0.25);
}

/**
 * Internal: jalankan satu kali ffmpeg compress (ambil 1 frame)
 * @param {Stream} inputStream
 * @param {number} quality   - 0-100
 * @param {number|null} scale - misal 0.5 = setengah resolusi asli, null = tidak resize
 */
function _runCompress(inputStream, quality, scale = null) {
  const outputStream = new PassThrough();
  const chunks = [];

  const scaleFilter = scale
    ? `scale=iw*${scale}:ih*${scale}:flags=lanczos`
    : "scale=iw:ih:flags=lanczos"; // no-op

  return new Promise((resolve, reject) => {
    outputStream.on("data", (chunk) => chunks.push(chunk));
    outputStream.on("end", () => resolve(Buffer.concat(chunks)));
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

    const maxBytes = parseInt(maxsize) || 1 * 1024 * 1024;
    if (maxBytes < 1024 || maxBytes > 50 * 1024 * 1024)
      return res.status(400).json({ error: "maxsize harus antara 1024 (1KB) hingga 52428800 (50MB)." });

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
    }
    else if (type === "welcome" || type === "goodbye") {
      const { displayName, avatar, message } = req.query;
      const card = new GreetingsCard()
        .setType(type)
        .setDisplayName(displayName || "User")
        .setAvatar(avatar || "https://cdn.discordapp.com/embed/avatars/0.png")
        .setMessage(message || (type === "welcome" ? "Welcome to the server!" : "We'll miss you!"));
      imageBuffer = await card.build({ format: "png" });
    }
    else {
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