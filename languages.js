
const languages = {
    ar: {
        // Commands
        help: {
            title: "🤖 *المساعد - الأوامر المتوفرة*",
            mainCommands: "📋 *الأوامر الرئيسية*",
            toolCommands: "🎯 *أوامر الأدوات*",
            usage: "💡 *الاستخدام*",
            support: "🔧 *الدعم*",
            enjoy: "✨ استمتع!",
            commands: {
                help: "عرض هذا المساعد",
                hello: "التحية الشخصية", 
                info: "معلومات حول البوت",
                time: "عرض الوقت الحالي",
                ping: "اختبار سرعة الاستجابة",
                lang: "تغيير اللغة (ar/fr/en)",
                download: "تنزيل المحتوى (قيد التطوير)",
                weather: "حالة الطقس",
                joke: "نكتة مضحكة",
                quote: "اقتباس ملهم",
                ai: "اسأل الذكاء الاصطناعي"
            },
            usageText: "يمكنك التحدث معي بشكل طبيعي، سأرد بالذكاء الاصطناعي!",
            supportText: "في حالة حدوث مشكلة، اتصل بمسؤول البوت."
        },
        greetings: [
            "مرحباً {name}! 👋 كيف حالك اليوم؟",
            "أهلاً {name}! 🌟 مستعد لمغامرة جديدة؟", 
            "السلام عليكم {name}! 😊 كيف يمكنني مساعدتك؟",
            "مرحبا {name}! 🤖 سعيد بالتحدث معك!",
            "أهلاً وسهلاً {name}! 🎉 تبدو في حالة جيدة!"
        ],
        time: {
            title: "🕒 الوقت والتاريخ الحالي",
            date: "📅 التاريخ:",
            time: "🕰️ الوقت:",
            timezone: "🌍 المنطقة الزمنية:",
            additional: "📌 معلومات إضافية:",
            day: "اليوم:",
            month: "الشهر:",
            year: "السنة:",
            response: "📶 سرعة الاستجابة:",
            uptime: "⏱️ مدة التشغيل:",
            updated: "✅ تم التحديث بنجاح"
        },
        info: {
            title: "🤖 معلومات البوت",
            systemStats: "📊 إحصائيات النظام",
            aboutBot: "🤖 حول البوت",
            functions: "🎯 الوظائف",
            version: "🚀 النسخة:",
            uptime: "⏱️ مدة التشغيل:",
            memory: "💾 الذاكرة المستخدمة:",
            totalMemory: "📈 إجمالي الذاكرة:",
            name: "📝 الاسم:",
            developer: "👨‍💻 المطور:",
            technology: "🔧 التقنية:",
            status: "🌟 الحالة: متصل ونشط",
            features: [
                "👋 ترحيب تلقائي بالأعضاء الجدد",
                "🤖 ذكاء اصطناعي للمحادثة", 
                "⚡ أوامر متنوعة ومفيدة",
                "📱 دعم المجموعات والدردشات الخاصة",
                "🌍 دعم متعدد اللغات"
            ],
            ready: "✅ جاهز للخدمة!"
        },
        ping: {
            calculating: "🏓 بونغ! حساب زمن الاستجابة...",
            title: "🏓 **بونغ!**",
            connectivity: "📡 اختبار الاتصال",
            latency: "⚡ زمن الاستجابة:",
            responseTime: "⏱️ تقييم الاستجابة:",
            uptime: "🔄 مدة التشغيل:",
            status: "🤖 الحالة: ✅ متصل وعامل",
            functional: "🚀 البوت يعمل بشكل طبيعي!"
        },
        language: {
            changed: "✅ تم تغيير اللغة إلى العربية! 🇸🇦",
            current: "🌍 **إعدادات اللغة**\n\n📍 اللغة الحالية: العربية\n\n🔄 **تغيير اللغة:**\n• !lang ar - العربية\n• !lang fr - الفرنسية\n• !lang en - الإنجليزية"
        },
        quote: {
            quotes: [
                "💫 'النجاح هو الانتقال من فشل إلى فشل دون فقدان الحماس.' - ونستون تشرشل",
                "🌟 'الطريقة الوحيدة للقيام بعمل عظيم هي أن تحب ما تفعله.' - ستيف جوبز",
                "🚀 'المستقبل ملك لأولئك الذين يؤمنون بجمال أحلامهم.' - إليانور روزفلت",
                "💡 'لا تخف من التقدم ببطء، خف فقط من الوقوف.' - مثل صيني",
                "⭐ 'كن التغيير الذي تريد أن تراه في العالم.' - مهاتما غاندي"
            ]
        },
        joke: {
            jokes: [
                "لماذا الغواصون يغوصون دائماً إلى الخلف؟ 🤔\nلأنهم إذا غاصوا إلى الأمام سيسقطون في القارب! 😂",
                "ماذا يقول الحلزون عندما يلتقي بالبزاقة؟ 🐌\n'انظر إلى العريان!' 😄",
                "لماذا الأسماك لا تحب لعب التنس؟ 🎾\nلأنها تخاف من الشبكة! 🐟",
                "ما هو الشيء الأصفر الذي ينتظر؟ 🤔\nجوناثان! 😂",
                "لماذا لا يستطيع الدراج لعب البوكر؟ 🐔\nلأنه يكشف أوراقه دائماً! 🃏"
            ]
        },
        aiResponses: {
            greetings: [
                "مرحباً {name}! 👋 كيف حالك؟",
                "أهلاً {name}! 😊 كيف يمكنني مساعدتك؟",
                "السلام عليكم {name}! 🌟 يوم جميل أليس كذلك؟",
                "مرحبا {name}! 🤖 أنا هنا لمساعدتك!"
            ],
            thanks: [
                "عفواً {name}! 😊 من دواعي سروري المساعدة!",
                "لا شكر على واجب! 🤖 لا تتردد في السؤال!",
                "لا عليك {name}! 👍 أنا هنا لهذا!"
            ],
            goodbye: [
                "إلى اللقاء {name}! 👋 أتمنى لك يوماً رائعاً!",
                "مع السلامة {name}! 😊 عد متى شئت!",
                "وداعاً {name}! 🤖 إلى اللقاء!"
            ],
            howAreYou: "أحوالي ممتازة {name}! 🤖 وأنت، كيف حالك؟ 😊",
            whoAreYou: "أنا {botName}! 🤖 مساعد ذكي طوره {developer}. يمكنني مساعدتك في مهام مختلفة والإجابة على أسئلتك. اكتب !help لرؤية أوامري! 🚀",
            creator: "منشئي هو {developer}! 👨‍💻 طورني لأكون مساعد واتساب ذكي ومفيد. 🚀",
            currentTime: "الوقت الآن {time}! ⏰",
            currentDate: "اليوم هو {date}! 📅",
            defaults: [
                "هذا مثير للاهتمام {name}! 🤔 يمكنك إخباري بالمزيد؟",
                "أفهم {name}! 🤖 كيف يمكنني مساعدتك في هذا؟",
                "سؤال جيد {name}! 💭 دعني أفكر... يمكنك تجربة !help لرؤية أوامري!",
                "{name}، هذا موضوع رائع! 🌟 تريد مساعدة محددة؟"
            ]
        },
        errors: {
            technical: "🤖 عذراً، أواجه بعض المشاكل التقنية حالياً. حاول مرة أخرى بعد قليل! 😅",
            command: "⚠️ حدث خطأ أثناء تنفيذ الأمر. حاول مرة أخرى لاحقاً!",
            unknown: "❓ *أمر غير معروف*\n\n🤔 لا أتعرف على الأمر: {command}\n\n💡 *اقتراحات:*\n• اكتب !help لرؤية جميع الأوامر\n• تحقق من إملاء الأمر\n• أو تحدث معي بشكل طبيعي، سأرد بالذكاء الاصطناعي!\n\n🤖 أنا هنا لمساعدتك!"
        }
    },
    fr: {
        // Commands  
        help: {
            title: "🤖 *Assistant - Commandes disponibles*",
            mainCommands: "📋 *Commandes principales*",
            toolCommands: "🎯 *Outils*", 
            usage: "💡 *Utilisation*",
            support: "🔧 *Support*",
            enjoy: "✨ Amusez-vous bien!",
            commands: {
                help: "afficher cette aide",
                hello: "salutation personnalisée",
                info: "informations sur le bot", 
                time: "afficher l'heure actuelle",
                ping: "tester la vitesse de réponse",
                lang: "changer de langue (ar/fr/en)",
                download: "télécharger du contenu (en développement)",
                weather: "météo d'une ville",
                joke: "raconter une blague",
                quote: "citation inspirante",
                ai: "poser une question à l'IA"
            },
            usageText: "Vous pouvez me parler naturellement, je répondrai avec l'IA!",
            supportText: "En cas de problème, contactez l'administrateur du bot."
        },
        greetings: [
            "Salut {name}! 👋 Comment allez-vous aujourd'hui?",
            "Bonjour {name}! 🌟 Prêt pour une nouvelle aventure?",
            "Hello {name}! 😊 Que puis-je faire pour vous?", 
            "Hey {name}! 🤖 Je suis ravi de vous parler!",
            "Coucou {name}! 🎉 Vous avez l'air en forme!"
        ],
        time: {
            title: "🕒 Heure et date actuelles",
            date: "📅 Date:",
            time: "🕰️ Heure:",
            timezone: "🌍 Fuseau horaire:",
            additional: "📌 Informations supplémentaires:",
            day: "Jour:",
            month: "Mois:", 
            year: "Année:",
            response: "📶 Vitesse de réponse:",
            uptime: "⏱️ Temps de fonctionnement:",
            updated: "✅ Mis à jour avec succès"
        },
        info: {
            title: "🤖 Informations du bot",
            systemStats: "📊 Statistiques système",
            aboutBot: "🤖 À propos du bot",
            functions: "🎯 Fonctionnalités",
            version: "🚀 Version:",
            uptime: "⏱️ Temps de fonctionnement:",
            memory: "💾 Mémoire utilisée:",
            totalMemory: "📈 Mémoire totale:",
            name: "📝 Nom:",
            developer: "👨‍💻 Développeur:",
            technology: "🔧 Technologie:",
            status: "🌟 Statut: Connecté et actif",
            features: [
                "👋 Accueil automatique des nouveaux membres",
                "🤖 Intelligence artificielle pour la conversation",
                "⚡ Commandes variées et utiles", 
                "📱 Support groupes et chats privés",
                "🌍 Support multilingue"
            ],
            ready: "✅ Prêt à servir!"
        },
        ping: {
            calculating: "🏓 Pong! Calcul de la latence...",
            title: "🏓 **Pong!**",
            connectivity: "📡 Test de connectivité",
            latency: "⚡ Latence:",
            responseTime: "⏱️ Temps de réponse:",
            uptime: "🔄 Temps de fonctionnement:",
            status: "🤖 Statut: ✅ En ligne et opérationnel",
            functional: "🚀 Bot fonctionnel!"
        },
        language: {
            changed: "✅ Langue changée en français! 🇫🇷",
            current: "🌍 **Paramètres de langue**\n\n📍 Langue actuelle: Français\n\n🔄 **Changer de langue:**\n• !lang ar - العربية\n• !lang fr - Français\n• !lang en - English"
        },
        quote: {
            quotes: [
                "💫 'Le succès c'est d'aller d'échec en échec sans perdre son enthousiasme.' - Winston Churchill",
                "🌟 'La seule façon de faire du bon travail est d'aimer ce que vous faites.' - Steve Jobs",
                "🚀 'L'avenir appartient à ceux qui croient en la beauté de leurs rêves.' - Eleanor Roosevelt",
                "💡 'N'ayez pas peur d'avancer lentement, ayez peur seulement de vous arrêter.' - Proverbe chinois",
                "⭐ 'Soyez le changement que vous voulez voir dans le monde.' - Mahatma Gandhi"
            ]
        },
        joke: {
            jokes: [
                "Pourquoi les plongeurs plongent-ils toujours en arrière? 🤔\nParce que sinon, ils tombent dans le bateau! 😂",
                "Que dit un escargot quand il croise une limace? 🐌\n'Regarde le nudiste!' 😄",
                "Pourquoi les poissons n'aiment pas jouer au tennis? 🎾\nParce qu'ils ont peur du filet! 🐟",
                "Qu'est-ce qui est jaune et qui attend? 🤔\nJonathan! 😂",
                "Pourquoi les poules ne peuvent pas jouer au poker? 🐔\nParce qu'elles montrent toujours leurs cartes! 🃏"
            ]
        },
        aiResponses: {
            greetings: [
                "Salut {name}! 👋 Comment ça va?",
                "Hello {name}! 😊 Que puis-je faire pour toi?",
                "Bonjour {name}! 🌟 Belle journée n'est-ce pas?",
                "Hey {name}! 🤖 Je suis là pour t'aider!"
            ],
            thanks: [
                "De rien {name}! 😊 C'est un plaisir d'aider!",
                "Avec plaisir! 🤖 N'hésite pas si tu as d'autres questions!",
                "Pas de souci {name}! 👍 Je suis là pour ça!"
            ],
            goodbye: [
                "À bientôt {name}! 👋 Passe une excellente journée!",
                "Au revoir {name}! 😊 Reviens quand tu veux!",
                "Bye {name}! 🤖 À la prochaine!"
            ],
            howAreYou: "Je vais très bien {name}! 🤖 Et toi, comment ça se passe? 😊",
            whoAreYou: "Je suis {botName}! 🤖 Un assistant intelligent développé par {developer}. Je peux t'aider avec diverses tâches et répondre à tes questions. Tape !help pour voir mes commandes! 🚀",
            creator: "Mon créateur est {developer}! 👨‍💻 Il m'a développé pour être un assistant WhatsApp intelligent et utile. 🚀",
            currentTime: "Il est actuellement {time}! ⏰",
            currentDate: "Nous sommes le {date}! 📅",
            defaults: [
                "Hmm, c'est intéressant {name}! 🤔 Peux-tu m'en dire plus?",
                "Je comprends {name}! 🤖 Comment puis-je t'aider avec ça?",
                "Bonne question {name}! 💭 Laisse-moi réfléchir... Tu pourrais essayer !help pour voir mes commandes!",
                "{name}, c'est un sujet fascinant! 🌟 Tu veux que je t'aide avec quelque chose de spécifique?"
            ]
        },
        errors: {
            technical: "🤖 Désolé, je rencontre quelques difficultés techniques en ce moment. Réessayez dans quelques instants! 😅",
            command: "⚠️ Une erreur s'est produite lors de l'exécution de la commande. Réessayez plus tard!",
            unknown: "❓ *Commande inconnue*\n\n🤔 Je ne reconnais pas la commande: {command}\n\n💡 *Suggestions:*\n• Tapez !help pour voir toutes les commandes\n• Vérifiez l'orthographe de votre commande\n• Ou parlez-moi normalement, je répondrai avec l'IA!\n\n🤖 Je suis là pour vous aider!"
        }
    },
    en: {
        // Commands
        help: {
            title: "🤖 *Assistant - Available Commands*",
            mainCommands: "📋 *Main Commands*",
            toolCommands: "🎯 *Tools*",
            usage: "💡 *Usage*", 
            support: "🔧 *Support*",
            enjoy: "✨ Have fun!",
            commands: {
                help: "show this help",
                hello: "personal greeting",
                info: "bot information",
                time: "show current time", 
                ping: "test response speed",
                lang: "change language (ar/fr/en)",
                download: "download content (in development)",
                weather: "city weather",
                joke: "tell a joke",
                quote: "inspirational quote",
                ai: "ask AI a question"
            },
            usageText: "You can talk to me naturally, I'll respond with AI!",
            supportText: "If you have any issues, contact the bot administrator."
        },
        greetings: [
            "Hi {name}! 👋 How are you today?",
            "Hello {name}! 🌟 Ready for a new adventure?",
            "Hey {name}! 😊 What can I do for you?",
            "Hi there {name}! 🤖 I'm happy to talk with you!",
            "Hello {name}! 🎉 You look great!"
        ],
        time: {
            title: "🕒 Current Time and Date", 
            date: "📅 Date:",
            time: "🕰️ Time:",
            timezone: "🌍 Timezone:",
            additional: "📌 Additional info:",
            day: "Day:",
            month: "Month:",
            year: "Year:",
            response: "📶 Response speed:",
            uptime: "⏱️ Uptime:",
            updated: "✅ Successfully updated"
        },
        info: {
            title: "🤖 Bot Information",
            systemStats: "📊 System Statistics",
            aboutBot: "🤖 About the Bot", 
            functions: "🎯 Functions",
            version: "🚀 Version:",
            uptime: "⏱️ Uptime:",
            memory: "💾 Memory used:",
            totalMemory: "📈 Total memory:",
            name: "📝 Name:",
            developer: "👨‍💻 Developer:",
            technology: "🔧 Technology:",
            status: "🌟 Status: Connected and active",
            features: [
                "👋 Automatic welcome for new members",
                "🤖 AI for conversation",
                "⚡ Various useful commands",
                "📱 Support for groups and private chats", 
                "🌍 Multilingual support"
            ],
            ready: "✅ Ready to serve!"
        },
        ping: {
            calculating: "🏓 Pong! Calculating latency...",
            title: "🏓 **Pong!**",
            connectivity: "📡 Connectivity Test",
            latency: "⚡ Latency:",
            responseTime: "⏱️ Response time:",
            uptime: "🔄 Uptime:",
            status: "🤖 Status: ✅ Online and operational",
            functional: "🚀 Bot functional!"
        },
        language: {
            changed: "✅ Language changed to English! 🇺🇸",
            current: "🌍 **Language Settings**\n\n📍 Current language: English\n\n🔄 **Change language:**\n• !lang ar - العربية\n• !lang fr - Français\n• !lang en - English"
        },
        quote: {
            quotes: [
                "💫 'Success is walking from failure to failure with no loss of enthusiasm.' - Winston Churchill",
                "🌟 'The only way to do great work is to love what you do.' - Steve Jobs",
                "🚀 'The future belongs to those who believe in the beauty of their dreams.' - Eleanor Roosevelt",
                "💡 'Don't be afraid to give up the good to go for the great.' - John D. Rockefeller",
                "⭐ 'Be the change you wish to see in the world.' - Mahatma Gandhi"
            ]
        },
        joke: {
            jokes: [
                "Why do divers always dive backwards? 🤔\nBecause otherwise they fall into the boat! 😂",
                "What does a snail say when it meets a slug? 🐌\n'Look at the nudist!' 😄",
                "Why don't fish like playing tennis? 🎾\nBecause they are afraid of the net! 🐟",
                "What is yellow and waiting? 🤔\nJonathan! 😂",
                "Why can't chickens play poker? 🐔\nBecause they always show their cards! 🃏"
            ]
        },
        aiResponses: {
            greetings: [
                "Hi {name}! 👋 How are you?",
                "Hello {name}! 😊 How can I help you?",
                "Hey {name}! 🌟 Beautiful day isn't it?",
                "Hi {name}! 🤖 I'm here to help!"
            ],
            thanks: [
                "You're welcome {name}! 😊 Happy to help!",
                "My pleasure! 🤖 Don't hesitate to ask more questions!",
                "No problem {name}! 👍 That's what I'm here for!"
            ],
            goodbye: [
                "See you later {name}! 👋 Have an excellent day!",
                "Goodbye {name}! 😊 Come back anytime!",
                "Bye {name}! 🤖 Until next time!"
            ],
            howAreYou: "I'm doing great {name}! 🤖 How about you? 😊",
            whoAreYou: "I'm {botName}! 🤖 An intelligent assistant developed by {developer}. I can help you with various tasks and answer your questions. Type !help to see my commands! 🚀",
            creator: "My creator is {developer}! 👨‍💻 He developed me to be an intelligent and helpful WhatsApp assistant. 🚀",
            currentTime: "It's currently {time}! ⏰",
            currentDate: "Today is {date}! 📅",
            defaults: [
                "Hmm, that's interesting {name}! 🤔 Can you tell me more?",
                "I understand {name}! 🤖 How can I help you with that?",
                "Good question {name}! 💭 Let me think... You could try !help to see my commands!",
                "{name}, that's a fascinating topic! 🌟 Do you want me to help with something specific?"
            ]
        },
        errors: {
            technical: "🤖 Sorry, I'm experiencing some technical difficulties right now. Try again in a few moments! 😅",
            command: "⚠️ An error occurred while executing the command. Try again later!",
            unknown: "❓ *Unknown command*\n\n🤔 I don't recognize the command: {command}\n\n💡 *Suggestions:*\n• Type !help to see all commands\n• Check the spelling of your command\n• Or talk to me normally, I'll respond with AI!\n\n🤖 I'm here to help you!"
        }
    }
};

