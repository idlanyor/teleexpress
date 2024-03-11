import axios from 'axios';
import cheerio from 'cheerio';

// Melakukan permintaan HTTP ke halaman web
axios.get('https://smartone.smart-service.co.id/my_school_run.php?ada=2&sof=0&ol=0&hp=1&template=0')
  .then(response => {
    const html = response.data;
    
    // Load HTML ke Cheerio
    const $ = cheerio.load(html);

    // Contoh mengekstrak judul dari tag <t itle>
    const title = $('html').text();
    console.log('Judul halaman:', title);

    // Lakukan manipulasi data lebih lanjut di sini
  })
  .catch(error => {
    console.error('Error fetching the page:', error);
  });
