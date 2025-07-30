
// Configuration centralisée pour le bot WhatsApp
const config = {
    // OpenAI Configuration
    openai: {
        apiKey: process.env.OPENAI_API_KEY || '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', // Mettez votre clé API ici
        model: 'gpt-3.5-turbo',
        maxTokens: 150,
        temperature: 0.7,
        enabled: true // Mettez true quand vous avez une clé API valide
    },

    // Bot Configuration
    bot: {
        name: 'ALIA Bot',
        developer: 'Ali Nafis',
        version: '1.0.0',
        developerNumber: '212719558797@s.whatsapp.net', // Developer's WhatsApp number
        privateGroup: '120363268080357851@g.us' // Bot's private group ID
    },

    // Payment Configuration
    payment: {
        enabled: true,
        methods: {
            paypal: 'your-paypal-email@example.com',
            bankTransfer: {
                accountName: 'Ali Nafis',
                accountNumber: '1234567890',
                bankName: 'Your Bank Name'
            },
            cryptoWallet: {
                bitcoin: 'your-bitcoin-address',
                ethereum: 'your-ethereum-address'
            }
        },
        prices: {
            premium: {
                monthly: 10,
                yearly: 100
            },
            custom: 25
        }
    },

    // Response Configuration
    responses: {
        greetings: ['salut', 'hello', 'bonjour', 'bonsoir', 'hey'],
        thanks: ['merci', 'thanks', 'thank you'],
        goodbye: ['au revoir', 'bye', 'goodbye', 'à bientôt']
    },

    // Group settings
    group: {
        respondToAll: false, // Si true, répond à tous les messages dans les groupes
        keywords: ['bot', 'aide', 'help', 'question', 'bonjour', 'salut', 'hello']
    }
};

module.exports = config;
