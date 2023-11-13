const { ApiHelper } = require('../helper/ApiHelper.js');

class CommandBase {
    constructor(bot) {
        this.bot = bot;
        this.apiHelper = new ApiHelper();
    }
}
module.exports = { CommandBase };