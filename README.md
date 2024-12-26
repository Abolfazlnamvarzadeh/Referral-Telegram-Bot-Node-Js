```markdown
# 🚀 Build a Telegram Referral Bot with Node.js 💻

Hello, developers! 👋  

In this guide, you’ll learn step-by-step how to create a **Telegram bot** with a referral system using **Node.js**.  
This bot can help you grow your **Telegram group or channel** effectively! 🌟  

---

## ⚡ Prerequisites:

1. 🛠 **Basic knowledge of Node.js**  
2. 🔑 **Get a bot token** from [BotFather](https://t.me/BotFather)  
3. 📦 **Install the `node-telegram-bot-api` library**  

---

## 📋 Steps to Create Your Referral Bot:

### 1️⃣ **Set Up Your Project**

1. Open your terminal and create a new project folder:
   ```bash
   mkdir referral-bot
   cd referral-bot
   ```
2. Initialize your project and install dependencies:
   ```bash
   npm init -y
   npm install node-telegram-bot-api
   ```

---

### 2️⃣ **Write the Bot Code**

Create a new file named `bot.js` and add the following code:

```javascript
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
```

---

### 3️⃣ **Run Your Bot**

1. Save your file and run the bot using the command:
   ```bash
   node bot.js
   ```
2. Your bot is now active and ready to handle `/start` and `/score` commands! 🎉  

---

### 4️⃣ **Share Invite Links**

Users can invite friends using the following format:  
```plaintext
https://t.me/BOT_USERNAME?start=USER_ID
```
Replace `BOT_USERNAME` with your bot's username and `USER_ID` with the inviter’s ID.  

---

## 🎉 Features

- **Command `/start [referrerId]`:** Registers the user and credits the inviter.  
- **Command `/score`:** Displays the user's invite score.  

---

Happy coding! 🚀  
For more, follow: [@drabolfazlcv](https://t.me/drabolfazlcv)
```
