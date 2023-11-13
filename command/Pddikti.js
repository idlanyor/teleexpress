const axios = require('axios');

class Pddikti {
  constructor(nim) {
    this.nim = nim;
  }

  async getMhs() {
    const url = `https://api-frontend.kemdikbud.go.id/hit_mhs/${this.nim}`;
    try {
      const response = await axios.get(url);
      const rawText = response.data.mahasiswa[0].text;
      let idLink = response.data.mahasiswa[0]['website-link'];
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

  async getDataMhs() {
    let url = (await this.getMhs()).link;
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

  async getBioMhs() {
    const dataMhs = await this.getDataMhs();
    return dataMhs.dataUmum;
  }

  async getStudiMhs() {
    const dataMhs = await this.getDataMhs();
    return dataMhs.dataStudi;
  }

  async getStatusMhs() {
    const dataMhs = await this.getDataMhs();
    return dataMhs.statusKuliah;
  }

  // async mhs() {
  //   let bioMhs = await this.getBioMhs();
  //   let studiMhs = await this.getStudiMhs();
  //   let statusMhs = await this.getStatusMhs();
  //   console.log(statusMhs);
  // }
}
module.exports = { Pddikti }

// Contoh penggunaan
// const dikti = new Pddikti('SSI202203088');
// dikti.mhs();
