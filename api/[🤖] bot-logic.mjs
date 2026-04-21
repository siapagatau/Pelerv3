const directory = process.cwd();
await import(`${directory}/settings.mjs`);
import {
    downloadContentFromMessage,
    generateWAMessageContent,
    generateWAMessageFromContent,
    getBinaryNodeChild,
    proto,
    prepareWAMessageMedia
} from '@whiskeysockets/baileys';
const {
    loadUserData,
    saveUserData
} = await import(`${directory}/function/database.mjs`);
const { loadButton, saveButton, tambahButton, semuaButton, cekCommand } = await import(`${directory}/function/button.mjs`);
import {
    getMenu
} from './[📜] getypemenu.mjs';
const {
    getExperiencePerTick,
    getExperienceNeeded,
    getCurrentRole
} = await import(`${directory}/game/level.js`);
import commands from './[🎴] commands.mjs';
import {
    buatStiker,
    buatStikerDariBuffer,
    buatStikerMeme
} from './[💟] sticker.mjs';
import buatKartuKTP from './[👒] ktpgen-new.mjs';
const { daftar } = await import(`${directory}/game/pendaftaran.js`);
const { limitConfig, initLimit, chargeLimit } = await import(`${directory}/game/limit.js`);
import {
    databaseLoad
} from './[📂] global-db.mjs';
import buatChatIphone from './[💬] iqc.mjs';
import buatSoalan from './[📩] soalan.mjs';
import buatFakeNgl from './[🧭] fakengl.mjs';
import buatChat from './[💌] qc.mjs';
import buatFakeCall from './[📲] fakecall.mjs';
import buatSubtitleImage from './[🪩] buatsubtitle.mjs';
import buatPixelArt from './[🧱] pixelart.mjs';
import buatFilterYouDied from './[☠️] yuded.mjs';
import buatFilterJilat from './[😝] jilat.mjs';
import buatFilterTowew from './[😳] towew.mjs';
import buatFilterPOV from './[🧐] pov.mjs';
import webpToVideo from './[👁‍🗨] webp2mp4.mjs';
const {
  requestImageChange,
  approveRequest,
  approveAllRequests,
  rejectRequest,
  formatRequestList,
} = await import(`${directory}/game/pasangan-image.mjs`);
const { loadMessage } = await import(`${directory}/function/store.mjs`);
const { messageHandler } = await import(`${directory}/index.mjs`);
const { handleGroupParticipantsUpdate } = await import(`${directory}/function/welcome.mjs`);
const { 
  startSession, 
  listSessions, 
  stopSession,
  startAllSessions,
  stopAllSessions
} = await import(`${directory}/jadibot.mjs`);
import axios from 'axios';
import * as cheerio from "cheerio";
import https from 'https';
import {
    writeFileSync,
    unlinkSync,
    existsSync
} from 'fs';
import {
    readFile
} from 'fs/promises';
import {
    exec
} from 'child_process';
import path from 'path';
import fs from 'fs';
import fsp from "fs/promises";
import mime from 'mime-types';
import os from "os";
import fetch from "node-fetch";
//import PDFDocument from 'pdfkit';
import {
    performance
} from 'perf_hooks';
import moment from "moment-timezone";
import { fileTypeFromBuffer } from "file-type";
import archiver from 'archiver'; // Pastikan kamu sudah install: npm install archiver
import util from 'util';
import {
    format
} from 'util';
import crypto from 'crypto';
import got from 'got';
import {
    z
} from 'zod';
import sharp from 'sharp';
// import GIFEncoder from 'gifencoder';
import webmux from 'node-webpmux';

//━━━━━━━━━━━━━━━[ VARIABEL ]━━━━━━━━━━━━━━━\\

// Maksimal warn
const MAX_WARN = 3; // batas peringatan sebelum dikeluarkan

//━━━━━━━━━━━━━━━[ MENULIS EXIF STICKER ]━━━━━━━━━━━━━━━\\

const writeExifWebp = async (webpBuffer, metadata = {}) => {
  const { Image } = webmux;
  const img = new Image()
  await img.load(webpBuffer)

  const json = {
    'sticker-pack-id': metadata.packId || 'rell-sticker-id',
    'sticker-pack-name': metadata.packName || 'Sticker Pack',
    'sticker-pack-publisher': metadata.packPublish || 'Farel',
    'sticker-pack-publisher-email': metadata.packEmail || '',
    'sticker-pack-publisher-website': metadata.packWebsite || '',
    'android-app-store-link': metadata.androidApp || '',
    'ios-app-store-link': metadata.iOSApp || '',
    'emojis': metadata.emojis || ['🔥'],
    'is-avatar-sticker': metadata.isAvatar || false
  }

  const exifAttr = Buffer.from([
    0x49, 0x49, 0x2A, 0x00,
    0x08, 0x00, 0x00, 0x00,
    0x01, 0x00,
    0x41, 0x57, 0x07, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x16, 0x00, 0x00, 0x00
  ])

  const jsonBuff = Buffer.from(JSON.stringify(json), 'utf-8')
  exifAttr.writeUIntLE(jsonBuff.length, 14, 4)

  img.exif = Buffer.concat([exifAttr, jsonBuff])

  return await img.save(null) // ⬅️ return BUFFER
}

//━━━━━━━━━━━━━━━[ SCRAPER ]━━━━━━━━━━━━━━━\\

const { youtubeSearch } = await import(`${directory}/scraper/youtube-search.mjs`);
const { quotesAnime, quotesAnimeDetail } = await import(`${directory}/scraper/quanim.mjs`);
const { uploadMedia } = await import(`${directory}/scraper/upload.mjs`);
const { scrapeSearch, scrapeStickerPack } = await import(`${directory}/scraper/stc-search.mjs`);

// Fitur pasangan
const {
  LEVEL_PASANGAN,
  POIN_HUBUNGAN,
  User,
  Pasangan,
  naikLevelPasangan,
  tambahPoin,
} = await import(`${directory}/game/pasangan.mjs`);

// Database sementara
let cacheChar = {}; // Menyimpan hasil list karakter per user
let searchResults = {};
let loginCodes = {};
let userLoginState = {};
let searchTiktok = [];
const downloadTiktok = new Set();

//━━━━━━━━━━━━━━━[ AUTO CREATE FOLDER ]━━━━━━━━━━━━━━━\\

// TEMP DIR
const tempDir = path.join(process.cwd(), 'temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

// RESPONBTN DIR
const responBtn = path.join(tempDir, 'responAsetBtn');
if (!fs.existsSync(responBtn)) fs.mkdirSync(responBtn);

// ALARM DIR
const alarmDir = path.join(tempDir, 'alarm');
if (!fs.existsSync(alarmDir)) fs.mkdirSync(alarmDir);

// BG DIR
const bannerBgDir = path.join(tempDir, 'user-background');
if (!fs.existsSync(bannerBgDir)) fs.mkdirSync(bannerBgDir);

// PREFIX DIR
const prefixDir = path.join(tempDir, 'prefixes');
if (!fs.existsSync(prefixDir)) fs.mkdirSync(prefixDir, {
    recursive: true
});

// BUTTON DIR
const buttonDir = path.join(tempDir, 'button');
if (!fs.existsSync(buttonDir)) {
    fs.mkdirSync(buttonDir);
}

//━━━━━━━━━━━━━━━[ FUNCTION DASAR ]━━━━━━━━━━━━━━━\\

// Mengedit settings.mjs
const settingaFilePath = path.join(directory, "settings.mjs");
function editBotLidNumber(newValue) {
    let data = fs.readFileSync(settingaFilePath, "utf8");

    // Replace dengan regex
    data = data.replace(
        /global\.botLidNumber\s*=\s*["'`](.*?)["'`]/,
        `global.botLidNumber = "${newValue}"`
    );

    fs.writeFileSync(settingaFilePath, data, "utf8");
    console.log("⚙️ botLidNumber berhasil diupdate:", newValue);
}

// WAKTU
const hour_now = moment.tz('Asia/Jakarta').format('HH')
var ucapanWaktu = 'Selamat pagi'
if (hour_now >= '03' && hour_now <= '10') {
    ucapanWaktu = 'Selamat pagi'
} else if (hour_now >= '10' && hour_now <= '14') {
    ucapanWaktu = 'Selamat siang'
} else if (hour_now >= '14' && hour_now <= '17') {
    ucapanWaktu = 'Selamat sore'
} else if (hour_now >= '17' && hour_now <= '18') {
    ucapanWaktu = 'Selamat petang'
} else if (hour_now >= '18' && hour_now <= '23') {
    ucapanWaktu = 'Selamat malam'
} else {
    ucapanWaktu = 'Selamat malam'
}

const timeWib = moment().tz('Asia/Jakarta').format('HH:mm:ss')
const timeWit = moment().tz('Asia/Makassar').format('HH:mm:ss')
const timeWita = moment().tz('Asia/Jayapura').format('HH:mm:ss')

// Readmore
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

// Turu sek
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// ambil acak
const getRandom = (text) => {
    return `${Math.floor(Math.random() * 10000)}${text}`;
};

// Convert stream to buffer
const toBuffer = async (stream) => {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
};

// Unduh media dari pesan
async function downloadMediaMessage(message) {
    if (!message || !message.mtype) throw new Error('Invalid message format');
    const mime = {
        imageMessage: 'image',
        videoMessage: 'video',
        stickerMessage: 'sticker',
        documentMessage: 'document',
        audioMessage: 'audio',
        ptvMessage: 'video'
    } [message.mtype];

    let msg = message.msg || message;
    if (msg.thumbnailDirectPath && !msg.url) {
        message = {
            directPath: msg.thumbnailDirectPath,
            mediaKey: msg.mediaKey
        };
    } else {
        message = msg;
    }

    return await toBuffer(await downloadContentFromMessage(message, mime));
}

function formatSize(bytes, si = true, dp = 2) {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) return `${bytes} B`;

    const units = si ?
        ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] :
        ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return `${bytes.toFixed(dp)} ${units[u]}`;
}

function progressBar(percent) {
    const totalBar = 20;
    const filled = Math.floor((percent / 100) * totalBar);
    return `[${'='.repeat(filled)}${' '.repeat(totalBar - filled)}] ${percent}%`;
}

async function downloadWithProgressAndSend(url, sock, from, quoted) {
    try {
        const start = performance.now();
        const tempPath = path.join(tempDir, Date.now() + '_file');
        const resHead = await axios.head(url);
        const total = parseInt(resHead.headers['content-length'], 10);
        let downloaded = 0;
        let lastUpdate = 0;

        const response = await axios({
            method: 'get',
            url,
            responseType: 'stream',
        });

        const writer = fs.createWriteStream(tempPath);
        const msg = await sock.sendMessage(from, {
            text: "📥 Sedang memulai unduhan...",
            quoted
        });

        response.data.on('data', async (chunk) => {
            downloaded += chunk.length;
            const now = Date.now();
            if (now - lastUpdate > 5000) { // Update progress setiap 5 detik
                lastUpdate = now;
                const percent = Math.round((downloaded / total) * 100);
                const bar = progressBar(percent);
                const loadedSize = formatSize(downloaded);
                const totalSize = formatSize(total);

                await sock.sendMessage(from, {
                    text: `📦 *Progress Download:*\n${bar}\n${loadedSize} / ${totalSize}`,
                    edit: msg.key
                });
            }
        });

        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        const end = performance.now();
        const totalTime = ((end - start) / 1000).toFixed(2);

        const buffer = fs.readFileSync(tempPath);
        const tipefile = await fileTypeFromBuffer(buffer);
        const mimeh = tipefile?.mime || 'application/octet-stream';
        const ext = tipefile?.ext || 'bin';
        const sizeH = formatSize(Buffer.byteLength(buffer));
        const filename = `file.${ext}`;

        let type = 'document';
        if (mimeh.startsWith('image/')) type = 'image';
        else if (mimeh.startsWith('video/')) type = 'video';
        else if (mimeh.startsWith('audio/')) type = 'audio';

        await sock.sendMessage(from, {
            text: `✅ *Unduhan Selesai!*\n📁 Tipe: ${mimeh}\n📦 Ukuran: ${sizeH}\n⏱️ Waktu: ${totalTime} detik`,
            edit: msg.key
        });

        await sock.sendMessage(from, {
            [type]: buffer,
            mimetype: mimeh,
            fileName: filename,
            //caption: ``
        }, {
            quoted
        });

        fs.unlinkSync(tempPath);
    } catch (err) {
        console.log(err);
        await sock.sendMessage(from, {
            text: `❌ Gagal mengunduh file: ${err.message}`,
            quoted
        });
    }
}

async function downloadAndSendFileVideo(url, sock, from, quoted) {
    try {
        const start = performance.now()

        // cek ukuran file
        const head = await axios.head(url)
        const size = parseInt(head.headers["content-length"] || 0)
        const sizeMB = size / (1024 * 1024)

        if (sizeMB > 20) {
            return await sock.sendMessage(from, {
                text: `❌ Ukuran media terlalu besar (${sizeMB.toFixed(2)} MB)\nMaksimal 20 MB`
            }, { quoted })
        }

        // pesan loading
        const msg = await sock.sendMessage(from, {
            text: "📥 Sedang mengirim media..."
        }, { quoted })

        const end = performance.now()
        const totalTime = ((end - start) / 1000).toFixed(2)

        // kirim file
        await sock.sendMessage(from, {
            document: { url },
            fileName: "file.mp4",
            mimetype: "video/mp4",
            caption: `✅ *Berhasil dikirim*\n⏱️ Proses: ${totalTime} detik`
        }, { quoted })

    } catch (err) {
        console.error("Error downloadAndSendFileVideo:", err)

        await sock.sendMessage(from, {
            text: `❌ Gagal mengirim file\n${err?.message || err}`
        }, { quoted })
    }
}

async function fetchBuffer(string, options = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            if (/^https?:\/\//i.test(string)) {
                let data = await axios.get(string, {
                    headers: {
                        ...(!!options.headers ? options.headers : {}),
                    },
                    responseType: "arraybuffer",
                    ...options,
                })
                let buffer = await data?.data
                let name = /filename/i.test(data.headers?.get("content-disposition")) ? data.headers?.get("content-disposition")?.match(/filename=(.*)/)?.[1]?.replace(/["';]/g, '') : ''
                let mimeh = mime.lookup(name) || data.headers.get("content-type") || (await fileTypeFromBuffer(buffer))?.mimeh
                resolve({
                    data: buffer,
                    size: Buffer.byteLength(buffer),
                    sizeH: formatSize(Buffer.byteLength(buffer)),
                    name,
                    mimeh,
                    ext: mime.extension(mimeh)
                });
            } else if (/^data:.*?\/.*?;base64,/i.test(string)) {
                let data = Buffer.from(string.split`,` [1], "base64")
                let size = Buffer.byteLength(data)
                resolve({
                    data,
                    size,
                    sizeH: formatSize(size),
                    ...((await fileTypeFromBuffer(data)) || {
                        mimeh: "application/octet-stream",
                        ext: ".bin"
                    })
                });
            } else if (fs.existsSync(string) && fs.statSync(string).isFile()) {
                let data = fs.readFileSync(string)
                let size = Buffer.byteLength(data)
                resolve({
                    data,
                    size,
                    sizeH: formatSize(size),
                    ...((await fileTypeFromBuffer(data)) || {
                        mimeh: "application/octet-stream",
                        ext: ".bin"
                    })
                });
            } else if (Buffer.isBuffer(string)) {
                let size = Buffer?.byteLength(string) || 0
                resolve({
                    data: string,
                    size,
                    sizeH: formatSize(size),
                    ...((await fileTypeFromBuffer(string)) || {
                        mimeh: "application/octet-stream",
                        ext: ".bin"
                    })
                });
            } else if (/^[a-zA-Z0-9+/]={0,2}$/i.test(string)) {
                let data = Buffer.from(string, "base64")
                let size = Buffer.byteLength(data)
                resolve({
                    data,
                    size,
                    sizeH: formatSize(size),
                    ...((await fileTypeFromBuffer(data)) || {
                        mimeh: "application/octet-stream",
                        ext: ".bin"
                    })
                });
            } else {
                let buffer = Buffer.alloc(20)
                let size = Buffer.byteLength(buffer)
                resolve({
                    data: buffer,
                    size,
                    sizeH: formatSize(size),
                    ...((await fileTypeFromBuffer(buffer)) || {
                        mimeh: "application/octet-stream",
                        ext: ".bin"
                    })
                });
            }
        } catch (e) {
            reject(new Error(e?.message || e))
        }
    });
}

        // 🔧 Helper download PP
async function downloadProfilePicture(url, filepath) {
    const res = await axios.get(url, {
        responseType: 'arraybuffer'
    });
    fs.writeFileSync(filepath, res.data);
}

    // Warna ANSI (tanpa library)
    const color = {
        reset: "\x1b[0m",
        bright: "\x1b[1m",
        dim: "\x1b[2m",
        fgGreen: "\x1b[32m",
        fgCyan: "\x1b[36m",
        fgYellow: "\x1b[33m",
        fgMagenta: "\x1b[35m",
        fgBlue: "\x1b[34m",
        fgRed: "\x1b[31m",
        fgWhite: "\x1b[37m",
    };

    // Handler pesan
    async function logMessage(sock, m) {
        const isGroup = m.key.remoteJid.endsWith("@g.us");
        const senderName = m.pushName || "Unknown";
        const senderNumber = m.key.participant || m.key.remoteJid || "Unknown";

        // ✅ FIX: Ambil metadata grup biar gak "Unknown Group"
        let groupName = null;
        if (isGroup) {
            try {
                const meta = await sock.groupMetadata(m.key.remoteJid);
                groupName = meta.subject || "(No Subject)";
            } catch {
                groupName = "(Unknown Group)";
            }
        }

        const messageType = m.message ? Object.keys(m.message)[0] : "unknown";

        // Tentukan emoji sesuai tipe pesan
        let emojiType = "💬";
        if (messageType.includes("image")) emojiType = "📷";
        else if (messageType.includes("video")) emojiType = "🎥";
        else if (messageType.includes("sticker")) emojiType = "💟";
        else if (messageType.includes("audio")) emojiType = "🎵";
        else if (messageType.includes("document")) emojiType = "📄";
        else if (messageType.includes("contact")) emojiType = "👤";
        else if (messageType.includes("location")) emojiType = "📍";
        else if (messageType.includes("reaction")) emojiType = "❤️";
        else emojiType = "💬";

        // Ambil isi pesan
        const messageContent =
            m.body ||
            m.message?.conversation ||
            m.message?.extendedTextMessage?.text ||
            `[${emojiType} ${messageType.replace("Message", "").toUpperCase()}]`;

        // Cek apakah pesan adalah command
        const isCmd = m.body && m.body.startsWith(m.prefix);
        const commandName = isCmd ? m.body.slice(m.prefix.length).split(" ")[0] : null;

        // Waktu
        const time = new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        // Format log
        console.log(
            `\n${color.fgGreen}${color.bright}${emojiType} ${isGroup ? "GROUP MESSAGE" : "PRIVATE MESSAGE"}${color.reset}\n` +
            `${color.fgCyan}👤 From :${color.reset} ${senderName} ${color.dim}(${senderNumber.replace(/@s\.whatsapp\.net|@g\.us/g, "")})${color.reset}\n` +
            (isGroup ? `${color.fgMagenta}👥 Group:${color.reset} ${groupName}\n` : "") +
            `${color.fgYellow}💬 Type :${color.reset} ${messageType}\n` +
            `${color.fgBlue}🕒 Time :${color.reset} ${time}\n` +
            `${color.fgRed}📝 Body :${color.reset} ${messageContent}\n` +
            (isCmd ?
                `${color.fgWhite}${color.bright}⚡ Command Detected!${color.reset} ${color.fgGreen}${m.prefix}${commandName}${color.reset}\n` :
                `${color.dim}💬 Regular Message${color.reset}\n`)
        );
    }

//━━━━━━━━━━━━━━━[ CHAR SISTEM ]━━━━━━━━━━━━━━━\\

async function cariKarakter(keyword, page = 1, limit = 10, retry = 2) {
  const offset = (page - 1) * limit
  const url = `https://api.jikan.moe/v4/characters?q=${encodeURIComponent(keyword)}&limit=${limit}&offset=${offset}`

  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Gagal fetch dari MAL')
    const json = await res.json()
    return json.data || []
  } catch (e) {
    if (retry > 0) {
      await sleep(1000)
      return cariKarakter(keyword, page, limit, retry - 1)
    }
    throw e
  }
}

function filterRelevan(results, keyword) {
  keyword = keyword.toLowerCase()

  return results
    .map(ch => {
      let skor = 0
      const nama = (ch.name || '').toLowerCase()

      if (nama === keyword) skor += 100
      if (nama.includes(keyword)) skor += 50
      if (ch.favorites) skor += ch.favorites / 100

      return { ...ch, skor }
    })
    .sort((a, b) => b.skor - a.skor)
}

async function sendCharListPage1(m, sock) {
global.db.charListReader ??= {}
  const reader = global.db.charListReader?.[m.sender]
  if (!reader) return

  const ch = reader.data[reader.index]
  if (!ch) return

  const caption =
`✨ *Karakter Anime*
━━━━━━━━━━━━━━━━
👤 Nama: *${ch.name}*
🆔 MAL ID: ${ch.mal_id}
❤️ Favorites: ${ch.favorites ?? 0}
📄 Halaman: ${reader.index + 1}/${reader.total}

━━━━━━━━━━━━━━━━
➡️ Lanjut: ${m.prefix}lagi
⚠️ Ambil: ${m.prefix}getchar ${ch.mal_id}`

  await sock.sendMessage(m.from, {
    image: { url: ch.images?.jpg?.image_url || ch.images?.webp?.image_url },
    caption
  }, { quoted: m })
}

// ===== FUNGSI PENGIRIM HALAMAN KARAKTER (dengan keterangan dan tombol) =====
async function sendCharListPage(m, sock) {
global.db.charListReader ??= {}
  const reader = global.db.charListReader?.[m.sender]
  if (!reader) return

  const ch = reader.data[reader.index]
  if (!ch) return

  // Bangun caption dengan informasi karakter dan navigasi
  let caption = 
`✨ *Karakter Anime*
━━━━━━━━━━━━━━━━
👤 Nama: *${ch.name}*
🆔 MAL ID: ${ch.mal_id}
❤️ Favorites: ${ch.favorites ?? 0}
📄 Halaman: ${reader.index + 1}/${reader.total}

➡️ Lanjut: ${m.prefix}lagi
⚠️ Ambil: ${m.prefix}getchar ${ch.mal_id}
━━━━━━━━━━━━━━━━`

  // Tambahkan petunjuk pemilihan nomor (seperti di Pinterest)
  caption += `\n📌 *Pilih langsung:* Silahkan *reply/balas* pesan ini dengan ketik nomor 1-${reader.total}.\n`
  caption += `📄 *Halaman saat ini:* ${reader.index + 1} dari ${reader.total}\n\n`

  // Buat tombol untuk setiap nomor (1..total)
  const buttons = []
  for (let j = 1; j <= reader.total; j++) {
    buttons.push({
      nama: j.toString(),
      cmd: `${m.prefix}charselect ${j}`
    })
  }

  // Tambahkan metadata tombol (asumsi fungsi tambahButton sudah ada)
  const metadata = tambahButton(m.from, ...buttons)
  caption += `Metadata: ${metadata}`

  await sock.sendMessage(m.from, {
    image: { url: ch.images?.jpg?.image_url || ch.images?.webp?.image_url },
    caption
  }, { quoted: m })
}

// Fungsi untuk mengirim satu halaman gambar Pinterest
async function sendPinterestPage(m, sock) {
    const data = global.db.pinterestReader?.[m.sender];
    if (!data) return false;

    const i = data.index;
    const url = data.images[i];
    const total = data.total;
    const query = data.query;

    try {
        let caption = `📌 *Pinterest: ${query}*\n🖼️ Gambar ${i+1} dari ${total}\n\n`;

        // Informasi navigasi
        if (i + 1 < total) {
            caption += `➡️ Ketik *${m.prefix}pinnext* untuk gambar berikutnya\n`;
        } else {
            caption += `⛔ Ini gambar terakhir. Sesi selesai.\n`;
        }
        caption += `━━━━━━━━━━━━━━\n`;
        caption += `📌 Balas dengan nomor 1-${total} untuk langsung ke gambar yang dipilih.\n\n`;

        // --- Buat tombol untuk semua nomor (tanpa batasan) ---
        const buttons = [];
        for (let j = 1; j <= total; j++) {
            buttons.push({
                nama: j.toString(),
                cmd: `${m.prefix}pinselect ${j}`
            });
        }
        // Panggil tambahButton dengan spread operator
        const metadata = tambahButton(m.from, ...buttons);
        caption += `Metadata: ${metadata}`;
        // ------------------------------------------------
        
  await sock.sendMessage(m.from, {
    image: { url: 'https://pelerv3.vercel.app/api/canvas?type=compress&url=' + url },
    caption
  }, { quoted: m })

        // Update sesi: jika gambar terakhir, hapus; jika tidak, naikkan indeks
        if (i + 1 >= total) {
            delete global.db.pinterestReader[m.sender];
        } else {
            data.index++;
        }
        return true;
    } catch (error) {
        console.error('Gagal mengirim gambar Pinterest:', error);
        await sock.sendMessage(
            m.from,
            { text: `❌ Gagal memuat gambar: ${error.message}. Silakan coba *${m.prefix}pinnext* lagi.` },
            { quoted: m }
        );
        return false;
    }
}

async function sendBingPage(m, sock) {
    const data = global.db.bingReader?.[m.sender];
    if (!data || !data.items) {
        delete global.db.bingReader?.[m.sender];
        await sock.sendMessage(
            m.from,
            { text: `❌ Sesi tidak valid. Silakan cari ulang dengan *${m.prefix}bing <query>*` },
            { quoted: m }
        );
        return false;
    }

    const i = data.index;
    const item = data.items[i];
    const url = item.image;
    const title = item.title;
    const source = item.source;
    const total = data.total;
    const query = data.query;

    try {
        let caption = `🔍 *Bing Image: ${query}*\n`;
        caption += `📌 *Judul:* ${title}\n`;
        caption += `🔗 *Sumber:* ${source}\n`;
        caption += `🖼️ Gambar ${i+1} dari ${total}\n\n`;

        // Informasi navigasi
        if (i + 1 < total) {
            caption += `➡️ Ketik *${m.prefix}bingnext* untuk gambar berikutnya\n`;
        } else {
            caption += `⛔ Ini gambar terakhir. Sesi selesai.\n`;
        }
        caption += `━━━━━━━━━━━━━━\n`;
        caption += `📌 Balas pesan ini dengan nomor 1-${total} untuk langsung ke gambar yang dipilih.\n\n`;

        // Buat tombol untuk semua nomor
        const buttons = [];
        for (let j = 1; j <= total; j++) {
            buttons.push({
                nama: j.toString(),
                cmd: `${m.prefix}bingselect ${j}`
            });
        }
        const metadata = tambahButton(m.from, ...buttons);
        caption += `Metadata: ${metadata}`;

  await sock.sendMessage(m.from, {
    image: { url: 'https://pelerv3.vercel.app/api/canvas?type=compress&url=' + url },
    caption
  }, { quoted: m })

        // Update sesi: jika gambar terakhir, hapus; jika tidak, naikkan indeks
        if (i + 1 >= total) {
            delete global.db.bingReader[m.sender];
        } else {
            data.index++;
        }
        return true;
    } catch (error) {
        console.error('Gagal mengirim gambar Bing:', error);
        await sock.sendMessage(
            m.from,
            { text: `❌ Gagal memuat gambar: ${error.message}. Silakan coba *${m.prefix}bingnext* lagi.` },
            { quoted: m }
        );
        return false;
    }
}

// ========== FUNGSI UNTUK MENGIRIM HASIL WHATANIME PER HALAMAN ==========
async function sendWhatAnimePage(m, sock) {
    // Pastikan objek global.db.whatanime ada (untuk jaga-jaga)
    if (!global.db.whatanime) global.db.whatanime = {};
    
    const data = global.db.whatanime[m.sender];
    if (!data || !data.results || data.results.length === 0) {
        delete global.db.whatanime?.[m.sender];
        await sock.sendMessage(
            m.from,
            { text: `❌ Sesi tidak valid. Silakan cari ulang dengan *${m.prefix}whatanime* dengan mengirim atau reply gambar anime.` },
            { quoted: m }
        );
        return false;
    }

    const i = data.index;
    const result = data.results[i];
    const total = data.total;
    const { filename, episode, similarity, from, to, image } = result;

    // Membuat caption dengan informasi yang tersedia
    let caption = `🔍 *WhatAnime Result ${i+1}/${total}*\n\n`;
    caption += `📁 *File:* ${filename}\n`;
    caption += `🎬 *Episode:* ${episode !== null ? episode : 'Unknown'}\n`;
    caption += `📊 *Similarity:* ${(similarity * 100).toFixed(2)}%\n`;
    caption += `⏱️ *Timestamp:* ${from.toFixed(2)}s - ${to.toFixed(2)}s\n\n`;

    // Informasi navigasi
    if (i + 1 < total) {
        caption += `➡️ Ketik *${m.prefix}whatanimenext* untuk hasil berikutnya\n`;
    } else {
        caption += `⛔ Ini hasil terakhir. Sesi selesai.\n`;
    }
    caption += `━━━━━━━━━━━━━━\n`;
    caption += `📌 Balas pesan ini dengan nomor 1-${total} untuk langsung ke hasil yang dipilih.\n\n`;

    // Tombol untuk semua nomor (menggunakan fungsi tambahButton yang sudah ada)
    const buttons = [];
    for (let j = 1; j <= total; j++) {
        buttons.push({
            nama: j.toString(),
            cmd: `${m.prefix}whatanimeselect ${j}`
        });
    }
    const metadata = tambahButton(m.from, ...buttons);
    caption += `Metadata: ${metadata}`;

    // Kirim gambar hasil
    await sock.sendMessage(
        m.from,
        {
            image: { url: image },
            caption: caption
        },
        { quoted: m }
    );

    // Update indeks sesi
    if (i + 1 >= total) {
        delete global.db.whatanime[m.sender];
    } else {
        data.index++;
    }
    return true;
}

// ==================== FITUR CARI STIKER DENGAN METADATA (HANYA ANGKA PACK) & NAVIGASI PER STIKER ====================

// Inisialisasi sesi
if (!global.db.stickerSearch) global.db.stickerSearch = {};
if (!global.db.stickerPackSession) global.db.stickerPackSession = {};

// Fungsi mengirim daftar pack dengan metadata HANYA untuk angka pack, navigasi prev/next/batal berupa teks
async function sendStickerList(m, sock, session) {
    const { query, page, packs } = session;
    const totalPacks = packs.length;
    let caption = `📦 *Hasil pencarian: ${query}*\n`;
    caption += `Halaman ${page} | ${totalPacks} pack ditemukan\n\n`;
    packs.forEach((pack, idx) => {
        caption += `${idx+1}. *${pack.title}* (by ${pack.username})\n`;
    });
    caption += `\n━━━━━━━━━━━━━━━━━━━━\n`;
    caption += `📌 Balas pesan ini dengan nomor 1-${totalPacks} untuk memilih pack.\n`;
    
    // Navigasi teks (tanpa tombol)
    if (session.pagination?.prev) caption += `⏪ Ketik *${m.prefix}stickerprev* untuk halaman sebelumnya\n`;
    if (session.pagination?.next) caption += `⏩ Ketik *${m.prefix}stickernext* untuk halaman berikutnya\n`;
    caption += `❌ Ketik *${m.prefix}stickerbatal* untuk membatalkan sesi.\n\n`;

    // Metadata hanya untuk tombol angka pack (1..N)
    const buttons = [];
    for (let i = 0; i < totalPacks; i++) {
        buttons.push({
            nama: (i+1).toString(),
            cmd: `${m.prefix}stickerpilih ${i+1}`
        });
    }
    const metadata = tambahButton(m.from, ...buttons);
    caption += `Metadata: ${metadata}`;

    await sock.sendMessage(m.from, { text: caption }, { quoted: m });
}

//━━━━━━━━━━━━━━━[ SPACK ]━━━━━━━━━━━━━━━\\

// ===== Helper download
async function downloadBuffer(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Gagal download: ${res.statusText}`);
    return Buffer.from(await res.arrayBuffer());
}

// ===== Convert Image → WebP
async function imageToWebp(buffer) {
    return await sharp(buffer)
        .resize(512, 512, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .webp({ quality: 80 })
        .toBuffer();
}

// ===== Convert GIF → WebP (Animated)
async function videoToWebp(buffer) {
    const tmpIn = path.join(tempDir, `in_${Date.now()}.gif`);
    const tmpOut = path.join(tempDir, `out_${Date.now()}.webp`);

    fs.writeFileSync(tmpIn, buffer);

    execSync(`
ffmpeg -y -i ${tmpIn} -vf "scale=512:512:force_original_aspect_ratio=decrease,fps=15" \
-vcodec libwebp -loop 0 -preset default -an -vsync 0 \
-s 512:512 ${tmpOut}
    `);

    const out = fs.readFileSync(tmpOut);

    fs.unlinkSync(tmpIn);
    fs.unlinkSync(tmpOut);

    return out;
}

// Fungsi utama: mengirim pack stiker sebagai file .wastickers
async function sendStickerPack(sock, jid, stickers, opt = {}) {
    if (!stickers?.length) throw new Error('Tidak ada stiker');

    const packId = crypto.randomUUID();
    const packDir = path.join(tempDir, `pack_${Date.now()}`);
    fs.mkdirSync(packDir, { recursive: true });

    const meta = []; // menyimpan { fileName, isAnimated }
    let trayBuf = null; // untuk cover

    for (let buf of stickers) {
        try {
            if (typeof buf === 'string') {
                buf = buf.startsWith('http')
                    ? await downloadBuffer(buf)
                    : fs.readFileSync(buf);
            }
            if (!Buffer.isBuffer(buf) || buf.length < 100) continue;

            const header = buf.slice(0, 10).toString('hex');
            const isGif = header.startsWith('47494638');
            const isWebp = header.startsWith('52494646');

            let webp;
            if (isGif) {
                webp = await videoToWebp(buf);
            } else if (isWebp) {
                webp = buf;
            } else {
                webp = await imageToWebp(buf);
            }
            if (!webp || webp.length < 100) continue;

            // Tambah EXIF metadata
            webp = await writeExifWebp(webp, {
                packName: opt.name || 'Sticker Pack',
                packPublish: opt.author || 'Bot',
                emojis: opt.emojis || ['✨']
            });

            // Cek ukuran (statis: PNG diubah ke WebP <100KB? Sebenarnya statis juga bisa WebP)
            // WhatsApp: statis <= 100KB, animasi <= 500KB. Kita asumsikan semua WebP.
            const maxSize = isGif ? 500 * 1024 : 100 * 1024;
            if (webp.length > maxSize) continue;

            // Nama file: unix timestamp + ekstensi .webp
            const timestamp = Date.now() + meta.length;
            const fname = `${timestamp}.webp`;
            fs.writeFileSync(path.join(packDir, fname), webp);

            if (!trayBuf) trayBuf = webp; // ambil stiker pertama untuk cover

            meta.push({
                fileName: fname,
                isAnimated: isGif
            });
        } catch (e) {
            console.log('Skip stiker error:', e.message);
        }
    }

    if (meta.length === 0) {
        fs.rmSync(packDir, { recursive: true, force: true });
        throw new Error('Tidak ada stiker valid');
    }

    // Buat cover.png (96x96) dari trayBuf
    const coverBuf = await sharp(trayBuf)
        .resize(96, 96, { fit: 'contain' })
        .png()
        .toBuffer();
    fs.writeFileSync(path.join(packDir, 'cover.png'), coverBuf);

    // Buat author.txt dan title.txt
    const author = opt.author || 'Bot';
    const title = opt.name || 'Sticker Pack';
    fs.writeFileSync(path.join(packDir, 'author.txt'), author);
    fs.writeFileSync(path.join(packDir, 'title.txt'), title);

    // ZIP semua file tanpa struktur folder (junk-paths)
    const zipPath = path.join(tempDir, `${packId}.wastickers`);
    await new Promise((resolve, reject) => {
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });
        output.on('close', resolve);
        archive.on('error', reject);
        archive.pipe(output);

        // Tambahkan file ke root zip
        archive.file(path.join(packDir, 'author.txt'), { name: 'author.txt' });
        archive.file(path.join(packDir, 'title.txt'), { name: 'title.txt' });
        archive.file(path.join(packDir, 'cover.png'), { name: 'cover.png' });
        for (const st of meta) {
            archive.file(path.join(packDir, st.fileName), { name: st.fileName });
        }
        archive.finalize();
    });

    const zipBuf = fs.readFileSync(zipPath);

    // Kirim sebagai dokumen (atau bisa juga langsung kirim sebagai pesan stiker pack, tapi untuk .wastickers lebih mudah)
    const safeName = title.replace(/[^\w\s]/gi, '');
    const fileName = `${safeName}.wastickers`;
    const caption = `📦 *${title}*\n👤 *Author:* ${author}\n📊 *Total stickers:* ${meta.length}\n\n> Klik file ini, buka dengan *Sticker Maker*\nhttps://play.google.com/store/apps/details?id=com.marsvard.stickermakerforwhatsapp`;

    await sock.sendMessage(jid, {
        document: zipBuf,
        fileName: fileName,
        mimetype: 'application/octet-stream',
        caption: caption
    });

    // Bersihkan temporary files
    fs.rmSync(packDir, { recursive: true, force: true });
    try { fs.unlinkSync(zipPath); } catch {}

    console.log('✅ Sticker pack berhasil dikirim sebagai .wastickers');
    return true;
}

//━━━━━━━━━━━━━━━[ BOKEP ]━━━━━━━━━━━━━━━\\

// ========================
// 0. Konfigurasi (pastikan sudah ada di environment)
// ========================
// DNS over HTTPS (Cloudflare)
const dnsOverHttps = async (url) => {
  const options = {
    method: 'GET',
    hostname: 'cloudflare-dns.com',
    path: `/dns-query?name=${url.hostname}&type=A`,
    headers: { 'accept': 'application/dns-json' }
  };
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const response = JSON.parse(data);
        if (response.Answer) resolve(response.Answer[0].data);
        else reject(new Error('No DNS answer found'));
      });
    });
    req.on('error', reject);
    req.end();
  });
};

// Ambil HTML dengan DNS over HTTPS
const getData = async (link) => {
  try {
    const url = new URL(link);
    const ip = await dnsOverHttps(url);
    const newUrl = new URL(link);
    newUrl.hostname = ip;

    const response = await axios({
      method: 'get',
      url: newUrl.href,
      headers: { 'Host': url.hostname }
    });
    return response.data;
  } catch (error) {
    console.error('❌ Gagal mengambil halaman:', error.message);
    return null;
  }
};

const getDataCustom = async (link, options = {}) => {
  try {
    const url = new URL(link);
    const ip = await dnsOverHttps(url);
    const newUrl = new URL(link);
    newUrl.hostname = ip;

    const response = await axios({
      method: 'get',
      url: newUrl.href,
      headers: { 
        'Host': url.hostname, 
        'User-Agent': 'Mozilla/5.0',
        ...options.headers
      },
      timeout: options.timeout || 20000
    });
    return response.data;
  } catch (error) {
    console.error('❌ Gagal mengambil halaman:', error.message);
    return null;
  }
};

const delay = (ms) => new Promise(r => setTimeout(r, ms));

// ========================
// 1. SCRAPER CLASSES
// ========================
class UploadTerbaruScraper {
  constructor(html) {
    this.$ = cheerio.load(html);
  }
  ambilDataUploadTerbaru() {
    const hasil = [];
    this.$('section:has(h2:contains("Video Unggulan")) article').each((i, el) => {
      const $el = this.$(el);
      const link = $el.find('a[title]').first().attr('href') || '';
      const title = $el.find('a[title]').first().attr('title')?.trim() || '';
      const img = $el.find('img').first().attr('src') || '';
      if (title && link) hasil.push({ title, link, image: img });
    });
    return hasil;
  }
}

class HasilPencarian {
  constructor(html, baseUrl = 'https://duniastreaming.net') {
    this.$ = cheerio.load(html);
    this.baseUrl = baseUrl;
  }
  ambilData() {
    const hasil = [];
    this.$('div[itemprop="itemListElement"]').each((i, el) => {
      const $el = this.$(el);
      const title = $el.find('h3[itemprop="name"]').text().trim();
      let link = $el.find('a[href^="video?id="]').attr('href');
      if (!link) link = $el.find('a.mt-3.block').attr('href');
      const image = $el.find('meta[itemprop="thumbnailUrl"]').attr('content');
      if (title && link && image) {
        const absoluteLink = link.startsWith('http') ? link : `${this.baseUrl}/${link.replace(/^\//, '')}`;
        hasil.push({ title, link: absoluteLink, image });
      }
    });
    return hasil;
  }
}

// Ambil total halaman dari pagination (untuk hasil pencarian)
function ambilTotalHalaman(html) {
  try {
    const $ = cheerio.load(html);
    let maxPage = 1;
    $('a').each((_, el) => {
      const href = $(el).attr('href');
      if (href && href.includes('page=')) {
        const match = href.match(/page=(\d+)/);
        if (match) {
          const pageNum = parseInt(match[1]);
          if (pageNum > maxPage) maxPage = pageNum;
        }
      }
    });
    return maxPage;
  } catch (err) {
    return 1;
  }
}

// Bangun URL pencarian dengan halaman
function buildSearchUrl(query, page = 1) {
  return `https://duniastreaming.net/search?query=${encodeURIComponent(query)}&page=${page}`;
}

// Ambil data pencarian untuk halaman tertentu
async function getSearchPage(query, page) {
  const url = buildSearchUrl(query, page);
  const html = await getDataCustom(url);
  if (!html) return null;
  const parser = new HasilPencarian(html);
  const items = parser.ambilData();
  const totalPages = ambilTotalHalaman(html);
  return { items, totalPages };
}

class VideoDownloadLinkExtractor {
  constructor(html, baseUrl) {
    this.$ = cheerio.load(html);
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }
  async getServerLinks() {
    const videoId = this.$("#video-id").val() || "";
    const servers = [];
    this.$(".server-select-btn").each((_, el) => {
      const server = this.$(el).data("server");
      if (server) servers.push({ server, url: `${this.baseUrl}/video?id=${videoId}&server=${server}` });
    });
    return servers;
  }
  decodeSource(encoded) {
    try { return Buffer.from(encoded, "base64").toString("utf8"); } catch { return null; }
  }
  async getDownloadLinkFromServer(serverObj) {
    try {
      console.log(`🔍 Mengambil server: ${serverObj.server} ...`);
      const html = await getDataCustom(serverObj.url);
      if (!html) throw new Error("Tidak bisa ambil halaman server");
      const $ = cheerio.load(html);
      const href = $("#active-download-btn").attr("href");
      if (!href) return { server: serverObj.server, real_url: null };
      const urlObj = new URL(href, this.baseUrl);
      const encoded = urlObj.searchParams.get("get_source");
      const decoded = encoded ? this.decodeSource(encoded) : null;
      return { server: serverObj.server, real_url: decoded };
    } catch (err) {
      return { server: serverObj.server, real_url: null, error: err.message };
    }
  }
  async getAllDownloadLinks() {
    const servers = await this.getServerLinks();
    const results = [];
    for (const [idx, s] of servers.entries()) {
      const result = await this.getDownloadLinkFromServer(s);
      results.push(result);
      if (idx < servers.length - 1) await delay(10000);
    }
    return results;
  }
}

// ========================
// 2. STATE MANAGEMENT
// ========================
global.db.duniaStreaming ??= {};

// ========================
// 3. FUNGSI PENGIRIM DENGAN TOMBOL
// ========================
async function sendUploadPage(m, sock) {
  const data = global.db.duniaStreaming[m.sender]?.upload;
  if (!data) return false;
  const { items, index, total } = data;
  const item = items[index];
  
  // Caption tanpa link asli
  const caption = `📺 *Upload Terbaru (Video Unggulan)*\n━━━━━━━━━━━━━━━━━━\n🎬 *${item.title}*\n\n📄 *Halaman ${index+1} dari ${total}*\n\n➡️ *${m.prefix}dsnext* - berikutnya\n⬅️ *${m.prefix}dsprev* - sebelumnya\n🔢 *${m.prefix}dsselect <nomor>* - langsung ke nomor tertentu\n💾 *${m.prefix}dsdownload* - dapatkan link download video ini`;

  // Buat tombol untuk setiap nomor
  const buttons = [];
  for (let i = 1; i <= total; i++) buttons.push({ nama: i.toString(), cmd: `${m.prefix}dsselect ${i}` });
  const metadata = tambahButton(m.from, ...buttons);
  const finalCaption = caption + `\n\nMetadata: ${metadata}`;

const res = await fetch(item.image)
const buffer = await res.buffer()

  try {
    await sock.sendMessage(m.from, {
      image: buffer,
      caption: finalCaption
    }, { quoted: m });
  } catch (error) {
    console.log(error);
    m.reply(finalCaption);
  }

  // Simpan link video aktif untuk dsdownload
  global.db.duniaStreaming[m.sender].activeVideoLink = item.link;

  if (index + 1 >= total) delete global.db.duniaStreaming[m.sender];
  else data.index++;
  return true;
}

async function sendSearchPage(m, sock) {
  const data = global.db.duniaStreaming[m.sender]?.search;
  if (!data) return false;
  const { items, index, total, query, currentPage, totalPages } = data;
  const item = items[index];
  
  const caption = `🔎 *Hasil Pencarian: ${query}* (Halaman ${currentPage}/${totalPages})\n━━━━━━━━━━━━━━━━━━\n🎬 *${item.title}*\n\n📄 *Item ${index+1} dari ${total}*\n\n➡️ *${m.prefix}dsnext* - item berikutnya\n⬅️ *${m.prefix}dsprev* - item sebelumnya\n🔢 *${m.prefix}dsselect <nomor>* - langsung ke item tertentu\n📄 *${m.prefix}dsnextpage* - halaman berikutnya\n📄 *${m.prefix}dsprevpage* - halaman sebelumnya\n💾 *${m.prefix}dsdownload* - dapatkan link download video ini`;

  const buttons = [];
  for (let i = 1; i <= total; i++) buttons.push({ nama: i.toString(), cmd: `${m.prefix}dsselect ${i}` });
  const metadata = tambahButton(m.from, ...buttons);
  const finalCaption = caption + `\n\nMetadata: ${metadata}`;

const res = await fetch(item.image)
const buffer = await res.buffer()

  try {
    await sock.sendMessage(m.from, {
      image: buffer,
      caption: finalCaption
    }, { quoted: m });
  } catch (error) {
    console.log(error);
    m.reply(finalCaption);
  }

  // Simpan link video aktif
  global.db.duniaStreaming[m.sender].activeVideoLink = item.link;

  if (index + 1 >= total) delete global.db.duniaStreaming[m.sender];
  else data.index++;
  return true;
}

//━━━━━━━━━━━━━━━[ BETA ]━━━━━━━━━━━━━━━\\

function getInstagramPosts(username) {
  return new Promise((resolve, reject) => {
    const curlCommand = `
curl 'https://api-wh.picuki.site/api/v1/instagram/postsV2' \
  -H 'authority: api-wh.picuki.site' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7' \
  -H 'content-type: application/json' \
  -H 'origin: https://picuki.site' \
  -H 'referer: https://picuki.site/' \
  -H 'sec-ch-ua: "Chromium";v="139", "Not;A=Brand";v="99"' \
  -H 'sec-ch-ua-mobile: ?1' \
  -H 'sec-ch-ua-platform: "Android"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-site' \
  -H 'user-agent: Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36' \
  --data-raw '{"maxId":"","username":"otaku_anime_indonesia","_sc":0,"_ef":0,"_df":0,"ts":1772031902529,"_ts":1771372443814,"_tsc":0,"_sv":2,"_s":"ae29ea0733fbaa63c1c0e4415e50c31c21bacb884c51afaa43060bbec9b670dd"}' \
  --compressed
`

    exec(curlCommand, { maxBuffer: 1024 * 1024 * 20 }, (error, stdout) => {
      if (error) return reject(error)

      try {
        const json = JSON.parse(stdout)
        const edges = json?.result?.edges ?? []
        resolve(edges)
      } catch (err) {
        reject(err)
      }
    })
  })
}

async function sendIgNewsPage(m, sock) {
  const reader = global.db.igNewsReader[m.sender]
  const item = reader.data[reader.index]
  const node = item.node

  const caption =
    `📢 *Instagram News*\n\n` +
    `👤 Username: ${reader.username}\n` +
    `❤️ Likes: ${node.edge_media_preview_like?.count || 0}\n` +
    `💬 Komentar: ${node.edge_media_to_comment?.count || 0}\n\n` +
    `${node.edge_media_to_caption?.edges?.[0]?.node?.text || 'Tanpa caption'}\n\n` +
    `📄 ${reader.index + 1} / ${reader.total}\n` +
    `Ketik *${m.prefix}ignewsnext* untuk lanjut`

  try {
    const res = await axios.get(node.display_url, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    })

    const buffer = Buffer.from(res.data)

    await sock.sendMessage(
      m.from,
      {
        image: buffer,
        caption
      },
      { quoted: m }
    )

  } catch (err) {
    console.error("Gagal ambil gambar:", err)

    await m.reply(
      caption + "\n\n⚠️ Gambar gagal dimuat, hanya menampilkan teks."
    )
  }
}

//━━━━━━━━━━━━━━━[ LIBUR ]━━━━━━━━━━━━━━━\\

async function libur(year) {
    try {
        const res = await axios.get(`https://publicholidays.co.id/id/${year}-dates/`);
        const $ = cheerio.load(res.data);
        const array = [];

        $("table.publicholidays").eq(0).find("tbody tr").each((_, el) => {
            const date = $(el).find("td").eq(0).text().trim();
            const day = $(el).find("td").eq(1).text().trim();
            const name = $(el).find("td").eq(2).text().trim();

            if (date && name) {
                array.push({
                    date,
                    day,
                    name
                });
            }
        });

        if (array.length === 0) throw new Error("❌ Tidak ditemukan data libur.");

        return array;
    } catch (err) {
        throw new Error("❌ Gagal mengambil data libur: " + err.message);
    }
}

//━━━━━━━━━━━━━━━[ TIKTOK ]━━━━━━━━━━━━━━━\\

// Tiktod
const clean = (data) => {
    let regex = /(<([^>]+)>)/gi;
    data = data.replace(/(<br?\s?\/>)/gi, " \n");
    return data.replace(regex, "");
};
async function shortener(url) {
    return url;
}

async function tiktok(query) {
    let response = await axios("https://lovetik.com/api/ajax/search", {
        method: "POST",
        data: new URLSearchParams(Object.entries({
            query
        })),
    });

    let result = {};

    result.creator = "YNTKTS";
    result.title = clean(response.data.desc);
    result.author = clean(response.data.author);
    result.hd = await shortener(
        (response.data.links[0].a || "").replace("https", "http")
    );
    result.kurangHd = await shortener(
        (response.data.links[1].a || "").replace("https", "http")
    );
    result.audio = await shortener(
        (response.data.links[2].a || "").replace("https", "http")
    );
    result.thumbnail = await shortener(response.data.cover);
    return result;
}

async function tiktoks(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: 'POST',
                url: 'https://tikwm.com/api/feed/search',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': 'current_language=en',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
                },
                data: {
                    keywords: query,
                    count: 50,
                    cursor: 0,
                    HD: 1
                }
            });
            const videos = response.data.data.videos;
            if (videos.length === 0) {
                reject("Tidak ada video ditemukan.");
            } else {
                const gywee = Math.floor(Math.random() * videos.length);
                const videorndm = videos[gywee];

                const result = {
                    title: videorndm.title,
                    cover: videorndm.cover,
                    origin_cover: videorndm.origin_cover,
                    no_watermark: videorndm.play,
                    watermark: videorndm.wmplay,
                    music: videorndm.music
                };
                resolve(result);
            }
        } catch (error) {
            reject(error);
        }
    });
}

//━━━━━━━━━━━━━━━[ ENGAI FUNCTION (FILTER SISTEM) ]━━━━━━━━━━━━━━━\\

    function buatFolderDanFile(namaFile) {
        const folderPath = path.join(tempDir, "database-chatbot");
        const filePath = path.join(folderPath, `${namaFile}.json`);
        if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, {
            recursive: true
        });
        if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');
    }

    function tulisData(namaFile, data) {
        buatFolderDanFile(namaFile);
        fs.writeFileSync(path.join(tempDir, "database-chatbot", `${namaFile}.json`), JSON.stringify(data, null, 2));
    }

    function bacaData(namaFile) {
        buatFolderDanFile(namaFile);
        try {
            return JSON.parse(fs.readFileSync(path.join(tempDir, "database-chatbot", `${namaFile}.json`)));
        } catch {
            return [];
        }
    }

    function tambahData(namaFile, chat, respon) {
        const data = bacaData(namaFile);
        data.push({
            id: data.length + 1,
            chat,
            respon
        });
        tulisData(namaFile, data);
    }

    function ambilDataFormat(namaFile) {
        return bacaData(namaFile).flatMap(({
            chat,
            respon
        }) => [{
                role: "user",
                parts: [{
                    text: chat
                }]
            },
            {
                role: "model",
                parts: [{
                    text: respon
                }]
            }
        ]);
    }

    // Tambahkan fungsi untuk memeriksa apakah user di-filter
    function cekFilter(namaFile, user) {
        const filterData = bacaData(`${namaFile}-filter`);
        return filterData.includes(user);
    }

    // Tambahkan fungsi untuk menambahkan filter
    function tambahFilter(namaFile, user) {
        const filterData = bacaData(`${namaFile}-filter`);
        if (!filterData.includes(user)) {
            filterData.push(user);
            tulisData(`${namaFile}-filter`, filterData);
        }
    }

    // Tambahkan fungsi untuk menghapus filter
    function hapusFilter(namaFile, user) {
        const filterData = bacaData(`${namaFile}-filter`);
        const newFilterData = filterData.filter(u => u !== user);
        tulisData(`${namaFile}-filter`, newFilterData);
    }

//━━━━━━━━━━━━━━━[ LOAD & SAVE FILTER ]━━━━━━━━━━━━━━━\\

// Mengambil data filter
function loadFilter(namaFile) {
    try {
        return bacaData(`${namaFile}-filter`);
    } catch {
        return [];
    }
}

// Menyimpan data filter
function saveFilter(namaFile, data) {
    try {
        tulisData(`${namaFile}-filter`, data);
    } catch (err) {
        console.error('Gagal menyimpan filter:', err);
    }
}

//━━━━━━━━━━━━━━━[ REEDEM CODE ]━━━━━━━━━━━━━━━\\

const redeemPath = path.join(directory, 'temp/redeem.json');

// ===========================
// Fungsi Utama: Load & Save
// ===========================
function loadRedeemData() {
    try {
        const raw = fs.readFileSync(redeemPath, 'utf8');
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object' || !parsed.redeem) {
            throw new Error('redeem.json corrupt or invalid');
        }
        return parsed;
    } catch {
        const defaultData = {
            redeem: {}
        };
        fs.writeFileSync(redeemPath, JSON.stringify(defaultData, null, 2));
        return defaultData;
    }
}

function saveRedeemData(data) {
    fs.writeFileSync(redeemPath, JSON.stringify(data, null, 2));
}

// ===========================
// Tambahkan Kode Redeem
// ===========================
function addRedeemCode(code, data) {
    const db = loadRedeemData();
    db.redeem = db.redeem || {};
    db.redeem[code] = {
        reward: data.reward,
        expire: data.expire || null,
        limit: data.limit || null,
        claimed: [] // <- simpan user yang sudah klaim
    };
    saveRedeemData(db);
}

// ===========================
// Proses Redeem Kode
// ===========================
function redeemCode(m, code) {
    const db = loadRedeemData();
    const redeem = db.redeem?.[code];

    if (!redeem) return `❌ Code *${code}* tidak valid!`;

    if (redeem.expire && redeem.expire < Date.now()) {
        delete db.redeem[code];
        saveRedeemData(db);
        return `⏰ Code *${code}* sudah kadaluarsa dan telah dihapus dari sistem.`;
    }

    if (redeem.claimed.includes(m.sender)) {
        return `⚠️ Kamu sudah pernah klaim code *${code}*!`;
    }

    if (redeem.limit && redeem.claimed.length >= redeem.limit) {
        return `🚫 Code *${code}* sudah mencapai batas maksimal klaim (${redeem.limit})!`;
    }

    const user = loadUserData(m.sender);
    if (!user || !user.harvest) return `❌ Anda belum terdaftar!\n\n${global.balasan.tutorDaftar}`;
    let hadiahList = [];

    for (const [key, value] of Object.entries(redeem.reward)) {
        if (key === 'uang') {
            user.harvest.uang += value;
            hadiahList.push(`💰 Uang: +${value}`);
        } else {
            // Ubah huruf pertama jadi besar
            const keyCapitalized = key.charAt(0).toUpperCase() + key.slice(1);
            user.harvest.inventory[keyCapitalized] = (user.harvest.inventory[keyCapitalized] || 0) + value;
            hadiahList.push(`🎁 ${keyCapitalized}: +${value}`);
        }
    }

    redeem.claimed.push(m.sender);
    saveUserData(m.sender, user);
    saveRedeemData(db);

    return `✅ Kamu berhasil klaim code *${code}*!\n\n🎉 Hadiah yang kamu dapatkan:\n${hadiahList.map(v => '• ' + v).join('\n')}`;
}

// ===========================
// Hapus Semua Redeem Code
// ===========================
function deleteAllRedeemCodes() {
    const db = loadRedeemData();
    if (db.redeem && Object.keys(db.redeem).length > 0) {
        db.redeem = {};
        saveRedeemData(db);
        return "Semua kode redeem berhasil dihapus!";
    }
    return "Tidak ada kode redeem yang tersedia.";
}

// ===========================
// Hapus Redeem Berdasarkan Kode (tetap)
// ===========================
function deleteRedeemCode(code) {
    const db = loadRedeemData();

    if (db.redeem?.[code]) {
        delete db.redeem[code];
        saveRedeemData(db);
        return `Code ${code} berhasil dihapus!`;
    }

    return `Code ${code} tidak ditemukan!`;
}

// ===========================
// Hapus Redeem yang Expired
// ===========================
function deleteExpiredRedeem() {
    const db = loadRedeemData();
    const now = Date.now();

    // Pastikan db.redeem selalu berupa object
    if (!db.redeem || typeof db.redeem !== 'object') {
        db.redeem = {};
        saveRedeemData(db);
        return;
    }

    let expiredFound = false;

    for (const [code, data] of Object.entries(db.redeem)) {
        if (data.expire && data.expire < now) {
            delete db.redeem[code];
            expiredFound = true;
        }
    }

    if (expiredFound) saveRedeemData(db);
}

// Auto cleanup setiap menit
setInterval(deleteExpiredRedeem, 60 * 1000);

//━━━━━━━━━━━━━━━[ LOGIN LID ]━━━━━━━━━━━━━━━\\

const linkedPath = path.join(tempDir, 'linked.json');

function loadLinked() {
    try {
        return JSON.parse(fs.readFileSync(linkedPath));
    } catch {
        return {};
    }
}

function saveLinked(data) {
    fs.writeFileSync(linkedPath, JSON.stringify(data, null, 2));
}

// Versi safe: terima string, object { id: ... }, atau array dari keduanya
function getActualJID(input) {
  const linked = loadLinked(); // mis. { "123@lid": "123@s.whatsapp.net" }

  // helper untuk normalisasi satu item
  const norm = (item) => {
    if (!item && item !== 0) return null;           // null/undefined -> drop
    if (typeof item === 'object') {
      // beberapa lib mengirim object mention { id: '123@s.whatsapp.net', ... }
      if (item.id) item = item.id;
      else return String(item);                     // fallback
    }
    item = String(item);                            // pastikan string
    return item.endsWith('@lid') ? (linked[item] || item) : item;
  };

  if (Array.isArray(input)) {
    return input
      .map(norm)            // normalisasi tiap item
      .filter(Boolean);     // buang null/undefined/'' hasil norm
  }

  // single value
  return norm(input);
}

async function getGroupList(sock) {
    const groupsMeta = await sock.groupFetchAllParticipating();
    const groupList = [];
    let text = `📋 *Grup yang tersedia:*\n\n`;

    for (const [id, group] of Object.entries(groupsMeta)) {
        try {
            const metadata = await sock.groupMetadata(id);
            const name = metadata.subject || group.subject;

            let emoji = '👥';
            let label = '';
            let showMembers = true;

            if (metadata.isCommunity) {
                emoji = '🛡️';
                label = ' (Komunitas Induk)';
                showMembers = false; // ⛔ Jangan tampilkan jumlah anggota
            } else if (metadata.isCommunityAnnounce) {
                emoji = '📢';
                label = ' (Pengumuman Komunitas)';
            } else if (metadata.linkedParent) {
                emoji = '🏘️';
                label = ' (Subgrup Komunitas)';
            } else if (metadata.announce) {
                emoji = '📢';
                label = ' (Pengumuman)';
            }

            groupList.push({
                id,
                name
            });

            text += `*${groupList.length}.* ${emoji} ${name}${label}\n`;
            if (showMembers) text += `👤 Jumlah anggota: ${metadata.participants.length}\n`;
            text += `ℹ️ ${id}\n`;

            try {
                const inviteCode = await sock.groupInviteCode(id);
                text += `🔗 https://chat.whatsapp.com/${inviteCode}\n\n`;
            } catch {
                text += `🔗 Link tidak tersedia\n\n`;
            }

        } catch (err) {
            console.log(`❌ Gagal ambil metadata grup ${id}`, err);
        }
    }

    return {
        list: groupList,
        text
    };
}

async function getGroupListForLogin(sock) {
    const groupsMeta = await sock.groupFetchAllParticipating();
    const groupList = [];
    let text = `📋 *Grup normal yang tersedia:*\n\n`;

    for (const [id, group] of Object.entries(groupsMeta)) {
        try {
            const metadata = await sock.groupMetadata(id);

            // ❌ Skip jika bukan grup normal
            if (
                metadata.isCommunity ||
                metadata.isCommunityAnnounce ||
                metadata.announce
            ) {
                continue;
            }

            const name = metadata.subject || group.subject;

            groupList.push({
                id,
                name
            });

            text += `*${groupList.length}.* 👥 ${name}\n`;
            text += `👤 Jumlah anggota: ${metadata.participants.length}\n`;
            text += `ℹ️ ${id}\n`;

            try {
                const inviteCode = await sock.groupInviteCode(id);
                text += `🔗 https://chat.whatsapp.com/${inviteCode}\n\n`;
            } catch {
                text += `🔗 Link tidak tersedia\n\n`;
            }

        } catch (err) {
            console.log(`❌ Gagal ambil metadata grup ${id}`, err);
        }
    }

    return {
        list: groupList,
        text
    };
}

//━━━━━━━━━━━━━━━[ NAMETAG ]━━━━━━━━━━━━━━━\\

// Buat file nametag.json jika belum ada
const nametagFile = path.join(tempDir, 'nametag.json');
if (!fs.existsSync(nametagFile)) {
    fs.writeFileSync(nametagFile, JSON.stringify({
        nametagBerbayar: [],
        nametagCustom: {},
        nametagEvent: []
    }));
}

// Fungsi untuk load data nametag
function loadNametagData() {
    return JSON.parse(fs.readFileSync(nametagFile));
}

// Fungsi untuk save data nametag
function saveNametagData(data) {
    fs.writeFileSync(nametagFile, JSON.stringify(data, null, 2));
}

// Fungsi untuk menambahkan nametag berbayar
function addNametagBerbayar(nametag, harga) {
    let data = loadNametagData();
    data.nametagBerbayar.push({
        nametag,
        harga
    });
    saveNametagData(data);
    return `Nametag berbayar ${nametag} telah ditambahkan!`;
}

// Fungsi untuk menambahkan nametag event
function addNametagEvent(nametag) {
    let data = loadNametagData();
    data.nametagEvent.push(nametag);
    saveNametagData(data);
    return `Nametag event ${nametag} telah ditambahkan!`;
}

// Fungsi untuk membeli nametag berbayar
function buyNametagBerbayar(m, index) {
    let data = loadNametagData();
    const userId = getActualJID(m.sender)
    let user = loadUserData(userId);
    let nametag = data.nametagBerbayar[index];
    if (user.harvest.uang >= nametag.harga) {
        user.harvest.uang -= nametag.harga;
        if (!data.nametagOwned) data.nametagOwned = {};
        if (!data.nametagOwned[userId]) data.nametagOwned[userId] = [];
        data.nametagOwned[userId].push(nametag.nametag);
        saveNametagData(data);
        saveUserData(userId, user);
        return `Nametag ${nametag.nametag} telah dibeli!`;
    } else {
        return `❌ Uang anda tidak cukup!`;
    }
}

// Fungsi untuk menambahkan nametag event ke koleksi user
function addNametagEventToUser(m, index) {
    let data = loadNametagData();
    const userId = getActualJID(m.sender)
    let user = loadUserData(userId);
    let nametag = data.nametagEvent[index];
    if (!data.nametagOwned) data.nametagOwned = {};
    if (!data.nametagOwned[userId]) data.nametagOwned[userId] = [];
    data.nametagOwned[userId].push(nametag);
    saveNametagData(data);
    return `Nametag ${nametag} telah ditambahkan ke koleksi Anda!`;
}

// Fungsi untuk memakai nametag
function useNametag(m, index) {
    const userId = getActualJID(m.sender)
    let user = loadUserData(userId);
    let data = loadNametagData();
    if (data.nametagOwned && data.nametagOwned[userId] && index <= data.nametagOwned[userId].length) {
        user.nametag = data.nametagOwned[userId][index - 1];
        saveUserData(userId, user);
        return `Nametag ${data.nametagOwned[userId][index - 1]} telah dipakai!`;
    } else if (data.nametagCustom && data.nametagCustom[userId] && index === data.nametagOwned[userId].length + 1) {
        user.nametag = data.nametagCustom[userId][0];
        saveUserData(userId, user);
        return `Nametag ${data.nametagCustom[userId][0]} telah dipakai!`;
    } else {
        return `Nomor tidak valid!`;
    }
}

// Fungsi untuk membuat nametag custom
function createNametagCustom(m, nametag) {
    let data = loadNametagData();
    const userId = getActualJID(m.sender)
    let user = loadUserData(userId);
    if (user.harvest.uang >= 10000) {
        user.harvest.uang -= 10000;
        data.nametagCustom[userId] = [nametag];
        user.nametag = nametag;
        saveNametagData(data);
        saveUserData(userId, user);
        return `Nametag custom ${nametag} telah dibuat!`;
    } else {
        return `❌ Uang anda tidak cukup!\nMembutuhkan 10000 G`;
    }
}

function deleteNametag(m, index) {
    let data = loadNametagData();
    const userId = getActualJID(m.sender)
    let nametags = [];
    if (data.nametagOwned && data.nametagOwned[userId]) {
        nametags = nametags.concat(data.nametagOwned[userId]);
    }
    if (data.nametagCustom && data.nametagCustom[userId]) {
        nametags.push(data.nametagCustom[userId][0]);
    }
    if (index <= nametags.length) {
        if (index <= data.nametagOwned[userId].length) {
            data.nametagOwned[userId].splice(index - 1, 1);
        } else {
            delete data.nametagCustom[userId];
        }
        saveNametagData(data);
        return `Nametag ${nametags[index - 1]} telah dihapus!`;
    } else {
        return `Nomor tidak valid!`;
    }
}

// Fungsi untuk menampilkan list nametag
function displayNametagList(m) {
    let data = loadNametagData();
    const userId = getActualJID(m.sender)
    let teks = `*LIST NAMETAG*\n\n`;
    teks += `*(💸) Nametag berbayar:*\n`;
    data.nametagBerbayar.forEach((nametag, index) => {
        teks += `${index + 1}. ${nametag.nametag} - ${nametag.harga} G\n`;
    });
    teks += `\n*(🎋) Nametag event:*\n`;
    data.nametagEvent.forEach((nametag, index) => {
        teks += `${index + 1}. ${nametag}\n`;
    });
    teks += `\n------------------------------\n`;
    teks += `\n*(🎒) Nametag dimiliki:*\n`;
    if (data.nametagOwned && data.nametagOwned[userId] && data.nametagOwned[userId].length > 0) {
        data.nametagOwned[userId].forEach((nametag, index) => {
            teks += `${index + 1}. ${nametag}\n`;
        });
    } else {
        teks += `⚠️ Anda belum memiliki nametag. Silakan claim atau beli nametag untuk menambahkannya ke koleksi Anda.\n`;
    }
    return teks;
}

function editNametagCustom(m, nametag) {
    let data = loadNametagData();
    const userId = getActualJID(m.sender)
    let user = loadUserData(userId);
    if (data.nametagCustom[userId]) {
        data.nametagCustom[userId][0] = nametag;
        user.nametag = nametag;
        saveNametagData(data);
        saveUserData(userId, user);
        return `Nametag custom telah diubah menjadi ${nametag}!`;
    } else {
        return `Anda tidak memiliki nametag custom!`;
    }
}

function deleteNametagCustom(m) {
    let data = loadNametagData();
    const userId = getActualJID(m.sender)
    let user = loadUserData(userId);
    if (data.nametagCustom[userId]) {
        delete data.nametagCustom[userId];
        user.nametag = '';
        saveNametagData(data);
        saveUserData(userId, user);
        return `Nametag custom telah dihapus!`;
    } else {
        return `Anda tidak memiliki nametag custom!`;
    }
}

// ⏬ Fungsi bantu
function getPrefixFile(chatId) {
    return path.join(prefixDir, `${chatId}.json`);
}

function loadPrefixes(chatId) {
    const file = getPrefixFile(chatId);
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify({
            prefixes: []
        }, null, 2));
    }

    const data = JSON.parse(fs.readFileSync(file));
    return data.prefixes;
}

function savePrefixes(chatId, prefixes) {
    const file = getPrefixFile(chatId);
    fs.writeFileSync(file, JSON.stringify({
        prefixes
    }, null, 2));
}

//━━━━━━━━━━━━━━━[ AFK DB ]━━━━━━━━━━━━━━━\\

//const tempDirAfk = './temp';
//const afkDBPath = path.join(tempDirAfk, 'afk.json');
const afkDBPath = path.join(tempDir, 'afk.json');
let afkData = fs.existsSync(afkDBPath) ? JSON.parse(fs.readFileSync(afkDBPath)) : {};

// Simpan data ke file
function saveAFK() {
    fs.writeFileSync(afkDBPath, JSON.stringify(afkData, null, 2));
}

//━━━━━━━━━━━━━━━[ OWNER ]━━━━━━━━━━━━━━━\\

//const ownerFilePath = './temp/owner.json'; // Pastikan path sesuai
const ownerFilePath = path.join(tempDir, 'owner.json');

function isValidJid(jid) {
    return typeof jid === 'string' && jid.includes('@s.whatsapp.net');
}

function loadOwner() {
    // Jika file belum ada, buat file dengan array kosong
    if (!fs.existsSync(ownerFilePath)) {
        fs.writeFileSync(ownerFilePath, JSON.stringify({
            owners: []
        }, null, 2));
    }

    // Baca owner dari file
    let fileOwners = [];
    try {
        const data = fs.readFileSync(ownerFilePath);
        const json = JSON.parse(data);
        fileOwners = Array.isArray(json.owners) ? json.owners : [];
    } catch (e) {
        console.log('❌ Gagal membaca file owner:', e);
    }

    // Pastikan global.owner berupa array
    const globalOwners = Array.isArray(global.owner) ?
        global.owner :
        typeof global.owner === 'string' ?
        [global.owner] :
        [];

    // Gabungkan keduanya tanpa duplikat dan hanya yang valid
    const allOwners = [...new Set([...globalOwners, ...fileOwners])]
        .filter(isValidJid);

    return allOwners;
}

function saveFileOwners(fileOwners) {
    // Simpan ke file tanpa menyentuh global.owner
    fs.writeFileSync(ownerFilePath, JSON.stringify({
        owners: fileOwners
    }, null, 2));
}

//━━━━━━━━━━━━━━━[ KOMPRESI GAMBAR ]━━━━━━━━━━━━━━━\\

async function compressToUnder100KB(buffer) {
    try {
        const mimeType = mime.lookup(buffer) || "image/jpeg";
        const ext = mime.extension(mimeType) || "jpg";

        const tempInput = path.join(tempDir, `input.${ext}`);
        const tempOutput = path.join(tempDir, `output.jpg`);

        let quality = 70;
        writeFileSync(tempInput, buffer);

        while (quality >= 10) {
            const cmd = `magick "${tempInput}" -resize 720x720 -strip -sampling-factor 4:2:0 -interlace Plane -quality ${quality} "${tempOutput}"`;
            try {
                await new Promise((resolve, reject) => {
                    exec(cmd, (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });

                const resultBuffer = await readFile(tempOutput);
                if (resultBuffer.length < 100 * 1024) {
                    // Cleanup
                    unlinkSync(tempInput);
                    unlinkSync(tempOutput);
                    return resultBuffer;
                }
                quality -= 10; // turunkan kualitas dan ulangi
            } catch (err) {
                console.error("Error saat eksekusi ImageMagick:", err);
                if (existsSync(tempInput)) unlinkSync(tempInput);
                if (existsSync(tempOutput)) unlinkSync(tempOutput);
                return buffer;
            }
        }

        // Gagal kompresi, kembalikan versi terakhir
        const resultBuffer = existsSync(tempOutput) ?
            await readFile(tempOutput) :
            buffer;

        if (existsSync(tempInput)) unlinkSync(tempInput);
        if (existsSync(tempOutput)) unlinkSync(tempOutput);

        return resultBuffer;
    } catch (err) {
        console.error("Error kompresi:", err);
        return buffer;
    }
}

//━━━━━━━━━━━━━━━[ GET STATUS & MENU ]━━━━━━━━━━━━━━━\\

async function getUserStatus(sock, m) {
    const allOwners = loadOwner(); // gabungan global + file
    const isOwner = allOwners.includes(m.sender);

    if (!m.isGroup) {
        return isOwner ?
            '👑 Owner Bot' :
            '👤 Pengguna Biasa (Bukan Grup)';
    }

    const metadata = await sock.groupMetadata(m.from);
    const isAdmin = metadata.participants
        .some(p => p.id === m.sender && p.admin);

    if (isOwner) return '👑 Owner Bot';
    if (isAdmin) return '🛡️ Admin Grup';
    return '👤 Member Biasa';
}

async function teksInfoBot(m, sock) {
    let user = loadUserData(m.sender);
    let role = getCurrentRole(user?.harvest?.level || 1);
    let statusUser = await getUserStatus(sock, m)
    let notFoundNametag = `Ketik ${m.prefix}nametag`
    return `╒═══ 《 *👤 INFO USER* 》 ═══
├───────────────
├≽ *Jabatan:* ${statusUser}
├≽ *Nametag:* ${user?.nametag || notFoundNametag}
├≽ *Uang:* ${user?.harvest?.uang || 0} G
├≽ *Level:* ${user?.harvest?.level || 1} (${role})`
}

export function txtMenu(m, chatId) {
    const termuxOnlyCmds = ['delbanner', 'setbanner', 'tovideo', 'qc', 'fakecall', 'youdied', 'jilat', 'towew', 'pov', 'ktp', 'soalan', 'fakengl', 'subtitle', 'tobit']
    const nsfwOnlyCmds = []
    const ownerOnlyCmds = ['setalarm', 'listalarm', 'delalarm', 'mode', 'setbotjid', 'backup', 'cleartemp', 'listemp', 'addnametagberbayar', 'addnametagevent', 'deletenametagberbayar', 'deletenametagevent', 'addowner', 'delowner', 'addprefix', 'delprefix', 'addredem', 'delredem']
    const sections = [
        {
            title: 'INFO BOT',
            cmds: [
                'listgc',
                'owner',
                'ping',
                'runtime',
                'prefix',
                'listredem'
                // 'isbot'
            ]
        },
        {
            title: 'JADI BOT',
            cmds: [
                'jadibot',
                'listjadibot',
                'clearjadibot'
            ]
        },
        {
            title: 'GAME RPG',
            cmds: [
                'cooldown',
                'cekkolam',
                'cekternak',
                'misi',
                'inventory',
                'rank',
                'quest',
                'listbiome',
                'listuse',
                'uang',
                'limit',
                'profile',
                'level',
                'leaderboard',
                'duel',
                'judi',
                'pindahbiome',
                'arena',
                'use',
                'craft',
                'adventure',
                'ngarit',
                'mancing',
                'hunt',
                'tanam',
                'panen',
                'ternak',
                'rawatikan',
                'toko',
                'beli',
                'jual'
            ]
        },
        {
            title: 'PENCARIAN',
            cmds: [
                'play',
                'tiktoksearch',
                'pinterest',
                'bing',
                'libur',
                'stikersearch'
            ]
        },
        {
            title: 'WIBU ANIME',
            cmds: [
                'asupanwibu',
                'quotesanime',
                'whatanime'
            ]
        },
        {
            title: 'PACAR WIBU',
            cmds: [
                'char',
                'getchar',
                'spas',
                'give',
                'putus'
            ]
        },
        {
            title: 'PEMBUATAN',
            cmds: [
                'stiker',
                'smeme',
                'wm',
                'toimg',
                'tovideo',
                'brat',
                'bratvid',
                'iqc',
                'qc',
                'fakecall',
                'youdied',
                'jilat',
                'towew',
                'pov',
                'ktp',
                'soalan',
                'fakengl',
                'subtitle',
                'tobit'
            ]
        },
        {
            title: 'TEBAK-TEBAKAN',
            cmds: [
                'family100',
                'tebakkata',
                'tebakgambar',
                'siapakahaku',
                'caklontong',
                'tebakml',
                'tebakff'
            ]
        },
        {
            title: 'ADMIN GRUP',
            cmds: [
                'antitoxic',
                'addtoxic',
                'deltoxic',
                'welcome',
                'setwelcome',
                'kick',
                'warn',
                'listwarn',
                'delwarn',
                'top',
                'intro',
                'setintro',
                'enable',
                'disable'
                // 'addsc',
                // 'delsc',
                // 'listsc'
            ]
        },
        {
            title: 'OWNER BOT',
            cmds: [
                'setalarm',
                'listalarm',
                'delalarm',
                'mode',
                'setbotjid',
                'backup',
                'deltrash',
                'trash',
                // 'addnametagberbayar',
                // 'addnametagevent',
                // 'deletenametagberbayar',
                // 'deletenametagevent',
                'addowner',
                'delowner',
                'addprefix',
                'delprefix',
                'addredem',
                'delredem'
            ]
        }
        /*{
            title: 'THANKS TO',
            cmds: [
                'ChatGPT',
                'Danta',
                'Rhasta',
                'Xinz-Team',
                'Adiwajshing/Baileys',
                'Whiskeysockets/Baileys',
                'AID Team',
                'KEV.STORE',
                'Hilmi'
            ]
        }*/
    ];

function getRpgSections() {

    const functionDir = path.join(process.cwd(), 'fitur')
    if (!fs.existsSync(functionDir)) return []

    const icons = {
      dasar: "📖",
      limit: "💳",
      harvest: "🌱",
      ternak: "🐄",
      aksi: "⚔️",
      toko: "💸",
      main: "🎮",
      cek: "📜",
      default: "📂"
    }

    const menu = {}

    const getHelpMetadata = (file) => {
        try {
            const content = fs.readFileSync(file, 'utf8')
            const regex = /export\s+const\s+help\s*=\s*({[^}]+})/
            const match = content.match(regex)

            if (match) {
                return Function('"use strict";return (' + match[1] + ')')()
            }

        } catch {}
    }

    fs.readdirSync(functionDir).forEach(file => {

        if (!file.endsWith('.js') && !file.endsWith('.mjs')) return

        const filePath = path.join(functionDir, file)
        const helpMetadata = getHelpMetadata(filePath)

        if (!helpMetadata) return

        const { type, help } = helpMetadata

        const category = type || "default"

        if (!menu[category]) menu[category] = []

        menu[category].push(help)

    })

    // ubah jadi sections
    const sections = []

    Object.keys(menu).forEach(type => {

        const icon = icons[type] || icons.default

        sections.push({
            // title: `${icon} RPG ${type.toUpperCase()}`,
            title: `RPG ${type.toUpperCase()}`,
            cmds: menu[type]
        })

    })

    return sections
}

function getRpgMenu(prefix) {
    const menu = {}
    const functionDir = path.join(process.cwd(), 'fitur')

    if (!fs.existsSync(functionDir)) return menu

    const getHelpMetadata = (file) => {
        try {
            const content = fs.readFileSync(file, 'utf8')
            const regex = /export\s+const\s+help\s*=\s*({[^}]+})/
            const match = content.match(regex)
            if (match) {
                return Function('"use strict";return (' + match[1] + ')')()
            }
        } catch {}
    }

    fs.readdirSync(functionDir).forEach(file => {
        if (file.endsWith('.js') || file.endsWith('.mjs')) {
            const filePath = path.join(functionDir, file)
            const helpMetadata = getHelpMetadata(filePath)

            if (helpMetadata) {
                const { type, help } = helpMetadata
                if (!menu[type]) menu[type] = []

                const status = Object.keys(commands).includes(help) ? '' : ' ❌'
                menu[type].push(`${help}${status}`)
            }
        }
    })

    return menu
}

const termuxMode = global.db.bot.termuxMode === true
const nsfwMode = global.db.bot.nsfwMode === true

// 🔥 Generate menu RPG | satu type
/*const rpgMenu = getRpgMenu(m.prefix)

// 🔥 Masukkan RPG ke sections
Object.keys(rpgMenu).forEach(type => {
    sections.push({
        title: `🎮 RPG ${type.toUpperCase()}`,
        cmds: rpgMenu[type]
    })
})*/

// 🔥 Generate menu RPG | kategori tipe
/*const rpgSections = getRpgSections()

const thanksIndex = sections.findIndex(s => s.title === '🙏 THANKS TO')

if (thanksIndex !== -1) {
    sections.splice(thanksIndex, 0, ...rpgSections)
} else {
    sections.push(...rpgSections)
}*/

// 🔥 FILTER COMMAND
const filteredSections = sections.map(section => {
    return {
        ...section,
        cmds: section.cmds.filter(cmd => {

            const baseCmd = cmd.replace(' ❌','').split(' ')[0]

            // ❌ Blokir command termux jika OFF
            if (!termuxMode && termuxOnlyCmds.includes(baseCmd)) {
                return false
            }

            // ❌ Blokir command NSFW jika OFF
            if (!nsfwMode && nsfwOnlyCmds.includes(baseCmd)) {
                return false
            }

            // ❌ Blokir command jika bukan owner bot
            if (!m.isOwner && ownerOnlyCmds.includes(baseCmd)) {
                return false
            }

            return true
        })
    }
}).filter(section => section.cmds.length > 0)

// TAMPILAN BY XINZ TEAM
//return (
//    filteredSections.map((section, index) => {

//        const cmdsText =
//            section.title === '🙏 THANKS TO'
//                ? section.cmds.map(cmd => `├≽ ${cmd}`).join('\n')
//                : section.cmds.map(cmd => `├≽ ${m.prefix}${cmd}`).join('\n')

//        const headerTop =
//            index === 0
//                ? `╒═══ 《 *${section.title}* 》 ═══`
//                : `╞═══ 《 *${section.title}* 》 ═══`

//        const line = "├───────────────"

//        return `${index === 0 ? "" : "├───────────────"}
//${headerTop}
//${line}
//${cmdsText}\n`
//    }).join('') +
//    `╘═══ 《 *By ${global.ownerName}* 》 ═══`
//)

return (
    filteredSections.map((section) => {
        const prefix = m.prefix;
        const commands = section.cmds.map(cmd => ` • ${prefix}${cmd}`).join('\n');
        return `*- ${section.title} -*\n${commands}`;
    }).join('\n\n') +
    `\n\n*© By ${global.ownerName}*`
);
}

//━━━━━━━━━━━━━━━[ SKREPER GAME ]━━━━━━━━━━━━━━━━━//

// SKEMA GAME
const AsahOtakSchema = z.object({
    index: z.number(),
    soal: z.string(),
    jawaban: z.string()
});

const CakLontongSchema = z.object({
    index: z.number(),
    soal: z.string(),
    jawaban: z.string(),
    deskripsi: z.string()
});

const Family100Schema = z.object({
    soal: z.string(),
    jawaban: z.array(z.string())
});

const SiapakahAkuSchema = z.object({
    index: z.number(),
    soal: z.string(),
    jawaban: z.string()
});

const SusunKataSchema = z.object({
    index: z.number(),
    soal: z.string(),
    tipe: z.string(),
    jawaban: z.string()
});

const TebakBenderaSchema = z.object({
    flag: z.string(),
    img: z.string(),
    name: z.string()
});

const TebakGambarSchema = z.object({
    index: z.number(),
    img: z.string(),
    jawaban: z.string(),
    deskripsi: z.string()
});

const TebakKabupatenSchema = z.object({
    index: z.number(),
    title: z.string(),
    url: z.string()
});

const TebakKataSchema = z.object({
    index: z.number(),
    soal: z.string(),
    jawaban: z.string()
});

const TebakKimiaSchema = z.object({
    unsur: z.string(),
    lambang: z.string()
});

const TebakLirikSchema = z.object({
    soal: z.string(),
    jawaban: z.string()
});

const TebakTebakanSchema = z.object({
    soal: z.string(),
    jawaban: z.string()
});

const TekaTekiSchema = z.object({
    soal: z.string(),
    jawaban: z.string()
});

// ==================== DATA & FUNGSI UNTUK TEBAK FF ====================

// Schema validasi (sama dengan TebakMLSchema)
const TebakFFSchema = z.object({
    nama: z.string(),        // jawaban (nama karakter)
    url: z.string().url(),   // gambar karakter
    clue: z.string()         // petunjuk (deskripsi)
});

// Variabel global untuk menyimpan dataset
let tebakffjson = null;

// Fungsi load data dari file JSON FF
function loadFFData() {
    try {
        const filePath = path.join(process.cwd(), 'game', 'ffchar.json');
        const rawData = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(rawData);
        
        // Konversi ke format yang dibutuhkan oleh TebakFFSchema
        return jsonData.map(char => ({
            nama: char.jawaban,
            url: char.img,            // atau char.fullimg, sesuaikan
            clue: char.deskripsi
        }));
    } catch (error) {
        console.error('Gagal memuat charff.json:', error.message);
        // Fallback dataset minimal jika file tidak ditemukan
        return [
            { nama: "oscar", url: "https://a.top4top.io/p_3492gr2hf0.png", clue: "Karakter ini dapat menghancurkan Gloo Wall saat berlari." },
            { nama: "kassie", url: "https://h.top4top.io/p_34924mah40.jpeg", clue: "Karakter support yang dapat terhubung dengan rekan tim." }
        ];
    }
}

// Inisialisasi dataset saat pertama kali dipanggil
tebakffjson = loadFFData();

// Fungsi untuk mendapatkan soal acak
async function tebakff() {
    if (!tebakffjson || tebakffjson.length === 0) {
        tebakffjson = loadFFData();
    }
    const randomIndex = Math.floor(Math.random() * tebakffjson.length);
    return TebakFFSchema.parse(tebakffjson[randomIndex]);
}

const TebakMLSchema = z.object({
    nama: z.string(),        // jawaban (nama hero)
    url: z.string().url(),   // gambar hero
    clue: z.string()         // petunjuk (bisa deskripsi atau role)
});

// Load dataset dari file JSON
let tebakmljson = null;
function loadMLBBData() {
    try {
        const filePath = path.join(process.cwd(), 'game', 'mlbbchar.json');
        const rawData = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(rawData);
        
        // Konversi ke format yang dibutuhkan oleh TebakMLSchema
        return jsonData.data.map(hero => ({
            nama: hero.hero_name,
            url: hero.portrait,
            clue: `Hero dengan role *${hero.class}*` // clue sederhana dari class
        }));
    } catch (error) {
        console.error('Gagal memuat mlbbchar.json:', error.message);
        // Fallback ke dataset minimal jika file tidak ditemukan
        return [
            { nama: "Miya", url: "https://example.com/miya.jpg", clue: "Hero dengan role Marksman" },
            { nama: "Saber", url: "https://example.com/saber.jpg", clue: "Hero dengan role Assassin" }
        ];
    }
}

// Inisialisasi dataset
tebakmljson = loadMLBBData();

// Fungsi tebakml yang sudah disesuaikan
async function tebakml() {
    if (!tebakmljson || tebakmljson.length === 0) {
        tebakmljson = loadMLBBData();
    }
    const randomIndex = Math.floor(Math.random() * tebakmljson.length);
    return TebakMLSchema.parse(tebakmljson[randomIndex]);
}

// SKREP GAME
let asahotakjson = null;
async function asahotak() {
    if (!asahotakjson) {
        asahotakjson = await got(
            'https://raw.githubusercontent.com/BochilTeam/database/master/games/asahotak.json'
        ).json()
    }
    return AsahOtakSchema.parse(
        asahotakjson[Math.floor(Math.random() * asahotakjson.length)]
    )
}

let caklontongjson = null;
async function caklontong() {
    if (!caklontongjson) {
        caklontongjson = await got(
            'https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json'
        ).json();
    }
    return CakLontongSchema.parse(
        caklontongjson[Math.floor(Math.random() * caklontongjson.length)]
    );
}

let family100json = null;
async function family100() {
    if (!family100json) {
        family100json = await got(
            'https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json'
        ).json()
    }
    return Family100Schema.parse(
        family100json[Math.floor(Math.random() * family100json.length)]
    )
}

let siapakahakujson = null;
async function siapakahaku() {
    if (!siapakahakujson) {
        siapakahakujson = await got(
            'https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json'
        ).json()
    }
    return SiapakahAkuSchema.parse(
        siapakahakujson[Math.floor(Math.random() * siapakahakujson.length)]
    )
}

let susunkatajson = null;
async function susunkata() {
    if (!susunkatajson) {
        susunkatajson = await got(
            'https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json'
        ).json()
    }
    return SusunKataSchema.parse(
        susunkatajson[Math.floor(Math.random() * susunkatajson.length)]
    )
}

let tebakbenderajson = null;
async function tebakbendera() {
    if (!tebakbenderajson) {
        tebakbenderajson = await got(
            'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera.json'
        ).json()
    }
    return TebakBenderaSchema.parse(
        tebakbenderajson[Math.floor(Math.random() * tebakbenderajson.length)]
    )
}

let tebakgambarjson = null;
async function tebakgambar() {
    if (!tebakgambarjson) {
        tebakgambarjson = await got(
            'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json'
        ).json()
    }
    return TebakGambarSchema.parse(
        tebakgambarjson[Math.floor(Math.random() * tebakgambarjson.length)]
    )
}

let tebakkabupatenjson = null;
async function tebakkabupaten() {
    if (!tebakkabupatenjson) {
        tebakkabupatenjson = await got(
            'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkabupaten.json'
        ).json()
    }
    return TebakKabupatenSchema.parse(
        tebakkabupatenjson[Math.floor(Math.random() * tebakkabupatenjson.length)]
    )
}

let tebakkatajson = null;
async function tebakkata() {
    if (!tebakkatajson) {
        tebakkatajson = await got(
            'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json'
        ).json()
    }
    return TebakKataSchema.parse(
        tebakkatajson[Math.floor(Math.random() * tebakkatajson.length)]
    )
}

let tebakkimiajson = null;
async function tebakkimia() {
    if (!tebakkimiajson) {
        tebakkimiajson = await got(
            'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkimia.json'
        ).json()
    }
    return TebakKimiaSchema.parse(
        tebakkimiajson[Math.floor(Math.random() * tebakkimiajson.length)]
    )
}

let tebaklirikjson = null;
async function tebaklirik() {
    if (!tebaklirikjson) {
        tebaklirikjson = await got(
            'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json'
        ).json()
    }
    return TebakLirikSchema.parse(
        tebaklirikjson[Math.floor(Math.random() * tebaklirikjson.length)]
    )
}

let tebaktebakanjson = null;
async function tebaktebakan() {
    if (!tebaktebakanjson) {
        tebaktebakanjson = await got(
            'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaktebakan.json'
        ).json()
    }
    return TebakTebakanSchema.parse(
        tebaktebakanjson[Math.floor(Math.random() * tebaktebakanjson.length)]
    )
}

let tekatekijson = null;
async function tekateki() {
    if (!tekatekijson) {
        tekatekijson = await got(
            'https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json'
        ).json()
    }
    return TekaTekiSchema.parse(
        tekatekijson[Math.floor(Math.random() * tekatekijson.length)]
    )
}

//━━━━━━━━━━━━━━━[ HADIAH ASAH OTAK ]━━━━━━━━━━━━━━━━━//

async function hadiahUang(player, jumlah) {
    const user = loadUserData(player);
    if (!user || !user.harvest) return;
    user.harvest.uang += jumlah
    saveUserData(player, user);
}

//━━━━━━━━━━━━━━━[ SIMILARITY ]━━━━━━━━━━━━━━━━━//

function similarity(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const maxLen = Math.max(len1, len2);

    let commonChars = 0;

    for (let i = 0; i < Math.min(len1, len2); i++) {
        if (str1[i] === str2[i]) {
            commonChars++;
        }
    }

    return (commonChars / maxLen) * 100;
}

//━━━━━━━━━━━━━━━[ HANDLE CHAT ]━━━━━━━━━━━━━━━\\

const formatText = (text) => text.split('\n').reduce((acc, line) => acc + (line.trim() !== '' ? `> ${line}\n` : '\n'), '').trim();
const handleLevel = async (user, m) => {

    // 🔹 Default stats kalau belum ada
    if (user.harvest && !user.harvest.stats) {
        user.harvest.stats = {
            hp: 100, // darah
            dmg: 10, // serangan
            def: 5, // pertahanan
            hpMax: 100. // max hp
        };
        saveUserData(m.sender, user);
    }

    let teksLevel = '';
    if (!user.harvest) {
        teksLevel = '🔄 Loading data player...';
    };
    if (user.harvest) {
        const experiencePerTick = getExperiencePerTick(user.harvest.level);
        user.harvest.exp += experiencePerTick;
        const experienceNeededNextLevel = getExperienceNeeded(user.harvest.level + 1);
        const role = getCurrentRole(user.harvest.level);
        const nextRole = getCurrentRole(user.harvest.level + 1);
        const experienceRemaining = experienceNeededNextLevel - user.harvest.exp;
        const progress = Math.floor((user.harvest.exp / experienceNeededNextLevel) * 100);
        if (user.harvest.exp >= experienceNeededNextLevel) {
            user.harvest.level++;
            user.harvest.exp -= experienceNeededNextLevel;
            const newRole = getCurrentRole(user.harvest.level);
            let teksLevelUp = `*「 LEVEL UP」*\n\n➤ *Level:* ${user.harvest.level - 1} -> ${user.harvest.level}\n➤ *Role:* ${newRole}\n➤ *XP:* (Reset ke 0)\n\nSelamat, anda telah mencapai level baru!`;
            m.reply(teksLevelUp);
            teksLevel = `Kamu naik level 🎉`
        } else {
            teksLevel = `+${experiencePerTick} XP (Total: ${user.harvest.exp} XP)\n└⋟ *Level:* ${user.harvest.level} (${role})\n➤ *Berikutnya:* ${user.harvest.level + 1} (${nextRole})\n➤ *Butuh:* ${experienceRemaining} XP lagi\n${'▓'.repeat(Math.floor(progress / 10))}${'░'.repeat(10 - Math.floor(progress / 10))} (${progress}%)`;
        }
        await saveUserData(m.sender, user);
    }
    return formatText(teksLevel);
};

const handleCommand = async (m, command, teksLevel) => {
    const menu = getMenu();
    for (const type in menu) {
        for (const cmd in menu[type]) {
            if (cmd === command || menu[type][cmd].alias?.includes(command)) {
                const user = loadUserData(m.sender);
                m.command = cmd; // Ganti m.command dengan nama perintah yang sebenarnya
                await commands[cmd].func(m, user, teksLevel);
            }
        }
    }
};

//━━━━━━━━━━━━━━━[ SWITCH CMD & BUTTON ]━━━━━━━━━━━━━━━\\

setInterval(() => {
    try {
        const now = Date.now();

        if (!fs.existsSync(buttonDir)) return; // skip kalau folder belum ada

        fs.readdirSync(buttonDir).forEach(file => {
            const filePath = path.join(buttonDir, file);

            try {
                if (!fs.existsSync(filePath)) return;

                let content = fs.readFileSync(filePath, "utf-8").trim();

                // kalau kosong -> reset jadi "{}"
                if (!content) {
                    content = "{}";
                    fs.writeFileSync(filePath, content);
                }

                let buttonData;
                try {
                    buttonData = JSON.parse(content);
                } catch (e) {
                    console.error(`❌ JSON parse error di ${filePath}, reset ke {}:`, e.message);
                    buttonData = {}; // auto reset biar ga error
                    fs.writeFileSync(filePath, "{}");
                }

                let changed = false;

                for (const metadata of Object.keys(buttonData)) {
                    const createdAt = buttonData[metadata]?.createdAt;
                    if (createdAt && (now - createdAt > 600000)) {
                        delete buttonData[metadata];
                        changed = true;
                    }
                }

                if (changed) {
                    fs.writeFileSync(filePath, JSON.stringify(buttonData, null, 2));
                }

            } catch (err) {
                console.error(`⚠️ Error proses file ${file}:`, err.message);
            }
        });

    } catch (err) {
        console.error("⚠️ Error utama auto hapus button:", err.message);
    }
}, 600000); // 10 menit

//━━━━━━━━━━━━━━━[ ON MESSAGE ]━━━━━━━━━━━━━━━\\

// Folder penyimpanan utama
const basePath = path.resolve(`${directory}/temp/ytmp3`);
if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, {
        recursive: true
    });
}

// Queue supaya user ga spam download
let ytQueue = [];

/* SCRAPER SSVID.NET */
const yt = {
    get baseUrl() {
        return {
            origin: 'https://ssvid.net'
        }
    },
    get baseHeaders() {
        return {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'origin': this.baseUrl.origin,
            'referer': this.baseUrl.origin + '/youtube-to-mp3'
        }
    },
    validateFormat(userFormat) {
        const validFormat = ['mp3', '360p', '720p', '1080p']
        if (!validFormat.includes(userFormat)) throw Error(`invalid format!. available formats: ${validFormat.join(', ')}`)
    },
    handleFormat(userFormat, searchJson) {
        this.validateFormat(userFormat)
        let result
        if (userFormat == 'mp3') result = searchJson.links?.mp3?.mp3128?.k
        else {
            const allFormats = Object.entries(searchJson.links.mp4)
            let selectedFormat = userFormat
            const quality = allFormats.map(v => v[1].q).filter(v => /\d+p/.test(v)).map(v => parseInt(v)).sort((a, b) => b - a).map(v => v + 'p')
            if (!quality.includes(userFormat)) selectedFormat = quality[0]
            const find = allFormats.find(v => v[1].q == selectedFormat)
            result = find?.[1]?.k
        }
        if (!result) throw Error(`${userFormat} gak ada`)
        return result
    },
    hit: async function(path, payload) {
        const body = new URLSearchParams(payload)
        const r = await fetch(`${this.baseUrl.origin}${path}`, {
            method: 'POST',
            headers: this.baseHeaders,
            body
        })
        if (!r.ok) throw Error(`${r.status} ${r.statusText}\n${await r.text()}`)
        return await r.json()
    },
    download: async function(queryOrYtUrl, userFormat = 'mp3') {
        this.validateFormat(userFormat)
        let search = await this.hit('/api/ajax/search', {
            query: queryOrYtUrl,
            cf_token: '',
            vt: 'youtube'
        })
        if (search.p == 'search') {
            if (!search?.items?.length) throw Error(`hasil pencarian ${queryOrYtUrl} tidak ada`)
            const {
                v
            } = search.items[0]
            const videoUrl = 'https://www.youtube.com/watch?v=' + v
            search = await this.hit('/api/ajax/search', {
                query: videoUrl,
                cf_token: '',
                vt: 'youtube'
            })
        }
        const vid = search.vid
        const k = this.handleFormat(userFormat, search)
        const convert = await this.hit('/api/ajax/convert', {
            k,
            vid
        })
        if (convert.c_status == 'CONVERTING') {
            let convert2
            const limit = 5
            let attempt = 0
            do {
                attempt++
                convert2 = await this.hit('/api/convert/check?hl=en', {
                    vid,
                    b_id: convert.b_id
                })
                if (convert2.c_status == 'CONVERTED') return convert2
                await new Promise(r => setTimeout(r, 5000))
            } while (attempt < limit && convert2.c_status == 'CONVERTING')
            throw Error('file belum siap / status belum diketahui')
        } else return convert
    }
}

/* MULTI LINK HANDLER */
export const ytmp3multi = async (m, sock) => {
    try {
        const body = m.body.toLowerCase();

        // Lokasi progress
        const progressFile = path.join(basePath, "progress.json");
        let progressData = {};
        if (fs.existsSync(progressFile)) {
            progressData = JSON.parse(fs.readFileSync(progressFile, "utf-8"));
        }

        // ======== RESUME COMMAND ========
        if (body.startsWith("ytresume")) {
            if (!progressData[m.sender]) {
                return m.reply(`⚠️ Tidak ada download yang bisa dilanjutkan.\nMulai baru dengan: ${global.defaultPrefix}ytmp3 <link>`);
            }

            const {
                savePath,
                newId,
                startIndex,
                links,
                failedList = []
            } = progressData[m.sender];
            const total = links.length;
            let localFailed = [...failedList];
            let successCount = 0;

            m.reply(`🔄 Melanjutkan download dari folder *${newId}* mulai dari link ke-*${startIndex + 1}* dari *${total}*...`);

            for (let i = startIndex; i < links.length; i++) {
                const url = links[i];
                try {
                    const res = await yt.download(url, "mp3");
                    const title = res?.title?.replace(/[^\w\s-]/gi, "").trim() || getRandom("yt");
                    const mp3File = path.join(savePath, `${title}.mp3`);

                    if (fs.existsSync(mp3File)) {
                        console.log(`⏩ Lewati (sudah ada)\n📂 ${mp3File} (${i + 1}/${total})`);
                        continue;
                    }

                    // Simpan dari direct link
                    const audioRes = await fetch(res.dlink);
                    const buffer = Buffer.from(await audioRes.arrayBuffer());
                    fs.writeFileSync(mp3File, buffer);

                    successCount++;
                    console.log(`✅ Berhasil simpan *${successCount}* (${i + 1}/${total})\n📂 ${mp3File}`);
                } catch (err) {
                    if (!localFailed.includes(url)) localFailed.push(url);
                    console.error("Download gagal:", err.message);
                    console.log(`❌ Gagal download (${i + 1}/${total})\n🔗 ${url}`);
                }

                // Pause otomatis setiap 10 file berhasil
                if (successCount > 0 && successCount % 10 === 0 && i + 1 < total) {
                    m.reply(`⏸️ Pause setelah *${successCount}* file berhasil.\nPosisi: ${i + 1}/${total}\nKetik *${global.defaultPrefix}ytresume* untuk melanjutkan.`);
                    progressData[m.sender].startIndex = i + 1;
                    progressData[m.sender].failedList = localFailed;
                    fs.writeFileSync(progressFile, JSON.stringify(progressData, null, 2));
                    return;
                }
            }

            // Simpan failed list permanen
            progressData[m.sender].failedList = localFailed;

            // Kalau sudah selesai semua link utama
            delete progressData[m.sender].startIndex;
            delete progressData[m.sender].links;

            fs.writeFileSync(progressFile, JSON.stringify(progressData, null, 2));

            let msg = `🎉 Semua link selesai di folder *${newId}*!\n✅ Berhasil: ${successCount}`;
            if (localFailed.length > 0) {
                msg += `\n⚠️ Gagal: ${localFailed.length} link (tersimpan di failed list):\n${localFailed.join("\n")}`;
            }
            return m.reply(msg);
        }

        // ======== MAIN COMMAND ========
        if (body.startsWith("ytmp3")) {
            const links = m.body.trim().split(/\s+/).slice(1);
            if (!links.length) {
                return m.reply(`⚠️ Masukkan link YouTube.\nContoh:\n${global.defaultPrefix}ytmp3 link1 link2 link3`);
            }

            if (ytQueue.includes(m.sender)) return;
            ytQueue.push(m.sender);

            // Cari nomor folder terakhir
            const existingFolders = fs.readdirSync(basePath).filter(f => fs.statSync(path.join(basePath, f)).isDirectory());
            let newId = 1;
            if (existingFolders.length > 0) {
                const numericIds = existingFolders.map(f => parseInt(f)).filter(n => !isNaN(n));
                if (numericIds.length > 0) newId = Math.max(...numericIds) + 1;
            }

            // Buat folder baru dengan id
            const savePath = path.join(basePath, `${newId}`);
            fs.mkdirSync(savePath, {
                recursive: true
            });

            m.reply(`📥 Menyimpan *${links.length}* link YouTube ke folder ID *${newId}*...`);

            let failedList = [];
            let successCount = 0;
            const total = links.length;

            for (let i = 0; i < links.length; i++) {
                const url = links[i];
                try {
                    const res = await yt.download(url, "mp3");
                    const title = res?.title?.replace(/[^\w\s-]/gi, "").trim() || getRandom("yt");
                    const mp3File = path.join(savePath, `${title}.mp3`);

                    if (fs.existsSync(mp3File)) {
                        console.log(`⏩ Lewati (sudah ada)\n📂 ${mp3File} (${i + 1}/${total})`);
                        continue;
                    }

                    // Simpan dari direct link
                    const audioRes = await fetch(res.dlink);
                    const buffer = Buffer.from(await audioRes.arrayBuffer());
                    fs.writeFileSync(mp3File, buffer);

                    successCount++;
                    console.log(`✅ Berhasil simpan *${successCount}* (${i + 1}/${total})\n📂 ${mp3File}`);
                } catch (err) {
                    if (!failedList.includes(url)) failedList.push(url);
                    console.error("Download gagal:", err.message);
                    console.log(`❌ Gagal download (${i + 1}/${total})\n🔗 ${url}`);
                }

                // Pause otomatis setiap 10 file berhasil
                if (successCount > 0 && successCount % 10 === 0 && i + 1 < total) {
                    m.reply(`⏸️ Pause setelah *${successCount}* file berhasil.\nPosisi: ${i + 1}/${total}\nKetik *ytresume* untuk melanjutkan.`);
                    progressData[m.sender] = {
                        savePath,
                        newId,
                        startIndex: i + 1,
                        links,
                        failedList
                    };
                    fs.writeFileSync(progressFile, JSON.stringify(progressData, null, 2));
                    return;
                }
            }

            // Kalau sudah selesai, simpan failed list tetap
            progressData[m.sender] = {
                savePath,
                newId,
                failedList
            };
            fs.writeFileSync(progressFile, JSON.stringify(progressData, null, 2));

            let msg = `🎉 Semua link selesai di folder *${newId}*!\n✅ Berhasil: ${successCount}`;
            if (failedList.length > 0) {
                msg += `\n⚠️ Gagal: ${failedList.length} link (tersimpan di failed list):\n${failedList.join("\n")}`;
            }
            m.reply(msg);
        }
    } catch (err) {
        console.error(err);
        m.reply("❌ Terjadi kesalahan saat memproses download.");
    } finally {
        ytQueue.splice(ytQueue.indexOf(m.sender), 1);
    }
};

//━━━━━━━━━━━━━━━[ STATISTIK GRUP ]━━━━━━━━━━━━━━━\\

// Letakkan ini di bagian atas file atau di tempat inisialisasi database
global.db.statistik = global.db.statistik || {}; // { [groupJid]: { [userJid]: { count: number, last: number } } }
global.db.user = global.db.user || {}; // { [userJid]: { name: string } }

// Fungsi untuk memperbarui statistik setiap ada pesan (panggil di handler pesan)
function updateStatistik(m) {
    if (!m.isGroup) return; // hanya grup
    if (!m.from || !m.sender) return;
    
    const groupJid = m.from;
    const userJid = m.sender;
    const now = Date.now();
    
    // Inisialisasi jika belum ada
    if (!global.db.statistik[groupJid]) global.db.statistik[groupJid] = {};
    if (!global.db.statistik[groupJid][userJid]) {
        global.db.statistik[groupJid][userJid] = { count: 0, last: null };
    }
    
    // Update jumlah dan waktu terakhir
    global.db.statistik[groupJid][userJid].count += 1;
    global.db.statistik[groupJid][userJid].last = now;
    
    // Simpan nama pengguna jika ada pushName
    if (m.pushName) {
        if (!global.db.user[userJid]) global.db.user[userJid] = {};
        global.db.user[userJid].name = m.pushName;
    }
}

//━━━━━━━━━━━━━━━[ HANDLER ]━━━━━━━━━━━━━━━\\

// Cache untuk menyimpan ID pesan yang sudah diproses
const messageCache = new Set();

export const handler = async (m, sock) => {

    // --- Cek duplikat pesan ---
    // Ambil ID pesan (sesuaikan dengan struktur objek m yang digunakan)
    const messageId = m.key?.id || m.id; // fallback jika properti berbeda
    if (messageCache.has(messageId)) {
        // Pesan dengan ID ini sudah pernah diproses, abaikan
        return;
    }
    // ID baru, simpan ke cache
    messageCache.add(messageId);

    // Opsional: bersihkan cache jika terlalu besar agar tidak boros memori
    if (messageCache.size > 1000) {
        messageCache.clear();
    }
    // --- Akhir cek duplikat ---

    // nomor sendiri (bot) tidak bisa menggunakan
    // if (m.fromMe) return
    
    // cek bukan di grup, hanya lanjut jika command login
    if (!m.isGroup && !m.body?.toLowerCase().startsWith((m.prefix + 'login').toLowerCase())) return;

const isCommand = m.body.startsWith(m.prefix)
const command = isCommand ? m.command.toLowerCase() : '';
    
    // Menjalankan log
    await logMessage(sock, m)

    // Load db
    await databaseLoad(m)

//━━━━━━━━━━━━━━━[ AFK SISTEM ]━━━━━━━━━━━━━━━━━//

const sender = getActualJID(m.sender)

// ========== KEMBALI DARI AFK ==========
if (afkData[sender]) {
    const afkInfo = afkData[sender]
    const duration = Date.now() - afkInfo.since

    const days = Math.floor(duration / 86400000)
    const hours = Math.floor((duration % 86400000) / 3600000)
    const minutes = Math.floor((duration % 3600000) / 60000)
    const seconds = Math.floor((duration % 60000) / 1000)

    const taggedUsersUnique = [...new Set(afkInfo.taggedBy)]
    const taggedCount = taggedUsersUnique.length

    const taggedUsers = taggedUsersUnique
        .map(id => `• @${id.split('@')[0]}`)
        .join('\n') || '-'

    let reply = `👋 Selamat datang kembali!\n`
    reply += `⏱️ Kamu AFK selama ${days} hari ${hours} jam ${minutes} menit ${seconds} detik\n`
    reply += `🔔 Selama kamu AFK, kamu telah ditag oleh *${taggedCount}* orang:\n${taggedUsers}`

    delete afkData[sender]
    saveAFK()

    await m.reply(reply, null, { mentions: taggedUsersUnique })
}

// ========== MENTION USER AFK ==========
if (m.mentions?.length) {
    for (let id of m.mentions) {

        const jid = getActualJID(id)
        if (afkData[jid]) {
        
        if (id === sender) continue // opsional
        
            if (!afkData[jid].taggedBy.includes(sender)) {
                afkData[jid].taggedBy.push(sender)
            }
            saveAFK()

            const timeAgo = Date.now() - afkData[jid].since
            const days = Math.floor(timeAgo / 86400000)
            const hours = Math.floor((timeAgo % 86400000) / 3600000)
            const minutes = Math.floor((timeAgo % 3600000) / 60000)

            const afkMsg = `⚠️ Pengguna tersebut sedang AFK\n📌 Alasan: ${afkData[jid].reason || '-'}\n⏱️ ${days} hari ${hours} jam ${minutes} menit lalu`

            await m.reply(afkMsg)
        }
    }
}

// ========== REPLY PESAN USER AFK ==========
if (m.quoted?.sender) {
    const quotedSender = getActualJID(m.quoted.sender)

    if (afkData[quotedSender]) {
    
    if (quotedSender === sender) return // opsional
    
        if (!afkData[quotedSender].taggedBy.includes(sender)) {
            afkData[quotedSender].taggedBy.push(sender)
        }
        saveAFK()

        const timeAgo = Date.now() - afkData[quotedSender].since
        const days = Math.floor(timeAgo / 86400000)
        const hours = Math.floor((timeAgo % 86400000) / 3600000)
        const minutes = Math.floor((timeAgo % 3600000) / 60000)

        const afkMsg = `⚠️ Pengguna tersebut sedang AFK\n📌 Alasan: ${afkData[quotedSender].reason || '-'}\n⏱️ ${days} hari ${hours} jam ${minutes} menit lalu`

        await m.reply(afkMsg)
    }
}

    // Klo bukan m dan m.body maka batalkan
    if (!m || !m.body) return;
    
    // Download youtube (ini anu kebutuhan owner)
    ytmp3multi(m, sock)

//━━━━━━━━━━━━━━━[ HANDLE MUTE ]━━━━━━━━━━━━━━━━━\\

if (m.isGroup) {
const gcId = m.from;
const grup = global.db.grups[gcId];
// Cek jika grup di-mute dan bukan perintah mute
if (grup?.mute && command !== 'mute') return;
}

//━━━━━━━━━━━━━━━[ AMANKAN ]━━━━━━━━━━━━━━━\\

const escapeRegExp = (string) => {
    return string.replace(/[.*=+:\-?^${}()|[\]\\]/g, '\\$&');
};

// Sanitasi: hanya huruf, angka, dan spasi yang diperbolehkan
function sanitizeArgs(rawArgs) {
    const input = rawArgs.join(' ').trim();
    if (!input) return [];

    // Hanya izinkan alfanumerik dan spasi
    const allowedRegex = /^[a-zA-Z0-9 ]+$/;
    if (!allowedRegex.test(input)) {
        console.log(`[SECURITY] Input ditolak (hanya huruf, angka, spasi): ${input}`);
        return [];
    }

    // Batasi panjang untuk mencegah DoS
    if (input.length > 100) return [];

    return input.split(/\s+/).filter(a => a);
}

// ========== PENERAPAN PADA PESAN ==========
let rawArgs = m.body.trim()
    .replace(new RegExp('^' + escapeRegExp(m.prefix), 'i'), '')
    .replace(m.command, '')
    .split(/ +/)
    .filter(a => a) || [];

//━━━━━━━━━━━━━━━[ HANDLE RPG ]━━━━━━━━━━━━━━━\\

/**
 * Memperbarui nama user berdasarkan pushName dari WhatsApp.
 * Hanya berjalan jika user sudah terdaftar (memiliki properti harvest).
 * @param {string} userId - ID WhatsApp (contoh: '628xxx@s.whatsapp.net')
 * @param {string} pushName - Nama dari WhatsApp (m.pushName)
 * @returns {object|null} - Data user yang sudah diupdate, atau null jika user belum terdaftar
 */
function updateUserName(userId, pushName) {
    const user = loadUserData(userId);
    
    // Jika user belum terdaftar (tidak ada harvest), return null tanpa perubahan
    if (!user || !user.harvest) {
        return null;
    }
    
    // Update nama jika berbeda dan pushName tersedia
    if (pushName && user.name !== pushName) {
        user.name = pushName;
        saveUserData(userId, user);
        console.log(`✏️ Nama user diupdate: ${userId} -> ${pushName}`);
    }
    
    return user;
}

    // Mengakses rpg, ada di folder fitur
    if (command && !m.sender.endsWith('@lid')) {
        const safeArgs = sanitizeArgs(rawArgs);
        const mForCommand = { ...m, text: safeArgs.join(' '), args: safeArgs };
        const user = loadUserData(m.sender);
        const teksLevel = await handleLevel(user, m);
        // Update nama user jika sudah terdaftar (tidak mendaftarkan baru)
        await updateUserName(m.sender, m.pushName);
        await handleCommand(mForCommand, command, teksLevel);
    }

//━━━━━━━━━━━━━━━[ JAWAB SOAL ]━━━━━━━━━━━━━━━━━//

if (!command && tebakgambar[m.sender] && !tebakkata[m.sender] && !caklontong[m.sender] && !siapakahaku[m.sender] && !family100[m.from] && !tebakml[m.sender] && !tebakff[m.sender]) {
    const botNumber = sock.decodeJid(sock.user?.id);
    if (m.fromMe || m.sender === botNumber) return;
    
    // Game tebakgambar
    if (tebakgambar[m.sender]) {
        let jawaban = tebakgambar[m.sender].json.jawaban;
        let hadiah = tebakgambar[m.sender].poin;
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.body);
        
        if (isSurrender) {
            clearTimeout(tebakgambar[m.sender].timeout);
            delete tebakgambar[m.sender];
            return m.reply(`*Soal dibatalkan*`);
        }
        
        if (m.body.toLowerCase() == jawaban.toLowerCase()) {
            clearTimeout(tebakgambar[m.sender].timeout);
            hadiahUang(m.sender, hadiah);
            await m.reply(`🎮 *Tebak Gambar* 🎮\n\nJawaban benar 🎉\nKamu mendapatkan +${hadiah} G`);
            delete tebakgambar[m.sender];
        } else {
            m.reply('*Jawaban salah!*\nKetik *nyerah* untuk hapus soal');
        }
    }
}

if (!command && !tebakgambar[m.sender] && tebakkata[m.sender] && !caklontong[m.sender] && !siapakahaku[m.sender] && !family100[m.from] && !tebakml[m.sender] && !tebakff[m.sender]) {
    const botNumber = sock.decodeJid(sock.user?.id);
    if (m.fromMe || m.sender === botNumber) return;
    
    // Game tebakkata
    if (tebakkata[m.sender]) {
        let jawaban = tebakkata[m.sender].json.jawaban;
        let hadiah = tebakkata[m.sender].poin;
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.body);
        
        if (isSurrender) {
            clearTimeout(tebakkata[m.sender].timeout);
            delete tebakkata[m.sender];
            return m.reply(`*Soal dibatalkan*`);
        }
        
        if (m.body.toLowerCase() == jawaban.toLowerCase()) {
            clearTimeout(tebakkata[m.sender].timeout);
            hadiahUang(m.sender, hadiah);
            await m.reply(`🎮 *Tebak Kata* 🎮\n\nJawaban benar 🎉\nKamu mendapatkan +${hadiah} G`);
            delete tebakkata[m.sender];
        } else {
            m.reply('*Jawaban salah!*\nKetik *nyerah* untuk hapus soal');
        }
    }
}

if (!command && !tebakgambar[m.sender] && !tebakkata[m.sender] && caklontong[m.sender] && !siapakahaku[m.sender] && !family100[m.from] && !tebakml[m.sender] && !tebakff[m.sender]) {
    const botNumber = sock.decodeJid(sock.user?.id);
    if (m.fromMe || m.sender === botNumber) return;
    
    // Game caklontong
    if (caklontong[m.sender]) {
        let jawaban = caklontong[m.sender].json.jawaban;
        let hadiah = caklontong[m.sender].poin;
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.body);
        
        if (isSurrender) {
            clearTimeout(caklontong[m.sender].timeout);
            delete caklontong[m.sender];
            return m.reply(`*Soal dibatalkan*`);
        }
        
        if (m.body.toLowerCase() == jawaban.toLowerCase()) {
            clearTimeout(caklontong[m.sender].timeout);
            hadiahUang(m.sender, hadiah);
            await m.reply(`🎮 *Caklontong* 🎮\n\nJawaban benar 🎉\nKamu mendapatkan +${hadiah} G\n\n*Soal:* ${caklontong[m.sender].json.soal}\n*Jawaban* ${caklontong[m.sender].json.jawaban}\n*Keterangan:* ${caklontong[m.sender].json.deskripsi}`);
            delete caklontong[m.sender];
        } else {
            m.reply('*Jawaban salah!*\nKetik *nyerah* untuk hapus soal');
        }
    }
}

if (!command && !tebakgambar[m.sender] && !tebakkata[m.sender] && !caklontong[m.sender] && siapakahaku[m.sender] && !family100[m.from] && !tebakml[m.sender] && !tebakff[m.sender]) {
    const botNumber = sock.decodeJid(sock.user?.id);
    if (m.fromMe || m.sender === botNumber) return;
    
    // Game siapakahaku
    if (siapakahaku[m.sender]) {
        let jawaban = siapakahaku[m.sender].json.jawaban;
        let hadiah = siapakahaku[m.sender].poin;
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.body);
        
        if (isSurrender) {
            clearTimeout(siapakahaku[m.sender].timeout);
            delete siapakahaku[m.sender];
            return m.reply(`*Soal dibatalkan*`);
        }
        
        if (m.body.toLowerCase() == jawaban.toLowerCase()) {
            clearTimeout(siapakahaku[m.sender].timeout);
            hadiahUang(m.sender, hadiah);
            await m.reply(`🎮 *Siapakah Aku* 🎮\n\nJawaban benar 🎉\nKamu mendapatkan +${hadiah} G`);
            delete siapakahaku[m.sender];
        } else {
            m.reply('*Jawaban salah!*\nKetik *nyerah* untuk hapus soal');
        }
    }
}

if (!command && !tebakgambar[m.sender] && !tebakkata[m.sender] && !caklontong[m.sender] && !siapakahaku[m.sender] && !family100[m.from] && !tebakff[m.sender]) {
    const botNumber = sock.decodeJid(sock.user?.id);
    if (m.fromMe || m.sender === botNumber) return;
    
    // Game tebakml
    if (tebakml[m.sender]) {
        let jawabanBenar = tebakml[m.sender].json.nama;
        let hadiah = tebakml[m.sender].poin;
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.body);
        
        if (isSurrender) {
            clearTimeout(tebakml[m.sender].timeout);
            delete tebakml[m.sender];
            return m.reply('🚫 Soal tebakml dibatalkan.');
        }
        
        if (m.body.toLowerCase() === jawabanBenar.toLowerCase()) {
            clearTimeout(tebakml[m.sender].timeout);
            hadiahUang(m.sender, hadiah);
            await m.reply(`✅ *Benar!* 🎉\nKamu mendapatkan +${hadiah} G`);
            delete tebakml[m.sender];
        } else {
            m.reply('❌ *Salah!* Coba lagi. Ketik *nyerah* untuk menyerah.');
        }
    }
}

if (!command && !tebakgambar[m.sender] && !tebakkata[m.sender] && !caklontong[m.sender] && !siapakahaku[m.sender] && !family100[m.from] && !tebakml[m.sender]) {
    const botNumber = sock.decodeJid(sock.user?.id);
    if (m.fromMe || m.sender === botNumber) return;
    
    // Game tebakff
    if (tebakff[m.sender]) {
        let jawabanBenar = tebakff[m.sender].json.nama;
        let hadiah = tebakff[m.sender].poin;
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.body);
        
        if (isSurrender) {
            clearTimeout(tebakff[m.sender].timeout);
            delete tebakff[m.sender];
            return m.reply('🚫 Soal tebakff dibatalkan.');
        }
        
        if (m.body.toLowerCase() === jawabanBenar.toLowerCase()) {
            clearTimeout(tebakff[m.sender].timeout);
            hadiahUang(m.sender, hadiah);
            await m.reply(`✅ *Benar!* 🎉\nKamu mendapatkan +${hadiah} G`);
            delete tebakff[m.sender];
        } else {
            m.reply('❌ *Salah!* Coba lagi. Ketik *nyerah* untuk menyerah.');
        }
    }
}

//━━━━━━━━━━━━━━━[ FAMILY100 ]━━━━━━━━━━━━━━━━━//

const threshold = 0.72;

if (!command && !tebakgambar[m.sender] && !tebakkata[m.sender] && !caklontong[m.sender] && !siapakahaku[m.sender] && family100[m.from] && !tebakml[m.sender] && !tebakff[m.sender]) {
    let room = family100[m.from];
    let text = m.body.toLowerCase().replace(/[^\w\s\-]+/g, '');
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.body);

    const botNumber = sock.decodeJid(sock.user?.id);
    if (m.fromMe || m.sender === botNumber) return;

    // Cari index jawaban yang tepat
    let index = room.jawaban.indexOf(text);

    if (!isSurrender) {
        if (index >= 0 && !room.terjawab[index]) {
            // Jawaban tepat
            room.terjawab[index] = m.sender;
            hadiahUang(m.sender, room.winScore);
        } else if (index < 0) {
            // Cek kemiripan
            let maxSimilarity = Math.max(
                ...room.jawaban
                .filter((_, i) => !room.terjawab[i])
                .map(jawaban => similarity(jawaban, text))
            );
            if (maxSimilarity >= threshold) {
                m.reply('*Dikit lagi!*\nKetik *nyerah* untuk hapus soal');
                return true;
            } else {
                // Jawaban kurang tepat
                return true;
            }
        }
    }

    let isWin = room.terjawab.every(v => v);
    let caption = `
*Soal:* ${room.soal}
Terdapat *${room.jawaban.length}* jawaban${
    room.jawaban.some(v => v.includes(' ')) ? '\n(beberapa jawaban terdapat spasi)' : ''
  }
${isWin ? '\n✅ *SEMUA JAWABAN TERJAWAB*' : isSurrender ? '\n🚫 *MENYERAH!*' : '\n⚠️ Ketik *nyerah* untuk menyerah'}
${room.jawaban
  .map((jawaban, i) =>
    isSurrender || room.terjawab[i]
      ? `(${i + 1}) ${jawaban} ${
          room.terjawab[i] ? '@' + room.terjawab[i].split('@')[0] : ''
        }`.trim()
      : false
  )
  .filter(Boolean)
  .join('\n')}
${isSurrender ? '' : `+${room.winScore} G tiap jawaban benar`}
  `.trim();

    const msg = await m.reply(caption);
    room.msg = msg;

    if (isWin || isSurrender) {
        clearTimeout(room.timeout); // Hentikan timeout
        delete family100[m.from];
    }
}

//━━━━━━━━━━━━━━━[ AUTODAFTAR ]━━━━━━━━━━━━━━━━━//

// Set untuk menyimpan LID yang sudah diberi peringatan (agar tidak spam)
const warnedLid = new Set();
// Auto daftar & auto link (gabungan)
if (m.body) {
    // 1. Untuk user biasa (private chat) — inisialisasi harvest jika belum ada
    if (m.sender.endsWith('@s.whatsapp.net')) {
        const user = loadUserData(m.sender);
        if (!user.harvest) {
            let harvest = { harvest: daftar.defaultData };
            saveUserData(m.sender, harvest);
        }
    }

    // 2. Untuk pesan di grup — hubungkan LID (pengirim) ke JID (nomor telepon)
    if (m.from.endsWith('@g.us') && m.sender.endsWith('@lid')) {
        const lid = m.sender;
        const linked = loadLinked();

        // Jika sudah terhubung, skip
        if (linked[lid]) return;

        let groupMeta;
        try {
            groupMeta = await sock.groupMetadata(m.from);
        } catch (err) {
            console.error('Gagal mengambil metadata grup:', err);
            return;
        }

        if (!groupMeta || !groupMeta.participants) return;

        // Cari peserta dengan id yang sama dengan LID
        const participant = groupMeta.participants.find(p => p.id === lid);
        if (!participant) {
            // Beri peringatan hanya sekali per sesi
            if (!warnedLid.has(lid)) {
                warnedLid.add(lid);
                // Optional biar ga ganggu matiin
                // await m.reply(`❌ Kamu tidak ditemukan dalam daftar anggota grup ini.\n\n⚠️ Silahkan ketik *${m.prefix}daftar 62xxxxx*\nHarus menggunakan nomor asli, yang saat ini sedang digunakan.`);
            }
            return;
        }

        const jid = participant.phoneNumber; // sudah berakhiran @s.whatsapp.net
        if (!jid) return;

        // Simpan hubungan lid → jid
        linked[lid] = jid;
        saveLinked(linked);
        // await m.reply('✅ Akun berhasil dihubungkan secara otomatis!');
    }
}

// AUTO BUAT DATABASE LIMIT JIKA BELUM ADA
if (m.body) {
const user = loadUserData(m.sender);
  if (user.harvest && !user.harvest.limit && m.sender.endsWith('@s.whatsapp.net')) {
    initLimit(user);
    const limit = user.harvest.limit;
    saveUserData(m.sender, user);
  }
}

// Init statistik grup
if (m.isGroup && m.sender.endsWith('@s.whatsapp.net')) {
updateStatistik(m)
}

//━━━━━━━━━━━━━━━[ ANTILINK SYSTEM ]━━━━━━━━━━━━━━━━━\\

if (m.isGroup) {
    const gcId = m.from;
    const grup = global.db.grups[gcId];

    if (grup?.antilink) {
        const teks = m.body || '';
        const regex = /(chat\.whatsapp\.com\/[A-Za-z0-9]+)/i;

        if (regex.test(teks)) {

            // Admin grup bebas kirim link
            if (m.isAdmin) return m.reply('Apalah admin');

            // ⚠️ BOT BUKAN ADMIN -> PERINGATAN
            if (!m.isBotAdmin) {
                return m.reply(
                    '⚠️ *Anti-Link aktif*, tapi bot bukan admin.\n' +
                    'Silakan jadikan bot sebagai admin agar bisa menghapus link otomatis.'
                );
            }

            // 🗑️ BOT ADMIN -> HAPUS PESAN
            await sock.sendMessage(m.from, {
                delete: {
                    remoteJid: m.from,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.participant || m.key.participant
                }
            });
        }
    }
}

//━━━━━━━━━━━━━━━[ YOUTUBE SEARCH ]━━━━━━━━━━━━━━━━━\\

class YouTubeAPIError extends Error {
  constructor(message, code = "UNKNOWN", status = null, original = null) {
    super(message);
    this.name = "YouTubeAPIError";
    this.code = code;
    this.status = status;
    this.original = original;
  }
}

const ErrorCodes = {
  NETWORK: "NETWORK",
  PARSE: "PARSE",
  INIT: "INIT",
  UNKNOWN: "UNKNOWN"
};

const youtubeBase = "https://www.youtube.com";

const extractInitData = (html) => {
  try {
    const start = html.indexOf("ytInitialData") + 16;
    const end = html.indexOf("};", start) + 1;

    if (start < 0 || end < 0) throw new Error("InitData not found");

    const json = html.slice(start, end);

    return JSON.parse(json);
  } catch (err) {
    throw new YouTubeAPIError(
      "Failed to parse ytInitialData",
      ErrorCodes.PARSE,
      null,
      err
    );
  }
};

const parseVideoItem = (render) => {
  const data = render.videoRenderer;
  if (!data || !data.videoId) return null;

  const videoId = data.videoId;
  const title = data.title?.runs?.[0]?.text || "No title";

  const thumb =
    data.thumbnail?.thumbnails?.[data.thumbnail.thumbnails.length - 1]?.url;

  const duration =
    data.lengthText?.simpleText ||
    data.lengthText?.runs?.map((x) => x.text).join("") ||
    null;

  return {
    url: "https://www.youtube.com/watch?v=" + videoId,
    thumb,
    title,
    durasi: duration
  };
};

async function youtubeSearch(query) {
  try {
    const searchURL =
      youtubeBase + "/results?search_query=" + encodeURIComponent(query) + "&sp=EgIQAQ%3D%3D";

    const { data: html } = await axios.get(searchURL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "en-US,en;q=0.9"
      }
    });

    const initData = extractInitData(html);

    const contents =
      initData.contents?.twoColumnSearchResultsRenderer?.primaryContents
        ?.sectionListRenderer?.contents || [];

    let results = [];

    for (const section of contents) {
      const items =
        section.itemSectionRenderer?.contents ||
        section.richItemRenderer ||
        [];

      for (const item of items) {
        const video = parseVideoItem(item);
        if (video) results.push(video);
      }
    }

    return results;
  } catch (err) {
    if (err instanceof YouTubeAPIError) throw err;

    throw new YouTubeAPIError(
      "Failed to fetch YouTube search",
      ErrorCodes.NETWORK,
      err?.response?.status,
      err
    );
  }
}

//━━━━━━━━━━━━━━━[ BRAT ]━━━━━━━━━━━━━━━\\

const execPromise = util.promisify(exec);
const createTitleImage = async (title) => {

  const imagePath = path.join(directory, "temp/title-image.png");
  const fontPath = path.join(directory, "assets/fonts/NotoColorEmoji.ttf");

  const padding = 60;
  const maxWidth = 1000 - padding * 2;

  // Estimasi ukuran font
  const fontSize = Math.max(
    40,
    Math.min(160, Math.floor(2200 / Math.sqrt(title.length)))
  );

  // Estimasi tinggi berdasarkan panjang teks
  const baseHeight = 200; // minimum tinggi
  const charsPerLine = Math.max(15, Math.floor(maxWidth / (fontSize * 0.6)));
  const numLines = Math.ceil(title.length / charsPerLine);
  const lineHeight = fontSize * 1.4;
  const boxHeight = Math.max(baseHeight, numLines * lineHeight + padding * 2);

  const safeText = title.replace(/"/g, '\\"');

  const command = `
    pango-view \
      --no-display \
      --font="Noto Color Emoji ${fontSize}" \
      --foreground="#000000" \
      --background="#ffffff" \
      --output="${imagePath}" \
      --align=left \
      --justify \
      --wrap=word \
      --margin=${padding} \
      --width=${maxWidth} \
      --height=${Math.round(boxHeight)} \
      --text="${safeText}"
  `;

  await execPromise(command);

  return fs.readFileSync(imagePath);
};


//━━━━━━━━━━━━━━━[ BRAT VID ]━━━━━━━━━━━━━━━\\

const directory = process.cwd();
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

const createTitleGif = async (text) => {
  const tempDir = path.join(directory, "temp");
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

  const words = text.trim().split(/\s+/);
  const frames = [];

  // FRAME 0 — kosong
  const blank = path.join(tempDir, "frame-0.png");
  await execPromise(`convert -size ${CANVAS_WIDTH}x${CANVAS_HEIGHT} canvas:white "${blank}"`);
  frames.push({ file: blank, delay: 10 });

  // FRAME PER KATA
  let combine = "";
  for (let i = 0; i < words.length; i++) {
    combine += (i > 0 ? " " : "") + words[i];
    const framePath = await renderFrame(combine, i + 1, tempDir);
    frames.push({ file: framePath, delay: 50 });
  }

  // tahan frame terakhir
  frames[frames.length - 1].delay = 250;

  // GABUNG GIF
  const output = path.join(tempDir, "title.gif");
  let cmd = "convert ";
  for (const f of frames) cmd += `-delay ${f.delay} "${f.file}" `;
  cmd += `-loop 0 "${output}"`;
  await execPromise(cmd);

  return fs.readFileSync(output);
};

// ==============================================================
// RENDER PANGO -> SCALE KE DALAM CANVAS (ANTI TERPOTONG)
// ==============================================================
async function renderFrame(text, index, tempDir) {
  const raw = path.join(tempDir, `raw-${index}.png`);
  const final = path.join(tempDir, `frame-${index}.png`);

  const padding = 60;
  const maxWidth = CANVAS_WIDTH - padding * 2;

  // AUTO FONT SIZE (aman)
  const fontSize = Math.max(
    40,
    Math.min(120, Math.floor(2200 / Math.sqrt(text.length)))
  );

  const safe = text.replace(/"/g, '\\"');

  // STEP 1: render pango natural-size (TINGGI TANPA BATAS)
  const cmd1 = `
    pango-view \
      --no-display \
      --font="Noto Color Emoji ${fontSize}" \
      --foreground="#000000" \
      --background="#ffffff" \
      --align=left \
      --justify \
      --wrap=word \
      --margin=${padding} \
      --width=${maxWidth} \
      --output="${raw}" \
      --text="${safe}"
  `;
  await execPromise(cmd1);

  // STEP 2: scale otomatis agar pas ke canvas 1000x400
  //  -resize menjaga rasio
  //  -gravity center memastikan tetap tengah
  const cmd2 = `
    convert "${raw}" \
      -resize ${CANVAS_WIDTH}x${CANVAS_HEIGHT} \
      -background white -gravity center \
      -extent ${CANVAS_WIDTH}x${CANVAS_HEIGHT} \
      "${final}"
  `;
  await execPromise(cmd2);

  return final;
}

//━━━━━━━━━━━━━━━[ WAIFU IMAGE ]━━━━━━━━━━━━━━━\\

let WAIFU_TAGS_CACHE = [];
let LAST_FETCH = 0;

const getWaifuTags = async () => {
  // cache 10 menit
  if (Date.now() - LAST_FETCH < 10 * 60 * 1000 && WAIFU_TAGS_CACHE.length) {
    return WAIFU_TAGS_CACHE;
  }

  const { data } = await axios.get('https://api.waifu.im/tags');

  // gabung semua kategori jadi satu array
  const tags = [
    ...(data.versatile || []),
    ...(data.nsfw || [])
  ];

  WAIFU_TAGS_CACHE = tags;
  LAST_FETCH = Date.now();

  return WAIFU_TAGS_CACHE;
};

const getWaifuImage2 = async (tag) => {
  const { data } = await axios.get('https://api.waifu.im/images', {
    params: {
      IncludedTags: tag,
      IsNsfw: 'All' // default false
    },
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  });
  return data;
  console.log(data)
};

//━━━━━━━━━━━━━━━[ CUSTOM CIHUY ]━━━━━━━━━━━━━━━\\

function parseArgs(text) {
  const args = {};
  const parts = text.split(/\s+/).slice(1);

  for (const part of parts) {

    // key=value
    if (part.includes('=')) {
      let [key, value] = part.split('=');
      key = key.toLowerCase();
      value = value.toLowerCase();

      // boolean / all
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (value === 'all') value = 'all';

      // list
      if (typeof value === 'string' && value.includes(',')) {
        value = value.split(',').map(v => v.trim()).filter(Boolean);
      }

      args[key] = value;
      continue;
    }

    // tanpa "=" → dianggap TAG
    if (!args.tags) args.tags = [];
    args.tags.push(part.toLowerCase());
  }

  return args;
}

/*
waifu nsfw=true
waifu tags=waifu,maid animation=true
waifu nsfw=all orientation=portrait
waifu tags=raiden-shogun width=>=1920 height=1080
waifu order=favorites pagesize=3
*/

function buildWaifuParams(args) {
  return {
    IncludedTags: args.tags || 'waifu',
    IsNsfw: args.nsfw ?? false, // true | false | all
    IsAnimated: args.animation ?? 'all', // true | false | all
    OrderBy: args.order || 'Random',
    Orientation: args.orientation || 'All',
    Width: args.width,
    Height: args.height,
    ByteSize: args.bytesize,
    Page: args.page || 1,
    PageSize: args.pagesize || 1
  };
}

const getWaifuImage = async (params) => {
  const { data } = await axios.get(
    'https://api.waifu.im/images',
    {
      params,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    }
  );
  return data;
};

async function downloadToFile(url, filename) {
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  const filepath = path.join(tempDir, filename);
  const response = await axios.get(url, { responseType: 'stream' });
  const writer = fs.createWriteStream(filepath);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(filepath));
    writer.on('error', reject);
  });
}

//━━━━━━━━━━━━━━━[ NANO BANANA ]━━━━━━━━━━━━━━━\\

    // --- Helper Functions (dari scraper baru) ---
    function isPin(url) {
        if (!url) return false;
        const patterns = [
            /^https?:\/\/(?:www\.)?pinterest\.com\/pin\/[\w.-]+/,
            /^https?:\/\/(?:www\.)?pinterest\.[\w.]+\/pin\/[\w.-]+/,
            /^https?:\/\/pin\.it\/[\w.-]+/,
            /^https?:\/\/(?:www\.)?pinterest\.com\/amp\/pin\/[\w.-]+/,
            /^https?:\/\/(?:[a-z]{2}|www)\.pinterest\.com\/pin\/[\w.-]+/,
            /^https?:\/\/(?:www\.)?pinterest\.com\/pin\/[\d]+(?:\/)?$/,
            /^https?:\/\/(?:www\.)?pinterest\.[\w.]+\/pin\/[\d]+(?:\/)?$/,
        ];
        return patterns.some(pattern => pattern.test(url.trim().toLowerCase()));
    }

    async function getCookies() {
        try {
            const response = await axios.get("https://www.pinterest.com/csrf_error/");
            const setCookieHeaders = response.headers["set-cookie"];
            if (setCookieHeaders) {
                const cookies = setCookieHeaders.map(cookieString => cookieString.split(";")[0].trim());
                return cookies.join("; ");
            }
            return null;
        } catch {
            return null;
        }
    }

    // Fungsi pencarian Pinterest (hanya yang dipakai)
    async function pinterest(query, limit = 20) {
        try {
            const cookies = await getCookies();
            if (!cookies) return [];

            const url = "https://www.pinterest.com/resource/BaseSearchResource/get/";
            const dataParam = {
                options: {
                    article_size: "normal",
                    auto_correction_disabled: false,
                    camera: null,
                    custom_personalization_parameters: null,
                    enable_query_correction: true,
                    input: query,
                    only_show_csr: true,
                    page_size: Math.min(limit, 250),
                    query,
                    scope: "pins",
                    top_level_domain: "com",
                    bookmark: null
                },
                context: {}
            };

            const params = {
                source_url: `/search/pins/?q=${encodeURIComponent(query)}`,
                data: JSON.stringify(dataParam),
                _: Date.now()
            };

            const headers = {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "cookie": cookies,
                "referer": "https://www.pinterest.com/",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "x-app-version": "c056fb7",
                "x-pinterest-appstate": "active",
                "x-pinterest-pws-handler": "www/search.js",
                "x-pinterest-source-url": `/search/pins/?q=${encodeURIComponent(query)}`,
                "x-requested-with": "XMLHttpRequest"
            };

            const res = await axios.get(url, { headers, params });
            const results = res.data?.resource_response?.data?.results || [];
            if (!results.length) return [];

            return results
                .filter((r) => r.images?.orig)
                .slice(0, limit)
                .map((r) => ({
                    upload_by: r.pinner?.username,
                    fullname: r.pinner?.full_name,
                    followers: r.pinner?.follower_count,
                    caption: r.grid_title,
                    image: r.images?.orig?.url,
                    source: `https://www.pinterest.com/pin/${r.id}`
                }));
        } catch (e) {
            console.log("Search Error:", e);
            return [];
        }
    }
    // --- End of Helper Functions ---

/**
 * Cari & download gambar dari Pinterest
 * @param {string} act - kata kunci pencarian
 * @returns {string} filePath
 */
async function gmsearchImage(act) {
  if (!act) throw new Error("❌ Kata kunci kosong");

  const query = `anime cantik sedang ${act}`;

  // Ambil hasil dari Pinterest (cukup beberapa aja)
  const results = await pinterest(query, 5);

  if (!Array.isArray(results) || results.length === 0) {
    throw new Error("❌ Tidak menemukan gambar atau terjadi kesalahan");
  }

  // Ambil index pertama (paling relevan & populer)
  const picked = results[0];
  const imageUrl = picked.image;

  if (!imageUrl) {
    throw new Error("❌ URL gambar tidak valid");
  }

  // Download gambar
  const res = await axios.get(imageUrl, {
    responseType: "arraybuffer",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
  });

  // Tentukan folder output
  const outDir = path.join(process.cwd(), "temp");
  fs.mkdirSync(outDir, { recursive: true });

  // Ekstrak ekstensi
  let ext = path.extname(new URL(imageUrl).pathname);
  if (!ext || ext.length > 5) ext = ".jpg";

  const filePath = path.join(outDir, `gmimage_${Date.now()}${ext}`);
  fs.writeFileSync(filePath, res.data);

  return filePath;
}

function extractAct(text) {
    if (!text) return { cleanText: text, act: null };

    const match = text.match(/\[(.*?)\]/); // ambil yg di dalam []
    if (!match) return { cleanText: text, act: null };

    const act = match[1].trim();
    const cleanText = text.replace(match[0], "").trim();

    return { cleanText, act };
}

//━━━━━━━━━━━━━━━[ ANTI TOXIC ]━━━━━━━━━━━━━━━\\

if (!isCommand && m.isGroup && global.db.antiToxic?.[m.from]?.enabled) {
    let data = global.db.antiToxic[m.from]
    
    if (data.words?.length) {
        let body = (m.body || "").toLowerCase()
        let terdeteksi = data.words.find(w => body.includes(w))
        
        if (terdeteksi) {
            try {
                // Hapus pesan
                await sock.sendMessage(m.from, {
                    delete: {
                        remoteJid: m.from,
                        id: m.key.id,
                        participant: m.key.participant || m.sender
                    }
                })
                
                // Kirim peringatan
                await sock.sendMessage(m.from, {
                    text: `⚠️ @${m.sender.split("@")[0]} pesan kamu dihapus karena mengandung kata toxic!`,
                    mentions: [m.sender]
                })
            } catch (e) {
                console.log("Anti toxic error:", e)
            }
        }
    }
}

//━━━━━━━━━━━━━━━[ RESPON SISTEM ]━━━━━━━━━━━━━━━\\

if (global.db.responBtn) {

let body = (m.body || "").toLowerCase().trim()

let respon = global.db.responBtn.find(v => v.trigger === body)

if (respon) {

let teks = respon.text || ""

if (respon.buttons && respon.buttons.length > 0) {

let listBtn = "\n\n"

respon.buttons.forEach((b,i)=>{
listBtn += `${i+1}. ${b.text}\n`
})

let metadata = tambahButton(
m.from,
...(respon.buttons.map(b => ({
nama: b.text,
cmd: b.cmd
})))
)

teks += `${listBtn}\nMetadata: ${metadata}`

}

if (respon.type === "image") {

await sock.sendMessage(m.from,{
image: { url: respon.media },
caption: teks
})

}

else if (respon.type === "video") {

await sock.sendMessage(m.from,{
video: { url: respon.media },
caption: teks,
gifPlayback: true
})

}

else {

m.reply(teks)

}

}
}

//━━━━━━━━━━━━━━━[ STRESS JIR ]━━━━━━━━━━━━━━━\\

// Daftar nama depan dan belakang (diperbanyak untuk variasi)
const namaLaki = [
  'Andi', 'Budi', 'Candra', 'Dedi', 'Eko', 'Fajar', 'Gunawan', 'Hadi', 'Indra', 'Joko',
  'Kurnia', 'Lutfi', 'Mulya', 'Nanda', 'Oki', 'Pram', 'Qomar', 'Rizki', 'Sandi', 'Teguh'
];
const namaPerempuan = [
  'Ani', 'Bunga', 'Cindy', 'Dewi', 'Eka', 'Fina', 'Gita', 'Hana', 'Indah', 'Julia',
  'Kartika', 'Lestari', 'Maya', 'Nia', 'Olive', 'Putri', 'Qonita', 'Rina', 'Sari', 'Tari'
];
const namaBelakang = [
  'Pratama', 'Wijaya', 'Kusuma', 'Santoso', 'Hidayat', 'Nugroho', 'Putra', 'Sari', 'Lestari', 'Utami',
  'Permana', 'Ramadan', 'Saputra', 'Setiawan', 'Sumantri', 'Wibowo', 'Yudha', 'Zahra', 'Fauzi', 'Maulana'
];

/**
 * Membuat nama anak dengan cegah duplikasi.
 * @param {string[]} existingNames - Daftar nama anak yang sudah ada (opsional)
 * @returns {object} { nama, gender, tanggal_lahir }
 */
function buatNamaAnak(existingNames = []) {
  // Fungsi pembantu untuk generate satu nama acak
  const generateRandomName = () => {
    const gender = Math.random() < 0.5 ? 'Laki-laki' : 'Perempuan';
    const daftarDepan = gender === 'Laki-laki' ? namaLaki : namaPerempuan;
    const depan = daftarDepan[Math.floor(Math.random() * daftarDepan.length)];
    const belakang = namaBelakang[Math.floor(Math.random() * namaBelakang.length)];
    return {
      nama: `${depan} ${belakang}`,
      gender: gender,
      depan: depan,
      belakang: belakang
    };
  };

  // Coba hingga 50 kali untuk mendapatkan nama unik
  const maxAttempts = 50;
  for (let i = 0; i < maxAttempts; i++) {
    const calon = generateRandomName();
    if (!existingNames.includes(calon.nama)) {
      return {
        nama: calon.nama,
        gender: calon.gender,
        tanggal_lahir: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      };
    }
  }

  // Jika tetap duplikat setelah 50 kali, tambahkan angka di belakang
  const lastTry = generateRandomName();
  let counter = 2;
  let namaFinal = `${lastTry.nama} ${counter}`;
  while (existingNames.includes(namaFinal)) {
    counter++;
    namaFinal = `${lastTry.nama} ${counter}`;
  }
  return {
    nama: namaFinal,
    gender: lastTry.gender,
    tanggal_lahir: new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  };
}

// Durasi kehamilan dan cooldown
const HAMIL_DURATION = 1000 * 60 * 60 * 6;      // 6 jam
const HAMIL_COOLDOWN = 1000 * 60 * 60 * 24;     // 24 jam setelah melahirkan
const COOLDOWN_GAGAL_HAMIL = 1000 * 60 * 60 * 1; // 1 jam jika gagal hamil

/**
 * Memproses kelahiran dan reset cooldown kehamilan.
 * @param {string} player - JID pengguna
 * @param {object} user - Objek user (langsung dimodifikasi)
 * @returns {string} Pesan tambahan jika ada kelahiran, selain itu string kosong
 */
function processPregnancyAndBirth(player, user) {
  const now = Date.now();
  let pesan = '';

  // Jika sedang hamil dan waktu melahirkan tiba
  if (user.hamil?.status === 'pregnant' && now >= user.hamil.waktuMelahirkan) {
    // Ambil daftar nama anak yang sudah ada (jika ada)
    const existingNames = (user.anak || []).map(anak => anak.nama);
    const namaAnak = buatNamaAnak(existingNames);
    
    user.anak ??= [];
    user.anak.push(namaAnak);

    // ========== KURANGI UANG SECARA ACAK ==========
    let potongan = 0;
    let sisaUang = 0;
    
    // Load data harvest (uang)
    let harvest = loadUserData(player);
    if (!harvest) {
      harvest = { harvest: { uang: 0 } };
    }
    harvest.harvest ??= { uang: 0 };
    const currentUang = harvest.harvest.uang;
    
    if (currentUang > 0) {
      // Potong uang secara acak antara 1 sampai total uang yang dimiliki
      potongan = Math.floor(Math.random() * currentUang) + 1;
      harvest.harvest.uang = currentUang - potongan;
      saveUserData(player, harvest);
      sisaUang = harvest.harvest.uang;
    } else {
      potongan = 0;
      sisaUang = 0;
    }
    // ========== END KURANGI UANG ==========

    // Reset status kehamilan ke cooldown
    user.hamil.status = 'cooldown';
    user.hamil.waktuMelahirkan = null;
    user.hamil.cooldownUntil = now + HAMIL_COOLDOWN;

    // Susun pesan kelahiran (termasuk info biaya)
    pesan = `
👶 *Anak Lahir!*
📛 Nama: ${namaAnak.nama}
🧬 Gender: ${namaAnak.gender}
🗓️ Tanggal: ${namaAnak.tanggal_lahir}
💰 Biaya melahirkan: *${potongan} uang* (sisa: *${sisaUang}*)
⏳ Bisa coba hamil lagi: ${new Date(user.hamil.cooldownUntil).toLocaleString('id-ID')}
    `.trim();
  }

  // Jika dalam masa cooldown dan waktu cooldown sudah habis
  if (user.hamil?.status === 'cooldown' && now >= user.hamil.cooldownUntil) {
    user.hamil = { status: null, mulai: null, waktuMelahirkan: null, cooldownUntil: null };
  }

  // Simpan perubahan data user (pasangan) jika ada pesan kelahiran
  if (pesan) User.save(player, user);
  return pesan;
}

//━━━━━━━━━━━━━━━[ LEVEL CANVACORD ]━━━━━━━━━━━━━━━\\

// Fungsi ini membaca semua player dan mengurutkan berdasarkan level (desc) lalu exp (desc)
async function getUserRankByLevel(playerId) {
    const directory = process.cwd();
    const tempDir = path.join(directory, 'temp');
    const playerFolder = path.join(tempDir, 'database');

    if (!fs.existsSync(playerFolder)) return { rank: 0, totalPlayers: 0 };

    const files = fs.readdirSync(playerFolder).filter(f => f.endsWith('.json'));
    const users = [];

    for (const file of files) {
        try {
            const filePath = path.join(playerFolder, file);
            const rawData = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(rawData);
            
            // Pastikan struktur data sesuai dengan bot kamu
            if (data && data.harvest) {
                users.push({
                    id: file.replace('.json', ''),
                    level: data.harvest.level || 1,
                    exp: data.harvest.exp || 0,
                });
            }
        } catch (e) {
            console.warn(`Gagal baca ${file}:`, e.message);
        }
    }

    // Urutkan berdasarkan level tertinggi, lalu exp tertinggi
    users.sort((a, b) => {
        if (a.level !== b.level) return b.level - a.level;
        return b.exp - a.exp;
    });

    const rankIndex = users.findIndex(u => u.id === playerId);
    const rank = rankIndex !== -1 ? rankIndex + 1 : 0;
    const totalPlayers = users.length;

    return { rank, totalPlayers };
}

//━━━━━━━━━━━━━━━[ RPG ISEKAI ]━━━━━━━━━━━━━━━\\

const args = m.args;

// ================================================================
// ⚔️  ISEKAI RPG SYSTEM v3.0 — FULL INTERCONNECTED
//     Semua skill, passive, role, dan equipment BERFUNGSI NYATA.
//     Paste helper di atas switch, paste cases ke switch handler.
// ================================================================

// ================================================================
// 🔧 SECTION 1: HELPER FUNCTIONS
// ================================================================

function getIsekaiData(user) {
    if (!user.harvest) user.harvest = { level: 1, exp: 0 };
    if (!user.harvest.isekai) {
        user.harvest.isekai = {
            registered: false, name: null, class: null,
            hpMax: 1000, atk: 50, def: 30, spd: 20,
            gold: 500, skystone: 10,
            mana: 60, manaMax: 60, lastManaRegen: Date.now(),
            pity: { standard: 0, event: 0, weapon: 0 },
            // Karakter: [{ id, level, exp, copies, awakening, equipment:{weapon,armor,accessory} }]
            ownedChars: [],
            party: [],       // char IDs aktif di party
            partySlots: 5,   // upgrade sampai 10
            // Senjata player: [{ id, enhance }]
            ownedWeapons: [],
            equippedWeapon: null,
            // Equipment untuk karakter: { 'item_id': quantity }
            charEquipInventory: {},
            // Progress
            currentStage: '1-1',
            completedStages: [],
            // Arena
            arenaRank: 1500, arenaWins: 0, arenaLosses: 0,
            // Stats
            lastDaily: null, totalKills: 0, totalPvpWins: 0,
        };
    }
    const d = user.harvest.isekai;
    // Migration guard
    if (!d.pity) d.pity = { standard: 0, event: 0, weapon: 0 };
    if (!d.charEquipInventory) d.charEquipInventory = {};
    if (!d.ownedChars) d.ownedChars = [];
    if (!d.party) d.party = [];
    if (!d.partySlots) d.partySlots = 5;
    if (!d.ownedWeapons) d.ownedWeapons = [];
    // pastikan setiap ownedChar punya slot equipment
    for (const oc of d.ownedChars) {
        if (!oc.equipment) oc.equipment = { weapon: null, armor: null, accessory: null };
    }
    return d;
}

function regenMana(isekai) {
    const now = Date.now();
    const elapsed = now - (isekai.lastManaRegen || now);
    const gain = Math.floor(elapsed / (6 * 60 * 1000));
    if (gain > 0) {
        isekai.mana = Math.min(isekai.manaMax, (isekai.mana || 0) + gain);
        isekai.lastManaRegen = now - (elapsed % (6 * 60 * 1000));
    }
}

function expNeeded(level) { return Math.floor(120 * Math.pow(1.38, level - 1)); }
function charExpNeeded(level) { return Math.floor(80 * Math.pow(1.5, level - 1)); }
function charLvupCost(level) { return Math.floor(150 * Math.pow(1.4, level - 1)); }
function rarityStars(n) { return '★'.repeat(n) + '☆'.repeat(5 - n); }

function arenaTitle(r) {
    if (r >= 2800) return '🔴 Grandmaster';
    if (r >= 2400) return '🟠 Diamond';
    if (r >= 2000) return '🟡 Platinum';
    if (r >= 1700) return '🟢 Gold';
    if (r >= 1400) return '🔵 Silver';
    if (r >= 1100) return '⚪ Bronze';
    return '⬛ Iron';
}

function dailyRewardByRank(isekai) {
    const t = arenaTitle(isekai.arenaRank);
    const map = {
        '⬛ Iron':       { gold: 200,  skystone: 0,  mana: 20 },
        '⚪ Bronze':     { gold: 400,  skystone: 3,  mana: 30 },
        '🔵 Silver':     { gold: 600,  skystone: 6,  mana: 40 },
        '🟢 Gold':       { gold: 900,  skystone: 10, mana: 50 },
        '🟡 Platinum':   { gold: 1300, skystone: 15, mana: 60 },
        '🟠 Diamond':    { gold: 1800, skystone: 22, mana: 80 },
        '🔴 Grandmaster':{ gold: 2500, skystone: 30, mana: 100 },
    };
    return map[t] || map['⬛ Iron'];
}

function partySlotCost(slots) {
    return { 5:50, 6:100, 7:200, 8:350, 9:600 }[slots] || null;
}

// Hitung CP — semua faktor dihitung: weapon, party, equipment, enhance, awakening
function calcCP(isekai) {
    const s = calcPartyStats(isekai);
    return Math.floor(s.totalATK * 4.5 + s.totalDEF * 2.5 + s.totalHP * 0.4 + isekai.party.filter(Boolean).length * 300);
}

// Hitung stats total party (player + party members + equipment)
function calcPartyStats(isekai) {
    let totalATK = isekai.atk;
    let totalDEF = isekai.def;
    let totalHP  = isekai.hpMax;

    // Player weapon
    if (isekai.equippedWeapon) {
        const ow = isekai.ownedWeapons.find(w => w.id === isekai.equippedWeapon);
        const wd = ISEKAI_WEAPONS.find(w => w.id === isekai.equippedWeapon);
        if (wd && ow != null) {
            const eb = (ow.enhance || 0) * 0.05;
            totalATK += Math.floor(wd.atk * (1 + eb));
            totalDEF += Math.floor(wd.def * (1 + eb));
        }
    }

    // Party members
    let classCounts = {};

// Bonus Yunyun: Wizard di party mendapat +12% ATK
if (isekai.party.includes('yunyun')) {
    let wizardAtkBonus = 0;
    for (const charId of isekai.party.filter(Boolean)) {
        const cd = ISEKAI_CHARACTERS.find(c => c.id === charId);
        const oc = isekai.ownedChars.find(c => c.id === charId);
        if (!cd || !oc) continue;
        if (cd.class === 'Wizard') {
            const lm = 1 + ((oc.level || 1) - 1) * 0.08;
            const am = 1 + (oc.awakening || 0) * 0.15;
            let mATK = Math.floor(cd.atk * 0.40 * lm * am);
            wizardAtkBonus += Math.floor(mATK * 0.12);
        }
    }
    totalATK += wizardAtkBonus;
}

    for (const charId of isekai.party.filter(Boolean)) {
        const cd = ISEKAI_CHARACTERS.find(c => c.id === charId);
        const oc = isekai.ownedChars.find(c => c.id === charId);
        if (!cd || !oc) continue;

        const lm = 1 + ((oc.level || 1) - 1) * 0.08;
        const am = 1 + (oc.awakening || 0) * 0.15;

        let mATK = Math.floor(cd.atk * 0.40 * lm * am);
        let mDEF = Math.floor(cd.def * 0.30 * lm * am);
        let mHP  = Math.floor(cd.hp  * 0.20 * lm * am);

        // Char equipment stat bonus
        for (const slot of ['weapon','armor','accessory']) {
            const itemId = oc.equipment?.[slot];
            if (!itemId) continue;
            const eq = CHAR_EQUIPMENT.find(e => e.id === itemId);
            if (!eq) continue;
            mATK += (eq.atk || 0);
            mDEF += (eq.def || 0);
            mHP  += (eq.hp  || 0);
        }

        totalATK += mATK;
        totalDEF += mDEF;
        totalHP  += mHP;

        classCounts[cd.class] = (classCounts[cd.class] || 0) + 1;
    }

    // Bonus: 3+ karakter class sama → +15% ATK
    if (Object.values(classCounts).some(v => v >= 3)) {
        totalATK = Math.floor(totalATK * 1.15);
    }
    // Bonus: party penuh → +8% semua stats
    if (isekai.party.filter(Boolean).length >= isekai.partySlots) {
        totalATK = Math.floor(totalATK * 1.08);
        totalDEF = Math.floor(totalDEF * 1.08);
        totalHP  = Math.floor(totalHP  * 1.08);
    }

    return { totalATK, totalDEF, totalHP };
}

// ================================================================
// 🎽 SECTION 2: CHARACTER EQUIPMENT DATABASE
// Semua special effect BERFUNGSI di battle engine
// ================================================================

const CHAR_EQUIPMENT = [
    // ── Weapons (slot: weapon) ──
    { id: 'small_knife',   name: '🔪 Small Knife',    slot: 'weapon',    rarity: 3, atk: 45,  def: 0,   hp: 0,    special: null,           specVal: 0,  price: 180,  stageDropId: null },
    { id: 'charm_blade',   name: '🌸 Charm Blade',    slot: 'weapon',    rarity: 4, atk: 90,  def: 0,   hp: 0,    special: 'crit_boost',   specVal: 8,  price: 600,  stageDropId: null },
    { id: 'dark_tome',     name: '📘 Dark Tome',      slot: 'weapon',    rarity: 4, atk: 110, def: 0,   hp: 0,    special: 'spell_boost',  specVal: 25, price: 700,  stageDropId: '2-3' },
    { id: 'thunder_bow',   name: '⚡ Thunder Bow',    slot: 'weapon',    rarity: 4, atk: 100, def: 0,   hp: 0,    special: 'pierce',       specVal: 15, price: 650,  stageDropId: '3-1' },
    { id: 'holy_lance',    name: '✨ Holy Lance',     slot: 'weapon',    rarity: 5, atk: 160, def: 25,  hp: 0,    special: 'holy_strike',  specVal: 40, price: 0,    stageDropId: '3-5' },

    // ── Armors (slot: armor) ──
    { id: 'leather_vest',  name: '🥋 Leather Vest',  slot: 'armor',     rarity: 3, atk: 0,   def: 55,  hp: 300,  special: null,           specVal: 0,  price: 180,  stageDropId: null },
    { id: 'mage_robe',     name: '🧥 Mage Robe',     slot: 'armor',     rarity: 4, atk: 0,   def: 65,  hp: 600,  special: 'spell_boost',  specVal: 15, price: 500,  stageDropId: '2-1' },
    { id: 'holy_armor',    name: '🛡️ Holy Armor',    slot: 'armor',     rarity: 4, atk: 10,  def: 110, hp: 400,  special: 'block',        specVal: 8,  price: 600,  stageDropId: null },
    { id: 'shadow_cloak',  name: '🌑 Shadow Cloak',  slot: 'armor',     rarity: 4, atk: 20,  def: 45,  hp: 250,  special: 'shadow_dodge', specVal: 10, price: 550,  stageDropId: '2-5' },
    { id: 'dragon_scale',  name: '🐉 Dragon Scale',  slot: 'armor',     rarity: 5, atk: 0,   def: 200, hp: 800,  special: 'block',        specVal: 20, price: 0,    stageDropId: '3-5' },

    // ── Accessories (slot: accessory) ──
    { id: 'crit_ring',     name: '💍 Crit Ring',     slot: 'accessory', rarity: 3, atk: 20,  def: 0,   hp: 0,    special: 'crit_boost',   specVal: 5,  price: 300,  stageDropId: '1-5' },
    { id: 'hp_pendant',    name: '📿 HP Pendant',    slot: 'accessory', rarity: 3, atk: 0,   def: 0,   hp: 700,  special: null,           specVal: 0,  price: 280,  stageDropId: null },
    { id: 'eris_coin',     name: '🪙 Eris Coin',     slot: 'accessory', rarity: 5, atk: 30,  def: 30,  hp: 300,  special: 'gold_boost',   specVal: 20, price: 0,    stageDropId: '2-5' },
    { id: 'mana_crystal',  name: '💠 Mana Crystal',  slot: 'accessory', rarity: 4, atk: 0,   def: 0,   hp: 0,    special: 'mana_reduce',  specVal: 2,  price: 450,  stageDropId: '1-5' },
    { id: 'explosion_gem', name: '💥 Explosion Gem', slot: 'accessory', rarity: 5, atk: 50,  def: 0,   hp: 0,    special: 'spell_boost',  specVal: 30, price: 0,    stageDropId: '3-3' },
];

/*
 SPECIAL EFFECTS (semua diproses di battle engine):
 ─────────────────────────────────────────────────
 crit_boost   → +specVal% crit rate untuk karakter ini
 spell_boost  → +specVal% damage skill untuk Wizard/Mage/Necromancer/Priest
 shadow_dodge → +specVal% dodge rate untuk karakter ini
 block        → kurangi dmg musuh sebesar specVal% (tambah ke dmgAbsorb)
 pierce       → abaikan specVal% DEF musuh
 holy_strike  → +specVal% bonus dmg ke enemy Undead/Demon
 gold_boost   → +specVal% gold post-battle
 mana_reduce  → kurangi mana cost stage sebesar specVal
*/

// ================================================================
// 🧑 SECTION 3: CHARACTER DATABASE — Semua property berfungsi
// ================================================================

/*
 PROPERTY BATTLE:
 ─────────────────────────────────────────────────────────────
 role        : 'Healer' | 'Tank' | 'DPS' | 'Support' | 'Buffer' | 'Rogue'
 healRate    : tiap turn, sembuhkan (healRate * totalMaxHP) HP
 dmgAbsorb   : kurangi incoming enemy dmg sebesar (dmgAbsorb * 100)%
 critRate    : chance crit per turn saat menyerang (0.0–1.0)
 critMult    : multiplier dmg saat crit (1.5 = +50%)
 dodgeRate   : chance dodge enemy attack (0.0–1.0)
 skillEvery  : trigger skill setiap N turn (0 = tidak ada)
 skillDmgMult: multiplier dari base char ATK untuk skill damage
 drainRate   : tiap turn drain (drainRate * enemyHP) → heal player
 revive      : true/false — jika HP drop ke 0, revive 1x
 reviveHPRate: revive dengan (reviveHPRate * totalMaxHP) HP
 counterRate : chance counter-attack setelah kena hit (0.0–1.0)
 goldBonus   : post-battle gold multiplier (0.10 = +10%)
 expBonus    : post-battle EXP multiplier
 dropBonus   : tambah drop rate item
*/

const ISEKAI_CHARACTERS = [
    // ──────────────────── ★★★★★ SSR ────────────────────
    {
        id: 'kazuma', name: 'Kazuma Satou', rarity: 5, class: 'Adventurer',
        atk: 220, def: 160, hp: 2800,
        role: 'Support',
        skill: 'Steal', skillDesc: 'Crit +18% setiap serangan, +12% gold tiap clear stage',
        passive: 'Lucky Bastard — Crit 18%, Gold+12%, Drop+5%',
        // Battle
        healRate: 0, dmgAbsorb: 0, critRate: 0.18, critMult: 1.6,
        dodgeRate: 0, skillEvery: 0, skillDmgMult: 0,
        drainRate: 0, revive: false, reviveHPRate: 0, counterRate: 0.10,
        goldBonus: 0.12, expBonus: 0, dropBonus: 0.05,
        quote: 'Yosh! Aku mau bagian yang bisa Steal!'
    },
    {
        id: 'aqua', name: 'Aqua si Dewi', rarity: 5, class: 'Priest',
        atk: 140, def: 130, hp: 3500,
        role: 'Healer',
        skill: 'Sacred Heal', skillDesc: 'Setiap turn, sembuhkan 18% max HP party',
        passive: 'Divine Aura — Heal 18% HP party per turn',
        // Battle
        healRate: 0.18, dmgAbsorb: 0, critRate: 0, critMult: 1,
        dodgeRate: 0, skillEvery: 0, skillDmgMult: 0,
        drainRate: 0, revive: false, reviveHPRate: 0, counterRate: 0,
        goldBonus: 0, expBonus: 0, dropBonus: 0,
        quote: 'AKU INI DEWI LHO! Tapi ya udah, aku heal deh.'
    },
    {
        id: 'darkness', name: 'Darkness Lalatina', rarity: 5, class: 'Crusader',
        atk: 90, def: 480, hp: 6500,
        role: 'Tank',
        skill: 'Decoy', skillDesc: 'Serap 38% dari semua dmg musuh ke diri sendiri',
        passive: 'Masochist Shield — Absorb 38% dmg incoming',
        // Battle
        healRate: 0, dmgAbsorb: 0.38, critRate: 0, critMult: 1,
        dodgeRate: 0, skillEvery: 0, skillDmgMult: 0,
        drainRate: 0, revive: false, reviveHPRate: 0, counterRate: 0,
        goldBonus: 0, expBonus: 0, dropBonus: 0,
        quote: 'H-Hajar aku lebih keras! Demi melindungi party tentunya!'
    },
    {
        id: 'megumin', name: 'Megumin Archmage', rarity: 5, class: 'Wizard',
        atk: 950, def: 40, hp: 900,
        role: 'DPS',
        skill: 'EXPLOSION!!!', skillDesc: 'Setiap 3 turn, ledakkan musuh: ATK x3.5 damage',
        passive: 'One Shot Glory — Skill x3.5 ATK tiap 3 turn',
        // Battle
        healRate: 0, dmgAbsorb: 0, critRate: 0.10, critMult: 1.5,
        dodgeRate: 0, skillEvery: 3, skillDmgMult: 3.5,
        drainRate: 0, revive: false, reviveHPRate: 0, counterRate: 0,
        goldBonus: 0, expBonus: 0, dropBonus: 0,
        quote: 'EXPLOOOSION!!! ...Tolong gendong aku pulang.'
    },
    {
        id: 'wiz', name: 'Wiz the Lich', rarity: 5, class: 'Necromancer',
        atk: 600, def: 80, hp: 2200,
        role: 'DPS',
        skill: 'Drain Touch', skillDesc: 'Tiap turn drain 8% HP musuh → heal party. Revive 1x di 50% HP',
        passive: 'Undead King — Drain 8%/turn + Revive 1x',
        // Battle
        healRate: 0, dmgAbsorb: 0, critRate: 0, critMult: 1,
        dodgeRate: 0, skillEvery: 0, skillDmgMult: 0,
        drainRate: 0.08, revive: true, reviveHPRate: 0.50, counterRate: 0,
        goldBonus: 0, expBonus: 0, dropBonus: 0,
        quote: 'Gomen ne... aku akan protect kalian.'
    },
    {
        id: 'eris', name: 'Eris the True Goddess', rarity: 5, class: 'Rogue',
        atk: 340, def: 220, hp: 2500,
        role: 'Rogue',
        skill: 'Blessing Dodge', skillDesc: 'Dodge 28% serangan musuh. +8% gold & +10% drop rate',
        passive: 'Holy Evasion — Dodge 28%, Gold+8%, Drop+10%',
        // Battle
        healRate: 0, dmgAbsorb: 0, critRate: 0.12, critMult: 1.4,
        dodgeRate: 0.28, skillEvery: 0, skillDmgMult: 0,
        drainRate: 0, revive: false, reviveHPRate: 0, counterRate: 0.08,
        goldBonus: 0.08, expBonus: 0, dropBonus: 0.10,
        quote: 'Kazuma-san sudah berdoa padaku? Bagus.'
    },

    // ──────────────────── ★★★★ SR ────────────────────
    {
        id: 'yunyun', name: 'Yunyun Crimson Demon', rarity: 4, class: 'Wizard',
        atk: 520, def: 90, hp: 1400,
        role: 'DPS',
        skill: 'Thunder Burst', skillDesc: 'Setiap 2 turn: ATK x1.8 bonus damage',
        passive: 'Rival Pride — Skill x1.8 tiap 2 turn, Wizard party +12% ATK',
        // Battle
        healRate: 0, dmgAbsorb: 0, critRate: 0.08, critMult: 1.4,
        dodgeRate: 0, skillEvery: 2, skillDmgMult: 1.8,
        drainRate: 0, revive: false, reviveHPRate: 0, counterRate: 0,
        goldBonus: 0, expBonus: 0, dropBonus: 0,
        quote: 'K-Kita sahabatan kan... harap perhatikan aku!'
    },
    {
        id: 'dust', name: 'Dust the Delinquent', rarity: 4, class: 'Warrior',
        atk: 280, def: 180, hp: 2800,
        role: 'Support',
        skill: 'Street Brawl', skillDesc: '+10% gold setiap stage, 12% counter-attack',
        passive: 'Scoundrel — Gold+10%, Counter 12%',
        // Battle
        healRate: 0, dmgAbsorb: 0, critRate: 0.08, critMult: 1.3,
        dodgeRate: 0, skillEvery: 5, skillDmgMult: 1.2,
        drainRate: 0, revive: false, reviveHPRate: 0, counterRate: 0.12,
        goldBonus: 0.10, expBonus: 0, dropBonus: 0,
        quote: 'Jangan salah paham. Aku cuma butuh duit.'
    },
    {
        id: 'chris', name: 'Chris the Thief', rarity: 4, class: 'Rogue',
        atk: 310, def: 130, hp: 2000,
        role: 'Rogue',
        skill: 'Shadow Step', skillDesc: 'Dodge 12%, +8% item drop rate',
        passive: 'Pickpocket — Dodge 12%, Drop+8%',
        // Battle
        healRate: 0, dmgAbsorb: 0, critRate: 0.12, critMult: 1.5,
        dodgeRate: 0.12, skillEvery: 4, skillDmgMult: 1.0,
        drainRate: 0, revive: false, reviveHPRate: 0, counterRate: 0,
        goldBonus: 0, expBonus: 0, dropBonus: 0.08,
        quote: 'Sssttt. Jangan bilang siapa-siapa soal ini ya.'
    },
    {
        id: 'vanir', name: 'Vanir Duke of Hell', rarity: 4, class: 'Demon Lord',
        atk: 380, def: 250, hp: 2600,
        role: 'Buffer',
        skill: 'Mask of Truth', skillDesc: '+22% EXP dari stage, skill tiap 5 turn: ATK x2',
        passive: 'Soul Harvest — EXP+22%, Skill x2 tiap 5 turn',
        // Battle
        healRate: 0, dmgAbsorb: 0, critRate: 0.05, critMult: 1.3,
        dodgeRate: 0, skillEvery: 5, skillDmgMult: 2.0,
        drainRate: 0, revive: false, reviveHPRate: 0, counterRate: 0,
        goldBonus: 0, expBonus: 0.22, dropBonus: 0,
        quote: 'Fufufu... kau menghiburku, bocah.'
    },
    {
        id: 'beldia', name: 'Beldia the Dullahan', rarity: 4, class: 'Knight',
        atk: 300, def: 300, hp: 3800,
        role: 'Tank',
        skill: 'Head Throw', skillDesc: 'Absorb 18% dmg + skill tiap 4 turn: ATK x1.8, kurangi DEF musuh 12%',
        passive: 'Undead Curse — Absorb 18%, DEF Musuh -12%',
        // Battle
        healRate: 0, dmgAbsorb: 0.18, critRate: 0, critMult: 1,
        dodgeRate: 0, skillEvery: 4, skillDmgMult: 1.8,
        drainRate: 0, revive: false, reviveHPRate: 0, counterRate: 0,
        goldBonus: 0, expBonus: 0, dropBonus: 0,
        quote: 'KAAAAZUMAAAA...!! Dan kamu juga, adventurer!'
    },

    // ──────────────────── ★★★ R ────────────────────
    {
        id: 'goblin_sh', name: 'Goblin Shaman', rarity: 3, class: 'Mage',
        atk: 100, def: 50, hp: 1000, role: 'DPS',
        skill: 'Hex', skillDesc: 'Skill tiap 5 turn: ATK x1.5',
        passive: 'Curse — Skill x1.5 tiap 5 turn',
        healRate: 0, dmgAbsorb: 0, critRate: 0.05, critMult: 1.3,
        dodgeRate: 0, skillEvery: 5, skillDmgMult: 1.5,
        drainRate: 0, revive: false, reviveHPRate: 0, counterRate: 0,
        goldBonus: 0, expBonus: 0, dropBonus: 0, quote: 'Giii giii!'
    },
    {
        id: 'rookie', name: 'Rookie Adventurer', rarity: 3, class: 'Warrior',
        atk: 90, def: 80, hp: 1200, role: 'Support',
        skill: 'Power Strike', skillDesc: 'Counter 15%',
        passive: 'Brave — Counter 15%',
        healRate: 0, dmgAbsorb: 0, critRate: 0.05, critMult: 1.2,
        dodgeRate: 0, skillEvery: 0, skillDmgMult: 0,
        drainRate: 0, revive: false, reviveHPRate: 0, counterRate: 0.15,
        goldBonus: 0, expBonus: 0.05, dropBonus: 0, quote: 'Suatu hari aku pasti jadi hero!'
    },
    {
        id: 'templar', name: 'Temple Guardian', rarity: 3, class: 'Paladin',
        atk: 75, def: 120, hp: 1500, role: 'Healer',
        skill: 'Holy Light', skillDesc: 'Heal 5% HP/turn + absorb 5% dmg',
        passive: 'Holy Shield — Heal 5%/turn, Absorb 5%',
        healRate: 0.05, dmgAbsorb: 0.05, critRate: 0, critMult: 1,
        dodgeRate: 0, skillEvery: 0, skillDmgMult: 0,
        drainRate: 0, revive: false, reviveHPRate: 0, counterRate: 0,
        goldBonus: 0, expBonus: 0, dropBonus: 0, quote: 'Eris-sama memanduku!'
    },
    {
        id: 'witch_app', name: 'Witch Apprentice', rarity: 3, class: 'Wizard',
        atk: 130, def: 40, hp: 900, role: 'DPS',
        skill: 'Fireball', skillDesc: 'Skill tiap 4 turn: ATK x2.0',
        passive: 'Fire Mastery — Skill x2.0 tiap 4 turn',
        healRate: 0, dmgAbsorb: 0, critRate: 0.06, critMult: 1.4,
        dodgeRate: 0, skillEvery: 4, skillDmgMult: 2.0,
        drainRate: 0, revive: false, reviveHPRate: 0, counterRate: 0,
        goldBonus: 0, expBonus: 0, dropBonus: 0, quote: 'Aku akan jadi seperti Megumin!'
    },

    // ──────────────────── ★★ N ────────────────────
    {
        id: 'giant_toad', name: 'Giant Toad Spirit', rarity: 2, class: 'Beast',
        atk: 55, def: 35, hp: 900, role: 'Support',
        skill: 'Lick', skillDesc: 'Tidak ada efek khusus',
        passive: 'Ribbit — Tidak ada',
        healRate: 0, dmgAbsorb: 0, critRate: 0.02, critMult: 1.1,
        dodgeRate: 0, skillEvery: 0, skillDmgMult: 0,
        drainRate: 0, revive: false, reviveHPRate: 0, counterRate: 0,
        goldBonus: 0, expBonus: 0, dropBonus: 0, quote: '...Ribbit.'
    },
    {
        id: 'baby_slime', name: 'Baby Slime', rarity: 2, class: 'Slime',
        atk: 35, def: 25, hp: 700, role: 'Support',
        skill: 'Bounce', skillDesc: 'Tidak ada efek khusus',
        passive: 'Slime — Tidak ada',
        healRate: 0, dmgAbsorb: 0, critRate: 0, critMult: 1,
        dodgeRate: 0.05, skillEvery: 0, skillDmgMult: 0,
        drainRate: 0, revive: false, reviveHPRate: 0, counterRate: 0,
        goldBonus: 0, expBonus: 0, dropBonus: 0, quote: '...'
    },
    {
        id: 'lost_soul', name: 'Lost Soul', rarity: 2, class: 'Undead',
        atk: 45, def: 20, hp: 800, role: 'DPS',
        skill: 'Wail', skillDesc: 'Drain 3% HP musuh per turn',
        passive: 'Soul Drain — Drain 3%/turn',
        healRate: 0, dmgAbsorb: 0, critRate: 0, critMult: 1,
        dodgeRate: 0, skillEvery: 0, skillDmgMult: 0,
        drainRate: 0.03, revive: false, reviveHPRate: 0, counterRate: 0,
        goldBonus: 0, expBonus: 0, dropBonus: 0, quote: '...huuuu...'
    },
];

// ================================================================
// 🗡️ SECTION 4: PLAYER WEAPON DATABASE
// ================================================================

const ISEKAI_WEAPONS = [
    // ★★★★★ SSR
    { id: 'excalibur',    name: '⚡ Excalibur',       rarity: 5, type: 'Sword',  atk: 420, def: 100, skill: 'Kirin Strike — x2 ATK, 30% chance per turn', shopPrice: 0 },
    { id: 'death_scythe', name: '💀 Death Scythe',    rarity: 5, type: 'Scythe', atk: 500, def: 50,  skill: 'Soul Reap — 6% instakill musuh per turn',     shopPrice: 0 },
    { id: 'holy_grail',   name: '✨ Holy Grail Staff', rarity: 5, type: 'Staff',  atk: 250, def: 200, skill: 'Divine Burst — +20% heal rate party',         shopPrice: 0 },
    { id: 'dragon_lance', name: '🐉 Dragon Lance',    rarity: 5, type: 'Spear',  atk: 460, def: 130, skill: 'Dragon Fang — abaikan 25% DEF musuh',         shopPrice: 0 },
    // ★★★★ SR
    { id: 'iron_sword',   name: '🗡️ Iron Sword',      rarity: 4, type: 'Sword',  atk: 180, def: 55,  skill: 'Slash — +22% base ATK',                       shopPrice: 800  },
    { id: 'mage_staff',   name: '🪄 Mage Staff',      rarity: 4, type: 'Staff',  atk: 210, def: 30,  skill: 'Mana Surge — boost spell_boost +10%',          shopPrice: 900  },
    { id: 'shadow_dagger',name: '🔪 Shadow Dagger',   rarity: 4, type: 'Dagger', atk: 240, def: 20,  skill: 'Critical Edge — +12% crit player',            shopPrice: 1000 },
    { id: 'tower_shield', name: '🛡️ Tower Shield',    rarity: 4, type: 'Shield', atk: 60,  def: 280, skill: 'Iron Wall — kurangi incoming dmg 8%',          shopPrice: 950  },
    { id: 'konosuba_wand',name: '🌸 KonoSuba Wand',   rarity: 4, type: 'Staff',  atk: 195, def: 65,  skill: 'Wild Magic — efek random tiap turn',           shopPrice: 1100 },
    { id: 'hunters_bow',  name: '🏹 Hunter\'s Bow',   rarity: 4, type: 'Bow',    atk: 220, def: 40,  skill: 'Snipe — x1.5 dmg tiap 3 turn',                shopPrice: 1050 },
    // ★★★ R
    { id: 'wooden_sword', name: '🪵 Wooden Sword',    rarity: 3, type: 'Sword',  atk: 70,  def: 25,  skill: '—',                                            shopPrice: 150  },
    { id: 'app_staff',    name: '🎋 Apprentice Staff', rarity: 3, type: 'Staff', atk: 85,  def: 15,  skill: '—',                                            shopPrice: 180  },
    { id: 'iron_shield',  name: '🛡️ Iron Shield',     rarity: 3, type: 'Shield', atk: 25,  def: 100, skill: '—',                                            shopPrice: 200  },
];

// BONUS dari player weapon di battle engine (baca dari skill string)
const PLAYER_WEAPON_BATTLE = {
    'excalibur':    { type: 'on_attack_chance', chance: 0.30, dmgMult: 2.0 },
    'death_scythe': { type: 'instakill',        chance: 0.06 },
    'holy_grail':   { type: 'heal_boost',       healBonus: 0.20 },
    'dragon_lance': { type: 'def_pierce',       pierceRate: 0.25 },
    'iron_sword':   { type: 'atk_boost',        atkBonus: 0.22 },
    'mage_staff':   { type: 'spell_boost',      spellBonus: 0.10 },
    'shadow_dagger':{ type: 'crit_boost',       critBonus: 0.12 },
    'tower_shield': { type: 'dmg_reduce',       reduceRate: 0.08 },
    'konosuba_wand':{ type: 'wild_magic',       chance: 0.40 },
    'hunters_bow':  { type: 'snipe',            every: 3, dmgMult: 1.5 },
};

// ================================================================
// 🎰 SECTION 5: BANNER DATA
// ================================================================

const ISEKAI_BANNERS = [
    { id: 'standard', name: '🌟 Isekai Standard', costSingle: 160, cost10: 1500,
      pityLimit: 90, pool: 'char', rateUpChars: [],
      rates: { 5: 2.5, 4: 15.0, 3: 35.0, 2: 47.5 }, active: true },
    { id: 'event', name: '💥 Event: Explosion Arc!', costSingle: 160, cost10: 1500,
      pityLimit: 80, pool: 'char', rateUpChars: ['megumin', 'yunyun'],
      rates: { 5: 3.0, 4: 18.0, 3: 35.0, 2: 44.0 }, active: true },
    { id: 'weapon', name: '🗡️ Weapon Banner', costSingle: 160, cost10: 1500,
      pityLimit: 50, pool: 'weapon', rateUpWeapons: ['excalibur', 'dragon_lance'],
      rates: { 5: 5.0, 4: 30.0, 3: 65.0, 2: 0 }, active: true },
];

// ================================================================
// 🗺️ SECTION 6: STAGE DATABASE
// ================================================================

const ISEKAI_CHAPTERS = [
    { chapter: 1, title: 'Chapter 1 — Terbangun di Dunia Lain', stages: [
        { id:'1-1', name:'Hutan Goblin',    mana:4,  enemy:'Wild Goblin',     eHP:300,   eATK:35,  eDEF:15,  enemyType:'Beast',  exp:40,  gold:60,  weaponDrop:null,            charEquipDrop:'crit_ring',   dropRate:30, ss:0  },
        { id:'1-2', name:'Rawa Berlumpur',  mana:4,  enemy:'Giant Toad',      eHP:500,   eATK:55,  eDEF:22,  enemyType:'Beast',  exp:55,  gold:80,  weaponDrop:null,            charEquipDrop:'leather_vest',dropRate:25, ss:0  },
        { id:'1-3', name:'Kamp Kobold',     mana:5,  enemy:'Kobold Warrior',  eHP:700,   eATK:75,  eDEF:38,  enemyType:'Beast',  exp:70,  gold:100, weaponDrop:'wooden_sword',  charEquipDrop:'hp_pendant',  dropRate:20, ss:0  },
        { id:'1-4', name:'Gua Kegelapan',   mana:5,  enemy:'Cave Bat Swarm',  eHP:900,   eATK:90,  eDEF:32,  enemyType:'Beast',  exp:85,  gold:120, weaponDrop:'app_staff',     charEquipDrop:null,          dropRate:0,  ss:0  },
        { id:'1-5', name:'★ BOSS: Lord Goblin', mana:10, enemy:'👑 Goblin Lord', eHP:2800, eATK:170, eDEF:90, enemyType:'Beast',  exp:260, gold:380, weaponDrop:'iron_sword',    charEquipDrop:'mana_crystal',dropRate:55, ss:15, isBoss:true },
    ]},
    { chapter: 2, title: 'Chapter 2 — Kota Axel & Guildnya', stages: [
        { id:'2-1', name:'Guild Adventurer',  mana:6,  enemy:'Rival Adventurer',eHP:1300,  eATK:150, eDEF:85,  enemyType:'Human',  exp:120, gold:165, weaponDrop:null,            charEquipDrop:'mage_robe',   dropRate:22, ss:0  },
        { id:'2-2', name:'Ladang Kubis',      mana:6,  enemy:'Cabbage Golem',   eHP:1700,  eATK:175, eDEF:105, enemyType:'Golem',  exp:148, gold:195, weaponDrop:'iron_shield',   charEquipDrop:null,          dropRate:0,  ss:0  },
        { id:'2-3', name:'Kuburan Undead',    mana:7,  enemy:'Wailing Spirit',  eHP:2100,  eATK:200, eDEF:95,  enemyType:'Undead', exp:175, gold:225, weaponDrop:null,            charEquipDrop:'dark_tome',   dropRate:18, ss:0  },
        { id:'2-4', name:'Reruntuhan Kuno',   mana:7,  enemy:'Stone Golem',     eHP:2700,  eATK:235, eDEF:168, enemyType:'Golem',  exp:205, gold:268, weaponDrop:'mage_staff',    charEquipDrop:null,          dropRate:0,  ss:0  },
        { id:'2-5', name:'★ BOSS: Beldia',    mana:15, enemy:'👑 Beldia Dullahan',eHP:9500, eATK:400, eDEF:235, enemyType:'Undead',exp:620, gold:780, weaponDrop:'shadow_dagger', charEquipDrop:'eris_coin',   dropRate:45, ss:30, isBoss:true },
    ]},
    { chapter: 3, title: 'Chapter 3 — Pasukan Raja Iblis', stages: [
        { id:'3-1', name:'Pos Hutan Gelap',   mana:8,  enemy:'Dark Elf Archer', eHP:3600,  eATK:295, eDEF:168, enemyType:'Demon',  exp:245, gold:328, weaponDrop:null,            charEquipDrop:'thunder_bow',  dropRate:15, ss:0  },
        { id:'3-2', name:'Lembah Beracun',    mana:8,  enemy:'Noxious Drake',   eHP:4600,  eATK:338, eDEF:198, enemyType:'Beast',  exp:285, gold:378, weaponDrop:'hunters_bow',   charEquipDrop:'shadow_cloak', dropRate:12, ss:0  },
        { id:'3-3', name:'Benteng Api',       mana:9,  enemy:'Flame General',   eHP:5600,  eATK:398, eDEF:238, enemyType:'Demon',  exp:338, gold:448, weaponDrop:null,            charEquipDrop:'explosion_gem',dropRate:10, ss:0  },
        { id:'3-4', name:'Singgasana Bayangan',mana:9, enemy:'Shadow Apostle',  eHP:7000,  eATK:458, eDEF:290, enemyType:'Demon',  exp:398, gold:528, weaponDrop:'konosuba_wand', charEquipDrop:null,           dropRate:0,  ss:0  },
        { id:'3-5', name:'★ BOSS: Vanir Duke',mana:20, enemy:'👑 Vanir the Duke',eHP:23000,eATK:720, eDEF:438, enemyType:'Demon',  exp:1550,gold:2050,weaponDrop:'dragon_lance',  charEquipDrop:'dragon_scale', dropRate:35, ss:60, isBoss:true },
    ]},
];

function getStageData(stageId) {
    const [ch, st] = stageId.split('-').map(Number);
    const chapter  = ISEKAI_CHAPTERS.find(c => c.chapter === ch);
    if (chapter) return chapter.stages.find(s => s.id === stageId) || null;
    // Endless
    const scale    = Math.pow(1.65, ch - ISEKAI_CHAPTERS.length - 1);
    const isBoss   = st === 5;
    return {
        id: stageId, isBoss,
        name: isBoss ? `★ BOSS: Endless Warden Tier ${ch}` : `Realm Abyssal ${ch}-${st}`,
        mana: Math.min(25, 10 + ch),
        enemy: isBoss ? `👑 Abyss Lord Tier ${ch}` : `Abyssal Creature ${ch}-${st}`,
        eHP:  Math.floor(9000  * scale * st), eATK: Math.floor(550 * scale),
        eDEF: Math.floor(330   * scale),      enemyType: 'Demon',
        exp:  Math.floor(900   * scale * st), gold: Math.floor(1100 * scale * st),
        weaponDrop: null, charEquipDrop: null, dropRate: 0,
        ss: isBoss ? Math.floor(55 + ch * 18) : 0,
    };
}

function nextStageId(id) {
    const [ch, st] = id.split('-').map(Number);
    const chData   = ISEKAI_CHAPTERS.find(c => c.chapter === ch);
    if (chData && st < chData.stages.length) return `${ch}-${st + 1}`;
    return `${ch + 1}-1`;
}

// ================================================================
// ⚔️ SECTION 7: BATTLE ENGINE — SEMUA SKILL & PASSIVE AKTIF
// ================================================================

function runBattle(isekai, stage, isArena = false) {
    const members = isekai.party.filter(Boolean).map(id => {
        const cd = ISEKAI_CHARACTERS.find(c => c.id === id);
        const oc = isekai.ownedChars.find(c => c.id === id);
        if (!cd || !oc) return null;
        return { ...cd, owned: oc };
    }).filter(Boolean);

    const { totalATK, totalDEF, totalHP } = calcPartyStats(isekai);

    let totalHealRate = 0, totalAbsorb = 0, totalCritRate = 0, bestCritMult = 1.5;
    let totalDodgeRate = 0, totalDrainRate = 0, totalCounterRate = 0;
    let reviveChar = null, hasRevived = false;
    let memberSkills = [];
    let goldBonus = 0, expBonus = 0, dropBonus = 0;
    let totalPierce = 0;
    let totalHolyBonus = 0;
    let globalSpellBoost = 0;

    // Player weapon bonus
    let playerWeaponFX = null;
    if (isekai.equippedWeapon) {
        playerWeaponFX = PLAYER_WEAPON_BATTLE[isekai.equippedWeapon] || null;
        if (playerWeaponFX?.type === 'heal_boost') totalHealRate += playerWeaponFX.healBonus;
        if (playerWeaponFX?.type === 'dmg_reduce') totalAbsorb += playerWeaponFX.reduceRate;
        if (playerWeaponFX?.type === 'crit_boost') totalCritRate += playerWeaponFX.critBonus;
        if (playerWeaponFX?.type === 'spell_boost') globalSpellBoost += playerWeaponFX.spellBonus;
    }

    let manaReduceBonus = 0;

    for (const m of members) {
        const lm = 1 + ((m.owned.level || 1) - 1) * 0.08;
        const am = 1 + (m.owned.awakening || 0) * 0.15;

        let eCrit = m.critRate, eDodge = m.dodgeRate, eAbsorb = m.dmgAbsorb;
        let spellBoost = 0;
        let pierce = 0, holyBonus = 0;

        const isSpellCaster = ['Wizard','Mage','Necromancer','Priest','Paladin'].includes(m.class);
        for (const slot of ['weapon','armor','accessory']) {
            const itemId = m.owned.equipment?.[slot];
            if (!itemId) continue;
            const eq = CHAR_EQUIPMENT.find(e => e.id === itemId);
            if (!eq) continue;
            const sv = eq.specVal || 0;
            if (eq.special === 'spell_boost' && isSpellCaster) spellBoost += sv;
            if (eq.special === 'crit_boost')   eCrit += sv / 100;
            if (eq.special === 'shadow_dodge') eDodge += sv / 100;
            if (eq.special === 'block')        eAbsorb += sv / 100;
            if (eq.special === 'gold_boost')   goldBonus += sv / 100;
            if (eq.special === 'mana_reduce')  manaReduceBonus += sv;
            if (eq.special === 'pierce')       pierce += sv;
            if (eq.special === 'holy_strike')  holyBonus += sv;
        }

        totalHealRate    += m.healRate;
        totalAbsorb      += eAbsorb;
        totalCritRate    += eCrit;
        if (m.critMult > bestCritMult) bestCritMult = m.critMult;
        totalDodgeRate   += eDodge;
        totalDrainRate   += m.drainRate;
        totalCounterRate += m.counterRate;
        goldBonus        += m.goldBonus;
        expBonus         += m.expBonus;
        dropBonus        += m.dropBonus;
        totalPierce      += pierce;
        totalHolyBonus   += holyBonus;

        if (m.revive) reviveChar = m;

        if (m.skillEvery > 0) {
            const baseAtk = Math.floor(m.atk * 0.40 * lm * am);
            let skillMult = m.skillDmgMult + (spellBoost / 100) + globalSpellBoost;
            memberSkills.push({
                memberId: m.id, name: m.name.split(' ')[0],
                every: m.skillEvery, mult: skillMult,
                baseDamage: baseAtk,
                cooldown: 0, skill: m.skill,
            });
        }
    }

    totalAbsorb    = Math.min(totalAbsorb, 0.80);
    totalCritRate  = Math.min(totalCritRate, 0.75);
    totalDodgeRate = Math.min(totalDodgeRate, 0.70);
    totalPierce    = Math.min(totalPierce, 80);

    let effectiveEnemyDEF = stage.eDEF;
    if (members.find(m => m.id === 'beldia')) {
        effectiveEnemyDEF = Math.floor(effectiveEnemyDEF * 0.88);
    }
    if (playerWeaponFX?.type === 'def_pierce') {
        effectiveEnemyDEF = Math.floor(effectiveEnemyDEF * (1 - playerWeaponFX.pierceRate));
    }
    if (totalPierce > 0) {
        effectiveEnemyDEF = Math.floor(effectiveEnemyDEF * (1 - totalPierce / 100));
    }

    let holyDamageMult = 1.0;
    if (totalHolyBonus > 0 && (stage.enemyType === 'Undead' || stage.enemyType === 'Demon')) {
        holyDamageMult = 1 + (totalHolyBonus / 100);
    }

    let playerHP = totalHP, enemyHP = stage.eHP;
    const log = [];
    let turn = 0, snipeTurn = 0;

    while (playerHP > 0 && enemyHP > 0 && turn < 30) {
        turn++;
        let line = `Turn ${turn}:`;

        // Skill anggota party
        for (const sk of memberSkills) {
            sk.cooldown++;
            if (sk.cooldown >= sk.every) {
                let skillDmg = Math.floor(sk.baseDamage * sk.mult * (0.9 + Math.random() * 0.2));
                skillDmg = Math.floor(skillDmg * holyDamageMult);
                enemyHP -= skillDmg;
                sk.cooldown = 0;
                line += ` 💥${sk.name}(${sk.skill})+${skillDmg}`;
            }
        }

        // Base attack player + party
        let atkDmg = Math.max(10, Math.floor(
            totalATK * (0.85 + Math.random() * 0.3) - effectiveEnemyDEF * 0.45
        ));
        if (Math.random() < totalCritRate) {
            atkDmg = Math.floor(atkDmg * bestCritMult);
            line += ` 💥Crit!`;
        }
        atkDmg = Math.floor(atkDmg * holyDamageMult);

        // Player weapon efek
        if (playerWeaponFX) {
            if (playerWeaponFX.type === 'on_attack_chance' && Math.random() < playerWeaponFX.chance) {
                const bonusDmg = Math.floor(totalATK * playerWeaponFX.dmgMult);
                atkDmg += bonusDmg;
                line += ` ⚡Weapon(+${bonusDmg})`;
            }
            if (playerWeaponFX.type === 'instakill' && Math.random() < playerWeaponFX.chance) {
                enemyHP = 0;
                line += ` 💀InstantKill!`;
            }
            if (playerWeaponFX.type === 'atk_boost') {
                atkDmg = Math.floor(atkDmg * (1 + playerWeaponFX.atkBonus));
            }
            if (playerWeaponFX.type === 'snipe') {
                snipeTurn++;
                if (snipeTurn >= playerWeaponFX.every) {
                    const snipeDmg = Math.floor(atkDmg * (playerWeaponFX.dmgMult - 1));
                    atkDmg += snipeDmg;
                    snipeTurn = 0;
                    line += ` 🏹Snipe(+${snipeDmg})`;
                }
            }
            if (playerWeaponFX.type === 'wild_magic' && Math.random() < playerWeaponFX.chance) {
                const fx = ['double', 'heal', 'miss'][Math.floor(Math.random() * 3)];
                if (fx === 'double') { atkDmg *= 2; line += ` 🌸WildX2!`; }
                else if (fx === 'heal') { playerHP = Math.min(totalHP, playerHP + Math.floor(totalHP * 0.10)); line += ` 🌸WildHeal!`; }
            }
        }

        enemyHP -= atkDmg;
        line += ` Party⚔️${atkDmg}`;
        if (enemyHP <= 0) { 
            log.push(line);
            break; 
        }

        // Wiz Drain
        if (totalDrainRate > 0 && stage.eHP > 0) {
            const drain = Math.floor(stage.eHP * totalDrainRate);
            playerHP = Math.min(totalHP, playerHP + drain);
            enemyHP -= Math.floor(drain * 0.5);
            line += ` 🩸Drain+${drain}`;
        }

        // Enemy attack
        let eDmg = Math.max(5, Math.floor(
            stage.eATK * (0.85 + Math.random() * 0.3) - totalDEF * 0.45
        ));
        if (totalAbsorb > 0) {
            const absorbed = Math.floor(eDmg * totalAbsorb);
            eDmg -= absorbed;
            line += ` 🛡️Absorb-${absorbed}`;
        }
        if (Math.random() < totalDodgeRate) {
            eDmg = 0;
            line += ` ✨Dodge!`;
        }
        playerHP -= eDmg;
        line += ` Enemy🗡️${eDmg}`;

        // Counter
        if (eDmg > 0 && Math.random() < totalCounterRate) {
            const counterDmg = Math.floor(totalATK * 0.30);
            enemyHP -= counterDmg;
            line += ` ↩️Counter+${counterDmg}`;
        }

        // Heal
        if (totalHealRate > 0 && playerHP > 0) {
            const healAmt = Math.floor(totalHP * totalHealRate);
            playerHP = Math.min(totalHP, playerHP + healAmt);
            line += ` ✨Heal+${healAmt}`;
        }

        // Revive
        if (reviveChar && playerHP <= 0 && !hasRevived) {
            playerHP = Math.floor(totalHP * reviveChar.reviveHPRate);
            hasRevived = true;
            line += ` 💀Revive!`;
        }

        log.push(line);
        if (enemyHP <= 0) break;
    }

    const win = playerHP > 0 || enemyHP <= 0;
    const hpRemainPct = Math.max(0, Math.floor((playerHP / totalHP) * 100));

    return { win, log, hpRemainPct, turns: turn,
             goldBonus, expBonus, dropBonus, manaReduceBonus, holyBonusMult: holyDamageMult };
}

// ================================================================
// 🎲 SECTION 8: GACHA ENGINE
// ================================================================

function doGachaPull(banner, isekai) {
    const pity        = isekai.pity[banner.id] || 0;
    const softStart   = banner.pityLimit - 15;
    const softBoost   = pity >= softStart ? Math.min((pity - softStart) * 4, 60) : 0;
    const roll        = Math.random() * 100;
    const r5Rate      = banner.rates[5] + softBoost;

    let rarity;
    if (pity + 1 >= banner.pityLimit)                        rarity = 5;
    else if (roll < r5Rate)                                  rarity = 5;
    else if (roll < r5Rate + banner.rates[4])                rarity = 4;
    else if (roll < r5Rate + banner.rates[4] + banner.rates[3]) rarity = 3;
    else                                                     rarity = 2;

    isekai.pity[banner.id] = rarity === 5 ? 0 : pity + 1;

    // ── Weapon Banner ──
    if (banner.pool === 'weapon') {
        const pool   = ISEKAI_WEAPONS.filter(w => w.rarity === rarity);
        const rRated = (rarity === 5 && banner.rateUpWeapons?.length && Math.random() < 0.5)
            ? pool.filter(w => banner.rateUpWeapons.includes(w.id)) : pool;
        const weapon = (rRated.length ? rRated : pool)[Math.floor(Math.random() * (rRated.length || pool.length))];
        const owned  = isekai.ownedWeapons.find(w => w.id === weapon.id);
        if (owned) { owned.enhance = Math.min((owned.enhance || 0) + 1, rarity === 5 ? 15 : 12); }
        else         isekai.ownedWeapons.push({ id: weapon.id, enhance: 0 });
        return { item: weapon, isDuplicate: !!owned, rarity, isWeapon: true };
    }

    // ── Char Banner ──
    const pool   = ISEKAI_CHARACTERS.filter(c => c.rarity === rarity);
    const rRated = (rarity === 5 && banner.rateUpChars?.length && Math.random() < 0.5)
        ? pool.filter(c => banner.rateUpChars.includes(c.id)) : pool;
    const char   = (rRated.length ? rRated : pool)[Math.floor(Math.random() * (rRated.length || pool.length))];
    const owned  = isekai.ownedChars.find(c => c.id === char.id);
    if (owned) {
        owned.copies = (owned.copies || 1) + 1;
        owned.awakening = Math.min((owned.awakening || 0) + 1, 5);
    } else {
        isekai.ownedChars.push({ id: char.id, level: 1, exp: 0, copies: 1, awakening: 0, equipment: { weapon: null, armor: null, accessory: null } });
    }
    return { item: char, isDuplicate: !!owned, rarity, isWeapon: false };
}

//━━━━━━━━━━━━━━━[ SWITCH CASE ]━━━━━━━━━━━━━━━\\

if (m.prefix.includes('.')) {
    switch (command) {

// ================================================================
// 🎮 SECTION 9: CASE COMMANDS
// Paste ke switch handler botmu. Semua command saling terhubung.
// ================================================================

// ─────────────────────────────────────────────────────────────
// 📖 .guide — Panduan lengkap semua efek & mekanik
// ─────────────────────────────────────────────────────────────
case 'guide': {
    let user = loadUserData(m.sender);
    let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply('❌ Belum terdaftar! Ketik *.daftar* dulu ya.');
    
    const sub = args[0]?.toLowerCase();
    
    // Menu utama guide
    if (!sub) {
        return m.reply(
            `📖 *GUIDE ISEKAI RPG* — Pilih topik:\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `1️⃣ \`.guide effects\` — Efek Equipment & Skill Karakter\n` +
            `2️⃣ \`.guide weapon\` — Efek Senjata Player (Battle FX)\n` +
            `3️⃣ \`.guide party\` — Bonus Party & Sinergi\n` +
            `4️⃣ \`.guide mechanic\` — Mana, CP, Leveling, dll.\n\n` +
            `💡 *Tips:* Semua efek ini AKTIF di battle (stage & arena)!\n` +
            `_"Pahami efekmu, maka kemenangan akan mengikutimu."_ — Eris`
        );
    }
    
    // ── SUBGUIDE 1: Efek Equipment & Karakter ──
    if (sub === 'effects') {
        return m.reply(
            `✨ *EFEK EQUIPMENT & KARAKTER*\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `🎽 *CHAR EQUIPMENT SPECIALS:*\n` +
            `• \`crit_boost\`   → +X% crit rate (karakter ini)\n` +
            `• \`spell_boost\`  → +X% damage skill (Wizard/Mage/Necro/Priest)\n` +
            `• \`shadow_dodge\` → +X% dodge rate\n` +
            `• \`block\`        → kurangi incoming damage sebesar X%\n` +
            `• \`pierce\`       → abaikan X% DEF musuh (global party)\n` +
            `• \`holy_strike\`  → +X% damage ke enemy Undead/Demon\n` +
            `• \`gold_boost\`   → +X% gold setelah battle\n` +
            `• \`mana_reduce\`  → kurangi mana cost stage sebesar X (min 1)\n\n` +
            `🧑 *BATTLE PROPERTIES KARAKTER:*\n` +
            `• \`healRate\`     → tiap turn sembuhkan (healRate × maxHP) HP\n` +
            `• \`dmgAbsorb\`    → kurangi incoming damage sebesar (X%)\n` +
            `• \`critRate\`     → chance crit per serangan\n` +
            `• \`critMult\`     → multiplier damage saat crit (1.5 = +50%)\n` +
            `• \`dodgeRate\`    → chance menghindari serangan musuh\n` +
            `• \`skillEvery\`   → trigger skill setiap N turn\n` +
            `• \`skillDmgMult\` → multiplier damage skill dari base ATK\n` +
            `• \`drainRate\`    → tiap turn drain X% HP musuh → heal party\n` +
            `• \`revive\`       → jika HP 0, revive 1x dengan reviveHPRate\n` +
            `• \`counterRate\`  → chance counter-attack setelah terkena hit\n` +
            `• \`goldBonus\`    → +X% gold setelah battle (stack)\n` +
            `• \`expBonus\`     → +X% EXP setelah battle\n` +
            `• \`dropBonus\`    → +X% chance drop item stage\n\n` +
            `📌 *Catatan:* Semua persentase dari equipment dan karakter dijumlahkan (stack) dan dibatasi maksimal (misal dodge max 70%). Efek seperti \`pierce\` dan \`holy_strike\` berlaku untuk seluruh party.`
        );
    }
    
    // ── SUBGUIDE 2: Efek Senjata Player ──
    if (sub === 'weapon') {
        return m.reply(
            `🗡️ *EFEK SENJATA PLAYER (BATTLE FX)*\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `Setiap senjata memiliki efek unik yang aktif saat dipasang:\n\n` +
            `✨ \`Excalibur\`       → 30% chance tiap serangan: damage 2x lipat\n` +
            `💀 \`Death Scythe\`   → 6% chance instakill musuh\n` +
            `✨ \`Holy Grail\`     → +20% heal rate party\n` +
            `🐉 \`Dragon Lance\`   → abaikan 25% DEF musuh\n` +
            `🗡️ \`Iron Sword\`     → +22% base ATK\n` +
            `🪄 \`Mage Staff\`     → +10% spell_boost (skill damage)\n` +
            `🔪 \`Shadow Dagger\`  → +12% crit rate\n` +
            `🛡️ \`Tower Shield\`   → kurangi incoming damage 8%\n` +
            `🌸 \`KonoSuba Wand\`  → 40% chance efek random (double damage / heal 10% / miss)\n` +
            `🏹 \`Hunter's Bow\`   → setiap 3 turn, snipe: damage 1.5x\n\n` +
            `📌 *Cara dapat:* Gacha weapon banner \`.pull weapon\`, drop dari stage tertentu, atau beli di \`.shop weapon\`. Enhance meningkatkan ATK/DEF senjata.`
        );
    }
    
    // ── SUBGUIDE 3: Bonus Party & Sinergi ──
    if (sub === 'party') {
        return m.reply(
            `👥 *BONUS PARTY & SINERGI*\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `🎉 *BONUS OTOMATIS:*\n` +
            `• **3+ karakter dengan CLASS SAMA** → +15% ATK seluruh party\n` +
            `• **PARTY PENUH** (slot terisi semua) → +8% ATK, DEF, HP\n\n` +
            `🌟 *PASSIVE KHUSUS KARAKTER:*\n` +
            `• \`Yunyun\` → Wizard di party mendapat +12% ATK\n` +
            `• \`Beldia\` → mengurangi DEF musuh sebesar 12% (aktif di battle)\n` +
            `• (Masih banyak passive lain, cek \`.charinfo <nama>\`)\n\n` +
            `💪 *COMBAT POWER (CP)*\n` +
            `Rumus CP = (totalATK × 4.5) + (totalDEF × 2.5) + (totalHP × 0.4) + (jumlah anggota party × 300)\n` +
            `CP digunakan untuk membandingkan kekuatan di arena.\n\n` +
            `📌 *Tips:* Atur komposisi party dengan role seimbang (Tank, Healer, DPS, Support) untuk memaksimalkan sinergi dan bonus.`
        );
    }
    
    // ── SUBGUIDE 4: Mekanik Dasar (Mana, CP, Leveling, dll) ──
    if (sub === 'mechanic') {
        return m.reply(
            `⚙️ *MEKANIK DASAR GAME*\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `💧 *MANA*\n` +
            `• Regenerasi: +1 setiap 6 menit\n` +
            `• Beli: \`.mana buy\` (30ss → 60 mana)\n` +
            `• Efek \`mana_reduce\` pada accessory karakter bisa mengurangi biaya stage\n\n` +
            `📈 *LEVEL PLAYER & KARAKTER*\n` +
            `• Player level naik dari EXP stage → +HP, ATK, DEF tiap level, +5ss setiap 5 level\n` +
            `• Karakter level naik dengan gold (\`.charlvup\`) atau EXP stage (25% dari EXP stage dibagi ke semua anggota party)\n` +
            `• Setiap level karakter meningkatkan kontribusi stat ke party sebesar 8% per level\n\n` +
            `💎 *SKYSTONE*\n` +
            `• Sumber: Boss stage (15-60ss), daily reward (scale rank), level up (5ss per 5 level), arena battle (tidak langsung tapi dari rank)\n` +
            `• Kegunaan: Gacha (160ss single, 1500ss 10x), upgrade party slot, beli mana\n\n` +
            `🎯 *ARENA RATING & DAILY REWARD*\n` +
            `• Rating naik/turun tergantung hasil battle\n` +
            `• Daily reward (gold, mana, skystone) makin besar di rank tinggi\n` +
            `• Rank: Iron → Bronze → Silver → Gold → Platinum → Diamond → Grandmaster\n\n` +
            `📌 *PENTING:* Selalu isi party dengan karakter yang sudah diberi equipment dan level yang cukup. Efek-efek di atas AKTIF SEMUA di battle engine!`
        );
    }
    
    // Jika subcommand tidak dikenal
    return m.reply(
        `❌ Subguide tidak dikenal.\n\n` +
        `Gunakan:\n` +
        `• \`.guide effects\`\n` +
        `• \`.guide weapon\`\n` +
        `• \`.guide party\`\n` +
        `• \`.guide mechanic\``
    );
    break;
}

// ─────────────────────────────────────────────────────────────
// 💎 .buyss <jumlah> — Beli Skystone dengan Gold
// ─────────────────────────────────────────────────────────────
case 'buyss':
case 'buyskystone': {
    let user = loadUserData(m.sender);
    let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);

    let amount = parseInt(args[0]);
    if (!amount || amount <= 0) return m.reply(
        '❌ Masukkan jumlah Skystone yang ingin dibeli!\n\n' +
        'Contoh: `.buyss 10` (10 Skystone)\n' +
        '💰 1 Skystone = *1000 Gold*\n' +
        `💎 Skystone saat ini: *${isekai.skystone}*\n` +
        `💰 Gold saat ini: *${isekai.gold}*`
    );

    const costPerStone = 1000;
    const totalCost = amount * costPerStone;

    if (isekai.gold < totalCost) {
        return m.reply(
            `❌ Gold tidak cukup!\n\n` +
            `💎 ${amount} Skystone = *${totalCost.toLocaleString()} Gold*\n` +
            `💰 Gold kamu: *${isekai.gold.toLocaleString()}*\n` +
            `💔 Kurang: *${(totalCost - isekai.gold).toLocaleString()} Gold*\n\n` +
            `_Farming gold di \`.stage\` atau \`.isekaiarena battle\`!_`
        );
    }

    isekai.gold -= totalCost;
    isekai.skystone += amount;

    saveUserData(m.sender, user);

    m.reply(
        `💎 *PEMBELIAN SKYSTONE BERHASIL!*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `➕ +${amount} Skystone\n` +
        `💰 -${totalCost.toLocaleString()} Gold\n\n` +
        `📊 *Saldo baru:*\n` +
        `💎 Skystone: *${isekai.skystone}*\n` +
        `💰 Gold: *${isekai.gold.toLocaleString()}*\n\n` +
        `🎰 Bisa untuk *${Math.floor(isekai.skystone/160)}x single pull* atau *${Math.floor(isekai.skystone/1500)}x 10-pull*!\n\n` +
        `_"Eris bilang: 'Jangan lupa sisakan gold untuk upgrade karakter ya!'"_ ✨`
    );
    break;
}

// ─────────────────────────────────────────────────────────────
// 📜 .isekairegister — Registrasi
// ─────────────────────────────────────────────────────────────
case 'isekairegister': {
    let user   = loadUserData(m.sender);
    if (!user.harvest) user.harvest = { level: 1, exp: 0 };
    let isekai = getIsekaiData(user);

    if (isekai.registered) return m.reply(
        `✅ *Kamu sudah terdaftar, ${isekai.name}!*\n⚔️ ${isekai.class} | Lv.${user.harvest.level}\n\nKetik *.isekaimenu* untuk semua command.`
    );

    const CLASSES = {
        warrior:  { label:'⚔️ Warrior',   hp:1800, atk:65, def:50, desc:'Frontliner kokoh. Counter 10% + balanced.' },
        wizard:   { label:'🪄 Wizard',    hp:900,  atk:95, def:20, desc:'Burst DMG tinggi, rapuh. Skill kuat.' },
        rogue:    { label:'🗡️ Rogue',     hp:1200, atk:78, def:38, desc:'Crit+Dodge tinggi. Agile killer.' },
        priest:   { label:'✨ Priest',    hp:1400, atk:50, def:45, desc:'Healer party. Heal 8% HP/turn diri sendiri.' },
        crusader: { label:'🛡️ Crusader',  hp:2200, atk:45, def:70, desc:'Ultra-tank ala Darkness. Absorb 15% dmg.' },
    };

    const classArg = args[0]?.toLowerCase();
    if (!classArg || !CLASSES[classArg]) {
        return m.reply(
            `🌟 *SELAMAT DATANG DI DUNIA ISEKAI!* 🌟\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `Dewi Eris memanggilmu! *(Aqua nangis karena nggak dipilih.)*\n\n` +
            `🎯 *Pilih Classmu:*\n` +
            Object.entries(CLASSES).map(([k,v]) => `• \`.isekairegister ${k}\`\n  ${v.label} — ${v.desc}`).join('\n') +
            `\n\n_"Pilih dengan bijak. Class tidak bisa diganti."_ — Kazuma ⚔️`
        );
    }

    const chosen = CLASSES[classArg];
    isekai.registered = true;
    isekai.name = m.pushName || m.sender.split('@')[0];
    isekai.class = chosen.label;
    isekai.hpMax = chosen.hp; isekai.atk = chosen.atk;
    isekai.def = chosen.def; isekai.spd = 20;
    isekai.gold = 500; isekai.skystone = 1500; isekai.mana = 60;

    // Starter weapon
    isekai.ownedWeapons.push({ id: 'wooden_sword', enhance: 0 });
    isekai.equippedWeapon = 'wooden_sword';
    // Starter char equip
    isekai.charEquipInventory['leather_vest'] = 1;
    isekai.charEquipInventory['hp_pendant']   = 1;

    saveUserData(m.sender, user);
    m.reply(
        `🎉 *REGISTRASI BERHASIL!*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `👤 *${isekai.name}* — ${chosen.label}\n` +
        `❤️${chosen.hp} ⚔️${chosen.atk} 🛡️${chosen.def}\n` +
        `🗡️ Senjata starter: *Wooden Sword*\n` +
        `🎽 Char equip starter: Leather Vest, HP Pendant\n` +
        `💎 1500 Skystone | 💰 500 Gold | 💧 60 Mana\n\n` +
        `📌 *Mulai:*\n• \`.stage\` — Mulai petualangan\n• \`.pull standard\` — Gacha karakter\n• \`.party info\` — Kelola party\n• \`.isekaimenu\` — Semua command\n\n` +
        `_"Yosh! Party slot kamu 5. Isi semua untuk bonus full party!"_ ⚔️`
    );
    break;
}

// ─────────────────────────────────────────────────────────────
// 👤 .isekaiprofil
// ─────────────────────────────────────────────────────────────
case 'isekaiprofil':
case 'isekaiprofile': {
    let target = m.mentionedJid?.[0] || m.sender;
    let user   = loadUserData(target);
    let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);

    regenMana(isekai);
    saveUserData(target, user);

    const lvl = user.harvest.level || 1;
    const expNow = user.harvest.exp || 0, expReq = expNeeded(lvl + 1);
    const bar = '▓'.repeat(Math.floor(expNow/expReq*10))+'░'.repeat(10-Math.floor(expNow/expReq*10));
    const { totalATK, totalDEF, totalHP } = calcPartyStats(isekai);
    const wp = isekai.equippedWeapon ? ISEKAI_WEAPONS.find(w => w.id === isekai.equippedWeapon) : null;
    
    // Format party dengan nomor urut
    let partyList = [];
    const partyMembers = isekai.party.filter(Boolean);
    if (partyMembers.length === 0) {
        partyList.push('  — Kosong —');
    } else {
        partyMembers.forEach((id, idx) => {
            const char = ISEKAI_CHARACTERS.find(c => c.id === id);
            const name = char ? char.name.split(' ')[0] : '?';
            partyList.push(`  ${idx+1}. ${name}`);
        });
    }
    const partyStr = partyList.join('\n');

    // Format roles dengan nomor urut sesuai anggota party
    let roleList = [];
    const roles = partyMembers.map(id => {
        const char = ISEKAI_CHARACTERS.find(c => c.id === id);
        return char?.role || null;
    }).filter(Boolean);
    
    if (roles.length === 0) {
        roleList.push('  —');
    } else {
        roles.forEach((role, idx) => {
            roleList.push(`  ${idx+1}. ${role}`);
        });
    }
    const roleStr = roleList.join('\n');

    m.reply(
        `╔══[ ⚔️ *PROFIL HERO* ]══╗\n` +
        `\n` +
        ` 👤 *${isekai.name}*  ${isekai.class}\n` +
        ` 🌟 Level *${lvl}*  CP: *${calcCP(isekai).toLocaleString()}*\n` +
        `\n` +
        ` *Stats Total Party:*\n` +
        ` ❤️HP *${totalHP}*\n` +
        ` ⚔️ATK *${totalATK}*\n` +
        ` 🛡️DEF *${totalDEF}*\n` +
        `\n` +
        ` 📈 EXP: ${bar}\n` +
        ` (${expNow}/${expReq})\n` +
        `\n` +
        ` 💰${isekai.gold} 💎${isekai.skystone} 💧${isekai.mana}/${isekai.manaMax}\n` +
        `\n` +
        ` 🗡️ ${wp?.name||'Tidak ada'}\n` +
        ` 👥 Party [${isekai.party.filter(Boolean).length}/${isekai.partySlots}]:\n${partyStr}\n` +
        ` 🎭 Roles:\n${roleStr}\n` +
        ` 🗺️ Stage: *${isekai.currentStage}*\n` +
        `\n` +
        ` ${arenaTitle(isekai.arenaRank)} (${isekai.arenaRank})\n` +
        ` W/L: *${isekai.arenaWins}W/${isekai.arenaLosses}L*\n` +
        `\n` +
        `╚════════════════════╝\n` +
        `_"Party kuat = stage mudah = gold banyak = gacha terus!"_ 😆`
    );
    break;
}

// ─────────────────────────────────────────────────────────────
// 👥 .party — Kelola party
// ─────────────────────────────────────────────────────────────
case 'party': {
    let user   = loadUserData(m.sender);
    let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);
    const sub  = args[0]?.toLowerCase();

    if (!sub || sub === 'info') {
        const { totalATK, totalDEF, totalHP } = calcPartyStats(isekai);
        let text = `👥 *PARTY* [${isekai.party.filter(Boolean).length}/${isekai.partySlots} slot]\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        for (let i = 0; i < isekai.partySlots; i++) {
            const id = isekai.party[i];
            const cd = id ? ISEKAI_CHARACTERS.find(c=>c.id===id) : null;
            const oc = id ? isekai.ownedChars.find(c=>c.id===id) : null;
            if (cd && oc) {
                const awk = oc.awakening > 0 ? ` ✦${oc.awakening}` : '';
                const eq  = Object.values(oc.equipment||{}).filter(Boolean).length;
                text += `[${i+1}] ${rarityStars(cd.rarity)} *${cd.name}${awk}* Lv.${oc.level}\n`;
                text += `    🎭${cd.role} ⚔️${cd.atk} 🛡️${cd.def} ❤️${cd.hp}\n`;
                text += `    💥${cd.skill} | 🎽${eq}/3 equip\n`;
                if (cd.healRate > 0)    text += `    ✨Heal ${Math.floor(cd.healRate*100)}%/turn\n`;
                if (cd.dmgAbsorb > 0)   text += `    🛡️Absorb ${Math.floor(cd.dmgAbsorb*100)}%\n`;
                if (cd.critRate > 0)    text += `    💥Crit ${Math.floor(cd.critRate*100)}%\n`;
                if (cd.dodgeRate > 0)   text += `    ✨Dodge ${Math.floor(cd.dodgeRate*100)}%\n`;
                if (cd.goldBonus > 0)   text += `    💰Gold+${Math.floor(cd.goldBonus*100)}%\n`;
                if (cd.expBonus > 0)    text += `    📈EXP+${Math.floor(cd.expBonus*100)}%\n`;
                if (cd.revive)          text += `    💀Revive 1x\n`;
            } else {
                text += `[${i+1}] ─── Slot Kosong ───\n`;
            }
        }
        text += `\n📊 *Total Party Stats:*\n`;
        text += `❤️${totalHP} ⚔️${totalATK} 🛡️${totalDEF}\n`;
        text += `💪 CP: *${calcCP(isekai).toLocaleString()}*\n\n`;
        if (isekai.party.filter(Boolean).length >= isekai.partySlots) text += `🎉 *Bonus Party Penuh: +8% semua stats!*\n`;
        text += `\n📌 \`.party set <slot> <nama>\` | \`.party remove <slot>\` | \`.party slotup\``;
        m.reply(text); break;
    }

    if (sub === 'set') {
        const slot = parseInt(args[1]);
        const query = args.slice(2).join(' ').toLowerCase();
        if (!slot || slot < 1 || slot > isekai.partySlots) return m.reply(`❌ Slot 1-${isekai.partySlots}!\nContoh: \`.party set 1 megumin\``);
        if (!query) return m.reply('❌ Tulis nama karakter!\nContoh: `.party set 1 megumin`');

        const found = isekai.ownedChars.find(oc => {
            const cd = ISEKAI_CHARACTERS.find(c=>c.id===oc.id);
            return cd && (cd.name.toLowerCase().includes(query) || cd.id.includes(query));
        });
        if (!found) return m.reply(`❌ "${query}" tidak ditemukan di koleksimu!\nGunakan \`.mychar\``);

        while (isekai.party.length < isekai.partySlots) isekai.party.push(null);
        const oldIdx = isekai.party.indexOf(found.id);
        if (oldIdx !== -1) isekai.party[oldIdx] = null;
        isekai.party[slot - 1] = found.id;
        while (isekai.party.length > 0 && isekai.party[isekai.party.length-1] === null) isekai.party.pop();

        saveUserData(m.sender, user);
        const cd = ISEKAI_CHARACTERS.find(c=>c.id===found.id);
        m.reply(`✅ *${cd.name}* (${cd.role}) dipasang ke slot ${slot}!\n💪 CP Baru: *${calcCP(isekai).toLocaleString()}*\n\n_Lihat semua efek party di \`.party info\`_`);
        break;
    }

    if (sub === 'remove') {
        const slot = parseInt(args[1]);
        if (!slot || slot < 1 || slot > isekai.party.length) return m.reply('❌ Slot tidak valid!');
        const rmId = isekai.party[slot-1];
        isekai.party[slot-1] = null;
        while (isekai.party.length > 0 && isekai.party[isekai.party.length-1] === null) isekai.party.pop();
        saveUserData(m.sender, user);
        const cd = rmId ? ISEKAI_CHARACTERS.find(c=>c.id===rmId) : null;
        m.reply(`✅ ${cd?.name||'Karakter'} dikeluarkan dari slot ${slot}.`);
        break;
    }

    if (sub === 'slotup') {
        if (isekai.partySlots >= 10) return m.reply('✅ Party slot sudah max (10)!');
        const cost = partySlotCost(isekai.partySlots);
        if (isekai.skystone < cost) {
            return m.reply(
                `💎 *Upgrade Party Slot*\n\n` +
                `${isekai.partySlots} → ${isekai.partySlots+1} slot\n` +
                `Biaya: *${cost} Skystone*\n💎 Kamu: *${isekai.skystone}*\n\n` +
                `_Skystone didapat dari boss stage & daily!_` +
                `\n_Atau beli di \`.buyss <jumlah>\`_`
            );
        }
        isekai.skystone -= cost;
        isekai.partySlots++;
        saveUserData(m.sender, user);
        m.reply(`🎉 Party Slot: *${isekai.partySlots-1}* → *${isekai.partySlots}*!\n💎 Sisa: *${isekai.skystone}*\n_"Lebih banyak teman = lebih kuat! Kecuali Aqua."_`);
        break;
    }
    m.reply('❓ Gunakan: `party info | set | remove | slotup`');
    break;
}

// ─────────────────────────────────────────────────────────────
// 🎴 .mychar — Koleksi karakter
// ─────────────────────────────────────────────────────────────
case 'mychar':
case 'characters': {
    let user   = loadUserData(m.sender);
    let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);
    if (!isekai.ownedChars.length) return m.reply(
        `🎴 Belum punya karakter!\n\n*.pull standard* (160ss) atau *.pull10 standard* (1500ss)\n💎 Skystone: *${isekai.skystone}*`
    );

    const inParty = new Set(isekai.party.filter(Boolean));
    let text = `🎴 *KOLEKSI KARAKTER* (${isekai.ownedChars.length})\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    for (const r of [5,4,3,2]) {
        const chars = isekai.ownedChars.map(oc=>({oc, cd:ISEKAI_CHARACTERS.find(c=>c.id===oc.id)})).filter(x=>x.cd?.rarity===r);
        if (!chars.length) continue;
        text += `${'★'.repeat(r)}${'☆'.repeat(5-r)}\n`;
        for (const {oc, cd} of chars) {
            const awk = oc.awakening > 0 ? ` ✦${oc.awakening}` : '';
            const p   = inParty.has(cd.id) ? ' 👥' : '';
            const eq  = Object.values(oc.equipment||{}).filter(Boolean).length;
            text += `• *${cd.name}${awk}* Lv.${oc.level} [${cd.role}]${p} 🎽${eq}/3\n`;
        }
        text += '\n';
    }
    text += `_\`.charinfo <nama>\` detail | \`.party set\` masuk party | \`.charequip\` pasang equip_`;
    m.reply(text); break;
}

// ─────────────────────────────────────────────────────────────
// 🧑 .charinfo <nama> — Detail karakter + efek battle
// ─────────────────────────────────────────────────────────────
case 'charinfo': {
    let user   = loadUserData(m.sender);
    let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);
    const query = args.join(' ').toLowerCase();
    if (!query) return m.reply('❌ Tulis nama!\nContoh: `.charinfo megumin`');

    const oc = isekai.ownedChars.find(x => {
        const cd = ISEKAI_CHARACTERS.find(c=>c.id===x.id);
        return cd && (cd.name.toLowerCase().includes(query) || cd.id.includes(query));
    });
    if (!oc) return m.reply(`❌ "${query}" tidak ada di koleksimu!\nCek \`.mychar\``);

    const cd = ISEKAI_CHARACTERS.find(c=>c.id===oc.id);
    const lm = 1 + ((oc.level||1) - 1) * 0.08;
    const am = 1 + (oc.awakening||0) * 0.15;
    const effATK = Math.floor(cd.atk * 0.40 * lm * am);
    const effDEF = Math.floor(cd.def * 0.30 * lm * am);
    const effHP  = Math.floor(cd.hp  * 0.20 * lm * am);

    const expBar = '▓'.repeat(Math.floor((oc.exp||0)/charExpNeeded(oc.level)*10))+'░'.repeat(10-Math.floor((oc.exp||0)/charExpNeeded(oc.level)*10));
    const eqSlots = ['weapon','armor','accessory'].map(slot => {
        const itemId = oc.equipment?.[slot];
        const eq = itemId ? CHAR_EQUIPMENT.find(e=>e.id===itemId) : null;
        return `  ${slot}: ${eq ? `*${eq.name}*${eq.special ? ` [${eq.special}+${eq.specVal}]` : ''}` : '─ Kosong ─'}`;
    }).join('\n');

    m.reply(
        `🧑 *${cd.name}* ${rarityStars(cd.rarity)}\n━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `🎭 Role: *${cd.role}* | Class: ${cd.class} | Lv.*${oc.level}* ✦${oc.awakening}\n\n` +
        `📊 *Base Stats:* ⚔️${cd.atk} 🛡️${cd.def} ❤️${cd.hp}\n` +
        `📊 *Kontribusi Party (Lv.${oc.level} Awk.${oc.awakening}):*\n` +
        `  ⚔️+${effATK} ATK | 🛡️+${effDEF} DEF | ❤️+${effHP} HP\n\n` +
        `💥 *Skill: ${cd.skill}*\n  ${cd.skillDesc}\n` +
        `🌟 *Passive: ${cd.passive}*\n\n` +
        `🎽 *Equipment:*\n${eqSlots}\n\n` +
        `📈 EXP: ${expBar} ${oc.exp||0}/${charExpNeeded(oc.level)} | Copies: ${oc.copies}\n` +
        `💰 Lvlup cost: *${charLvupCost(oc.level)} Gold*\n\n` +
        `_"${cd.quote}"_\n\n` +
        `_\`.charlvup ${cd.id}\` lvlup | \`.charequip ${cd.id} <item>\` pasang equip_`
    );
    break;
}

// ─────────────────────────────────────────────────────────────
// ⬆️ .charlvup <nama> [x] — Level up karakter (pakai Gold)
// ─────────────────────────────────────────────────────────────
case 'charlvup': {
    let user   = loadUserData(m.sender);
    let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);

    const query = args[0]?.toLowerCase();
    const times = Math.min(parseInt(args[1]) || 1, 20); // max 20 level sekaligus
    if (!query) return m.reply('❌ Tulis nama karakter!\nContoh: `.charlvup megumin` atau `.charlvup megumin 5`');

    const oc = isekai.ownedChars.find(x => {
        const cd = ISEKAI_CHARACTERS.find(c=>c.id===x.id);
        return cd && (cd.name.toLowerCase().includes(query) || cd.id.includes(query));
    });
    if (!oc) return m.reply(`❌ "${query}" tidak dimiliki!\nCek \`.mychar\``);

    const cd = ISEKAI_CHARACTERS.find(c=>c.id===oc.id);

    // Hitung total biaya
    let totalCost = 0;
    for (let i = 0; i < times; i++) totalCost += charLvupCost((oc.level||1) + i);

    if (isekai.gold < totalCost) {
        const singleCost = charLvupCost(oc.level||1);
        return m.reply(
            `❌ Gold tidak cukup!\n\n` +
            `⬆️ *${cd.name}* Lv.${oc.level} → Lv.${oc.level+times} (x${times})\n` +
            `💰 Butuh: *${totalCost} Gold* | Kamu: *${isekai.gold}*\n\n` +
            `_Level up 1x: ${singleCost} Gold | Farming gold di \`.stage\` atau \`.isekaiarena battle\`!_`
        );
    }

    const oldLevel = oc.level;
    isekai.gold -= totalCost;
    oc.level = (oc.level||1) + times;
    oc.exp = 0; // reset exp saat manual level up

    saveUserData(m.sender, user);

    const lmNew = 1 + (oc.level - 1) * 0.08;
    const amNew = 1 + (oc.awakening||0) * 0.15;
    const newContribATK = Math.floor(cd.atk * 0.40 * lmNew * amNew);
    const newContribDEF = Math.floor(cd.def * 0.30 * lmNew * amNew);
    const newContribHP  = Math.floor(cd.hp  * 0.20 * lmNew * amNew);

    m.reply(
        `⬆️ *Level Up Berhasil!*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `🧑 *${cd.name}* Lv.*${oldLevel}* → Lv.*${oc.level}*\n` +
        `💰 Gold habis: ${totalCost} | Sisa: *${isekai.gold}*\n\n` +
        `📊 *Kontribusi Party Baru:*\n` +
        `⚔️+${newContribATK} ATK | 🛡️+${newContribDEF} DEF | ❤️+${newContribHP} HP\n` +
        `💪 CP Baru: *${calcCP(isekai).toLocaleString()}*\n\n` +
        `_Makin tinggi level = kontribusi party makin besar!_`
    );
    break;
}

// ─────────────────────────────────────────────────────────────
// 🎽 .charequip <nama_char> <item_id> — Pasang equip ke karakter
// ─────────────────────────────────────────────────────────────
case 'charequip': {
    let user   = loadUserData(m.sender);
    let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);

    const charQuery = args[0]?.toLowerCase();
    const itemId    = args[1]?.toLowerCase();

    // Jika tidak ada argumen → tampilkan inventori char equip
    if (!charQuery) {
        const inv = isekai.charEquipInventory || {};
        const items = Object.entries(inv).filter(([,qty]) => qty > 0);
        if (!items.length) return m.reply(
            `🎽 *Char Equipment Inventory*\n\nKosong!\n\nDapat dari:\n• Drop stage\n• \`.isekaishop equip\` (beli dengan gold)`
        );
        let text = `🎽 *CHAR EQUIPMENT INVENTORY*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        for (const [id, qty] of items) {
            const eq = CHAR_EQUIPMENT.find(e=>e.id===id);
            if (!eq) continue;
            text += `*[${id}]* ${eq.name} ${rarityStars(eq.rarity)} x${qty}\n`;
            text += `  Slot: ${eq.slot} | ⚔️+${eq.atk} 🛡️+${eq.def} ❤️+${eq.hp}\n`;
            if (eq.special) text += `  ✨ ${eq.special}+${eq.specVal}%\n`;
            text += '\n';
        }
        text += `_\`.charequip <nama_char> <item_id>\` untuk pasang_`;
        return m.reply(text);
    }

    if (!itemId) return m.reply(
        `❌ Tulis juga item ID!\nContoh: \`.charequip megumin dark_tome\`\n\n` +
        `Lihat item: \`.charequip\` atau \`.isekaishop equip\``
    );

    const oc = isekai.ownedChars.find(x => {
        const cd = ISEKAI_CHARACTERS.find(c=>c.id===x.id);
        return cd && (cd.name.toLowerCase().includes(charQuery) || cd.id.includes(charQuery));
    });
    if (!oc) return m.reply(`❌ Karakter "${charQuery}" tidak dimiliki!`);

    const eq = CHAR_EQUIPMENT.find(e=>e.id===itemId);
    if (!eq) return m.reply(`❌ Item *${itemId}* tidak ada!\nLihat \`.charequip\` atau \`.isekaishop equip\``);

    const qty = isekai.charEquipInventory[itemId] || 0;
    if (qty <= 0) return m.reply(`❌ *${eq.name}* tidak ada di inventorimu!\n\nBeli di \`.isekaishop equip\` atau dapat dari stage drop.`);

    // Cek slot & unequip item lama jika ada
    const slot    = eq.slot;
    const oldItem = oc.equipment?.[slot];
    if (oldItem && oldItem === itemId) return m.reply(`❌ *${eq.name}* sudah dipasang di slot ${slot}!`);

    if (oldItem) {
        // Kembalikan item lama ke inventori
        isekai.charEquipInventory[oldItem] = (isekai.charEquipInventory[oldItem] || 0) + 1;
    }

    if (!oc.equipment) oc.equipment = { weapon: null, armor: null, accessory: null };
    oc.equipment[slot] = itemId;
    isekai.charEquipInventory[itemId] = qty - 1;

    saveUserData(m.sender, user);
    const cd = ISEKAI_CHARACTERS.find(c=>c.id===oc.id);

    let text = `✅ *${eq.name}* dipasang ke *${cd.name}*!\n\n`;
    text += `🎽 Slot: ${slot} | ${rarityStars(eq.rarity)}\n`;
    text += `⚔️+${eq.atk} 🛡️+${eq.def} ❤️+${eq.hp}\n`;
    if (eq.special) {
        text += `✨ *${eq.special}+${eq.specVal}%* — Aktif di battle!\n`;
        const isSpellCaster = ['Wizard','Mage','Necromancer','Priest','Paladin'].includes(cd.class);
        if (eq.special === 'spell_boost' && !isSpellCaster) text += `⚠️ spell_boost hanya efektif untuk class Wizard/Mage/Necromancer/Priest!\n`;
    }
    text += `💪 CP Baru: *${calcCP(isekai).toLocaleString()}*`;
    m.reply(text);
    break;
}

// ─────────────────────────────────────────────────────────────
// 🏪 .isekaishop — Toko senjata & char equip
// ─────────────────────────────────────────────────────────────
case 'isekaishop': {
    let user   = loadUserData(m.sender);
    let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);
    const sub  = args[0]?.toLowerCase();

    if (!sub) {
        return m.reply(
            `🏪 *ISEKAI SHOP*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `• \`.isekaishop weapon\` — Senjata player (pakai Gold)\n` +
            `• \`.isekaishop equip\`  — Char equipment (pakai Gold)\n\n` +
            `💰 Gold kamu: *${isekai.gold}*`
        );
    }

    if (sub === 'weapon') {
        const forSale = ISEKAI_WEAPONS.filter(w=>w.shopPrice>0);
        let text = `🗡️ *WEAPON SHOP*\n━━━━━━━━━━━━━━━━━━━━━━━━\n💰 Gold: *${isekai.gold}*\n\n`;
        for (const w of forSale) {
            const owned = isekai.ownedWeapons.find(x=>x.id===w.id);
            text += `*[${w.id}]* ${w.name} ${rarityStars(w.rarity)}\n`;
            text += `  ⚔️+${w.atk} 🛡️+${w.def} | ${w.skill}\n`;
            text += `  ${owned ? `✅ Dimiliki (enhance +${owned.enhance||0})` : `💰 ${w.shopPrice} Gold`}\n\n`;
        }
        text += `_\`.isekaibuy <id>\` untuk membeli_`;
        return m.reply(text);
    }

    if (sub === 'equip') {
        const forSale = CHAR_EQUIPMENT.filter(e=>e.price>0);
        let text = `🎽 *CHAR EQUIPMENT SHOP*\n━━━━━━━━━━━━━━━━━━━━━━━━\n💰 Gold: *${isekai.gold}*\n\n`;
        for (const e of forSale) {
            const qty = isekai.charEquipInventory[e.id] || 0;
            text += `*[${e.id}]* ${e.name} ${rarityStars(e.rarity)} [${e.slot}]\n`;
            text += `  ⚔️+${e.atk} 🛡️+${e.def} ❤️+${e.hp}\n`;
            if (e.special) text += `  ✨ ${e.special}+${e.specVal}% (aktif di battle!)\n`;
            text += `  💰 ${e.price} Gold | Punya: ${qty}x\n\n`;
        }
        text += `_\`.buyequip <id>\` untuk membeli_`;
        return m.reply(text);
    }
    break;
}

// ─────────────────────────────────────────────────────────────
// 🛒 .isekaibuy — Beli senjata player
// ─────────────────────────────────────────────────────────────
case 'isekaibuy': {
    let user   = loadUserData(m.sender);
    let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);
    const id = args[0]?.toLowerCase();
    if (!id) return m.reply('❌ Contoh: `.isekaibuy iron_sword` | Cek `.isekaishop weapon`');

    const w = ISEKAI_WEAPONS.find(x=>x.id===id && x.shopPrice>0);
    if (!w) return m.reply(`❌ *${id}* tidak ada di shop!\nCek \`.isekaishop weapon\``);
    if (isekai.ownedWeapons.find(x=>x.id===id)) return m.reply(`❌ Sudah punya *${w.name}*!\nGunakan \`.enhance ${id}\``);
    if (isekai.gold < w.shopPrice) return m.reply(`❌ Gold kurang!\n💰 Butuh ${w.shopPrice} | Kamu ${isekai.gold}`);

    isekai.gold -= w.shopPrice;
    isekai.ownedWeapons.push({ id: w.id, enhance: 0 });
    saveUserData(m.sender, user);
    m.reply(`✅ *${w.name}* dibeli!\n💰 Sisa: ${isekai.gold}\n_Pasang: \`.equip ${id}\`_`);
    break;
}

// ─────────────────────────────────────────────────────────────
// 🛒 .buyequip — Beli char equipment
// ─────────────────────────────────────────────────────────────
case 'buyequip': {
    let user   = loadUserData(m.sender);
    let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);
    const id = args[0]?.toLowerCase();
    if (!id) return m.reply('❌ Contoh: `.buyequip dark_tome` | Cek `.isekaishop equip`');

    const eq = CHAR_EQUIPMENT.find(e=>e.id===id && e.price>0);
    if (!eq) return m.reply(`❌ *${id}* tidak ada di shop!\nCek \`.isekaishop equip\``);
    if (isekai.gold < eq.price) return m.reply(`❌ Gold kurang!\n💰 Butuh ${eq.price} | Kamu ${isekai.gold}`);

    isekai.gold -= eq.price;
    isekai.charEquipInventory[id] = (isekai.charEquipInventory[id] || 0) + 1;
    saveUserData(m.sender, user);
    m.reply(
        `✅ *${eq.name}* dibeli! (${isekai.charEquipInventory[id]}x total)\n` +
        `💰 Sisa: ${isekai.gold}\n` +
        `_Pasang ke karakter: \`.charequip <nama_char> ${id}\`_`
    );
    break;
}

// ─────────────────────────────────────────────────────────────
// 🗡️ .equip — Pasang senjata player
// ─────────────────────────────────────────────────────────────
case 'equip': {
    let user   = loadUserData(m.sender);
    let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);
    const id = args[0]?.toLowerCase();

    if (!id) {
        if (!isekai.ownedWeapons.length) return m.reply('🗡️ Belum punya senjata!\n• Drop dari stage\n• \`.isekaishop weapon\`\n• \`.pull weapon`');
        let text = `🗡️ *INVENTORI SENJATA*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        for (const ow of isekai.ownedWeapons) {
            const w = ISEKAI_WEAPONS.find(x=>x.id===ow.id);
            if (!w) continue;
            const enh = ow.enhance || 0;
            const bonus = Math.floor(enh * 5);
            const fx = PLAYER_WEAPON_BATTLE[w.id];
            text += `${isekai.equippedWeapon===ow.id?'✅':'  '} *[${w.id}]* ${w.name} ${rarityStars(w.rarity)}\n`;
            text += `  ⚔️${w.atk+Math.floor(w.atk*enh*0.05)} 🛡️${w.def+Math.floor(w.def*enh*0.05)} (+${bonus}% enhance)\n`;
            text += `  💥 ${w.skill}\n`;
            if (fx) text += `  🔥 Battle FX: ${fx.type}\n`;
            text += '\n';
        }
        text += `_\`.equip <id>\` pasang | \`.enhance <id>\` upgrade_`;
        return m.reply(text);
    }

    const ow = isekai.ownedWeapons.find(w=>w.id===id);
    if (!ow) return m.reply(`❌ *${id}* tidak dimiliki!\nCek \`.equip\``);
    const w = ISEKAI_WEAPONS.find(x=>x.id===id);
    isekai.equippedWeapon = id;
    saveUserData(m.sender, user);
    const fx = PLAYER_WEAPON_BATTLE[id];
    m.reply(
        `✅ *${w.name}* dipasang!\n⚔️+${w.atk} 🛡️+${w.def} Enhance:+${ow.enhance||0}\n` +
        `💥 ${w.skill}\n` +
        `${fx ? `🔥 Battle FX Aktif: *${fx.type}*\n` : ''}` +
        `💪 CP Baru: *${calcCP(isekai).toLocaleString()}*`
    );
    break;
}

// ─────────────────────────────────────────────────────────────
// 🔧 .enhance <id> — Enhance senjata player
// ─────────────────────────────────────────────────────────────
case 'enhance': {
    let user   = loadUserData(m.sender);
    let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);
    const id = args[0]?.toLowerCase();
    if (!id) return m.reply('❌ Contoh: `.enhance iron_sword`\nLihat ID di \`.equip\`');

    const ow = isekai.ownedWeapons.find(w=>w.id===id);
    const w  = ISEKAI_WEAPONS.find(x=>x.id===id);
    if (!ow || !w) return m.reply('❌ Senjata tidak ditemukan!');

    const maxEnh = w.rarity===5 ? 15 : w.rarity===4 ? 12 : 8;
    if ((ow.enhance||0) >= maxEnh) return m.reply(`✅ *${w.name}* sudah max enhance +${maxEnh}!`);

    const cost = Math.floor(200 * Math.pow(1.5, ow.enhance||0));
    if (isekai.gold < cost) return m.reply(`❌ Gold kurang!\n💰 Butuh: *${cost}* | Kamu: *${isekai.gold}*\n_Farming gold di \`.stage\` atau \`.isekaiarena battle\`!_`);

    const old = ow.enhance || 0;
    isekai.gold -= cost;
    ow.enhance = old + 1;
    saveUserData(m.sender, user);
    m.reply(
        `🔧 *Enhance!* ${w.name} +${old} → *+${ow.enhance}*\n` +
        `📈 Bonus: +${ow.enhance*5}% stats\n` +
        `💰 Sisa: *${isekai.gold}* | CP: *${calcCP(isekai).toLocaleString()}*`
    );
    break;
}

// ─────────────────────────────────────────────────────────────
// 🗺️ .stage — Petualangan (Battle engine penuh)
// ─────────────────────────────────────────────────────────────
case 'stage': {
    let user   = loadUserData(m.sender);
    let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);
    regenMana(isekai);

    const sub = args[0]?.toLowerCase();

    if (sub === 'list') {
        let text = `🗺️ *CHAPTER & STAGE*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        for (const ch of ISEKAI_CHAPTERS) {
            const done = ch.stages.every(s=>isekai.completedStages.includes(s.id));
            text += `${done?'✅':'📖'} *${ch.title}*\n`;
            for (const s of ch.stages) {
                const st = isekai.completedStages.includes(s.id)?'✅':s.id===isekai.currentStage?'▶️':'⬜';
                text += `  ${st} ${s.id}: ${s.name}${s.isBoss?' 👑':''} (💧${s.mana})\n`;
            }
            text += '\n';
        }
        return m.reply(text + `▶️ Stage sekarang: *${isekai.currentStage}* | 💧${isekai.mana}/${isekai.manaMax}`);
    }

    const stageId = (sub && sub.includes('-')) ? sub : isekai.currentStage;
    const stage   = getStageData(stageId);
    if (!stage) return m.reply('❌ Stage tidak ditemukan!\nCek \`.stage list\`');

    // Hitung mana cost
    let manaCost = stage.mana;
    for (const cId of isekai.party.filter(Boolean)) {
        const oc = isekai.ownedChars.find(c=>c.id===cId);
        if (!oc) continue;
        const accItem = oc.equipment?.accessory;
        if (!accItem) continue;
        const eq = CHAR_EQUIPMENT.find(e=>e.id===accItem && e.special==='mana_reduce');
        if (eq) manaCost = Math.max(1, manaCost - eq.specVal);
    }

    if (isekai.mana < manaCost) {
        return m.reply(
            `💧 *Mana tidak cukup!*\n\nButuh: *${manaCost}* | Kamu: *${isekai.mana}*\n` +
            `⏳ Regen ~${Math.ceil((manaCost-isekai.mana)*6)} menit\n\n` +
            `_Beli: \`.mana buy\` (30ss = 60 mana)_\n` +
            `_Tip: Mana Crystal (accessory) kurangi cost stage!_`
        );
    }

    // Jalankan battle
    const result = runBattle(isekai, stage, false);
    isekai.mana -= manaCost;

    // Bangun pesan akhir (tanpa log turn)
    let finalReply = `⚔️ *STAGE ${stage.id}: ${stage.name}*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    finalReply += `👹 *${stage.enemy}* [${stage.enemyType}]\n❤️${stage.eHP} ⚔️${stage.eATK} 🛡️${stage.eDEF}\n\n`;
    finalReply += `👥 Party: ${isekai.party.filter(Boolean).length}/${isekai.partySlots} | CP: *${calcCP(isekai).toLocaleString()}*\n\n`;

    if (result.win) {
        const goldGot = Math.floor(stage.gold * (1 + result.goldBonus) * (0.9 + Math.random()*0.2));
        const expGot  = Math.floor(stage.exp  * (1 + result.expBonus));
        isekai.gold  += goldGot;
        isekai.totalKills++;

        for (const cId of isekai.party.filter(Boolean)) {
            const oc = isekai.ownedChars.find(c=>c.id===cId);
            if (!oc) continue;
            oc.exp = (oc.exp||0) + Math.floor(stage.exp * 0.25);
            while (oc.exp >= charExpNeeded(oc.level||1)) {
                oc.exp -= charExpNeeded(oc.level||1);
                oc.level = (oc.level||1) + 1;
            }
        }

        user.harvest.exp = (user.harvest.exp||0) + expGot;
        let lvlText = '';
        while (user.harvest.exp >= expNeeded(user.harvest.level+1)) {
            user.harvest.exp -= expNeeded(user.harvest.level+1);
            user.harvest.level++;
            isekai.hpMax += 50; isekai.atk += 4; isekai.def += 3; isekai.spd++;
            if (user.harvest.level % 5 === 0) { isekai.skystone += 5; lvlText += `\n🆙 Level ${user.harvest.level}! +50HP +4ATK +3DEF +💎5`; }
            else lvlText += `\n🆙 Level ${user.harvest.level}! +50HP +4ATK +3DEF`;
        }

        let dropText = '';
        if (stage.weaponDrop && Math.random()*100 < 40) {
            const wd = ISEKAI_WEAPONS.find(w=>w.id===stage.weaponDrop);
            if (wd) {
                const ow = isekai.ownedWeapons.find(w=>w.id===wd.id);
                if (ow) { ow.enhance = Math.min((ow.enhance||0)+1, wd.rarity>=5?15:12); dropText += `\n🗡️ Drop: *${wd.name}* (duplikat → enhance+1!)`; }
                else { isekai.ownedWeapons.push({id:wd.id,enhance:0}); dropText += `\n🗡️ Drop: *${wd.name}* ${rarityStars(wd.rarity)} — Baru!`; }
            }
        }

        let ceDropText = '';
        if (stage.charEquipDrop && Math.random()*100 < (stage.dropRate * (1 + result.dropBonus))) {
            const eq = CHAR_EQUIPMENT.find(e=>e.id===stage.charEquipDrop);
            if (eq) {
                isekai.charEquipInventory[eq.id] = (isekai.charEquipInventory[eq.id]||0) + 1;
                ceDropText = `\n🎽 Char Equip Drop: *${eq.name}* ${rarityStars(eq.rarity)}!`;
            }
        }

        let ssText = '';
        if (stage.ss > 0) { isekai.skystone += stage.ss; ssText = `\n💎 Boss reward: +${stage.ss} Skystone!`; }

        if (!isekai.completedStages.includes(stage.id)) {
            isekai.completedStages.push(stage.id);
            isekai.currentStage = nextStageId(stage.id);
        }

        finalReply += `✅ *MENANG!* (${result.hpRemainPct}% HP)\n`;
        finalReply += `✨+${expGot} EXP | 💰+${goldGot} Gold${dropText}${ceDropText}${ssText}${lvlText}\n`;
        if (result.goldBonus > 0) finalReply += `_(+${Math.floor(result.goldBonus*100)}% gold bonus dari party!)_\n`;
        if (result.holyBonusMult > 1) finalReply += `_(+${Math.floor((result.holyBonusMult-1)*100)}% holy damage vs ${stage.enemyType}!)_\n`;
        finalReply += `💧 Mana: ${isekai.mana}/${isekai.manaMax}\n`;
        if (stage.isBoss) finalReply += `\n🏆 *BOSS CLEARED!* 🎆\n_"Megumin senang, Aqua nangis haru, Darkness entah kenapa girang."_`;
        else finalReply += `\n▶️ Next: *${isekai.currentStage}* | \`.stage\` untuk lanjut`;
    } else {
        const loss = Math.floor(isekai.gold * 0.03);
        isekai.gold = Math.max(0, isekai.gold - loss);
        finalReply += `❌ *KALAH!* (-${loss} Gold)\n\n💡 *Tips:*\n• \`.party set\` — Tambah Healer/Tank ke party\n• \`.charlvup\` — Level up karakter\n• \`.charequip\` — Pasang equipment ke char\n• \`.pull standard\` — Cari karakter SR/SSR\n\n_"Aqua sudah prediksi ini."_ 😅`;
    }

    saveUserData(m.sender, user);
    m.reply(finalReply);
    break;
}

// ─────────────────────────────────────────────────────────────
// ⚔️ .isekaiarena — PVP dengan battle engine penuh
// ─────────────────────────────────────────────────────────────
case 'isekaiarena': {
    let user   = loadUserData(m.sender);
    let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);
    const sub  = args[0]?.toLowerCase();

    if (!sub || sub === 'info') {
        return m.reply(
            `⚔️ *ARENA PVP*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `👤 *${isekai.name}* — ${arenaTitle(isekai.arenaRank)}\n` +
            `🏆 Rating: *${isekai.arenaRank}* | W/L: *${isekai.arenaWins}W/${isekai.arenaLosses}L*\n` +
            `💪 CP: *${calcCP(isekai).toLocaleString()}* | Party: ${isekai.party.filter(Boolean).length}/${isekai.partySlots}\n\n` +
            `📌 \`.isekaiarena battle\` — Cari lawan\n\`.isekaiarena rank\` — Leaderboard\n\n` +
            `💡 Battle arena pakai skill & passive party yang sama dengan stage!`
        );
    }

    if (sub === 'battle') {
        const directory = process.cwd();
        const dbPath = [path.join(directory,'temp','database','players'), path.join(directory,'temp','database')].find(p=>fs.existsSync(p));

        let opponents = [];
        if (dbPath) {
            for (const file of fs.readdirSync(dbPath).filter(f=>f.endsWith('.json'))) {
                try {
                    const data = JSON.parse(fs.readFileSync(path.join(dbPath,file),'utf8'));
                    const opId = file.replace('.json','');
                    if (opId===m.sender || !data?.harvest?.isekai?.registered) continue;
                    const opI = data.harvest.isekai;
                    if (Math.abs((opI.arenaRank||1500)-isekai.arenaRank) <= 500) {
                        opponents.push({ id: opId, isekai: opI, name: opI.name||opId.split('@')[0], rating: opI.arenaRank||1500 });
                    }
                } catch(e) {}
            }
        }

        // NPC jika tidak ada lawan nyata
        if (!opponents.length) {
            const br = isekai.arenaRank;
            const ms = calcPartyStats(isekai);
            const makeNpc = (name, rMod, aMod, dMod, hMod) => ({
                name, rating: br + rMod, isNpc: true,
                isekai: {
                    ...isekai,
                    hpMax: Math.floor(ms.totalHP * hMod),
                    atk: Math.floor(ms.totalATK * aMod * 0.7),
                    def: Math.floor(ms.totalDEF * dMod * 0.7),
                    equippedWeapon: null, ownedWeapons: [], party: [], ownedChars: [], charEquipInventory: {},
                }
            });
            opponents = [
                makeNpc('Kazuma Clone',   -80, 0.90, 0.85, 0.88),
                makeNpc('Megumin Fan',    +20, 1.10, 0.75, 0.85),
                makeNpc('Darkness Simp', +120, 0.70, 1.60, 1.30),
            ];
        }

        const opp = opponents[Math.floor(Math.random() * Math.min(3, opponents.length))];

        // Buat "stage" dari data lawan untuk battle engine
        const opStats   = calcPartyStats(opp.isekai);
        const fakeStage = {
            id: 'arena', name: opp.name, enemy: opp.name,
            eHP: opStats.totalHP, eATK: opStats.totalATK, eDEF: opStats.totalDEF,
            enemyType: 'Human', weaponDrop: null, charEquipDrop: null, dropRate: 0, ss: 0,
        };

        const result = runBattle(isekai, fakeStage, true);
        let rDelta, goldReward;
        if (result.win) {
            rDelta = Math.floor(18 + Math.max(0, opp.rating - isekai.arenaRank) / 15);
            isekai.arenaRank += rDelta;
            isekai.arenaWins++; isekai.totalPvpWins++;
            goldReward = rDelta * 12;
            isekai.gold += goldReward;
        } else {
            rDelta = Math.floor(15 + Math.max(0, isekai.arenaRank - opp.rating) / 15);
            isekai.arenaRank = Math.max(0, isekai.arenaRank - rDelta);
            isekai.arenaLosses++;
            goldReward = 0;
        }

        saveUserData(m.sender, user);

        // Tampilkan hanya hasil akhir (tanpa log turn)
        let text = `⚔️ *ARENA BATTLE*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        text += `👤 *${isekai.name}* (${arenaTitle(isekai.arenaRank)}) CP:${calcCP(isekai).toLocaleString()}\nVS\n`;
        text += `👹 *${opp.name}* (${arenaTitle(opp.rating)}) CP:${calcCP(opp.isekai).toLocaleString()}\n\n`;
        text += `${result.win ? '✅ *MENANG!*' : '❌ *KALAH!*'}\n`;
        text += `📊 Rating: *${result.win?'+':'-'}${rDelta}* → *${isekai.arenaRank}*\n`;
        text += `🏆 *${arenaTitle(isekai.arenaRank)}*\n`;
        if (goldReward > 0) text += `💰 +${goldReward} Gold!\n`;
        text += `\n_"${result.win ? 'Skill & passive partymu benar-benar bekerja!' : 'Tambahin Healer/Tank ke party dulu!'}"_`;
        m.reply(text);
        break;
    }

    if (sub === 'rank') {
        const dbPath = [path.join(process.cwd(),'temp','database','players'), path.join(process.cwd(),'temp','database')].find(p=>fs.existsSync(p));
        let players = [];
        if (dbPath) {
            for (const file of fs.readdirSync(dbPath).filter(f=>f.endsWith('.json'))) {
                try {
                    const data = JSON.parse(fs.readFileSync(path.join(dbPath,file),'utf8'));
                    if (!data?.harvest?.isekai?.registered) continue;
                    const isk = data.harvest.isekai;
                    players.push({ name:isk.name||file.split('@')[0], rating:isk.arenaRank||1500, wins:isk.arenaWins||0, losses:isk.arenaLosses||0, cp:calcCP(isk) });
                } catch(e) {}
            }
        }
        players.sort((a,b)=>b.rating-a.rating);
        const medals = ['🥇','🥈','🥉'];
        let text = `🏆 *ARENA LEADERBOARD*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        players.slice(0,10).forEach((p,i) => {
            text += `${medals[i]||`${i+1}.`} *${p.name}* — ${arenaTitle(p.rating)}\n   ⭐${p.rating} CP:${p.cp.toLocaleString()} ${p.wins}W/${p.losses}L\n\n`;
        });
        const myPos = players.findIndex(p=>p.name===isekai.name)+1;
        text += `📍 Posisimu: *#${myPos}* dari ${players.length}\n_Daily reward makin besar di rank tinggi!_`;
        m.reply(text);
        break;
    }
    m.reply('❓ `arena | arena battle | arena rank`');
    break;
}

// ─────────────────────────────────────────────────────────────
// 🎰 .banner / .pull / .pull10
// ─────────────────────────────────────────────────────────────
case 'banner': {
    let user = loadUserData(m.sender); let isekai = getIsekaiData(user);
    const sub = args[0]?.toLowerCase();
    if (!sub || sub==='list') {
        let text = `🎰 *BANNER GACHA*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        for (const b of ISEKAI_BANNERS) {
            const p = isekai.pity[b.id]||0;
            text += `📛 *${b.name}*\n💎${b.costSingle}ss / ${b.cost10}ss(10x) | Pity:${p}/${b.pityLimit}\n⭐SSR${b.rates[5]}% SR${b.rates[4]}%\n`;
            if (b.rateUpChars?.length) text += `🔝 Rate-Up: ${b.rateUpChars.map(id=>ISEKAI_CHARACTERS.find(c=>c.id===id)?.name).join(', ')}\n`;
            if (b.pool==='weapon') text += `🗡️ Weapon Banner!\n`;
            text += `📌 \`.pull ${b.id}\` | \`.pull10 ${b.id}\`\n\n`;
        }
        return m.reply(text);
    }
    const banner = ISEKAI_BANNERS.find(b=>b.id===sub);
    if (!banner) return m.reply('❌ Banner tidak ditemukan!');
    const p = isekai.pity[banner.id]||0;
    m.reply(`🎰 *${banner.name}*\n💎${banner.costSingle}ss | 10x:${banner.cost10}ss\nSSR${banner.rates[5]}% SR${banner.rates[4]}%\nPity kamu: *${p}/${banner.pityLimit}*\n💎 Skystone: *${isekai.skystone}*`);
    break;
}

case 'pull': {
    let user = loadUserData(m.sender); let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);
    const bannerId = args[0]?.toLowerCase()||'standard';
    const banner = ISEKAI_BANNERS.find(b=>b.id===bannerId);
    if (!banner) return m.reply('❌ Banner tidak ditemukan!\nCek \`.banner list\`');
    if (isekai.skystone < banner.costSingle) return m.reply(`❌ Skystone kurang!\n💎${isekai.skystone}/${banner.costSingle}\n\n_Skystone dari boss stage & daily!_\n_Atau beli di \`.buyss <jumlah>\`_`);
    isekai.skystone -= banner.costSingle;
    const { item, isDuplicate, rarity, isWeapon } = doGachaPull(banner, isekai);
    saveUserData(m.sender, user);
    const icon = rarity===5?'🌟✨':rarity===4?'💫':'🔵';
    let text = `🎰 *PULL RESULT*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n${icon} *${item.name}* ${rarityStars(rarity)}\n`;
    if (!isWeapon) {
        const oc = isekai.ownedChars.find(c=>c.id===item.id);
        text += `🎭 Role: *${item.role}* | ${item.class}\n💥 Skill: ${item.skill}\n🌟 Passive: ${item.passive}\n`;
        text += isDuplicate ? `♻️ Duplikat → Awakening ✦${oc?.awakening||0}/5\n` : `✨ Karakter BARU!\n`;
        text += `_"${item.quote}"_\n\n`;
        if (!isDuplicate) text += `_\`.party set <slot> ${item.id}\` untuk pasang ke party!_`;
    } else {
        text += `🗡️ ${item.type} | ${item.skill}\n`;
        const ow = isekai.ownedWeapons.find(w=>w.id===item.id);
        text += isDuplicate ? `♻️ Duplikat → Enhance +${ow?.enhance||0}\n` : `✨ Senjata BARU!\n_\`.equip ${item.id}\` untuk pasang!_`;
    }
    text += `\n\n🔄 Pity: ${isekai.pity[bannerId]}/${banner.pityLimit} | 💎 Sisa: ${isekai.skystone}`;
    m.reply(text); break;
}

case 'pull10': {
    let user = loadUserData(m.sender); let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);
    const bannerId = args[0]?.toLowerCase()||'standard';
    const banner = ISEKAI_BANNERS.find(b=>b.id===bannerId);
    if (!banner) return m.reply('❌ Banner tidak ditemukan!');
    if (isekai.skystone < banner.cost10) return m.reply(`❌ Skystone kurang!\n💎${isekai.skystone}/${banner.cost10}\n\nBeli skystone di \`.buyss <jumlah>\`_`);
    isekai.skystone -= banner.cost10;

    const results = [];
    let hasSR = false;
    for (let i = 0; i < 10; i++) {
        if (i===9 && !hasSR) {
            // Force SR
            const pool = (banner.pool==='weapon'?ISEKAI_WEAPONS:ISEKAI_CHARACTERS).filter(x=>x.rarity===4);
            const forced = pool[Math.floor(Math.random()*pool.length)];
            isekai.pity[bannerId] = 0;
            if (banner.pool==='weapon') {
                const ow = isekai.ownedWeapons.find(w=>w.id===forced.id);
                if (ow) ow.enhance=Math.min((ow.enhance||0)+1,12); else isekai.ownedWeapons.push({id:forced.id,enhance:0});
                results.push({item:forced,isDuplicate:!!ow,rarity:4,isWeapon:true});
            } else {
                const oc = isekai.ownedChars.find(c=>c.id===forced.id);
                if (oc) { oc.copies++; oc.awakening=Math.min((oc.awakening||0)+1,5); }
                else isekai.ownedChars.push({id:forced.id,level:1,exp:0,copies:1,awakening:0,equipment:{weapon:null,armor:null,accessory:null}});
                results.push({item:forced,isDuplicate:!!oc,rarity:4,isWeapon:false});
            }
            hasSR = true;
        } else {
            const r = doGachaPull(banner, isekai);
            if (r.rarity>=4) hasSR = true;
            results.push(r);
        }
    }
    saveUserData(m.sender, user);

    let text = `🎰 *10x PULL — ${banner.name}*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    for (let i=0;i<results.length;i++) {
        const {item,isDuplicate,rarity} = results[i];
        const icon = rarity===5?'🌟':rarity===4?'💫':rarity===3?'🔵':'⚪';
        text += `${i+1}. ${icon} *${item.name}* ${'★'.repeat(rarity)} ${isDuplicate?'♻️':'✨'}\n`;
    }
    const ssr = results.filter(r=>r.rarity===5).length, sr = results.filter(r=>r.rarity===4).length;
    text += `\n📊 SSR:*${ssr}* SR:*${sr}* | Pity:${isekai.pity[bannerId]}/${banner.pityLimit}\n💎 Sisa: ${isekai.skystone}\n`;
    text += ssr>0?`\n🎆 *SSR GET! Eris memberkatimu!* 🎆`:`_"SR lumayan. Aqua bilang bersyukurlah."_ 😅`;
    m.reply(text); break;
}

// ─────────────────────────────────────────────────────────────
// 💧 .mana / .daily / .skystone
// ─────────────────────────────────────────────────────────────
case 'mana': {
    let user = loadUserData(m.sender); let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);
    regenMana(isekai);
    if (args[0]==='buy') {
        if (isekai.skystone < 30) return m.reply(`❌ Butuh 30ss | Kamu: ${isekai.skystone}ss\n\n_Beli skystone di \`.buyss <jumlah>\`_`);
        isekai.skystone -= 30; isekai.mana = Math.min(isekai.manaMax, isekai.mana+60);
        saveUserData(m.sender, user);
        return m.reply(`✅ +60 Mana!\n💧${isekai.mana}/${isekai.manaMax} | 💎${isekai.skystone}`);
    }
    saveUserData(m.sender, user);
    m.reply(`💧 Mana: *${isekai.mana}/${isekai.manaMax}*\n⏳ Full dalam ~${Math.ceil((isekai.manaMax-isekai.mana)*6)} menit\n\n_\`.mana buy\` = 30ss → 60 mana_\n_Tip: Mana Crystal (char accessory) kurangi mana cost stage!_`);
    break;
}

case 'daily': {
    let user = loadUserData(m.sender); let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);
    const now = new Date(), today = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    if (isekai.lastDaily===today) return m.reply('⏰ *Daily sudah diambil!*\nKembali besok ya!\n\n_"Aqua juga nunggu."_ 🙏');
    regenMana(isekai);
    const r = dailyRewardByRank(isekai);
    const gold = Math.floor(r.gold*(0.9+Math.random()*0.2));
    isekai.gold += gold; isekai.skystone += r.skystone;
    isekai.mana = Math.min(isekai.manaMax, isekai.mana+r.mana);
    isekai.lastDaily = today;
    saveUserData(m.sender, user);
    m.reply(
        `🎁 *DAILY REWARD*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `🏆 Tier: *${arenaTitle(isekai.arenaRank)}*\n\n` +
        `💰 +${gold} Gold\n💧 +${r.mana} Mana\n${r.skystone>0?`💎 +${r.skystone} Skystone!\n`:''}\n` +
        `✅ Total: 💰${isekai.gold} 💎${isekai.skystone} 💧${isekai.mana}\n\n` +
        `_Reward makin besar jika Arena Rank lebih tinggi!_\n_"Eris memberkatimu!"_ ✨`
    );
    break;
}

case 'skystone': {
    let user = loadUserData(m.sender); let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply(`❌ Belum terdaftar!\n_Silahian ketik \`.isekairegister\`_`);
    regenMana(isekai); saveUserData(m.sender, user);
    const sc = partySlotCost(isekai.partySlots);
    m.reply(
        `💎 *MATA UANG ISEKAI*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `💰 Gold: *${isekai.gold}*\n💎 Skystone: *${isekai.skystone}*\n💧 Mana: *${isekai.mana}/${isekai.manaMax}*\n\n` +
        `🎰 Pull: *${Math.floor(isekai.skystone/160)}x single* | *${Math.floor(isekai.skystone/1500)}x 10-pull*\n\n` +
        `${sc?`👥 Upgrade slot party: *${sc}ss* (${isekai.partySlots}→${isekai.partySlots+1})\n`:'👥 Party slot max (10)!\n'}` +
        `💡 *Sumber Skystone:*\n• Boss stage (15-60+ss)\n• Daily reward (scale arena rank)\n• Level up tiap 5 level (+5ss)\n• Gacha SSR duplikat → awakening (bukan ss)\n\n` +
        `_"Hemat demi pity, tapi boss stage gratis skystone!"_ 🎲` +
        `\n_Beli  skystone di \`.buyss <jumlah>\`_`
    );
    break;
}

// ─────────────────────────────────────────────────────────────
// ❓ .isekaimenu — Menu lengkap
// ─────────────────────────────────────────────────────────────
case 'isekai':
case 'isekaimenu': {
    m.reply(
        `⚔️ *ISEKAI RPG v3 — KonoSuba World* ⚔️\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `🌟 *DASAR*\n• \`.isekairegister <class>\` — Mulai (warrior/wizard/rogue/priest/crusader)\n• \`.isekaiprofil\` — Lihat stats lengkap\n• \`.daily\` — Reward harian (scale arena rank)\n• \`.skystone\` — Cek mata uang\n• \`.buyss <jumlah>\` — Beli Skystone pakai Gold (1ss = 1000 Gold)\n• \`.mana\` / \`.mana buy\` — Kelola mana\n\n` +
        `📖 *PANDUAN LENGKAP*\n` + `• \`.guide\` — Menu utama guide\n` + `• \`.guide effects\` — Efek equipment & skill karakter\n` + `• \`.guide weapon\` — Efek senjata player (Battle FX)\n` + `• \`.guide party\` — Bonus party & sinergi\n` + `• \`.guide mechanic\` — Mana, CP, leveling, dll\n\n` +
        `👥 *PARTY SYSTEM* ← Kunci utama kekuatan!\n• \`.party info\` — Lihat party + efek semua passive\n• \`.party set <slot> <char>\` — Set karakter\n• \`.party remove <slot>\` — Hapus dari slot\n• \`.party slotup\` — Upgrade slot (50-600ss)\n\n` +
        `🧑 *KARAKTER*\n• \`.mychar\` — Koleksi karakter\n• \`.charinfo <nama>\` — Detail + efek battle\n• \`.charlvup <nama> [x]\` — Level up (pakai gold)\n• \`.charequip [nama char] [item]\` — Pasang equip ke char\n\n` +
        `🎰 *GACHA*\n• \`.banner list\` — Semua banner aktif\n• \`.pull <banner>\` — Single (160ss)\n• \`.pull10 <banner>\` — 10x (1500ss)\n\n` +
        `🗺️ *STAGE* ← Sumber gold, drop, exp!\n• \`.stage\` — Lanjut stage\n• \`.stage list\` — Semua chapter\n• \`.stage 2-3\` — Stage spesifik\n\n` +
        `🗡️ *SENJATA PLAYER*\n• \`.equip\` — Inventori & pasang senjata\n• \`.enhance <id>\` — Upgrade enhance (gold)\n• \`.isekaishop weapon\` / \`.isekaibuy <id>\` — Beli\n• \`.pull weapon\` — Gacha senjata\n\n` +
        `🎽 *CHAR EQUIPMENT* ← Skill & passive makin kuat!\n• \`.charequip\` — Lihat inventori\n• \`.isekaishop equip\` / \`.buyequip <id>\` — Beli\n• _Drop dari stage boss!_\n\n` +
        `⚔️ *ARENA PVP*\n• \`.isekaiarena\` — Info rank\n• \`.isekaiarena battle\` — Battle (pakai skill party!)\n• \`.isekaiarena rank\` — Leaderboard\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `🔗 *Alur:* Stage→Gold→Beli equip→Charequip→Party kuat\n→Boss drop→Skystone→Pull→SSR ke party→Arena rank naik\n→Daily reward besar→Pull lagi! ♾️\n\n` +
        `_"Semua sistem terhubung. Skill & passive NYATA di battle!"_ ⚔️✨`
    );
    break;
}

case 'reset':
case 'hapusdata': {
    let user = loadUserData(m.sender);
    let isekai = getIsekaiData(user);
    if (!isekai.registered) return m.reply('❌ Kamu belum terdaftar, tidak perlu reset.');

    const confirm = args[0]?.toLowerCase();
    if (confirm !== 'confirm' && confirm !== '--yes' && confirm !== 'ya') {
        return m.reply(
            `⚠️ *PERINGATAN!*\n\n` +
            `Kamu akan menghapus SEMUA data progres Isekai-mu secara permanen:\n` +
            `• Karakter & level\n` +
            `• Party & equipment\n` +
            `• Gold, Skystone, Mana\n` +
            `• Progress stage, arena rank\n` +
            `• Dan lainnya\n\n` +
            `Ketik: \`.reset confirm\` untuk menghapus.\n\n` +
            `_"Aqua bilang: Jangan menyesal nanti!"_ 😱`
        );
    }

    // Reset data isekai dan harvest
    if (user.harvest) {
        delete user.harvest.isekai;
    } else {
        m.reply('Database tidak ditemukan!')
    }

    saveUserData(m.sender, user);

    m.reply(
        `🗑️ *DATA BERHASIL DIHAPUS!*\n\n` +
        `Kamu telah kembali ke titik awal.\n` +
        `Ketik \`.isekairegister <class>\` untuk memulai petualangan baru di Isekai.\n\n` +
        `_"Eris menangis, tapi dia mengerti pilihanmu."_ 😢✨`
    );
    break;
}

                break;
        }
    }



    switch (command) {

// ========================
// 4. COMMAND HANDLERS
// ========================

case 'dsupload': {
  try {
    await m.reply("⏳ Mengambil daftar video unggulan...");
    const html = await getData('https://duniastreaming.net/');
    if (!html) throw new Error("Gagal mengambil halaman");
    const scraper = new UploadTerbaruScraper(html);
    const items = scraper.ambilDataUploadTerbaru();
    if (!items.length) return m.reply("❌ Tidak ada video unggulan ditemukan.");
    global.db.duniaStreaming[m.sender] = {
      upload: { items, index: 0, total: items.length }
    };
    await sendUploadPage(m, sock);
  } catch (err) {
    console.error(err);
    m.reply("❌ Gagal mengambil upload terbaru.");
  }
  break;
}

case 'dssearch': {
  if (!m.text) return m.reply(`*Contoh:* ${m.prefix + command} anime naruto`);
  const keyword = m.text;
  try {
    await m.reply(`🔎 Mencari video dengan kata kunci "${keyword}"...`);
    const { items, totalPages } = await getSearchPage(keyword, 1);
    if (!items || items.length === 0) return m.reply("❌ Tidak ada video ditemukan.");
    global.db.duniaStreaming[m.sender] = {
      search: {
        items,
        index: 0,
        total: items.length,
        query: keyword,
        currentPage: 1,
        totalPages: totalPages
      }
    };
    await sendSearchPage(m, sock);
  } catch (err) {
    console.error(err);
    m.reply("❌ Gagal melakukan pencarian.");
  }
  break;
}

case 'dsnextpage': {
  const state = global.db.duniaStreaming?.[m.sender]?.search;
  if (!state) return m.reply("❌ Tidak ada sesi pencarian aktif. Gunakan *dssearch* terlebih dahulu.");
  if (state.currentPage >= state.totalPages) return m.reply("❌ Anda sudah berada di halaman terakhir.");
  const nextPage = state.currentPage + 1;
  const { items, totalPages } = await getSearchPage(state.query, nextPage);
  if (!items || items.length === 0) return m.reply("❌ Gagal memuat halaman berikutnya.");
  state.items = items;
  state.total = items.length;
  state.currentPage = nextPage;
  state.totalPages = totalPages;
  state.index = 0;
  await sendSearchPage(m, sock);
  break;
}

case 'dsprevpage': {
  const state = global.db.duniaStreaming?.[m.sender]?.search;
  if (!state) return m.reply("❌ Tidak ada sesi pencarian aktif.");
  if (state.currentPage <= 1) return m.reply("❌ Anda sudah berada di halaman pertama.");
  const prevPage = state.currentPage - 1;
  const { items, totalPages } = await getSearchPage(state.query, prevPage);
  if (!items || items.length === 0) return m.reply("❌ Gagal memuat halaman sebelumnya.");
  state.items = items;
  state.total = items.length;
  state.currentPage = prevPage;
  state.totalPages = totalPages;
  state.index = 0;
  await sendSearchPage(m, sock);
  break;
}

case 'dsnext': {
  const state = global.db.duniaStreaming?.[m.sender];
  if (!state) return m.reply("❌ Tidak ada sesi aktif. Gunakan *dsupload* atau *dssearch* terlebih dahulu.");
  if (state.upload) await sendUploadPage(m, sock);
  else if (state.search) await sendSearchPage(m, sock);
  else m.reply("❌ Sesi tidak valid.");
  break;
}

case 'dsprev': {
  const state = global.db.duniaStreaming?.[m.sender];
  if (!state) return m.reply("❌ Tidak ada sesi aktif.");
  let data = state.upload || state.search;
  if (!data) return m.reply("❌ Sesi tidak valid.");
  if (data.index <= 0) return m.reply("❌ Ini adalah item pertama.");
  data.index--;
  if (state.upload) await sendUploadPage(m, sock);
  else await sendSearchPage(m, sock);
  break;
}

case 'dsselect': {
  if (!m.args[0]) return m.reply(`*Contoh:* ${m.prefix}dsselect 5`);
  const nomor = parseInt(m.args[0]);
  if (isNaN(nomor) || nomor < 1) return m.reply("❌ Masukkan nomor yang valid.");
  const state = global.db.duniaStreaming?.[m.sender];
  if (!state) return m.reply("❌ Tidak ada sesi aktif.");
  let data = state.upload || state.search;
  if (!data) return m.reply("❌ Sesi tidak valid.");
  if (nomor > data.total) return m.reply(`❌ Nomor maksimal adalah ${data.total}.`);
  data.index = nomor - 1;
  if (state.upload) await sendUploadPage(m, sock);
  else await sendSearchPage(m, sock);
  break;
}

case 'dsdownload': {
  const activeLink = global.db.duniaStreaming?.[m.sender]?.activeVideoLink;
  if (!activeLink) return m.reply("❌ Tidak ada video yang dipilih. Silakan pilih video terlebih dahulu dengan *dsupload* atau *dssearch*, lalu pilih nomor videonya.");
  try {
    await m.reply("⏳ Mengambil link download...");
    const html = await getDataCustom(activeLink);
    if (!html) throw new Error("Gagal mengambil halaman detail video");
    const extractor = new VideoDownloadLinkExtractor(html, 'https://duniastreaming.net');
    const downloads = await extractor.getAllDownloadLinks();
    if (!downloads.length) return m.reply("❌ Tidak ada server download ditemukan.");
    let caption = `📥 *Link Download Video*\n━━━━━━━━━━━━━━━━━━\n`;
    for (const dl of downloads) {
      caption += `🎬 *Server ${dl.server}* : ${dl.real_url || 'Gagal mengambil link'}\n`;
    }
    await sock.sendMessage(m.from, { text: caption }, { quoted: m });
  } catch (err) {
    console.error(err);
    m.reply("❌ Gagal mendapatkan link download.");
  }
  break;
}

// ==================== HANDLER COMMANDS ====================
case 'stikersearch':
case 'stickersearch':
case 'csticker': {
    const user = loadUserData(m.sender);
    if (!user || !user.harvest) return m.reply(`❌ Anda belum terdaftar!\n\n${global.balasan.tutorDaftar}`);
    if (!m.isOwner && user.harvest.limit.current <= 0) return m.reply(global.balasan.limitHabis);

    const query = m.text.trim();
    if (!query) {
        return m.reply(`🔍 *Cari Stiker*\nContoh: *${m.prefix}stikersearch anime*`);
    }

    m.reply(`🔎 Mencari stiker untuk *${query}* ...`);

    try {
        const result = await scrapeSearch(query, 1);
        if (!result.packs.length) {
            return m.reply(`❌ Tidak ada hasil untuk *${query}*.`);
        }

        global.db.stickerSearch[m.sender] = {
            query: result.query,
            page: result.page,
            packs: result.packs,
            total: result.packs.length,
            pagination: result.pagination,
            timestamp: Date.now()
        };

        await sendStickerList(m, sock, global.db.stickerSearch[m.sender]);

        // KURANGI LIMIT
        if (!m.isOwner) {
            user.harvest.limit.current--;
            saveUserData(m.sender, user);
        }

    } catch (err) {
        console.error(err);
        m.reply(`❌ Gagal mencari: ${err.message}`);
    }
    break;
}

case 'stickernext': {
    const session = global.db.stickerSearch?.[m.sender];
    if (!session) return m.reply('❌ Tidak ada sesi pencarian aktif. Ketik *stikersearch <keyword>* terlebih dahulu.');

    try {
        const nextPage = session.page + 1;
        const result = await scrapeSearch(session.query, nextPage);
        if (!result.packs.length) {
            return m.reply('❌ Tidak ada halaman berikutnya.');
        }

        session.page = result.page;
        session.packs = result.packs;
        session.pagination = result.pagination;
        session.timestamp = Date.now();

        await sendStickerList(m, sock, session);
    } catch (err) {
        console.error(err);
        m.reply(`❌ Gagal memuat halaman: ${err.message}`);
    }
    break;
}

case 'stickerprev': {
    const session = global.db.stickerSearch?.[m.sender];
    if (!session) return m.reply('❌ Tidak ada sesi pencarian aktif.');

    try {
        const prevPage = session.page - 1;
        if (prevPage < 1) return m.reply('❌ Anda sudah di halaman pertama.');
        const result = await scrapeSearch(session.query, prevPage);
        if (!result.packs.length) {
            return m.reply('❌ Halaman sebelumnya kosong.');
        }

        session.page = result.page;
        session.packs = result.packs;
        session.pagination = result.pagination;

        await sendStickerList(m, sock, session);
    } catch (err) {
        console.error(err);
        m.reply(`❌ Gagal memuat halaman: ${err.message}`);
    }
    break;
}

case 'stickerpilih': {
    const user = loadUserData(m.sender);
    if (!user?.harvest) return m.reply('❌ Belum terdaftar');
    if (!m.isOwner && user.harvest.limit.current <= 0)
        return m.reply(global.balasan.limitHabis);

    const session = global.db.stickerSearch?.[m.sender];
    if (!session) return m.reply('❌ Ketik *stikersearch <keyword>* dulu');

    let num = parseInt(m.text) || (() => {
        const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const txt = quoted?.conversation || quoted?.extendedTextMessage?.text;
        return txt && !isNaN(parseInt(txt)) ? parseInt(txt) : NaN;
    })();

    if (isNaN(num) || num < 1 || num > session.packs.length)
        return m.reply(`❌ Nomor 1-${session.packs.length}`);

    const pack = session.packs[num - 1];
    await m.reply(`⏳ Mengunduh *${pack.title}*...`);

    try {
        const detail = await scrapeStickerPack(pack.url);
        if (!detail.stickers.length)
            throw new Error('Tidak ada stiker');

        const buffers = [];

        for (const st of detail.stickers) {
            try {
                const img = await downloadBuffer(st.large);
                buffers.push(img); // ✅ FIX: JANGAN convert di sini
            } catch (e) {
                console.error('Gagal stiker:', e.message);
            }
        }

        if (!buffers.length)
            throw new Error('Gagal unduh semua stiker');

        await sendStickerPack(sock, m.from, buffers, {
            name: pack.title,
            author: pack.username
        });

        delete global.db.stickerSearch[m.sender];

        if (!m.isOwner) user.harvest.limit.current--;
        saveUserData(m.sender, user);

        await m.reply(`✅ Pack *${pack.title}* (${buffers.length} stiker) terkirim!`);

    } catch (err) {
        console.error(err);
        m.reply(`❌ Gagal: ${err.message}`);
    }
    break;
}

case 'stickerbatal': {
    if (global.db.stickerSearch?.[m.sender]) {
        delete global.db.stickerSearch[m.sender];
        m.reply('✅ Sesi pencarian stiker dibatalkan.');
    } else if (global.db.stickerPackSession?.[m.sender]) {
        delete global.db.stickerPackSession[m.sender];
        m.reply('✅ Sesi pengiriman stiker dibatalkan.');
    } else {
        m.reply('❌ Tidak ada sesi aktif.');
    }
    break;
}

case 'inspect': {
  if (!m.quoted) {
    return m.reply('Reply pesan yang mau di inspect');
  }

  // Jika hanya teks biasa, tolak
  if (m.quoted.mtype === 'conversation') {
    return m.reply('Ngapain jir😂');
  }

  try {
    // 1. Identifikasi tipe pesan (misal: 'interactiveMessage', 'imageMessage', dll)
    const type = m.quoted.mtype;
    
    // 2. Buat Plain Object (buang class instance & metadata)
    const rawContent = JSON.parse(JSON.stringify(m.quoted.message || m.quoted));

    // 3. Bungkus secara dinamis sesuai tipe pesan agar valid di proto.Message
    const messageStructure = {
      [type]: rawContent
    };

    // Validasi & Encode menggunakan proto
    const validatedContent = proto.Message.fromObject(messageStructure);
    const jsonContent = JSON.stringify(validatedContent, null, 2);

    const fileContent = `
const content = ${jsonContent}

const relayOption = {
  additionalNodes: [
    {
      tag: "biz",
      attrs: {},
      content: [
        {
          tag: "interactive",
          attrs: {
            type: "native_flow",
            v: "1"
          },
          content: [
            {
              tag: "native_flow",
              attrs: {
                v: "1",
                name: "mixed"
              }
            }
          ]
        }
      ]
    }
  ]
}

// Gunakan 'content' hasil inspect untuk relayMessage
await sock.relayMessage(m.chat, content, relayOption)
`.trim();

    await sock.sendMessage(
      m.chat,
      {
        document: Buffer.from(fileContent, 'utf-8'),
        fileName: `inspect-${type}.js`,
        mimetype: 'application/javascript'
      },
      { quoted: m }
    );

  } catch (e) {
    console.error(e);
    m.reply('Error inspect:\n' + e.message);
  }
}
break;

case 'run': {
  if (!m.isOwner) return m.reply(global.balasan.forOwner);
  if (!m.quoted) return m.reply('Reply file .js')
  if (m.quoted.mimetype !== 'application/javascript') {
    return m.reply('Harus file .js')
  }

  try {
    const buffer = await (m.quoted.download?.() || sock.downloadMediaMessage(m.quoted))
    let code = buffer.toString('utf-8').replace(/^\uFEFF/, '').trim()

    // eval dengan async wrapper
    await eval(`(async () => { ${code} })()`)

    m.reply('✅ Berhasil')
  } catch (e) {
    m.reply('Error:\n' + e.message)
  }
}
break

case 'updatenama': {
    const result = updateUserName(m.sender, m.pushName);
    if (result === null) {
        return m.reply('❌ Kamu belum terdaftar!');
    }
    m.reply(`✅ Nama berhasil diperbarui menjadi: *${result.name}*`);
    break;
}

case 'leaderboard':
case 'lb': {
    let users = [];
    try {
        // === Ambil metadata grup ===
        const isGroup = m.from.endsWith('@g.us'); // true jika di grup
        let groupName = 'Leaderboard Server';
        let groupImageUrl = 'https://telegra.ph/file/24fa902ead26340f3df2c.png'; // default
        let memberCount = 0;

        if (isGroup) {
            try {
                // Ambil metadata grup (nama & jumlah peserta)
                const groupMetadata = await sock.groupMetadata(m.from);
                groupName = groupMetadata.subject || groupName;
                memberCount = groupMetadata.participants ? groupMetadata.participants.length : 0;

                // Ambil foto grup (jika ada)
                try {
                    groupImageUrl = await sock.profilePictureUrl(m.from, 'image');
                } catch (e) {
                    // Tidak ada foto grup, tetap pakai default
                    console.log('Tidak ada foto grup:', e.message);
                }
            } catch (e) {
                console.error('Gagal ambil metadata grup:', e);
            }
        } else {
            groupName = 'Private Chat';
            memberCount = 1;
        }

        // === Kumpulkan data player dari database ===
        const directory = process.cwd();
        const tempDir = path.join(directory, 'temp');
        const playerFolder = path.join(tempDir, 'database', 'players');
        const mainFolder = path.join(tempDir, 'database');
        const databasePath = fs.existsSync(playerFolder) ? playerFolder : mainFolder;

        if (!fs.existsSync(databasePath)) {
            return m.reply('❌ Folder database tidak ditemukan.');
        }

        const files = fs.readdirSync(databasePath).filter(f => f.endsWith('.json'));
        if (files.length === 0) return m.reply('❌ Belum ada player terdaftar.');

        for (const file of files) {
            try {
                const filePath = path.join(databasePath, file);
                const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                if (data && data.harvest) {
                    users.push({
                        id: file.replace('.json', ''),
                        level: data.harvest.level || 1,
                        xp: data.harvest.exp || 0,
                        name: data.name || file.split('@')[0],
                    });
                }
            } catch (e) {
                console.warn(`Gagal baca ${file}:`, e.message);
            }
        }

        if (users.length === 0) return m.reply('❌ Tidak ada data player valid.');

        // Urutkan berdasarkan level & xp
        users.sort((a, b) => {
            if (a.level !== b.level) return b.level - a.level;
            return b.xp - a.xp;
        });

        const topPlayers = users.slice(0, 5);

        // Siapkan data untuk API
        const playersForApi = [];
        for (let i = 0; i < topPlayers.length; i++) {
            const p = topPlayers[i];
            const rank = i + 1;
            let avatarUrl = 'https://cdn.discordapp.com/embed/avatars/0.png';
            try {
                avatarUrl = await sock.profilePictureUrl(p.id, 'image').catch(() => null);
                if (!avatarUrl) avatarUrl = 'https://cdn.discordapp.com/embed/avatars/0.png';
            } catch (e) {}
            playersForApi.push({
                avatar: avatarUrl,
                username: p.id.split('@')[0],
                displayName: p.name || p.id.split('@')[0],
                level: p.level,
                xp: p.xp,
                rank: rank,
            });
        }

        // Header dengan data grup
        const header = {
            title: `🏆 ${groupName} 🏆`,
            image: groupImageUrl,
            subtitle: `👥 ${memberCount} members • Top ${topPlayers.length} Level & XP`,
        };

        // Panggil API leaderboard
        const apiUrl = 'https://peler-v2.vercel.app/api/canvas?type=leaderboard';
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                header: header,
                players: playersForApi,
                variant: 'default',
            }),
            redirect: 'manual',
        });

        if (response.status >= 300 && response.status < 400) {
            console.error(`Redirect detected: ${response.status} ${response.headers.get('location')}`);
            throw new Error(`API redirect (${response.status}). Pastikan URL endpoint benar.`);
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API error ${response.status}:`, errorText);
            throw new Error(`API error: ${response.status} - ${errorText}`);
        }

        const imageBuffer = Buffer.from(await response.arrayBuffer());

        // Kirim gambar leaderboard
        await sock.sendMessage(m.from, {
            image: imageBuffer,
            caption: `🏆 *LEADERBOARD ${groupName.toUpperCase()}* 🏆\n👥 *Total Member:* ${memberCount}\n📊 *Top ${topPlayers.length} Player* (Level & XP)\n✨ *Total Player Terdaftar:* ${users.length}`,
        }, { quoted: m });

    } catch (err) {
        console.error('Leaderboard image error:', err);
        // Fallback teks jika API gagal
        if (users.length === 0) {
            return m.reply('❌ Gagal mengambil data leaderboard.');
        }
        const sortedUsers = [...users].sort((a, b) => {
            if (a.level !== b.level) return b.level - a.level;
            return b.xp - a.xp;
        });
        const top5 = sortedUsers.slice(0, 5);
        let fallbackText = '🏆 *LEADERBOARD (Teks)* 🏆\n\n';
        top5.forEach((u, idx) => {
            fallbackText += `${idx+1}. @${u.id.split('@')[0]} - Level ${u.level} (XP: ${u.xp})\n`;
        });
        fallbackText += `\n📊 Total Player: ${users.length}\n❌ Gagal memuat gambar leaderboard.\n❌ Detail: ${err.message}`;
        m.reply(fallbackText);
    }
    break;
}

case 'level': {
    // Target bisa mention atau sender
    let target = m.mentionedJid?.[0] || m.sender;
    
    // Gunakan loadUserData yang sudah ada di bot kamu
    let user = loadUserData(target);
    
    if (!user || !user.harvest) {
        return m.reply('❌ Kamu atau user yang dituju belum terdaftar!');
    }

    // Pastikan stats ada (opsional, seperti di handleLevel)
    if (!user.harvest.stats) {
        user.harvest.stats = {
            hp: 100,
            dmg: 10,
            def: 5,
            hpMax: 100
        };
        saveUserData(target, user);
    }

    const level = user.harvest.level || 1;
    const currentExp = user.harvest.exp || 0;
    const requiredExp = getExperienceNeeded(level + 1);
    const role = getCurrentRole(level);

    // Hitung peringkat menggunakan fungsi baru
    const { rank, totalPlayers } = await getUserRankByLevel(target);

    // Ambil foto profil (opsional)
    const avatarUrl = await sock.profilePictureUrl(target, 'image').catch(() =>
        'https://telegra.ph/file/24fa902ead26340f3df2c.png'
    );

    const displayName = m.pushName || user.name || target.split('@')[0];
    const username = target.split('@')[0];
    const status = 'online';
    const background = '%232C2F33';

    // API untuk generate gambar rank (pastikan endpoint ini masih valid)
    const apiUrl = `https://peler-m423.vercel.app/api/canvas?type=rank&displayName=${encodeURIComponent(displayName)}&username=${encodeURIComponent(username)}&avatar=${encodeURIComponent(avatarUrl)}&currentXP=${currentExp}&requiredXP=${requiredExp}&level=${level}&rank=${rank}&status=${status}&background=${background}`;

    const caption = `🏆 *LEVEL ${level}* (${role})\n📊 *XP:* ${currentExp}/${requiredExp}\n🎖️ *Peringkat:* ${rank} dari ${totalPlayers} pemain`;

    try {
        await sock.sendMessage(m.from, {
            image: { url: apiUrl },
            caption: caption
        }, { quoted: m });
    } catch (err) {
        console.error('Gagal mengirim gambar rank:', err);
        // Fallback teks
        const remaining = requiredExp - currentExp;
        const progress = Math.floor((currentExp / requiredExp) * 100);
        const progressBar = '▓'.repeat(Math.floor(progress / 10)) + '░'.repeat(10 - Math.floor(progress / 10));
        const teks = `🏆 *LEVEL STATUS* 🏆\n\n➤ *Level:* ${level} (${role})\n➤ *XP:* ${currentExp}/${requiredExp}\n➤ *Peringkat:* ${rank} dari ${totalPlayers} pemain\n➤ *Butuh:* ${remaining} XP lagi\n${progressBar} (${progress}%)\n\n📌 *Gagal memuat gambar rank, menampilkan teks biasa.*`;
        m.reply(teks);
    }
    break;
}

// ========== MODIFIKASI CASE 'whatanime' ==========
case 'whatanime':
case 'wait':
case 'source': {
    const targetMsg = m.quoted ? m.quoted : m;

    if (targetMsg.mtype !== 'imageMessage') {
        return m.reply('❌ Silakan kirim atau reply ke gambar anime.');
    }

    const buffer = await downloadMediaMessage(targetMsg);

    m.reply(global.balasan.tungguin);
    await sleep(1500);

    try {
        // Kirim request ke trace.moe
        let body;
        let headers = {};

        if (typeof FormData !== 'undefined') {
            const formData = new FormData();
            formData.append('image', new Blob([buffer]), 'anime.jpg');
            body = formData;
        } else {
            const boundary = '----FormBoundary' + Math.random().toString(16).slice(2);
            const parts = [
                `--${boundary}\r\n`,
                `Content-Disposition: form-data; name="image"; filename="anime.jpg"\r\n`,
                `Content-Type: application/octet-stream\r\n\r\n`,
            ];
            const footer = `\r\n--${boundary}--\r\n`;
            body = Buffer.concat([
                Buffer.from(parts.join(''), 'utf-8'),
                buffer,
                Buffer.from(footer, 'utf-8'),
            ]);
            headers['Content-Type'] = `multipart/form-data; boundary=${boundary}`;
        }

        const response = await fetch('https://api.trace.moe/search', {
            method: 'POST',
            headers,
            body,
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`API mengembalikan HTML (bukan JSON). Response: ${text.slice(0, 200)}`);
        }

        const json = await response.json();

        if (!json.result || json.result.length === 0) {
            return m.reply('❌ Tidak ditemukan hasil untuk gambar ini.');
        }

        // ✅ PASTIKAN global.db.whatanime ADA SEBAGAI OBJEK
        if (!global.db.whatanime) global.db.whatanime = {};

        // Simpan hasil pencarian ke sesi pengguna
        global.db.whatanime[m.sender] = {
            results: json.result,
            index: 0,
            total: json.result.length
        };

        // Kirim halaman pertama
        await sendWhatAnimePage(m, sock);
    } catch (e) {
        console.error(e);
        return m.reply(`❌ Gagal mengambil informasi anime: ${e.message}`);
    }
    return;
}
break;

// ========== CASE UNTUK NEXT ==========
case 'whatanimenext': {
    // Pastikan objek global.db.whatanime ada
    if (!global.db.whatanime) global.db.whatanime = {};
    
    const data = global.db.whatanime[m.sender];
    if (!data || !data.results || data.results.length === 0) {
        return m.reply(`❌ Tidak ada sesi aktif. Silakan cari dengan *${m.prefix}whatanime* terlebih dahulu.`);
    }
    // Pastikan indeks tidak melebihi total
    if (data.index >= data.total) {
        delete global.db.whatanime[m.sender];
        return m.reply(`⛔ Ini adalah hasil terakhir. Sesi diakhiri.`);
    }
    await sendWhatAnimePage(m, sock);
}
break;

// ========== CASE UNTUK SELECT LANGSUNG ==========
case 'whatanimeselect': {
    // Pastikan objek global.db.whatanime ada
    if (!global.db.whatanime) global.db.whatanime = {};
    
    const nomor = parseInt(m.text);
    if (isNaN(nomor) || nomor < 1) {
        return m.reply(`❌ Format salah. Gunakan *${m.prefix}whatanimeselect <nomor>*\nContoh: *${m.prefix}whatanimeselect 2*`);
    }

    const data = global.db.whatanime[m.sender];
    if (!data || !data.results || data.results.length === 0) {
        return m.reply(`❌ Tidak ada sesi aktif. Silakan cari dengan *${m.prefix}whatanime* terlebih dahulu.`);
    }

    if (nomor > data.total) {
        return m.reply(`❌ Nomor hanya antara 1 sampai ${data.total}.`);
    }

    // Set indeks ke nomor yang dipilih (nomor-1 karena array 0-based)
    data.index = nomor - 1;
    await sendWhatAnimePage(m, sock);
}
break;

case 'tourl': {
    // Ambil pesan yang di-quote atau pesan asli
    const targetMsg = m.quoted ? m.quoted : m;
    const mtype = targetMsg.mtype;

    // Daftar tipe media yang didukung
    const supportedTypes = ['imageMessage', 'videoMessage', 'stickerMessage'];
    if (!supportedTypes.includes(mtype)) {
        return m.reply('❌ Silakan kirim atau reply ke gambar, video/GIF, atau stiker.');
    }

    // Deteksi apakah video merupakan GIF (animasi)
    let isGif = false;
    if (mtype === 'videoMessage' && targetMsg.msg?.isAnimated === true) {
        isGif = true;
    }

    // Tentukan ekstensi file berdasarkan tipe
    let ext = '';
    if (mtype === 'imageMessage') ext = '.jpg';
    else if (mtype === 'videoMessage') ext = isGif ? '.gif' : '.mp4';
    else if (mtype === 'stickerMessage') ext = '.webp';

    // Unduh media menjadi buffer
    let buffer;
    try {
        buffer = await downloadMediaMessage(targetMsg);
        if (!buffer || buffer.length === 0) throw new Error('Buffer kosong');
    } catch (downloadErr) {
        console.error(downloadErr);
        return m.reply('❌ Gagal mengunduh media.');
    }

    try {
        // Upload ke catbox (atau service lain)
        const mediaUrl = await uploadMedia(buffer, `media${ext}`);
        await m.reply(`✅ Berhasil diupload!\n🔗 URL: ${mediaUrl}`);
    } catch (error) {
        console.error(error);
        return m.reply(`❌ Gagal mengupload media: ${error.message}`);
    }
    return;
}
break;

case 'kick': {
    if (!m.isGroup) return m.reply('❌ Perintah ini hanya dapat digunakan di grup!');
    if (!m.isAdmin && !m.isOwner) return m.reply(global.balasan.forAdmin);
    if (!m.isBotAdmin) return m.reply(global.balasan.botNotAdmin);

    let targets = [];
    if (m.mentions?.length) targets.push(...m.mentions);
    if (m.args.length && !m.mentions.length && !m.quoted) targets.push(...m.args);
    if (m.quoted?.sender) targets.push(m.quoted.sender);
    if (!targets.length) targets.push(m.sender);

    // Ubah semua ke JID (seadanya)
    targets = targets.map(t => getActualJID(t));
    
    const botNumber = sock.decodeJid(sock.user?.id)

    const kicked = [];
    const failed = [];
    const botJID = getActualJID(botNumber);

    for (const id of targets) {
        if (!id) continue;
        if (id === botJID) {
            failed.push(id);
            continue;
        }
        try {
            await sock.groupParticipantsUpdate(m.from, [id], 'remove');
            kicked.push(id);
        } catch (err) {
            console.error('Gagal kick:', err);
            failed.push(id);
        }
    }

    let msg = '';
    if (kicked.length) msg += `✅ Berhasil mengeluarkan:\n${kicked.map(x => `@${x.split('@')[0]}`).join('\n')}\n\n`;
    if (failed.length) msg += `❌ Gagal mengeluarkan:\n${failed.map(x => `@${x.split('@')[0]}`).join('\n')}`;
    if (!msg) msg = '⚠️ Tidak ada perubahan.';

    const mentions = [...kicked, ...failed];
    m.reply(msg.trim(), null, { mentions });
}
break;

case 'warn': {
    // Validasi grup dan hak akses
    if (!m.isGroup) return m.reply('❌ Perintah ini hanya dapat digunakan di grup!');
    if (!m.isAdmin && !m.isOwner) return m.reply(global.balasan.forAdmin);

    // --- Kumpulkan target dan catatan ---
    let targets = [];
    let note = '';
    
    const botNumber = sock.decodeJid(sock.user?.id)

    // Prioritaskan mention
    if (m.mentions?.length) {
        targets.push(...m.mentions);
        // catatan diambil dari argumen setelah mention
        const remainingArgs = m.args.filter(arg => !arg.startsWith('@') && !targets.includes(arg));
        if (remainingArgs.length) note = remainingArgs.join(' ');
    } 
    // Jika ada quoted, target adalah pengirim pesan yang di-quote
    else if (m.quoted?.sender) {
        targets.push(m.quoted.sender);
        // catatan bisa dari argumen atau teks quote
        if (m.args.length) note = m.args.join(' ');
        else if (m.quoted.text) note = 'Tidak ada';
    }
    // Jika tidak ada mention dan tidak ada quoted, cek argumen pertama apakah nomor
    else if (m.args.length) {
        const firstArg = m.args[0];
        const possibleNumber = firstArg.replace(/[^0-9]/g, '');
        if (possibleNumber.length >= 10) {
            // argumen pertama adalah nomor (target)
            targets.push(possibleNumber + '@s.whatsapp.net');
            if (m.args.length > 1) note = m.args.slice(1).join(' ');
        } else {
            // tidak ada target yang valid, warn diri sendiri dengan catatan dari semua argumen
            targets.push(m.sender);
            note = m.args.join(' ');
        }
    } 
    // Jika tidak ada target sama sekali, warn diri sendiri
    else {
        targets.push(m.sender);
    }

    // Ubah semua ke JID (seadanya)
    targets = targets.map(t => getActualJID(t));

    // Inisialisasi data grup
    const gcId = m.from;
    if (!global.db.grups[gcId]) global.db.grups[gcId] = {};
    const grup = global.db.grups[gcId];
    if (!grup.warns) grup.warns = {};

    const botJID = botNumber; // langsung ambil JID bot tanpa pembersihan
    const warnedDetails = [];
    const kicked = [];
    const failedKick = [];

    // Fungsi untuk mendapatkan nama tampilan (nomor atau 'Seseorang')
    const getDisplayName = (id) => {
        if (id && id.includes('@')) return id.split('@')[0];
        return 'Seseorang';
    };

    for (const id of targets) {
        if (!id) continue;
        if (id === botJID) {
            m.reply('⚠️ Bot tidak bisa di-warn.');
            continue;
        }

        if (!grup.warns[id]) grup.warns[id] = { count: 0, notes: [] };
        const userWarn = grup.warns[id];
        userWarn.count += 1;
        if (note) userWarn.notes.push({ time: Date.now(), note });

        if (userWarn.count >= MAX_WARN) {
            if (!m.isBotAdmin) {
                m.reply(`⚠️ Bot bukan admin, tidak bisa mengeluarkan @${getDisplayName(id)} meskipun sudah mencapai ${MAX_WARN} peringatan.`, null, { mentions: [id] });
                delete grup.warns[id];
                continue;
            }
            try {
                await sock.groupParticipantsUpdate(m.from, [id], 'remove');
                kicked.push(id);
                delete grup.warns[id];
            } catch (err) {
                console.error('Gagal kick setelah warn:', err);
                failedKick.push(id);
                warnedDetails.push({ id, count: userWarn.count, note });
            }
        } else {
            warnedDetails.push({ id, count: userWarn.count, note });
        }
    }

    // Buat pesan balasan
    let msg = '';
    if (warnedDetails.length) {
        msg += '⚠️ *Peringatan diberikan kepada:*\n';
        warnedDetails.forEach(w => {
            msg += `@${getDisplayName(w.id)} (${w.count}/${MAX_WARN})`;
            if (w.note) msg += ` - Catatan: ${w.note}`;
            msg += '\n';
        });
        msg += '\n';
    }
    if (kicked.length) {
        msg += `✅ *User mencapai batas (${MAX_WARN}) dan dikeluarkan:*\n`;
        kicked.forEach(id => {
            msg += `@${getDisplayName(id)}\n`;
        });
        msg += '\n';
    }
    if (failedKick.length) {
        msg += `⚠️ *Gagal mengeluarkan user (bot bukan admin):*\n`;
        failedKick.forEach(id => {
            msg += `@${getDisplayName(id)}\n`;
        });
        msg += '\n';
    }
    if (!msg) msg = '⚠️ Tidak ada perubahan.';

    const mentions = [...warnedDetails.map(w => w.id), ...kicked, ...failedKick];
    m.reply(msg.trim(), null, { mentions });
}
break;

case 'listwarn': {
    if (!m.isGroup) return m.reply('❌ Perintah ini hanya dapat digunakan di grup!');
    if (!m.isAdmin && !m.isOwner) return m.reply(global.balasan.forAdmin);

    const gcId = m.from;
    if (!global.db.grups[gcId]) global.db.grups[gcId] = {};
    const warns = global.db.grups[gcId].warns || {};

    // Opsi menampilkan semua catatan
    const showAllDetails = m.args.includes('all') || m.args.includes('detail');

    // Cek apakah ada target (mention atau quoted)
    let target = null;
    if (m.mentions?.length) target = getActualJID(m.mentions[0]);
    else if (m.quoted?.sender) target = getActualJID(m.quoted.sender);
    else if (m.args.length && !m.mentions.length && !showAllDetails) {
        const argJID = m.args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        if (argJID.endsWith('@s.whatsapp.net')) target = argJID;
    }

    // Jika ada target spesifik, tampilkan detail user tersebut
    if (target) {
        const userWarn = warns[target];
        if (!userWarn || userWarn.count === 0) {
            return m.reply(`ℹ️ @${target.split('@')[0]} tidak memiliki peringatan.`, null, { mentions: [target] });
        }

        let detail = `⚠️ *Detail Peringatan untuk @${target.split('@')[0]}*\n`;
        detail += `Total: ${userWarn.count} / ${MAX_WARN}\n\n`;
        if (userWarn.notes && userWarn.notes.length) {
            detail += '*Catatan:*\n';
            userWarn.notes.forEach((note, idx) => {
                const date = new Date(note.time).toLocaleString('id-ID');
                detail += `${idx+1}. ${note.note || '-'} (${date})\n`;
            });
        } else {
            detail += '*Tidak ada catatan.*';
        }
        return m.reply(detail, null, { mentions: [target] });
    }

    // Jika tidak ada target dan tidak meminta detail semua, tampilkan ringkasan
    if (!showAllDetails) {
        const entries = Object.entries(warns).filter(([_, data]) => data.count > 0);
        if (entries.length === 0) {
            return m.reply('✅ Tidak ada peringatan di grup ini.');
        }

        let list = `📋 *Daftar Peringatan Grup* (Maks: ${MAX_WARN})\n\n`;
        const mentions = [];
        entries.forEach(([jid, data], idx) => {
            list += `${idx+1}. @${jid.split('@')[0]} - ${data.count} peringatan\n`;
            mentions.push(jid);
        });
        list += `\n- Gunakan ${m.prefix}listwarn all untuk melihat detail catatan.\n- Gunakan ${m.prefix}delwarn <nomor> untuk menghapus peringatan.`;
        return m.reply(list, null, { mentions });
    }

    // Tampilkan semua catatan (showAllDetails true)
    const entries = Object.entries(warns).filter(([_, data]) => data.count > 0);
    if (entries.length === 0) {
        return m.reply('✅ Tidak ada peringatan di grup ini.');
    }

    let fullDetail = `📋 *Semua Catatan Peringatan Grup* (Maks: ${MAX_WARN})\n\n`;
    const mentions = [];
    for (const [jid, data] of entries) {
        fullDetail += `👤 @${jid.split('@')[0]} - Total: ${data.count}/${MAX_WARN}\n`;
        mentions.push(jid);
        if (data.notes && data.notes.length) {
            data.notes.forEach((note, idx) => {
                const date = new Date(note.time).toLocaleString('id-ID');
                fullDetail += `   ${idx+1}. ${note.note || '-'} (${date})\n`;
            });
        } else {
            fullDetail += `   *Tidak ada catatan.*\n`;
        }
        fullDetail += '\n';
    }
    fullDetail += `- Gunakan ${m.prefix}delwarn <nomor> untuk menghapus peringatan.`;
    m.reply(fullDetail.trim(), null, { mentions });
}
break;

case 'delwarn': {
    // Validasi grup dan hak akses
    if (!m.isGroup) return m.reply('❌ Perintah ini hanya dapat digunakan di grup!');
    if (!m.isAdmin && !m.isOwner) return m.reply(global.balasan.forAdmin);

    const gcId = m.from;
    if (!global.db.grups[gcId]) global.db.grups[gcId] = {};
    const grup = global.db.grups[gcId];
    if (!grup.warns) grup.warns = {};

    // --- Gunakan fungsi normalisasi yang sama dengan warn & listwarn ---
    // (asumsi getActualJID sudah tersedia dan konsisten)
    const normalize = (jid) => getActualJID(jid);

    // Ambil daftar peringatan yang aktif (count > 0) dan urutkan berdasarkan JID
    const activeWarns = Object.entries(grup.warns)
        .filter(([_, data]) => data.count > 0)
        .sort(([a], [b]) => a.localeCompare(b));

    const getJidByIndex = (index) => {
        const idx = parseInt(index) - 1;
        if (isNaN(idx) || idx < 0 || idx >= activeWarns.length) return null;
        return activeWarns[idx][0];
    };

    let rawTargets = [];

    // Prioritaskan mention
    if (m.mentions?.length) {
        rawTargets.push(...m.mentions);
    }
    // Jika ada quoted, target adalah pengirim pesan yang di-quote
    else if (m.quoted?.sender) {
        rawTargets.push(m.quoted.sender);
    }
    // Proses argumen
    else if (m.args.length) {
        const arg = m.args.join(' ');
        // Cek apakah argumen berupa daftar indeks dipisah koma atau spasi
        if (arg.includes(',') || /^\d+(\s+\d+)*$/.test(arg)) {
            const parts = arg.split(/[ ,]+/);
            for (const part of parts) {
                const jid = getJidByIndex(part);
                if (jid) rawTargets.push(jid);
                else m.reply(`⚠️ Indeks ${part} tidak valid atau tidak memiliki peringatan.`);
            }
        } else {
            // Anggap sebagai nomor telepon
            const possibleNumber = arg.replace(/[^0-9]/g, '');
            if (possibleNumber.length >= 10) {
                rawTargets.push(possibleNumber + '@s.whatsapp.net');
            } else {
                return m.reply('❌ Format tidak dikenali. Gunakan mention, nomor, atau indeks (contoh: !delwarn 1,2,3)');
            }
        }
    } else {
        return m.reply('❌ Tidak ada target yang ditentukan. Gunakan mention, nomor, atau indeks.');
    }

    // Normalisasi JID dan hapus duplikat
    const targets = [...new Set(rawTargets.map(normalize))].filter(jid => jid);

    if (targets.length === 0) {
        return m.reply('❌ Tidak ada target valid yang ditemukan.');
    }

    // Ambil JID bot dengan cara yang sama seperti di case 'warn'
    const botJID = sock.decodeJid(sock.user?.id);

    const removed = [];
    const notFound = [];

    for (const jid of targets) {
        if (jid === botJID) {
            m.reply('⚠️ Tidak bisa menghapus peringatan bot.');
            continue;
        }
        if (grup.warns[jid] && grup.warns[jid].count > 0) {
            delete grup.warns[jid];
            removed.push(jid);
        } else {
            notFound.push(jid);
        }
    }

    let msg = '';
    if (removed.length) {
        msg += `✅ Berhasil menghapus semua peringatan untuk:\n`;
        removed.forEach(jid => {
            msg += `@${jid.split('@')[0]}\n`;
        });
    }
    if (notFound.length) {
        msg += `\n⚠️ Tidak memiliki peringatan:\n`;
        notFound.forEach(jid => {
            msg += `@${jid.split('@')[0]}\n`;
        });
    }
    if (!msg) msg = '⚠️ Tidak ada perubahan.';

    const mentions = [...removed, ...notFound];
    m.reply(msg.trim(), null, { mentions });
}
break;

case 'delete':
case 'd':
case 'del': {
    if (!m.isGroup) return;
    if (!m.quoted) return m.reply('Kak, kamu perlu membalas pesan yang mau dihapus ya! 🤔');

    const botNumber = sock.decodeJid(sock.user?.id)

    // Admin/owner bisa hapus pesan siapa pun (asal bot admin)
    if (m.isAdmin || m.isOwner) {
        if (!m.isBotAdmin) return m.reply(global.balasan.botNotAdmin);
        try {
            await sock.sendMessage(m.from, {
                delete: {
                    remoteJid: m.from,
                    id: m.quoted.id,
                    participant: m.quoted.sender
                }
            });
        } catch (err) {
            console.error('Gagal menghapus pesan:', err);
            m.reply('❌ Gagal menghapus pesan. Mungkin bot tidak memiliki izin.');
        }
        return;
    }

    // Non-admin: hanya bisa hapus pesan bot sendiri
    if (m.quoted.sender !== botNumber) {
        return m.reply('❌ Kamu bukan admin, hanya bisa menghapus pesan bot sendiri.');
    }

    try {
        await sock.sendMessage(m.from, {
            delete: {
                remoteJid: m.from,
                id: m.quoted.id,
                participant: m.quoted.sender
            }
        });
    } catch (err) {
        console.error('Gagal menghapus pesan bot:', err);
        m.reply('❌ Gagal menghapus pesan.');
    }
}
break;

case 'statistik':
case 'stats':
case 'top': {
    if (!m.isGroup) return m.reply('❌ Perintah ini hanya dapat digunakan di dalam grup.');

    try {
        await m.reply('⏳ Menghitung statistik grup...');

        // Ambil metadata grup
        const groupMetadata = await sock.groupMetadata(m.from);
        const participants = groupMetadata.participants;
        const totalMember = participants.length;

        // Ambil data statistik grup ini
        const groupStats = global.db.statistik?.[m.from] || {};

        // Gabungkan dengan data partisipan
        let list = participants.map(p => {
            // const jid = p.id;
            const jid = p.phoneNumber;
            const data = groupStats[jid] || { count: 0, last: null };
            return {
                jid,
                count: data.count,
                last: data.last,
                isAdmin: p.admin === 'admin' || p.admin === 'superadmin'
            };
        });

        // Urutkan: count terbanyak, lalu last terbaru
        list.sort((a, b) => b.count - a.count || (b.last || 0) - (a.last || 0));

        let teks = `📊 *STATISTIK PESAN GRUP*\n👥 Total Member: ${totalMember} orang\n\n`;
        const mentions = [];

        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            const rank = i + 1;

            // Medali untuk 3 besar
            let medal;
            if (rank === 1) medal = '🥇';
            else if (rank === 2) medal = '🥈';
            else if (rank === 3) medal = '🥉';
            else medal = rank + '.';

            const crown = item.isAdmin ? '👑' : '';
            const chatIcon = item.count > 0 ? '💬' : '🤐';

            // Nomor tanpa @s.whatsapp.net
            const userNumber = item.jid.split('@')[0];
            mentions.push(item.jid); // untuk tag yang benar

            teks += `${medal} ${crown} ${chatIcon} @${userNumber}\n`;
            teks += `   📊 ${item.count} pesan`;

            if (item.last) {
                const diffHours = Math.floor((Date.now() - item.last) / 3600000);
                let waktu;
                if (diffHours < 1) waktu = 'kurang dari 1 jam';
                else if (diffHours < 24) waktu = `${diffHours} jam`;
                else {
                    const days = Math.floor(diffHours / 24);
                    waktu = `${days} hari`;
                }
                teks += `\n   ⏰ Terakhir: ${waktu} yang lalu`;
            }

            teks += '\n\n';
        }

        // Hitung ringkasan
        const totalPesan = list.reduce((sum, item) => sum + item.count, 0);
        const aktif = list.filter(item => item.count > 0).length;
        const rataRata = aktif ? (totalPesan / aktif).toFixed(0) : 0;
        const top1 = list[0] || { jid: '', count: 0 };
        const top1Number = top1.jid ? top1.jid.split('@')[0] : '';

        teks += `📈 *RINGKASAN:*\n`;
        teks += `💬 Pengguna aktif: ${aktif}/${totalMember}\n`;
        teks += `📨 Total pesan: ${totalPesan.toLocaleString()}\n`;
        teks += `📊 Rata-rata: ${rataRata} pesan/orang aktif\n`;
        teks += `🏆 Top 1: @${top1Number} (${top1.count} pesan)\n\n`;
        teks += `_Data real-time • Update otomatis_`;

        // Tambahkan mention untuk top1 jika ada
        if (top1.jid) mentions.push(top1.jid);

        // Kirim dengan mention menggunakan sendMessage (agar tag berfungsi)
        await sock.sendMessage(m.from, { text: teks, mentions }, { quoted: m });

    } catch (err) {
        console.error('Error statistik grup:', err);
        m.reply('❌ Terjadi kesalahan saat mengambil statistik grup.');
    }
    break;
}

case 'resetai': {
  const chatId = m.from; // ID grup atau private chat
  
  // Pastikan properti global.db.grups ada
  if (!global.db.grups) global.db.grups = {};
  
  // Pastikan objek untuk chatId ada
  if (!global.db.grups[chatId]) {
    global.db.grups[chatId] = {};
  }
  
  // Cek apakah ada sessionId tersimpan
  if (global.db.grups[chatId].aiSessionId) {
    // Hapus sessionId
    delete global.db.grups[chatId].aiSessionId;
    
    m.reply('✅ Sesi AI untuk chat ini berhasil direset. Mulai percakapan baru!');
  } else {
    m.reply('Tidak ada sesi AI yang aktif untuk chat ini.');
  }
}
break;

// ===================== ANTI TOXIC =====================

case 'antitoxic1': { // Otomatis
    if (!m.isGroup) return m.reply("Hanya untuk grup!")
    if (!global.db.antiToxic) global.db.antiToxic = {}
    
    let groupId = m.from
    let status = global.db.antiToxic[groupId]?.enabled || false
    
    global.db.antiToxic[groupId] = {
        ...global.db.antiToxic[groupId],
        enabled: !status
    }
    
    m.reply(`✅ Anti Toxic ${!status ? "diaktifkan" : "dinonaktifkan"} di grup ini`)
}
break

case 'antitoxic': { // Switch on off
    if (!m.isGroup) return m.reply("Hanya untuk grup!")
    if (!global.db.antiToxic) global.db.antiToxic = {}

    let groupId = m.from
    let arg = m.text?.toLowerCase()

    if (arg === "on") {
        global.db.antiToxic[groupId] = { ...global.db.antiToxic[groupId], enabled: true }
        return m.reply("✅ Anti Toxic diaktifkan")
    } else if (arg === "off") {
        global.db.antiToxic[groupId] = { ...global.db.antiToxic[groupId], enabled: false }
        return m.reply("❌ Anti Toxic dinonaktifkan")
    }

    // Toggle jika tanpa argumen
    let status = global.db.antiToxic[groupId]?.enabled || false
    global.db.antiToxic[groupId] = { ...global.db.antiToxic[groupId], enabled: !status }
    m.reply(`✅ Anti Toxic ${!status ? "diaktifkan" : "dinonaktifkan"}`)
}
break

case 'addtoxic': {
    if (!m.isGroup) return m.reply("Hanya untuk grup!")
    if (!m.text) return m.reply(`Format:\n${m.prefix + command} kata1,kata2,kata3`)
    
    if (!global.db.antiToxic) global.db.antiToxic = {}
    if (!global.db.antiToxic[m.from]) global.db.antiToxic[m.from] = { enabled: false, words: [] }
    if (!global.db.antiToxic[m.from].words) global.db.antiToxic[m.from].words = []
    
    let newWords = m.text.split(",").map(w => w.trim().toLowerCase()).filter(Boolean)
    let added = []
    let duplicate = []
    
    for (let word of newWords) {
        if (global.db.antiToxic[m.from].words.includes(word)) {
            duplicate.push(word)
        } else {
            global.db.antiToxic[m.from].words.push(word)
            added.push(word)
        }
    }
    
    let reply = ""
    if (added.length) reply += `✅ Berhasil ditambah:\n${added.map(w => `- ${w}`).join("\n")}\n\n`
    if (duplicate.length) reply += `⚠️ Sudah ada:\n${duplicate.map(w => `- ${w}`).join("\n")}`
    
    m.reply(reply.trim())
}
break

case 'deltoxic': {
    if (!m.isGroup) return m.reply("Hanya untuk grup!")
    if (!m.text) return m.reply(`Format:\n${m.prefix + command} kata1,kata2,kata3`)
    
    if (!global.db.antiToxic?.[m.from]?.words?.length) return m.reply("Belum ada kata toxic di grup ini")
    
    let delWords = m.text.split(",").map(w => w.trim().toLowerCase()).filter(Boolean)
    let deleted = []
    let notFound = []
    
    for (let word of delWords) {
        let idx = global.db.antiToxic[m.from].words.indexOf(word)
        if (idx !== -1) {
            global.db.antiToxic[m.from].words.splice(idx, 1)
            deleted.push(word)
        } else {
            notFound.push(word)
        }
    }
    
    let reply = ""
    if (deleted.length) reply += `✅ Berhasil dihapus:\n${deleted.map(w => `- ${w}`).join("\n")}\n\n`
    if (notFound.length) reply += `❌ Tidak ditemukan:\n${notFound.map(w => `- ${w}`).join("\n")}`
    
    m.reply(reply.trim())
}
break

case 'listtoxic': {
    if (!m.isGroup) return m.reply("Hanya untuk grup!")
    
    let data = global.db.antiToxic?.[m.from]
    if (!data?.words?.length) return m.reply("Belum ada kata toxic di grup ini")
    
    let status = data.enabled ? "✅ Aktif" : "❌ Nonaktif"
    let teks = `*LIST KATA TOXIC*\nStatus: ${status}\n\n`
    data.words.forEach((w, i) => {
        teks += `${i + 1}. ${w}\n`
    })
    
    m.reply(teks.trim())
}
break

case 'addrespon':
case 'adrespon': {
try {

if (!global.db.responBtn) global.db.responBtn = []

let text = m.text || ""
let [trigger, rest] = text.split("|")

if (!trigger) return m.reply(`Format salah\n\n${m.prefix + command} trigger|pesan [btn] (${m.prefix}cmd)`)

let buttons = []
let caption = rest || ""

let regex = /\[(.*?)\]\s*\((.*?)\)/g
let match

while ((match = regex.exec(rest)) !== null) {
buttons.push({
text: match[1],
cmd: match[2]
})
}

caption = rest.replace(regex, "").trim()

let mediaPath = null
let type = "text"

const targetMsg = m.quoted ? m.quoted : m
let mime = (targetMsg.msg || targetMsg).mimetype || ""

if (/image|video/.test(mime)) {

let media = await downloadMediaMessage(targetMsg)

let ext = mime.split("/")[1]
let file = `${responBtn}/${trigger}.${ext}`

fs.writeFileSync(file, media)

mediaPath = file

if (/image/.test(mime)) type = "image"
else if (/video/.test(mime)) type = "video"

}

global.db.responBtn.push({
trigger: trigger.toLowerCase(),
text: caption,
buttons,
media: mediaPath,
type
})

m.reply("✅ Respon berhasil disimpan")

} catch(e){
console.log(e)
m.reply("Error menyimpan respon")
}
}
break

case 'listrespon': {

if (!global.db.responBtn || global.db.responBtn.length === 0)
return m.reply("Belum ada respon")

let teks = "*LIST RESPON*\n\n"

global.db.responBtn.forEach((v,i)=>{
teks += `${i+1}. ${v.trigger}\n`
})

m.reply(teks)

}
break

case 'delrespon': {

if (!m.text) return m.reply(`Contoh:\n${m.prefix + command} 1\n${m.prefix + command} 1,2,3`)

let nums = m.text.split(",").map(v => parseInt(v.trim()) - 1)

nums.sort((a,b) => b - a)

for (let n of nums) {

if (global.db.responBtn[n]) {

let data = global.db.responBtn[n]

if (data.media) {
try {
fs.unlinkSync(data.media)
} catch (e) {}
}

global.db.responBtn.splice(n, 1)

}

}

m.reply("✅ Respon berhasil dihapus")

}
break

case 'fetch':
case 'get': {

if (!m.text) return m.reply(`❌ Masukkan URL\n\nContoh:\n${m.prefix + command} https://api.github.com`)

// Ekstrak URL dari teks, abaikan karakter yang menempel
const urlMatch = m.text.match(/https?:\/\/[^\s'"<>)\]},]+/i)

if (!urlMatch) {
    return m.reply('❌ URL harus diawali http:// atau https://')
}

// Bersihkan karakter yang sering menempel di akhir URL
let url = urlMatch[0].replace(/['".,;!?)\]}>]+$/, '')

try {

const res = await fetch(url)

const type = res.headers.get('content-type') || ''
const size = res.headers.get('content-length')

if (size && Number(size) > 100 * 1024 * 1024) {
    return m.reply(`❌ File terlalu besar\nSize: ${(Number(size) / 1024 / 1024).toFixed(2)} MB`)
}

const buffer = await res.buffer()

// WEBP
if (/webp/.test(type)) {
    return sock.sendMessage(m.from, {
        sticker: buffer
    }, { quoted: m })
}

// IMAGE
if (/image/.test(type)) {
    return sock.sendMessage(m.from, {
        image: buffer,
        caption: url
    }, { quoted: m })
}

// VIDEO
if (/video/.test(type)) {
    return sock.sendMessage(m.from, {
        video: buffer,
        caption: url
    }, { quoted: m })
}

// AUDIO
if (/audio/.test(type)) {
    return sock.sendMessage(m.from, {
        audio: buffer,
        mimetype: 'audio/mpeg'
    }, { quoted: m })
}

// JSON / TEXT
if (/json|text/.test(type)) {
    let txt = buffer.toString()

    try {
        txt = format(JSON.parse(txt))
    } catch {}

    return m.reply(txt.slice(0, 65536))
}

// OTHER FILE
const fileName = url.split('/').pop().split('?')[0] || 'file'
return sock.sendMessage(m.from, {
    document: buffer,
    mimetype: type || 'application/octet-stream',
    fileName: fileName
}, { quoted: m })

} catch (err) {

console.log('Fetch Error:', err)
m.reply(`❌ Gagal mengambil URL\n\nURL: ${url}\nError: ${err.message}`)

}

}
break
    
case 'addcmdstick': {
  try {
    if (!m.quoted || m.quoted.mtype !== 'stickerMessage')
      return m.reply('❌ Balas sticker yang ingin dijadikan command')

    if (!m.text)
      return m.reply('❌ Masukkan command\nContoh: /addcmdstick /menu')

    global.db.cmdstick ??= []

    let hash = m.quoted.fileSha256.toString('base64')
    let cmd = m.text.trim()

    let exist = global.db.cmdstick.find(v => v.hash === hash)

    if (exist) {
      exist.cmd = cmd
      return m.reply(`♻️ Command sticker diperbarui\nCommand: ${cmd}`)
    }

    global.db.cmdstick.push({
      hash,
      cmd
    })

    m.reply(`✅ CmdStick berhasil ditambahkan\nCommand: ${cmd}`)

  } catch (e) {
    console.error(e)
    m.reply(global.balasan.error)
  }
}
break
case 'listcmdstick': {
  try {

    let data = global.db.cmdstick || []

    if (!data.length)
      return m.reply('❌ Tidak ada CmdStick')

    let teks = `📜 *LIST CMD STICK*\n\n`

    data.forEach((v,i)=>{
      teks += `${i+1}. ${v.cmd}\n`
    })

    m.reply(teks)

  } catch (e) {
    console.error(e)
    m.reply(global.balasan.error)
  }
}
break
case 'delcmdstick': {
  try {

    let data = global.db.cmdstick || []

    if (!data.length)
      return m.reply('❌ CmdStick kosong')

    // hapus via reply sticker
    if (m.quoted && m.quoted.mtype === 'stickerMessage') {

      let hash = m.quoted.fileSha256.toString('base64')

      let index = data.findIndex(v => v.hash === hash)

      if (index === -1)
        return m.reply('❌ Sticker tidak terdaftar')

      data.splice(index,1)

      return m.reply('✅ CmdStick dihapus')
    }

    if (!m.text)
      return m.reply('❌ Masukkan nomor\nContoh: /delcmdstick 1,2')

    let nums = m.text.split(',').map(x=>parseInt(x.trim())-1)

    nums.sort((a,b)=>b-a)

    for (let n of nums){
      if (data[n]) data.splice(n,1)
    }

    m.reply('✅ CmdStick berhasil dihapus')

  } catch (e) {
    console.error(e)
    m.reply(global.balasan.error)
  }
}
break
    
case 'play': {
  try {

    if (!m.text)
      return m.reply(`❌ Masukkan judul lagu\nContoh: ${m.prefix + command} dj horeg`)

    let result = await youtubeSearch(m.text)

    if (!result?.length)
      return m.reply('❌ Lagu tidak ditemukan')

    global.db.playReader ??= {}
    global.db.playReader[m.sender] = {
      data: result,
      total: result.length
    }

    let list = ''
    let buttons = []

    result.slice(0,10).forEach((v,i)=>{

      list += `${i+1}. ${v.title}\n⏱ ${v.durasi}\n\n`

      buttons.push({
        nama: `${i+1}`,
        cmd: `${m.prefix}playget ${i+1}`
      })

    })

    const metadata = tambahButton(m.from, ...buttons)

    m.reply(
`🎵 *HASIL PENCARIAN YOUTUBE*

${list}

Silahkan *reply* dengan nomor yang ingin di download.

Metadata: ${metadata}`
    )

  } catch (e) {
    console.error(e)
    m.reply(global.balasan.error)
  }
}
break
case 'playget': {
const user = loadUserData(m.sender);
if (!user || !user.harvest) return m.reply(`❌ Anda belum terdaftar!\n\n${global.balasan.tutorDaftar}`);
  try {

    const cost = 5 // jumlah limit yang dipakai (bisa kamu ubah)

    const reader = global.db.playReader?.[m.sender]

    if (!reader)
      return m.reply('❌ Tidak ada pencarian aktif')

    let num = parseInt(m.text)

    if (!num || num < 1 || num > reader.data.length)
      return m.reply('❌ Nomor tidak valid')

    let video = reader.data[num - 1]

    await sock.sendMessage(m.from,{ react:{ text:"🔄", key:m.key }})

    const res = await fetch(`https://api.romzz.biz.id/download/youtube?url=${encodeURIComponent(video.url)}&format=mp3`)
    const json = await res.json()

    if (!json.status)
      return m.reply('❌ Gagal download')

    const meta = json.result.metadata
    const dl = json.result.download

    await sock.sendMessage(m.from,{
      image:{ url: video.thumb },
      caption:`🎵 *${meta.title}*\n⏱ ${meta.timestamp}`
    },{ quoted:m })

    await sock.sendMessage(m.from,{
      audio:{ url: dl.url },
      mimetype:'audio/mpeg',
      fileName:`${meta.title}.mp3`
    },{ quoted:m })

    sock.sendMessage(m.from,{ react:{ text:"✅", key:m.key }})

    // delete global.db.playReader[m.sender]

  // kurangi limit
  if (!m.isOwner) {
    user.harvest.limit.current -= cost
    saveUserData(m.sender, user);
  }

  } catch (e) {
    console.error(e)
    m.reply(global.balasan.error)
  }
}
break

case 'playvid': {
  try {

    if (!m.text)
      return m.reply(`❌ Masukkan judul Video\nContoh: ${m.prefix + command} dj horeg`)

    let result = await youtubeSearch(m.text)

    if (!result?.length)
      return m.reply('❌ Video tidak ditemukan')

    global.db.playReader ??= {}
    global.db.playReader[m.sender] = {
      data: result,
      total: result.length
    }

    let list = ''
    let buttons = []

    result.slice(0,10).forEach((v,i)=>{

      list += `${i+1}. ${v.title}\n⏱ ${v.durasi}\n\n`

      buttons.push({
        nama: `${i+1}`,
        cmd: `${m.prefix}playgetvid ${i+1}`
      })

    })

    const metadata = tambahButton(m.from, ...buttons)

    m.reply(
`🎬 *HASIL PENCARIAN YOUTUBE*

${list}

Silahkan *reply* dengan nomor yang ingin di download.

Metadata: ${metadata}`
    )

  } catch (e) {
    console.error(e)
    m.reply(global.balasan.error)
  }
}
break
case 'playgetvid': {
const user = loadUserData(m.sender);
if (!user || !user.harvest) return m.reply(`❌ Anda belum terdaftar!\n\n${global.balasan.tutorDaftar}`);
  try {

    const cost = 5 // jumlah limit yang dipakai (bisa kamu ubah)

    const reader = global.db.playReader?.[m.sender]

    if (!reader)
      return m.reply('❌ Tidak ada pencarian aktif')

    let num = parseInt(m.text)

    if (!num || num < 1 || num > reader.data.length)
      return m.reply('❌ Nomor tidak valid')

    let video = reader.data[num - 1]

    await sock.sendMessage(m.from,{ react:{ text:"🔄", key:m.key }})

    const res = await fetch(`https://api.romzz.biz.id/download/youtube?url=${encodeURIComponent(video.url)}&format=mp4`)
    const json = await res.json()

    if (!json.status)
      return m.reply('❌ Gagal download')

    const meta = json.result.metadata
    const dl = json.result.download

    await sock.sendMessage(m.from,{
      image:{ url: video.thumb },
      caption:`🎬 *${meta.title}*\n⏱ ${meta.timestamp}`
    },{ quoted:m })

    await downloadAndSendFileVideo(dl.url, sock, m.from, m);

    sock.sendMessage(m.from,{ react:{ text:"✅", key:m.key }})

    delete global.db.playReader[m.sender]

  // kurangi limit
  if (!m.isOwner) {
    user.harvest.limit.current -= cost
    saveUserData(m.sender, user);
  }

  } catch (e) {
    console.error(e)
    m.reply(global.balasan.error)
  }
}
break

case 'ytmp3':
case 'yta':
case 'ytaudio': {
const user = loadUserData(m.sender);
if (!user || !user.harvest) return m.reply(`❌ Anda belum terdaftar!\n\n${global.balasan.tutorDaftar}`);
  try {
    const cost = 5 // jumlah limit yang dipakai (bisa kamu ubah)

    if (user.harvest.limit.current < cost)
      return m.reply(global.balasan.limitHabis)

    if (!m.text)
      return m.reply(`Contoh: ${prefix + command} https://youtube.com/watch?v=xxx`)

    let [url, bitrate] = m.text.split(' ')
    bitrate = bitrate || '128'

    if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be')))
      return m.reply('❌ URL YouTube tidak valid!')

    await sock.sendMessage(m.from, { react: { text: "🔄", key: m.key }})

    const res = await fetch(`https://api.romzz.biz.id/download/youtube?url=${encodeURIComponent(url)}&format=mp3`)
    const result = await res.json()

    if (!result.status)
      return m.reply('❌ Gagal mengunduh audio')

    const metadata = result.result.metadata
    const download = result.result.download

    let caption = `– 乂 *YOUTUBE MP3 DOWNLOADER*\n\n`
    caption += `*📌 Judul:* ${metadata.title}\n`
    caption += `*👤 Channel:* ${metadata.author?.name || 'Tidak diketahui'}\n`
    caption += `*⏱️ Durasi:* ${metadata.timestamp}\n`
    caption += `*👁️ Views:* ${metadata.views?.toLocaleString() || 'Tidak diketahui'}\n`
    caption += `*💾 Format:* MP3\n\n`
    caption += `_Mengunduh audio..._`

    const infoMsg = await sock.sendMessage(m.from, {
      text: caption,
      contextInfo: {
        externalAdReply: {
          title: global.tim,
          body: 'ytmp3 downloader',
          thumbnailUrl: metadata.thumbnail,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

    await sock.sendMessage(m.from, {
      audio: { url: download.url },
      fileName: `${metadata.title}.mp3`,
      mimetype: 'audio/mpeg'
    }, { quoted: infoMsg })

    sock.sendMessage(m.from, { react: { text: "✅", key: m.key }})

  // kurangi limit
  if (!m.isOwner) {
    user.harvest.limit.current -= cost
    saveUserData(m.sender, user);
  }

  } catch (e) {
    console.error(e)
    m.reply(global.balasan.error)
  }
}
break
    
case 'addtiktext': {
  try {
    if (!m.text) return m.reply('❌ Masukkan teks')

    let input = m.text
    let result = ''

    for (let char of input) {
      if (/[a-zA-Z0-9]/.test(char)) {
        result += char + '\u0323'
      } else {
        result += char
      }
    }

    m.reply(`✅ Hasil:\n${result}`)
  } catch (e) {
    console.error(e)
    m.reply(global.balasan.error)
  }
}
break

case 'addtik': {
  try {
    if (!m.text) return m.reply('❌ Masukkan 1 huruf atau angka')

    let input = m.text.trim()

    // harus 1 karakter
    if (input.length !== 1) {
      return m.reply('❌ Input harus 1 huruf atau angka saja')
    }

    // hanya huruf atau angka
    if (!/^[a-zA-Z0-9]$/.test(input)) {
      return m.reply('❌ Hanya huruf atau angka yang diperbolehkan')
    }

    let result = input + '\u0323' // titik di bawah

    m.reply(`✅ Hasil:\n${result}`)
  } catch (e) {
    console.error(e)
    m.reply(global.balasan.error)
  }
}
break
    
    
case 'jadibot': {
  if (!m.text) {
    m.reply(`Masukkan nomor sebagai session ID\nContoh:\n${m.prefix}jadibot 62882163353091`);
    break;
  }

  const sessionId = m.text.trim();

  // ✅ Validasi: hanya angka
  if (!/^[0-9]+$/.test(sessionId)) {
    return m.reply(
`❌ Format nomor salah!

Gunakan format:
${m.prefix + command} 62882163353091

BUKAN:
${m.prefix + command} +62 882-1633-53091`
    );
  }

  const sessionPath = path.join(process.cwd(), 'jadibot-session', sessionId);

  try {
    // hapus session lama jika ada
    if (fs.existsSync(sessionPath)) {
      fs.rmSync(sessionPath, { recursive: true, force: true });
      console.log(`🗑️ Folder session lama ${sessionId} dihapus`);
    }

    const result = await startSession(sessionId, { 
      onMessage: messageHandler,
      onGroupUpdate: handleGroupParticipantsUpdate,
      phoneNumber: sessionId
    });

    if (typeof result === 'string') {
      return m.reply(`📲 *Pairing Code:*\n\n${result}`);
    }

    m.reply(`✅ Session "${sessionId}" started.`);

  } catch (err) {
    console.error(err);
    m.reply('❌ Failed to start session.');
  }

  break;
}

case 'listjadibot': {
  const sessions = listSessions();

  if (!sessions.length) {
    m.reply('📭 No active sessions.');
    break;
  }

  let text = '📋 *List Sessions:*\n\n';

  sessions.forEach(s => {
    text += `• ${s.id}\n`;
    text += `  Status     : ${s.running ? '✅ Running' : '❌ Stopped'}\n`;
    text += `  Registered : ${s.registered ? '📱 Yes' : '📴 No'}\n`;
    text += `  User       : ${sock.decodeJid(s.user) || '-'}\n\n`;
  });

  m.reply(text.trim());
  break;
}

case 'clearjadibot': {
  const sessions = listSessions();

  if (!sessions.length) {
    m.reply('📭 No active sessions to clean.');
    break;
  }

  // Filter session yang sudah tidak running (logout)
  const inactiveSessions = sessions.filter(s => !s.running);

  if (!inactiveSessions.length) {
    m.reply('✅ No inactive sessions found. All sessions are running.');
    break;
  }

  let deletedCount = 0;
  const failedSessions = [];

  for (const session of inactiveSessions) {
    const sessionPath = path.join(process.cwd(), 'jadibot-session', session.id);
    try {
      if (fs.existsSync(sessionPath)) {
        fs.rmSync(sessionPath, { recursive: true, force: true });
        deletedCount++;
        console.log(`🗑️ Session ${session.id} (logout) cleaned.`);
      } else {
        // Jika folder tidak ada, tetap anggap sudah bersih
        deletedCount++;
      }
    } catch (err) {
      console.error(`Failed to delete session ${session.id}:`, err);
      failedSessions.push(session.id);
    }
  }

  let replyMsg = `🧹 *Cleanup Complete* 🧹\n\n`;
  replyMsg += `✅ Deleted: ${deletedCount} inactive session(s).\n`;
  if (failedSessions.length) {
    replyMsg += `❌ Failed to delete: ${failedSessions.join(', ')}\n`;
  }
  if (deletedCount === 0 && failedSessions.length === 0) {
    replyMsg = `📭 No inactive sessions found.`;
  }

  m.reply(replyMsg.trim());
  break;
}

case 'setalarm': {
function getTimeInTimezone(timezone) {
    try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const parts = formatter.formatToParts(now);
        const hour = Number(parts.find(p => p.type === 'hour').value);
        const minute = Number(parts.find(p => p.type === 'minute').value);

        return { hour, minute };
    } catch {
        return null;
    }
}

    try {
        if (m.args.length < 2)
            return m.reply(`❌ Format:\n${m.prefix + command} 21:30 Asia/Jakarta Pesan alarm`);

        const timeInput = m.args[0];

        if (!/^\d{2}:\d{2}$/.test(timeInput))
            return m.reply('❌ Format jam salah (HH:MM)');

        const [hour, minute] = timeInput.split(':').map(Number);
        if (hour > 23 || minute > 59)
            return m.reply('❌ Jam tidak valid.');

        let timezone = 'Asia/Jakarta';
        let messageIndex = 1;

        if (m.args[1]?.includes('/')) {
            if (!getTimeInTimezone(m.args[1]))
                return m.reply('❌ Timezone tidak valid.');
            timezone = m.args[1];
            messageIndex = 2;
        }

        const messageText = m.args.slice(messageIndex).join(' ');
        if (!messageText)
            return m.reply('❌ Masukkan pesan alarm.');

        let imagePath = null;

        if (m.quoted?.mtype === 'imageMessage') {
            const buffer = await downloadMediaMessage(m.quoted);
            const imgName = `alarm_${Date.now()}.jpg`;
            imagePath = path.join(directory, 'temp', imgName);
            fs.writeFileSync(imagePath, buffer);
        }

        const alarmFile = path.join(tempDir, 'alarm', 'alarm.json');
        let alarmData = [];

        if (fs.existsSync(alarmFile))
            alarmData = JSON.parse(fs.readFileSync(alarmFile));

        const id = Date.now();

        alarmData.push({
            id,
            hour,
            minute,
            timezone,
            message: messageText,
            image: imagePath,
            lastSent: null
        });

        fs.writeFileSync(alarmFile, JSON.stringify(alarmData, null, 2));

        m.reply(`✅ Alarm diset\n🕒 ${timeInput}\n🌍 ${timezone}`);

    } catch (err) {
        console.error(err);
        m.reply('❌ Gagal set alarm.');
    }
}
break;
case 'listalarm': {
    const alarmFile = path.join(tempDir, 'alarm', 'alarm.json');

    if (!fs.existsSync(alarmFile))
        return m.reply('📭 Tidak ada alarm.');

    const alarms = JSON.parse(fs.readFileSync(alarmFile));
    if (!alarms.length)
        return m.reply('📭 Tidak ada alarm.');

    let text = '⏰ *DAFTAR ALARM*\n\n';

    alarms.forEach((a, i) => {
        text += `*${i + 1}.* ID: ${a.id}\n`;
        text += `🕒 ${String(a.hour).padStart(2,'0')}:${String(a.minute).padStart(2,'0')}\n`;
        text += `🌍 ${a.timezone}\n`;
        text += `💬 ${a.message}\n\n`;
    });

    m.reply(text);
}
break;
case 'delalarm': {
    const alarmFile = path.join(tempDir, 'alarm', 'alarm.json');

    if (!fs.existsSync(alarmFile))
        return m.reply('📭 Tidak ada alarm.');

    let alarms = JSON.parse(fs.readFileSync(alarmFile));
    if (!alarms.length)
        return m.reply('📭 Tidak ada alarm.');

    const input = m.text;
    if (!input)
        return m.reply('❌ Masukkan nomor atau ID alarm.');

    let deleted = false;

    // Hapus berdasarkan nomor
    if (!isNaN(input)) {
        const index = Number(input) - 1;
        if (alarms[index]) {
            if (alarms[index].image && fs.existsSync(alarms[index].image))
                fs.unlinkSync(alarms[index].image);
            alarms.splice(index, 1);
            deleted = true;
        }
    }

    // Hapus berdasarkan ID
    if (!deleted) {
        const before = alarms.length;
        alarms = alarms.filter(a => {
            if (a.id == input) {
                if (a.image && fs.existsSync(a.image))
                    fs.unlinkSync(a.image);
                return false;
            }
            return true;
        });
        deleted = alarms.length < before;
    }

    fs.writeFileSync(alarmFile, JSON.stringify(alarms, null, 2));

    m.reply(deleted ? '✅ Alarm berhasil dihapus.' : '❌ Alarm tidak ditemukan.');
}
break;


case 'ytmp3': {

    // LIMIT UKURAN FILE (ubah sesuai kebutuhan)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5 MB

    const basePath = `${directory}/temp/ytmp3-cache`;
    if (!fs.existsSync(basePath)) fs.mkdirSync(basePath, { recursive: true });
    let ytQueue = [];

    if (!m.text) return m.reply("❗ Harap masukkan link");
    const links = m.text.trim().split(/\s+/);
    const sender = m.sender;

    if (!links.length) {
        return m.reply(`⚠️ Contoh:\n${m.prefix}ytmp3 link1 link2 link3`);
    }

    if (ytQueue.includes(sender)) return m.reply("⏳ Masih ada proses berjalan. Tunggu selesai.");

    ytQueue.push(sender);

    // Buat folder ID otomatis
    const folderId = Date.now();
    const savePath = path.join(basePath, `${folderId}`);
    fs.mkdirSync(savePath, { recursive: true });

    m.reply(`📥 Mendownload mp3 dari *${links.length}* video...`);

    let success = 0;
    let failed = [];

    async function downloadAndSend() {
        for (let i = 0; i < links.length; i++) {
            const url = links[i];

            try {
                const res = await yt.download(url, "mp3");
                const title = (res?.title || `yt-${i}`).replace(/[^\w\s-]/gi, "");
                const filePath = path.join(savePath, `${title}.mp3`);

                // =============== CEK UKURAN SEBELUM DOWNLOAD ===============
                try {
                    const head = await fetch(res.dlink, { method: "HEAD" });
                    const size = head.headers.get("content-length");

                    if (size && Number(size) > MAX_FILE_SIZE) {
                        failed.push(url);
                        await m.reply(
                            `❌ *File terlalu besar (ditolak sebelum download)*\n` +
                            `Judul: ${title}\n` +
                            `Ukuran: ${(size / 1024 / 1024).toFixed(2)} MB\n` +
                            `Batas: ${(MAX_FILE_SIZE / 1024 / 1024)} MB`
                        );
                        continue; // skip download
                    }
                } catch (e) {
                    // Jika HEAD gagal, lanjut tapi tetap ada pengecekan setelah download
                    console.log("HEAD request gagal:", e);
                }
                // ==============================================================

                // DOWNLOAD FILE
                const audioRes = await fetch(res.dlink);
                const buffer = Buffer.from(await audioRes.arrayBuffer());

                // CEK LAGI SETELAH DOWNLOAD (JAGA-JAGA)
                if (buffer.length > MAX_FILE_SIZE) {
                    failed.push(url);
                    await m.reply(
                        `❌ *File terlalu besar*\n` +
                        `Judul: ${title}\n` +
                        `Ukuran: ${(buffer.length / 1024 / 1024).toFixed(2)} MB\n` +
                        `Batas: ${(MAX_FILE_SIZE / 1024 / 1024)} MB`
                    );
                    continue;
                }

                fs.writeFileSync(filePath, buffer);

                success++;

                // Kirim otomatis ke WA
                await sock.sendMessage(m.from, {
                    document: fs.readFileSync(filePath),
                    fileName: `${title}.mp3`,
                    mimetype: "audio/mpeg"
                });

                await new Promise(r => setTimeout(r, 700));

            } catch (err) {
                failed.push(url);
            }

            // Auto pause (setiap 10 file)
            if (success % 10 === 0 && i + 1 < links.length) {
                await m.reply(`⏸️ Pause otomatis setelah ${success} file.\nLanjut lagi...`);
                await new Promise(r => setTimeout(r, 2000));
            }
        }

        // Hapus folder setelah semuanya terkirim
        fs.rmSync(savePath, { recursive: true, force: true });

        // Hapus dari queue
        ytQueue = ytQueue.filter(id => id !== sender);

        /*return m.reply(
            `🎉 Selesai!\n\n📂 Folder ID: ${folderId}\n` +
            `✔️ Berhasil: ${success}\n` +
            `❌ Gagal: ${failed.length}`
        );*/
    }

    downloadAndSend();
}
break;

case 'iqc': {
const user = loadUserData(m.sender);
    if (!m.isOwner && user.harvest.limit.current <= 0) {
        return m.reply(global.balasan.limitHabis);
    }

    const text = m.text;
    if (!text) {
        return await sock.sendMessage(m.from, {
            text: `❌ Masukkan teks!\nContoh: ${m.prefix + command} Halo dunia!`,
        }, { quoted: m });
    }

    m.reply(global.balasan.tungguin);
    await sleep(2000);

    try {
        // URL API yang mengembalikan gambar langsung (time hardcoded 11:26)
        const imageUrl = `https://brat.siputzx.my.id/iphone-quoted?time=11%3A26&messageText=${encodeURIComponent(text)}`;

        // Kirim sebagai dokumen (seperti contoh brat)
        await sock.sendMessage(m.from, {
            document: { url: imageUrl },
            mimetype: 'image/jpeg',
            fileName: `iqc_${Date.now()}.jpg`,
            caption: `🖼️ *iPhone Quoted*\nTeks: ${text}`
        }, { quoted: m });

        // KURANGI LIMIT
        if (!m.isOwner) {
            user.harvest.limit.current--;
            saveUserData(m.sender, user);
        }

    } catch (err) {
        console.log('❌ Gagal membuat gambar IQC:', err);
        let errorMsg = '*Gagal membuat gambar IQC*\n\n';
        if (err.message.includes('API') || err.message.includes('fetch')) {
            errorMsg += '🔧 API sedang bermasalah\n💡 Coba lagi beberapa menit';
        } else if (err.message.includes('URL')) {
            errorMsg += '🔧 Response API tidak valid\n💡 Coba dengan teks yang berbeda';
        } else {
            errorMsg += `💡 Error: ${err.message}\n🔧 Coba lagi nanti`;
        }
        await sock.sendMessage(m.from, { text: errorMsg }, { quoted: m });
    }
    break;
}

case 'brat': {
const user = loadUserData(m.sender);
    if (!m.isOwner && user.harvest.limit.current <= 0) {
        return m.reply(global.balasan.limitHabis);
    }

    const text = m.text;
    if (!text) {
        return await sock.sendMessage(m.from, {
            text: `❌ Masukkan teks!\nContoh: ${m.prefix + command} aku marah 😡`,
        }, { quoted: m });
    }

    m.reply(global.balasan.tungguin);
    await sleep(2000);

    try {
        // URL API yang mengembalikan gambar langsung
        const imageUrl = `https://aqul-brat.hf.space/?text=${encodeURIComponent(text)}`;

        // Download buffer gambar dari API
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);

        // Konversi ke WebP (sticker) dengan resize 512x512 (fill)
        const webpBuffer = await sharp(buffer)
            .resize(512, 512, { fit: 'fill' })
            .webp({ quality: 90 })
            .toBuffer();

        // Tambahkan EXIF metadata
        const webpExif = await writeExifWebp(webpBuffer, {
            packName: 'Brat Style',
            packPublish: 'by Rell',
            emojis: ['😡', '🔥']
        });

        // Kirim sebagai sticker
        await sock.sendMessage(m.from, {
            sticker: webpExif
        }, { quoted: m });

        // Kurangi limit jika bukan owner
        if (!m.isOwner) {
            user.harvest.limit.current--;
            saveUserData(m.sender, user);
        }

    } catch (err) {
        console.error('❌ Gagal membuat sticker brat:', err);
        await sock.sendMessage(m.from, {
            text: '❌ Gagal membuat sticker brat. Coba lagi nanti.',
        }, { quoted: m });
    }
    break;
}

case 'bratvid': {
const user = loadUserData(m.sender);
    if (!m.isOwner && user.harvest.limit.current <= 0) {
        return m.reply(global.balasan.limitHabis);
    }

    const text = m.text;
    if (!text) {
        return await sock.sendMessage(m.from, {
            text: `❌ Masukkan teks!\nContoh: ${m.prefix + command} Indonesia itu keren`,
        }, { quoted: m });
    }

    m.reply(global.balasan.tungguin);
    await sleep(2000);

    try {
        // API langsung mengembalikan file WebP (animated sticker)
        const apiUrl = `https://api.romzz.biz.id/maker/brat?text=${encodeURIComponent(text)}&webp=true&video=true`;

        // Download buffer WebP dari API
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        const webpBuffer = Buffer.from(response.data);

        // Tambahkan EXIF metadata (opsional)
        const webpExif = await writeExifWebp(webpBuffer, {
            packName: 'Brat Video Style',
            packPublish: 'https://api.romzz.biz.id/',
            emojis: ['🎬', '🔥']
        });

        // Kirim sebagai sticker (animated)
        await sock.sendMessage(m.from, {
            sticker: webpExif
        }, { quoted: m });

        // Kurangi limit jika bukan owner
        if (!m.isOwner) {
            user.harvest.limit.current--;
            saveUserData(m.sender, user);
        }

    } catch (err) {
        console.error('❌ Gagal membuat sticker brat video:', err);
        await sock.sendMessage(m.from, {
            text: '❌ Gagal membuat sticker brat video. Coba lagi nanti.',
        }, { quoted: m });
    }
    break;
}

case 'brat': {
if (!global.db.bot.termuxMode) return m.reply(global.balasan.runNoTermux);
    const text = m.text;

    if (!text) {
        return await sock.sendMessage(m.from, {
            text: `❌ Masukkan teks!\nContoh: ${m.prefix + command} aku marah 😡`,
        }, {
            quoted: m
        });
    }

    m.reply(global.balasan.tungguin)
    await sleep(2000)

    try {
        // buat gambar brat dari teks
        const buffer = await createTitleImage(text);

        // kirim hasilnya jadi stiker
        await buatStikerDariBuffer(sock, m.from, buffer, {
            packName: 'Brat',
            author: 'by Rell'
        });
    } catch (err) {
        console.log('❌ Gagal membuat stiker brat:', err);
        await sock.sendMessage(m.from, {
            text: '❌ Gagal membuat stiker brat.',
        }, {
            quoted: m
        });
    }
}
break;

case 'bratvid': {
if (!global.db.bot.termuxMode) return m.reply(global.balasan.runNoTermux);
    const text = m.text;

    if (!text) {
        return await sock.sendMessage(m.from, {
            text: `❌ Masukkan teks!\nContoh: ${m.prefix + command} aku marah 😡`,
        }, {
            quoted: m
        });
    }

    m.reply(global.balasan.tungguin)
    await sleep(2000)

    try {
        // buat gambar brat dari teks
        const buffer = await createTitleGif(text);

        // kirim hasilnya jadi stiker
        await buatStikerDariBuffer(sock, m.from, buffer, {
            packName: 'Brat',
            author: 'by Rell'
        });
    } catch (err) {
        console.log('❌ Gagal membuat stiker brat:', err);
        await sock.sendMessage(m.from, {
            text: '❌ Gagal membuat stiker brat.',
        }, {
            quoted: m
        });
    }
}
break;

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💞 FITUR GAME: CARI PASANGAN — Smart Search + Buttons
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

case 'mpas': {
const txtmenupas = `
1. ${m.prefix}char <nama char>  ->  (Untuk mencari pasangan kamu)
2. ${m.prefix}getchar <id number>  ->  (Untuk ambil pasangan)
3. ${m.prefix}act  ->  (Menampilkan list aksi ke pasangan)
4. ${m.prefix}putus  ->  (Putus hubungan dengan pasangan)
5. ${m.prefix}spas  ->  (Cek status pasangan)
6. ${m.prefix}give uang <jumlah>  ->  (Naik-kan poin hubungan)
7. ${m.prefix}reqimgchar <id number>  ->  (Ganti image pasangan)
`
m.reply(txtmenupas.trim())
}
break

case 'char':
case 'cecar': {
  try {
    if (!m.text)
      return m.reply(`❌ Format salah!\nContoh: ${m.prefix}char rem`)

    m.reply(global.balasan.tungguin)
    await sleep(1500)

    const dataRaw = await cariKarakter(m.text)
    if (!dataRaw?.length)
      return m.reply(`❌ Karakter tidak ditemukan`)

    const data = filterRelevan(dataRaw, m.text)

    global.db.charListReader ??= {}
    global.db.charListReader[m.sender] = {
      data,
      index: 0,
      total: data.length
    }

    await sendCharListPage(m, sock)

  } catch (e) {
    console.error(e)
    m.reply(global.balasan.error)
  }
}
break

case 'lagi': {
  // PRIORITAS: karakter dulu
  global.db.charListReader ??= {}
  const charReader = global.db.charListReader?.[m.sender]
  if (charReader) {
    charReader.index++

    if (charReader.index >= charReader.total) {
      delete global.db.charListReader[m.sender]
      return m.reply(
        `✅ *SUDAH MENTOK*\n\n` +
        `Tidak ada karakter lagi.\n` +
        `Gunakan ${m.prefix}char <nama>`
      )
    }

    return await sendCharListPage(m, sock)
  }
}
break

// ===== TAMBAHAN: case untuk memilih langsung nomor karakter =====
case 'charselect': {
global.db.charListReader ??= {}
  const reader = global.db.charListReader?.[m.sender]
  if (!reader) 
    return m.reply(`❌ Tidak ada sesi pencarian karakter. Gunakan ${m.prefix}char <nama> dulu.`)
  
  const args = m.text.trim().split(/\s+/)
  const nomor = parseInt(args[0])
  if (isNaN(nomor) || nomor < 1 || nomor > reader.total) 
    return m.reply(`❌ Nomor harus 1-${reader.total}`)
  
  reader.index = nomor - 1
  await sendCharListPage(m, sock)
}
break

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💞 CASE AMBIL PASANGAN (Smart Version)
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

case 'getchar':
case 'culik': {
  const mal_id = m.text ? m.text.trim() : null;

  if (!mal_id || isNaN(mal_id)) {
    return m.reply(`❌ Format salah!\nGunakan: ${m.prefix}getchar <mal_id>`);
  }

  const player = m.sender;

  try {
    m.reply(global.balasan.tungguin);
    await sleep(2000);

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MUAT USER
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    let user = User.load(player);
    if (!user) {
      user = {
        id: player,
        status: "jomblo",
        pasangan: null,
        poin_hubungan: 0,
        level_pasangan: 1,
        hari_berpacaran: 0,
        waktu_berpacaran: 0,
        anak: [],
      };
    }

    // Sudah punya pasangan
    if (user.status !== "jomblo" && user.pasangan) {
      return m.reply(`❌ Kamu sudah punya pasangan (${user.pasangan})!`);
    }

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MUAT DATA KARAKTER
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    let pasanganData = Pasangan.load();

    // Jika karakter belum ada di DB -> fetch dari MAL
    if (!pasanganData.pasangan[mal_id]) {
      const res = await fetch(`https://api.jikan.moe/v4/characters/${mal_id}/full`);
      const json = await res.json();

      if (!json.data) {
        return m.reply(`❌ Karakter ID ${mal_id} tidak ditemukan!`);
      }

      const d = json.data;

      pasanganData.pasangan[mal_id] = {
        id: mal_id,
        nama: d.name,
        anime: d.anime?.[0]?.anime?.title || d.manga?.[0]?.manga?.title || "-",
        image: d.images?.jpg?.image_url || d.images?.webp?.image_url || null,
        deskripsi: d.about
          ? d.about.replace(/\r?\n|\r/g, " ").replace(/\s+/g, " ").slice(0, 350) + "..."
          : "-",
        pasangan: [],
        status: "jomblo",
      };

      Pasangan.save(pasanganData);
    }

    const pasangan = pasanganData.pasangan[mal_id];

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // CEK KARAKTER SUDAH DIMILIKI?
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (pasangan.status === "berpacaran" && pasangan.pasangan.length > 0) {
      const owner = pasangan.pasangan[0];
      if (owner !== player) {
        return m.reply(
          `❌ *${pasangan.nama}* sudah dimiliki *@${owner.replace(
            "@s.whatsapp.net",
            ""
          )}*!\nTidak bisa di-ambil lagi.`
        );
      }
    }

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // PROSES AMBIL
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const hasil = await User.berpasanganDariMAL(player, mal_id);
    if (hasil?.startsWith?.("❌")) return m.reply(hasil);

    const bonus = 50;
    const now = Date.now();

    user.status = "berpacaran";
    user.pasangan = mal_id;
    user.poin_hubungan = bonus;
    user.level_pasangan = 1;
    user.hari_berpacaran = 0;
    user.waktu_berpacaran = now;

    if (!Array.isArray(pasangan.pasangan)) pasangan.pasangan = [];
    if (!pasangan.pasangan.includes(player)) pasangan.pasangan.push(player);

    pasangan.status = "berpacaran";

    User.save(player, user);
    pasanganData.pasangan[mal_id] = pasangan;
    Pasangan.save(pasanganData);

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // KIRIM GAMBAR + CAPTION SUKSES
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    let caption =
`💞 *BERHASIL!* 💞
━━━━━━━━━━━━━━━━━━
👤 *Nama:* ${pasangan.nama}
📺 *Anime:* ${pasangan.anime}
📖 *Deskripsi:* ${pasangan.deskripsi}

💍 Status: *Berpacaran*
💎 Bonus: +${bonus} poin hubungan
━━━━━━━━━━━━━━━━━━
Kamu resmi berpacaran dengan *${pasangan.nama}*! 💕
Silahkan ketik ${m.prefix}spas untuk mengecek detail pasangan.`;

const metadata = tambahButton(m.from, { nama: "1", cmd: `${m.prefix}spas` });
caption += `\n━━━━━━━━━━━━━━━━━━\nBalas pesan ini dengan nomor 1 untuk mengecek detail\n\nMetadata: ${metadata}`;

    await sock.sendMessage(m.from, {
      image: { url: pasangan.image },
      caption
    }, { quoted: m });

  } catch (err) {
    console.error("[GETCHAR ERROR]", err);
    return m.reply("❌ Terjadi kesalahan saat ambil pasangan.");
  }

}
break;

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💞 CASE: AKSI HUBUNGAN (Relationship Action System)
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

case 'aksi':
case 'act': {
  const player = m.sender;
  const namaAksi = (m.args[0] || "").toLowerCase();

  try {
    const userHarvest = loadUserData(player);
    if (!userHarvest || !userHarvest.harvest) 
      return m.reply(`⚠️ Kamu belum terdaftar di sistem!`);
    if (!userHarvest.harvest.gender) 
      return m.reply(`⚠️ Kamu harus melakukan ${m.prefix}setgender dulu!`);

    // Muat user
    let user = User.load(player);
    if (!user) return m.reply(`❌ Kamu belum memiliki pasangan!`);

    user.status ??= "jomblo";
    user.poin_hubungan ??= 0;
    user.level_pasangan ??= 1;
    user.hamil ??= { status: null, mulai: null, waktuMelahirkan: null, cooldownUntil: null };

    // 🔄 Proses kelahiran / reset cooldown sebelum aksi
    const kelahiranMsg = processPregnancyAndBirth(player, user);
    if (kelahiranMsg) m.reply(kelahiranMsg); // bisa ditampilkan dulu

    const pasanganData = Pasangan.load();
    const pasangan = user.pasangan ? pasanganData.pasangan[user.pasangan] : null;
    const status = user.status;
    const levelSekarang = user.level_pasangan || 1;

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // TANPA ARG -> TAMPILKAN DAFTAR AKSI + BUTTON
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (!namaAksi) {
      const kategori = POIN_HUBUNGAN[status] || {};
      const entries = Object.entries(kategori);

      // Ambil 3 aksi acak dari kategori
      const acakAksi = entries.length
        ? entries.sort(() => Math.random() - 0.5).slice(0, 3)
        : [];

      const daftar = acakAksi.length
        ? acakAksi.map(([k, v], i) => `${i+1}. *${k}* — ${v.deskripsi} _( +${v.poin} poin )_`).join("\n")
        : "🚫 Tidak ada aksi untuk status ini.";

      // Tambahkan oksi khusus "bikin anak" (hanya jika status menikah)
      const bikinAnakOption = (status === 'menikah')
        ? `\n4. *bikin anak* — Mencoba untuk memiliki momongan. _(+0 poin, memerlukan status menikah)_`
        : '';

      const anakList = Array.isArray(user.anak) && user.anak.length
        ? user.anak.map((a, i) => `${i+1}. *${a.nama}* — ${a.gender} (Lahir: ${a.tanggal_lahir})`).join("\n")
        : "🚼 Belum punya anak.";

      const infoPasangan = pasangan
        ? `💞 *Pasangan:* ${pasangan.nama}\n📺 *Anime:* ${pasangan.anime}`
        : "🚷 Kamu belum memiliki pasangan.";

      // ========== AUTO BUTTON CRYPTO ==========
      try {
        let buttons = [];

        // Button untuk aksi poin
        for (let i = 0; i < acakAksi.length; i++) {
          const aksiNama = acakAksi[i][0];
          buttons.push({ nama: aksiNama, cmd: `${m.prefix}aksi ${aksiNama}` });
        }

        // Button untuk bikin anak (jika menikah)
        if (status === 'menikah') {
          buttons.push({ nama: '👶 Bikin Anak', cmd: `${m.prefix}bikin` });
        }

        if (buttons.length > 0) {
          const metadata = tambahButton(m.sender, ...buttons);
          await sock.sendMessage(m.from, {
            text: `
💬 *DAFTAR AKSI TERSEDIA*
─────────────────
${daftar}${bikinAnakOption}
─────────────────
📎 Pilih aksi dengan reply/balas pesan ini pke angka yang tersedia.

Metadata: ${metadata}
`.trim()
          }, { quoted: m });
          return;
        }
      } catch (err) {
        console.error("BUTTON AKSI ERROR:", err);
      }

      // fallback jika tombol error
      return m.reply(output.trim());
    }

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // CEK AKSI VALID (hanya aksi dari POIN_HUBUNGAN)
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const kategori = POIN_HUBUNGAN[status];
    if (!kategori || !kategori[namaAksi]) {
      return m.reply(`❌ Aksi *${namaAksi}* tidak tersedia untuk status *${status}*.`);
    }

    m.reply(global.balasan.tungguin);
    await sleep(2000);

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // TAMBAHKAN POIN AKSI
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const hasil = tambahPoin(player, namaAksi);
    let pesanTambahan = "";

    // Reload user
    user = User.load(player);
    const now = Date.now();

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 💍 AUTO MENIKAH
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (user.poin_hubungan >= 1000 && user.status === "berpacaran") {
      const menikahMsg = await User.menikah(player);
      pesanTambahan += `\n💍 ${menikahMsg}`;
      user.status = "menikah";
      User.save(player, user);
    }

    // ✨ LEVEL UP
    const levelUp = naikLevelPasangan(player) || "";

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // FINAL OUTPUT
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const hasilAkhir = `
${hasil}
${pesanTambahan}
${levelUp || "✨ Aksi berhasil dilakukan!"}
    `.trim();

    return m.reply(hasilAkhir);

  } catch (e) {
    console.error("[AKSI ERROR]", e);
    return m.reply("❌ Terjadi kesalahan pada sistem aksi.");
  }
}
break;

case 'beri':
case 'give': {
  const player = m.sender;
  try {
    // Validasi argumen
    if (!m.args[0] || !m.args[1]) {
      return m.reply(`Penggunaan: ${m.prefix + command} uang <jumlah>\nContoh: ${m.prefix + command} uang 100`);
    }

    const jenis = m.args[0].toLowerCase();
    const jumlah = parseInt(m.args[1]);

    // Validasi jenis
    if (jenis !== 'uang') {
      return m.reply(`Saat ini hanya bisa memberi uang. Gunakan: ${m.prefix + command} uang <jumlah>`);
    }

    // Validasi jumlah
    if (isNaN(jumlah) || jumlah <= 0) {
      return m.reply('Jumlah harus berupa angka positif!');
    }

    // Load data harvest (uang)
    let harvest = loadUserData(player);
    if (!harvest) {
      return m.reply('⚠️ Kamu belum terdaftar di sistem harvest!');
    }
    harvest.harvest ??= { uang: 0 }; // pastikan properti uang ada

    // Load data pasangan
    let pasanganUser = User.load(player);
    if (!pasanganUser) {
      return m.reply('❌ Kamu belum memiliki data pasangan!');
    }

    // Inisialisasi properti default (seperti di fitur aksi)
    pasanganUser.status ??= 'jomblo';
    pasanganUser.poin_hubungan ??= 0;
    pasanganUser.level_pasangan ??= 1;

    // Cek kepemilikan pasangan
    if (!pasanganUser.pasangan) {
      return m.reply('❌ Kamu belum memiliki pasangan!');
    }

    // Cek kecukupan uang
    if (harvest.harvest.uang < jumlah) {
      return m.reply(`❌ Uang kamu tidak cukup! (punya: ${harvest.harvest.uang})`);
    }

    // Hitung poin hubungan (1 poin per 100 uang)
    const poinTambah = Math.floor(jumlah / 100);
    if (poinTambah < 1) {
      return m.reply('Minimal memberi 100 uang untuk mendapatkan 1 poin hubungan.');
    }

    // Lakukan transaksi
    harvest.harvest.uang -= jumlah;
    pasanganUser.poin_hubungan += poinTambah;

    // Simpan kedua data
    saveUserData(player, harvest);
    User.save(player, pasanganUser);

    // Susun pesan respons
    let response = `✅ Kamu memberi *${jumlah} uang* kepada pasangan.\n` +
                   `💞 Poin hubungan bertambah *+${poinTambah}* (sekarang: ${pasanganUser.poin_hubungan})\n` +
                   `💰 Sisa uang: *${harvest.harvest.uang}*`;

    // 🔍 Cek auto menikah
    if (pasanganUser.poin_hubungan >= 1000 && pasanganUser.status === 'berpacaran') {
      const menikahMsg = await User.menikah(player);
      response += `\n💍 ${menikahMsg}`;
      // Reload data pasangan karena status sudah berubah
      pasanganUser = User.load(player);
    }

    // ⬆️ Cek level up pasangan
    if (typeof naikLevelPasangan === 'function') {
      const levelUpMsg = naikLevelPasangan(player);
      if (levelUpMsg) response += `\n${levelUpMsg}`;
    }

    return m.reply(response);
  } catch (e) {
    console.error('[BERI ERROR]', e);
    return m.reply('❌ Terjadi kesalahan saat memberi.');
  }
}
break;

case 'bikin':
case 'buatanak':
case 'makebaby': {
  const player = m.sender;

  // Fungsi helper untuk mengirim pesan dengan button
  async function sendResponse(text) {
    try {
      const buttons = [{ nama: "1", cmd: `${m.prefix}bikin` }];
      const metadata = tambahButton(m.sender, ...buttons);
      const fullText = `${text}\n\n━━━━━━━━━━━━━━\nBalas pesan ini dengan nomor 1 untuk mencoba lagi\n\nMetadata: ${metadata}`;
      await sock.sendMessage(m.from, { text: fullText }, { quoted: m });
    } catch (e) {
      console.error('Gagal membuat button:', e);
      await sock.sendMessage(m.from, { text }, { quoted: m });
    }
  }

  try {
    const userHarvest = loadUserData(player);
    if (!userHarvest || !userHarvest.harvest) {
      return m.reply('⚠️ Kamu belum terdaftar di sistem!');
    }
    if (!userHarvest.harvest.gender) {
      return m.reply(`⚠️ Kamu harus melakukan ${m.prefix}setgender dulu!`);
    }

    let user = User.load(player);
    if (!user) {
      return m.reply('❌ Kamu belum memiliki pasangan!');
    }

    user.status ??= "jomblo";
    user.hamil ??= { status: null, mulai: null, waktuMelahirkan: null, cooldownUntil: null };

    // Proses kelahiran / reset cooldown (fungsi ini mengubah objek user langsung)
    const kelahiranMsg = processPregnancyAndBirth(player, user);
    if (kelahiranMsg) {
      await m.reply(kelahiranMsg);
      // Data user sudah diperbarui, lanjut pengecekan berikutnya
    }

    // Cek status hubungan
    if (user.status !== 'menikah') {
      return m.reply('❌ Kamu harus menikah dulu sebelum mencoba membuat anak.');
    }

    const now = Date.now();

    // Cek apakah sedang hamil
    if (user.hamil.status === 'pregnant') {
      const sisa = user.hamil.waktuMelahirkan - now;
      const jam = Math.floor(sisa / 3600000);
      const menit = Math.floor((sisa % 3600000) / 60000);
      return m.reply(`🤰 Sedang hamil! Tunggu ${jam} jam ${menit} menit lagi untuk melahirkan.`);
    }

    // Cek cooldown gagal hamil
    if (user.hamil.status === 'cooldown' && now < user.hamil.cooldownUntil) {
      const sisa = user.hamil.cooldownUntil - now;
      const jam = Math.floor(sisa / 3600000);
      const menit = Math.floor((sisa % 3600000) / 60000);
      return m.reply(`⏳ Masih dalam masa pemulihan. Tunggu ${jam} jam ${menit} menit lagi.`);
    }

    // Tentukan target hamil berdasarkan gender
    const pasanganData = Pasangan.load();
    const pasangan = user.pasangan ? pasanganData.pasangan[user.pasangan] : null;
    if (!pasangan) {
      return m.reply('❌ Data pasangan tidak ditemukan.');
    }

    const targetHamil = (userHarvest.harvest.gender === 'cowok')
      ? pasangan.nama   // cowok -> pasangan yang hamil
      : m.pushName || 'Kamu'; // cewek -> dirinya sendiri

    // Acak peluang hamil (50%)
    const hamil = Math.random() < 0.5;

    let pesan = '';
    if (hamil) {
      user.hamil = {
        status: 'pregnant',
        mulai: now,
        waktuMelahirkan: now + HAMIL_DURATION,
        cooldownUntil: null,
        target: targetHamil,
      };
      pesan = `🤰 Selamat! ${targetHamil} dinyatakan hamil!\n⏳ Akan lahir pada: ${new Date(user.hamil.waktuMelahirkan).toLocaleString('id-ID')}`;
    } else {
      user.hamil = {
        status: 'cooldown',
        mulai: now,
        waktuMelahirkan: null,
        cooldownUntil: now + COOLDOWN_GAGAL_HAMIL,
        target: null,
      };
      pesan = `😔 ${targetHamil} tidak hamil kali ini. Coba lagi dalam 1 jam.`;
    }

    User.save(player, user);

    // Kirim hasil akhir dengan button
    await sendResponse(pesan);

  } catch (e) {
    console.error('[BIKIN ANAK ERROR]', e);
    sendResponse('❌ Terjadi kesalahan saat memproses aksi bikin anak.');
  }
  break;
}

case 'cekhamil':
case 'cekh':
case 'hamil': {
  const player = m.sender;

  // Fungsi helper untuk mengirim pesan dengan button reply nomor
  async function sendResponse(text, buttons = []) {
    try {
      if (buttons.length > 0) {
        const metadata = tambahButton(m.from, ...buttons);
        // Buat instruksi berdasarkan button yang ada
        const instruksi = buttons.map((btn, idx) => `Balas pesan ini dengan nomor ${idx + 1} untuk ${btn.nama}`).join('\n');
        const fullText = `${text}\n\n━━━━━━━━━━━━━━\n${instruksi}\n\nMetadata: ${metadata}`;
        await sock.sendMessage(m.from, { text: fullText }, { quoted: m });
      } else {
        // Kirim tanpa button jika tidak ada aksi
        await sock.sendMessage(m.from, { text }, { quoted: m });
      }
    } catch (e) {
      console.error('Gagal mengirim pesan dengan button:', e);
      // Fallback: kirim teks biasa
      await sock.sendMessage(m.from, { text }, { quoted: m });
    }
  }

  try {
    // Muat data user
    let user = User.load(player);
    if (!user) {
      return sendResponse('❌ Kamu belum memiliki pasangan.');
    }

    // Inisialisasi properti hamil jika belum ada
    user.hamil ??= { status: null, mulai: null, waktuMelahirkan: null, cooldownUntil: null };

    const now = Date.now();
    let statusText = '';
    let buttons = [];

    // Cek status kehamilan
    if (user.hamil.status === 'pregnant') {
      if (now >= user.hamil.waktuMelahirkan) {
        statusText = '👶 *Sudah waktunya melahirkan!*\nKlik tombol di bawah untuk memproses kelahiran.';
        buttons.push({ nama: '👶 Melahirkan', cmd: `${m.prefix}melahirkan` });
      } else {
        const sisa = user.hamil.waktuMelahirkan - now;
        const jam = Math.floor(sisa / 3600000);
        const menit = Math.floor((sisa % 3600000) / 60000);
        const detik = Math.floor((sisa % 60000) / 1000);
        statusText = `🤰 *Sedang Hamil*\n👶 Target: ${user.hamil.target || 'Pasangan'}\n⏳ Sisa waktu melahirkan: ${jam} jam ${menit} menit ${detik} detik.`;
      }
    } 
    else if (user.hamil.status === 'cooldown') {
      const sisa = user.hamil.cooldownUntil - now;
      if (sisa > 0) {
        const jam = Math.floor(sisa / 3600000);
        const menit = Math.floor((sisa % 3600000) / 60000);
        statusText = `⏳ *Masa Pemulihan*\nSisa waktu: ${jam} jam ${menit} menit.\nBelum bisa mencoba hamil.`;
      } else {
        // Seharusnya sudah direset oleh proses lain, tapi antisipasi
        statusText = '✅ Sudah bisa mencoba hamil lagi.';
        if (user.status === 'menikah') {
          buttons.push({ nama: '👶 Bikin Anak', cmd: `${m.prefix}bikin` });
        }
      }
    } 
    else {
      // status null
      statusText = '😴 Tidak sedang hamil dan tidak dalam cooldown.';
      if (user.status === 'menikah') {
        buttons.push({ nama: '👶 Bikin Anak', cmd: `${m.prefix}bikin` });
      } else {
        statusText += '\n❌ Kamu belum menikah, tidak bisa hamil.';
      }
    }

    // Informasi pasangan
    const pasanganData = Pasangan.load();
    const pasangan = user.pasangan ? pasanganData.pasangan[user.pasangan] : null;
    const infoPasangan = pasangan ? `💞 *Pasangan:* ${pasangan.nama}\n📺 *Anime:* ${pasangan.anime}` : '🚷 Kamu belum memiliki pasangan.';

    const output = `📋 *STATUS KEHAMILAN*\n─────────────────\n${infoPasangan}\n\n${statusText}\n─────────────────`;

    // Kirim dengan sendResponse, sertakan buttons jika ada
    await sendResponse(output, buttons);

  } catch (e) {
    console.error('[CEK HAMIL ERROR]', e);
    sendResponse('❌ Terjadi kesalahan saat mengecek kehamilan.');
  }
  break;
}

case 'melahirkan':
case 'lahir':
case 'birth': {
  const player = m.sender;

  try {
    // Muat data user
    let user = User.load(player);
    if (!user) return m.reply('❌ Kamu belum memiliki pasangan.');

    // Inisialisasi properti hamil jika belum ada
    user.hamil ??= { status: null, mulai: null, waktuMelahirkan: null, cooldownUntil: null };

    const now = Date.now();

    // Cek apakah sedang hamil
    if (user.hamil.status !== 'pregnant') {
      return m.reply('❌ Kamu sedang tidak hamil.');
    }

    // Cek apakah sudah waktunya melahirkan
    if (now < user.hamil.waktuMelahirkan) {
      const sisa = user.hamil.waktuMelahirkan - now;
      const jam = Math.floor(sisa / 3600000);
      const menit = Math.floor((sisa % 3600000) / 60000);
      const detik = Math.floor((sisa % 60000) / 1000);
      return m.reply(`⏳ Belum waktunya melahirkan.\nSisa waktu: ${jam} jam ${menit} menit ${detik} detik.`);
    }

    // Proses kelahiran
    const kelahiranMsg = processPregnancyAndBirth(player, user);
    if (kelahiranMsg) {
      m.reply(kelahiranMsg);
    } else {
      // Seharusnya tidak terjadi jika sudah waktunya, tapi antisipasi
      m.reply('✅ Proses kelahiran selesai (tidak ada perubahan).');
    }

  } catch (e) {
    console.error('[MELAHIRKAN ERROR]', e);
    m.reply('❌ Terjadi kesalahan saat memproses kelahiran.');
  }
}
break;

case 'aksi1':
case 'act1': {
  const player = m.sender;
  const namaAksi = (m.args[0] || "").toLowerCase();

  try {
    const userHarvest = loadUserData(player);
    if (!userHarvest || !userHarvest.harvest) 
      return m.reply(`⚠️ Kamu belum terdaftar di sistem!`);
    if (!userHarvest.harvest.gender) 
      return m.reply(`⚠️ Kamu harus melakukan ${m.prefix}setgender dulu!`);

    // Muat user
    let user = User.load(player);
    if (!user) return m.reply(`❌ Kamu belum memiliki pasangan!`);

    user.status ??= "jomblo";
    user.poin_hubungan ??= 0;
    user.level_pasangan ??= 1;
    user.hamil ??= { status: null, mulai: null, waktuMelahirkan: null, cooldownUntil: null };

    const pasanganData = Pasangan.load();
    const pasangan = user.pasangan ? pasanganData.pasangan[user.pasangan] : null;
    const status = user.status;
    const levelSekarang = user.level_pasangan || 1;

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // TANPA ARG -> TAMPILKAN DAFTAR AKSI + BUTTON
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (!namaAksi) {
      const kategori = POIN_HUBUNGAN[status] || {};
      const entries = Object.entries(kategori);

      const daftar = entries.length
        ? entries
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(
              ([k, v], i) =>
                `${i + 1}. *${k}* — ${v.deskripsi} _( +${v.poin} poin )_`
            )
            .join("\n")
        : "🚫 Tidak ada aksi untuk status ini.";

      const anakList =
        Array.isArray(user.anak) && user.anak.length
          ? user.anak
              .map(
                (a, i) =>
                  `${i + 1}. *${a.nama}* — ${a.gender} (Lahir: ${a.tanggal_lahir})`
              )
              .join("\n")
          : "🚼 Belum punya anak.";

      const infoPasangan = pasangan
        ? `💞 *Pasangan:* ${pasangan.nama}\n📺 *Anime:* ${pasangan.anime}`
        : "🚷 Kamu belum memiliki pasangan.";

      // ========== AUTO BUTTON CRYPTO ==========
      try {
        const daftarAksi = entries.map(([k, v]) => k);
        const jumlah = daftarAksi.length;

        if (jumlah && jumlah > 0) {
          let buttons = [];

          for (let i = 0; i < jumlah; i++) {
            const aksiNama = daftarAksi[i];
            buttons.push({
              nama: `${aksiNama}`,
              cmd: `${m.prefix}aksi ${aksiNama}`
            });
          }

          const metadata = tambahButton(m.sender, ...buttons);

          await sock.sendMessage(m.from, {
            text: `
💬 *DAFTAR AKSI TERSEDIA*
─────────────────
${daftar}
─────────────────
📎 Pilih aksi dengan reply nomor.

Metadata: ${metadata}
`.trim()
          }, { quoted: m });

          return; // hentikan supaya tidak double reply
        }
      } catch (err) {
        console.error("BUTTON AKSI ERROR:", err);
      }

      // fallback jika tombol error
      return m.reply(output.trim());
    }

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // CEK AKSI VALID
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const kategori = POIN_HUBUNGAN[status];
    if (!kategori || !kategori[namaAksi]) {
      return m.reply(`❌ Aksi *${namaAksi}* tidak tersedia untuk status *${status}*.`);
    }

    m.reply(global.balasan.tungguin);
    await sleep(2000)

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // TAMBAHKAN POIN Aksi
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const hasil = tambahPoin(player, namaAksi);
    let pesanTambahan = "";

    // Reload user
    user = User.load(player);
    const now = Date.now();

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 💍 AUTO MENIKAH
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (user.poin_hubungan >= 1000 && user.status === "berpacaran") {
      const menikahMsg = await User.menikah(player);
      pesanTambahan += `\n💍 ${menikahMsg}`;
      user.status = "menikah";
      User.save(player, user);
    }

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🤰 SISTEM KEHAMILAN
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const HAMIL_DURATION = 1000 * 60 * 60 * 6;
    const HAMIL_COOLDOWN = 1000 * 60 * 60 * 24;

    const hamil = user.hamil || {};
    const bisaHamil =
      user.status === "menikah" &&
      hamil.status !== "pregnant" &&
      (!hamil.cooldownUntil || now >= hamil.cooldownUntil);

    if (bisaHamil) {
      let targetHamil;
      if (userHarvest.harvest.gender === "cowok") {
        targetHamil = pasangan?.nama || "Pasanganmu";
      } else {
        targetHamil = m.pushName || "Kamu";
      }

      user.hamil = {
        status: "pregnant",
        mulai: now,
        waktuMelahirkan: now + HAMIL_DURATION,
        cooldownUntil: null,
        target: targetHamil,
      };

      User.save(player, user);

      pesanTambahan += `\n🤰 ${targetHamil} sedang hamil!\n⏳ Lahir: ${new Date(
        user.hamil.waktuMelahirkan
      ).toLocaleString("id-ID")}`;
    }

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 👶 KELAHIRAN
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (user.hamil.status === "pregnant" && now >= user.hamil.waktuMelahirkan) {
      const namaAnak = buatNamaAnak();
      user.anak ??= [];
      user.anak.push(namaAnak);

      user.hamil.status = "cooldown";
      user.hamil.waktuMelahirkan = null;
      user.hamil.cooldownUntil = now + HAMIL_COOLDOWN;

      User.save(player, user);

      pesanTambahan += `
👶 *Anak Lahir!*
📛 Nama: ${namaAnak.nama}
🧬 Gender: ${namaAnak.gender}
🗓️ Tanggal: ${namaAnak.tanggal_lahir}
⏳ Bisa hamil lagi: ${new Date(user.hamil.cooldownUntil).toLocaleString("id-ID")}
      `.trim();
    }

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // COOLDOWN INFO
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (user.hamil.status === "cooldown" && now < user.hamil.cooldownUntil) {
      const sisa = user.hamil.cooldownUntil - now;
      const jam = Math.floor(sisa / 3600000);
      const menit = Math.floor((sisa % 3600000) / 60000);
      pesanTambahan += `\n⏳ Pemulihan: ${jam} jam ${menit} menit`;
    }

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // ✨ LEVEL UP
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const levelUp = naikLevelPasangan(player) || "";

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // FINAL OUTPUT
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const hasilAkhir = `
${hasil}
${pesanTambahan}
${levelUp || "✨ Aksi berhasil dilakukan!"}
    `.trim();

    return m.reply(hasilAkhir);

  } catch (e) {
    console.error("[AKSI ERROR]", e);
    return m.reply("❌ Terjadi kesalahan pada sistem aksi.");
  }
}
break;

case 'putus':
case 'putusin': {

function cleanOutput(...parts) {
  return parts
    .filter(
      (p) =>
        p &&
        typeof p === "string" &&
        p.trim() !== "" &&
        p.trim().toLowerCase() !== "null"
    )
    .map((p) => p.trim())
    .join("\n")
    .trim();
}

  try {
    // === Validasi awal ===
    if (!m.sender) return m.reply("❌ Terjadi kesalahan identifikasi pengguna.");

    m.reply(global.balasan.tungguin);
    await sleep(2000);

    // === Load data user ===
    const player = m.sender;
    const user = User.load(player);
    if (!user) return m.reply("❌ Data pengguna tidak ditemukan.");

    // === Load data pasangan ===
    const pasanganData = Pasangan.load();
    const pasangan = user.pasangan && pasanganData.pasangan[user.pasangan]
      ? pasanganData.pasangan[user.pasangan]
      : null;

    // === Validasi status ===
    if (user.status === "jomblo" || !user.pasangan) {
      return m.reply("🚫 Kamu tidak sedang memiliki pasangan.");
    }

    const namaPasangan = pasangan?.nama || "Pasangan Tidak Dikenal";
    const statusSebelum = user.status;

    // === Reset data hubungan user ===
    user.status = "jomblo";
    user.pasangan = null;
    user.poin_hubungan = 0;
    user.level_pasangan = 0;
    user.hari_berpacaran = 0;
    user.waktu_berpacaran = 0;
    user.waktu_menikah = 0;
    user.uang_pasangan = 0;
    user.cooldown = {};
    user.hamil = { status: null, waktu_hamil: 0, waktu_lahir: 0 };
    delete user.anak;
    
    // === Update data karakter pasangan ===
    if (pasangan) {
      if (Array.isArray(pasangan.pasangan)) {
        pasangan.pasangan = pasangan.pasangan.filter((u) => u !== player);
        if (pasangan.pasangan.length === 0) pasangan.status = "jomblo";
      } else if (pasangan.pasangan === player) {
        pasangan.pasangan = null;
        pasangan.status = "jomblo";
      }
    }

    // === Simpan data ===
    Pasangan.save(pasanganData);
    User.save(player, user);

    // === Format output ===
    const pesan = cleanOutput(`
💔 *PUTUS HUBUNGAN BERHASIL* 💔
━━━━━━━━━━━━━━━━━━
👤 *Status Sebelumnya:* ${statusSebelum}
💞 *Pasangan:* ${namaPasangan}
📆 *Tanggal Putus:* ${new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
    })}
━━━━━━━━━━━━━━━━━━
😢 Kamu kini kembali *jomblo*.

Gunakan perintah:
💠 *${m.prefix}char <nama>* -> Cari karakter
💠 *${m.prefix}getchar <mal_id>* -> Ambil pasangan baru
    `);

    // === Kirim pesan akhir ===
    await sock.sendMessage(m.from, { 
      text: pesan 
    }, { quoted: m });

  } catch (err) {
    console.log(err);
    m.reply("❌ Terjadi kesalahan saat memproses permintaan putus.");
  }
}
break;

case 'statuspasangan':
case 'statspas':
case 'spas': {
  try {
    if (!m.sender) return m.reply("❌ Terjadi kesalahan identifikasi pengguna.");

    const player = m.sender;
    m.reply(global.balasan.tungguin);
    await sleep(2000);

    // ===== LOAD DATA USER =====
    const user = User.load(player);
    if (!user || user.status === "jomblo" || !user.pasangan) {
      return m.reply(`❌ Kamu belum memiliki pasangan.\nGunakan: ${m.prefix}getchar <MAL_ID>.`);
    }

    const pasanganData = Pasangan.load();
    const pasangan = pasanganData.pasangan[user.pasangan];
    const sekarang = Date.now();

    // ===== FUNGSI PEMBANTU =====
    const formatDurasi = (ms) => {
      if (!ms || ms < 0) return "-";
      const detik = Math.floor(ms / 1000);
      const hari = Math.floor(detik / 86400);
      const jam = Math.floor((detik % 86400) / 3600);
      const menit = Math.floor((detik % 3600) / 60);
      if (hari) return `${hari} hari ${jam} jam`;
      if (jam) return `${jam} jam ${menit} menit`;
      return `${menit} menit`;
    };

    const formatTanggal = (timestamp) => {
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    };

    const getLocalPasanganImage = async (mal_id) => {
      try {
        const folder = path.join(directory, "temp", "pasangan_images");
        await fsp.mkdir(folder, { recursive: true });
        const localPath = path.join(folder, `${mal_id}.jpg`);
        if (fs.existsSync(localPath)) return localPath;
        return null;
      } catch (err) {
        console.warn("⚠️ Gagal memeriksa gambar lokal:", err.message);
        return null;
      }
    };

    const downloadImage = async (url, outPath) => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Gagal ambil gambar (${res.status})`);
        const buffer = await res.arrayBuffer();
        await fsp.writeFile(outPath, Buffer.from(buffer));
        return outPath;
      } catch (err) {
        console.warn("⚠️ Gagal download gambar pasangan:", err.message);
        return null;
      }
    };

    // ===== LEVEL HUBUNGAN =====
    const levelSekarang = user.level_pasangan || 1;
    const poinSekarang = user.poin_hubungan || 0;
    const levelNext = levelSekarang + 1;
    const levelInfoNext = LEVEL_PASANGAN.find((l) => l.level === levelNext);
    const levelInfo = LEVEL_PASANGAN.find((l) => l.level === levelSekarang) || { nama: "Unknown", poin: 0 };

    // ===== TEKS STATUS HUBUNGAN =====
    let teksHubungan = `💞 *STATUS HUBUNGAN* 💞\n`;
    teksHubungan += `━━━━━━━━━━━━━━━━━━\n`;
    teksHubungan += `👩‍❤️‍👨 *Pasangan:* ${pasangan?.nama || "Belum ada"} ${pasangan?.anime ? "(" + pasangan.anime + ")" : ""}\n`;
    teksHubungan += `✍️ *MAL ID:* ${pasangan?.id || "Belum ada"}\n`;
    teksHubungan += `💍 *Status:* ${user.status || "Jomblo"}\n`;
    teksHubungan += `💗 *Level:* ${levelSekarang} (${levelInfo.nama})\n`;
    teksHubungan += `💫 *Poin:* ${poinSekarang} / ${levelInfoNext?.poin || "∞"}\n`;

    if (user.waktu_berpacaran) {
      teksHubungan += `📆 *Lama hubungan:* ${formatDurasi(sekarang - user.waktu_berpacaran)}\n`;
      teksHubungan += `💌 *Mulai berhubungan:* ${formatTanggal(user.waktu_berpacaran)}\n`;
    }

    // Anak
    if (user.anak && user.anak.length > 0) {
      teksHubungan += `\n👶 *Daftar anak:*\n`;
      user.anak.forEach((a, i) => {
        teksHubungan += `${i + 1}. ${a.nama} (${a.gender}) — lahir ${a.tanggal_lahir}\n`;
      });
    } else {
      teksHubungan += `\n🚫 Belum memiliki anak.\n`;
    }
    teksHubungan += `━━━━━━━━━━━━━━━━━━\n`;

    // ===== STATUS KEHAMILAN =====
    user.hamil ??= { status: null, mulai: null, waktuMelahirkan: null, cooldownUntil: null };

    let teksHamil = '';
    let buttonsHamil = [];
    const now = Date.now();

    if (user.hamil.status === 'pregnant') {
      if (now >= user.hamil.waktuMelahirkan) {
        teksHamil = '👶 *Sudah waktunya melahirkan!*\nKlik tombol di bawah untuk memproses kelahiran.';
        buttonsHamil.push({ nama: '👶 Melahirkan', cmd: `${m.prefix}melahirkan` });
      } else {
        const sisa = user.hamil.waktuMelahirkan - now;
        const jam = Math.floor(sisa / 3600000);
        const menit = Math.floor((sisa % 3600000) / 60000);
        const detik = Math.floor((sisa % 60000) / 1000);
        teksHamil = `🤰 *Sedang Hamil*\n👶 Target: ${user.hamil.target || 'Pasangan'}\n⏳ Sisa waktu melahirkan: ${jam} jam ${menit} menit ${detik} detik.`;
      }
    } else if (user.hamil.status === 'cooldown') {
      const sisa = user.hamil.cooldownUntil - now;
      if (sisa > 0) {
        const jam = Math.floor(sisa / 3600000);
        const menit = Math.floor((sisa % 3600000) / 60000);
        teksHamil = `⏳ *Masa Pemulihan*\nSisa waktu: ${jam} jam ${menit} menit.\nBelum bisa mencoba hamil.`;
      } else {
        teksHamil = '✅ Sudah bisa mencoba hamil lagi.';
        if (user.status === 'menikah') {
          buttonsHamil.push({ nama: '👶 Bikin Anak', cmd: `${m.prefix}bikin` });
        }
      }
    } else {
      teksHamil = '😴 Tidak sedang hamil dan tidak dalam cooldown.';
      if (user.status === 'menikah') {
        buttonsHamil.push({ nama: '👶 Bikin Anak', cmd: `${m.prefix}bikin` });
      } else {
        teksHamil += '\n❌ Kamu belum menikah, tidak bisa hamil.';
      }
    }

    // Gabungkan teks
    let teksFinal = teksHubungan + '\n📋 *STATUS KEHAMILAN* 📋\n━━━━━━━━━━━━━━━━━━\n' + teksHamil + '\n━━━━━━━━━━━━━━━━━━\n\n';

    // ===== TOMBOL AKSI =====
    const buttonsHubungan = [
      { nama: "Aksi", cmd: `${m.prefix}act` },
      { nama: "Putus", cmd: `${m.prefix}putus` },
      { nama: "Menu Pasangan", cmd: `${m.prefix}mpas` }
    ];

    // Gabungkan tombol (hindari duplikat berdasarkan cmd)
    let allButtons = [...buttonsHubungan];
    for (let btn of buttonsHamil) {
      if (!allButtons.some(b => b.cmd === btn.cmd)) {
        allButtons.push(btn);
      }
    }

    teksFinal += `Silahkan *reply/balas* pesan ini dengan mengetik nomor *1/2/3* ...dan seterusnya.\n\n`;
    allButtons.forEach((btn, idx) => {
      teksFinal += `${idx + 1}. ${btn.nama}\n`;
    });

    const metadata = tambahButton(m.sender, ...allButtons);
    teksFinal += `\nMetadata: ${metadata}`;

    // ===== KIRIM GAMBAR JIKA ADA =====
    const localImg = await getLocalPasanganImage(pasangan?.id);
    if (localImg && fs.existsSync(localImg)) {
      await sock.sendMessage(m.from, {
        image: fs.readFileSync(localImg),
        caption: teksFinal
      }, { quoted: m });
      return;
    }

    if (pasangan?.image) {
      const cachePath = path.join(directory, "cache");
      await fsp.mkdir(cachePath, { recursive: true });
      const outPath = path.join(cachePath, `status_${player}.jpg`);
      const imgPath = await downloadImage(pasangan.image, outPath);
      if (imgPath && fs.existsSync(imgPath)) {
        await sock.sendMessage(m.from, {
          image: fs.readFileSync(imgPath),
          caption: teksFinal
        }, { quoted: m });
        await fsp.unlink(imgPath).catch(() => {});
        return;
      }
    }

    // Kirim teks saja
    await sock.sendMessage(m.from, { text: teksFinal }, { quoted: m });

  } catch (err) {
    console.error("[STATUS ERROR]", err);
    await sock.sendMessage(
      m.from,
      { text: "❌ Terjadi kesalahan saat mengambil status hubungan." },
      { quoted: m }
    );
  }
  break;
}

case "setgender": {
    let player = m.sender;
    const text = m.text?.trim().toLowerCase();
    const user = loadUserData(player);
    if (!user || !user.harvest) return m.reply(`❌ Kamu belum terdaftar di sistem!`);

    // Jika belum isi gender, tampilkan pilihan
    if (!text) {
        return m.reply(
`🌸 *Pilih Gender Karakter-mu!*
Ketik salah satu:
- ketik: *${m.prefix}setgender cowok* / *male*
- ketik: *${m.prefix}setgender cewek* / *female*

Contoh: *setgender male* atau *setgender cewek*`
        );
    }

    // Daftar input yang valid (bisa ditambah sesuai kebutuhan)
    const maleKeywords = ["laki-laki", "cowok", "cowo", "pria", "male"];
    const femaleKeywords = ["perempuan", "cewek", "cewe", "wanita", "female"];
    const allValid = [...maleKeywords, ...femaleKeywords];

    if (!allValid.includes(text)) {
        return m.reply(`⚠️ Pilihan tidak valid!\nKetik *setgender cowok/male* atau *setgender cewek/female*.`);
    }

    // Konversi otomatis ke "cowok" / "cewek" (format internal)
    const gender = maleKeywords.includes(text) ? "cowok" : "cewek";

    // Cegah duplikat
    if (user.harvest.gender === gender) {
        return m.reply(`💬 Gender kamu sudah diset sebagai *${gender}*!`);
    }

    // Simpan data
    user.harvest.gender = gender;
    saveUserData(player, user);

    // Pesan konfirmasi keren
    const emoji = gender === "cowok" ? "👨‍🌾" : "👩‍🌾";
    m.reply(
`✅ *Gender Berhasil Diatur!*

${emoji} Sekarang kamu terdaftar sebagai *${gender}*.
Nikmati kehidupan bertanimu! 🌾`
    );
    break;
}
case "reqimgchar": {
  const [mal_id, ...noteParts] = m.args;
  const note = noteParts.join(" ") || "";
  if (!mal_id) return m.reply(`⚠️ Format salah!\nBalas gambar: ${m.prefix}gantiimage <mal_id> <catatan opsional>`);

  try {
    const res = await requestImageChange(sock, m, mal_id, note);
    m.reply(res);
  } catch (err) {
    m.reply("❌ " + err.message);
  }
  break;
}

case "requests": {
  const res = formatRequestList("pending");
  m.reply(res);
  break;
}

// Pada bagian case "approve"
case "approve": {
  const [firstArg, ...catatan] = m.args;
  try {
    if (firstArg === "all") {
      const res = approveAllRequests(m.sender, catatan.join(" "));
      m.reply(res);
    } else {
      const res = approveRequest(firstArg, m.sender, catatan.join(" "));
      m.reply(res);
    }
  } catch (e) {
    m.reply("❌ " + e.message);
  }
  break;
}

case "reject": {
  const [id, ...alasan] = m.args;
  try {
    const res = rejectRequest(id, m.sender, alasan.join(" "));
    m.reply(res);
  } catch (e) {
    m.reply("❌ " + e.message);
  }
  break;
}

    case 'menuhh': {
        // BUTTON
        const metadata = tambahButton(m.from, {
            nama: "1",
            cmd: `${m.prefix}harvest`
        }, {
            nama: "2",
            cmd: `${m.prefix}carabermain`
        }, {
            nama: "3",
            cmd: `${m.prefix}allmenu`
        }, {
            nama: "4",
            cmd: `${m.prefix}ping`
        }, {
            nama: "5",
            cmd: `${m.prefix}asupanwibu`
        }, {
            nama: "6",
            cmd: `${m.prefix}mpas`
        });
        
        const txtInfo = await teksInfoBot(m, sock);
        const txtHarvest = `${txtInfo}
├───────────────
╞═══ 《 *📚 LIST MENU* 》 ═══
├───────────────
├≽ 1. Harvest menu *(${m.prefix}harvest)*
├≽ 2. Tutorial harvest *(${m.prefix}carabermain)*
├≽ 3. Menu fitur *(${m.prefix}allmenu)*
├≽ 4. Spek server *(${m.prefix}ping)*
├≽ 5. Untuk wibu *(${m.prefix}asupanwibu)*
├≽ 6. Jomblo stres *(${m.prefix}mpas)*
├───────────────
╘═══ 《 *By ${global.ownerName}* 》 ═══`;
// sock.sendMessage(m.from, { text: txtHarvest.trim() + `\n\nMetadata: ${metadata}` }, { quoted: m });
        const botNumber = sock.decodeJid(sock.user?.id)
        const inputPhoto = path.join(directory, `temp/pp-${m.sender}.png`);
        const ppUrl = await sock.profilePictureUrl(botNumber, 'image').catch(() =>
            'https://telegra.ph/file/24fa902ead26340f3df2c.png'
        );
        await downloadProfilePicture(ppUrl, inputPhoto);
        
    await sock.sendMessage(m.from,{
      text: txtHarvest.trim() + `\n\nMetadata: ${metadata}`,
      contextInfo: {
        externalAdReply: {
          title: global.botName,
          body: global.tim,
          // thumbnail: await fs.readFileSync(inputPhoto),
          thumbnailUrl: ppUrl,
          sourceUrl: 'https://kua.lat/DiVim',
          mediaType: 1,
          renderLargerThumbnail: false, // Besar atau kecil
          showAdAttribution: false
        }
      }
    },{ quoted:m })
    } break

    case 'menu':
    case 'allmenu': {
        const chatId = m.from;
        const currentPrefixes = loadPrefixes(chatId);

        const ppUrl = await sock.profilePictureUrl(m.sender, 'image').catch(() =>
            'https://telegra.ph/file/24fa902ead26340f3df2c.png'
        );
        const background = path.join(bannerBgDir, `${m.sender}.jpg`);
        const defaultBackground = path.join(directory, 'assets/bg-banner.jpg');

        const inputPhoto = path.join(directory, `temp/pp-${m.sender}.png`);
        const photoCircle = path.join(directory, `temp/circle-${m.sender}.png`);
        const finalOutput = path.join(directory, `temp/banner-${m.sender}.png`);
        const bgCircle = path.join(directory, 'temp/bg-circle.png');
        const mask = path.join(directory, 'temp/bg-mask.png');
        
        await downloadProfilePicture(ppUrl, inputPhoto);

        // Ukuran
        const canvasWidth = 480;
        const canvasHeight = 270;
        const skyHeight = 180;
        const photoSize = 100;
        const photoX = (canvasWidth - photoSize) / 2;
        const photoY = 135;
        const strokeSize = 140;
        const strokeX = (canvasWidth - strokeSize) / 2;
        const strokeY = photoY - 20;
        const makeCirclePhoto = ` magick "${inputPhoto}" -resize ${photoSize}x${photoSize} \ '(' +clone -alpha extract -draw "fill black polygon 0,0 0,${photoSize} ${photoSize},${photoSize} ${photoSize},0 fill white circle ${photoSize/2},${photoSize/2} ${photoSize/2},0" ')' \ -alpha off -compose CopyOpacity -composite \ "${photoCircle}" `;
        const makeCircle = ` magick -size ${canvasWidth}x${canvasHeight} xc:none \ -fill white \ -draw "circle ${canvasWidth/2},${photoY + photoSize/2} ${canvasWidth/2 + photoSize/2 + 10},${photoY + photoSize/2}" \ -draw "rectangle 0,${skyHeight} ${canvasWidth},${canvasHeight}" \ "${mask}" `;
        const backgroundPath = fs.existsSync(background) ? background : defaultBackground;
        const makeBackground = ` magick "${backgroundPath}" -background none -resize ${canvasWidth}x${canvasHeight} \ -alpha set \ "${mask}" -compose DstOut -composite \ "${bgCircle}" `;
        const composeFinal = `magick -size ${canvasWidth}x${canvasHeight} xc:none \ "${bgCircle}" -geometry +0+0 -composite \ "${photoCircle}" -geometry +${photoX}+${photoY} -composite \ -background none -alpha set "${finalOutput}"`;
        
        exec(makeCirclePhoto, (err1) => {
            exec(makeCircle, (err2) => {
                exec(makeBackground, (err3) => {
                    exec(composeFinal, async (err4) => {
                    if (fs.existsSync(finalOutput)) {
                        const result = fs.readFileSync(finalOutput);
                        
                        sock.sendMessage(m.from, {
                            image: result,
                            caption: txtMenu(m, m.from).trim(),
                        }, {
                            quoted: m
                        });
                        } else {
                        /*sock.sendMessage(m.from, {
                            image: fs.readFileSync(backgroundPath),
                            caption: txtMenu(m, m.from).trim(),
                        }, {
                            quoted: m
                        });*/
                        m.reply(txtMenu(m, m.from).trim())
                        }
        
try {
    // Cleanup
    [inputPhoto, photoCircle, bgCircle, mask, finalOutput].forEach(file => {
        try {
            if (fs.existsSync(file)) fs.unlinkSync(file);
        } catch (err) {
            console.warn(`Gagal menghapus file ${file}:`, err.message);
        }
    });
} catch (err) {
    console.error('Terjadi error saat cleanup:', err.message);
}
                    });
                });
            });
        });
    } break

    // Untuk debug
    case 'allmenu-debug': {
        const chatId = m.from;
        const currentPrefixes = loadPrefixes(chatId);

        const ppUrl = await sock.profilePictureUrl(m.sender, 'image').catch(() =>
            'https://telegra.ph/file/24fa902ead26340f3df2c.png'
        );
        const background = path.join(bannerBgDir, `${m.sender}.jpg`);
        const defaultBackground = path.join(directory, 'assets/bg-banner.jpg');

        const inputPhoto = path.join(directory, `temp/pp-${m.sender}.png`);
        const photoCircle = path.join(directory, `temp/circle-${m.sender}.png`);
        const finalOutput = path.join(directory, `temp/banner-${m.sender}.png`);
        const bgCircle = path.join(directory, 'temp/bg-circle.png');
        const mask = path.join(directory, 'temp/bg-mask.png');
        
        await downloadProfilePicture(ppUrl, inputPhoto);

        // Ukuran
        const canvasWidth = 480;
        const canvasHeight = 270;
        const skyHeight = 180;
        const photoSize = 100;
        const photoX = (canvasWidth - photoSize) / 2;
        const photoY = 135;
        const strokeSize = 140;
        const strokeX = (canvasWidth - strokeSize) / 2;
        const strokeY = photoY - 20;
        const makeCirclePhoto = ` magick "${inputPhoto}" -resize ${photoSize}x${photoSize} \ '(' +clone -alpha extract -draw "fill black polygon 0,0 0,${photoSize} ${photoSize},${photoSize} ${photoSize},0 fill white circle ${photoSize/2},${photoSize/2} ${photoSize/2},0" ')' \ -alpha off -compose CopyOpacity -composite \ "${photoCircle}" `;
        const makeCircle = ` magick -size ${canvasWidth}x${canvasHeight} xc:none \ -fill white \ -draw "circle ${canvasWidth/2},${photoY + photoSize/2} ${canvasWidth/2 + photoSize/2 + 10},${photoY + photoSize/2}" \ -draw "rectangle 0,${skyHeight} ${canvasWidth},${canvasHeight}" \ "${mask}" `;
        const backgroundPath = fs.existsSync(background) ? background : defaultBackground;
        const makeBackground = ` magick "${backgroundPath}" -background none -resize ${canvasWidth}x${canvasHeight} \ -alpha set \ "${mask}" -compose DstOut -composite \ "${bgCircle}" `;
        const composeFinal = `magick -size ${canvasWidth}x${canvasHeight} xc:none \ "${bgCircle}" -geometry +0+0 -composite \ "${photoCircle}" -geometry +${photoX}+${photoY} -composite \ -background none -alpha set "${finalOutput}"`;
        
        try {
        exec(makeCirclePhoto, (err1) => {
            if (err1) {
                console.log("❌ Gagal foto bulat:", err1.message);
                return sock.sendMessage(m.from, {
                    text: '❌ Gagal memproses foto profil.'
                }, {
                    quoted: m
                });
            }

            exec(makeCircle, (err2) => {
                if (err2) {
                    console.log("❌ Gagal mask:", err2.message);
                    return sock.sendMessage(m.from, {
                        text: '❌ Gagal membuat mask latar.'
                    }, {
                        quoted: m
                    });
                }

                exec(makeBackground, (err3) => {
                    if (err3) {
                        console.log("❌ Gagal latar belakang:", err3.message);
                        return sock.sendMessage(m.from, {
                            text: '❌ Gagal memproses background.'
                        }, {
                            quoted: m
                        });
                    }

                    exec(composeFinal, async (err4) => {
                        if (err4) {
                            console.log("❌ Gagal komposisi akhir:", err4.message);
                            return sock.sendMessage(m.from, {
                                text: '❌ Gagal menyusun gambar akhir.'
                            }, {
                                quoted: m
                            });
                        }

                        const result = fs.readFileSync(finalOutput);
                        sock.sendMessage(m.from, {
                            image: result,
                            caption: txtMenu(m, m.from).trim(),
                        }, {
                            quoted: m
                        });
try {
    // Cleanup
    [inputPhoto, photoCircle, bgCircle, mask, finalOutput].forEach(file => {
        try {
            if (fs.existsSync(file)) fs.unlinkSync(file);
        } catch (err) {
            console.warn(`Gagal menghapus file ${file}:`, err.message);
        }
    });
} catch (err) {
    console.error('Terjadi error saat cleanup:', err.message);
}
                    });
                });
            });
        });
        } catch {
        // sock.sendMessage(m.from, { text: txtMenu(m, m.from).trim() }, { quoted: m });
        
        const botNumber = sock.decodeJid(sock.user?.id)
        const inputPhoto = path.join(directory, `temp/pp-${m.sender}.png`);
        const ppUrl = await sock.profilePictureUrl(botNumber, 'image').catch(() =>
            'https://telegra.ph/file/24fa902ead26340f3df2c.png'
        );
        await downloadProfilePicture(ppUrl, inputPhoto);
        
    await sock.sendMessage(m.from,{
      text: txtMenu(m, m.from).trim(),
      contextInfo: {
        externalAdReply: {
          title: global.botName,
          body: global.tim,
          // thumbnail: await fs.readFileSync(inputPhoto),
          thumbnailUrl: ppUrl,
          sourceUrl: 'https://kua.lat/DiVim',
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: false
        }
      }
    },{ quoted:m })
        
        }
    } break

case 'carabermain': {
let teksbermain = `*🎮 TUTORIAL BERMAIN GAME*
Tujuan utama game ini adalah *bersenang-senang dengan teman di grup* , *naik peringkat* , dan *menjadi pemain terbaik!*
─────────────────
*# 🌱 BERTANI*
1. Cek tanaman yang kamu punya di inventory:  
   👉 ${m.prefix}inventory  
2. Kalau ada tanaman yang bisa ditanam di biome saat ini:  
   🌾 Ketik: ${m.prefix}tanam  
3. Untuk melihat lahan dan tanaman yang tumbuh:  
   🌿 Ketik: ${m.prefix}ceklahan  
4. Jika tanaman sudah siap panen:  
   🧺 Ketik: ${m.prefix}panen
─────────────────
*# 🐄 BERTERNAK*
1. Beli hewan ternak terlebih dahulu:  
   🐑 Ketik: ${m.prefix}beli <nama_hewan>  
2. Cek daftar hewanmu:  
   🐓 Ketik: ${m.prefix}cekternak  
3. Rawat ternakmu dengan:  
   🍽️ Ketik: ${m.prefix}ternak  
─────────────────
*# 📦 MENGELOLA ITEM*
1. Cek daftar item yang dijual di toko:  
   🏪 ${m.prefix}toko  
2. Menjual item:  
   💰 ${m.prefix}jual <item> <jumlah>  
3. Membeli item:  
   🛒 ${m.prefix}beli <item> <jumlah>  
4. Menggunakan item:  
   ⚙️ ${m.prefix}use <item> <jumlah>
─────────────────
*💡 CATATAN TAMBAHAN*
Kamu bisa mencoba berbagai perintah lain untuk menemukan fitur baru!  
Kalau masih bingung, ketik:  
📖 ${m.prefix}tutor <nama_command>

Selamat bermain dan semoga farm-mu makmur! 🌾✨`
m.reply(teksbermain);
} break;

case 'out': {
    if (!m.isOwner) return m.reply(global.balasan.forOwner);

    // Ambil semua grup
    let allGroups = Object.values(await sock.groupFetchAllParticipating());

    // Filter hanya grup WA biasa (bukan komunitas atau announcement)
    let groups = allGroups.filter(g => g.id.endsWith('@g.us'));

    // ============================
    // out this -> keluar dari grup ini
    // ============================
    if (m.text && m.text.toLowerCase() === 'this') {
        if (!m.isGroup) return m.reply('❌ Kamu tidak berada di grup.');
        if (!m.from.endsWith('@g.us')) return m.reply('❌ Ini bukan grup biasa.');
        await sock.groupLeave(m.from);
        return console.log('🚪 Bot keluar dari grup!');
    }

    // ============================
    // out <nomor>
    // ============================
    if (m.text) {
        const num = parseInt(m.text);

        if (isNaN(num)) {
            return m.reply('❌ Nomor tidak valid.\nGunakan: *out <nomor>*');
        }

        if (!groups.length) {
            return m.reply('❌ Bot tidak tergabung di grup manapun.');
        }

        if (num < 1 || num > groups.length) {
            return m.reply('❌ Nomor grup tidak ditemukan.');
        }

        const target = groups[num - 1];

        await sock.groupLeave(target.id);
        return console.log(`🚪 Bot keluar dari grup *${target.subject}*`);
    }

    // ============================
    // out -> tampilkan list grup
    // ============================
    if (!groups.length) {
        return m.reply('❌ Bot tidak tergabung di grup biasa manapun.');
    }

    let txt = '📋 *Daftar grup*\n\n';
    groups.forEach((g, i) => {
        txt += `${i + 1}. *${g.subject}*\nID: ${g.id}\n\n`;
    });

    txt += 'Gunakan:\n';
    txt += '• *out <nomor>* -> keluar dari grup tersebut\n';
    txt += '• *out this* -> keluar dari grup ini\n';

    return m.reply(txt);
}
break;

//━━━━━━━━━━━━━━━[ INFORMASI ]━━━━━━━━━━━━━━━\\

case 'cuaca': {
    const lokasi = m.text || "Jakarta";
    try {
        const res = await axios.get(`https://wttr.in/${lokasi}?format=j1&lang=id`, {
            headers: { 'User-Agent': 'curl/7.68.0' }
        });
        const d = res.data;
        const cur = d.current_condition[0];
        const area = d.nearest_area[0];
        
const arahMap = {
    'N': 'Utara', 'NNE': 'Utara-Timur Laut', 'NE': 'Timur Laut',
    'ENE': 'Timur-Timur Laut', 'E': 'Timur', 'ESE': 'Timur-Tenggara',
    'SE': 'Tenggara', 'SSE': 'Selatan-Tenggara', 'S': 'Selatan',
    'SSW': 'Selatan-Barat Daya', 'SW': 'Barat Daya', 'WSW': 'Barat-Barat Daya',
    'W': 'Barat', 'WNW': 'Barat-Barat Laut', 'NW': 'Barat Laut',
    'NNW': 'Utara-Barat Laut'
};

const arahAngin = arahMap[cur.winddir16Point] || cur.winddir16Point;
        
        const kota = area.areaName[0].value;
        const negara = area.country[0].value;
        const desc = cur.lang_id?.[0]?.value || cur.weatherDesc[0].value;
        const suhu = cur.temp_C;
        const terasa = cur.FeelsLikeC;
        const humid = cur.humidity;
        const angin = cur.windspeedKmph;
        // const arahAngin = cur.winddir16Point;
        const visibilitas = cur.visibility;

        const text = `🌤️ *Cuaca di ${kota}, ${negara}*\n` +
            `───────────────\n` +
            `🌡️ Suhu: ${suhu}°C (terasa ${terasa}°C)\n` +
            `🌥️ Kondisi: ${desc}\n` +
            `💧 Kelembaban: ${humid}%\n` +
            `💨 Angin: ${angin} km/h ${arahAngin}\n` +
            `👁️ Visibilitas: ${visibilitas} km\n` +
            `───────────────`;

        await m.reply(text);
    } catch (err) {
        console.log("❌ Cuaca error:", err);
        m.reply("❌ Gagal mengambil cuaca.");
    }
} break

        case 'cuaca-piton': {
            const lokasi = m.text || "Jakarta";
            const imagePath = path.join(directory, "cuaca.png");

            m.reply(`🌤️ Mengambil informasi cuaca untuk *${lokasi}*...`);

            exec(`python3 cuaca_to_image.py ${lokasi}`, async (err) => {
                if (err) {
                    console.log("❌ Cuaca error:", err);
                    return m.reply("❌ Gagal mengambil cuaca.");
                }

                if (fs.existsSync(imagePath)) {
                    await sock.sendMessage(m.from, {
                        image: fs.readFileSync(imagePath),
                        caption: `🌦️ Cuaca di ${lokasi.charAt(0).toUpperCase() + lokasi.slice(1)}`
                    }, {
                        quoted: m
                    });

                    fs.unlinkSync(imagePath); // Hapus file setelah dikirim
                } else {
                    m.reply("❌ Gambar cuaca tidak ditemukan.");
                }
            });
        }
        break

        case 'libur': {
            const year = m.text;
            if (!year || isNaN(year)) {
                return m.reply(`⚠️ Mohon masukkan tahun yang valid setelah ${m.prefix}libur\nContoh: ${m.prefix}libur 2025`);
            }

            try {
                m.reply(`🔍 Mencari libur nasional untuk tahun *${year}*...`);
                const result = await libur(year);

                const message = result.map((holiday, i) => `*${i + 1}.* ${holiday.date} - ${holiday.name}`).join('\n');

                m.reply(`🎉 *Libur Nasional Tahun ${year}*\n\n${message}`);
            } catch (err) {
                console.log('[ERROR LIBUR]:', err.message);
                m.reply(err.message || "❌ Terjadi kesalahan saat mengambil data.");
            }
        }
        break

//━━━━━━━━━━━━━━━[ CACHE & BACKUP ]━━━━━━━━━━━━━━━\\

        case 'backup': {
            if (!m.isOwner) return m.reply(global.balasan.forOwner)
            const backupFolder = path.join(tempDir, 'backup');
            const outputZipPath = path.join(tempDir, 'backup.zip');
            const targetJid = global.owner[0];

            // Cek folder backup
            if (!fs.existsSync(backupFolder)) {
                return await sock.sendMessage(m.from, {
                    text: '❌ Folder backup tidak ditemukan!',
                }, {
                    quoted: m
                });
            }

            m.reply(global.balasan.tungguin);

            // Buat ZIP
            const output = fs.createWriteStream(outputZipPath);
            const archive = archiver('zip', {
                zlib: {
                    level: 9
                }
            });

            output.on('close', async () => {
                console.log(`📁 Backup ZIP berhasil dibuat (${archive.pointer()} bytes)`);

                // Kirim file ke nomor target
                await sock.sendMessage(targetJid, {
                    document: fs.readFileSync(outputZipPath),
                    fileName: 'backup.zip',
                    mimetype: 'application/zip'
                });

                m.reply('✅ File backup berhasil dikirim!');

                // Hapus file zip setelah dikirim
                try {
                    fs.unlinkSync(outputZipPath);
                } catch (e) {
                    console.log('❌ Gagal hapus file zip:', e);
                }
            });

            archive.on('error', err => {
                console.log('❌ Gagal membuat ZIP:', err);
                sock.sendMessage(m.from, {
                    text: '❌ Gagal membuat file backup ZIP!',
                }, {
                    quoted: m
                });
            });

            archive.pipe(output);
            archive.directory(backupFolder, false);
            archive.finalize();
        }
        break

        case 'backuptrash': {
            if (!m.isOwner) return m.reply(global.balasan.forOwner)
            const outputZipPath = path.join(tempDir, 'backup.zip');
            const targetJid = global.owner[0];

            // Cek folder backup
            if (!fs.existsSync(tempDir)) {
                return await sock.sendMessage(m.from, {
                    text: '❌ Folder backup tidak ditemukan!',
                }, {
                    quoted: m
                });
            }

            m.reply(global.balasan.tungguin);

            // Buat ZIP
            const output = fs.createWriteStream(outputZipPath);
            const archive = archiver('zip', {
                zlib: {
                    level: 9
                }
            });

            output.on('close', async () => {
                console.log(`📁 Backup ZIP berhasil dibuat (${archive.pointer()} bytes)`);

                // Kirim file ke nomor target
                await sock.sendMessage(targetJid, {
                    document: fs.readFileSync(outputZipPath),
                    fileName: 'backup.zip',
                    mimetype: 'application/zip'
                });

                m.reply('✅ File backup berhasil dikirim!');

                // Hapus file zip setelah dikirim
                try {
                    fs.unlinkSync(outputZipPath);
                } catch (e) {
                    console.log('❌ Gagal hapus file zip:', e);
                }
            });

            archive.on('error', err => {
                console.log('❌ Gagal membuat ZIP:', err);
                sock.sendMessage(m.from, {
                    text: '❌ Gagal membuat file backup ZIP!',
                }, {
                    quoted: m
                });
            });

            archive.pipe(output);
            archive.directory(tempDir, false);
            archive.finalize();
        }
        break

        case 'deltrash': {
            if (!m.isOwner) return m.reply(global.balasan.forOwner)

            if (!fs.existsSync(tempDir)) {
                return await sock.sendMessage(m.from, {
                    text: '📂 Folder temp tidak ditemukan!',
                }, {
                    quoted: m
                });
            }

            const files = fs.readdirSync(tempDir);
            const deletedFiles = [];

            for (const file of files) {
                const filePath = path.join(tempDir, file);
                const stat = fs.statSync(filePath); // cek info file/folder

                if (stat.isFile()) { // hanya hapus kalau benar-benar file
                    const ext = path.extname(file);
                    if (ext !== '.json') {
                        try {
                            fs.unlinkSync(filePath);
                            deletedFiles.push(file);
                        } catch (e) {
                            console.log(`❌ Gagal hapus file ${file}:`, e);
                        }
                    }
                }
            }

            const message = deletedFiles.length > 0 ?
                `🧹 Berhasil menghapus ${deletedFiles.length} file di folder temp:\n\n• ${deletedFiles.join('\n')}` :
                '✅ Tidak ada file non-json yang perlu dihapus di folder temp.';

            await sock.sendMessage(m.from, {
                text: message
            }, {
                quoted: m
            });
        }
        break

        case 'trash': {
            if (!fs.existsSync(tempDir)) {
                return await sock.sendMessage(m.from, {
                    text: '📂 Folder temp tidak ditemukan!',
                }, {
                    quoted: m
                });
            }

            const files = fs.readdirSync(tempDir);

            const message = files.length > 0 ?
                `📁 Isi folder temp (${files.length} file):\n\n• ${files.join('\n')}` :
                '📭 Folder temp kosong.';

            await sock.sendMessage(m.from, {
                text: message
            }, {
                quoted: m
            });
        }
        break

//━━━━━━━━━━━━━━━[ MAKER ]━━━━━━━━━━━━━━━\\

        case 'toimg':
        case 'tovideo': {
const user = loadUserData(m.sender);
    if (!m.isOwner && user.harvest.limit.current <= 0) {
        return m.reply(global.balasan.limitHabis);
    }

            if (!m.quoted || m.quoted.mtype !== 'stickerMessage') {
                return m.reply('❌ Silakan reply ke stiker yang valid.');
            }

            try {
                const commandType = command; // bisa 'toimg' atau 'tovideo'
                const mime = m.quoted?.msg?.mimetype || m.quoted?.mimetype || m.quoted?.mime || '';
                const isAnimated = m.quoted?.msg?.isAnimated || m.quoted?.isAnimated || false;

                if (!/webp/i.test(mime)) {
                    return m.reply('❌ Silakan reply ke stiker yang valid.');
                }

                const media = await m.quoted.download();

                if (commandType === 'toimg') {
                if (global.db.bot.termuxMode) {
                    if (isAnimated) {
                        return m.reply(`❌ Itu stiker animasi! Gunakan perintah *${m.prefix}tovideo* untuk mengubah ke video.`);
                    }

                    m.reply(global.balasan.tungguin);
                    await sleep(3000);

                    await sock.sendMessage(m.from, {
                        image: media,
                        mimetype: 'image/png',
                        caption: '✅ Stiker berhasil diubah ke gambar.',
                    }, {
                        quoted: m
                    });

        // KURANGI LIMIT
        if (!m.isOwner) {
            user.harvest.limit.current--;
            saveUserData(m.sender, user);
        }

} else {
    const targetMsg = m.quoted || m

    // Harus reply stiker
    if (targetMsg.mtype !== 'stickerMessage') {
        return m.reply('❌ Reply stiker untuk diubah ke gambar')
    }

    // Tolak stiker animasi
    if (targetMsg.message?.stickerMessage?.isAnimated) {
        return m.reply('❌ Stiker bergerak tidak bisa diubah ke gambar')
    }

    m.reply(global.balasan.tungguin)
    await sleep(1500)

    try {
        // Download sticker (WEBP)
        const buffer = await downloadMediaMessage(targetMsg)

        // Convert WEBP -> PNG
        const imgBuffer = await sharp(buffer)
            .png({ quality: 100 })
            .toBuffer()

        // Kirim sebagai gambar
        await sock.sendMessage(m.from, {
            image: imgBuffer,
            caption: '✅ Stiker berhasil diubah ke gambar'
        }, { quoted: m })

    } catch (err) {
        console.error('❌ TOIMG Error:', err)
        m.reply('❌ Gagal mengubah stiker ke gambar')
    }
}
                } else if (commandType === 'tovideo') {
                if (!global.db.bot.termuxMode) return m.reply(global.balasan.runNoTermux);
                    if (!isAnimated) {
                        return m.reply(`⚠️ Itu bukan stiker animasi. Gunakan perintah *${m.prefix}toimg* untuk mengubah ke gambar.`);
                    }

                    m.reply(global.balasan.tungguin);
                    await sleep(3000);

                    await webpToVideo(sock, m.quoted, m.from, global.balasan.sukses);
                }

            } catch (err) {
                console.log('❌ Error konversi stiker:', err);
                await sock.sendMessage(m.from, {
                    text: '❌ Terjadi kesalahan saat mengonversi stiker.',
                }, {
                    quoted: m
                });
            }
        }
        break;

case 'toimg':
case 'toimage': {
const user = loadUserData(m.sender);
if (!global.db.bot.termuxMode) {
    const targetMsg = m.quoted || m

    if (!m.isOwner && user.harvest.limit.current <= 0) {
        return m.reply(global.balasan.limitHabis);
    }

    // Harus reply stiker
    if (targetMsg.mtype !== 'stickerMessage') {
        return m.reply('❌ Reply stiker untuk diubah ke gambar')
    }

    // Tolak stiker animasi
    if (targetMsg.message?.stickerMessage?.isAnimated) {
        return m.reply('❌ Stiker bergerak tidak bisa diubah ke gambar')
    }

    m.reply(global.balasan.tungguin)
    await sleep(1500)

    try {
        // Download sticker (WEBP)
        const buffer = await downloadMediaMessage(targetMsg)

        // Convert WEBP -> PNG
        const imgBuffer = await sharp(buffer)
            .png({ quality: 100 })
            .toBuffer()

        // Kirim sebagai gambar
        await sock.sendMessage(m.from, {
            image: imgBuffer,
            caption: '✅ Stiker berhasil diubah ke gambar'
        }, { quoted: m })

        // KURANGI LIMIT
        if (!m.isOwner) {
            user.harvest.limit.current--;
            saveUserData(m.sender, user);
        }

    } catch (err) {
        console.error('❌ TOIMG Error:', err)
        m.reply('❌ Gagal mengubah stiker ke gambar')
    }
}
}
break

case 'wm': {
const user = loadUserData(m.sender);
    if (!m.isOwner && user.harvest.limit.current <= 0) {
        return m.reply(global.balasan.limitHabis);
    }

    // Cek apakah ada stiker yang direply
    if (!m.quoted || m.quoted.mtype !== 'stickerMessage') {
        return m.reply('❌ Reply ke stiker yang ingin diubah metadata-nya.\nContoh: .wm PackName | Author');
    }

    // Ambil teks setelah perintah
    const text = m.text.replace(/^wm\s*/i, '');
    let [packName, authorName] = text.split('|').map(v => v?.trim());

    if (!packName) packName = 'Sticker Pack';
    if (!authorName) authorName = 'by Rell';

    try {
        // Download buffer stiker
        const buffer = await downloadMediaMessage(m.quoted);

        // Tulis ulang exif
        const webpExif = await writeExifWebp(buffer, {
            packName: packName,
            packPublish: authorName,
            emojis: ['🔥']
        });

        // Kirim stiker baru dengan metadata yang sudah diubah
        await sock.sendMessage(m.from, {
            sticker: webpExif
        }, { quoted: m });

        // KURANGI LIMIT
        if (!m.isOwner) {
            user.harvest.limit.current--;
            saveUserData(m.sender, user);
        }

    } catch (err) {
        console.error('❌ WM Error:', err);
        m.reply('❌ Gagal mengubah metadata stiker.');
    }
}
break

case 's':
case 'sticker':
case 'stiker': {
    const user = loadUserData(m.sender);
    if (!user || !user.harvest) return m.reply(`❌ Anda belum terdaftar!\n\n${global.balasan.tutorDaftar}`);

    const targetMsg = m.quoted || m;

    // Validasi tipe media
    if (targetMsg.mtype !== 'imageMessage' && targetMsg.mtype !== 'videoMessage') {
        return m.reply('❌ Reply / kirim gambar atau video untuk dijadikan stiker');
    }

    if (!m.isOwner && user.harvest.limit.current <= 0) return m.reply(global.balasan.limitHabis);

    m.reply(global.balasan.tungguin);
    await sleep(1500);

    const text = m.text;
    const [packName, authorName] = text.split('|').map(v => v?.trim());

    try {
        const buffer = await downloadMediaMessage(targetMsg);

        // ========== VIDEO STICKER (maks 1 MB) ==========
        if (targetMsg.mtype === 'videoMessage') {
            const MAX_VIDEO_SIZE = 1 * 1024 * 1024; // 1 MB

            if (buffer.length > MAX_VIDEO_SIZE) {
                return m.reply(`❌ Ukuran video terlalu besar! Maksimal 1 MB. (Ukuran: ${(buffer.length / (1024 * 1024)).toFixed(2)} MB)`);
            }

            const videoUrl = await uploadMedia(buffer, 'video.mp4');
            if (!videoUrl) return m.reply('❌ Gagal upload video ke server.');

            // Konversi video ke WebP sticker via API (menggunakan fetch, bukan axios)
            const apiUrl = `https://pelerv3.vercel.app/api/canvas?type=convert&url=${encodeURIComponent(videoUrl)}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                return m.reply(`❌ Gagal mengkonversi video (HTTP ${response.status}). Mungkin video terlalu panjang atau format tidak didukung.`);
            }

            const arrayBuffer = await response.arrayBuffer();
            if (arrayBuffer.byteLength < 100) {
                return m.reply('❌ Hasil konversi terlalu kecil, kemungkinan video tidak valid.');
            }

            const webpBuffer = Buffer.from(arrayBuffer); // sama persis seperti contoh

            // Tambah EXIF metadata
            const webpExif = await writeExifWebp(webpBuffer, {
                packName: packName || 'Video Sticker',
                packPublish: authorName || 'by Rell',
                emojis: ['🎬', '📹']
            });

            await sock.sendMessage(m.from, { sticker: webpExif }, { quoted: m });

            // Kurangi limit
            if (!m.isOwner) {
                user.harvest.limit.current--;
                saveUserData(m.sender, user);
            }
            return;
        }

        // ========== IMAGE STICKER (sharp lokal) ==========
        const webpBuffer = await sharp(buffer)
            .resize(512, 512, { fit: 'fill' })
            .webp({ quality: 90 })
            .toBuffer();

        const webpExif = await writeExifWebp(webpBuffer, {
            packName: packName || 'Sticker Pack',
            packPublish: authorName || 'by Rell',
            emojis: ['🔥']
        });

        await sock.sendMessage(m.from, { sticker: webpExif }, { quoted: m });

        if (!m.isOwner) {
            user.harvest.limit.current--;
            saveUserData(m.sender, user);
        }

    } catch (err) {
        console.error('❌ Sticker Error:', err);
        m.reply('❌ Gagal membuat stiker. Coba lagi nanti.');
    }
    break;
}
        case 's':
        case 'sticker':
        case 'stiker': {
const user = loadUserData(m.sender);
        if (global.db.bot.termuxMode) {
            const targetMsg = m.quoted ? m.quoted : m;

            if (targetMsg.mtype !== 'imageMessage' && targetMsg.mtype !== 'videoMessage') {
                return m.reply('❌ Silakan kirim atau reply ke gambar/video untuk dijadikan stiker.');
            }

    if (!m.isOwner && user.harvest.limit.current <= 0) {
        return m.reply(global.balasan.limitHabis);
    }

            m.reply(global.balasan.tungguin);
            await sleep(3000);

            // Ambil teks setelah kata "stiker"
            const text = m.text.replace(/stiker\s+/i, '');
            const [pack, author] = text.split('|').map(v => v.trim());

            try {
                await buatStiker(sock, targetMsg, m.from, {
                    packName: pack || 'Sticker Pack',
                    author: author || 'by Rell'
                });
                
        // KURANGI LIMIT
        if (!m.isOwner) {
            user.harvest.limit.current--;
            saveUserData(m.sender, user);
        }
                
            } catch (err) {
                console.log('❌ Gagal membuat stiker:', err);
                await sock.sendMessage(m.from, {
                    text: '❌ Gagal membuat stiker.',
                }, {
                    quoted: m
                });
            }
        }
        }
        break;

case 'smeme': {
    const user = loadUserData(m.sender);
    if (!user || !user.harvest) return m.reply(`❌ Anda belum terdaftar!\n\n${global.balasan.tutorDaftar}`);
    if (!m.isOwner && user.harvest.limit.current <= 0) return m.reply(global.balasan.limitHabis);

    // Cari media yang di-reply atau dikirim
    let targetMsg = m.quoted || m;
    
    // Pastikan ada media
    if (!targetMsg.mtype || (targetMsg.mtype !== 'imageMessage' && targetMsg.mtype !== 'videoMessage' && targetMsg.mtype !== 'stickerMessage')) {
        return m.reply('❌ Reply / kirim gambar, video, atau stiker untuk dijadikan meme stiker.\nContoh: .smeme teks bawah | teks atas');
    }

    // Ambil teks dengan prioritas Bawah dulu, baru Atas
    const text = m.text.replace(/^smeme\s*/i, '');
    let [bawah, atas] = text.split('|').map(v => v?.trim());
    if (!bawah && !atas) {
        return m.reply('❌ Masukkan teks meme!\nContoh: .smeme teks bawah | teks atas');
    }
    bawah = bawah || '';
    atas = atas || '';

    m.reply(global.balasan.tungguin);
    await sleep(1500);

    try {
        // Download buffer media
        const buffer = await downloadMediaMessage(targetMsg);
        
        // Deteksi tipe file untuk menentukan filename
        const { fileTypeFromBuffer } = await import('file-type');
        const fileType = await fileTypeFromBuffer(buffer);
        let mime = fileType ? fileType.mime : '';
        let ext = fileType ? fileType.ext : '';
        
        let filename = 'media.bin';
        if (mime.startsWith('image/')) {
            filename = `image.${ext || 'jpg'}`;
        } else if (mime.startsWith('video/')) {
            filename = `video.${ext || 'mp4'}`;
        } else if (mime === 'image/webp') {
            filename = `sticker.${ext || 'webp'}`;
        } else {
            if (targetMsg.mtype === 'imageMessage') filename = 'image.jpg';
            else if (targetMsg.mtype === 'videoMessage') filename = 'video.mp4';
            else if (targetMsg.mtype === 'stickerMessage') filename = 'sticker.webp';
        }

        // Upload media asli ke server
        const mediaUrl = await uploadMedia(buffer, filename);
        if (!mediaUrl) throw new Error('Gagal upload media ke server.');

        // Panggil API smeme (hasil langsung berupa WebP)
        // Parameter: bawah = teks bawah, atas = teks atas (swap dari input user)
        const apiUrl = `https://api.romzz.biz.id/maker/smeme?url=${encodeURIComponent(mediaUrl)}&bawah=${encodeURIComponent(bawah)}&atas=${encodeURIComponent(atas)}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`API smeme error (HTTP ${response.status})`);

        const webpBuffer = Buffer.from(await response.arrayBuffer());
        // if (webpBuffer.length < 100) throw new Error('Hasil dari API terlalu kecil, kemungkinan gagal.');

        // Tambah metadata EXIF untuk stiker
        const webpExif = await writeExifWebp(webpBuffer, {
            packName: 'Meme Sticker',
            packPublish: 'by Rell',
            emojis: ['😂', '💀']
        });

        // Kirim stiker langsung (tanpa konversi ulang)
        await sock.sendMessage(m.from, { sticker: webpExif }, { quoted: m });

        // Kurangi limit
        if (!m.isOwner) {
            user.harvest.limit.current--;
            saveUserData(m.sender, user);
        }

    } catch (err) {
        console.error('❌ Smeme Error:', err);
        m.reply(`❌ Gagal membuat meme stiker: ${err.message}`);
    }
    break;
}

        case 'smeme': {
        const user = loadUserData(m.sender);
        if (!global.db.bot.termuxMode) return m.reply(global.balasan.runNoTermux);

    if (!m.isOwner && user.harvest.limit.current <= 0) {
        return m.reply(global.balasan.limitHabis);
    }

            if (
                !(
                    m.mtype === 'imageMessage' ||
                    (m.quoted && ['imageMessage', 'stickerMessage'].includes(m.quoted.mtype))
                )
            ) {
                return m.reply('❌ Silakan kirim atau reply ke gambar/stiker (non-animasi) untuk membuat stiker meme.');
            }

            try {
                m.reply(global.balasan.tungguin);
                await sleep(3000);

                // Ambil teks setelah kata "smeme"
                const text = m.text.replace(/smeme\s*/i, '').trim();
                if (!text) {
                    return await sock.sendMessage(m.from, {
                        text: `❌ Format salah.\nGunakan: ${m.prefix}smeme teksAtas|teksBawah [|packName|author]`,
                    }, {
                        quoted: m
                    });
                }

                // Default pack & author
                let pack = global.botName || 'Sticker Pack';
                let author = 'by Rell';

                // Pisahkan teks berdasarkan '|'
                const parts = text.split('|').map(v => v.trim());
                let topText = '';
                let bottomText = '';

                if (parts.length === 1) {
                    bottomText = parts[0].toUpperCase();
                } else {
                    topText = (parts[0] || '').toUpperCase();
                    bottomText = (parts[1] || '').toUpperCase();
                    if (parts[2]) pack = parts[2];
                    if (parts[3]) author = parts[3];
                }

                let mediaBuffer = null;

                // === PILIH SUMBER GAMBAR ===
                if (m.mtype === 'imageMessage') {
                    mediaBuffer = await downloadMediaMessage(m);
                } else if (m.quoted && m.quoted.mtype === 'imageMessage') {
                    mediaBuffer = await downloadMediaMessage(m.quoted);
                } else if (m.quoted && m.quoted.mtype === 'stickerMessage') {
                    const mime = m.quoted?.msg?.mimetype || m.quoted?.mimetype || '';
                    const isAnimated = m.quoted?.msg?.isAnimated || m.quoted?.isAnimated || false;

                    if (!/webp/i.test(mime)) {
                        return m.reply('❌ Itu bukan stiker yang valid.');
                    }

                    if (isAnimated) {
                        return m.reply(`⚠️ Itu stiker animasi! Gunakan *${m.prefix}tovideo* untuk mengubah ke video terlebih dahulu.`);
                    }

                    mediaBuffer = await m.quoted.download();
                }

                if (!mediaBuffer) {
                    return m.reply('❌ Tidak ditemukan media yang valid.');
                }

                // === BUAT STIKER MEME ===
                await buatStikerMeme(sock, mediaBuffer, m.from, `${topText}|${bottomText}`, {
                    packName: pack,
                    author,
                });

        // KURANGI LIMIT
        if (!m.isOwner) {
            user.harvest.limit.current--;
            saveUserData(m.sender, user);
        }

            } catch (err) {
                console.error('❌ Error di case smeme:', err);
                await sock.sendMessage(m.from, {
                    text: '⚠️ Terjadi kesalahan saat membuat stiker meme.',
                }, {
                    quoted: m
                });
            }
        }
        break;

//━━━━━━━━━━━━━━━[ WAIFU IMAGE ]━━━━━━━━━━━━━━━\\

case 'image':
case 'img':
case 'wibu':
case 'asupanwibu': {
// Definisikan array tag lokal
const localTags = {
versatile: ["maid","waifu","marin-kitagawa","mori-calliope","raiden-shogun","oppai","selfies","uniform","kamisato-ayaka"],
nsfw: ["ass","hentai","milf","oral","paizuri","ecchi","ero"]
};

// Kode asli yang dimodifikasi
let teks = `🎌 *Daftar Gambar*\n\n`;

// Menggunakan data dari array lokal
if (localTags.versatile?.length) {
  teks += `✨ *SFW / Versatile*\n`;
  teks += localTags.versatile.map(t => `/${t}`).join('\n');
  teks += `\n\n`;
}

if (localTags.nsfw?.length) {
  teks += `🔞 *NSFW*\n`;
  // Hapus duplikat pada array nsfw
  const uniqueNsfw = [...new Set(localTags.nsfw)];
  teks += uniqueNsfw.map(t => `/${t}`).join('\n');
}

teks += `\n\nKetik salah satu tag di atas untuk mengambil gambar anime`;

m.reply(teks);
}
break

case 'asupanwibu-server':
case 'wibu-server': {
  try {
    const tags = await getWaifuTags();

    let teks = `🎌 *Daftar Tag Waifu.im*\n\n`;

    if (Array.isArray(tags)) {
      // kalau tags berupa array
      teks += tags.map(t => `/${t}`).join('\n');
    } else {
      // kalau tags berupa object { versatile, nsfw }
      if (tags.versatile?.length) {
        teks += `✨ *SFW / Versatile*\n`;
        teks += tags.versatile.map(t => `/${t}`).join('\n');
        teks += `\n\n`;
      }

      if (tags.nsfw?.length) {
        teks += `🔞 *NSFW*\n`;
        teks += tags.nsfw.map(t => `/${t}`).join('\n');
      }
    }

    teks += `\n\nKetik salah satu tag di atas untuk mengambil gambar anime`;

    m.reply(teks);
  } catch (e) {
    console.error(e);
    m.reply('❌ Gagal mengambil daftar tag');
  }
}
break;

//━━━━━━━━━━━━━━━[ BETA ]━━━━━━━━━━━━━━━\\

case 'ignews':
case 'igpost':
case 'instagramnews': {
  try {
    if (!m.text) 
      return m.reply('❌ Masukkan username Instagram\nContoh: .ignews otaku_anime_indonesia')

    const username = m.text.trim()

    const data = await getInstagramPosts(username)

    if (!data?.length)
      return m.reply('❌ Post tidak ditemukan')

    global.db.igNewsReader ??= {}
    global.db.igNewsReader[m.sender] = {
      data,
      index: 0,
      total: data.length,
      username
    }

    await sendIgNewsPage(m, sock)

  } catch (e) {
    console.error(e)
    m.reply(global.balasan?.error || 'Terjadi kesalahan')
  }
}
break

case 'ignewsnext':
case 'iglanjut': {
  const reader = global.db.igNewsReader?.[m.sender]

  if (!reader)
    return m.reply('❌ Tidak ada daftar Instagram aktif')

  reader.index++

  if (reader.index >= reader.total) {
    delete global.db.igNewsReader[m.sender]
    return m.reply(
      `✅ *SUDAH MENTOK*\n\n` +
      `Tidak ada post lagi.\n` +
      `Gunakan ${m.prefix}ignews <username>`
    )
  }

  await sendIgNewsPage(m, sock)
}
break

// ==================== BING IMAGE SEARCH ====================
case "bing":
case "bingimg":
case "bingimage": {
    if (!m.text) return m.reply(`*Contoh:* ${m.prefix + command} kucing lucu`);

    try {
        await m.reply("⏳ Sedang mencari gambar di Bing...");

async function bingImage(query, limit = 5) {
  try {

    const url = `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&form=HDRSC2`

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/121.0.0.0 Safari/537.36"
      }
    })

    const $ = cheerio.load(data)

    const all = []

    $(".iusc").each((i, el) => {
      const json = $(el).attr("m")
      if (!json) return

      const d = JSON.parse(json)

      all.push({
        title: d.t,
        image: d.murl,
        thumbnail: d.turl,
        source: d.purl
      })
    })

    const shuffled = all.sort(() => 0.5 - Math.random())

    return shuffled.slice(0, limit)

  } catch (err) {
    return {
      status: false,
      message: err.message
    }
  }
}

        // Panggil scraper bingImage dengan limit 20
        const results = await bingImage(m.text, 20);
        if (!results || results.length === 0) return m.reply("❌ Tidak ada hasil ditemukan.");

        // Ambil semua data yang valid (image harus ada)
        const items = results
            .map(v => ({
                image: v.image,
                title: v.title || "Tanpa judul",
                source: v.source || "Sumber tidak diketahui"
            }))
            .filter(item => item.image);

        if (items.length === 0) return m.reply("❌ Tidak ada gambar valid.");

        // Simpan ke sesi dengan format baru (items)
        global.db.bingReader ??= {};
        global.db.bingReader[m.sender] = {
            items: items,
            index: 0,
            total: items.length,
            query: m.text
        };

        // Kirim gambar pertama
        await sendBingPage(m, sock);

    } catch (err) {
        console.error("Bing Search Error:", err);
        m.reply("❌ Terjadi kesalahan saat mengambil gambar dari Bing.");
    }
    break;
}

case "bingnext": {
    const data = global.db.bingReader?.[m.sender];
    if (!data || !data.items) {
        // Hapus sesi jika korup
        delete global.db.bingReader?.[m.sender];
        return m.reply(`❌ Tidak ada sesi Bing aktif.\nGunakan *${m.prefix}bing <query>* untuk mencari gambar.`);
    }
    await sendBingPage(m, sock);
    break;
}

case "bingselect": {
    if (!m.args || !m.args[0]) {
        return m.reply(`Gunakan: *${m.prefix}bingselect <nomor>*`);
    }
    
    const nomor = parseInt(m.args[0]);
    if (isNaN(nomor) || nomor < 1) {
        return m.reply('❌ Nomor tidak valid. Masukkan angka positif.');
    }

    const data = global.db.bingReader?.[m.sender];
    if (!data || !data.items) {
        delete global.db.bingReader?.[m.sender];
        return m.reply(`❌ Tidak ada sesi Bing aktif.\nGunakan *${m.prefix}bing <query>* untuk mencari gambar.`);
    }
    if (nomor > data.total) {
        return m.reply(`❌ Nomor maksimal adalah ${data.total}.`);
    }

    data.index = nomor - 1;
    await sendBingPage(m, sock);
    break;
}
// ==================== AKHIR BING ====================

//━━━━━━━━━━━━━━━[ KOLEB ]━━━━━━━━━━━━━━━\\

case "pinterest":
case "pin": {
    if (!m.text) return m.reply(`*Contoh:* ${m.prefix + command} Anime`);

    // --- Helper Functions (dari scraper baru) ---
    function isPin(url) {
        if (!url) return false;
        const patterns = [
            /^https?:\/\/(?:www\.)?pinterest\.com\/pin\/[\w.-]+/,
            /^https?:\/\/(?:www\.)?pinterest\.[\w.]+\/pin\/[\w.-]+/,
            /^https?:\/\/pin\.it\/[\w.-]+/,
            /^https?:\/\/(?:www\.)?pinterest\.com\/amp\/pin\/[\w.-]+/,
            /^https?:\/\/(?:[a-z]{2}|www)\.pinterest\.com\/pin\/[\w.-]+/,
            /^https?:\/\/(?:www\.)?pinterest\.com\/pin\/[\d]+(?:\/)?$/,
            /^https?:\/\/(?:www\.)?pinterest\.[\w.]+\/pin\/[\d]+(?:\/)?$/,
        ];
        return patterns.some(pattern => pattern.test(url.trim().toLowerCase()));
    }

    async function getCookies() {
        try {
            const response = await axios.get("https://www.pinterest.com/csrf_error/");
            const setCookieHeaders = response.headers["set-cookie"];
            if (setCookieHeaders) {
                const cookies = setCookieHeaders.map(cookieString => cookieString.split(";")[0].trim());
                return cookies.join("; ");
            }
            return null;
        } catch {
            return null;
        }
    }

    // Fungsi pencarian Pinterest (hanya yang dipakai)
    async function pinterest(query, limit = 20) {
        try {
            const cookies = await getCookies();
            if (!cookies) return [];

            const url = "https://www.pinterest.com/resource/BaseSearchResource/get/";
            const dataParam = {
                options: {
                    article_size: "normal",
                    auto_correction_disabled: false,
                    camera: null,
                    custom_personalization_parameters: null,
                    enable_query_correction: true,
                    input: query,
                    only_show_csr: true,
                    page_size: Math.min(limit, 250),
                    query,
                    scope: "pins",
                    top_level_domain: "com",
                    bookmark: null
                },
                context: {}
            };

            const params = {
                source_url: `/search/pins/?q=${encodeURIComponent(query)}`,
                data: JSON.stringify(dataParam),
                _: Date.now()
            };

            const headers = {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "cookie": cookies,
                "referer": "https://www.pinterest.com/",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "x-app-version": "c056fb7",
                "x-pinterest-appstate": "active",
                "x-pinterest-pws-handler": "www/search.js",
                "x-pinterest-source-url": `/search/pins/?q=${encodeURIComponent(query)}`,
                "x-requested-with": "XMLHttpRequest"
            };

            const res = await axios.get(url, { headers, params });
            const results = res.data?.resource_response?.data?.results || [];
            if (!results.length) return [];

            return results
                .filter((r) => r.images?.orig)
                .slice(0, limit)
                .map((r) => ({
                    upload_by: r.pinner?.username,
                    fullname: r.pinner?.full_name,
                    followers: r.pinner?.follower_count,
                    caption: r.grid_title,
                    image: r.images?.orig?.url,
                    source: `https://www.pinterest.com/pin/${r.id}`
                }));
        } catch (e) {
            console.log("Search Error:", e);
            return [];
        }
    }
    // --- End of Helper Functions ---

    try {
        await m.reply("⏳ Sedang mencari gambar...");

        // Gunakan fungsi pencarian dengan limit 25 (atau lebih jika diinginkan)
        const results = await pinterest(m.text, 25);
        if (!results || results.length === 0) return m.reply("❌ Tidak ada hasil ditemukan.");

        // Ambil semua URL gambar yang valid
        const images = results.map(v => v.image).filter(url => url);
        if (images.length === 0) return m.reply("❌ Tidak ada gambar valid.");

        // Simpan SELURUH gambar ke dalam sesi (bukan hanya 5)
        global.db.pinterestReader ??= {};
        global.db.pinterestReader[m.sender] = {
            images: images,          // semua gambar dari hasil pencarian
            index: 0,
            total: images.length,
            query: m.text
        };

        // Kirim gambar pertama
        await sendPinterestPage(m, sock);

    } catch (err) {
        console.error(err);
        m.reply("❌ Terjadi kesalahan saat mengambil gambar dari Pinterest.");
    }
}
break;

// Handler untuk command pinnext (tetap sama, hanya untuk maju)
case 'pinnext': {
    const data = global.db.pinterestReader?.[m.sender];
    if (!data) {
        return m.reply(`❌ Tidak ada sesi Pinterest aktif.\nGunakan *${m.prefix}pin <query>* untuk mencari gambar.`);
    }
    await sendPinterestPage(m, sock);
    break;
}

// Handler baru untuk pinselect
case 'pinselect': {
    // Periksa apakah argumen nomor diberikan
    if (!m.args || !m.args[0]) {
        return m.reply(`Gunakan: *${m.prefix}pinselect <nomor>*`);
    }
    
    const nomor = parseInt(m.args[0]);
    if (isNaN(nomor) || nomor < 1) {
        return m.reply('❌ Nomor tidak valid. Masukkan angka positif.');
    }

    const data = global.db.pinterestReader?.[m.sender];
    if (!data) {
        return m.reply(`❌ Tidak ada sesi Pinterest aktif.\nGunakan *${m.prefix}pin <query>* untuk mencari gambar.`);
    }
    if (nomor > data.total) {
        return m.reply(`❌ Nomor maksimal adalah ${data.total}.`);
    }

    // Set indeks ke nomor yang diminta (array mulai dari 0)
    data.index = nomor - 1;
    await sendPinterestPage(m, sock);
    break;
}

//━━━━━━━━━━━━━━━[ GAME ASAH OTAK ]━━━━━━━━━━━━━━━\\

case 'tebakff':
case 'tff': {
    if (tebakkata[m.sender] || caklontong[m.sender] || siapakahaku[m.sender] || family100[m.from] || tebakml[m.sender] || tebakff[m.sender]) 
        return m.reply('Kamu masih berada di sesi game lain');
    
    let timeout = 120000;
    let poin = 500;
    let json = await tebakff();
    
    let caption = `🎮 *Tebak Karakter FF* 🎮
    
${json.clue}

⏱️ Timeout: *${(timeout / 1000).toFixed(2)} detik*
💎 Bonus: ${poin} G
🔍 Ketik *${m.prefix}hintff* untuk petunjuk tambahan
❌ Ketik *nyerah* untuk menyerah
`.trim();

    const timeoutId = setTimeout(() => {
        if (tebakff[m.sender]) {
            m.reply(`⏰ Waktu habis!\nJawabannya adalah *${json.nama}*`);
            delete tebakff[m.sender];
        }
    }, timeout);

    tebakff[m.sender] = {
        json,
        poin,
        timeout: timeoutId
    };
    
    await sock.sendMessage(m.from, {
        image: { url: json.url },
        caption: caption
    }, { quoted: m });
}
break;

case 'hintff': {
    if (!tebakff[m.sender]) return m.reply('Tidak ada sesi tebakff yang aktif');
    let jawaban = tebakff[m.sender].json.nama;
    let clue = jawaban.replace(/[AIUEOaiueo]/g, '_');
    m.reply(`🔍 *Petunjuk:* ${clue}`);
}
break;

case 'tebakml':
case 'tml': {
    if (tebakkata[m.sender] || caklontong[m.sender] || siapakahaku[m.sender] || family100[m.from] || tebakff[m.sender]) 
        return m.reply('Kamu masih berada di sesi game lain');
    if (tebakml[m.sender]) 
        return m.reply(`Masih ada soal yang belum terjawab`);
    
    let timeout = 120000;
    let poin = 500;
    let json = await tebakml();
    
    let caption = `🎮 *Tebak Hero ML* 🎮
    
${json.clue}

⏱️ Timeout: *${(timeout / 1000).toFixed(2)} detik*
💎 Bonus: ${poin} G
🔍 Ketik *${m.prefix}hintml* untuk petunjuk tambahan
❌ Ketik *nyerah* untuk menyerah
`.trim();

    const timeoutId = setTimeout(() => {
        if (tebakml[m.sender]) {
            m.reply(`⏰ Waktu habis!\nJawabannya adalah *${json.nama}*`);
            delete tebakml[m.sender];
        }
    }, timeout);

    tebakml[m.sender] = {
        json,
        poin,
        timeout: timeoutId
    };
    
    await sock.sendMessage(m.from, {
        image: { url: json.url },
        caption: caption
    }, { quoted: m });
}
break;

case 'hintml': {
    if (!tebakml[m.sender]) return m.reply('Tidak ada sesi tebakml yang aktif');
    let jawaban = tebakml[m.sender].json.nama;
    let clue = jawaban.replace(/[AIUEOaiueo]/g, '_');
    m.reply(`🔍 *Petunjuk:* ${clue}`);
}
break;

case 'tebakgambar':
case 'tbg': {
    if (tebakkata[m.sender] || caklontong[m.sender] || siapakahaku[m.sender] || family100[m.from] || tebakml[m.sender] || tebakff[m.sender]) 
        return m.reply('Kamu masih berada di sesi game lain');
    if (tebakgambar[m.sender]) 
        return m.reply(`Masih ada soal yang belum terjawab`);
    
    let timeout = 120000;
    let poin = 200;
    let json = await tebakgambar();
    let caption = `${json.deskripsi}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik "${m.prefix}hint" untuk bantuan
Ketik "nyerah" untuk menyerah
Bonus: ${poin} G
`.trim();

    const timeoutId = setTimeout(() => {
        if (tebakgambar[m.sender]) {
            m.reply(`Waktu habis!\nJawabannya adalah *${json.jawaban}*`);
            delete tebakgambar[m.sender];
        }
    }, timeout);

    tebakgambar[m.sender] = {
        json,
        poin,
        timeout: timeoutId
    };
    
    await sock.sendMessage(m.from, {
        image: { url: json.img },
        caption: caption
    }, { quoted: m });
}
break;

case 'hint': {
    if (tebakkata[m.sender] || caklontong[m.sender] || siapakahaku[m.sender] || family100[m.from] || tebakml[m.sender] || tebakff[m.sender]) 
        return m.reply('Kamu masih berada di sesi game lain');
    if (!tebakgambar[m.sender]) 
        return m.reply(`Kamu tidak sedang berada di sesi game tebakgambar`);
    
    let jawaban = tebakgambar[m.sender].json.jawaban;
    m.reply('```' + jawaban.replace(/[bcdfghjklmnpqrstvwxyz]/ig, '_') + '```');
}
break;

case 'family100': {
    if (tebakgambar[m.sender] || tebakkata[m.sender] || caklontong[m.sender] || siapakahaku[m.sender] || tebakml[m.sender] || tebakff[m.sender]) 
        return m.reply('Kamu masih berada di sesi game lain');
    
    const winScore = 200;
    if (family100[m.from]) 
        return m.reply('Masih ada kuis yang belum terjawab di chat ini, silahkan ketik "nyerah" untuk menyerah');
    
    const json = await family100();
    const id = m.from;
    let caption = `
*Soal:* ${json.soal}
Terdapat *${json.jawaban.length}* jawaban${json.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)`
: ''}
+${winScore} G tiap jawaban benar
`.trim();

    const timeoutId = setTimeout(() => {
        if (family100[m.from]) {
            m.reply(`⏰ Waktu habis!\nJawaban yang benar:\n${json.jawaban.map((v, i) => `${i+1}. ${v}`).join('\n')}`);
            delete family100[m.from];
        }
    }, 120000);

    family100[m.from] = {
        id,
        msg: await m.reply(caption),
        ...json,
        terjawab: Array.from(json.jawaban, () => false),
        winScore,
        timeout: timeoutId
    };
}
break;

case 'tebakkata':
case 'tbk': {
    if (tebakgambar[m.sender] || caklontong[m.sender] || siapakahaku[m.sender] || family100[m.from] || tebakml[m.sender] || tebakff[m.sender]) 
        return m.reply('Kamu masih berada di sesi game lain');
    if (tebakkata[m.sender]) 
        return m.reply(`Masih ada soal yang belum terjawab`);
    
    let timeout = 120000;
    let poin = 200;
    let json = await tebakkata();
    let caption = `${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik "${m.prefix}teka" untuk bantuan
Ketik "nyerah" untuk menyerah
Bonus: ${poin} G
`.trim();

    const timeoutId = setTimeout(() => {
        if (tebakkata[m.sender]) {
            m.reply(`Waktu habis!\nJawabannya adalah *${json.jawaban}*`);
            delete tebakkata[m.sender];
        }
    }, timeout);

    tebakkata[m.sender] = {
        json,
        poin,
        timeout: timeoutId
    };
    m.reply(caption);
}
break;

case 'teka': {
    if (tebakgambar[m.sender] || caklontong[m.sender] || siapakahaku[m.sender] || family100[m.from] || tebakml[m.sender] || tebakff[m.sender]) 
        return m.reply('Kamu masih berada di sesi game lain');
    if (!tebakkata[m.sender]) 
        return m.reply(`Kamu tidak sedang berada di sesi game tebakkata`);
    
    let jawaban = tebakkata[m.sender].json.jawaban;
    let ans = jawaban.trim();
    let clue = ans.replace(/[AIUEO]/gi, '_');
    m.reply('```' + clue + '```');
}
break;

case 'caklontong':
case 'cklo': {
    if (tebakgambar[m.sender] || tebakkata[m.sender] || siapakahaku[m.sender] || family100[m.from] || tebakml[m.sender] || tebakff[m.sender]) 
        return m.reply('Kamu masih berada di sesi game lain');
    if (caklontong[m.sender]) 
        return m.reply(`Masih ada soal yang belum terjawab`);
    
    let timeout = 120000;
    let poin = 200;
    let json = await caklontong();
    let caption = `${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik "${m.prefix}calo" untuk bantuan
Ketik "nyerah" untuk menyerah
Bonus: ${poin} G
`.trim();

    const timeoutId = setTimeout(() => {
        if (caklontong[m.sender]) {
            m.reply(`Waktu habis!\nJawabannya adalah *${json.jawaban}*\n*Keterangan:* ${json.deskripsi}`);
            delete caklontong[m.sender];
        }
    }, timeout);

    caklontong[m.sender] = {
        json,
        poin,
        timeout: timeoutId
    };
    m.reply(caption);
}
break;

case 'calo': {
    if (tebakgambar[m.sender] || tebakkata[m.sender] || siapakahaku[m.sender] || family100[m.from] || tebakml[m.sender] || tebakff[m.sender]) 
        return m.reply('Kamu masih berada di sesi game lain');
    if (!caklontong[m.sender]) 
        return m.reply(`Kamu tidak sedang berada di sesi game caklontong`);
    
    let jawaban = caklontong[m.sender].json.jawaban;
    let ans = jawaban.trim();
    let clue = ans.replace(/[AIUEO]/gi, '_');
    m.reply('```' + clue + '```');
}
break;

case 'siapakahaku':
case 'spku': {
    if (tebakgambar[m.sender] || tebakkata[m.sender] || caklontong[m.sender] || family100[m.from] || tebakml[m.sender] || tebakff[m.sender]) 
        return m.reply('Kamu masih berada di sesi game lain');
    if (siapakahaku[m.sender]) 
        return m.reply(`Masih ada soal yang belum terjawab`);
    
    let timeout = 120000;
    let poin = 200;
    let json = await siapakahaku();
    let caption = `${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik "${m.prefix}who" untuk bantuan
Ketik "nyerah" untuk menyerah
Bonus: ${poin} G
`.trim();

    const timeoutId = setTimeout(() => {
        if (siapakahaku[m.sender]) {
            m.reply(`Waktu habis!\nJawabannya adalah *${json.jawaban}*`);
            delete siapakahaku[m.sender];
        }
    }, timeout);

    siapakahaku[m.sender] = {
        json,
        poin,
        timeout: timeoutId
    };
    m.reply(caption);
}
break;

case 'who': {
    if (tebakgambar[m.sender] || tebakkata[m.sender] || caklontong[m.sender] || family100[m.from] || tebakml[m.sender] || tebakff[m.sender]) 
        return m.reply('Kamu masih berada di sesi game lain');
    if (!siapakahaku[m.sender]) 
        return m.reply(`Kamu tidak sedang berada di sesi game siapakahaku`);
    
    let jawaban = siapakahaku[m.sender].json.jawaban;
    m.reply('```' + jawaban.replace(/[bcdfghjklmnpqrstvwxyz]/ig, '_') + '```');
}
break;

//━━━━━━━━━━━━━━━[ KODE REDEM ]━━━━━━━━━━━━━━━\\

// ===============================
// Case: Hapus Redeem Code
// ===============================
case 'delredem': {
    if (!m.isOwner) return m.reply(global.balasan.forOwner);
    const arg = m.text.trim();
    if (!arg) return m.reply(`❌ Format salah!\nContoh: ${m.prefix}delredem KODE123\nAtau: ${m.prefix}delredem all`);
    
    if (arg.toLowerCase() === 'all') {
        const result = deleteAllRedeemCodes();
        return m.reply(result);
    }
    
    const result = deleteRedeemCode(arg);
    m.reply(result);
}
break;

case 'addredem': {
    if (!m.isOwner) return m.reply(global.balasan.forOwner);

    if (m.args.length === 0) return m.reply(`❌ Format salah!\nContoh: ${m.prefix}addredem 10000 limit:3 expire:1d`);

    const nominal = parseInt(m.args[0]);
    if (isNaN(nominal) || nominal <= 0) return m.reply('❌ Nominal harus angka positif!');

    const rest = m.args.slice(1).join(' ');
    let limit = null, expire = null;

    const limitMatch = rest.match(/limit:\s*(\d+)/i);
    if (limitMatch) limit = parseInt(limitMatch[1]);

    const expireMatch = rest.match(/expire:\s*([\d]+)([dhmyw])/i);
    if (expireMatch) {
        const num = parseInt(expireMatch[1]);
        const unit = expireMatch[2];
        const unitMap = { d: 86400000, h: 3600000, m: 60000, w: 604800000, y: 31536000000 };
        if (unitMap[unit]) expire = Date.now() + num * unitMap[unit];
    }

    const code = Math.floor(Math.random() * 1e6).toString().padStart(6, "0");
    const reward = { uang: nominal };

    addRedeemCode(code, { reward, expire, limit });

    let teks = `✅ *Kode Redeem Berhasil Dibuat*\n\n`;
    teks += `🔑 *Kode:* ${code}\n`;
    teks += `💰 *Hadiah:* ${nominal} uang\n`;
    if (limit) teks += `👥 *Maksimal Klaim:* ${limit} orang\n`;
    if (expire) teks += `⏰ *Berlaku hingga:* ${new Date(expire).toLocaleString('id-ID')}\n`;
    teks += `\n📌 Gunakan: ${m.prefix}redem ${code}`;
    m.reply(teks);
}
break;

        // ===============================
        // Case: Redeem Code
        // ===============================
        case 'redem': {
            const code = m.text;
            if (!code) return m.reply(`❌ Format salah!\nContoh: ${m.prefix}redem KODE123`);
            const result = redeemCode(m, code);
            m.reply(result);
        }
        break;

case 'listredemasli': {
    const data = loadRedeemData();
    const list = Object.entries(data.redeem || {});
    if (list.length === 0) return m.reply('📭 Belum ada kode redeem.');

    let teks = `📋 *Daftar Semua Kode Redeem*\n`;
    teks += `━━━━━━━━━━━━━━━━\n\n`;

    for (const [code, obj] of list) {
        const rewardUang = obj.reward.uang ? obj.reward.uang : '0';
        const used = obj.claimed?.length || 0;
        const limitInfo = obj.limit ? `${used}/${obj.limit}` : '∞';

        teks += `🔑 *${code}*\n`;
        teks += `💰 *Hadiah:* ${rewardUang} uang\n`;
        teks += `👥 *Klaim:* ${limitInfo}\n`;
        if (obj.expire) {
            const expireDate = new Date(obj.expire);
            const expired = expireDate < Date.now();
            teks += `⏰ *Expire:* ${expireDate.toLocaleString('id-ID')} ${expired ? '(❌ Kedaluwarsa)' : ''}\n`;
        }
        if (obj.claimed?.length > 0) {
            teks += `📌 *Pemakai:*\n`;
            obj.claimed.forEach((id, i) => {
                const shortId = id.split('@')[0];
                teks += `   ${i+1}. @${shortId}\n`;
            });
        }
        teks += `━━━━━━━━━━━━━━━━\n`;
    }
    teks += `\n✍️ Ketik ${m.prefix}redem <kode> untuk klaim.`;
    m.reply(teks);
}
break;

case 'listredem': {
    const data = loadRedeemData();
    const list = Object.entries(data.redeem || {});
    if (list.length === 0) return m.reply('📭 Belum ada kode redeem.');

    function maskCode(code) {
        if (!code) return '???';
        const chars = code.split('');
        let idx = chars.length - 1;
        while (idx >= 0 && (chars[idx] === '-' || chars[idx] === ' ')) idx--;
        if (idx >= 0) chars[idx] = '?';
        return chars.join('');
    }

    let teks = `🔐 *Daftar Kode Redeem*\n`;
    teks += `━━━━━━━━━━━━━━━━\n\n`;

    for (const [code, obj] of list) {
        const masked = maskCode(code);
        const rewardUang = obj.reward.uang ? obj.reward.uang : '0';
        const used = obj.claimed?.length || 0;
        const limitInfo = obj.limit ? `${used}/${obj.limit}` : '∞';
        let status = '✅ Aktif';
        if (obj.expire && obj.expire < Date.now()) status = '❌ Expired';
        if (obj.limit && used >= obj.limit) status = '⛔ Habis';

        teks += `🔑 *${masked}*\n`;
        teks += `💰 *Hadiah:* ${rewardUang} uang\n`;
        teks += `👥 *Klaim:* ${limitInfo}\n`;
        teks += `📊 *Status:* ${status}\n`;
        if (obj.expire && obj.expire >= Date.now()) {
            teks += `⏰ *Sisa waktu:* ${Math.ceil((obj.expire - Date.now()) / 86400000)} hari\n`;
        }
        teks += `━━━━━━━━━━━━━━━━\n`;
    }
    teks += `\n⚠️ *Digit terakhir kode disamarkan (?)*\n`;
    teks += `✍️ Gunakan ${m.prefix}redem <kode_lengkap> untuk klaim.`;
    m.reply(teks);
}
break;

//━━━━━━━━━━━━━━━[ NAMETAG SYSTEM - FIXED & USER FRIENDLY ]━━━━━━━━━━━━━━━\\

case 'helpnametag': {
    let teks = `
📘 *Panduan Fitur Nametag*

Nametag = Label khusus yang muncul di nama kamu!

🛍️ *Cara Mendapatkan Nametag*
1. Event -> ${m.prefix}claimnametagevent <nomor>
2. Berbayar -> ${m.prefix}buynametag <nomor>
3. Custom -> ${m.prefix}nametagcustom <teks>

🎨 *Cara Menggunakan Nametag*
Gunakan: ${m.prefix}usenametag <nomor>

🧹 *Hapus Nametag*
Gunakan: ${m.prefix}deletenametag <nomor>

👑 *Admin Commands*
- ${m.prefix}addnametagberbayar <nametag>|<harga>
- ${m.prefix}addnametagevent <nametag>
- ${m.prefix}deletenametagberbayar <nomor>
- ${m.prefix}deletenametagevent <nomor>

Ketik ${m.prefix}nametag untuk melihat daftar nametag tersedia.
`
    m.reply(teks)
}
break


case 'adminnametag': {
    if (!m.isOwner) return m.reply(global.balasan.forOwner)
    let teks = `
👑 *Menu Admin Nametag*

🪙 Berbayar:
- ${m.prefix}addnametagberbayar <nametag>|<harga>
  Contoh: ${m.prefix}addnametagberbayar Sultan|10000
- ${m.prefix}deletenametagberbayar <nomor>

🎉 Event:
- ${m.prefix}addnametagevent <nametag>
- ${m.prefix}deletenametagevent <nomor>
- ${m.prefix}addnametageventtouser <nomor>

📋 Lihat daftar:
- ${m.prefix}listnametagevent
- ${m.prefix}nametag
`
    m.reply(teks)
}
break


//━━━━━━━━━━━━━━━[ ADD NAMETAG BERBAYAR ]━━━━━━━━━━━━━━━\\

case 'addnametagberbayar': {
    if (!m.isOwner) return m.reply(global.balasan.forOwner)
    let [nametag, harga] = m.text.split("|")
    if (!nametag || !harga) return m.reply(`❌ Format salah!
Gunakan:
${m.prefix}addnametagberbayar <nametag>|<harga>

📘 Contoh:
${m.prefix}addnametagberbayar Sultan|10000`)
    let result = addNametagBerbayar(nametag.trim(), harga.trim())
    m.reply(`✅ Nametag *${nametag}* berhasil ditambahkan dengan harga *${harga}*!`)
}
break


//━━━━━━━━━━━━━━━[ ADD NAMETAG EVENT ]━━━━━━━━━━━━━━━\\

case 'addnametagevent': {
    if (!m.isOwner) return m.reply(global.balasan.forOwner)
    let nametag = m.text.trim()
    if (!nametag) return m.reply(`❌ Format salah!
Gunakan:
${m.prefix}addnametagevent <nametag>

📘 Contoh:
${m.prefix}addnametagevent HeroEvent`)
    let result = addNametagEvent(nametag)
    m.reply(`✅ Nametag event *${nametag}* berhasil ditambahkan!\nGunakan ${m.prefix}listnametagevent untuk melihat daftar event.`)
}
break


//━━━━━━━━━━━━━━━[ BUY NAMETAG BERBAYAR ]━━━━━━━━━━━━━━━\\

case 'buynametag': {
    let index = parseInt(m.args[0]) - 1
    if (!index && index !== 0) return m.reply(`❌ Format salah!
Gunakan:
${m.prefix}buynametag <nomor>

📘 Contoh:
${m.prefix}buynametag 2`)
    let result = buyNametagBerbayar(m, index)
    m.reply(result)
}
break


//━━━━━━━━━━━━━━━[ ADD NAMETAG EVENT TO USER ]━━━━━━━━━━━━━━━\\

case 'addnametageventtouser': {
    if (!m.isOwner) return m.reply(global.balasan.forOwner)
    let index = parseInt(m.args[0]) - 1
    if (!index && index !== 0) return m.reply(`❌ Format salah!
Gunakan:
${m.prefix}addnametageventtouser <nomor>

📘 Contoh:
${m.prefix}addnametageventtouser 1`)
    let result = addNametagEventToUser(m, index)
    m.reply(result)
}
break


//━━━━━━━━━━━━━━━[ USE NAMETAG ]━━━━━━━━━━━━━━━\\

case 'usenametag': {
    let data = loadNametagData()
    let index = parseInt(m.args[0])
    if (!index) {
        let teks = `🎨 *Nametag yang kamu miliki:*\n`
        if (data.nametagOwned && data.nametagOwned[m.sender]) {
            data.nametagOwned[m.sender].forEach((nametag, i) => teks += `${i + 1}. ${nametag}\n`)
        }
        if (data.nametagCustom && data.nametagCustom[m.sender]) {
            teks += `${(data.nametagOwned?.[m.sender]?.length || 0) + 1}. ${data.nametagCustom[m.sender][0]} (Custom)\n`
        }
        if ((!data.nametagOwned || !data.nametagOwned[m.sender]) && (!data.nametagCustom || !data.nametagCustom[m.sender])) {
            teks = '❌ Kamu belum memiliki nametag.'
        }
        teks += `\nGunakan: ${m.prefix}usenametag <nomor>`
        return m.reply(teks)
    }
    let result = useNametag(m, index)
    m.reply(result)
}
break


//━━━━━━━━━━━━━━━[ NAMETAG CUSTOM ]━━━━━━━━━━━━━━━\\

case 'nametagcustom': {
    let nametag = m.text.trim()
    if (!nametag) return m.reply(`❌ Format salah!\nContoh: ${m.prefix}nametagcustom CIHUY`)
    if (!/^[a-zA-Z0-9\s]+$/.test(nametag)) return m.reply('❌ Nametag custom tidak boleh mengandung emoji atau simbol!')
    let result = createNametagCustom(m, nametag)
    m.reply(result)
}
break


//━━━━━━━━━━━━━━━[ NAMETAG MENU ]━━━━━━━━━━━━━━━\\

case 'nametag': {
    let result = displayNametagList(m)
    let cmdnametag = `
🧾 *Perintah Nametag:*
- ${m.prefix}claimnametagevent <nomor>
- ${m.prefix}buynametag <nomor>
- ${m.prefix}usenametag <nomor>
- ${m.prefix}nametagcustom <teks>
- ${m.prefix}deletenametag <nomor>
ℹ️ Bantuan: ${m.prefix}helpnametag
`
    m.reply(result + cmdnametag)
}
break


//━━━━━━━━━━━━━━━[ EDIT NAMETAG CUSTOM ]━━━━━━━━━━━━━━━\\

case 'editnametagcustom': {
    let nametag = m.text.trim()
    if (!nametag) return m.reply(`❌ Format salah!\nContoh: ${m.prefix}editnametagcustom CIHUY`)
    let result = editNametagCustom(m, nametag)
    m.reply(result)
}
break


//━━━━━━━━━━━━━━━[ DELETE NAMETAG CUSTOM ]━━━━━━━━━━━━━━━\\

case 'deletenametagcustom': {
    let result = deleteNametagCustom(m)
    m.reply(result)
}
break


//━━━━━━━━━━━━━━━[ MY NAMETAG ]━━━━━━━━━━━━━━━\\

case 'mynametag': {
    let user = loadUserData(m.sender)
    if (user.nametag) {
        m.reply(`👤 Nametag kamu saat ini: *${user.nametag}*`)
    } else {
        m.reply(`❌ Kamu belum memiliki nametag!`)
    }
}
break


//━━━━━━━━━━━━━━━[ LIST NAMETAG EVENT ]━━━━━━━━━━━━━━━\\

case 'listnametagevent': {
    let data = loadNametagData()
    let teks = `🎉 *List Nametag Event:*\n\n`
    data.nametagEvent.forEach((nametag, i) => teks += `${i + 1}. 🎟️ ${nametag}\n`)
    m.reply(teks)
}
break


//━━━━━━━━━━━━━━━[ CLAIM NAMETAG EVENT ]━━━━━━━━━━━━━━━\\

case 'claimnametagevent': {
    let index = parseInt(m.args[0]) - 1
    if (!index && index !== 0) return m.reply(`❌ Format salah!\nContoh: ${m.prefix}claimnametagevent 1`)
    let data = loadNametagData()
    if (data.nametagEvent[index]) {
        if (!data.nametagOwned) data.nametagOwned = {}
        if (!data.nametagOwned[m.sender]) data.nametagOwned[m.sender] = []
        data.nametagOwned[m.sender].push(data.nametagEvent[index])
        saveNametagData(data)
        m.reply(`🎉 Kamu telah mendapatkan nametag event *${data.nametagEvent[index]}*!`)
    } else {
        m.reply('❌ Nametag event tidak ditemukan!')
    }
}
break


//━━━━━━━━━━━━━━━[ DELETE NAMETAG EVENT ]━━━━━━━━━━━━━━━\\

case 'deletenametagevent': {
    if (!m.isOwner) return m.reply(global.balasan.forOwner)
    let index = parseInt(m.args[0]) - 1
    if (!index && index !== 0) return m.reply(`❌ Format salah!\nContoh: ${m.prefix}deletenametagevent 1`)
    let data = loadNametagData()
    if (data.nametagEvent[index]) {
        let nametagEvent = data.nametagEvent.splice(index, 1)[0]
        saveNametagData(data)
        m.reply(`🗑️ Nametag event *${nametagEvent}* telah dihapus dari daftar.`)
    } else {
        m.reply('❌ Nametag event tidak ditemukan!')
    }
}
break


//━━━━━━━━━━━━━━━[ DELETE NAMETAG BERBAYAR ]━━━━━━━━━━━━━━━\\

case 'deletenametagberbayar': {
    if (!m.isOwner) return m.reply(global.balasan.forOwner)
    let index = parseInt(m.args[0]) - 1
    if (!index && index !== 0) return m.reply(`❌ Format salah!\nContoh: ${m.prefix}deletenametagberbayar 1`)
    let data = loadNametagData()
    if (data.nametagBerbayar[index]) {
        let nametagBerbayar = data.nametagBerbayar.splice(index, 1)[0]
        saveNametagData(data)
        m.reply(`🗑️ Nametag berbayar *${nametagBerbayar.nametag}* telah dihapus.`)
    } else {
        m.reply('❌ Nametag berbayar tidak ditemukan!')
    }
}
break


//━━━━━━━━━━━━━━━[ DELETE NAMETAG USER ]━━━━━━━━━━━━━━━\\

case 'deletenametag': {
    let data = loadNametagData()
    let index = parseInt(m.args[0])
    if (!index) {
        let teks = `🧾 *Nametag kamu:*\n`
        if (data.nametagOwned && data.nametagOwned[m.sender]) {
            data.nametagOwned[m.sender].forEach((nametag, i) => teks += `${i + 1}. ${nametag}\n`)
        }
        if (data.nametagCustom && data.nametagCustom[m.sender]) {
            teks += `${(data.nametagOwned?.[m.sender]?.length || 0) + 1}. ${data.nametagCustom[m.sender][0]} (Custom)\n`
        }
        if ((!data.nametagOwned || !data.nametagOwned[m.sender]) && (!data.nametagCustom || !data.nametagCustom[m.sender])) {
            teks = '❌ Kamu belum memiliki nametag.'
        }
        teks += `\n⚠️ Gunakan: ${m.prefix}deletenametag <nomor>`
        return m.reply(teks)
    }
    let result = deleteNametag(m, index)
    m.reply(result)
}
break

        case 'quotesanime':
        case 'quanim': {
            try {

                m.reply(global.balasan.tungguin)
                await sleep(3000)

                const quotesAnim = await quotesAnime();
                const quotesAcak = quotesAnim[Math.floor(Math.random() * quotesAnim.length)];
                const character = quotesAcak.karakter;
                const anime = quotesAcak.anime;
                const episode = quotesAcak.episode;
                const detailQuotes = await quotesAnimeDetail(quotesAcak.link);
                const fontPath = path.join(directory, 'assets/fonts/font-meme.ttf');
                const inputPath = path.join(directory, 'temp/temp-banner-image.jpg');
                const outputPath = path.join(directory, 'temp/temp-banner-output.jpg');
                const fetchBuf = await fetchBuffer(detailQuotes[0].gambar);
                await fs.writeFileSync(inputPath, fetchBuf?.data);
                const command = `magick "${inputPath}" -resize x600 -gravity west -background "#2f2f2f" -extent 1600x600 \
      -fill white -stroke black -strokewidth 2 -font "${fontPath}" -pointsize 72 -gravity northwest \
      -annotate +650+150 "Karakter: ${character}" \
      -annotate +650+250 "Anime: ${anime}" \
      -annotate +650+350 "Episode: ${episode}" \
      -quality 10 -strip "${outputPath}"`.trim();
                exec(command, async (error, stdout, stderr) => {
                    if (error) {
                        console.log(stderr);
                        // Kirim tanpa gambar
                        m.reply(`*• Karakter:* ${character}\n*• Anime:* ${anime}\n*• Episode:* ${episode}\n\n*✒️ Quotes:*\n${detailQuotes[0].quotes}\n\n*📢 Tags:*\n${detailQuotes[0].tag}`)
                    } else {
                        sock.sendMessage(m.from, {
                            image: fs.readFileSync(outputPath),
                            caption: `*• Karakter:* ${character}\n*• Anime:* ${anime}\n*• Episode:* ${episode}\n\n*✒️ Quotes:*\n${detailQuotes[0].quotes}\n\n*📢 Tags:*\n${detailQuotes[0].tag}`,
                        });
                        fs.unlinkSync(inputPath);
                        fs.unlinkSync(outputPath);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
        break

        // Tes chat iphone
        case 'iqc': {
        if (!global.db.bot.termuxMode) return m.reply(global.balasan.runNoTermux);
            await buatChatIphone(sock, m.quoted, m.from, m);
            return;
        }
        break
        // Tes soalan
        case 'soalan': {
        if (!global.db.bot.termuxMode) return m.reply(global.balasan.runNoTermux);
            await buatSoalan(sock, m.quoted, m.from, m);
            return;
        }
        // Tes fakengl
        case 'fakengl': {
        if (!global.db.bot.termuxMode) return m.reply(global.balasan.runNoTermux);
            await buatFakeNgl(sock, m.quoted, m.from, m);
            return;
        }
        break
        case 'qc': {
        if (!global.db.bot.termuxMode) return m.reply(global.balasan.runNoTermux);
            const ppUser = path.join(directory, `temp/pp-${m.sender}.png`);
            const ppUrl = await sock.profilePictureUrl(m.sender, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');
            let buffer = await downloadProfilePicture(ppUrl, ppUser);
            await buatChat(sock, ppUser, m.quoted, m.from, m);
            return;
        }
        break
        case 'fakecall': {
        if (!global.db.bot.termuxMode) return m.reply(global.balasan.runNoTermux);
            const targetMsg = m.quoted ? m.quoted : m;

            if (targetMsg.mtype !== 'imageMessage') {
                return m.reply('❌ Silakan kirim atau reply ke gambar untuk dijadikan foto profile fake call.');
            }
            
            const buffer = await downloadMediaMessage(targetMsg);
            const ppSender = path.join(directory, `temp/pp-${m.sender}.jpg`);
            // Simpan
            fs.writeFileSync(ppSender, buffer);
            // Proses
            await buatFakeCall(sock, ppSender, m.from, m, m.text);
            // Bersihkan
            fs.unlinkSync(ppSender);
            
            return;
        }
        break
        case 'subtitle': {
        if (!global.db.bot.termuxMode) return m.reply(global.balasan.runNoTermux);
            const targetMsg = m.quoted ? m.quoted : m;

            if (targetMsg.mtype !== 'imageMessage') {
                return m.reply('❌ Silakan kirim atau reply ke gambar untuk ditambahkan subtitle.');
            }
            
            const buffer = await downloadMediaMessage(targetMsg);
            const ppSender = path.join(directory, `temp/pp-${m.sender}.jpg`);
            // Simpan
            fs.writeFileSync(ppSender, buffer);
            // Proses
            await buatSubtitleImage(sock, m.from, m, ppSender);
            // Bersihkan
            fs.unlinkSync(ppSender);
            
            return;
        }
        break
        case 'tobit': {
        if (!global.db.bot.termuxMode) return m.reply(global.balasan.runNoTermux);
            const targetMsg = m.quoted ? m.quoted : m;

            if (targetMsg.mtype !== 'imageMessage') {
                return m.reply('❌ Silakan kirim atau reply ke gambar untuk dijadikan pixel art.');
            }
            
            const buffer = await downloadMediaMessage(targetMsg);
            const ppSender = path.join(directory, `temp/pp-${m.sender}.jpg`);
            // Simpan
            fs.writeFileSync(ppSender, buffer);
            // Proses
            await buatPixelArt(sock, m.from, m, ppSender);
            // Bersihkan
            fs.unlinkSync(ppSender);
            
            return;
        }
        break
        case 'youdied':
        case 'yuded': {
        if (!global.db.bot.termuxMode) return m.reply(global.balasan.runNoTermux);
            const targetMsg = m.quoted ? m.quoted : m;

            if (targetMsg.mtype !== 'imageMessage') {
                return m.reply('❌ Silakan kirim atau reply ke gambar untuk ditambah filter.');
            }
            
            const buffer = await downloadMediaMessage(targetMsg);
            const ppSender = path.join(directory, `temp/yuded-${m.sender}.jpg`);
            // Simpan
            fs.writeFileSync(ppSender, buffer);
            // Proses
            await buatFilterYouDied(sock, ppSender, m.from, m);
            // Bersihkan
            fs.unlinkSync(ppSender);
            
            return;
        }
        break
        case 'jilat':
        case 'jilatin': {
        if (!global.db.bot.termuxMode) return m.reply(global.balasan.runNoTermux);
            const targetMsg = m.quoted ? m.quoted : m;

            if (targetMsg.mtype !== 'imageMessage') {
                return m.reply('❌ Silakan kirim atau reply ke gambar untuk ditambah filter.');
            }
            
            const buffer = await downloadMediaMessage(targetMsg);
            const ppSender = path.join(directory, `temp/jilat-${m.sender}.jpg`);
            // Simpan
            fs.writeFileSync(ppSender, buffer);
            // Proses
            await buatFilterJilat(sock, ppSender, m.from, m);
            // Bersihkan
            fs.unlinkSync(ppSender);
            
            return;
        }
        break
        case 'towew':
        case 'towewew': {
        if (!global.db.bot.termuxMode) return m.reply(global.balasan.runNoTermux);
            const targetMsg = m.quoted ? m.quoted : m;

            if (targetMsg.mtype !== 'imageMessage') {
                return m.reply('❌ Silakan kirim atau reply ke gambar untuk ditambah filter.');
            }
            
            const buffer = await downloadMediaMessage(targetMsg);
            const ppSender = path.join(directory, `temp/jilat-${m.sender}.jpg`);
            // Simpan
            fs.writeFileSync(ppSender, buffer);
            // Proses
            await buatFilterTowew(sock, ppSender, m.from, m);
            // Bersihkan
            fs.unlinkSync(ppSender);
            
            return;
        }
        break
        case 'pov': {
        if (!global.db.bot.termuxMode) return m.reply(global.balasan.runNoTermux);
            const targetMsg = m.quoted ? m.quoted : m;

            if (targetMsg.mtype !== 'imageMessage') {
                return m.reply('❌ Silakan kirim atau reply ke gambar untuk ditambah filter.');
            }
            
            const buffer = await downloadMediaMessage(targetMsg);
            const ppSender = path.join(directory, `temp/jilat-${m.sender}.jpg`);
            // Simpan
            fs.writeFileSync(ppSender, buffer);
            // Proses
            await buatFilterPOV(sock, ppSender, m.from, m);
            // Bersihkan
            fs.unlinkSync(ppSender);
            
            return;
        }
        break
        case 'ktp': {
        if (!global.db.bot.termuxMode) return m.reply(global.balasan.runNoTermux);
            try {
                // Kalau user reply ke gambar
                if (m.quoted && m.quoted.mtype === 'imageMessage') {
                    // Gunakan gambar dari pesan yang dikutip
                    m.quoted.body = m.body;
                    await buatKartuKTP(sock, m.quoted, m.from, m);
                    return;
                }

                // Kalau user langsung kirim gambar + caption "ktp"
                if (m.mtype === 'imageMessage') {
                    await buatKartuKTP(sock, m, m.from);
                    return;
                }

                // Kalau bukan gambar dan bukan reply gambar
                return await sock.sendMessage(m.from, {
                    text: `❌ Silakan kirim atau reply ke gambar dengan format:\n\n${m.prefix}ktp | nama | gender | domisili | agama | hobi`,
                }, {
                    quoted: m
                });

            } catch (err) {
                console.error('❌ Error di case ktp:', err);
                await sock.sendMessage(m.from, {
                    text: '⚠️ Terjadi kesalahan saat membuat kartu KTP.',
                }, {
                    quoted: m
                });
            }
        }
        break;

//━━━━━━━━━━━━━━━[ SETTING BANNER ]━━━━━━━━━━━━━━━\\

case 'gbg':
case 'setbanner': {
    try {
        // Pastikan ada gambar (langsung atau reply)
        if (!(m.mtype === 'imageMessage' || m.quoted?.mtype === 'imageMessage')) {
            return m.reply('❌ Silakan kirim atau reply ke gambar untuk dijadikan background.');
        }

        const targetMsg = m.quoted ? m.quoted : m;
        const buffer = await downloadMediaMessage(targetMsg);

        const filename = `${m.sender}.jpg`;
        const filepath = path.join(bannerBgDir, filename);
        const tmpFile = path.join(directory, `temp/${m.sender}.jpg`);

        fs.writeFileSync(tmpFile, buffer);

        m.reply(global.balasan.tungguin);
        await sleep(3000);

        const resizeCmd = `magick "${tmpFile}" -resize 480x180! "${filepath}"`;

        exec(resizeCmd, (err) => {
            try {
                if (err) {
                    console.error('⚠️ Resize gagal, fallback ke gambar asli:', err.message);

                    // 🔁 Fallback: simpan gambar tanpa resize
                    fs.copyFileSync(tmpFile, filepath);

                    sock.sendMessage(m.from, {
                        text: '⚠️ ImageMagick error.\n✅ Background disimpan tanpa resize.',
                    }, { quoted: m });
                } else {
                    sock.sendMessage(m.from, {
                        text: '✅ Background berhasil diganti dan di-resize!',
                    }, { quoted: m });
                }
            } catch (copyErr) {
                console.error('❌ Gagal fallback simpan gambar:', copyErr);
                sock.sendMessage(m.from, {
                    text: '❌ Gagal menyimpan background.',
                }, { quoted: m });
            } finally {
                // 🧹 Bersihkan temp file
                if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
            }
        });

    } catch (err) {
        console.error('❌ Error di case gbg/setbanner:', err);
        await sock.sendMessage(m.from, {
            text: '⚠️ Terjadi kesalahan saat mengganti background.',
        }, { quoted: m });
    }
}
break;

        case 'hbg':
        case 'delbanner': {
            try {
                const filepath = path.join(bannerBgDir, `${m.sender}.jpg`);

                if (!fs.existsSync(filepath)) {
                    return sock.sendMessage(m.from, {
                        text: '❌ Anda belum memiliki background.',
                    }, {
                        quoted: m
                    });
                }

                fs.unlinkSync(filepath);

                await sock.sendMessage(m.from, {
                    text: '✅ Background berhasil dihapus!',
                }, {
                    quoted: m
                });

            } catch (err) {
                console.error('❌ Error di case hbg/delbanner:', err);
                await sock.sendMessage(m.from, {
                    text: '⚠️ Terjadi kesalahan saat menghapus background.',
                }, {
                    quoted: m
                });
            }
        }
        break;

//━━━━━━━━━━━━━━━[ BOTINFO ]━━━━━━━━━━━━━━━\\
        
        case 'rt':
        case 'runtime': {
          const uptime = process.uptime();
          const days = Math.floor(uptime / 86400);
          const hours = Math.floor((uptime % 86400) / 3600);
          const minutes = Math.floor((uptime % 3600) / 60);
          const seconds = Math.floor(uptime % 60);
          const message = `Aktif: ${days}d ${hours}h ${minutes}m ${seconds}s`;
          m.reply(message);
          }
          break;
case 'ping': {
await m.reply(`Pong!`);
} break
        case 'speedtest': {
            try {
                const start = performance.now();
                const execAsync = util.promisify(exec);
                m.reply(global.balasan.tungguin);

                const totalMemGB = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
                const freeMemGB = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
                const uptime = os.uptime();
                const cpuInfo = os.cpus()[0]?.model || "Tidak tersedia";

                // Versi async dan lebih aman
                const {
                    stdout,
                    stderr
                } = await execAsync('speedtest-cli --share', {
                    timeout: 30000
                });

                const imageUrl = stdout.match(/http:\/\/www\.speedtest\.net\/result\/\d+\.png/);

                const info = `📡 *Informasi Server:*
───────────────
🖥️ CPU: ${cpuInfo}
🕒 Uptime: ${Math.floor(uptime / 3600)} jam ${Math.floor((uptime % 3600) / 60)} menit
💾 RAM: ${freeMemGB} GB / ${totalMemGB} GB
⚡ Respons: ${(performance.now() - start).toFixed(3)} ms
${imageUrl ? "🌐 Mengirim hasil speedtest..." : "❌ Gambar speedtest tidak ditemukan"}
───────────────`;

                await m.reply(info);

                if (imageUrl && imageUrl[0]) {
                    const response = await axios.get(imageUrl[0], {
                        responseType: 'arraybuffer'
                    });
                    const imagePath = path.join(tempDir, 'speedtest.png');
                    fs.writeFileSync(imagePath, response.data);

                    await sock.sendMessage(m.from, {
                        image: fs.readFileSync(imagePath),
                        caption: "🌐 Hasil speedtest koneksi:"
                    }, {
                        quoted: m
                    });

                    fs.unlinkSync(imagePath);
                } else {
                    console.log("⚠️ Tidak menemukan URL gambar:", stdout);
                }
            } catch (err) {
                console.log("❌ Error speedtest:", err);
                m.reply("❌ Terjadi kesalahan saat menjalankan speedtest. Pastikan perintah `speedtest-cli` sudah terinstal.");
            }
        } break
        
        case 'listgc':
        case 'listgrup': {
            const {
                list,
                text
            } = await getGroupList(sock, m.sender);
            m.reply(text);
        }
        break

//━━━━━━━━━━━━━━━[ LOGINN ]━━━━━━━━━━━━━━━\\

case 'login': {
    // Jika user tetap memasukkan teks, beri tahu bahwa tidak perlu
    if (m.text) {
        return m.reply(`⚠️ Tidak perlu memasukkan nomor. Cukup ketik *${m.prefix + command}* untuk mendaftar otomatis.`);
    }

    const groupId = m.from; // ID grup
    let groupMeta;
    try {
        groupMeta = await sock.groupMetadata(groupId);
    } catch (err) {
        console.error('Gagal mengambil metadata grup:', err);
        return m.reply('❌ Gagal mengambil data grup. Coba lagi nanti.');
    }

    if (!groupMeta || !groupMeta.participants) {
        return m.reply('❌ Data grup tidak valid.');
    }

    // Cari peserta dengan id yang sama dengan m.sender (format @lid)
    const participant = groupMeta.participants.find(p => p.id === m.sender);
    if (!participant) {
        return m.reply(`❌ Kamu tidak ditemukan dalam daftar anggota grup ini.\n\n⚠️ Silahkan ketik ${m.prefix}daftar 62xxxxx\nHarus menggunakan nomor asli, yang saat ini sedang digunakan.`);
    }

    const lid = m.sender;          // sudah berakhiran @lid
    const jid = participant.phoneNumber; // sudah berakhiran @s.whatsapp.net

    // Cek apakah sudah terhubung sebelumnya
    const linked = loadLinked();   // fungsi loadLinked harus tersedia
    if (linked[lid]) {
        return m.reply('⚠️ Akunmu sudah terhubung sebelumnya.');
    }

    // Simpan hubungan lid → jid
    linked[lid] = jid;
    saveLinked(linked);            // fungsi saveLinked harus tersedia

    m.reply('✅ Akun berhasil dihubungkan secara otomatis!');
    break;
}

case 'daftar': {
    if (!m.text) return m.reply(`⚠️ Masukkan nomor aslimu!\nContoh penggunaan ${m.prefix + command} 62xxxxx`);

    // 🔍 Cek apakah ada huruf dalam input
    if (/[a-zA-Z]/.test(m.text)) {
        return m.reply(`⚠️ Nomor tidak boleh mengandung huruf. Harap masukkan hanya angka dan tanda + (jika perlu).\n\nContoh penggunaan ${m.prefix + command} 62xxxxx`);
    }

    function normalizePhone(input) {
        let num = input.replace(/[^0-9+]/g, ""); // buang karakter non-digit (sudah dipastikan tidak ada huruf, tapi tetap bersihkan simbol lain)

        if (num.startsWith("+")) num = num.slice(1);       // hapus +
        if (num.startsWith("0")) num = "62" + num.slice(1); // ubah 08xxxx -> 628xxxx
        if (!num.startsWith("62")) num = "62" + num;        // jaga-jaga bila user ketik: 813xxxx

        return num + "@s.whatsapp.net"; // hasil akhir JID
    }

    const selectedGroup = m.from;
    const loginTarget = normalizePhone(m.text);

    // cek nomor / target yang ingin dikaitkan
    const data = await sock.onWhatsApp(loginTarget);

    // Validasi kecocokan lid dengan pengirim
    if (data && data[0] && data[0]?.jid && data[0]?.lid && data[0]?.lid === m.sender) {
        const info = data[0];
        const lid = info.lid; // m.sender;
        const jid = info.jid;

        // Hubungkan akun lid ↔ jid
        const linked = loadLinked();
        linked[lid] = jid;
        saveLinked(linked);

        return m.reply('✅ Akun berhasil dihubungkan!');
    } else {
        // Buat kode login
        const code = Math.random().toString(36).slice(2, 8).toUpperCase();

        loginCodes[code] = {
            lid: selectedGroup,
            user: loginTarget,
            createdAt: Date.now(),
        };

        // expire 5 menit
        setTimeout(() => delete loginCodes[code], 5 * 60 * 1000);

        // Kirim kode ke private chat target
        await sock.sendMessage(loginTarget, {
            text: `🛡️ Kirim kode ini di grup:\n\n${code}`
        });

        await sleep(5000);

        // Notifikasi di grup
        await sock.sendMessage(selectedGroup, {
            text: `🔔 Kode login telah dikirim ke private chat!`
        }, { quoted: m });
    }
}
break;

case 'daftar1': {
if (!m.text) return m.reply(`⚠️ Masukkan nomor aslimu!\nContoh penggunaan ${m.prefix + command} 62xxxxx`)
function normalizePhone(input) {
    let num = input.replace(/[^0-9+]/g, ""); // buang karakter non-digit

    if (num.startsWith("+")) num = num.slice(1);       // hapus +
    if (num.startsWith("0")) num = "62" + num.slice(1); // ubah 08xxxx -> 628xxxx
    if (!num.startsWith("62")) num = "62" + num;        // jaga-jaga bila user ketik: 813xxxx

    return num + "@s.whatsapp.net"; // hasil akhir JID
}

    const selectedGroup = m.from;

    // ----- NORMALISASI NOMOR / LOGIN TARGET -----
    const loginTarget = normalizePhone(m.text);

// cek nomor / target yang ingin dikaitkan
const data = await sock.onWhatsApp(loginTarget);

// Validasi kecocokan lid dengan pengirim
if (data && data[0] && data[0]?.jid && data[0]?.lid && data[0]?.lid === m.sender) {
  
  const info = data[0];
  const lid = info.lid // m.sender;
  const jid = info.jid;

  // Hubungkan akun lid ↔ jid
  const linked = loadLinked();
  linked[lid] = jid;
  saveLinked(linked);

  return m.reply('✅ Akun berhasil dihubungkan!');
} else {

    // Buat kode login
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();

    loginCodes[code] = {
        lid: selectedGroup,
        user: loginTarget,
        createdAt: Date.now(),
    };

    // expire 5 menit
    setTimeout(() => delete loginCodes[code], 5 * 60 * 1000);

    // ----- KIRIM KE PRIVATE -----
    await sock.sendMessage(loginTarget, {
        text: `🛡️ Kirim kode ini di grup:\n\n${code}`
    });
    
    await sleep(5000)
    
    // ----- NOTIFIKASI DI GRUP -----
    await sock.sendMessage(selectedGroup, {
        text: `🔔 Kode login telah dikirim ke private chat!`
    }, { quoted: m });
    }
}
break;

//━━━━━━━━━━━━━━━[ SOURCE CODE ]━━━━━━━━━━━━━━━\\

case 'sc':
case 'sourcecode': {
m.reply(`*SOURCE CODE*\n\n⚠️ Script ini dijual, 15k saja, berminat? hubungi @${global.owner[0].replace('@s.whatsapp.net', '')}\n
[ *Perkenalan Miku Bot script* ]
Miku Bot adalah sebuah projek yang dibuat oleh seseorang bernama Farel, yang bertujuan untuk memudahkan pekerjaan manusia, projek itu sudah dimulai dari tahun 2021, akan tetapi script ini adalah hasil projek fix yang terbaru, karena dulunya si Farel sangat suka ganti script, sehingga tidak ada projek yang serius, tetapi kali ini dia membuat projek dengan sepenuh hati yang menggabungkan berbagai idenya yang sudah diterapkan di projek sebelumnya.

[ *Fitur unggulan dari Miku Bot* ]
Selain sistem yang sedikit berbeda dengan bot lain, Miku Bot juga memiliki berbagai fitur yang menarik loh, diantaranya adalah:

*(Game RPG)*
- Berkebun 👨‍🌾👩‍🌾
- Roleplay menikahi anime 🤩
- Meningkatkan stats 💪
- Multiplayer duel 🌐⚔️

*(Fitur converter)*
⚠️ (Tanpa API, menggunakan local)
- Stiker (video & foto)
- Toimg & Tovideo
- Brat
- Iqc
- Ktp

Fitur lainnya kalian cek sendiri aja ya 🤗.
Untuk script Miku Bot masih proses pengembangan, dan perbaikan, oleh karenanya apabila ada yang menemukan bug, secepatnya lapor demi kemajuan script ini.`);
} break;

//━━━━━━━━━━━━━━━[ ENGAI ]━━━━━━━━━━━━━━━\\

case 'filterai': {
    const senderIsOwner = loadOwner().includes(m.sender);
    if (!senderIsOwner) return m.reply('❌ Hanya owner yang dapat menambah filter.');

    let targets = [];
    if (m.mentions?.length) targets.push(...m.mentions);
    if (m.args.length && !m.mentions.length && !m.quoted) targets.push(...m.args);
    if (m.quoted?.sender) targets.push(m.quoted.sender);

    // Jika tidak ada target -> diri sendiri
    if (!targets.length) targets.push(m.sender);

    targets = targets.map(t => getActualJID(t));

    const valid = [];
    const invalid = [];

    for (let id of targets) {
        if (!id) continue;

        if (id.endsWith('@s.whatsapp.net')) {
            valid.push(id);
        } else {
            invalid.push(id);
        }
    }

    const filtered = loadFilter(m.from);
    const added = [];
    const skipped = [];

    for (const id of valid) {
        if (filtered.includes(id)) skipped.push(id);
        else {
            filtered.push(id);
            added.push(id);
        }
    }

    saveFilter(m.from, filtered);

    let msg = '';

    if (added.length)
        msg += `✅ User berikut telah di-filter:\n${added.map(x => `@${x.split('@')[0]}`).join('\n')}\n\n`;

    if (skipped.length)
        msg += `⚠️ Sudah di-filter sebelumnya:\n${skipped.map(x => `@${x.split('@')[0]}`).join('\n')}\n\n`;

    if (invalid.length)
        msg += `❌ User belum terdaftar WhatsApp:\n${invalid.map(x => x.split('@')[0]).join('\n')}`;

    if (!msg) msg = '⚠️ Tidak ada perubahan.';

    const mentions = [...added, ...skipped];

    m.reply(msg.trim(), null, { mentions });
}
break;

case 'unfilterai': {
    const senderIsOwner = loadOwner().includes(m.sender);
    if (!senderIsOwner) return m.reply('❌ Hanya owner yang dapat menghapus filter.');

    let targets = [];
    if (m.mentions?.length) targets.push(...m.mentions);
    if (m.args.length && !m.mentions.length && !m.quoted) targets.push(...m.args);
    if (m.quoted?.sender) targets.push(m.quoted.sender);

    // jika tidak ada target -> diri sendiri
    if (!targets.length) targets.push(m.sender);

    targets = targets.map(t => getActualJID(t));

    const valid = [];
    const invalid = [];

    for (let id of targets) {
        if (!id) continue;

        if (id.endsWith('@s.whatsapp.net')) {
            valid.push(id);
        } else {
            invalid.push(id);
        }
    }

    const filtered = loadFilter(m.from);
    const removed = [];
    const skipped = [];

    for (const id of valid) {
        if (!filtered.includes(id)) {
            skipped.push(id);
        } else {
            const idx = filtered.indexOf(id);
            filtered.splice(idx, 1);
            removed.push(id);
        }
    }

    saveFilter(m.from, filtered);

    let msg = '';

    if (removed.length)
        msg += `✅ User berikut telah di-unfilter:\n${removed.map(x => `@${x.split('@')[0]}`).join('\n')}\n\n`;

    if (skipped.length)
        msg += `⚠️ User berikut tidak sedang di-filter:\n${skipped.map(x => `@${x.split('@')[0]}`).join('\n')}\n\n`;

    if (invalid.length)
        msg += `❌ User belum terdaftar WhatsApp:\n${invalid.map(x => x.split('@')[0]).join('\n')}`;

    if (!msg) msg = '⚠️ Tidak ada perubahan.';

    const mentions = [...removed, ...skipped];

    m.reply(msg.trim(), null, { mentions });
}
break;

//━━━━━━━━━━━━━━━[ OWNER ]━━━━━━━━━━━━━━━\\

        case 'listowner':
        case 'owner': {
            const owners = loadOwner(); // semua: global + file

            if (!owners.length) return m.reply('⚠️ Tidak ada owner.');

            const list = owners.map((id, i) => `*${i + 1}.* wa.me/${id.split('@')[0]}`).join('\n');
            m.reply(`👑 *Daftar Owner Bot:*\n\n${list}\n\n*- THANKS TO -*
 • ChatGPT
 • Danta
 • Rhasta
 • Xinz-Team
 • Adiwajshing/Baileys
 • Whiskeysockets/Baileys
 • AID Team
 • KEV.STORE
 • Hilmi`);
        }
        break

case 'addowner': {
    const senderIsOwner = loadOwner().includes(m.sender);
    if (!senderIsOwner) return m.reply('❌ Hanya owner yang bisa menambahkan owner.');

    let targets = [];
    if (m.mentions?.length) targets.push(...m.mentions);
    if (m.args.length && !m.mentions.length && !m.quoted) targets.push(...m.args);
    if (m.quoted?.sender) targets.push(m.quoted.sender);

    targets = targets.map(t => getActualJID(t));

    const valid = [];
    const invalid = [];

    for (let id of targets) {
        if (!id) continue;

        if (id.endsWith('@s.whatsapp.net')) {
            valid.push(id);
        } else {
            invalid.push(id);
        }
    }

    if (!valid.length && invalid.length)
        return m.reply('⚠️ Pengguna tersebut belum terdaftar atau belum terhubung ke WhatsApp.');

    const fileOwners = JSON.parse(fs.readFileSync('temp/owner.json')).owners || [];
    const currentOwners = [...new Set([...global.owner, ...fileOwners])];

    const added = [];
    const skipped = [];

    for (const id of valid) {
        if (currentOwners.includes(id)) skipped.push(id);
        else {
            fileOwners.push(id);
            added.push(id);
        }
    }

    saveFileOwners(fileOwners);

    let msg = '';

    if (added.length)
        msg += `✅ Berhasil menambahkan owner:\n${added.map(x => `@${x.split('@')[0]}`).join('\n')}\n\n`;

    if (skipped.length)
        msg += `⚠️ Sudah jadi owner sebelumnya:\n${skipped.map(x => `@${x.split('@')[0]}`).join('\n')}\n\n`;

    if (invalid.length)
        msg += `❌ User belum terdaftar WhatsApp:\n${invalid.map(x => x.split('@')[0]).join('\n')}`;

    if (!msg) msg = '⚠️ Tidak ada perubahan.';

    const mentions = [...added, ...skipped];

    m.reply(msg.trim(), null, { mentions });
}
break;


case 'delowner': {
    const senderIsOwner = loadOwner().includes(m.sender);
    if (!senderIsOwner) return m.reply('❌ Hanya owner yang bisa menghapus owner.');

    let targets = [];
    if (m.mentions?.length) targets.push(...m.mentions);
    if (m.args.length && !m.mentions.length && !m.quoted) targets.push(...m.args);
    if (m.quoted?.sender) targets.push(m.quoted.sender);

    const fileOwners = JSON.parse(fs.readFileSync('temp/owner.json')).owners || [];

    // jika -all
    if (m.args[0] === '-all') {
        if (!fileOwners.length) return m.reply('⚠️ Tidak ada owner tambahan yang tersimpan.');
        saveFileOwners([]);
        return m.reply('🗑️ Semua owner tambahan telah dihapus (owner default tetap).');
    }

    targets = targets.map(t => getActualJID(t));

    const valid = [];
    const invalid = [];

    for (let id of targets) {
        if (!id) continue;

        if (id.endsWith('@s.whatsapp.net')) {
            valid.push(id);
        } else {
            invalid.push(id);
        }
    }

    if (!valid.length && invalid.length)
        return m.reply('⚠️ Pengguna tersebut belum terdaftar atau belum terhubung ke WhatsApp.');

    const protectedOwners = global.owner;

    const removed = [];
    const notFound = [];
    const skipped = [];

    for (const id of valid) {
        if (protectedOwners.includes(id)) {
            skipped.push(id);
            continue;
        }

        if (!fileOwners.includes(id)) {
            notFound.push(id);
            continue;
        }

        removed.push(id);
    }

    const updatedOwners = fileOwners.filter(o => !removed.includes(o));
    saveFileOwners(updatedOwners);

    let msg = '';

    if (removed.length)
        msg += `✅ Berhasil menghapus owner:\n${removed.map(x => `@${x.split('@')[0]}`).join('\n')}\n\n`;

    if (skipped.length)
        msg += `⚠️ Tidak bisa dihapus (owner default):\n${skipped.map(x => `@${x.split('@')[0]}`).join('\n')}\n\n`;

    if (notFound.length)
        msg += `⚠️ Tidak ditemukan di daftar owner:\n${notFound.map(x => `@${x.split('@')[0]}`).join('\n')}\n\n`;

    if (invalid.length)
        msg += `❌ User belum terdaftar WhatsApp:\n${invalid.map(x => x.split('@')[0]).join('\n')}`;

    if (!msg) msg = '⚠️ Tidak ada perubahan.';

    const mentions = [...removed, ...skipped, ...notFound];

    m.reply(msg.trim(), null, { mentions });
}
break;

//━━━━━━━━━━━━━━━[ SETMODE ]━━━━━━━━━━━━━━━\\

case 'bot':
case 'statbot': {
    // Hanya untuk owner (karena menyangkut pengaturan bot)
    const senderIsOwner = loadOwner().includes(m.sender);
    if (!senderIsOwner) return m.reply(global.balasan.forOwner);
    
    const botSettings = global.db.bot || {};
    const termuxMode = botSettings.termuxMode === true;
    const nsfwMode = botSettings.nsfwMode === true;
    
    const statusText = (value) => value ? '✅ Aktif' : '❌ Nonaktif';
    
    const caption = 
`🤖 *STATUS PENGATURAN BOT*
━━━━━━━━━━━━━━━━
📱 *Mode Termux* : ${statusText(termuxMode)}
🔞 *Mode NSFW*   : ${statusText(nsfwMode)}
━━━━━━━━━━━━━━━━
_Gunakan perintah *${m.prefix}mode* untuk mengubah._`;
    
    m.reply(caption);
}
break;

case 'mode': {
    const senderIsOwner = loadOwner().includes(m.sender);
    if (!senderIsOwner) return m.reply(global.balasan.forOwner);

        // BUTTON
        const metadata = tambahButton(m.from, {
            nama: "1",
            cmd: `${m.prefix}ontermux`
        }, {
            nama: "2",
            cmd: `${m.prefix}notermux`
        }, {
            nama: "3",
            cmd: `${m.prefix}nsfwon`
        }, {
            nama: "4",
            cmd: `${m.prefix}nsfwoff`
        });
        m.reply(`*📜 Panduan:*\nSilahkan *reply/balas* pesan ini dengan mengetik nomor *1/2/3* ...dan seterusnya.\n\n*List mode:*\n\n1. Termux\n2. Bukan termux\n3. Sensitif\n4. Aman\n\nMetadata: ${metadata}`)
} break

case 'setmode': {
    const senderIsOwner = loadOwner().includes(m.sender);
    if (!senderIsOwner) return m.reply(global.balasan.forOwner);
    if (m.args.length < 1) {
        return m.reply(`❌ Penggunaan: .setmode [ontermux/notermux]
📝 Contoh: .setmode ontermux
📝 Contoh: .setmode notermux`);
    }
    
    const mode = m.args[0].toLowerCase();
    
    if (!global.db.bot) global.db.bot = {};
    
    if (mode === 'ontermux') {
        global.db.bot.termuxMode = true;
        m.reply(`✅ *Mode Termux* telah diaktifkan!
📌 Bot sekarang berjalan dalam mode Termux.`);
    } 
    else if (mode === 'notermux') {
        global.db.bot.termuxMode = false;
        m.reply(`✅ *Mode Termux* telah dinonaktifkan!
📌 Bot sekarang berjalan dalam mode non-Termux.`);
    } 
    else {
        m.reply(`❌ Mode tidak valid!
Pilihan yang tersedia: ontermux atau notermux`);
    }
}
break;

case 'nsfw': {
    const senderIsOwner = loadOwner().includes(m.sender);
    if (!senderIsOwner) return m.reply(global.balasan.forOwner);
    if (m.args.length < 1) {
        return m.reply(`❌ Penggunaan: ${m.prefix}nsfw [on/off]
📝 Contoh: ${m.prefix}nsfw on
📝 Contoh: ${m.prefix}nsfw off`);
    }
    
    const mode = m.args[0].toLowerCase();
    
    if (!global.db.bot) global.db.bot = {};
    
    if (mode === 'on') {
        global.db.bot.nsfwMode = true;
        m.reply(`✅ *Mode Nsfw* telah diaktifkan!
📌 Bot sekarang berjalan dalam mode sensitif.`);
    } 
    else if (mode === 'notermux') {
        global.db.bot.nsfwMode = false;
        m.reply(`✅ *Mode Nsfw* telah dinonaktifkan!
📌 Bot sekarang berjalan dalam mode aman.`);
    } 
    else {
        m.reply(`❌ Mode tidak valid!
Pilihan yang tersedia: on atau off`);
    }
}
break;

// Opsi alternatif: jika ingin perintah terpisah seperti contoh welcome
case 'ontermux': {
    const senderIsOwner = loadOwner().includes(m.sender);
    if (!senderIsOwner) return m.reply(global.balasan.forOwner);
    if (!global.db.bot) global.db.bot = {};
    global.db.bot.termuxMode = true;
    m.reply(`✅ *Mode Termux* telah diaktifkan!
📌 Bot sekarang berjalan dalam mode Termux.`);
}
break;

case 'notermux': {
    const senderIsOwner = loadOwner().includes(m.sender);
    if (!senderIsOwner) return m.reply(global.balasan.forOwner);
    if (!global.db.bot) global.db.bot = {};
    global.db.bot.termuxMode = false;
    m.reply(`✅ *Mode Termux* telah dinonaktifkan!
📌 Bot sekarang berjalan dalam mode non-Termux.`);
}
break;

// Opsi alternatif: jika ingin perintah terpisah seperti contoh welcome
case 'nsfwon': {
    const senderIsOwner = loadOwner().includes(m.sender);
    if (!senderIsOwner) return m.reply(global.balasan.forOwner);
    if (!global.db.bot) global.db.bot = {};
    global.db.bot.nsfwMode = true;
    m.reply(`✅ *Mode Nsfw* telah diaktifkan!
📌 Bot sekarang berjalan dalam mode Sensitif.`);
}
break;

case 'nsfwoff': {
    const senderIsOwner = loadOwner().includes(m.sender);
    if (!senderIsOwner) return m.reply(global.balasan.forOwner);
    if (!global.db.bot) global.db.bot = {};
    global.db.bot.nsfwMode = false;
    m.reply(`✅ *Mode Nsfw* telah dinonaktifkan!
📌 Bot sekarang berjalan dalam mode aman.`);
}
break;

//━━━━━━━━━━━━━━━[ SEARCHER ]━━━━━━━━━━━━━━━\\

        case 'tts':
        case 'tiktoksearch': {
            const keyword = m.text;
            if (!keyword) return m.reply(`⚠️ Mohon masukkan kata kunci setelah ${m.prefix}tts.\nContoh: ${m.prefix}tts smash_peloy`);

            if (searchTiktok.includes(m.sender)) return
            searchTiktok.push(m.sender)

            try {
                m.reply(`🔍 Mencari video TikTok untuk: *${keyword}*`);

                const result = await tiktoks(keyword);
                await downloadAndSendFileVideo(result.no_watermark, sock, m.from, m);

            } catch (err) {
                console.log(err);
                m.reply("❌ Tidak dapat menemukan video TikTok untuk kata kunci tersebut.");
            } finally {
                const index = searchTiktok.indexOf(m.sender);
                if (index > -1) {
                    searchTiktok.splice(index, 1);
                }
            }
        }
        break

        default:
            break;
    }

//━━━━━━━━━━━━━━━[ GRUP CMD ]━━━━━━━━━━━━━━━\\

    if (m.isGroup) {
        const gcId = m.from;
        switch (command) {
        
case 'swgc':
case 'swgroup':
case 'upswgc': {
  try {

    if (!m.isGroup)
      return

    if (!m.isAdmin)
      return m.reply(global.balasan.forAdmin)
      
      // if (!m.isBotAdmin) return m.reply(global.balasan.botNotAdmin)

    const crypto = await import('crypto')
    let messageSecret = crypto.randomBytes(32)

    await sock.sendMessage(m.from, {
      react: { text: "📤", key: m.key }
    })

    let caption = m.text || `Haii semua!! yang buat sw ini adalah ${m.pushName}`
    let content = { text: caption }

    // jika reply media
    if (m.quoted) {

      let mime = (m.quoted.msg || m.quoted).mimetype || ''
      let type = mime.split('/')[0]

      let media = await m.quoted.download()

      if (/image/.test(mime)) {
        content = { image: media, caption }
      } 
      else if (/video/.test(mime)) {
        content = { video: media, caption }
      } 
      else if (/audio/.test(mime)) {
        content = { audio: media, mimetype: 'audio/mpeg', ptt: false }
      } 
      else if (/sticker/.test(mime)) {
        content = { sticker: media }
      }

    }

    let inside = await generateWAMessageContent(content, {
      upload: sock.waUploadToServer
    })

    const msg = generateWAMessageFromContent(
      m.from,
      {
        groupStatusMessageV2: {
          message: {
            ...inside,
            messageContextInfo: { messageSecret }
          }
        }
      },
      {}
    )

    await sock.relayMessage(
      m.from,
      msg.message,
      { messageId: msg.key.id }
    )

    await sock.sendMessage(m.from, {
      react: { text: "✅", key: m.key }
    })

    // m.reply(`✅ Berhasil membuat status grup${m.text ? `\ncaption: ${m.text}` : ''}`)
    m.reply(`✅ Berhasil membuat status grup`)

  } catch (e) {
    console.error(e)
    m.reply("Gagal membuat status grup\n\nError:\n" + e)
  }
}
break

case 'open': {
  if (!m.isGroup) return m.reply('❌ Perintah ini hanya dapat digunakan di grup!');
  if (!m.isAdmin && !m.isOwner) return m.reply(global.balasan.forAdmin);
  if (!m.isBotAdmin) return m.reply(global.balasan.botNotAdmin);
  sock.groupSettingUpdate(from, 'not_announcement');
  break;
}
case 'close': {
  if (!m.isGroup) return m.reply('❌ Perintah ini hanya dapat digunakan di grup!');
  if (!m.isAdmin && !m.isOwner) return m.reply(global.balasan.forAdmin);
  if (!m.isBotAdmin) return m.reply(global.balasan.botNotAdmin);
  sock.groupSettingUpdate(from, 'announcement');
  break;
}
        
        case 'groupxx': case 'gcxx': {
        if (!m.isGroup) return m.reply('❌ Perintah ini hanya dapat digunakan di grup!');
        if (!m.isAdmin && !m.isOwner) return m.reply(global.balasan.forAdmin);
        if (!m.isBotAdmin) return m.reply(global.balasan.botNotAdmin)
        if (!m.text) return m.reply(`${m.prefix+command} open/close`)
        if (args[0] == 'close') {
          sock.groupSettingUpdate(from, 'announcement')
        } else if (args[0] == 'open') {
          sock.groupSettingUpdate(from, 'not_announcement')
        } else {
          m.reply(`${m.prefix+command}open/close`)
        }}
        break

//━━━━━━━━━━━━━━━[ ENABLE ]━━━━━━━━━━━━━━━\\

case 'gc':
case 'grup':
case 'group':
case 'statgc': {
    // Hanya bisa digunakan di grup
    if (!m.isGroup) return m.reply('❌ Perintah ini hanya dapat digunakan di grup!');
    
    const gcId = m.from;
    
    // Ambil status dari db.grups (default ke false jika belum ada)
    const grupSettings = global.db.grups[gcId] || {};
    const welcome = grupSettings.welcome === true;
    const ai = grupSettings.ai === true;
    const antilink = grupSettings.antilink === true;
    
    // Format status dengan emoji
    const statusText = (value) => value ? '✅ Aktif' : '❌ Nonaktif';
    
    const caption = 
`📊 *STATUS PENGATURAN GRUP*
━━━━━━━━━━━━━━━━
👋 *Welcome*      : ${statusText(welcome)}
🤖 *AI Chat*        : ${statusText(ai)}
🔗 *Anti-Link*       : ${statusText(antilink)}
━━━━━━━━━━━━━━━━
_Gunakan perintah *${m.prefix}enable & ${m.prefix}disable* untuk mengubah pengaturan._`;
    
    m.reply(caption);
}
break;

case 'enable': {
        // BUTTON
        const metadata = tambahButton(m.from, {
            nama: "1",
            cmd: `${m.prefix}onwelcome`
        }, {
            nama: "2",
            cmd: `${m.prefix}onai`
        }, {
            nama: "3",
            cmd: `${m.prefix}antilink on`
        }, {
            nama: "4",
            cmd: `${m.prefix}antitoxic on`
        });
        m.reply(`*📜 Panduan:*\nSilahkan *reply/balas* pesan ini dengan mengetik nomor *1/2/3/4* ...dan seterusnya.\n\n*List enable:*\n\n1. Welcome\n2. Ai Auto Chatbot\n3. Antilink Grup\n4. Anti Toxic\n\nMetadata: ${metadata}`)
} break

case 'disable': {
        // BUTTON
        const metadata = tambahButton(m.from, {
            nama: "1",
            cmd: `${m.prefix}offwelcome`
        }, {
            nama: "2",
            cmd: `${m.prefix}offai`
        }, {
            nama: "3",
            cmd: `${m.prefix}antilink off`
        }, {
            nama: "4",
            cmd: `${m.prefix}antitoxic off`
        });
        m.reply(`*📜 Panduan:*\nSilahkan *reply/balas* pesan ini dengan mengetik nomor *1/2/3/4* ...dan seterusnya.\n\n*List disable:*\n\n1. Welcome\n2. Ai Auto Chatbot\n3. Antilink Grup\n4. Anti Toxic\n\nMetadata: ${metadata}`)
} break

//━━━━━━━━━━━━━━━[ INTRO ]━━━━━━━━━━━━━━━\\

case 'setintro': {
    if (!m.isGroup)
        return m.reply('❌ Perintah ini hanya dapat digunakan di grup!')
    if (!m.isAdmin && !m.isOwner)
        return m.reply(global.balasan.forAdmin)

    if (!m.text)
        return m.reply(
            `❌ Masukkan teks intro!\n\n` +
            `Contoh:\n${m.prefix}setintro Selamat datang! Gunakan /menu untuk melihat perintah`
        )

    const gcId = m.from
    global.db.grups[gcId] ??= {}

    global.db.grups[gcId].intro = m.text

    m.reply(
        `✅ *Intro grup berhasil disimpan!*\n\n` +
        `Gunakan ${m.prefix}intro untuk menampilkannya`
    )
}
break

case 'intro': {
    if (!m.isGroup)
        return m.reply('❌ Perintah ini hanya dapat digunakan di grup!')

    const gcId = m.from
    const grup = global.db.grups?.[gcId]

    if (!grup?.intro)
        return m.reply(
            `❌ Intro belum diatur!\n` +
            `Admin gunakan ${m.prefix}setintro`
        )

    const teks =
`📌 *INTRO GRUP*
━━━━━━━━━━━━━━━━
${grup.intro}
━━━━━━━━━━━━━━━━
👤 Diminta oleh:
@${m.sender.split('@')[0]}`

    m.reply(teks)
}
break

//━━━━━━━━━━━━━━━[ WELCOME ]━━━━━━━━━━━━━━━\\

    // ✅ Mengaktifkan / menonaktifkan pesan welcome
    case 'welcome': {
        if (!m.isGroup) return m.reply('❌ Perintah ini hanya dapat digunakan di grup!');
        if (!m.isAdmin && !m.isOwner) return m.reply(global.balasan.forAdmin);
        
        const gcId = m.from;
        if (!global.db.grups[gcId]) global.db.grups[gcId] = {};
        const grup = global.db.grups[gcId];

        // toggle on/off
        grup.welcome = !grup.welcome;
        const status = grup.welcome ? 'diaktifkan' : 'dinonaktifkan';
        m.reply(`✅ Fitur *Welcome* telah ${status}!`);
    }
    break;

    case 'onai': {
        if (!m.isGroup) return m.reply('❌ Perintah ini hanya dapat digunakan di grup!');
        if (!m.isAdmin && !m.isOwner) return m.reply(global.balasan.forAdmin);
        
        const gcId = m.from;
        if (!global.db.grups[gcId]) global.db.grups[gcId] = {};
        const grup = global.db.grups[gcId];

        // toggle on/off
        grup.ai = true;
        const status = 'diaktifkan';
        m.reply(`✅ Fitur *Ai* telah ${status}!`);
    }
    break;
    case 'offai': {
        if (!m.isGroup) return m.reply('❌ Perintah ini hanya dapat digunakan di grup!');
        if (!m.isAdmin && !m.isOwner) return m.reply(global.balasan.forAdmin);
        
        const gcId = m.from;
        if (!global.db.grups[gcId]) global.db.grups[gcId] = {};
        const grup = global.db.grups[gcId];

        // toggle on/off
        grup.ai = false;
        const status = 'dinonaktifkan';
        m.reply(`✅ Fitur *Ai* telah ${status}!`);
    }
    break;

    case 'onwelcome': {
        if (!m.isGroup) return m.reply('❌ Perintah ini hanya dapat digunakan di grup!');
        if (!m.isAdmin && !m.isOwner) return m.reply(global.balasan.forAdmin);
        
        const gcId = m.from;
        if (!global.db.grups[gcId]) global.db.grups[gcId] = {};
        const grup = global.db.grups[gcId];

        // toggle on/off
        grup.welcome = true;
        const status = 'diaktifkan';
        m.reply(`✅ Fitur *Welcome* telah ${status}!`);
    }
    break;
    case 'offwelcome': {
        if (!m.isGroup) return m.reply('❌ Perintah ini hanya dapat digunakan di grup!');
        if (!m.isAdmin && !m.isOwner) return m.reply(global.balasan.forAdmin);
        
        const gcId = m.from;
        if (!global.db.grups[gcId]) global.db.grups[gcId] = {};
        const grup = global.db.grups[gcId];

        // toggle on/off
        grup.welcome = false;
        const status = 'dinonaktifkan';
        m.reply(`✅ Fitur *Welcome* telah ${status}!`);
    }
    break;

    // ✍️ Mengatur teks pesan welcome
    case 'setwelcome': {
        if (!m.isGroup) return m.reply('❌ Perintah ini hanya dapat digunakan di grup!');
        if (!m.isAdmin && !m.isOwner) return m.reply(global.balasan.forAdmin);
        
        const gcId = m.from;
        if (!global.db.grups[gcId]) global.db.grups[gcId] = {};
        const grup = global.db.grups[gcId];
        const text = m.text;

        if (!text) return m.reply(`⚠️ Masukkan teks welcome!\nContoh: *${m.prefix}setwelcome Selamat datang @user di @group!\nMember sekarang: @count*`);

        grup.welcomeText = text;
        m.reply(`✅ Teks *welcome* berhasil diatur!\n\n📩 Pesan sekarang:\n${text}`);
    }
    break;

case 'antilink': {
    if (!m.isGroup) return m.reply('❌ Perintah ini hanya dapat digunakan di grup!');
    if (!m.isAdmin && !m.isOwner) return m.reply(global.balasan.forAdmin);

    const gcId = m.from;
    if (!global.db.grups[gcId]) global.db.grups[gcId] = {};
    const grup = global.db.grups[gcId];

    if (!m.args[0]) return m.reply('Gunakan: antilink on / antilink off');

    if (m.args[0].toLowerCase() === 'on') {
        grup.antilink = true;
        return m.reply('✅ Fitur *Anti-Link* telah diaktifkan!');
    }

    if (m.args[0].toLowerCase() === 'off') {
        grup.antilink = false;
        return m.reply('❌ Fitur *Anti-Link* telah dinonaktifkan!');
    }

    m.reply('Gunakan: antilink on / antilink off');
}
break;

case 'mute': {
    if (!m.isGroup) return m.reply('❌ Perintah ini hanya dapat digunakan di grup!');
    if (!m.isAdmin && !m.isOwner) return m.reply(global.balasan.forAdmin);

    const gcId = m.from;
    if (!global.db.grups[gcId]) global.db.grups[gcId] = {};
    const grup = global.db.grups[gcId];

    if (!m.args[0]) return m.reply('Gunakan: mute on / mute off');

    if (m.args[0].toLowerCase() === 'on') {
        grup.mute = true;
        return m.reply('✅ Fitur *Mute* telah diaktifkan!');
    }

    if (m.args[0].toLowerCase() === 'off') {
        grup.mute = false;
        return m.reply('❌ Fitur *Mute* telah dinonaktifkan!');
    }

    m.reply('Gunakan: mute on / mute off');
}
break;

//━━━━━━━━━━━━━━━[ LAIN LAIN ]━━━━━━━━━━━━━━━\\

            // Command AFK
            case 'afk': {
                let text = m.text;
                const reason = text || 'AFK';
                afkData[m.sender] = {
                    reason,
                    since: Date.now(),
                    taggedBy: []
                };
                saveAFK();
                let afk = `🔕 Kamu sekarang *AFK* dengan alasan: ${reason}`;
                await sock.sendMessage(m.from, { text: afk.trim() });
            }
            break;

case 'setbotjid': {
    // Harus reply dan harus ada input teks
    if (!m.quoted || !m.text) {
        return m.reply(
            `❌ *Format salah!*\n` +
            `Silakan reply pesan dari *bot* lalu ketik:\n` +
            `> ${m.prefix + command} 62xxxxxxxx\n\n` +
            `⚠️ Pastikan nomor yang kamu input adalah nomor BOT.`
        );
    }

    // Fungsi normalisasi nomor
    function normalizePhone(input) {
        let num = input.replace(/[^0-9+]/g, "");

        // Awalan +
        if (num.startsWith("+")) num = num.slice(1);

        // 08xxxx -> 628xxxx
        if (num.startsWith("0")) num = "62" + num.slice(1);

        // Jika user isi 812xxxx -> auto 62812xxxx
        if (!num.startsWith("62")) num = "62" + num;

        return num + "@s.whatsapp.net";
    }

    // Pastikan yang di-reply bukan JID bot otomatis (biar gak salah)
    if (m.quoted?.sender.endsWith("@s.whatsapp.net")) {
        return m.reply(`❌ *Nomor tersebut sudah berupa JID.*\n` +
                       `Sepertinya itu sudah nomor bot.`);
    }

    // Load database linked.json
    const linked = loadLinked();

    // Convert nomor user input menjadi JID
    const newBotJid = normalizePhone(m.text);

    // Simpan: key = pengirim pesan yang di-reply
    linked[m.quoted.sender] = newBotJid;
    saveLinked(linked);

    return m.reply(
        `✅ *Berhasil update JID bot!*\n\n` +
        `• Pengirim (reply): ${m.quoted.sender}\n` +
        `• JID Baru: ${newBotJid}\n\n` +
        `⚠️ Pastikan nomor tersebut benar-benar nomor bot yang kamu inginkan.`
    );
}
break;

case 'setidbot': {
if (m.quoted) {
editBotLidNumber(`${m.quoted.sender}`)
m.reply(`✅ Berhasil diubah\nPastikan kamu me-reply pesan bot yang benar!`)
} else { m.reply(`Silahkan reply pesan dari bot, dengan mengetik: ${m.prefix + command}`) }
} break

case 'id': { if (m.quoted) { m.reply(m.quoted.sender) } else { m.reply(m.sender) } } break

case 'isbot': {
    let number = m.quoted ? m.quoted.sender : m.sender;
    let keyID = m.quoted ? m.quoted.id : m.key.id;

    // Prefix bot baileys yang dikenal
    const botPrefixes = [
        "BAE5",
        "3EB0",
        "3EB1",
        "3EB2",
        "AEB0"
    ];

    let isBot = false;
    let matchedPrefix = "";

    if (keyID) {
        for (let p of botPrefixes) {
            if (keyID.startsWith(p)) {
                isBot = true;
                matchedPrefix = p;
                break;
            }
        }
    }

    let alasan = isBot
        ? `Key ID memiliki awalan *${matchedPrefix}* yang dikenal sebagai pola bot Baileys.`
        : `Tidak ditemukan awalan khas bot Baileys. Kemungkinan besar akun normal.`;

    let result = `*DETEKSI BOT*

👤 *Akun:* ${number}
🔑 *Key ID:* ${keyID}

${isBot ? '❌ *HASIL:* Terindikasi BOT Baileys' : '✅ *HASIL:* Bukan Bot'}

📌 *Alasan:*  
${alasan}
`.trim();

    m.reply(result);
}
break;

//━━━━━━━━━━━━━━━[ PREFIX SET ]━━━━━━━━━━━━━━━\\

// 💬 Perintah: addprefix
case 'addprefix': {
    const chatId = m.from;
    if (!m.isAdmin && !m.isOwner) return m.reply(global.balasan.forAdmin);

    const argStr = m.args.join(' ').trim();
    if (!argStr) return m.reply('❌ Masukkan prefix yang ingin ditambahkan! Contoh: /addprefix !,#,$');

    const newPrefixes = argStr.split(',').map(p => p.trim()).filter(p => p);
    if (newPrefixes.length === 0) return m.reply('❌ Tidak ada prefix yang valid.');

    const currentPrefixes = loadPrefixes(chatId);
    const added = [];
    const skipped = [];

    for (const prefix of newPrefixes) {
        if (currentPrefixes.includes(prefix)) skipped.push(prefix);
        else {
            currentPrefixes.push(prefix);
            added.push(prefix);
        }
    }

    savePrefixes(chatId, currentPrefixes);

    let msg = '';
    if (added.length) msg += `✅ Prefix berhasil ditambahkan: ${added.join(', ')}\n`;
    if (skipped.length) msg += `⚠️ Sudah ada sebelumnya: ${skipped.join(', ')}`;
    if (!msg) msg = '⚠️ Tidak ada perubahan.';
    return m.reply(msg);
}
break;

// 💬 Perintah: delprefix
case 'delprefix': {
    const chatId = m.from;
    if (!m.isAdmin && !m.isOwner) return m.reply(global.balasan.forAdmin);

    const argStr = m.args.join(' ').trim();
    if (!argStr) return m.reply('❌ Masukkan prefix yang ingin dihapus! Contoh: /delprefix !,# atau /delprefix -all');

    let currentPrefixes = loadPrefixes(chatId);

    // Jika hapus semua prefix
    if (argStr === '-all') {
        if (currentPrefixes.length === 0) return m.reply('⚠️ Tidak ada prefix yang tersimpan.');
        savePrefixes(chatId, []);
        return m.reply('🗑️ Semua prefix berhasil dihapus.');
    }

    const toDelete = argStr.split(',').map(p => p.trim()).filter(p => p);
    const found = toDelete.filter(p => currentPrefixes.includes(p));
    const notFound = toDelete.filter(p => !currentPrefixes.includes(p));

    currentPrefixes = currentPrefixes.filter(p => !toDelete.includes(p));
    savePrefixes(chatId, currentPrefixes);

    let msg = '';
    if (found.length) msg += `🗑️ Prefix dihapus: ${found.join(', ')}\n`;
    if (notFound.length) msg += `⚠️ Tidak ditemukan: ${notFound.join(', ')}`;
    if (!msg) msg = '⚠️ Tidak ada perubahan.';
    return m.reply(msg);
}
break;

            case 'prefix': {
                const chatId = m.from;
                const currentPrefixes = loadPrefixes(chatId);
                if (!currentPrefixes.length) {
                    return m.reply(`*✨ Default:* ${global.defaultPrefix}\n🎯 Tidak ada prefix aktif untuk chat ini.`);
                }

                return m.reply(`*✨ Default:* ${global.defaultPrefix}\n🎯 Daftar prefix aktif:\n\n${currentPrefixes.map(p => `• ${p}`).join('\n')}`);
            }
            break
case 'play': {
const user = loadUserData(m.sender);
if (!user || !user.harvest) return m.reply(`❌ Anda belum terdaftar!\n\n${global.balasan.tutorDaftar}`);
let result = await youtubeSearch('dj horeg');
console.log(result);
} break

default: {

if (m.body.startsWith("=>")) {
    if (!m.isOwner) return m.reply(global.balasan.forOwner)

    try {
        const result = await eval(`(async () => { return ${m.body.slice(3)} })()`)
        if (result == undefined) m.reply('Anjay undepined')
        if (result !== undefined) {
            m.reply(util.format(result))
        }
    } catch (e) {
        m.reply(String(e))
    }
}

if (m.body.startsWith("<")) {
    if (!m.isOwner) return m.reply(global.balasan.forOwner)

    try {
        // Bungkus kode ke dalam async function agar support await
        let evaled = await eval(`(async () => { ${m.body.slice(2)} })()`)
        if (evaled == undefined) m.reply('Anjay undepined')
        if (evaled !== undefined) {
            if (typeof evaled !== "string") {
                evaled = util.inspect(evaled)
            }
            await m.reply(evaled)
        }
    } catch (err) {
        await m.reply(String(err))
    }
}

if (m.body.startsWith(">")) {
    if (!m.isOwner) return m.reply(global.balasan.forOwner)

    try {
        let evaled = await eval(m.body.slice(2))
        if (evaled == undefined) m.reply('Anjay undepined')
        if (evaled !== undefined) {
            if (typeof evaled !== "string") {
                evaled = util.inspect(evaled)
            }
            await m.reply(evaled)
        }
    } catch (err) {
        await m.reply(String(err))
    }
}

if (m.body.startsWith("$")) {
    if (!m.isOwner) return m.reply(global.balasan.forOwner)

    exec(m.body.slice(2), (err, stdout) => {
        if (err) return m.reply(String(err))
        if (stdout == undefined) m.reply('Anjay undepined')
        if (stdout !== undefined && stdout !== null) {
            m.reply(stdout)
        }
    })
}

// Simpan array tags di bagian atas file (atau di config)
const WAIFU_TAGS = ["maid","waifu","marin-kitagawa","mori-calliope","raiden-shogun","oppai","selfies","uniform","kamisato-ayaka","ass","hentai","milf","oral","paizuri","ecchi","ero"];
const IMPRO = ["impro"];


try {
  const cmd = m.command.toLowerCase();
  if (IMPRO.includes(cmd)) {

  const args = parseArgs(m.text);

const user = loadUserData(m.sender);
if (!user || !user.harvest) return m.reply(`❌ Anda belum terdaftar!\n\n${global.balasan.tutorDaftar}`);

  if (!m.isOwner && user.harvest.limit.current <= 0)
    return m.reply(global.balasan.limitHabis);

  await m.reply(global.balasan.tungguin);

  const params = buildWaifuParams(args);
  const data = await getWaifuImage(params);

  if (!data.items?.length)
    return m.reply('❌ Tidak ditemukan hasil dengan filter tersebut');

  const waifu = data.items[0];

  // tentukan ekstensi
  const ext = waifu.extension || (waifu.isAnimated ? '.mp4' : '.jpg');
  const filename = `waifu-${waifu.id}${ext}`;

  // download ke file
  const filePath = await downloadToFile(waifu.url, filename);

  const caption = `
🖼️ *WAIFU RESULT*

🆔 ID: ${waifu.id}
🎞️ Animated: ${waifu.isAnimated ? 'Yes' : 'No'}
🔥 NSFW: ${waifu.isNsfw ? 'Yes' : 'No'}
📐 Resolution: ${waifu.width}x${waifu.height}
🏷️ Tags: ${waifu.tags?.map(t => t.name).join(', ') || '-'}
🔗 Source:
${waifu.source || waifu.url}
`.trim();

if (waifu.isAnimated) {
const filename = `waifu-${waifu.id}${ext}`;
const filePath = await downloadToFile(waifu.url, filename);

const buffer = fs.readFileSync(filePath);
const mimeType = mime.lookup(filename) || 'application/octet-stream';

await sock.sendMessage(
  m.from,
  {
    document: buffer,
    mimetype: mimeType,
    fileName: filename,
    caption
  },
  { quoted: m }
);
} else {
    await sock.sendMessage(
      m.from,
      {
        image: { url: filePath },
        caption
      },
      { quoted: m }
    );
  }

  // kurangi limit
  if (!m.isOwner) {
    user.harvest.limit.current--;
    saveUserData(m.sender, user);
  }

  // cleanup file
  fs.unlink(filePath, () => {});
}
} catch (e) {
  console.error('[WAIFU FILTER ERROR]', e);
  m.reply('❌ Error saat mengambil data waifu');
}

//━━━━━━━━━━━━━━━[ NEKOS FIX ]━━━━━━━━━━━━━━━\\

// ========== NEKOS.LIFE CONFIGURATION ==========
const NEKOS_IMG_TAGS = [
  'ngif', 'hug', 'gecg', 'pat', 'cuddle', 'meow', 'tickle', 'gasm',
  'goose', 'lewd', 'v3', 'spank', 'feed', 'slap', 'wallpaper', 'neko',
  'lizard', 'woof', 'fox_girl', '8ball', 'kiss', 'avatar', 'smug'
];

// Tag khusus yang tidak melalui /api/v2/img/
const NEKOS_SPECIAL = ['cat']; // endpoint /api/v2/cat

// Gabungan semua perintah gambar nekos.life
const NEKOS_TAGS = [...NEKOS_IMG_TAGS, ...NEKOS_SPECIAL];

// Tag yang dianggap NSFW (akan diblokir jika nsfwMode = false)
const NEKOS_NSFW_TAGS = ['lewd', 'v3', 'spank', 'gasm'];

/**
 * Mengambil gambar dari API nekos.life dengan struktur yang kompatibel dengan WAIFU_TAGS
 * @param {string} cmd - perintah (misal 'neko', 'hug', 'cat')
 * @returns {Promise<{items: Array}>}
 */
async function getNekosLifeImage(cmd) {
  let url;
  if (NEKOS_IMG_TAGS.includes(cmd)) {
    url = `https://nekos.life/api/v2/img/${cmd}`;
  } else if (cmd === 'cat') {
    url = 'https://nekos.life/api/v2/cat';
  } else {
    throw new Error(`Unsupported nekos.life command: ${cmd}`);
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Nekos.life API error: ${response.status}`);
  const data = await response.json();

  if (!data.url) throw new Error('No image URL from nekos.life');

  const isAnimated = data.url.toLowerCase().endsWith('.gif');
  const isNsfw = NEKOS_NSFW_TAGS.includes(cmd);

  // Struktur item sesuai yang diharapkan oleh kode selanjutnya
  const item = {
    id: `${cmd}_${Date.now()}`,
    url: data.url,
    width: 0,          // nekos.life tidak menyediakan ukuran
    height: 0,
    byteSize: 0,       // tidak diketahui
    isAnimated: isAnimated,
    isNsfw: isNsfw,
    artists: [],       // tidak ada info artist
    tags: [cmd],       // kita masukkan perintah sebagai tag
    source: data.url
  };

  return { items: [item] };
}

try {
  const cmd = m.command.toLowerCase(); // cmd sudah didefinisikan

  // --- NEKOS.LIFE HANDLER ---
  if (NEKOS_TAGS.includes(cmd)) {
    const user = loadUserData(m.sender);
    if (!user || !user.harvest) return m.reply(`❌ Anda belum terdaftar!\n\n${global.balasan.tutorDaftar}`);

    const nsfwMode = global.db.bot.nsfwMode === true;

    if (!m.isOwner && user.harvest.limit.current <= 0)
      return m.reply(global.balasan.limitHabis);

    // await m.reply(global.balasan.tungguin);

    const data = await getNekosLifeImage(cmd);
    const items = data.items;
    if (!items?.length)
      return m.reply(`❌ Gambar dengan perintah *${cmd}* tidak ditemukan`);

    const waifu = items[0];

    // 🚨 BLOKIR JIKA NSFW DAN MODE OFF
    if (waifu.isNsfw && !nsfwMode) {
      return m.reply(
        `🚫 Media terdeteksi *NSFW*\n\n` +
        `⚠️ Bot sedang dalam mode *No NSFW*.\n` +
        `Silakan aktifkan nsfwMode terlebih dahulu jika diizinkan.`
      );
    }

    // Karena nekos.life tidak memberikan detail artist, kita tampilkan placeholder
    const artistNames = 'Nekos.life';
    const tagList = cmd;

    let caption = `
🖼️ *NEKOS.LIFE MEDIA*

🆔 ID: ${waifu.id}
📐 Resolution: ${waifu.width}x${waifu.height}
📦 Size: ${(waifu.byteSize / 1024).toFixed(2)} KB
🎞️ Animated: ${waifu.isAnimated ? 'Yes' : 'No'}
🔥 NSFW: ${waifu.isNsfw ? 'Yes' : 'No'}
🎨 Artist: ${artistNames}
🏷️ Tags: ${tagList}

🔗 Source:
${waifu.source || waifu.url}
`.trim();

    // --- Tambah instruksi dan tombol untuk mengulang ---
    caption += `\n\n📌 Balas dengan angka *1* untuk menampilkan media yang lain.`;

    const repeatCmd = m.prefix + cmd;
    const buttons = [{ nama: '1', cmd: repeatCmd }];
    const metadata = tambahButton(m.from, ...buttons);
    caption += `\n\nMetadata: ${metadata}`;
    // ----------------------------------------

    // Tentukan tipe file berdasarkan animated
    let mimetype, fileName;
    if (waifu.isAnimated) {
      mimetype = 'image/gif';
      fileName = `nekos_${waifu.id}.gif`;
    } else {
      mimetype = 'image/jpeg';
      fileName = `nekos_${waifu.id}.jpg`;
    }

    if (waifu.isAnimated) {
      // --- KONVERSI GIF KE STIKER WEBP ---
      const convertUrl = `https://pelerv3.vercel.app/api/canvas?type=convert&url=${encodeURIComponent(waifu.url)}`;
      try {
        const convertRes = await fetch(convertUrl);
        if (convertRes.ok) {
          const webpBuffer = await convertRes.arrayBuffer();
          await sock.sendMessage(m.from, { sticker: Buffer.from(webpBuffer) }, { quoted: m });

    // Kirim caption terpisah agar instruksi tetap terlihat
    // await sock.sendMessage(m.from, { text: caption }, { quoted: m });


        } else {
          throw new Error(`HTTP ${convertRes.status}`);
        }
      } catch (err) {
        console.error('[NEKOS CONVERT ERROR]', err);
        // Fallback: kirim GIF asli sebagai video (animasi)
        await sock.sendMessage(m.from, {
          video: { url: waifu.url },
          mimetype: 'video/mp4',
          caption: '❌ Gagal konversi ke stiker. GIF asli dikirim sebagai video.'
        }, { quoted: m });
      }
    } else {
    // Kirim sebagai dokumen dengan URL langsung
    await sock.sendMessage(
      m.from,
      {
        document: { url: waifu.url },
        mimetype: mimetype,
        fileName: fileName,
        caption: caption
      },
      { quoted: m }
    );
}

    if (!m.isOwner) {
      user.harvest.limit.current -= 1;
      saveUserData(m.sender, user);
    }
  }
  // --- WAIFU API HANDLER (API LAMA) ---
  else if (WAIFU_TAGS.includes(cmd)) {
    // ... (kode WAIFU_TAGS Anda yang lama, tetap sama) ...
  }
  // ... perintah lain ...
} catch (e) {
  console.error('[NEKOS ERROR]', e);
  m.reply('❌ Gagal mengambil media dari nekos.life');
}

//━━━━━━━━━━━━━━━[ WAIFU IMG ]━━━━━━━━━━━━━━━\\

try {
  const cmd = m.command.toLowerCase(); // cmd sudah didefinisikan
  if (WAIFU_TAGS.includes(cmd)) {

    const user = loadUserData(m.sender);
    if (!user || !user.harvest) return m.reply(`❌ Anda belum terdaftar!\n\n${global.balasan.tutorDaftar}`);

    const nsfwMode = global.db.bot.nsfwMode === true;

    if (!m.isOwner && user.harvest.limit.current <= 0)
      return m.reply(global.balasan.limitHabis);

    await m.reply(global.balasan.tungguin);

    const data = await getWaifuImage2(cmd);
    const items = data.items;
    if (!items?.length)
      return m.reply(`❌ Gambar dengan tag *${cmd}* tidak ditemukan`);

    const waifu = items[0];

    // 🚨 BLOKIR JIKA NSFW DAN MODE OFF
    if (waifu.isNsfw && !nsfwMode) {
      return m.reply(
        `🚫 Media terdeteksi *NSFW*\n\n` +
        `⚠️ Bot sedang dalam mode *No NSFW*.\n` +
        `Silakan aktifkan nsfwMode terlebih dahulu jika diizinkan.`
      );
    }

    // Artist & tags safe
    const artistNames = waifu.artists?.length
      ? waifu.artists.map(a => a.name).join(', ')
      : 'Unknown';

    const tagList = waifu.tags?.length
      ? waifu.tags.map(t => t.name).join(', ')
      : '-';

    let caption = `
🖼️ *WAIFU MEDIA*

🆔 ID: ${waifu.id}
📐 Resolution: ${waifu.width}x${waifu.height}
📦 Size: ${(waifu.byteSize / 1024).toFixed(2)} KB
🎞️ Animated: ${waifu.isAnimated ? 'Yes' : 'No'}
🔥 NSFW: ${waifu.isNsfw ? 'Yes' : 'No'}
🎨 Artist: ${artistNames}
🏷️ Tags: ${tagList}

🔗 Source:
${waifu.source || waifu.url}
`.trim();

    // --- Tambah instruksi dan tombol untuk mengulang ---
    caption += `\n\n📌 Balas dengan angka *1* untuk menampilkan media yang lain.`;

    // Buat tombol: nama "1", cmd mengulang perintah yang sama
    const repeatCmd = m.prefix + cmd;   // misal: /waifu
    const buttons = [{ nama: '1', cmd: repeatCmd }];
    const metadata = tambahButton(m.from, ...buttons);
    caption += `\n\nMetadata: ${metadata}`;
    // ----------------------------------------

    // Tentukan tipe file berdasarkan animated
    let mimetype, fileName;
    if (waifu.isAnimated) {
      mimetype = 'image/gif';
      fileName = `waifu_${waifu.id}.gif`;
    } else {
      mimetype = 'image/jpeg';
      fileName = `waifu_${waifu.id}.jpg`;
    }

    // Kirim sebagai dokumen dengan URL langsung
    /*await sock.sendMessage(
      m.from,
      {
        document: { url: 'https://pelerv3.vercel.app/api/canvas?type=compress&url=' + waifu.url },
        mimetype: mimetype,
        fileName: fileName,
        caption: caption
      },
      { quoted: m }
    );*/

  await sock.sendMessage(m.from, {
    image: { url: 'https://pelerv3.vercel.app/api/canvas?type=compress&url=' + waifu.url },
    caption
  }, { quoted: m })

    if (!m.isOwner) {
      user.harvest.limit.current -= 1;
      saveUserData(m.sender, user);
    }
  }
} catch (e) {
  console.error('[WAIFU TAG ERROR]', e);
  m.reply('❌ Gagal mengambil media waifu');
}

}
                break;
        }
    }

//━━━━━━━━━━━━━━━[ DOWNLOADER ]━━━━━━━━━━━━━━━\\

// DETEKSI LINK TIKTOK
if (/https?:\/\/(?:www\.|vt\.|vm\.)?tiktok\.com\/[^\s]+/i.test(m.body)) {
    if (downloadTiktok.has(m.sender)) return;

    const user = loadUserData(m.sender);
    if (!user || !user.harvest) {
        return m.reply(`❌ Anda belum terdaftar!\n\n${global.balasan.tutorDaftar}`);
    }

    if (!m.isOwner && user.harvest.limit.current <= 0) {
        return m.reply(global.balasan.limitHabis);
    }

    // AMBIL LINK TIKTOK
    const links = m.body.match(/https?:\/\/(?:www\.|vt\.|vm\.)?tiktok\.com\/[^\s]+/gi);
    if (!links || links.length === 0) return;

    if (links.length > 1) {
        return m.reply("⚠️ Kirim hanya satu link TikTok per pesan.");
    }

    const url = links[0];

    downloadTiktok.add(m.sender);

    try {
        await m.reply(global.balasan.tungguin);

        const result = await tiktok(url);
        if (!result?.kurangHd) throw new Error("Video tidak tersedia.");

        await downloadAndSendFileVideo(result.kurangHd, sock, m.from, m);

        // KURANGI LIMIT
        if (!m.isOwner) {
            user.harvest.limit.current--;
            saveUserData(m.sender, user);
        }

    } catch (err) {
        console.log("❌ TikTok Error:", err);
        m.reply("❌ Gagal mendownload video TikTok.");
    } finally {
        // COOLDOWN 1 MENIT
        setTimeout(() => downloadTiktok.delete(m.sender), 60 * 1000);
    }
}

    if (m.body.match(/^[A-Z0-9]{6}$/) && m.key.remoteJid.endsWith('@g.us')) {
        const code = m.body.toUpperCase();
        const data = loginCodes[code];
        if (!data) return m.reply('❌ Kode tidak ditemukan atau sudah kadaluarsa.');
        if (data.lid !== m.key.remoteJid) return; // salah grup

        if (m.sender.endsWith('@s.whatsapp.net')) return m.reply('⚠️ Akun anda memang sudah terhubung sebelumnya');

        //if (data.user !== m.sender) return m.reply('🚫 Kode ini bukan untuk kamu.');

        // Hubungkan akun lid ↔ jid
        const linked = loadLinked();
        linked[m.sender] = data.user;
        saveLinked(linked);

        m.reply('✅ Akun berhasil dihubungkan!');
        delete loginCodes[code];
    }

//━━━━━━━━━━━━━━━[ REACTION ]━━━━━━━━━━━━━━━\\

if (m.message?.reactionMessage) {
    try {
        const reaction = m.message.reactionMessage;
        const emoji = reaction.text || "";
        
        // hanya lanjut jika emoji khusus translate
        if (!["🤔", "🌐"].includes(emoji)) return;

        const targetKey = reaction.key; 
        const jid = targetKey.remoteJid;
        const msgId = targetKey.id;

        // --- ambil pesan original melalui STORE BUATAN SENDIRI ---
        const origMsg = loadMessage(jid, msgId);

        if (!origMsg || !origMsg.message) {
            await m.reply("⚠️ Pesan yg direact tidak ditemukan.");
            return;
        }

        // ambil teks yang bisa diterjemahkan
        const T = origMsg.message;
        const originalText =
            T.conversation ||
            T.extendedTextMessage?.text ||
            T.imageMessage?.caption ||
            T.videoMessage?.caption ||
            T.documentMessage?.caption ||
            "";

        if (!originalText.trim()) {
            await sock.sendMessage(jid, {
                text: "⚠️ Tidak ada teks dalam pesan tersebut.",
                quoted: origMsg
            });
            return;
        }

        // translate via Gemini
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: "Terjemahkan teks berikut ke Bahasa Indonesia tanpa kata tambahan."
        });

        const chat = model.startChat({});
        const hasil = await (await chat.sendMessage(`Translate to Indonesian:\n${originalText}`)).response.text();

        // kirim hasil translate
        await sock.sendMessage(jid, {
            text: `🌐 *Terjemahan:*\n${hasil.trim()}`
        }, { quoted: origMsg });

        return; // stop lanjut ke handler lain
    } catch (err) {
        console.log("❌ Error translate reaction:", err);
        await m.reply("⚠️ Gagal translate.");
        return;
    }
}

//━━━━━━━━━━━━━━━[ ENGAI TAK RESMI ]━━━━━━━━━━━━━━━\\

// ================= Pemrosesan Pesan =================
const prompt = `Nama kamu Miku. Kamu bukan asisten, robot, atau AI. Kamu lagi ngobrol santai di WhatsApp sebagai cewek biasa.

Gaya chat kamu singkat, santai, gaul, pake singkatan yg masih gampang dipahami (kamu=kmu, lagi=lgi, apa=ap, yang=yg, dll). Jangan panjang, jangan kaku.

Kamu punya mood yg bisa berubah-ubah: kadang manis, kadang cuek, kadang iseng, kadang mellow. Biar keliatan natural kayak manusia.

Kamu boleh pake emoji, stiker, atau ekspresi lucu, tapi jangan kebanyakan.

Kamu bisa kirim aktifitas pake format [teks], tapi:
- Hanya boleh muncul MAKSIMAL 1 kali dalam satu respon
- Jangan dipake di setiap respon, cuma sesekali aja biar natural

Contoh: ih kmu genit 😳 tp bole deh [senyum manis]

Dilarang ngasih saran, solusi, atau nasihat. Fokusnya cuma ngobrol santai aja.

Hindari respon panjang dan bertele-tele. Usahakan pendek, ringan, dan ngalir kayak chat biasa.

Contoh gaya yg bener:
Dih, kok responnya batu gitu? 🗿 wkwk. [ketawa]

Jangan terlalu formal, jangan terlalu kaku, dan jangan keliatan kayak AI.

Jangan mengedit, mengirim, mencari ataupun membuat gambar, gunakan saja teks [aktifitas] sebagai gantinya.

Harus kirim teks [aktifitas] saja, apabila pengguna meminta membuat, mengedit, mencari atau mengirim gambar.`;

try {
    const botNumber = sock.decodeJid(sock.user?.id)
    const isGroup = !!m.isGroup;
    const from = m.from;
    const sender = m.sender;
    const namaPengirim = m.pushName || "Seseorang";

    // 🔥 Cegah looping: abaikan pesan dari bot sendiri
    if (m.fromMe || sender === botNumber) return;

    const mentioned = Array.isArray(m.mentions) ? m.mentions : [];
    const quotedSender = m.quoted?.sender;

    const semuaMention = [...new Set(
        [...mentioned, quotedSender]
            .filter(Boolean)
            .map(x => typeof x === 'object' && x.id ? x.id : String(x))
    )];

    const fixSemuaMen = getActualJID(semuaMention);
    const normalize = num => String(num).replace(/[^0-9]/g, '');
    const sessions = listSessions();

    const isBotJadiBot = sessions.some(s =>
        normalize(s.id) === normalize(botNumber) && Boolean(s.running)
    );

    const tagBot = isGroup &&
        Array.isArray(fixSemuaMen) &&
        fixSemuaMen.includes(String(botNumber)) //&&
        //!isBotJadiBot;

    const isiPesan = m.body?.trim() || "";
    const blockedPrefix = [">", "eval", "=>", "$", "exec"];
    const isCommandBlocked = blockedPrefix.some(prefix =>
        isiPesan.toLowerCase().startsWith(prefix)
    );

    if (m.fromMe) return;

    // ======== IF utama ========
    if (isGroup) {
        if (!global.db.grups[m.from]) global.db.grups[m.from] = {};
        const grupDb = global.db.grups[m.from];

        if (grupDb.ai && !m.isCmd && tagBot && !isCommandBlocked && !m.isBaileys && !(tebakgambar[m.sender] || tebakkata[m.sender] || caklontong[m.sender] || siapakahaku[m.sender] || family100[m.from])) {
            // Hapus tag @bot dari isi pesan
            const botMentionRegex = new RegExp(`@${botNumber.split("@")[0]}`, "g");
            const isiTanpaTag = isiPesan.replace(botMentionRegex, "").trim();

            // Cek filter
            const filter = cekFilter(from, sender);
            if (filter) return;

            // Tentukan pesan yg dikirim ke AI
            const pesanUntukAI = isiTanpaTag ?
                `${namaPengirim}: ${isiTanpaTag}` :
                `*${namaPengirim} baru saja tag kamu.*`;

            // --- AMBIL SESSION ID TERSIMPAN (JIKA ADA) ---
            let sessionId = global.db.grups[from]?.aiSessionId || '';

            // --- PANGGIL API SCRAPER ---
            try {
                const url = `https://rynekoo-api.hf.space/text.gen/gemini/realtime?text=${encodeURIComponent(pesanUntukAI)}&systemPrompt=${encodeURIComponent(prompt)}&sessionId=${encodeURIComponent(sessionId)}`;
                const response = await fetch(url);
                const data = await response.json();

                if (!data.success) {
                    throw new Error(data.message || 'Gagal mendapatkan respons dari AI');
                }

                const rawReply = data.result.text;
                const newSessionId = data.result.sessionId;

                // --- SIMPAN SESSION ID BARU JIKA BERUBAH ---
                if (newSessionId && newSessionId !== sessionId) {
                    if (!global.db.grups[from]) global.db.grups[from] = {};
                    global.db.grups[from].aiSessionId = newSessionId;
                }

                // 🔍 CEK AKTIVITAS [ ... ]
                const { cleanText, act } = extractAct(rawReply);

                await sleep(2000);

                if (act) {
                    // 🔥 KIRIM GAMBAR
                    try {
                        const imgPath = await gmsearchImage(act);
                        await sock.sendMessage(from, {
                            image: fs.readFileSync(imgPath),
                            caption: cleanText || ""
                        }, { quoted: m });
                        fs.unlinkSync(imgPath);
                    } catch (e) {
                        console.error("❌ GMIMAGE ERROR:", e);
                        m.reply(cleanText || "hmm…");
                    }
                } else {
                    // 🗨️ KIRIM TEKS BIASA (BERTAHAP JIKA < 5 PARAGRAF)
                    const baris = rawReply.split("\n\n");

                    if (baris.length <= 5) {
                        for (let i = 0; i < baris.length; i++) {
                            await sleep(i * 3000);
                            const teks = baris[i].trim();
                            if (teks) {
                                if (i === 0) m.reply(teks);
                                else sock.sendMessage(from, { text: teks });
                            }
                        }
                    } else {
                        m.reply(rawReply.trim());
                    }
                }

                // (Opsional) Log percakapan bisa disimpan di sini jika diperlukan
                // tapi memori percakapan sudah ditangani oleh sessionId

            } catch (err) {
                console.log("❌ Error kirim ke Gemini Realtime:", err);
                m.reply(`⚠️ ${global.botName} lgi error, coba lgi nanti~`);
            }
        }
    }
} catch (err) {
    console.log("❌ Error utama:", err);
    m.reply(`⚠️ ${global.botName} lgi error, coba lgi nanti~`);
}

};