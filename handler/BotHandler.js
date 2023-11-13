const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const { CommandHandler } = require('./CommandHandler');

class BotHandler {
    constructor() {
        this.TOKEN = process.env.TELEGRAM_TOKEN || '6613074155:AAETKFvXS5Zo1QreKUaWaYUYijii7DQZEAg';
        this.url = process.env.URL_WEBHOOK || 'https://stork-current-verbally.ngrok-free.app';
        this.port = process.env.PORT || 3000;

        this.bot = new TelegramBot(this.TOKEN, { polling: false });
        this.bot.setWebHook(`${this.url}/bot${this.TOKEN}`);

        this.app = express();
        this.app.use(express.json());

        this.commandHandler = new CommandHandler(this.bot);

        this.app.post(`/bot${this.TOKEN}`, (req, res) => {
            this.bot.processUpdate(req.body);
            res.sendStatus(200);
        });

        this.app.listen(this.port, () => {
            console.log(`Express server is listening on ${this.port}`);
        });
    }
}

module.exports = BotHandler;
