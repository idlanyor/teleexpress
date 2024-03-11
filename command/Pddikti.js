import axios from 'axios';
import { CommandBase } from './CommandBase.js';

export class Pddikti extends CommandBase {
  constructor(bot) {
    super(bot);
    this.bot.onText(/\/pddikti/, (msg) => this.diktiMhs(msg));
  }

  async getMhs(nim) {
    const url = `https://api-frontend.kemdikbud.go.id/hit_mhs/${nim}`;
    try {
      const response = await axios.get(url);
      const rawText = response.data.mahasiswa[0].text;
      const idLink = response.data.mahasiswa[0]['website-link'];
      const id = idLink.replace('/data_mahasiswa', '');

      const mhsObj = {
        nama: rawText.match(/([A-Z]+(?: [A-Z]+)*)\(/)[1].trim(),
        pt: rawText.match(/PT : ([^,]+)/)[1].trim(),
        prodi: rawText.match(/Prodi: ([^,]+)/)[1].trim(),
        link: `https://api-frontend.kemdikbud.go.id/detail_mhs${id}`
      };

      return mhsObj;
    } catch (error) {
      return "Data mahasiswa tidak ditemukan. Pastikan NIM yang dimasukkan sudah sesuai.";
    }
  }

  async getDataMhs(nim) {
    const url = (await this.getMhs(nim)).link;
    try {
      const response = await axios.get(url);
      const dataUmum = response.data.dataumum;
      const statusKuliah = response.data.datastatuskuliah;
      const dataStudi = response.data.datastudi;
      return { statusKuliah, dataUmum, dataStudi };
    } catch (e) {
      return "Terjadi kesalahan saat mengambil data.";
    }
  }

  async getBioMhs(nim) {
    const dataMhs = await this.getDataMhs(nim);
    return dataMhs.dataUmum;
  }

  async getStudiMhs(nim) {
    const dataMhs = await this.getDataMhs(nim);
    return dataMhs.dataStudi;
  }

  async getStatusMhs(nim) {
    const dataMhs = await this.getDataMhs(nim);
    return dataMhs.statusKuliah;
  }

  async diktiMhs(msg) {
    const chatId = msg.chat.id;
    const args = msg.text.split(" ").splice(1);
    let text;

    if (args[0] === undefined) {
      text = `**List command PDDIKTI**\n`;
      text += '`/pddikti nim` (Contoh : /pddikti SSI202203088) mendapatkan informasi mahasiswa\n';
      text += '`/pddikti nim status` (Contoh : /pddikti SSI202203088 status) mendapatkan informasi status mahasiswa\n';
      text += '`/pddikti nim akademik` (Contoh : /pddikti SSI202203088 akademik) mendapatkan hasil studi mahasiswa\n';
      this.bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
    } else if (args[1] == undefined) {
      try {
        let bioMhs = await this.getBioMhs(args[0]);
        text = `**Data Mahasiswa**\n\n`;
        text += `Nama : \`${bioMhs.nm_pd}\`\n`;
        text += `Jenis Kelamin : \`${bioMhs.jk}\`\n`;
        text += `NIM : \`${bioMhs.nipd}\`\n`;
        text += `Nama PT : \`${bioMhs.namapt}\`\n`;
        text += `Jenjang : \`${bioMhs.namajenjang}\`\n`;
        text += `Program Studi : \`${bioMhs.namaprodi}\`\n`;
        text += `Mulai Semester : \`${bioMhs.mulai_smt}\`\n`;
        text += `Jenis Daftar : \`${bioMhs.nm_jns_daftar}\`\n`;
        this.bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
      } catch (error) {
        // throw error
        this.bot.sendMessage(chatId, 'Terjadi kesalahan dalam mengurai permintaan. Silahkan coba beberapa saat lagi.');
      }
    } else {
      text = '';
      if (args[1] == 'akademik') {
        try {
          let bioMhs = await this.getBioMhs(args[0]);
          let studiMhs = await this.getStudiMhs(args[0]);
          text += '\n\n**Data Studi Mahasiswa**\n';
          text += `Nama : \`${bioMhs.nm_pd}\`\n`;

          studiMhs.forEach(matakuliah => {
            text += `\nKode Mata Kuliah : ${matakuliah.kode_mk}\n`;
            text += `Nama Mata Kuliah : ${matakuliah.nm_mk}\n`;
            text += `SKS : ${matakuliah.sks_mk}\n`;
            text += `Tahun&Semester : ${matakuliah.id_smt}\n`;
          });

          await this.bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
        } catch (error) {
          this.bot.sendMessage(chatId, 'Terjadi kesalahan dalam mengurai permintaan. Silahkan coba beberapa saat lagi.');
        }
      } else if (args[1] == 'status') {
        try {
          let bioMhs = await this.getBioMhs(args[0]);
          let datastatuskuliah = await this.getStatusMhs(args[0]);
          text += '\n\n** Data Status Kuliah Mahasiswa**\n';
          text += `Nama : \`${bioMhs.nm_pd}\`\n`;

          datastatuskuliah.forEach(status => {
            text += `\nID Semester : ${status.id_smt}\n`;
            text += `SKS Semester : ${status.sks_smt}\n`;
            text += `Status Mahasiswa : ${status.nm_stat_mhs}\n\n`;
          });

          await this.bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
        } catch (error) {
          this.bot.sendMessage(chatId, 'Terjadi kesalahan dalam mengurai permintaan. Silahkan coba beberapa saat lagi.');
        }
      } else {
        this.bot.sendMessage(chatId, 'Argumen tidak dikenali. Coba `status` atau `akademik`', { parse_mode: 'Markdown' });
      }
    }
  }
}


