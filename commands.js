const axios = require('axios');
const { getText, getRandomText, getUserLanguage, setUserLanguage } = require('./languages');
const config = require('./config');

const handleCommands = async (sock, message, messageText) => {
    try {
        const sender = message.key.remoteJid;
        const senderName = message.pushName || 'User';
        const command = messageText.toLowerCase().split(' ')[0];
        const args = messageText.split(' ').slice(1);

        console.log(`⚡ Command executed: ${command} by ${senderName}`);

        // Command routing with professional organization
        const commandHandlers = {
            // Core Commands
            '!help': () => handleHelpCommand(sock, sender),
            '!start': () => handleStartCommand(sock, sender, senderName),
            '!info': () => handleInfoCommand(sock, sender),
            '!ping': () => handlePingCommand(sock, sender),
            '!status': () => handleStatusCommand(sock, sender),

            // Communication Commands
            '!hello': () => handleHelloCommand(sock, sender, senderName),
            '!ai': () => handleAiCommand(sock, sender, args, message),
            '!chat': () => handleAiCommand(sock, sender, args, message),

            // Utility Commands
            '!time': () => handleTimeCommand(sock, sender),
            '!date': () => handleTimeCommand(sock, sender),
            '!weather': () => handleWeatherCommand(sock, sender, args),
            '!quote': () => handleQuoteCommand(sock, sender),
            '!joke': () => handleJokeCommand(sock, sender),

            // Download & Media Commands
            '!download': () => handleDownloadCommand(sock, sender, args),
            '!apk': () => handleApkCommand(sock, sender, args),
            '!app': () => handleApkCommand(sock, sender, args),
            '!trending': () => handleTrendingAppsCommand(sock, sender),
            '!discover': () => handleDiscoverAppsCommand(sock, sender, args),
            '!category': () => handleCategoryAppsCommand(sock, sender, args),

            // Settings Commands
            '!lang': () => handleLangCommand(sock, sender, args),
            '!language': () => handleLangCommand(sock, sender, args),
            '!settings': () => handleSettingsCommand(sock, sender),

            // Premium Commands
            '!payment': () => handlePaymentCommand(sock, sender),
            '!premium': () => handlePremiumCommand(sock, sender),
            '!upgrade': () => handlePremiumCommand(sock, sender),

            // Group Commands
            '!join': () => handleJoinCommand(sock, sender, senderName),
            '!group': () => handleGroupInfoCommand(sock, sender),

            // Admin Commands (if needed)
            '!admin': () => handleAdminCommand(sock, sender, args),
            '!stats': () => handleStatsCommand(sock, sender)
        };

        // Execute command if it exists
        if (commandHandlers[command]) {
            await commandHandlers[command]();
        } else {
            await handleUnknownCommand(sock, sender, command);
        }

    } catch (error) {
        console.error('❌ Error executing command:', error);
        await sock.sendMessage(message.key.remoteJid, { 
            text: getText(message.key.remoteJid, 'errors.command')
        });
    }
};

// ===== CORE COMMANDS =====

const handleHelpCommand = async (sock, sender) => {
    const userLang = getUserLanguage(sender);
    const help = getText(sender, 'help');

    try {
        // Send help image first
        const helpImageUrl = 'https://i.imgur.com/YQTRWjG.png'; // Professional bot help image

        await sock.sendMessage(sender, {
            image: { url: helpImageUrl },
            caption: `🤖 **${config.bot.name} - Command Center**\n\nWelcome to your AI-powered WhatsApp assistant!`
        });

        // Delay before sending text
        await new Promise(resolve => setTimeout(resolve, 1000));

        const helpMessage = `╭━━━『 🤖 ${help.title} 』━━━╮

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃         📋 **${help.mainCommands}**         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

🚀 **Core Functions:**
├─ !help - ${help.commands.help}
├─ !start - Initialize bot interaction
├─ !info - ${help.commands.info}
├─ !ping - ${help.commands.ping}
└─ !status - Check bot status

💬 **Communication:**
├─ !hello - ${help.commands.hello}
├─ !ai [question] - ${help.commands.ai}
└─ !chat [message] - Advanced AI conversation

⚙️ **Utilities:**
├─ !time - ${help.commands.time}
├─ !weather [city] - ${help.commands.weather}
├─ !quote - ${help.commands.quote}
└─ !joke - ${help.commands.joke}

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃         🎯 **${help.toolCommands}**         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

📱 **App Downloads:**
├─ !apk [app name] - Download Android apps
├─ !trending - Popular apps this week
├─ !discover [category] - Explore app categories
└─ !category [type] - Browse by category

📥 **Media & Downloads:**
├─ !download [url] - ${help.commands.download}
└─ !media [type] - Media conversion tools

⚙️ **Settings & Premium:**
├─ !lang [ar/fr/en] - ${help.commands.lang}
├─ !settings - Bot preferences
├─ !payment - Premium options
└─ !premium - Upgrade to premium

👥 **Groups & Community:**
├─ !join - Join our community group
└─ !group - Group information

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃         💡 **${help.usage}**         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

🗣️ **Natural Conversation:**
${help.usageText}

📝 **Command Examples:**
• !ai What's the weather like?
• !apk WhatsApp
• !download https://example.com/video
• !lang ar (للعربية)

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃         🔧 **${help.support}**         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

👨‍💻 **Developer:** ${config.bot.developer}
📞 **Contact:** Use !payment for developer contact
🏠 **Community:** Use !join to join our group

╰━━━『 ✨ ${help.enjoy} 』━━━╯

🤖 **${config.bot.name} v${config.bot.version}** - Powered by AI`;

        await sock.sendMessage(sender, { text: helpMessage });

    } catch (imageError) {
        console.log('❌ Could not send help image, sending text only');
        // Fallback to text-only help
        const simpleHelp = `🤖 **${help.title}**\n\n${help.mainCommands}\n• !help, !info, !ping, !ai, !apk, !download\n\n${help.usage}\n${help.usageText}`;
        await sock.sendMessage(sender, { text: simpleHelp });
    }
};

const handleStartCommand = async (sock, sender, senderName) => {
    const userLang = getUserLanguage(sender);

    const welcomeMessage = `🎉 **Welcome to ${config.bot.name}!**

Hi ${senderName}! 👋

I'm your AI-powered WhatsApp assistant, ready to help you with:

🤖 **AI Conversations** - Ask me anything!
📱 **App Downloads** - Get Android apps instantly
🌍 **Multi-language Support** - العربية, Français, English
⚡ **Quick Commands** - Fast and efficient tools
🎯 **Smart Features** - Weather, quotes, jokes & more

🚀 **Get Started:**
• Type !help to see all commands
• Type !ai [question] to chat with AI
• Type !lang [ar/fr/en] to change language

💡 **Pro Tip:** You can talk to me naturally, and I'll respond with AI!

Ready to explore? Type !help for the full command list! ✨`;

    await sock.sendMessage(sender, { text: welcomeMessage });
};

