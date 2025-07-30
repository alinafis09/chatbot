
const axios = require('axios');
const config = require('./config');
const { getText, getRandomText, getUserLanguage } = require('./languages');

const handleAI = async (sock, message, messageText, isGroup) => {
    try {
        const sender = message.key.remoteJid;
        const senderName = message.pushName || 'Utilisateur';
        
        // Ne répond pas à tous les messages dans les groupes, seulement si mentionné ou avec certains mots-clés
        if (isGroup && !shouldRespondInGroup(messageText)) {
            return;
        }

        console.log(`🤖 Traitement IA pour: "${messageText}"`);

        let response;

        // Utiliser OpenAI si activé et clé API disponible
        if (config.openai.enabled && config.openai.apiKey) {
            response = await getOpenAIResponse(messageText, senderName, sender);
            
            // Si OpenAI échoue, utiliser le fallback
            if (!response) {
                console.log('🔄 Basculement vers IA simple...');
                response = await getSimpleAIResponse(messageText, senderName, sender);
            }
        } else {
            response = await getSimpleAIResponse(messageText, senderName, sender);
        }

        if (response) {
            // Ajouter délai pour éviter rate limit
            await new Promise(resolve => setTimeout(resolve, 1000));
            await sock.sendMessage(sender, { text: response });
        }

    } catch (error) {
        console.error('❌ Erreur lors du traitement IA:', error);
        
        try {
            // Message d'erreur friendly
            const errorMessage = getText(message.key.remoteJid, 'errors.technical');
            await sock.sendMessage(message.key.remoteJid, { text: errorMessage });
        } catch (sendError) {
            console.error('❌ Impossible d\'envoyer le message d\'erreur:', sendError);
        }
    }
};

