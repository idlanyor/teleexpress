import { menu } from '../libs/menu.js';
import { Islami } from '../command/Islami.js';
import { Pddikti } from '../command/Pddikti.js';
import { Downloader } from '../command/Downloader.js';
import { ChatGPT } from '../command/ChatGPT.js';

export class CommandHandler {
    constructor(bot) {
        this.bot = bot;
        this.islami = new Islami(bot);
        this.downloader = new Downloader(bot);
        this.dikti = new Pddikti(bot);
        this.gpt = new ChatGPT(bot);
        this.bot.onText(/\/help/, (msg) => this.handleHelpCommand(msg));
        this.bot.onText(/\/start/, (msg) => this.handleHelpCommand(msg));
        this.bot.on('callback_query', (query) => this.handleCallbackQuery(query));
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
    async handleCallbackQuery(query) {
        const chatId = query.message.chat.id;
        const data = query.data;
        const menuType = data.toLowerCase();
        const listMenu = menu[menuType].join("\n");
        this.bot.sendMessage(chatId, `List Command Bot ${menuType.charAt(0).toUpperCase() + menuType.slice(1)}:\n${listMenu}`);
    }
    

}