// User language preferences storage (in production, use a database)
const userLanguages = new Map();

const setUserLanguage = (userId, language) => {
    if (languages[language]) {
        userLanguages.set(userId, language);
        return true;
    }
    return false;
};

const getUserLanguage = (userId) => {
    return userLanguages.get(userId) || 'ar'; // Default to Arabic
};

const getText = (userId, path, replacements = {}) => {
    const lang = getUserLanguage(userId);
    const keys = path.split('.');
    let text = languages[lang];

    for (const key of keys) {
        text = text[key];
        if (!text) {
            // Fallback to Arabic if path not found
            text = languages.ar;
            for (const fallbackKey of keys) {
                text = text[fallbackKey];
                if (!text) return path; // Return path if not found anywhere
            }
            break;
        }
    }

    // Replace placeholders
    if (typeof text === 'string') {
        for (const [key, value] of Object.entries(replacements)) {
            text = text.replace(new RegExp(`{${key}}`, 'g'), value);
        }
    }

    return text;
};

const getRandomText = (userId, path, replacements = {}) => {
    const texts = getText(userId, path, replacements);
    if (Array.isArray(texts)) {
        return texts[Math.floor(Math.random() * texts.length)];
    }
    return texts;
};

module.exports = {
    setUserLanguage,
    getUserLanguage,
    getText,
    getRandomText,
    languages
};
