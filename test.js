const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR_BOT_TOKEN'; 
const bot = new TelegramBot(token, { polling: true });


const users = {};


bot.onText(/\/start (.+)?/, (msg, match) => {
    const chatId = msg.chat.id;
    const referrerId = match[1];

    
    if (referrerId && !users[chatId]) {
        users[chatId] = { invites: 0, invitedBy: referrerId };
        bot.sendMessage(referrerId, `🎉 Someone joined the bot on your behalf and got points!`);
    } else if (!users[chatId]) {
        users[chatId] = { invites: 0 };
    }

    bot.sendMessage(chatId, 'Welcome to the referral bot! Earn points by inviting your friends.');
});

bot.onText(/\/score/, (msg) => {
    const chatId = msg.chat.id;
    const score = users[chatId] ? users[chatId].invites : 0;
    bot.sendMessage(chatId, `Your Score : ${score}`);
});
