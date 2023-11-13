// Downloader.js
const axios = require("axios").default;
const cheerio = require("cheerio");
const { UserAgent } = require("./index");
const Util = require("util");
const API_GUEST = "https://api.twitter.com/1.1/guest/activate.json";
const API_TIMELINE = "https://api.twitter.com/2/timeline/conversation/%s.json?tweet_mode=extended";
const AUTH =
  "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";

const igdl = require("./instagram");

const youtubeUtils = require("./youtubeUtils");

// ... (kode lainnya)

class Downloader extends igdl {
  // ... (kode lainnya)

  /**
   * Download from YouTube
   * @param {String} url YouTube video url
   * @param {String} type video or audio
   */
  async yt(url, type) {
    try {
      // Gunakan fungsi-fungsi YouTube dari youtubeUtils
      const videoId = youtubeUtils.getYoutubeID(url);
      const isValidUrl = youtubeUtils.validateURL(url);
      // Lanjutkan dengan proses sesuai kebutuhan
      // ...

      // Contoh penggunaan
      if (isValidUrl) {
        console.log(`Valid YouTube URL with video ID: ${videoId}`);
        // Lanjutkan dengan proses lainnya
        // ...
      } else {
        console.log("Invalid YouTube URL");
        // Handle jika URL tidak valid
        // ...
      }
    } catch (error) {
      console.error("Error processing YouTube URL:", error.message);
      // Handle error jika terjadi
      // ...
    }
  }

  // ... (kode lainnya)
}

module.exports = Downloader;
