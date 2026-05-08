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
const fs = require("fs");
const os = require("os");
const sharp = require("sharp"); // ✅ tambahkan sharp untuk konversi WebP ke gambar

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

// ==================== WEBP CONVERT (ffmpeg) ====================
function _runConvertToWebP(inputBuffer, { quality, fps = 0, width = 0 }) {
  const tmpIn  = path.join(os.tmpdir(), `conv_in_${Date.now()}_${Math.random().toString(36).slice(2)}.webp`);
  const tmpOut = path.join(os.tmpdir(), `conv_out_${Date.now()}_${Math.random().toString(36).slice(2)}.webp`);
  fs.writeFileSync(tmpIn, inputBuffer);

  const filters = [];
  if (fps > 0)   filters.push(`fps=${fps}`);
  if (width > 0) filters.push(`scale=${width}:-2:flags=lanczos`);
  else           filters.push("scale=512:512");

  return new Promise((resolve, reject) => {
    ffmpeg(tmpIn)
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
      .on("error", (err) => {
        fs.rmSync(tmpIn,  { force: true });
        fs.rmSync(tmpOut, { force: true });
        reject(new Error(`FFmpeg error: ${err.message}`));
      })
      .on("end", () => {
        try {
          const buf = fs.readFileSync(tmpOut);
          resolve(buf);
        } catch (e) {
          reject(new Error(`Gagal baca output tmp: ${e.message}`));
        } finally {
          fs.rmSync(tmpIn,  { force: true });
          fs.rmSync(tmpOut, { force: true });
        }
      })
      .save(tmpOut);
  });
}

async function convertToWebP(url, quality = 80, maxSize = 1 * 1024 * 1024) {
  const originalResponse = await axios({ method: "GET", url, responseType: "arraybuffer" });
  const originalBuffer   = Buffer.from(originalResponse.data);
  const originalType     = originalResponse.headers["content-type"] || "application/octet-stream";

  console.log(`[convert] Original: ${(originalBuffer.length / 1024 / 1024).toFixed(2)}MB type=${originalType}`);

  for (const fps of [0, 24, 20, 15, 12, 10, 8, 6, 5, 3, 2, 1]) {
    try {
      const buf = await _runConvertToWebP(originalBuffer, { quality, fps, width: 0 });
      const mb  = (buf.length / 1024 / 1024).toFixed(2);
      console.log(`[convert] q=${quality} fps=${fps} → ${mb}MB`);
      if (buf.length > 0 && buf.length <= maxSize)
        return { buffer: buf, contentType: "image/webp", isOriginal: false };
      if (buf.length === 0) {
        console.warn(`[convert] FFmpeg output kosong fps=${fps} → fallback ke buffer asli`);
        return { buffer: originalBuffer, contentType: originalType, isOriginal: true };
      }
    } catch (err) {
      console.warn(`[convert] FFmpeg gagal fps=${fps}: ${err.message} → fallback ke buffer asli`);
      return { buffer: originalBuffer, contentType: originalType, isOriginal: true };
    }
  }

  console.warn(`[convert] ⚠️ Semua opsi fps habis, mengembalikan buffer asli. Ukuran asli: ${(originalBuffer.length / 1024 / 1024).toFixed(2)}MB`);
  return { buffer: originalBuffer, contentType: originalType, isOriginal: true };
}

// ==================== COMPRESS IMAGE ====================
async function compressImage(url, maxSize = 100 * 1024) {
  const response = await axios({ method: "GET", url, responseType: "stream" });
  const qualities = [80, 65, 50, 35, 20];

  for (const quality of qualities) {
    const result = await _runCompress(response.data.pipe(new PassThrough()), quality);
    if (result.length <= maxSize) return result;
    if (quality !== qualities[qualities.length - 1]) {
      const retry = await axios({ method: "GET", url, responseType: "stream" });
      response.data = retry.data;
    }
  }

  const scales = [0.75, 0.5, 0.35, 0.25];
  for (const scale of scales) {
    const retry = await axios({ method: "GET", url, responseType: "stream" });
    const result = await _runCompress(retry.data, 20, scale);
    if (result.length <= maxSize) return result;
  }

  const last = await axios({ method: "GET", url, responseType: "stream" });
  return _runCompress(last.data, 20, 0.25);
}

