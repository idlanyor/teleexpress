import { CommandBase } from "./CommandBase.js";
import { ChatGPTAPI } from "chatgpt";
import { config } from "dotenv";
// require('dotenv').config();
config()

export class ChatGPT extends CommandBase {
    constructor(bot) {
        super(bot)
        this.bot.onText(/\/gpt3/, (msg) => this.gpt3(msg))
        this.bot.onText(/\/gpt4/, (msg) => this.gpt4(msg))
    }
    async gpt3(msg) {
        const chatId = msg.chat.id;
        const args = msg.text.split(" ").splice(1);
        const gpt = new ChatGPTAPI({
            apiKey: process.env.OPENAI_KEY,
            completionParams: {
                model: 'gpt-3.5-turbo-1106',
            }
        })
        if (args[0] === undefined) {
            this.bot.sendMessage(chatId, '`ChatGPT 3.5 Turbo`\n penggunaan : /gpt3 prompt(contoh : `/gpt3 buatkan kode program java untuk menghitung luas trapesium dan volume tabung`', { parse_mode: 'Markdown' })
            return
        }
        try {
            let result = await gpt.sendMessage(args.join(' '), {
                systemMessage: `namamu adalah Kanata pembuatmu seorang Mahasiswa semester 3 di universitas STMIK Widya utama bernama Roynaldi,kamu akan mengatakan saat ada orang yang bertanya siapa kamu
                berikan link telegram ini hanya jika ada yang menanyakan kontak Roynaldi https://t.me/roidev2`
            })
            console.log(args.join(' '))
            console.log(result)
            await this.bot.sendMessage(chatId, "_Tunggu sebentar ⌛please wait_", { parse_mode: 'Markdown' });
            await this.bot.sendMessage(chatId, result.text, { parse_mode: 'Markdown' })
        } catch (error) {
            console.error(error)
            this.bot.sendMessage(chatId, 'Terjadi kesalahan dalam mengurai permintaan, Silahkan coba beberapa saat lagi');
        }

    }
    // async gpt4(msg) {
    //     const chatId = msg.chat.id;
    //     const args = msg.text.split(" ").splice(1);
    //     const gpt = new ChatGPTAPI({
    //         apiKey: process.env.OPENAI_KEY,
    //         completionParams: {
    //             model: 'gpt-3.5-turbo-1106',
    //           }
    //     })
    //     if (args[0] === undefined) {
    //         this.bot.sendMessage(chatId, '`ChatGPT 4`\n penggunaan : /gpt4 prompt(contoh : `/gpt4 buatkan kode program java untuk menghitung luas trapesium dan volume tabung`', { parse_mode: 'Markdown' })
    //         return
    //     }
    //     try {
    //         let result = await gpt.sendMessage(args.join(' '))
    //         console.log(args.join(' '))
    //         console.log(result)
    //         await this.bot.sendMessage(chatId, "_Tunggu sebentar ⌛please wait_", { parse_mode: 'Markdown' });
    //         await this.bot.sendMessage(chatId, result.text, { parse_mode: 'Markdown' })
    //     } catch (error) {
    //         console.error(error)
    //         this.bot.sendMessage(chatId, 'Terjadi kesalahan dalam mengurai permintaan, Silahkan coba beberapa saat lagi');
    //     }

    // }
}