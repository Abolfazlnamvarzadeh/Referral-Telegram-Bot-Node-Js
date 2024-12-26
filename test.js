const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR_BOT_TOKEN'; 
const bot = new TelegramBot(token, { polling: true });


const users = {};


bot.onText(/\/start (.+)?/, (msg, match) => {
    const chatId = msg.chat.id;
    const referrerId = match[1];

    
    if (referrerId && !users[chatId]) {
        users[chatId] = { invites: 0, invitedBy: referrerId };
        bot.sendMessage(referrerId, `🎉 شخصی از طرف شما به ربات پیوست و امتیاز گرفتید!`);
    } else if (!users[chatId]) {
        users[chatId] = { invites: 0 };
    }

    bot.sendMessage(chatId, 'به ربات رفرال خوش آمدید! با دعوت دوستان خود امتیاز بگیرید.');
});

bot.onText(/\/score/, (msg) => {
    const chatId = msg.chat.id;
    const score = users[chatId] ? users[chatId].invites : 0;
    bot.sendMessage(chatId, `امتیاز شما: ${score}`);
});
