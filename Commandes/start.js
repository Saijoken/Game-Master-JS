const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'start',
    async execute(message) {
        const user2 = message.author
        const filter = (interaction) => {
            if (interaction.user.id === message.author.id) return true
        }
        const row1 = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("oui")
                .setLabel("Oui")
                .setStyle("SUCCESS"),
            new MessageButton()
                .setCustomId("non")
                .setLabel("Non")
                .setStyle("DANGER")
        )
        const row2 = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("start")
                .setEmoji("📩")
                .setStyle("SECONDARY")
        )
        const row3 = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("close")
                .setEmoji("🔒")
                .setLabel("Fermer")
                .setStyle("SECONDARY")
        )
        
        staff = message.guild.roles.cache.get('720923304520581170')

        message.channel.send({content: "**Bonjour et bienvenue dans le monde périlleux de Hunter X Hunter !\nJ'ai entendu dire que tu voulais devenir un grand aventurier, ou bien que tu voulais être un guerrier exceptionnel... Ou tout simplement explorer le monde avec tes amis ?\nMince j'ai la mémoire trop courte...\nEn tout cas, j'espère que tu accompliras ton objectif ! Es-tu prêt à commencer ta longue quête mais Attention !, elle sera longue, dangereuse, et sûrement mortel.\nEs-tu bien sûr de vouloir la commencer ?**", components: [row1]}).then(function (message2) {
            const collector = message.channel.createMessageComponentCollector({filter, max: 1})
            collector.on("end", async (ButtonInteraction) => {
                ButtonInteraction.first().deferUpdate().then(function (interractionnocrash) {
                    const id = ButtonInteraction.first().customId
                    if (id === "oui") { 
                        message.channel.send({content: "**Super, coche la réaction ci-dessous pour que tu puisses créer ton personnage !\nBonne Chance Jeune Héros !!! Et n'hésite pas à demander des indications aux staff si tu as besoin d'aide :thumbsup:**", components: [row2]}).then(function (message2) {
                            const collector = message.channel.createMessageComponentCollector({filter, max: 1})
                            collector.on("end", async (ButtonInteraction) => {
                                ButtonInteraction.first().deferUpdate().then(async function (interractionnocrash) {
                                    const id = ButtonInteraction.first().customId
                                    if (id === "start") { 
                                        const channelname = `fiche ${user2.username}`
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
                                                },
                                                {
                                                    id: `${staff.id}`, //720923304520581170
                                                    allow: ['VIEW_CHANNEL']
                                                }]
                                            })
                                        channel.send({content: `**Ah tu es là ${user2}, il ne te reste plus qu'à taper la commande !!fiche pour créer ton personnage.\nMet la réaction ou en cas de problème demande a un admin si tu souhaites fermer le ticket.**`, components: [row3]}).then(function (message2) {
                                            const collector = message2.channel.createMessageComponentCollector({filter, max: 1})
                                            collector.on("end", async (ButtonInteraction) => {
                                                ButtonInteraction.first().deferUpdate().then(function (interractionnocrash) {
                                                    const id = ButtonInteraction.first().customId
                                                    if (id === "close") { 
                                                        message2.channel.send("Suppression du ticket en cours <a:izukuhype:721399731326287954>").then(function (message3) {
                                                            return message2.channel.delete()
                                                        })
                                                    }
                                                })
                                            })
                                        })
                                    }
                                })
                            })
                        })
                    }
                    if (id === "non") { 
                        ButtonInteraction.first().deferUpdate().then(function (interractionnocrash) {
                            message.channel.send("**C'est dommage, n'hésite pas à revenir le jour où tu te sentiras enfin prêt !**")
                        })
                    }
                })
            })
        })
        return

    }
}