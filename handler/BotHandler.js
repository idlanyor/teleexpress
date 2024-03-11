import TelegramBot from 'node-telegram-bot-api';
import express, { json } from 'express';
import { CommandHandler } from './CommandHandler.js';

class BotHandler {
    constructor() {
        this.TOKEN = process.env.TOKEN_BOT;
        this.url = process.env.URL_HOOK;
        this.port = process.env.PORT || 3000;

        this.bot = new TelegramBot(this.TOKEN, { polling: false });
        this.bot.setWebHook(`${this.url}/bot${this.TOKEN}`);

        this.app = express();
        this.app.use(json());

        this.commandHandler = new CommandHandler(this.bot);

        this.app.post(`/bot${this.TOKEN}`, (req, res) => {
            this.bot.processUpdate(req.body);
            res.sendStatus(200);
        });
        this.app.get(`/`, (req, res) => {
            res.send("Simple Webhook API")
        });

        this.app.listen(this.port, () => {
            console.log(`Express server is listening on ${this.port}`);
        });
    }
}

export default BotHandler;
