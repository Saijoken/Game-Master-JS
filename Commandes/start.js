const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'start',
    execute(message) {
        const user2 = message.author
        const filter = (reaction, user) => {
            return ['📩'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        const filter2 = (reaction, user) => {
            return ['🔒'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        message.channel.send(`**Bonjour et bienvenue dans le monde périlleux de Hunter X Hunter !\nJ'ai entendu dire que tu voulais devenir un grand aventurier, ou bien que tu voulais être un guerrier exceptionnel... Ou tout simplement explorer le monde avec tes amis ?\nMince j'ai la mémoire trop courte...\nEn tout cas, j'espère que tu accompliras ton objectif ! Es-tu prêt à commencer ta longue quête mais Attention !, elle sera longue, dangereuse, et sûrement mortel.\nEs-tu bien sûr de vouloir la commencer ? (O/N)**`)
        message.channel.awaitMessages(message => user2.id === message.author.id, {max: 1, time: 120000}).then(collected => {
            if (collected.first().content.toLowerCase() === "o" || collected.first().content.toLowerCase() === "oui") {
                message.channel.send("**Super, coche la réaction ci-dessous pour que tu puisses créer ton personnage !\nBonne Chance Jeune Héros !!! Et n'hésite pas à demander des indications aux staff si tu as besoin d'aide :thumbsup:**").then(function (message) {
                    message.react("📩")
                    message.awaitReactions(filter, {max: 1, time: null}).then(collected2 => {
                        if (collected2.first().emoji.name == '📩') {
                            const channelname = `fiche ${user2.username}`
                            async function asyncCall() {
                                const channel = await message.guild.channels.create(`${channelname}`, {
                                    type: 'text',
                                    parent: `787788883374505985`, //test: 787788883374505985 / off: 801423486978752512
                                    topic: `Fiche de création de personnage de ${user2.username}`,
                                    permissionOverwrites: [{
                                        id: user2.id,
                                        allow: ['VIEW_CHANNEL'],
                                    },
                                    {
                                        id: `${message.guild.id}`,
                                        deny: ['VIEW_CHANNEL'],
                                }]
                                })
                                channel.send(`**Ah tu es là ${user2}, il ne te reste plus qu'à taper la commande !!fiche pour créer ton personnage.\nMet la réaction ou en cas de problème demande a un admin si tu souhaites fermer le ticket.**`).then(function (message2) {
                                    message2.react('🔒')
                                    message2.awaitReactions(filter2, {max: 1, time: null}).then(collected3 => {
                                        if (collected3.first().emoji.name == '🔒') {
                                            message2.channel.send("Suppression du ticket en cours <a:izukuhype:721399731326287954>").then(function (message3) {
                                                return message2.channel.delete()
                                            })
                                        }
                                    })
                                    return
                                })
                            }
                            asyncCall()
                        }
                    }).catch(() => {
                        message.channel.send(`**${user2} Tu mets pas mal de temps ..., reviens une fois que tu te seras décidé **`)
                    })
                })
            } else if (collected.first().content.toLowerCase() === "n" || collected.first().content.toLowerCase() === "non") {
                return message.channel.send("**C'est dommage, n'hésite pas à revenir le jour où tu te sentiras enfin prêt !**")
            } else {
                return message.channel.send("**:x: Réponse incorrect réessaye**")
            }
        }).catch(() => {
            message.channel.send(`**${user2} Tu mets pas mal de temps ..., reviens une fois que tu te seras décidé **`)
        })
    }
}