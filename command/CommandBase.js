const { ApiHelper } = require('../Helper/ApiHelper');

class CommandBase {
    constructor(bot) {
        this.bot = bot;
        this.apiHelper = new ApiHelper();
    }
}
module.exports = { CommandBase };