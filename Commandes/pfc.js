const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'pfc', // aliases janken, jkp, jankenpon, pierrefeuilleciseaux, shifoumi, chifoumi, sfm
    execute(message) { 

            user1 = message.author;
            user2 = message.mentions.members.first();
            
            const filter1 = (interaction) => {
                if (interaction.user.id === user2.id) return true
            }
    
            const row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId("pierre")
                    .setEmoji("🪨")
                    .setStyle("SECONDARY"),
                new MessageButton()
                    .setCustomId("papier")
                    .setEmoji("🍃")
                    .setStyle("SECONDARY"),
                new MessageButton()
                    .setCustomId("ciseau")
                    .setEmoji("✂️")
                    .setStyle("SECONDARY"),
            )

            const row1 = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId("Yes")
                    .setLabel("Oui")
                    .setEmoji("✔️")
                    .setStyle("SUCCESS"),
                new MessageButton()
                    .setCustomId("No")
                    .setLabel("Non")
                    .setEmoji("✖️")
                    .setStyle("DANGER")
            )

            if (message.mentions.users.size === 1){
                message.channel.send({content: `**${user2}, Prêt pour une partie de pierre feuille ciseau face à ${user1}**`, components: [row1]}).then(function (message3) {
                    const collector = message.channel.createMessageComponentCollector({filter1, max: 1})
                    collector.on("end", async (ButtonInteraction) => {
                        ButtonInteraction.first().deferUpdate()
                        const id = ButtonInteraction.first().customId
                        if (id === "Yes") {
                            const user2message = user2.send("En attente de la réponse de l'autre joueur, <a:izukuhype:721399731326287954>")

                            const embed1 = new MessageEmbed()
                                    .setTitle("A toi de jouer, Choisis l'action à effectuer :\n🪨 🍃 ✂️")
                                    .setColor('#E81224')
                                user1.send({ embeds: [embed1] }).then(async function (nomdembed){
                                    const collector = message.channel.createMessageComponentCollector({filterbutton, max: 1})
                                    collector.on("end", async (ButtonInteraction) => {
                                        ButtonInteraction.first().deferUpdate()
                                        const id = ButtonInteraction.first().customId
                                        if (id === "pierre") {
                                            emoji1 = "pierre"
                                        }
                                        if (id === "papier") {
                                            emoji1 = "papier"
                                        }
                                        if (id === "ciseau") {
                                            emoji1 = "ciseau"
                                        }
                                    })
                                }).catch(err =>{
                                    return message.channel.send("**Pour que je puisse organiser la partie il faut que les deux membres activent leurs message privés**")
                                })

                            const embed2 = new MessageEmbed()
                                    .setTitle("A toi de jouer, Choisis l'action à effectuer :\n🪨 🍃 ✂️") //emoji ciseaux emoji rock emoji feuille (leaves)
                                user2.send({ embeds: [embed2] }).then(async function (nomdembed){
                                    const collector = message.channel.createMessageComponentCollector({filterbutton, max: 1})
                                    collector.on("end", async (ButtonInteraction) => {
                                        ButtonInteraction.first().deferUpdate()
                                        const id = ButtonInteraction.first().customId
                                        if (id === "pierre") {
                                            emoji1 = "pierre"
                                        }
                                        if (id === "papier") {
                                            emoji1 = "papier"
                                        }
                                        if (id === "ciseau") {
                                            emoji2 = "ciseau"
                                        }
                                    })
                                }).catch(err =>{
                                    return message.channel.send("**Pour que je puisse organiser la partie il faut que les deux membres activent leurs messages privés**")
                                })

                            message.channel.send("**Jan**").then(janken => { //si possible on met un temps de pause entre chaque edit si on a la technique
                                janken.edit("**Jan Ken**")
                                janken.edit("**Jan Ken Pon !!!**")
                            })

                            const embed3 = new MessageEmbed()
                                    .setTitle(`${user1.username} ${emoji1} **VS**  ${emoji2} ${user2.username}`) //On remplacera par le prénom RP

                            if (emoji1 == emoji2){
                                const embedEgalite = new MessageEmbed()
                                        .setTitle(`Egalité !!!`)
                                    message.channel.send(embedEgalite)

                            } else if ((emoji1 == '🪨' && emoji2 == '✂️') || (emoji1 == '✂️' && emoji2 == '🍃') || (emoji1 == '🍃' && emoji2 == '🪨')) {
                                const embedVictory1 = new MessageEmbed()
                                        .setTitle(`Victoire de ${user1} 🎉 !!!`) 
                                    message.channel.send(embedVictory1)

                            } else if ((emoji2 == '🪨' && emoji1 == '✂️') || (emoji2 == '✂️' && emoji1 == '🍃') || (emoji2 == '🍃' && emoji1 == '🪨')) {
                                const embedVictory2 = new MessageEmbed()
                                        .setTitle(`Victoire de ${user2} 🎉 !!!`)
                                    message.channel.send(embedVictory2)
                            }

                        }
                        if (id === "No") {
                            return message.channel.send(`${user1}, ${user2} Annulation de la partie de Pierre Feuille Ciseaux.`)
                        }
                    })
                })
            } else {
                message.channel.send(`**Merci de mentionnez quelqu'un contre qui tu veux jouer.**`)
            }
    }
}