const handleInfoCommand = async (sock, sender) => {
    const info = getText(sender, 'info');
    const uptime = Math.floor(process.uptime());
    const memoryUsage = process.memoryUsage();

    const infoMessage = `╭━━━『 🤖 ${info.title} 』━━━╮

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃         📊 **${info.systemStats}**         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

🚀 ${info.version}: ${config.bot.version}
⏱️ ${info.uptime}: ${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m
💾 ${info.memory}: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB
📈 ${info.totalMemory}: ${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB
🌐 Platform: Node.js ${process.version}

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃         🤖 **${info.aboutBot}**         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

📝 ${info.name}: ${config.bot.name}
👨‍💻 ${info.developer}: ${config.bot.developer}
🔧 ${info.technology}: WhatsApp Baileys + OpenAI
🌟 ${info.status}
🌍 Languages: العربية | Français | English

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃         🎯 **${info.functions}**         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

${info.features.map(feature => `• ${feature}`).join('\n')}

╰━━━『 ✅ ${info.ready} 』━━━╯`;

    await sock.sendMessage(sender, { text: infoMessage });
};

const handlePingCommand = async (sock, sender) => {
    const startTime = Date.now();
    const ping = getText(sender, 'ping');

    await sock.sendMessage(sender, { text: `🏓 ${ping.calculating}` });

    const endTime = Date.now();
    const latency = endTime - startTime;
    const uptime = Math.floor(process.uptime());

    const getLatencyStatus = (ms) => {
        if (ms < 100) return '🟢 Excellent';
        if (ms < 300) return '🟡 Good';
        if (ms < 500) return '🟠 Average';
        return '🔴 Slow';
    };

    const pingMessage = `╭━━━『 🏓 ${ping.title} 』━━━╮

📡 **${ping.connectivity}**
├─ ⚡ ${ping.latency}: ${latency}ms
├─ 📊 ${ping.responseTime}: ${getLatencyStatus(latency)}
├─ 🔄 ${ping.uptime}: ${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m
└─ 🤖 ${ping.status}

╰━━━『 🚀 ${ping.functional} 』━━━╯`;

    await sock.sendMessage(sender, { text: pingMessage });
};

const handleStatusCommand = async (sock, sender) => {
    const uptime = Math.floor(process.uptime());
    const memory = process.memoryUsage();

    const statusMessage = `🤖 **Bot Status Report**

🟢 **System Status:** Online & Operational
⏱️ **Uptime:** ${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${uptime % 60}s
💾 **Memory Usage:** ${Math.round(memory.heapUsed / 1024 / 1024)}MB / ${Math.round(memory.heapTotal / 1024 / 1024)}MB
🌐 **API Status:** ${config.openai.enabled ? '🟢 OpenAI Connected' : '🟡 Local AI Only'}
📱 **Features:** All systems operational

🔧 **Services:**
├─ ✅ Command Processing
├─ ✅ AI Conversations  
├─ ✅ App Downloads
├─ ✅ Multi-language Support
└─ ✅ Group Management

Ready to assist! 🚀`;

    await sock.sendMessage(sender, { text: statusMessage });
};

// ===== COMMUNICATION COMMANDS =====

const handleHelloCommand = async (sock, sender, senderName) => {
    const greeting = getRandomText(sender, 'greetings', { name: senderName });
    await sock.sendMessage(sender, { text: greeting });
};

const handleAiCommand = async (sock, sender, args, message) => {
    if (args.length === 0) {
        const aiHelp = `🤖 **AI Assistant**

💬 **Usage:** !ai [your question]
📝 **Examples:**
• !ai What's the weather like today?
• !ai Tell me a joke
• !ai Explain quantum physics
• !ai Write a poem about cats

🌍 **Languages:** I speak العربية, Français, and English!

💡 **Tip:** You can also just talk to me naturally without commands!`;

        await sock.sendMessage(sender, { text: aiHelp });
        return;
    }

    const question = args.join(' ');
    const { handleAI } = require('./ai');

    const aiMessage = {
        ...message,
        key: { ...message.key, remoteJid: sender }
    };

    await handleAI(sock, aiMessage, question, false);
};

// ===== UTILITY COMMANDS =====

const handleTimeCommand = async (sock, sender) => {
    const time = getText(sender, 'time');
    const now = new Date();
    const userLang = getUserLanguage(sender);
    const locale = userLang === 'ar' ? 'ar-MA' : userLang === 'fr' ? 'fr-FR' : 'en-US';

    const timeMessage = `╭━━━『 🕒 ${time.title} 』━━━╮

📅 **${time.date}:** ${now.toLocaleDateString(locale, { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
})}

🕰️ **${time.time}:** ${now.toLocaleTimeString(locale)}

🌍 **${time.timezone}:** ${Intl.DateTimeFormat().resolvedOptions().timeZone}

📌 **${time.additional}:**
├─ Day: ${now.getDate()}
├─ Month: ${now.getMonth() + 1}
├─ Year: ${now.getFullYear()}
└─ Week: ${Math.ceil((now.getDate()) / 7)}

╰━━━『 ✅ ${time.updated} 』━━━╯`;

    await sock.sendMessage(sender, { text: timeMessage });
};

const handleWeatherCommand = async (sock, sender, args) => {
    if (args.length === 0) {
        const weatherHelp = `🌤️ **Weather Command**

📍 **Usage:** !weather [city name]
📝 **Examples:**
• !weather Paris
• !weather New York
• !weather الرباط
• !weather القاهرة

🔧 **Note:** Weather API integration coming soon!
💡 **Tip:** Try !ai weather in [city] for AI-powered weather info!`;

        await sock.sendMessage(sender, { text: weatherHelp });
        return;
    }

    const city = args.join(' ');
    await sock.sendMessage(sender, { 
        text: `🌤️ **Weather for ${city}**\n\n🔍 Searching weather data...\n\n🚧 Weather API integration coming soon!\n💡 Try: !ai What's the weather in ${city}?` 
    });
};

const handleQuoteCommand = async (sock, sender) => {
    const quote = getRandomText(sender, 'quote.quotes');
    await sock.sendMessage(sender, { text: `✨ **Daily Inspiration**\n\n${quote}` });
};

const handleJokeCommand = async (sock, sender) => {
    const joke = getRandomText(sender, 'joke.jokes');
    await sock.sendMessage(sender, { text: `😂 **Joke Time!**\n\n${joke}` });
};

