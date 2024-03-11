// Downloader.js
import axios from "axios";
import cheerio from "cheerio";
import { UserAgent } from "./index";
import Util from "util";
const API_GUEST = "https://api.twitter.com/1.1/guest/activate.json";
const API_TIMELINE = "https://api.twitter.com/2/timeline/conversation/%s.json?tweet_mode=extended";
const AUTH =
  "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";

import igdl from "./instagram";

import { getYoutubeID, validateURL } from "./youtubeUtils";

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
      const videoId = getYoutubeID(url);
      const isValidUrl = validateURL(url);
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

export default Downloader;