function _runCompress(inputStream, quality, scale = null) {
  const outputStream = new PassThrough();
  const chunks = [];
  const scaleFilter = scale
    ? `scale=iw*${scale}:ih*${scale}:flags=lanczos`
    : "scale=iw:ih:flags=lanczos";

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

// ==================== HANDLER UTAMA ====================
module.exports = async (req, res) => {
  setCorsHeaders(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const { type } = req.query;

  // ---------- WEBP TO IMAGE (SHARP, SUPPORT VERCEL) ----------
  if (type === "webp-to-image") {
    if (req.method !== "GET")
      return res.status(405).json({ error: "Hanya mendukung metode GET." });

    const { url, format = "png", quality = 80 } = req.query;
    if (!url) return res.status(400).json({ error: "Parameter 'url' wajib diisi." });
    if (!["png", "jpeg"].includes(format))
      return res.status(400).json({ error: "Format harus 'png' atau 'jpeg'." });
    const q = parseInt(quality);
    if (isNaN(q) || q < 0 || q > 100)
      return res.status(400).json({ error: "Quality harus 0-100." });

    try {
      const response = await axios({ method: "GET", url, responseType: "arraybuffer" });
      const webpBuffer = Buffer.from(response.data);
      let transformer = sharp(webpBuffer);
      if (format === "png") {
        transformer = transformer.png({ quality: q, compressionLevel: 9 });
      } else {
        transformer = transformer.jpeg({ quality: q, mozjpeg: true });
      }
      const imageBuffer = await transformer.toBuffer();

      res.setHeader("Content-Type", format === "png" ? "image/png" : "image/jpeg");
      res.setHeader("Content-Length", imageBuffer.length);
      res.setHeader("Cache-Control", "public, max-age=3600");
      return res.send(imageBuffer);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal mengkonversi WebP ke gambar", detail: err.message });
    }
  }

  // ---------- WEBP TO VIDEO (TIDAK DIDUKUNG DI VERCEL) ----------
  if (type === "webp-to-video") {
    return res.status(501).json({
      error: "Fitur konversi WebP animasi ke video tidak didukung di environment Vercel.",
      suggestion: "Gunakan mode termux atau server dengan ffmpeg lengkap."
    });
  }

  // ---------- CONVERT URL TO WEBP (ANIMATED) ----------
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
      return res.status(400).json({ error: "maxsize harus antara 1024 (1KB) hingga 52428800 (50MB)." });

    try {
      const { buffer: webpBuffer, contentType, isOriginal } = await convertToWebP(url, q, maxBytes);
      res.setHeader("Content-Type", contentType);
      res.setHeader("Content-Length", webpBuffer.length);
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.setHeader("X-Output-Size", `${(webpBuffer.length / 1024 / 1024).toFixed(2)}MB`);
      if (isOriginal) res.setHeader("X-Fallback", "original");
      return res.send(webpBuffer);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal konversi ke WebP", detail: err.message });
    }
  }

  // ---------- COMPRESS IMAGE ----------
  if (type === "compress") {
    if (req.method !== "GET")
      return res.status(405).json({ error: "Compress hanya mendukung metode GET." });

    const { url, maxsize } = req.query;
    if (!url) return res.status(400).json({ error: "Parameter 'url' wajib diisi." });
    try { new URL(url); } catch { return res.status(400).json({ error: "URL tidak valid." }); }

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

  // ---------- LEADERBOARD (POST) ----------
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

  // ---------- RANK / WELCOME / GOODBYE (GET) ----------
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