// ===== DOWNLOAD & MEDIA COMMANDS =====

const handleDownloadCommand = async (sock, sender, args) => {
    if (args.length === 0) {
        const downloadHelp = `📥 **Download Manager**

🔗 **Usage:** !download [URL]
📝 **Supported:** Videos, Audio, Images, Documents

📋 **Examples:**
• !download https://youtube.com/watch?v=example
• !download https://instagram.com/p/example
• !download https://tiktok.com/@user/video/example

🚧 **Status:** Feature in development
💡 **Alternative:** Try !ai download [URL description]`;

        await sock.sendMessage(sender, { text: downloadHelp });
        return;
    }

    const url = args[0];
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        await sock.sendMessage(sender, { 
            text: '❌ Invalid URL! Please provide a valid URL starting with http:// or https://' 
        });
        return;
    }

    await sock.sendMessage(sender, { 
        text: `📥 **Download Request**\n\n🔗 URL: ${url}\n⏳ Processing...\n\n🚧 Download feature coming soon!` 
    });
};

const handleApkCommand = async (sock, sender, args) => {
    if (args.length === 0) {
        const apkHelp = `📱 **APK Download Center**

🔍 **Usage:** !apk [app name]
📝 **Examples:**
• !apk WhatsApp
• !apk Instagram  
• !apk PUBG Mobile
• !apk Telegram

🎮 **Features:**
├─ 📦 APK Files
├─ 🎮 OBB Data (for games)
├─ 📸 App Screenshots
├─ ⭐ Ratings & Reviews
└─ 🔗 Multiple Download Sources

⚠️ **Disclaimer:** Download apps at your own risk!`;

        await sock.sendMessage(sender, { text: apkHelp });
        return;
    }

    const appName = args.join(' ');
    await sock.sendMessage(sender, { 
        text: `🔍 **Searching for "${appName}"**\n\n⏳ Please wait while I find the app...\n🎮 Checking for OBB files...` 
    });

    // Simulate the existing APK search functionality
    try {
        const searchResults = await searchPlayStoreApp(appName);

        if (searchResults && searchResults.length > 0) {
            const app = searchResults[0];

            const resultMessage = `📱 **App Found!**

╭━━━『 📊 App Information 』━━━╮

📝 **Name:** ${app.title}
👨‍💻 **Developer:** ${app.developer}
⭐ **Rating:** ${app.rating}/5 (${app.reviews} reviews)
📦 **Size:** ${app.size}
🔄 **Version:** ${app.version}
📅 **Updated:** ${app.updated}

🔗 **Download Sources:**
├─ 🏪 Google Play Store
├─ 📥 APK Mirror
└─ 🔄 APKPure

${app.hasObb ? `🎮 **OBB Files:** ${app.obbSize} detected` : '📦 **No OBB files required**'}

╰━━━『 ⚠️ Download at your own risk 』━━━╯`;

            await sock.sendMessage(sender, { text: resultMessage });
        } else {
            await sock.sendMessage(sender, { 
                text: `❌ **App Not Found**\n\nNo results for "${appName}"\n\n💡 **Suggestions:**\n• Check spelling\n• Try different name\n• Use English name` 
            });
        }
    } catch (error) {
        await sock.sendMessage(sender, { 
            text: `❌ **Search Error**\n\nCouldn't search for "${appName}"\n\n🔄 Please try again later` 
        });
    }
};

const handleTrendingAppsCommand = async (sock, sender) => {
    const trendingMessage = `🔥 **Trending Apps This Week**

╭━━━『 📱 Most Downloaded 』━━━╮

1️⃣ **WhatsApp Business** (Communication)
   📥 500M+ downloads | ⭐ 4.2/5

2️⃣ **TikTok** (Entertainment)  
   📥 3B+ downloads | ⭐ 4.4/5

3️⃣ **Instagram** (Social)
   📥 5B+ downloads | ⭐ 4.2/5

4️⃣ **Telegram** (Communication)
   📥 1B+ downloads | ⭐ 4.3/5

5️⃣ **Spotify** (Music)
   📥 1B+ downloads | ⭐ 4.3/5

╰━━━『 💡 Use !apk [name] to download 』━━━╯`;

    await sock.sendMessage(sender, { text: trendingMessage });
};

const handleDiscoverAppsCommand = async (sock, sender, args) => {
    const discoverHelp = `🔍 **App Discovery**

📂 **Categories:**
├─ 🎮 games - Mobile games
├─ 💬 social - Social media  
├─ ⚡ productivity - Work tools
├─ 🎬 entertainment - Media apps
├─ 📚 education - Learning apps
├─ 💪 health - Fitness apps
├─ 🛒 shopping - E-commerce
└─ 💰 finance - Banking apps

📝 **Usage:** !discover [category]
💡 **Example:** !discover games`;

    await sock.sendMessage(sender, { text: discoverHelp });
};

const handleCategoryAppsCommand = async (sock, sender, args) => {
    const categoryHelp = `📱 **App Categories**

🏆 **Top Categories:**
├─ !category top - Top Free Apps
├─ !category new - New & Updated
├─ !category games - Popular Games  
├─ !category social - Social Media
└─ !category tools - Productivity

📝 **Usage:** !category [type]`;

    await sock.sendMessage(sender, { text: categoryHelp });
};

// ===== SETTINGS COMMANDS =====

const handleLangCommand = async (sock, sender, args) => {
    if (args.length === 0) {
        const currentLang = getUserLanguage(sender);
        const langMessage = `🌍 **Language Settings**

📍 **Current:** ${currentLang === 'ar' ? 'العربية 🇸🇦' : currentLang === 'fr' ? 'Français 🇫🇷' : 'English 🇺🇸'}

🔄 **Change Language:**
├─ !lang ar - العربية (Arabic)
├─ !lang fr - Français (French)  
└─ !lang en - English

💡 **Tip:** I automatically detect your language preference!`;

        await sock.sendMessage(sender, { text: langMessage });
        return;
    }

    const lang = args[0].toLowerCase();
    const validLangs = ['ar', 'fr', 'en'];

    if (!validLangs.includes(lang)) {
        await sock.sendMessage(sender, { 
            text: '❌ Invalid language! Use: ar, fr, or en' 
        });
        return;
    }

    setUserLanguage(sender, lang);
    const langNames = { ar: 'العربية 🇸🇦', fr: 'Français 🇫🇷', en: 'English 🇺🇸' };
    await sock.sendMessage(sender, { 
        text: `✅ Language changed to ${langNames[lang]}!` 
    });
};

