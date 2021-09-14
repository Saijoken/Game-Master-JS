const db = require('quick.db')
const distributeur = new db.table("Distributeur")
const Discord = require('discord.js')
const money = new db.table("Money")
const bank = new db.table("Bank")
const {MessageEmbed} = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'distributeur', //aliases distrib
    execute(message) {
        let montant = ""
        let user = message.author;
        let argent = money.fetch(`money_${message.guild.id}_${user.id}`)
        let banque = bank.fetch(`bank_${message.guild.id}_${user.id}`)
        if (argent === null) argent = 0
        if (banque === null) banque = 0
        if (bank.get(`bank_${message.guild.id}_${user.id}`) === null) {
            bank.add(`bank_${message.guild.id}_${user.id}`, `1`)
            bank.subtract(`bank_${message.guild.id}_${user.id}`, `1`)
        } 
        if (distributeur.get(`distributeur_${message.guild.id}_${user.id}`) === null) {
            distributeur.set(`distributeur_${message.guild.id}_${user.id}`, `No`)
        } 

        const filter = (interaction) => {
            if (interaction.user.id === message.author.id) return true
        }

        const rowstart = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("D")
                .setLabel("Déposer")
                .setEmoji("<:deposer:876937899743010816>")
                .setStyle("SECONDARY"),
            new MessageButton()
                .setCustomId("R")
                .setLabel("Retirer")
                .setEmoji("<:retirer:876937899495542824>")
                .setStyle("SECONDARY")
        )
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("1")
                .setLabel("1")
                .setStyle("SECONDARY"),
            new MessageButton()
                .setCustomId("2")
                .setLabel("2")
                .setStyle("SECONDARY"),
            new MessageButton()
                .setCustomId("3")
                .setLabel("3")
                .setStyle("SECONDARY"),
            new MessageButton()
                .setCustomId("Fermer")
                .setEmoji("<:ButtonOff:876875672444870757>")
                .setStyle("DANGER"),
        )
        const row2 = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("4")
                .setLabel("4")
                .setStyle("SECONDARY"),
            new MessageButton()
                .setCustomId("5")
                .setLabel("5")
                .setStyle("SECONDARY"),
            new MessageButton()
                .setCustomId("6")
                .setLabel("6")
                .setStyle("SECONDARY"),
        )
        const row3 = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("7")
                .setLabel("7")
                .setStyle("SECONDARY"),
            new MessageButton()
                .setCustomId("8")
                .setLabel("8")
                .setStyle("SECONDARY"),
            new MessageButton()
                .setCustomId("9")
                .setLabel("9")
                .setStyle("SECONDARY"),
        )
        const row4 = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("Retour")
                .setEmoji("🔙")
                .setStyle("DANGER"),
            new MessageButton()
                .setCustomId("0")
                .setLabel("0")
                .setStyle("SECONDARY"),
            new MessageButton()
                .setCustomId("Valider")
                .setEmoji("✔️")
                .setStyle("SUCCESS"),
        )
        if (distributeur.get(`distributeur_${message.guild.id}_${user.id}`) === "No") {
            distributeur.set(`distributeur_${message.guild.id}_${user.id}`, `Yes`)
            message.channel.send({content: "**Distributeur de billet automatique de la YorkShin City Bank\nQuel action voulez vous effectuez :\n\n- Déposer de l'argent sur votre compte bancaire.\n\n- Retirer de l'argent depuis votre compte bancaire.**", components: [rowstart]}).then(function (message2) {
                const collector = message.channel.createMessageComponentCollector({filter, max: 1})
                collector.on("end", async (ButtonInteraction) => {
                    ButtonInteraction.first().deferUpdate().then(function (interractionnocrash) {
                        const id = ButtonInteraction.first().customId
                        if (id === "D") { 
                            message2.edit({content: `**Quel quantité de Jenny voulez vous déposer sur votre compte ?\nArgent dans le porte monnaie: ${money.get(`money_${message.guild.id}_${user.id}`)}\nMontant à déposer: 0**`, components: [row, row2, row3, row4]}).then(function (message3) {
                                updateD()
                                async function updateD() {
                                    const collector = message.channel.createMessageComponentCollector({filter, max: 1})
                                    collector.on("end", async (ButtonInteraction) => {
                                        ButtonInteraction.first().deferUpdate().then(function (interractionnocrash) {
                                            const id = ButtonInteraction.first().customId
                                            if (id === "0") {
                                                montant = montant + 0
                                            }
                                            if (id === "1") {
                                                montant = montant + 1
                                            }
                                            if (id === "2") {
                                                montant = montant + 2
                                            }
                                            if (id === "3") {
                                                montant = montant + 3
                                            }
                                            if (id === "4") {
                                                montant = montant + 4
                                            }
                                            if (id === "5") {
                                                montant = montant + 5
                                            }
                                            if (id === "6") {
                                                montant = montant + 6
                                            }
                                            if (id === "7") {
                                                montant = montant + 7
                                            }
                                            if (id === "8") {
                                                montant = montant + 8
                                            }
                                            if (id === "9") {
                                                montant = montant + 9
                                            }
                                            if (id === "Retour") {
                                                montant = montant.substring(0, montant.length - 1)
                                            }
                                            if (id === "Fermer") {
                                                message2.edit({content: `**La YorkShin City Bank vous souhaite une agréable fin de journée.**`, components: []})
                                                distributeur.set(`distributeur_${message.guild.id}_${user.id}`, `No`)
                                                return
                                            }
                                            message3.edit(`**Quel quantité de Jenny voulez vous déposer sur votre compte ?\n\nArgent dans le porte monnaie: ${money.get(`money_${message.guild.id}_${user.id}`)}\nMontant à déposer: ${montant}**`)
                                            if (id === "Valider") {
                                                if (montant === "") {
                                                    message3.edit(`**Quel quantité de Jenny voulez vous déposer sur votre compte ?\n\nArgent dans le porte monnaie: ${money.get(`money_${message.guild.id}_${user.id}`)}\nMontant à déposer: ${montant}\n\n⚠️Merci de mettre un montant valide⚠️**`)
                                                } else {
                                                    if (montant <= `${money.get(`money_${message.guild.id}_${user.id}`)}`) {
                                                        money.subtract(`money_${message.guild.id}_${user.id}`, `${montant}`);
                                                        bank.add(`bank_${message.guild.id}_${user.id}`, `${montant}`);
                                                        message2.edit({content: `**Vous avez transféré ${montant} Jenny dans votre compte bancaire.\nLa YorkShin City Bank vous souhaite une agréable fin de journée.**`, components: []})
                                                        distributeur.set(`distributeur_${message.guild.id}_${user.id}`, `No`)
                                                        return
                                                    } else {
                                                        message3.edit(`**Quel quantité de Jenny voulez vous déposer sur votre compte ?\n\nArgent dans le porte monnaie: ${money.get(`money_${message.guild.id}_${user.id}`)}\nMontant à déposer: ${montant}\n\n⚠️Impossible de déposer plus que ce qu'il y a dans votre porte monnaie⚠️**`)
                                                    }
                                                }
                                            }
                                        })
                                    updateD()
                                    })
                                }
                            })
                        }
                        if (id === "R") {
                            message2.edit({content: `**Quel quantité de Jenny voulez vous retirer depuis votre compte ?\n\nArgent dans le compte banquaire: ${bank.get(`bank_${message.guild.id}_${user.id}`)}\nMontant à retirer: 0**`, components: [row, row2, row3, row4]}).then(function (message3) {
                                updateR()
                                async function updateR() {
                                    const collector = message.channel.createMessageComponentCollector({filter, max: 1})
                                    collector.on("end", async (ButtonInteraction) => {
                                        ButtonInteraction.first().deferUpdate().then(function (interractionnocrash) {
                                            const id = ButtonInteraction.first().customId
                                            if (id === "0") {
                                                montant = montant + 0
                                            }
                                            if (id === "1") {
                                                montant = montant + 1
                                            }
                                            if (id === "2") {
                                                montant = montant + 2
                                            }
                                            if (id === "3") {
                                                montant = montant + 3
                                            }
                                            if (id === "4") {
                                                montant = montant + 4
                                            }
                                            if (id === "5") {
                                                montant = montant + 5
                                            }
                                            if (id === "6") {
                                                montant = montant + 6
                                            }
                                            if (id === "7") {
                                                montant = montant + 7
                                            }
                                            if (id === "8") {
                                                montant = montant + 8
                                            }
                                            if (id === "9") {
                                                montant = montant + 9
                                            }
                                            if (id === "Retour") {
                                                montant = montant.substring(0, montant.length - 1)
                                            }
                                            if (id === "Fermer") {
                                                message2.edit({content: `**La YorkShin City Bank vous souhaite une agréable fin de journée.**`, components: []})
                                                distributeur.set(`distributeur_${message.guild.id}_${user.id}`, `No`)
                                                return
                                            }
                                            message3.edit(`**Quel quantité de Jenny voulez vous retirer sur votre compte ?\n\nArgent dans le compte banquaire: ${bank.get(`bank_${message.guild.id}_${user.id}`)}\nMontant à retirer: ${montant}**`)
                                            if (id === "Valider") {
                                                if (montant === "") {
                                                    message3.edit(`**Quel quantité de Jenny voulez vous retirer sur votre compte ?\n\nArgent dans le compte banquaire: ${bank.get(`bank_${message.guild.id}_${user.id}`)}\nMontant à retirer: ${montant}\n\n⚠️Merci de mettre un montant valide⚠️**`)
                                                } else {
                                                    if (montant <= `${bank.get(`bank_${message.guild.id}_${user.id}`)}`) {
                                                        bank.subtract(`bank_${message.guild.id}_${user.id}`, `${montant}`);
                                                        money.add(`money_${message.guild.id}_${user.id}`, `${montant}`);
                                                        message2.edit({content: `**Vous avez transféré ${montant} Jenny dans votre porte monnaie.\nLa YorkShin City Bank vous souhaite une agréable fin de journée.**`, components: []})
                                                        distributeur.set(`distributeur_${message.guild.id}_${user.id}`, `No`)
                                                        return
                                                    } else {
                                                        message3.edit(`**Quel quantité de Jenny voulez vous retirer sur votre compte ?\n\nArgent dans le compte banquaire: ${bank.get(`bank_${message.guild.id}_${user.id}`)}\nMontant à retirer: ${montant}\n\n⚠️Impossible de retirer plus que ce qu'il y a dans votre compte en banque⚠️**`)
                                                    }
                                                }
                                            }
                                        })
                                        updateR()
                                    })
                                }
                            })
                        }
                    })
                })
            })
        } else {
            message.channel.send("Merci de fermer d'abord votre dernier terminale")
        }
    }
}