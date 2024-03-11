import axios from 'axios';

async function getMhs(nim) {
    const url = `https://api-frontend.kemdikbud.go.id/hit_mhs/${nim}`;
    try {
        const response = await axios.get(url);
        const rawText = response.data.mahasiswa[0].text;
        let idLink = response.data.mahasiswa[0]['website-link'];
        const id = idLink.replace('/data_mahasiswa', '')

        const mhsObj = {
            nama: rawText.match(/([A-Z]+(?: [A-Z]+)*)\(/)[1].trim(),
            pt: rawText.match(/PT : ([^,]+)/)[1].trim(),
            prodi: rawText.match(/Prodi: ([^,]+)/)[1].trim(),
            link: `https://api-frontend.kemdikbud.go.id/detail_mhs${id}`
        };

        return mhsObj
    } catch (error) {
        // throw error
        return "Data mahasiswa tidak ditemukan,Pastikan NIM yang dimasukkan sudah sesuai"
    }
}

async function getDataMhs(nim) {
    let url = (await getMhs(nim)).link
    // return url
    try {
        const response = await axios.get(url);
        const dataUmum = response.data.dataumum
        const statusKuliah = response.data.datastatuskuliah
        const dataStudi = response.data.datastudi
        return { statusKuliah, dataUmum, dataStudi }
    } catch (e) {
        // throw e;
        return "Terjadi kesalahan saat mengambil data"
    }
}
async function getBioMhs(nim) {
    const dataMhs = await getDataMhs(nim)
    return dataMhs.dataUmum
}
async function getStudiMhs(nim) {
    const dataMhs = await getDataMhs(nim)
    return dataMhs.dataStudi
}
async function getStatusMhs(nim) {
    const dataMhs = await getDataMhs(nim)
    return dataMhs.statusKuliah
}

async function mhs() {
    let bioMhs = await getBioMhs('SSI202203088')
    let studiMhs = await getStudiMhs('SSI202203088')
    let statusMhs = await getStatusMhs('SSI202203088')
    console.log(statusMhs);
}
mhs()