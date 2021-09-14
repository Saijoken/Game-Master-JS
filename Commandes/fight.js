//CUBIX si une goutte de sueur ne tombe pas de ton front avant de commencer cette commande c'est que tu n'es pas encore prêt à ce qui va arriver.

//Oublie pas de lire la commande infos fight qui explique un peu le fonctionnement.

//D'ailleurs il faut faire le système d'Objet et de Level et d'Experience + Création de toutes les attaques et de leurs caractéristiques si tu l'as pas fait commence par les faire avant fight si c'est pas fait.

//Comme l'a dit un grand sage : It's dangerous to go alone take this ! (et beh là je peux que te donner mon espoir que tu puisses y arriver et ce petit bout de 100 lignes de code assez basique)

//Attention cette commande peut largement dépasser les 5000 lignes de code vu la difficulté du bail. (c'est pas une blague)

module.exports = {
    name: 'fight',
    execute(message) {
        const fighter1 = message.author
        const fighter2 = message.mentions.members.first()

        const filter = (interaction) => {
            if (interaction.user.id === fighter1.id) return true
        }

        const filter1 = (interaction) => {
            if (interaction.user.id === fighter2.id) return true
        }
        const row = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("1")
            .setLabel("Amicale")
            .setEmoji("✔️") // emoji coup de poing
            .setStyle("SECONDARY"),
            new MessageButton()
            .setCustomId("2") //niveau couleur pour les secondary bleu ca doit etre pas mal
            .setLabel("Death Match")
            .setEmoji("✖️") //emoji crane ou tete de mort (enfin bref t'as capté)
            .setStyle("SECONDARY"),
            new MessageButton()
            .setCustomId("3")
            .setLabel("Role Play")
            .setEmoji("✔️") //emoji bulle de discussion                 ---- Si y a pas les emojis ou que ca passe pas on les modifie avec paint etc
            .setStyle("SECONDARY")
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

        //y aura ptet 30 milliard de row ici MDR

        message.channel.send({
            content: `**${fighter1} QUEL SERA LE TYPE DE COMBAT ?\n\nMatch Amical :\nAucun des personnages ne mourra le combat se termine lorsqu'il restera moins de 5% des PV à l'un d'entre eux.\n\nDeath Match :\nUn combat à mort qui se termine à la mort de l'un des personnages (Vérifier la raison RP auprès du STAFF auparavant) \n\nRole Play :\nPour les inconditonnels du RP une option vous permettant d'imaginez votre combat en restant Fair Play et logique.**`,
            components: [row]
        })
        const collector = message.channel.createMessageComponentCollector({
            filter,
            max: 1
        })
        collector.on("end", async (ButtonInteraction) => {
            ButtonInteraction.first().deferUpdate()
            const id = ButtonInteraction.first().customId
            if (id === "1") {
                message.channel.send({
                    content: `**${fighter2}, ${fighter1} vous propose un match amical.\nAcceptez vous de relever son défi ?**`,
                    components: [row1]
                })
                const collector1 = message.channel.createMessageComponentCollector({
                    filter1,
                    max: 1
                })
                collector1.on("end", async (ButtonInteraction) => {
                    ButtonInteraction.first().deferUpdate()
                    const id = ButtonInteraction.first().customId
                    if (id === "Yes") {
                        //DES MILLIERS DE LIGNES DE CODES PTN J'EN PLEURE DÉJA
                    }

                    if (id === "No") {
                        message.channel.send("Annulation du combat")
                    }
                })
            }

            if (id === "2") {
                //Warning le RPK est autorisé avec accord de l'adversaire et/ou raison RP qui autorise le tueur à le faire 
                //(faites des morts stylés c'est toujours mieux pour le RP)

                //Vérification du niveau de fighter2 si fighter2 a 7 niveau (ou plus) de différence avec fighter1 si non refus du combat possible.
                //(exemple: fighter2 niveau 5 et fighter1 niveau 18 combat OBLIGATOIRE) 
                message.channel.send({
                    content: `**${fighter2}, ${fighter1} vous provoque dans un combat à mort.\nAcceptez vous de relever son défi ?**`,
                    components: [row1]
                }) //On remplacera par le prénom RP
                const collector2 = message.channel.createMessageComponentCollector({
                    filter1,
                    max: 1
                })
                collector2.on("end", async (ButtonInteraction) => {
                    ButtonInteraction.first().deferUpdate()
                    const id = ButtonInteraction.first().customId
                    if (id === "Yes") {
                        //DES MILLIERS DE LIGNES DE CODES PTN J'EN PLEURE DÉJA
                    }

                    if (id === "No") {
                        message.channel.send(`${fighter2} a refusé de relever votre défi `)
                    }
                })
                //La mort du personnage entraîne un reset des données du fighter mort WARNING les statistiques ne sont pas réinitialisés elles seront égales aux stats de base du niveau du fighter divisé par 2 
                //(exemple: fighter2 meurt au niveau 15 on divise par 2 "gentiment"=(arrondi a l'entier supérieur) lorsqu'il refera sa fiche son niveau sera le 8 et il aura les statistiques de base d'un joueur de niveau 8 (toutes les autres variables sont nulles (meme le Nen)))
            }
            if (id === "3") {
                message.channel.send({
                    content: `**Un combat opposant ${fighter1} à ${fighter2} est sur le point de commencer.\nQue les deux combattants s'avancent sur la zone de combat.\n**`,
                    components: [row1]
                })
                const collector3 = message.channel.createMessageComponentCollector({
                    filter1,
                    max: 1
                })
                collector3.on("end", async (ButtonInteraction) => {
                    ButtonInteraction.first().deferUpdate()
                    const id = ButtonInteraction.first().customId
                    if (id === "Yes") {
                        //ICI TU PEUX ETRE HEUREUX PARCE QUE LES COMBATTANTS ONT DÉCIDÉ DE FAIRE UN COMBAT QU'ILS IMAGINERONT PAR EUX MÊME 
                    }

                    if (id === "No") {
                        message.channel.send(`${fighter2} a refusé de relever votre défi `)
                    }
                })
            }
        })
    }
}