// Fonction pour utiliser OpenAI (si clé API disponible)
const getOpenAIResponse = async (messageText, senderName, sender) => {
    try {
        const userLang = getUserLanguage(sender);
        const langInstruction = userLang === 'ar' ? 'بالعربية' : userLang === 'fr' ? 'en français' : 'in English';
        
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: config.openai.model,
            messages: [
                {
                    role: 'system',
                    content: `Tu es ${config.bot.name}, un assistant WhatsApp utile et amical développé par ${config.bot.developer}. Réponds de manière concise et ${langInstruction}. Sois chaleureux et personnalisé.`
                },
                {
                    role: 'user',
                    content: `${senderName} dit: ${messageText}`
                }
            ],
            max_tokens: config.openai.maxTokens,
            temperature: config.openai.temperature
        }, {
            headers: {
                'Authorization': `Bearer ${config.openai.apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('❌ Erreur OpenAI:', error.response?.data || error.message);
        return null;
    }
};

// Fonction de réponse IA simple (sans API externe)
const getSimpleAIResponse = async (messageText, senderName, sender) => {
    const lowerMessage = messageText.toLowerCase();
    const userLang = getUserLanguage(sender);

    // Réponses aux salutations (multilingue)
    const greetingKeywords = userLang === 'ar' ? 
        ['مرحبا', 'أهلا', 'سلام', 'هاي', 'hello', 'hi'] :
        userLang === 'fr' ?
        ['salut', 'hello', 'bonjour', 'bonsoir', 'hey'] :
        ['hello', 'hi', 'hey', 'good morning', 'good evening'];
    
    if (greetingKeywords.some(greeting => lowerMessage.includes(greeting))) {
        return getRandomText(sender, 'aiResponses.greetings', { name: senderName });
    }

    // Réponses aux remerciements (multilingue)
    const thanksKeywords = userLang === 'ar' ?
        ['شكرا', 'شكراً', 'thanks', 'thank you'] :
        userLang === 'fr' ?
        ['merci', 'thanks', 'thank you'] :
        ['thanks', 'thank you', 'thx'];
    
    if (thanksKeywords.some(thank => lowerMessage.includes(thank))) {
        return getRandomText(sender, 'aiResponses.thanks', { name: senderName });
    }

    // Réponses aux au revoir (multilingue)
    const goodbyeKeywords = userLang === 'ar' ?
        ['وداعا', 'مع السلامة', 'إلى اللقاء', 'bye', 'goodbye'] :
        userLang === 'fr' ?
        ['au revoir', 'bye', 'goodbye', 'à bientôt'] :
        ['bye', 'goodbye', 'see you', 'see ya'];
    
    if (goodbyeKeywords.some(bye => lowerMessage.includes(bye))) {
        return getRandomText(sender, 'aiResponses.goodbye', { name: senderName });
    }

    // Questions sur comment ça va
    const howAreYouKeywords = userLang === 'ar' ?
        ['كيف حالك', 'كيف الحال', 'شلونك'] :
        userLang === 'fr' ?
        ['comment ça va', 'ça va', 'comment allez-vous'] :
        ['how are you', 'how you doing', 'whats up'];
    
    if (howAreYouKeywords.some(phrase => lowerMessage.includes(phrase))) {
        return getText(sender, 'aiResponses.howAreYou', { name: senderName });
    }

    // Questions sur l'identité
    const whoAreYouKeywords = userLang === 'ar' ?
        ['من انت', 'من أنت', 'مين انت', 'who are you'] :
        userLang === 'fr' ?
        ['qui es-tu', 'qui es tu', 'who are you'] :
        ['who are you', 'what are you', 'who r u'];
    
    if (whoAreYouKeywords.some(phrase => lowerMessage.includes(phrase))) {
        return getText(sender, 'aiResponses.whoAreYou', { 
            name: senderName, 
            botName: config.bot.name, 
            developer: config.bot.developer 
        });
    }

    // Questions sur le créateur
    const creatorKeywords = userLang === 'ar' ?
        ['من صنعك', 'من طورك', 'المطور', 'المنشئ'] :
        userLang === 'fr' ?
        ['créateur', 'développeur', 'creator', 'developer'] :
        ['creator', 'developer', 'who made you', 'who created you'];
    
    if (creatorKeywords.some(phrase => lowerMessage.includes(phrase))) {
        return getText(sender, 'aiResponses.creator', { developer: config.bot.developer });
    }

    // Questions sur l'heure  
    const timeKeywords = userLang === 'ar' ?
        ['كم الساعة', 'الوقت', 'قديش الوقت'] :
        userLang === 'fr' ?
        ['quelle heure', 'heure', 'time'] :
        ['what time', 'time', 'current time'];
    
    if (timeKeywords.some(phrase => lowerMessage.includes(phrase))) {
        const now = new Date();
        const locale = userLang === 'ar' ? 'ar-MA' : userLang === 'fr' ? 'fr-FR' : 'en-US';
        return getText(sender, 'aiResponses.currentTime', { 
            time: now.toLocaleTimeString(locale) 
        });
    }

    // Questions sur la date
    const dateKeywords = userLang === 'ar' ?
        ['كم التاريخ', 'التاريخ', 'اليوم'] :
        userLang === 'fr' ?
        ['quelle date', 'date', 'aujourd\'hui'] :
        ['what date', 'date', 'today'];
    
    if (dateKeywords.some(phrase => lowerMessage.includes(phrase))) {
        const now = new Date();
        const locale = userLang === 'ar' ? 'ar-MA' : userLang === 'fr' ? 'fr-FR' : 'en-US';
        return getText(sender, 'aiResponses.currentDate', { 
            date: now.toLocaleDateString(locale) 
        });
    }

    // Réponse par défaut intelligente
    return getRandomText(sender, 'aiResponses.defaults', { name: senderName });
};

// Détermine si le bot doit répondre dans un groupe
const shouldRespondInGroup = (messageText) => {
    const lowerMessage = messageText.toLowerCase();
    
    // Si configuré pour répondre à tous les messages
    if (config.group.respondToAll) {
        return true;
    }
    
    // Répond si le bot est mentionné ou avec certains mots-clés
    return config.group.keywords.some(keyword => lowerMessage.includes(keyword)) || 
           lowerMessage.includes('?'); // Répond aux questions
};

module.exports = {
    handleAI
};
