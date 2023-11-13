const { menu } = require('../libs/menu.js');
const { ApiHelper } = require('../Helper/ApiHelper');
const { Islami } = require('../command/Islami.js');
const { Pddikti } = require('../command/Pddikti.js');
const { Downloader } = require('../command/Downloader.js');

class CommandHandler {
    constructor(bot) {
        this.bot = bot;
        this.apiHelper = new ApiHelper();
        this.islami = new Islami(bot);
        this.downloader = new Downloader(bot);
        this.bot.onText(/\/help/, (msg) => this.handleHelpCommand(msg));
        this.bot.on('callback_query', (query) => this.handleCallbackQuery(query, bot));
        // this.bot.on('message', async (msg) => this.handleMsg(msg, bot))
    }

    async handleHelpCommand(msg) {
        const chatId = msg.chat.id;

        const tombolMenu = {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '☪️ Islami', callback_data: 'islami' },
                        { text: '⬇️ Downloader', callback_data: 'download' },
                        { text: '🎓 Edukasi', callback_data: 'edukasi' },
                    ],
                    [
                        { text: '🎬 Entertainment', callback_data: 'entertainment' },
                        { text: '🖼️ Kreasi Gambar', callback_data: 'gambar' },
                    ],
                    [
                        { text: '📰 Random', callback_data: 'random' },
                        { text: '🎞️ Anime', callback_data: 'anime' },
                        { text: '🗿 Game', callback_data: 'game' },
                    ],
                ],
            },
        };

        this.bot.sendMessage(chatId, ` Hai ${msg.from.first_name} ,Berikut command bot yang tersedia`, tombolMenu);
    }
    async handleCallbackQuery(query, bot) {
        const chatId = query.message.chat.id;
        const data = query.data;
        const menuType = data.toLowerCase();
        const listMenu = menu[menuType].join("\n");
        bot.sendMessage(chatId, `List Command Bot ${menuType.charAt(0).toUpperCase() + menuType.slice(1)}:\n${listMenu}`);
    }
    async handleMsg(msg, bot) {
        if (msg.text && msg.text.trim() !== '') {
            const chatId = msg.chat.id
            const perintah = msg.text.split(" ")[0].toLowerCase();
            const args = msg.text.split(" ").splice(1);
            console.log(perintah)
            // penampung
            let result, replyText;
            // this.islami.asmaulHusna(msg);

            switch (perintah) {
                // islami 
                case '/help':
                    break
                case '/99':
                    break;
                case '/js':
                    break
                case '/tt':

                    break
                case '/tta':
                    
                    break
                case '/ig':
                    if (args[1] === undefined) {
                        bot.sendMessage(chatId, 'Instagram Video downloader \n Masukkan url instagram')
                    } else {
                        try {
                            result = await this.apiHelper.apiLol(`instagram?url=${args[1]}&`);
                            // console.log(result[0]);
                            bot.sendMessage(chatId, "_Bentar yaa..Video lagi dikirim_", { parse_mode: 'Markdown' });
                            await bot.sendVideo(chatId, result[0])
                        } catch (error) {
                            bot.sendMessage(chatId, 'Terjadi kesalahan dalam mengurai permintaan, Silahkan coba beberapa saat lagi');
                        }
                    }
                    break
                case '/play':
                    if (args[1] === undefined) {
                        bot.sendMessage(chatId, 'Youtube Player \n (Ex : /play usik feby putri)')
                    } else {
                        try {
                            result = await this.apiHelper.apiLol(`ytplay?query=${args[1] + args[2]}&`);
                            console.log(result.audio.link)
                            replyText = `KANATA YOUTUBE PLAYER\n`
                            replyText = `Title : ${result.title}\n`
                            replyText += `Upload by : ${result.uploader}\n\n`
                            replyText += `bentar yaa,audio lagi dikirim`
                            bot.sendPhoto(chatId, result.thumbnail, { caption: replyText });
                            // await bot.sendMessage(chatId, result.audio.link)
                            convertWebMtoMP3(result.audio.link, chatId, result.title);
                            function convertWebMtoMP3(inputFilePath, chatId, capt) {
                                const outputFilePath = './libs/';  // Ganti dengan path untuk menyimpan file hasil konversi MP3

                                ffmpeg()
                                    .input(inputFilePath)
                                    .audioCodec('libmp3lame')
                                    .toFormat('mp3')
                                    .on('end', () => {
                                        bot.sendAudio(chatId, outputFilePath, { caption: capt });
                                    })
                                    .on('error', (err) => {
                                        console.error('Error:', err);
                                    })
                                    .save(outputFilePath);
                            }
                        } catch (error) {
                            bot.sendMessage(chatId, 'Terjadi kesalahan dalam mengurai permintaan, Silahkan coba beberapa saat lagi');
                        }
                    }
                    break
                case '/pddikti':
                    let dikti = new Pddikti('ssi202203088')
                    let result = await dikti.getBioMhs()
                    console.log(result)
                    await bot.sendMessage(chatId, `Nama : ${result.nm_pd}`)
                    break
                default:
                    bot.sendMessage(chatId, `Perintah ${msg.text} tidak ditemukan,ketik /help untuk bantuan`);
                    break;
            }
        }

    }

}

module.exports = { CommandHandler };
