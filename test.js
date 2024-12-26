// 🚀 Telegram Referral Bot with Node.js

const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR_BOT_TOKEN'; // Replace this with your bot token
const bot = new TelegramBot(token, { polling: true });

// A simple in-memory database for storing user data
const users = {};

// Handle the /start command
bot.onText(/\/start (.+)?/, (msg, match) => {
    const chatId = msg.chat.id;
    const referrerId = match[1];

    // Check if the user is new
    if (!users[chatId]) {
        users[chatId] = { invites: 0, invitedBy: referrerId || null };

        // If referred, notify the referrer
        if (referrerId && users[referrerId]) {
            users[referrerId].invites += 1;
            bot.sendMessage(referrerId, `🎉 Someone joined using your invite link! You've earned a point.`);
        }

        bot.sendMessage(chatId, `👋 Welcome to the Referral Bot! Invite your friends to earn points.`);
    } else {
        bot.sendMessage(chatId, `⚠️ You are already registered.`);
    }
});

// Handle the /score command
bot.onText(/\/score/, (msg) => {
    const chatId = msg.chat.id;
    const score = users[chatId] ? users[chatId].invites : 0;
    bot.sendMessage(chatId, `🏆 Your score: ${score}`);
});

// Notify that the bot is running
console.log('🤖 Bot is running...');
