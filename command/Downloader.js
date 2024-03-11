import { CommandBase } from "./CommandBase.js";

export class Downloader extends CommandBase {
    constructor(bot) {
        super(bot);
        this.bot.onText(/\/tt/, (msg) => this.tiktok(msg));
        this.bot.onText(/\/tta/, (msg) => this.tiktokMusic(msg));
        this.bot.onText(/\/ig/, (msg) => this.instagram(msg));
    }

    async tiktok(msg) {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ").splice(1);
        if (args[0] === undefined) {
            this.bot.sendMessage(chatId, 'Tiktok downloader no watermark \n Masukkan url tiktok (Contoh: /tt https://vt.tiktok.com/ZSwWCk5o/)')
        } else {
            try {
               let result = await this.apiHelper.apiLol(`tiktok?url=${args[0]}&`);
                // let result = await this.apiHelper.apiLol(`tiktok?url=https://vt.tiktok.com/ZSwWCk5o/&`);
                console.log(result.thumbnail)
                let replyText = `KANATA TIKTOK DOWNLOADER\n`
                replyText += `Title : ${result.title}\n`
                replyText += `Upload by : ${result.author.nickname}\n`
                replyText += `bentar yaa,video lagi dikirim`
                // console.log(result)
                this.bot.sendPhoto(chatId, result.thumbnail, { caption: replyText });
                await this.bot.sendVideo(chatId, result.link)
            } catch (error) {
                this.bot.sendMessage(chatId, 'Terjadi kesalahan dalam mengurai permintaan, Silahkan coba beberapa saat lagi');
            }
        }
    }
    async tiktokMusic(msg) {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ").splice(1);
        if (args[1] === undefined) {
            this.bot.sendMessage(chatId, 'Tiktok audio downloader \n Masukkan url tiktok (Contoh: /tta https://vt.tiktok.com/ZSwWCk5o/)')
        } else {
            try {
                let result = await this.apiHelper.apiLol(`tiktokmusic?url=${args[1]}&`);
                this.bot.sendMessage(chatId, "_Bentar yaa..Audio lagi dikirim_", { parse_mode: 'Markdown' });
                await bot.sendAudio(chatId, result)
            } catch (error) {
                this.bot.sendMessage(chatId, 'Terjadi kesalahan dalam mengurai permintaan, Silahkan coba beberapa saat lagi');
            }
        }
    }
    async instagram(msg) {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ").splice(1);
        if (args[1] === undefined) {
            this.bot.sendMessage(chatId, 'Instagram Video downloader \n Masukkan url instagram')
        } else {
            try {
                this.result = await this.apiHelper.apiLol(`instagram?url=${args[1]}&`);
                // console.log(result[0]);
                bot.sendMessage(chatId, "_Bentar yaa..Video lagi dikirim_", { parse_mode: 'Markdown' });
                await this.bot.sendVideo(chatId, result[0])
            } catch (error) {
                this.bot.sendMessage(chatId, 'Terjadi kesalahan dalam mengurai permintaan, Silahkan coba beberapa saat lagi');
            }
        }
    }
}
