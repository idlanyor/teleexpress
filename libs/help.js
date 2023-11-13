    bot.onText(/\/help/, (msg) => {
        const chatId = msg.chat.id;

        // Membuat keyboard inline sederhana
        const inlineKeyboard = {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '☪️ Islami', callback_data: 'islami' },
                        { text: '🎓 Edukasi', callback_data: 'edukasi' },
                        { text: '⬇️ Downloader', callback_data: 'download' },
                        { text: '▶️ Media Player', callback_data: 'mplayer' },
                    ],
                    [
                        { text: '📸 Kreasi Gambar', callback_data: 'kreasigambar' },
                        { text: '🖼️ Random Gambar', callback_data: 'randomgambar' },
                        { text: '📰 Berita', callback_data: 'berita' },
                        { text: '📰 Game', callback_data: 'game' },
                    ],
                ],
                one_time_keyboard: true,
            },
        };

        bot.sendMessage(chatId, ` Hai: ${msg.chat.first_name} ,Berikut command bot yang tersedia`, inlineKeyboard);
    });
module.exports = {
    help
}