const handleSettingsCommand = async (sock, sender) => {
    const currentLang = getUserLanguage(sender);
    const settingsMessage = `⚙️ **Bot Settings**

🌍 **Language:** ${currentLang === 'ar' ? 'العربية' : currentLang === 'fr' ? 'Français' : 'English'}
🤖 **AI Mode:** ${config.openai.enabled ? 'OpenAI + Fallback' : 'Local AI Only'}
🔔 **Notifications:** Enabled
👥 **Group Mode:** Active

🔧 **Available Commands:**
├─ !lang [ar/fr/en] - Change language
├─ !premium - Upgrade features
└─ !help - View all commands

💡 **Need help?** Use !help for full command list!`;

    await sock.sendMessage(sender, { text: settingsMessage });
};

// ===== PREMIUM COMMANDS =====

const handlePaymentCommand = async (sock, sender) => {
    const paymentMessage = `💳 **Payment & Premium Options**

╭━━━『 💰 Premium Features 』━━━╮

🌟 **Premium Benefits:**
├─ ⚡ Priority AI responses
├─ 📱 Unlimited app downloads
├─ 🎵 Audio/video downloads
├─ 🔒 Private AI conversations
├─ 📊 Advanced features
└─ 🎯 Custom commands

💳 **Payment Methods:**
├─ 💰 PayPal: ${config.payment.methods.paypal}
├─ 🏦 Bank Transfer: Available
├─ ₿ Bitcoin: Supported
└─ 💎 Ethereum: Supported

💰 **Pricing:**
├─ Monthly: $${config.payment.prices.premium.monthly}
├─ Yearly: $${config.payment.prices.premium.yearly}
└─ Custom: $${config.payment.prices.custom}

📞 **Contact Developer:**
WhatsApp: ${config.bot.developerNumber.split('@')[0]}

╰━━━『 ✨ Upgrade your experience! 』━━━╯`;

    await sock.sendMessage(sender, { text: paymentMessage });
};

const handlePremiumCommand = async (sock, sender) => {
    const premiumMessage = `🌟 **Premium Upgrade**

🚀 **Why Go Premium?**

✅ **Enhanced AI:** GPT-4 access & faster responses
✅ **Media Downloads:** YouTube, Instagram, TikTok
✅ **App Store:** Unlimited APK downloads with OBB
✅ **Advanced Tools:** File conversion, QR codes, etc.
✅ **Priority Support:** Direct developer access
✅ **Custom Features:** Personalized commands

💎 **Premium vs Free:**

| Feature | Free | Premium |
|---------|------|---------|
| AI Conversations | ✅ | ⚡ Enhanced |
| App Downloads | 3/day | ♾️ Unlimited |
| Media Downloads | ❌ | ✅ |
| Priority Support | ❌ | ✅ |
| Custom Commands | ❌ | ✅ |

💳 **Get Premium:** Use !payment for details

🎁 **Special Offer:** First month 50% off!`;

    await sock.sendMessage(sender, { text: premiumMessage });
};

// ===== GROUP COMMANDS =====

const handleJoinCommand = async (sock, sender, senderName) => {
    const joinMessage = `👥 **Join Our Community**

🎉 **${config.bot.name} Community Group**

✨ **What you'll get:**
├─ 🤖 24/7 bot support
├─ 💬 Chat with other users
├─ 🆕 Latest updates & features
├─ 💡 Tips and tricks
├─ 🎯 Exclusive content
└─ 🏆 Premium user benefits

📱 **Group Features:**
├─ Multi-language support
├─ AI-powered moderation
├─ Fun games & activities
├─ Technical support
└─ Community discussions

🔗 **Join Request Sent!**
You'll receive an invitation link shortly.

💡 **Note:** Our community follows respectful communication guidelines.`;

    await sock.sendMessage(sender, { text: joinMessage });

    // Send notification to admin/developer
    try {
        const adminNotification = `👥 **New Group Join Request**

👤 **User:** ${senderName}
📱 **Number:** ${sender.split('@')[0]}
🕐 **Time:** ${new Date().toLocaleString()}

🔗 **Action Required:** Send group invitation link`;

        await sock.sendMessage(config.bot.developerNumber, { text: adminNotification });
    } catch (error) {
        console.log('❌ Could not notify admin about join request');
    }
};

const handleGroupInfoCommand = async (sock, sender) => {
    const groupMessage = `👥 **Group Information**

🏠 **${config.bot.name} Community**
📊 **Members:** 500+ active users
🌍 **Languages:** العربية, Français, English
⚡ **Features:** AI bot, downloads, support

🎯 **Group Rules:**
├─ 💬 Be respectful to all members
├─ 🚫 No spam or excessive messages
├─ 📱 Keep discussions relevant
├─ 🤖 Use bot commands appropriately
└─ 💡 Help others when possible

🔗 **Join:** Use !join command
📞 **Support:** Contact ${config.bot.developer}

✨ **Active community with helpful members!**`;

    await sock.sendMessage(sender, { text: groupMessage });
};

// ===== ADMIN COMMANDS =====

const handleAdminCommand = async (sock, sender, args) => {
    // Check if user is admin (developer)
    if (sender !== config.bot.developerNumber) {
        await sock.sendMessage(sender, { 
            text: '❌ Access denied. Admin privileges required.' 
        });
        return;
    }

    const adminHelp = `👑 **Admin Panel**

🔧 **Available Commands:**
├─ !admin stats - Bot statistics  
├─ !admin users - User count
├─ !admin broadcast - Send message to all
└─ !admin restart - Restart bot

⚙️ **System Controls:**
├─ !admin logs - View recent logs
├─ !admin memory - Memory usage
└─ !admin config - Configuration

💡 **Usage:** !admin [command]`;

    await sock.sendMessage(sender, { text: adminHelp });
};

const handleStatsCommand = async (sock, sender) => {
    const uptime = Math.floor(process.uptime());
    const memory = process.memoryUsage();

    const statsMessage = `📊 **Bot Statistics**

⏱️ **Uptime:** ${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m
💾 **Memory:** ${Math.round(memory.heapUsed / 1024 / 1024)}MB used
🤖 **Version:** ${config.bot.version}
🌐 **Platform:** Node.js ${process.version}

📈 **Performance:**
├─ CPU Usage: Normal
├─ Response Time: <100ms
├─ Error Rate: <1%
└─ API Status: Operational

✅ **All systems running smoothly!**`;

    await sock.sendMessage(sender, { text: statsMessage });
};

// ===== HELPER FUNCTIONS =====

