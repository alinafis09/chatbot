// Rate limiting pour éviter les erreurs
const messageQueue = [];
let isProcessingQueue = false;

const { getText, getRandomText, getUserLanguage } = require('./languages');
const config = require('./config');

// Function to notify developer about new members
const notifyDeveloper = async (sock, groupId, participants) => {
    try {
        const groupMetadata = await sock.groupMetadata(groupId);
        const groupName = groupMetadata.subject;

        const participantList = participants.map(p => `• ${p.split('@')[0]}`).join('\n');

        const developerMessage = `🔔 **Nouvelle activité dans le groupe**

📱 **Groupe:** ${groupName}
👥 **ID Groupe:** ${groupId}

👋 **Nouveaux membres (${participants.length}):**
${participantList}

⏰ **Heure:** ${new Date().toLocaleString('fr-FR')}

---
💡 Message automatique du bot ${config.bot.name}`;

        await sock.sendMessage(config.bot.developerNumber, { text: developerMessage });
        console.log(`📧 Notification envoyée au développeur pour ${participants.length} nouveaux membres`);

    } catch (error) {
        console.error('❌ Erreur lors de la notification du développeur:', error);
    }
};

const processMessageQueue = async (sock) => {
    if (isProcessingQueue || messageQueue.length === 0) return;

    isProcessingQueue = true;

    while (messageQueue.length > 0) {
        const { groupId, message, mentions } = messageQueue.shift();

        try {
            await sock.sendMessage(groupId, { 
                text: message,
                mentions: mentions || []
            });

            // Délai de 3 secondes entre chaque message pour éviter le rate limit
            await new Promise(resolve => setTimeout(resolve, 3000));

        } catch (error) {
            console.error('❌ Erreur lors de l\'envoi du message:', error);

            if (error.data === 429) {
                console.log('⏳ Rate limit atteint, attente de 10 secondes...');
                await new Promise(resolve => setTimeout(resolve, 10000));
                // Remettre le message en queue
                messageQueue.unshift({ groupId, message, mentions });
            }
        }
    }

    isProcessingQueue = false;
};

const handleWelcome = async (sock, groupId, participants) => {
    try {
        console.log(`👋 Nouveaux membres dans le groupe ${groupId}:`, participants);

        // Si trop de participants d'un coup, envoyer un message groupé
        if (participants.length > 3) {
            const welcomeMessage = `🎉 Bienvenue dans le groupe ! 👋

Salut les nouveaux membres ! 

Je suis SmartAI Bot, votre assistant intelligent développé par Ali Nafis. Je peux vous aider avec diverses tâches :

🤖 **Commandes disponibles :**
• !help - Affiche l'aide complète
• !hello - Salutation personnalisée
• !info - Informations sur le bot
• Vous pouvez aussi me parler normalement, je répondrai avec l'IA !

N'hésitez pas à me poser des questions ! 😊`;

            messageQueue.push({
                groupId,
                message: welcomeMessage,
                mentions: participants
            });
        } else {
            // Message individuel pour moins de participants
            for (const participant of participants) {
                const welcomeMessage = `🎉 Bienvenue dans le groupe ! 👋

Salut @${participant.split('@')[0]} ! 

Je suis SmartAI Bot, votre assistant intelligent développé par Ali Nafis. Je peux t'aider avec diverses tâches :

🤖 **Commandes disponibles :**
• !help - Affiche l'aide complète
• !hello - Salutation personnalisée
• !info - Informations sur le bot
• Tu peux aussi me parler normalement, je répondrai avec l'IA !

N'hésite pas à me poser des questions ! 😊`;

                messageQueue.push({
                    groupId,
                    message: welcomeMessage,
                    mentions: [participant]
                });
            }
        }

        // Démarrer le traitement de la queue
        processMessageQueue(sock);

        // Notify developer about new members
        notifyDeveloper(sock, groupId, participants);

    } catch (error) {
        console.error('❌ Erreur lors de la gestion du message de bienvenue:', error);
    }
};

// Message de bienvenue pour les nouveaux groupes où le bot est ajouté
const sendIntroMessage = async (sock, groupId) => {
    try {
        const introMessage = `🤖 **Bot WhatsApp Intelligent activé !** 

Salut tout le monde ! Je suis votre nouveau assistant intelligent. 

**Ce que je peux faire :**
• Accueillir automatiquement les nouveaux membres
• Répondre à vos questions avec l'IA
• Exécuter des commandes utiles
• Et bien plus encore !

Tapez !help pour voir toutes mes commandes disponibles. 🚀`;

        await sock.sendMessage(groupId, { text: introMessage });
    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi du message d\'introduction:', error);
    }
};

module.exports = {
    handleWelcome,
    sendIntroMessage
};