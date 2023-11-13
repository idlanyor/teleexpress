/**
 * Kelas untuk membantu pengiriman pesan, video, foto, audio, stiker, dan lainnya melalui bot Telegram.
 * @class
 */
class SendHelper {
    /**
     * Constructor kelas SendHelper.
     * @constructor
     * @param {TelegramBot} bot - Objek bot Telegram.
     */
    constructor(bot) {
        /**
         * Objek bot Telegram.
         * @type {TelegramBot}
         */
        this.bot = bot;
    }

    /**
     * Mengirim pesan teks ke pengguna.
     * @param {number} chatId - ID obrolan pengguna.
     * @param {string} text - Teks yang akan dikirim.
     * @param {Object} [options] - Opsi tambahan untuk pengiriman pesan.
     */
    sendMessage(chatId, text, options) {
        this.bot.sendMessage(chatId, text, options)
            .catch(error => {
                console.error('Error sending message:', error);
            });
    }

    /**
     * Mengirim video ke pengguna.
     * @param {number} chatId - ID obrolan pengguna.
     * @param {string} video - Lokasi atau URL video yang akan dikirim.
     * @param {Object} [options] - Opsi tambahan untuk pengiriman video.
     */
    sendVideo(chatId, video, options) {
        this.bot.sendVideo(chatId, video, options)
            .catch(error => {
                console.error('Error sending video:', error);
            });
    }

    /**
     * Mengirim foto ke pengguna.
     * @param {number} chatId - ID obrolan pengguna.
     * @param {string} photo - Lokasi atau URL foto yang akan dikirim.
     * @param {Object} [options] - Opsi tambahan untuk pengiriman foto.
     */
    sendPhoto(chatId, photo, options) {
        this.bot.sendPhoto(chatId, photo, options)
            .catch(error => {
                console.error('Error sending photo:', error);
            });
    }

    /**
     * Mengirim audio ke pengguna.
     * @param {number} chatId - ID obrolan pengguna.
     * @param {string} audio - Lokasi atau URL audio yang akan dikirim.
     * @param {Object} [options] - Opsi tambahan untuk pengiriman audio.
     */
    sendAudio(chatId, audio, options) {
        this.bot.sendAudio(chatId, audio, options)
            .catch(error => {
                console.error('Error sending audio:', error);
            });
    }

    /**
     * Mengirim stiker ke pengguna.
     * @param {number} chatId - ID obrolan pengguna.
     * @param {string} sticker - Lokasi atau URL stiker yang akan dikirim.
     * @param {Object} [options] - Opsi tambahan untuk pengiriman stiker.
     */
    sendSticker(chatId, sticker, options) {
        this.bot.sendSticker(chatId, sticker, options)
            .catch(error => {
                console.error('Error sending sticker:', error);
            });
    }
}

module.exports = SendHelper;