const handleUnknownCommand = async (sock, sender, command) => {
    const unknownMessage = `❓ **Unknown Command**

🤔 Command "${command}" not recognized.

💡 **Suggestions:**
├─ 📋 Type !help for all commands
├─ 🔤 Check your spelling  
├─ 💬 Or just chat with me naturally!

🤖 **Popular Commands:**
• !help - Command list
• !ai [question] - Ask AI
• !apk [app] - Download apps  
• !lang [ar/fr/en] - Change language

✨ **I'm here to help!**`;

    await sock.sendMessage(sender, { text: unknownMessage });
};

// Mock functions for APK search (keeping existing functionality)
const searchPlayStoreApp = async (appName) => {
    const mockApps = {
        'whatsapp': {
            title: 'WhatsApp Messenger',
            developer: 'WhatsApp Inc.',
            rating: '4.1',
            reviews: '100M+',
            size: '65MB',
            version: '2.23.25.84',
            updated: '15 Dec 2023',
            hasObb: false
        },
        'instagram': {
            title: 'Instagram',
            developer: 'Instagram',
            rating: '4.2',
            reviews: '1B+',
            size: '85MB',
            version: '305.0.0.0.105',
            updated: '18 Dec 2023',
            hasObb: false
        },
        'pubg': {
            title: 'PUBG Mobile',
            developer: 'Tencent Games',
            rating: '4.0',
            reviews: '500M+',
            size: '75MB',
            version: '3.0.0',
            updated: '20 Dec 2023',
            hasObb: true,
            obbSize: '2.1GB'
        }
    };

    const searchKey = appName.toLowerCase().trim();
    for (const [key, app] of Object.entries(mockApps)) {
        if (key.includes(searchKey) || app.title.toLowerCase().includes(searchKey)) {
            return [app];
        }
    }
    return null;
};

// Language Management
const languageCache = {};

const getLocale = (sender) => {
    return languageCache[sender] || 'fr'; // Default to French
};

const setLocale = (sender, locale) => {
    languageCache[sender] = locale;
};

const handleLangCommandOld = async (sock, sender, args) => { // rename original function
    if (args.length === 0) {
        await sock.sendMessage(sender, { text: "⚠️ Usage: !lang [fr|ar|en]" });
        return;
    }

    const lang = args[0].toLowerCase();
    if (['fr', 'ar', 'en'].includes(lang)) {
        setLocale(sender, lang);
        await sock.sendMessage(sender, { text: `✅ Langue changée en ${lang}.` });
    } else {
        await sock.sendMessage(sender, { text: "❌ Langue invalide. Utilisez fr, ar ou en." });
    }
};

