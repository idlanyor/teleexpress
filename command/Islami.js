import { CommandBase } from "./CommandBase.js";

export class Islami extends CommandBase {
    constructor(bot) {
        super(bot);
        this.bot.onText(/\/99/, (msg) => this.asmaulHusna(msg));
        this.bot.onText(/\/js/, (msg) => this.jadwalSholat(msg));
    }

    async asmaulHusna(msg) {
        const chatId = msg.chat.id;
        try {
            const result = await this.apiHelper.apiLol("asmaulhusna?");
            const replyText = `Indeks: ${result.index}\nLatin: ${result.latin}\nArab: ${result.ar}\nID: ${result.id}\nEN: ${result.en}`;
            this.bot.sendMessage(chatId, replyText);
        } catch (error) {
            this.bot.sendMessage(chatId, 'Terjadi kesalahan dalam mengurai permintaan, Silahkan coba beberapa saat lagi');
        }
    }
    async jadwalSholat(msg) {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ").splice(1);
        if (args[0] === undefined) {
            this.bot.sendMessage(chatId, 'Silakan kirimkan lokasi Anda,atau balas pesan dengan /js namakota(Contoh : /js purbalingga).')
            return
        }
        try {
            let result = await this.apiHelper.apiLol(`sholat/${args[0]}?`);
            console.log(result)
            let replyText = 'Jadwal shalat ' + result.wilayah + '\n';
            replyText += '  Tanggal: ' + result.tanggal + '\n';
            replyText += '  Sahur: ' + result.sahur + '\n';
            replyText += '  Imsak: ' + result.imsak + '\n';
            replyText += '  Subuh: ' + result.subuh + '\n';
            replyText += '  Terbit: ' + result.terbit + '\n';
            replyText += '  Dhuha: ' + result.dhuha + '\n';
            replyText += '  Dzuhur: ' + result.dzuhur + '\n';
            replyText += '  Ashar: ' + result.ashar + '\n';
            replyText += '  Maghrib: ' + result.maghrib + '\n';
            replyText += '  Isya: ' + result.isya + '\n';

            // console.log(replyText);

            await this.bot.sendMessage(chatId, replyText);
        } catch (error) {
            await this.bot.sendMessage(chatId, 'Terjadi kesalahan dalam mengurai permintaan, Silahkan coba beberapa saat lagi');
        }
    }
}


