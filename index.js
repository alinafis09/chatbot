
const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, MessageType, MessageOptions, Mimetype } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
const pino = require('pino');

// Import our modules
const { handleWelcome } = require('./welcome');
const { handleAI } = require('./ai');
const { handleCommands } = require('./commands');

class WhatsAppBot {
    constructor() {
        this.sock = null;
        this.logger = pino({ level: 'silent' });
    }

    async startBot() {
        try {
            console.log('🤖 Démarrage du bot WhatsApp...');
            
            // Utilise l'authentification multi-fichiers
            const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

            // Crée la connexion socket
            this.sock = makeWASocket({
                logger: this.logger,
                printQRInTerminal: true,
                auth: state,
                defaultQueryTimeoutMs: 60000,
            });

            // Gestion des événements de connexion
            this.sock.ev.on('connection.update', (update) => {
                this.handleConnectionUpdate(update);
            });

            // Sauvegarde des credentials
            this.sock.ev.on('creds.update', saveCreds);

            // Gestion des messages
            this.sock.ev.on('messages.upsert', async (m) => {
                await this.handleMessages(m);
            });

            // Gestion des participants du groupe
            this.sock.ev.on('group-participants.update', async (update) => {
                await this.handleGroupUpdate(update);
            });

        } catch (error) {
            console.error('❌ Erreur lors du démarrage du bot:', error);
            setTimeout(() => this.startBot(), 5000);
        }
    }

    handleConnectionUpdate(update) {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('📱 Scannez le QR code avec votre téléphone:');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            
            console.log('🔌 Connexion fermée due à:', lastDisconnect?.error);
            
            if (shouldReconnect) {
                console.log('🔄 Tentative de reconnexion...');
                setTimeout(() => this.startBot(), 3000);
            }
        } else if (connection === 'open') {
            console.log('✅ Bot connecté avec succès!');
            console.log('🎉 Le bot WhatsApp est maintenant en ligne!');
        }
    }

    async handleMessages(m) {
        try {
            const message = m.messages[0];
            
            // Ignore les messages de statut et les messages du bot lui-même
            if (!message.message || message.key.fromMe) return;

            const messageText = this.extractMessageText(message);
            const sender = message.key.remoteJid;
            const isGroup = sender.endsWith('@g.us');

            console.log(`📨 Message reçu: "${messageText}" de ${sender}`);

            // Gestion des commandes
            if (messageText.startsWith('!')) {
                await handleCommands(this.sock, message, messageText);
                return;
            }

            // Gestion de l'IA pour les messages normaux
            if (messageText && messageText.length > 0) {
                await handleAI(this.sock, message, messageText, isGroup);
            }

        } catch (error) {
            console.error('❌ Erreur lors du traitement du message:', error);
        }
    }

    async handleGroupUpdate(update) {
        try {
            const { id, participants, action } = update;
            
            if (action === 'add') {
                await handleWelcome(this.sock, id, participants);
            }
        } catch (error) {
            console.error('❌ Erreur lors de la gestion du groupe:', error);
        }
    }

    extractMessageText(message) {
        return message.message?.conversation || 
               message.message?.extendedTextMessage?.text || 
               message.message?.imageMessage?.caption || 
               message.message?.videoMessage?.caption || '';
    }

    async sendMessage(jid, text) {
        try {
            await this.sock.sendMessage(jid, { text: text });
        } catch (error) {
            console.error('❌ Erreur lors de l\'envoi du message:', error);
        }
    }
}

// Démarrage du bot
const bot = new WhatsAppBot();
bot.startBot();

// Gestion propre de l'arrêt
process.on('SIGINT', () => {
    console.log('🛑 Arrêt du bot...');
    process.exit(0);
});

process.on('unhandledRejection', (err) => {
    console.error('❌ Erreur non gérée:', err);
});

module.exports = { WhatsAppBot };
