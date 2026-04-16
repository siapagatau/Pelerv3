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
const fs = require("fs");
const os = require("os");
const path = require("path"); // <-- tambahkan ini

ffmpeg.setFfmpegPath(ffmpegPath);
Font.loadDefault();

// ---------- Custom Greetings Card (tidak berubah) ----------
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
  setDisplayName(value) {
    this.options.set("displayName", value);
    return this;
  }
  setType(value) {
    this.options.set("type", value);
    return this;
  }
  setAvatar(value) {
    this.options.set("avatar", value);
    return this;
  }
  setMessage(value) {
    this.options.set("message", value);
    return this;
  }
  async render() {
    const { type, displayName, avatar, message } = this.options.getOptions();
    const image = await loadImage(
      avatar || "https://cdn.discordapp.com/embed/avatars/0.png"
    );
    return JSX.createElement(
      "div",
      {
        className:
          "h-full w-full flex flex-col items-center justify-center bg-[#23272A] rounded-xl",
      },
      JSX.createElement(
        "div",
        {
          className:
            "px-6 bg-[#2B2F35AA] w-[96%] h-[84%] rounded-lg flex items-center",
        },
        JSX.createElement("img", {
          src: image.toDataURL(),
          className: "flex h-24 w-24 rounded-full mr-6",
        }),
        JSX.createElement(
          "div",
          { className: "flex flex-col" },
          JSX.createElement(
            "h1",
            { className: "text-5xl text-white font-bold m-0" },
            type === "welcome" ? "Welcome" : "Goodbye",
            ",",
            " ",
            JSX.createElement(
              "span",
              { className: "text-blue-500" },
              displayName || "User",
              "!"
            )
          ),
          JSX.createElement(
            "p",
            { className: "text-gray-300 text-3xl m-0 mt-2" },
            message ||
              (type === "welcome"
                ? "Thanks for joining!"
                : "See you later!")
          )
        )
      )
    );
  }
}

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

/**
 * Konversi media (GIF/video) ke animated WebP
 * Menggunakan file temporary agar ffmpeg bisa membaca semua frame
 */
async function convertToWebP(url, quality = 80) {
  const MAX_DURATION_SEC = 10;
  const MAX_SIZE_MB = 15;

  // 1. Download file ke buffer
  let fileBuffer;
  try {
    const response = await axios({
      method: "GET",
      url,
      responseType: "arraybuffer",
      maxContentLength: MAX_SIZE_MB * 1024 * 1024,
      timeout: 30000,
    });
    fileBuffer = Buffer.from(response.data);
  } catch (err) {
    throw new Error(`Gagal download: ${err.message}`);
  }

  // 2. Simpan ke file temporary
  const tempInput = path.join(os.tmpdir(), `input_${Date.now()}_${Math.random().toString(36)}.tmp`);
  fs.writeFileSync(tempInput, fileBuffer);

  // 3. Konversi ke animated WebP
  const outputStream = new PassThrough();
  const chunks = [];

  return new Promise((resolve, reject) => {
    outputStream.on("data", (chunk) => chunks.push(chunk));
    outputStream.on("end", () => {
      fs.unlinkSync(tempInput);
      resolve(Buffer.concat(chunks));
    });
    outputStream.on("error", (err) => {
      try { fs.unlinkSync(tempInput); } catch(e) {}
      reject(err);
    });

    ffmpeg(tempInput)
      .videoFilter("scale=512:512")
      .outputOptions([
        "-c:v libwebp_anim",
        `-quality ${quality}`,
        "-loop 0",
        "-vsync 0",
        "-g 1",
        "-pix_fmt yuv420p",
        "-an"
      ])
      .format("webp")
      .on("error", (err) => reject(new Error(`FFmpeg error: ${err.message}`)))
      .pipe(outputStream, { end: true });
  });
}

module.exports = async (req, res) => {
  setCorsHeaders(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const { type } = req.query;

  // --- CONVERT MEDIA TO WEBP (GET) ---
  if (type === "convert") {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Convert hanya GET." });
    }
    const { url, quality } = req.query;
    if (!url) return res.status(400).json({ error: "Parameter 'url' wajib diisi." });
    try { new URL(url); } catch { return res.status(400).json({ error: "URL tidak valid." }); }
    const q = parseInt(quality) || 80;
    if (q < 0 || q > 100) return res.status(400).json({ error: "Quality 0-100." });

    try {
      const webpBuffer = await convertToWebP(url, q);
      res.setHeader("Content-Type", "image/webp");
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.send(webpBuffer);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Gagal konversi ke WebP", detail: err.message });
    }
    return;
  }

  // --- LEADERBOARD (POST) ---
  if (type === "leaderboard") {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Leaderboard requires POST method." });
    }
    try {
      const { header, players, background, variant } = req.body;
      if (!players || !Array.isArray(players)) {
        return res.status(400).json({ error: "Missing players array." });
      }
      const safeHeader = {
        title: header?.title || "Leaderboard",
        image: header?.image || "https://github.com/neplextech.png",
        subtitle: header?.subtitle || "0 members",
      };
      const limitedPlayers = players.slice(0, 10);
      const lb = new LeaderboardBuilder()
        .setHeader(safeHeader)
        .setPlayers(limitedPlayers);
      if (background) lb.setBackground(background);
      if (variant === "horizontal") lb.setVariant("horizontal");
      else lb.setVariant("default");
      const imageBuffer = await lb.build({ format: "png" });
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=60");
      return res.send(imageBuffer);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to generate leaderboard", detail: err.message });
    }
  }

  // --- RANK, WELCOME, GOODBYE (GET) ---
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed. Use GET for rank/welcome/goodbye, or POST for leaderboard." });
  }

  if (!type) {
    return res.status(400).json({ error: "Missing 'type' parameter." });
  }

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
      if (background) card.setBackground(background);
      else card.setBackground("#2C2F33");
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
      return res.status(400).json({ error: "Invalid type. Use 'welcome', 'goodbye', 'rank', or 'leaderboard'." });
    }

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=60");
    res.send(imageBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate image", detail: err.message });
  }
};