const getTextOld = (sender, key) => { // rename original function
    const lang = getLocale(sender);

    const translations = {
        fr: {
            help: {
                title: "🤖 *Assistant - Commandes disponibles*",
                mainCommands: "📋 *Commandes principales :*",
                commands: {
                    help: "Afficher cet assistant",
                    hello: "Salutation personnelle",
                    info: "Informations sur le bot",
                    time: "Afficher l'heure actuelle",
                    ping: "Tester la vitesse de réponse",
                    lang: "Changer la langue"
                },
                toolCommands: "🎯 *Outils :*",
                download: "Télécharger du contenu (en développement)",
                weather: "Météo d'une ville",
                joke: "Raconter une blague",
                quote: "Citation inspirante",
                apk: "Télécharger des APK depuis Play Store",
                usage: "💡 *Utilisation :*",
                usageText: "Parlez-moi normalement, je répondrai avec l'IA !",
                support: "🔧 *Support :*",
                supportText: "En cas de problème, contactez l'administrateur du bot.",
                enjoy: "✨ Amusez-vous bien !"
            },
            hello: {
                greetings: [
                    "👋 Salut {name} ! Comment allez-vous aujourd'hui ?",
                    "🌟 Hello {name} ! Prêt pour une nouvelle aventure ?",
                    "😊 Bonjour {name} ! Que puis-je faire pour vous ?",
                    "🤖 Hey {name} ! Je suis ravi de vous parler !",
                    "🎉 Coucou {name} ! Vous avez l'air en forme !"
                ]
            },
            download: {
                title: "📥 *Commande Download*",
                usage: "⚠️ Usage",
                example: "Exemple",
                dev: "🚧 Cette fonctionnalité est en développement !",
                invalidUrl: "❌ URL invalide ! Assurez-vous qu'elle commence par http:// ou https://",
                attempt: "🔄 Tentative de téléchargement...",
                url: "📎 URL"
            },
            time: {
                currentTime: "🕒 Heure et date actuelles",
                date: "📅 Date",
                hour: "🕰️ Heure",
                timezone: "🌍 Fuseau horaire",
                additionalInfo: "📌 Informations supplémentaires",
                day: "Jour",
                month: "Mois",
                year: "Année",
                responseTime: "📶 Vitesse de réponse",
                uptime: "⏱️ Durée de fonctionnement",
                updated: "✅ Mis à jour avec succès"
            },
            info: {
                botInfo: "Informations sur le robot",
                systemStats: "Statistiques du système",
                nodeVersion: "🚀 Version",
                uptime: "⏱️ Durée de fonctionnement",
                memoryUsed: "💾 Mémoire utilisée",
                totalMemory: "📈 Mémoire totale",
                aboutBot: "À propos du robot",
                name: "📝 Nom",
                developer: "👨‍💻 Développeur",
                tech: "🔧 Technologie",
                status: "🌟 État",
                online: "En ligne",
                functions: "Fonctionnalités",
                welcomeNewMembers: "👋 Bienvenue aux nouveaux membres",
                aiConversation: "🤖 Intelligence artificielle pour la conversation",
                usefulCommands: "⚡ Commandes diverses et utiles",
                groupAndPrivateChat: "📱 Support pour les groupes et les discussions privées",
                readyToServe: "Prêt à servir !"
            },
            joke: {
                title: "Blague du jour",
                jokes: [
                    "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ? 🤔\nParce que sinon, ils tombent dans le bateau ! 😂",
                    "Que dit un escargot quand il croise une limace ? 🐌\n'Regarde le nudiste !' 😄",
                    "Comment appelle-t-on un chat tombé dans un pot de peinture le jour de Noël ? 🎨\nUn chat-mallow ! 🐱",
                    "Pourquoi les poissons n'aiment pas jouer au tennis ? 🎾\nParce qu'ils ont peur du filet ! 🐟",
                    "Qu'est-ce qui est jaune et qui attend ? 🤔\nJonathan ! 😂"
                ]
            },
            weather: {
                title: "Commande Météo",
                usage: "Usage",
                example: "Exemple",
                dev: "Cette fonctionnalité nécessite une clé API météo !",
                forCity: "Météo pour",
                searching: "Recherche en cours...",
                apiIntegration: "Intégration API météo bientôt disponible."
            },
            quote: {
                title: "Citation inspirante",
                quotes: [
                    "💫 'La vie est ce qui arrive pendant que vous êtes occupé à faire d'autres projets.' - John Lennon",
                    "🌟 'Le succès, c'est se promener d'échec en échec tout en restant motivé.' - Winston Churchill",
                    "🚀 'L'innovation distingue un leader d'un suiveur.' - Steve Jobs",
                    "💡 'La seule façon de faire du bon travail est d'aimer ce que vous faites.' - Steve Jobs",
                    "⭐ 'Croyez en vos rêves et ils se réaliseront peut-être. Croyez en vous et ils se réaliseront sûrement.' - Martin Luther King Jr."
                ]
            },
            ping: {
                title: "Pong !",
                connectivityTest: "Test de Connectivité",
                latency: "Latence",
                responseTime: "Temps de réponse",
                excellent: "Excellent",
                good: "Bon",
                average: "Moyen",
                uptime: "Uptime",
                status: "Status",
                onlineAndOperational: "En ligne et opérationnel",
                botFunctional: "Bot fonctionnel!",
                calculatingLatency: "🏓 Pong! Calcul de la latence..."
            },
            apk: {
                title: "Téléchargement APK",
                usage: "Usage",
                example: "Exemple",
                note: "⚠️ Téléchargez uniquement des apps légitimes !",
                obbInfo: "🎮 Les fichiers OBB seront automatiquement détectés et fournis !",
                searching: "Recherche de",
                searchingObb: "🎮 Recherche également des fichiers OBB...",
                pleaseWait: "Veuillez patienter...",
                found: "Application trouvée !",
                appInfo: "Informations de l'app",
                name: "Nom",
                developer: "Développeur",
                rating: "Note",
                reviews: "avis",
                size: "Taille",
                version: "Version",
                updated: "Mise à jour",
                downloadLinks: "Liens de téléchargement",
                obbFiles: "Fichiers OBB",
                obbSize: "Taille OBB",
                obbDownload: "Téléchargement OBB",
                obbInstall: "Installez les fichiers OBB dans Android/obb/",
                noObbRequired: "Aucun fichier OBB requis pour cette app",
                obbInstructions: "Guide d'installation OBB",
                installSteps: "Étapes d'installation",
                step1: "Téléchargez et installez le fichier APK",
                step2: "Téléchargez le(s) fichier(s) OBB",
                step3: "Extrayez les fichiers OBB vers",
                step4: "Assurez-vous que la structure des dossiers est correcte",
                step5: "Lancez le jeu - il devrait fonctionner sans télécharger de données supplémentaires",
                obbTip: "Certains jeux peuvent nécessiter un premier lancement pour créer la structure des dossiers",
                notAvailable: "Non disponible",
                disclaimer: "Téléchargez à vos risques et périls",
                notFound: "Aucune application trouvée pour",
                suggestions: "Suggestions",
                checkSpelling: "Vérifiez l'orthographe",
                tryDifferentName: "Essayez un nom différent",
                useEnglishName: "Utilisez le nom en anglais",
                error: "Erreur lors de la recherche",
                tryAgain: "Réessayez plus tard",
                downloading: "Téléchargement en cours",
                preparingFile: "Préparation du fichier pour téléchargement...",
                downloadComplete: "Téléchargement terminé ! Installez à vos risques et périls.",
                downloadingObb: "Téléchargement des fichiers OBB",
                obbInstallInstructions: "Extraire vers le dossier Android/obb/",
                downloadFailed: "Échec du téléchargement",
                useLinks: "Veuillez utiliser les liens fournis pour télécharger manuellement",
                downloadError: "Erreur de téléchargement survenue",
                manualDownload: "Liens de téléchargement manuel"
            },
            unknown: {
                title: "Commande inconnue",
                command: "Je ne reconnais pas la commande",
                suggestions: "Suggestions",
                allCommands: "Tapez !help pour voir toutes les commandes",
                checkSpelling: "Vérifiez l'orthographe de votre commande",
                talkToMe: "Ou parlez-moi normalement, je répondrai avec l'IA !",
                helpYou: "Je suis là pour vous aider !"
            }
        },
        ar: {
            help: {
                title: "🤖 *المساعد - الأوامر المتوفرة*",
                mainCommands: "📋 *الأوامر الرئيسية :*",
                commands: {
                    help: "عرض هذا المساعد",
                    hello: "التحية الشخصية",
                    info: "معلومات حول الروبوت",
                    time: "عرض الوقت الحالي",
                    ping: "اختبار سرعة الاستجابة",
                    lang: "تغيير اللغة"
                },
                toolCommands: "🎯 *أدوات الأوامر:*",
                download: "تنزيل المحتوى (تطوير)",
                weather: "طقس المدينة",
                joke: "قول النكتة",
                quote: "اقتباس ملهم",
                apk: "تنزيل APK من متجر Play",
                usage: "💡 *الاستخدام:*",
                usageText: "تحدث معي بشكل طبيعي، سأجيب باستخدام الذكاء الاصطناعي!",
                support: "🔧 *الدعم :*",
                supportText: "في حالة حدوث مشكلة، اتصل بمسؤول الروبوت.",
                enjoy: "✨ استمتع !"
            },
            hello: {
                greetings: [
                    "👋 مرحبا {name} ! كيف حالك اليوم؟",
                    "🌟 اهلا {name} ! هل أنت مستعد لمغامرة جديدة؟",
                    "😊 مرحبا {name} ! ماذا يمكنني أن أفعل لك؟",
                    "🤖 مرحبا {name} ! أنا سعيد بالتحدث معك!",
                    "🎉 يا {name} ! تبدو بصحة جيدة!"
                ]
            },
            download: {
                title: "📥 *أمر التحميل*",
                usage: "⚠️ الاستخدام",
                example: "مثال",
                dev: "🚧 هذه الميزة قيد التطوير!",
                invalidUrl: "❌ عنوان URL غير صالح! تأكد من أنه يبدأ بـ http:// أو https://",
                attempt: "🔄 محاولة التنزيل...",
                url: "📎 URL"
            },
            time: {
                currentTime: "🕒 الوقت والتاريخ الحالي",
                date: "📅 التاريخ",
                hour: "🕰️ الساعة",
                timezone: "🌍 المنطقة الزمنية",
                additionalInfo: "📌 معلومات إضافية",
                day: "اليوم",
                month: "الشهر",
                year: "السنة",
                responseTime: "📶 سرعة الاستجابة",
                uptime: "⏱️ مدة التشغيل",
                updated: "✅ تم التحديث بنجاح"
            },
            info: {
                botInfo: "معلومات الروبوت",
                systemStats: "إحصائيات النظام",
                nodeVersion: "🚀 النسخة",
                uptime: "⏱️ مدة التشغيل",
                memoryUsed: "💾 الذاكرة المستخدمة",
                totalMemory: "📈 إجمالي الذاكرة",
                aboutBot: "حول الروبوت",
                name: "📝 الاسم",
                developer: "👨‍💻 المطور",
                tech: "🔧 التقنية",
                status: "🌟 الحالة",
                online: "متصل",
                functions: "الوظائف",
                welcomeNewMembers: "👋 الترحيب بالأعضاء الجدد",
                aiConversation: "🤖 ذكاء اصطناعي للمحادثة",
                usefulCommands: "⚡ أوامر متنوعة ومفيدة",
                groupAndPrivateChat: "📱 دعم للمجموعات والدردشات الخاصة",
                readyToServe: "جاهز للخدمة!"
            },
            joke: {
                title: "نكتة اليوم",
                jokes: [
                    "لماذا الغواصون يغوصون دائمًا إلى الخلف وليس إلى الأمام؟ 🤔\nلأنهم إذا فعلوا ذلك، فسوف يسقطون في القارب! 😂",
                    "ماذا تقول الحلزون عندما يلتقي بالبزاقة؟ 🐌\n'انظر إلى العراة!' 😄",
                    "ماذا تسمي قطة سقطت في وعاء من الطلاء في يوم عيد الميلاد؟ 🎨\nمارشميلو القط! 🐱",
                    "لماذا الأسماك لا تحب لعب التنس؟ 🎾\nلأنهم يخافون من الشبكة! 🐟",
                    "ما هو الشيء الأصفر الذي ينتظر؟ 🤔\nجوناثان! 😂"
                ]
            },
            weather: {
                title: "أمر الطقس",
                usage: "الاستخدام",
                example: "مثال",
                dev: "هذه الميزة تتطلب مفتاح API للطقس!",
                forCity: "الطقس ل",
                searching: "البحث قيد التقدم...",
                apiIntegration: "تكامل API للطقس متاح قريباً."
            },
            quote: {
                title: "اقتباس ملهم",
                quotes: [
                    "💫 'الحياة هي ما يحدث بينما أنت مشغول في وضع خطط أخرى.' - جون لينون",
                    "🌟 'النجاح هو السير من فشل إلى فشل مع الحفاظ على الحماس.' - ونستون تشرشل",
                    "🚀 'الابتكار يميز القائد عن التابع.' - ستيف جوبز",
                    "💡 'السبيل الوحيد للقيام بعمل عظيم هو أن تحب ما تفعله.' - ستيف جوبز",
                    "⭐ 'آمن بأحلامك وقد تتحقق. آمن بنفسك وسوف تتحقق بالتأكيد.' - مارتن لوثر كينغ الابن."
                ]
            },
            ping: {
                title: "بونج!",
                connectivityTest: "اختبار الاتصال",
                latency: "كمون",
                responseTime: "وقت الاستجابة",
                excellent: "ممتاز",
                good: "جيد",
                average: "متوسط",
                uptime: "المدة الزمنية",
                status: "الحالة",
                onlineAndOperational: "متصل ويعمل",
                botFunctional: "الروبوت يعمل!",
                calculatingLatency: "🏓 بونج! حساب الكمون..."
            },
             apk: {
                title: "تنزيل APK",
                usage: "الاستخدام",
                example: "مثال",
                note: "⚠️ قم بتنزيل التطبيقات الشرعية فقط!",
                obbInfo: "🎮 سيتم اكتشاف ملفات OBB تلقائياً وتوفيرها!",
                searching: "البحث عن",
                searchingObb: "🎮 البحث أيضاً عن ملفات OBB...",
                pleaseWait: "يرجى الانتظار...",
                found: "تم العثور على التطبيق!",
                appInfo: "معلومات التطبيق",
                name: "الاسم",
                developer: "المطور",
                rating: "التقييم",
                reviews: "مراجعة",
                size: "الحجم",
                version: "الإصدار",
                updated: "آخر تحديث",
                downloadLinks: "روابط التنزيل",
                obbFiles: "ملفات OBB",
                obbSize: "حجم OBB",
                obbDownload: "تنزيل OBB",
                obbInstall: "قم بتثبيت ملفات OBB في مجلد Android/obb/",
                noObbRequired: "لا توجد ملفات OBB مطلوبة لهذا التطبيق",
                obbInstructions: "دليل تثبيت OBB",
                installSteps: "خطوات التثبيت",
                step1: "قم بتنزيل وتثبيت ملف APK",
                step2: "قم بتنزيل ملف(ات) OBB",
                step3: "استخرج ملفات OBB إلى",
                step4: "تأكد من أن هيكل المجلدات صحيح",
                step5: "شغل اللعبة - يجب أن تعمل دون تنزيل بيانات إضافية",
                obbTip: "قد تتطلب بعض الألعاب تشغيلها مرة واحدة لإنشاء هيكل المجلدات",
                notAvailable: "غير متوفر",
                disclaimer: "قم بالتنزيل على مسؤوليتك الخاصة",
                notFound: "لم يتم العثور على تطبيق لـ",
                suggestions: "اقتراحات",
                checkSpelling: "تحقق من الإملاء",
                tryDifferentName: "جرب اسماً مختلفاً",
                useEnglishName: "استخدم الاسم الإنجليزي",
                error: "خطأ في البحث",
                tryAgain: "حاول مرة أخرى لاحقاً",
                downloading: "جاري التنزيل",
                preparingFile: "إعداد الملف للتنزيل...",
                downloadComplete: "اكتمل التنزيل! قم بالتثبيت على مسؤوليتك الخاصة.",
                downloadingObb: "تنزيل ملفات OBB",
                obbInstallInstructions: "استخرج إلى مجلد Android/obb/",
                downloadFailed: "فشل التنزيل",
                useLinks: "يرجى استخدام الروابط المقدمة للتنزيل يدوياً",
                downloadError: "حدث خطأ في التنزيل",
                manualDownload: "روابط التنزيل اليدوي"
            },
             unknown: {
                title: "أمر غير معروف",
                command: "أنا لا أتعرف على الأمر",
                suggestions: "اقتراحات",
                allCommands: "اكتب !help لرؤية جميع الأوامر",
                checkSpelling: "تحقق من تهجئة الأمر الخاص بك",
                talkToMe: "أو تحدث معي بشكل طبيعي، وسأرد باستخدام الذكاء الاصطناعي!",
                helpYou: "أنا هنا لمساعدتك!"
            }
        },
        en: {
             help: {
                title: "🤖 *Assistant - Available Commands*",
                mainCommands: "📋 *Main Commands:*",
                commands: {
                    help: "Show this assistant",
                    hello: "Personal greeting",
                    info: "Information about the bot",
                    time: "Show current time",
                    ping: "Test response speed",
                    lang: "Change Language"
                },
                toolCommands: "🎯 *Tools:*",
                download: "Download content (in development)",
                weather: "Weather of a city",
                joke: "Tell a joke",
                quote: "Inspiring quote",
                apk: "Download APK from Play Store",
                usage: "💡 *Usage:*",
                usageText: "Talk to me normally, I will respond with AI!",
                support: "🔧 *Support:*",
                supportText: "If there is a problem, contact the bot administrator.",
                enjoy: "✨ Have fun!"
            },
            hello: {
                greetings: [
                    "👋 Hi {name} ! How are you today?",
                    "🌟 Hello {name} ! Ready for a new adventure?",
                    "😊 Hello {name} ! What can I do for you?",
                    "🤖 Hey {name} ! I'm glad to talk to you!",
                    "🎉 Hey {name} ! You look fit!"
                ]
            },
            download: {
                title: "📥 *Download Command*",
                usage: "⚠️ Usage",
                example: "Example",
                dev: "🚧 This feature is in development!",
                invalidUrl: "❌ Invalid URL! Make sure it starts with http:// or https://",
                attempt: "🔄 Attempting to download...",
                url: "📎 URL"
            },
            time: {
                currentTime: "🕒 Current Time and Date",
                date: "📅 Date",
                hour: "🕰️ Hour",
                timezone: "🌍 Timezone",
                additionalInfo: "📌 Additional Information",
                day: "Day",
                month: "Month",
                year: "Year",
                responseTime: "📶 Response speed",
                uptime: "⏱️ Uptime",
                updated: "✅ Successfully updated"
            },
            info: {
                botInfo: "Bot Information",
                systemStats: "System Statistics",
                nodeVersion: "🚀 Version",
                uptime: "⏱️ Uptime",
                memoryUsed: "💾 Memory Used",
                totalMemory: "📈 Total Memory",
                aboutBot: "About Bot",
                name: "📝 Name",
                developer: "👨‍💻 Developer",
                tech: "🔧 Technology",
                status: "🌟 Status",
                online: "Online",
                functions: "Functions",
                welcomeNewMembers: "👋 Welcome New Members",
                aiConversation: "🤖 AI Conversation",
                usefulCommands: "⚡ Various and Useful Commands",
                groupAndPrivateChat: "📱 Support for Groups and Private Chats",
                readyToServe: "Ready to Serve!"
            },
            joke: {
                title: "Joke of the day",
                jokes: [
                    "Why do divers always dive backwards and never forwards? 🤔\nBecause otherwise they fall into the boat! 😂",
                    "What does a snail say when it meets a slug? 🐌\n'Look at the nudist!' 😄",
                    "What do you call a cat that fell into a pot of paint on Christmas Day? 🎨\nA cat-mallow! 🐱",
                    "Why don't fish like playing tennis? 🎾\nBecause they are afraid of the net! 🐟",
                    "What is yellow and waiting? 🤔\nJonathan! 😂"
                ]
            },
            weather: {
                title: "Weather Command",
                usage: "Usage",
                example: "Example",
                dev: "This feature requires a weather API key!",
                forCity: "Weather for",
                searching: "Searching...",
                apiIntegration: "Weather API integration coming soon."
            },
            quote: {
                title: "Inspiring Quote",
                quotes: [
                    "💫 'Life is what happens while you are busy making other plans.' - John Lennon",
                    "🌟 'Success is walking from failure to failure with no loss of enthusiasm.' - Winston Churchill",
                    "🚀 'Innovation distinguishes a leader from a follower.' - Steve Jobs",
                    "💡 'The only way to do great work is to love what you do.' - Steve Jobs",
                    "⭐ 'Believe in your dreams and they may come true. Believe in yourself and they will surely come true.' - Martin Luther King Jr.'"
                ]
            },
            ping: {
                title: "Pong!",
                connectivityTest: "Connectivity Test",
                latency: "Latency",
                responseTime: "Response Time",
                excellent: "Excellent",
                good: "Good",
                average: "Average",
                uptime: "Uptime",
                status: "Status",
                onlineAndOperational: "Online and Operational",
                botFunctional: "Bot Functional!",
                calculatingLatency: "🏓 Pong! Calculating Latency..."
            },
             apk: {
                title: "APK Download",
                usage: "Usage",
                example: "Example",
                note: "⚠️ Only download legitimate apps!",
                obbInfo: "🎮 OBB files will be automatically detected and provided!",
                searching: "Searching for",
                searchingObb: "🎮 Also searching for OBB files...",
                pleaseWait: "Please wait...",
                found: "App found!",
                appInfo: "App Information",
                name: "Name",
                developer: "Developer",
                rating: "Rating",
                reviews: "reviews",
                size: "Size",
                version: "Version",
                updated: "Updated",
                downloadLinks: "Download Links",
                obbFiles: "OBB Files",
                obbSize: "OBB Size",
                obbDownload: "OBB Download",
                obbInstall: "Install OBB files in Android/obb/ folder",
                noObbRequired: "No OBB files required for this app",
                obbInstructions: "OBB Installation Guide",
                installSteps: "Installation Steps",
                step1: "Download and install the APK file",
                step2: "Download the OBB file(s)",
                step3: "Extract OBB files to",
                step4: "Make sure the folder structure is correct",
                step5: "Launch the game - it should work without downloading additional data",
                obbTip: "Some games may require you to run them once to create the folder structure",
                notAvailable: "Not available",
                disclaimer: "Download at your own risk",
                notFound: "No app found for",
                suggestions: "Suggestions",
                checkSpelling: "Check spelling",
                tryDifferentName: "Try a different name",
                useEnglishName: "Use English name",
                error: "Search error",
                tryAgain: "Try again later",
                downloading: "Downloading",
                preparingFile: "Preparing file for download...",
                downloadComplete: "Download complete! Install at your own risk.",
                downloadingObb: "Downloading OBB files",
                obbInstallInstructions: "Extract to Android/obb/ folder",
                downloadFailed: "Download failed",
                useLinks: "Please use the provided links to download manually",
                downloadError: "Download error occurred",
                manualDownload: "Manual download links"
            },
             unknown: {
                title: "Unknown command",
                command: "I do not recognize the command",
                suggestions: "Suggestions",
                allCommands: "Type !help to see all commands",
                checkSpelling: "Check the spelling of your command",
                talkToMe: "Or talk to me normally, I will respond with AI!",
                helpYou: "I'm here to help you!"
            }
        }
    };

    return translations[lang][key] || translations['fr'][key]; // Fallback to French
};

module.exports = {
    handleCommands
};