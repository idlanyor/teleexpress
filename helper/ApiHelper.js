import axios from 'axios';
import { load } from 'cheerio';

export class ApiHelper {
    constructor() {
        let apikey = "nyanpasuu";
        let url = 'https://api.lolhuman.xyz/api/'
        this.apikey = apikey;
        this.url = url

    }

    async apiLol(endpoint, query) {
        try {
            const response = await axios.get(`${this.url}/${endpoint}apikey=${this.apikey}&${query}`);
            return response.data.result;
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }

    /**
     * Melakukan scraping data dari URL menggunakan Cheerio.
     * @param {string} url - URL yang akan di-scrape.
     * @param {string} selector - Selector CSS untuk memilih elemen.
     * @returns {string} - Hasil scraping dari elemen yang dipilih.
     */
    async scrapeData(url, selector) {
        try {
            const response = await get(url);
            const $ = load(response.data);
            const scrapedData = $(selector).text();
            return scrapedData;
        } catch (error) {
            console.error('Error scraping data: ', error);
            throw error;
        }
    }

    // Tambahkan method lain sesuai kebutuhan
}

// export default { ApiHelper };
