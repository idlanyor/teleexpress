import { ApiHelper } from '../helper/ApiHelper.js';

export class CommandBase {
    constructor(bot) {
        this.bot = bot;
        this.apiHelper = new ApiHelper();
    }
}