const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const db = require('quick.db')
const imgur = require('imgur');
const { resolveTypeReferenceDirective } = require('typescript');

const fichenom = new db.table("Nom")
const ficheprenom = new db.table("Prenom")
const ficheimage = new db.table("Image")
const ficheage = new db.table("Age")
const fichehistoire = new db.table("Histoire")
const fichepersonnalite = new db.table("Personnalite")
const fichenen  = new db.table("Nen")
const fichepouvoir = new db.table("Pouvoir")

module.exports = {
    name: 'fiche',
    execute(message) {
        const user = message.author
        const filter = (message) => {
            if (user.id === message.author.id) return true
        }
        const filterbutton = (interaction) => {
            if (interaction.user.id === message.author.id) return true
        }
        const row1 = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("UserYes")
                .setLabel("Oui")
                .setEmoji("✔️")
                .setStyle("SUCCESS"),
            new MessageButton()
                .setCustomId("UserNo")
                .setLabel("Non")
                .setEmoji("✖️")
                .setStyle("DANGER")
        )
        const row2 = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("StaffYes")
                .setLabel("Oui")
                .setEmoji("✔️")
                .setStyle("SUCCESS"),
            new MessageButton()
                .setCustomId("StaffNo")
                .setLabel("Non")
                .setEmoji("✖️")
                .setStyle("DANGER")
        )
        message.channel.send(`**Bienvenue dans le créateur de fiche ${user} n'est-ce pas excitant !!!\nC'est ici que tu vas pouvoir donner vie à ton personnage mais réflechis bien car les changements seront définitifs sauf si vous effectuez le reset de votre personnage en reprenant l'aventure de ZERO.\nSi tu es prêt ALLONS-Y !!!**`)
        //Prénom
        prenomfail()
        async function prenomfail() {
            message.channel.send("**Pour commencer quel sera le prénom de ton personnage ?**").then(function (message) {
                message.channel.awaitMessages({filter, max: 1}).then(collected => {
                    if (30 <= collected.first().content.length) {
                        message.channel.send("**Le prénom est trop long**")
                        prenomfail()
                        return
                    }
                    ficheprenom.set(`prenom_${message.guild.id}_${user.id}`, collected.first().content)
                    //Nom
                    nomfail()
                    async function nomfail() {
                        message.channel.send("**Quel sera son nom de famille ?**").then(function (message) {
                            message.channel.awaitMessages({filter, max: 1}).then(collected2 => {
                                if (30 <= collected2.first().content.length) {
                                    message.channel.send("**Le nom est trop long**")
                                    nomfail()
                                    return
                                }
                                fichenom.set(`nom_${message.guild.id}_${user.id}`, collected2.first().content)
                                //Image
                                imagefail()
                                async function imagefail() {
                                    message.channel.send("**Pour mieux voir les choses donne moi une image du visage de ton personnage.**").then(function (message) {
                                        message.channel.awaitMessages({filter, max: 1}).then(collected3 => {
                                            if (collected3.first().attachments.size) { 
                                                const imageurl = collected3.first().attachments.first().url
                                                if (imageurl.endsWith(".png") || imageurl.endsWith(".jpeg") || imageurl.endsWith(".jpg") || imageurl.endsWith(".webp")) {
                                                    imgur
                                                        .uploadUrl(imageurl)
                                                        .then((json) => {
                                                            var imgurlink = json.link
                                                            ficheimage.set(`image_${message.guild.id}_${user.id}`, imgurlink)
                                                        }).catch((err) => {
                                                            console.error(err.message);
                                                            message.channel.send("Une erreur est survenu. Merci de réesayer plus tard.")
                                                            imagefail()
                                                            return
                                                        });
                                                    //Age
                                                    agefail()
                                                    async function agefail() {
                                                        message.channel.send("**Donne moi l'âge de ton personnage (au moins supérieur à 10 ans pour rester logique) (Ex: 25)**").then(function (message) {
                                                            message.channel.awaitMessages({filter, max: 1}).then(collected4 => {
                                                                if (collected4.first().content > 9) {
                                                                    ficheage.set(`age_${message.guild.id}_${user.id}`, collected4.first().content)
                                                                    //Histoire
                                                                    histoirefail()
                                                                    async function histoirefail() {
                                                                        message.channel.send("**Histoire ? (max 2000 caractères)**").then(function (message) {
                                                                            message.channel.awaitMessages({filter, max: 1}).then(collected5 => {
                                                                                if (collected5.first().content.length <= 2000) {
                                                                                    fichehistoire.set(`histoire_${message.guild.id}_${user.id}`, collected5.first().content)
                                                                                    //Personnalité et facon d'être
                                                                                    persofail()
                                                                                    async function persofail() {
                                                                                        message.channel.send("**Personnalité et façon d'être ? (max 2000 caractères)**").then(function (message) {
                                                                                            message.channel.awaitMessages({filter, max: 1}).then(collected6 => {
                                                                                                if (collected6.first().content.length <= 2000) {
                                                                                                    fichepersonnalite.set(`personnalite_${message.guild.id}_${user.id}`, collected6.first().content)
                                                                                                    //Définition du Nen
                                                                                                    if (fichenen.get(`nen_${message.guild.id}_${user.id}`) === null) {
                                                                                                        const pouvoirnumber = Math.floor(Math.random() * 6) + 1
                                                                                                        message.channel.send("**Ton Nen ne t'es pas encore acquis si tu veux l'obtenir tu devras passer des épreuves ne soit pas impatient.**").then(function (messagesleep){
                                                                                                            messagesleep.edit("**La nature de ton Nen sera ...**")
                                                                                                            if (pouvoirnumber === 1) {
                                                                                                                messagesleep.edit("**Renforcement \nLe Renforcement est la possibilité d'utiliser l'aura pour augmenter les capacités naturelles d'un objet ou de son propre corps. Par conséquent, les utilisateurs du Renforcement sont en mesure d'augmenter considérablement leurs attaques physiques et leur défense et sont les mieux adaptés pour les combat au corps-à-corps.**")
                                                                                                                const pouvoirnen = "Renforcement"
                                                                                                                fichenen.set(`nen_${message.guild.id}_${user.id}`, pouvoirnen)
                                                                                                            } else if (pouvoirnumber === 2) {
                                                                                                                messagesleep.edit(`**Matérialisation \nLa Matérialisation est la possibilité de créer un objet matériel indépendant physiquement de l'aura. Une fois qu'une personne a maîtrisé la matérialisation d'un certain objet, il peut l'invoquer et le dissiper en un instant, quand il le veut. La matérialisation est la seule manière dont le Nen peut créer des choses que les gens ordinaires (ignorant le Nen) peuvent voir et toucher. En outre, des objets ou des entités créées par cette technique ont une "indépendance" subtil à eux. Cela signifie qu'ils peuvent continuer à exister même si ils sont à une distance considérable de l'utilisateur, ou même si l'utilisateur n'est pas conscient qu'ils ne sont pas dématérialisés.**`)
                                                                                                                const pouvoirnen = "Matérialisation"
                                                                                                                fichenen.set(`nen_${message.guild.id}_${user.id}`, pouvoirnen)
                                                                                                            } else if (pouvoirnumber === 3) {
                                                                                                                messagesleep.edit("**Transformation \nCeux ayant une affinité pour la Transformation sont les personnes pouvant changer les propriétés de leur aura pour imiter quelque chose d'autre. Semblables à l'émission, les choses créées par la Transformation sont de l'aura pure. La transformation est souvent confondue avec la Matérialisation en raison de leurs similitudes. Une façon simple de penser serait que la transformation permet à votre aura d'imiter les propriétés d'une substance, alors que la Matérialisation vous permet de changer votre aura en substance réelle. Les utilisateurs de la Transformation peuvent copier les propriétés des choses réelles.**")
                                                                                                                const pouvoirnen = "Transformation"
                                                                                                                fichenen.set(`nen_${message.guild.id}_${user.id}`, pouvoirnen)
                                                                                                            } else if (pouvoirnumber === 4) {
                                                                                                                messagesleep.edit("**Émission \nUne affinité pour l'Émission signifie qu'un utilisateur est capable de commander le déploiement de son aura alors la séparant de son corps. L'aura diminue généralement en intensité très rapidement quand il est séparé du corps de la source, mais les utilisateurs de l'Émission puissants peuvent séparer leur aura de leur corps pour de longues périodes et toujours être en mesure de la maintenir.**")
                                                                                                                const pouvoirnen = "Émission"
                                                                                                                fichenen.set(`nen_${message.guild.id}_${user.id}`, pouvoirnen)
                                                                                                            } else if (pouvoirnumber === 5) {
                                                                                                                messagesleep.edit("**Manipulation \nLes Capacités appartenant à ceux de la Manipulation permettent à l'utilisateur de contrôler les choses inertes ou vivantes d'une certaine manière, le principal avantage étant capable de « manipuler » les ennemis. Le degré de contrôle est principalement déterminé par une condition qui met généralement l'utilisateur à risque (attacher des objets sur l'ennemi, de toucher l'ennemi d'une certaine manière) et bien sûr plus le risque est grand, plus le degré de contrôle est puissant. Généralement l’utilisateur de la manipulation utilisera des appareils de contrôle si sa contrainte consiste a la pose d’un objet et pour ceux qui utilise le contact physique ils utiliseront plus leur voix afin de diriger leurs victimes.**")
                                                                                                                const pouvoirnen = "Manipulation"
                                                                                                                fichenen.set(`nen_${message.guild.id}_${user.id}`, pouvoirnen)
                                                                                                            } else if (pouvoirnumber === 6) {
                                                                                                                messagesleep.edit("**Spécialisation \nIl est possible que l'effet qui se produit lors de la divination de l'eau puisse donner une idée de la façon dont les utilisateurs de la Spécialisation utilisent leur pouvoir. La spécialisation est tout ce qui n'appartient pas aux cinq autres catégories. Il s'agit de la catégorie d'Hatsu la plus vague. Les utilisateurs de la Spécialisation possèdent très souvent un GRAND POUVOIR en eux à toi d'en faire bon usage...**")
                                                                                                                const pouvoirnen = "Spécialisation"
                                                                                                                fichenen.set(`nen_${message.guild.id}_${user.id}`, pouvoirnen)
                                                                                                            }
                                                                                                        })
                                                                                                    } else {
                                                                                                        message.channel.send("**Ton Nen a déjà été défini passons à la suite.**")
                                                                                                    }
                                                                                                    //Pouvoir
                                                                                                    pouvoirfail()
                                                                                                    async function pouvoirfail() {
                                                                                                        message.channel.send("**Pouvoir ? (max 500 caractères)**").then(function (message) {
                                                                                                            message.channel.awaitMessages({filter, max: 1}).then(collected7 => {
                                                                                                                if (collected7.first().content.length <= 500) {
                                                                                                                    fichepouvoir.set(`pouvoir_${message.guild.id}_${user.id}`, collected7.first().content)
                          
                                                                                                                    if (1020 <= collected5.first().content.length) {
                                                                                                                        var histoire2000 = "Yes"
                                                                                                                    } else {
                                                                                                                        var histoire2000 = "No"
                                                                                                                    }

                                                                                                                    if (1020 <= collected6.first().content.length) {
                                                                                                                        var personnalite2000 = "Yes"
                                                                                                                    } else {
                                                                                                                        var personnalite2000 = "No"
                                                                                                                    }  

                                                                                                                    if (histoire2000 === "Yes" && personnalite2000 === "Yes") {
                                                                                                                        const histoirecut = fichehistoire.get(`histoire_${message.guild.id}_${user.id}`)
                                                                                                                        const histoireprt2length = histoirecut.length - 1020
                                                                                                                        const histoireprt1 = histoirecut.slice(0, 1020)
                                                                                                                        const histoireprt2 = histoirecut.slice(-histoireprt2length)

                                                                                                                        const personnalitecut = fichepersonnalite.get(`personnalite_${message.guild.id}_${user.id}`)
                                                                                                                        const personnaliteprt2length = personnalitecut.length - 1020
                                                                                                                        const personnaliteprt1 = personnalitecut.slice(0, 1020)
                                                                                                                        const personnaliteprt2 = personnalitecut.slice(-personnaliteprt2length)
                                                                                                                        
                                                                                                                        const embed = new MessageEmbed()
                                                                                                                            .setTitle(`Fiche de ${user.username}`)
                                                                                                                            .setColor('#E81224')
                                                                                                                            .setThumbnail(`${ficheimage.get(`image_${message.guild.id}_${user.id}`)}`)
                                                                                                                            .addField("Prénom Nom", `${ficheprenom.get(`prenom_${message.guild.id}_${user.id}`)} ${fichenom.get(`nom_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                            .addField("Âge", `${ficheage.get(`age_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                            .addField("Histoire", `${histoireprt1}`, false)
                                                                                                                            .addField("** **", `${histoireprt2}`, false)
                                                                                                                            .addField("Personnalité", `${personnaliteprt1}`, false)
                                                                                                                            .addField("** **", `${personnaliteprt2}`, false)
                                                                                                                            .addField("Nen", `${fichenen.get(`nen_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                            .addField("Pouvoir", `${fichepouvoir.get(`pouvoir_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                        message.channel.send({embeds: [embed]})
                                                                                                                    } else if (histoire2000 === "Yes" && personnalite2000 === "No") {
                                                                                                                        const histoirecut = fichehistoire.get(`histoire_${message.guild.id}_${user.id}`)
                                                                                                                        const prt2length = histoirecut.length - 1020
                                                                                                                        const prt1 = histoirecut.slice(0, 1020)
                                                                                                                        const prt2 = histoirecut.slice(-prt2length)

                                                                                                                        const embed = new MessageEmbed()
                                                                                                                            .setTitle(`Fiche de ${user.username}`)
                                                                                                                            .setColor('#E81224')
                                                                                                                            .setThumbnail(`${ficheimage.get(`image_${message.guild.id}_${user.id}`)}`)
                                                                                                                            .addField("Prénom Nom", `${ficheprenom.get(`prenom_${message.guild.id}_${user.id}`)} ${fichenom.get(`nom_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                            .addField("Âge", `${ficheage.get(`age_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                            .addField("Histoire", `${prt1}`, false)
                                                                                                                            .addField("** **", `${prt2}`, false)
                                                                                                                            .addField("Personnalité", `${fichepersonnalite.get(`personnalite_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                            .addField("Nen", `${fichenen.get(`nen_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                            .addField("Pouvoir", `${fichepouvoir.get(`pouvoir_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                        message.channel.send({embeds: [embed]})
                                                                                                                    } else if (histoire2000 === "No" && personnalite2000 === "Yes") {
                                                                                                                        const personnalitecut = fichepersonnalite.get(`personnalite_${message.guild.id}_${user.id}`)
                                                                                                                        const prt2length = personnalitecut.length - 1020
                                                                                                                        const prt1 = personnalitecut.slice(0, 1020)
                                                                                                                        const prt2 = personnalitecut.slice(-prt2length)
                                                                                                                        
                                                                                                                        const embed = new MessageEmbed()
                                                                                                                            .setTitle(`Fiche de ${user.username}`)
                                                                                                                            .setColor('#E81224')
                                                                                                                            .setThumbnail(`${ficheimage.get(`image_${message.guild.id}_${user.id}`)}`)
                                                                                                                            .addField("Prénom Nom", `${ficheprenom.get(`prenom_${message.guild.id}_${user.id}`)} ${fichenom.get(`nom_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                            .addField("Âge", `${ficheage.get(`age_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                            .addField("Histoire", `${fichehistoire.get(`histoire_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                            .addField("Personnalité", `${prt1}`, false)
                                                                                                                            .addField("** **", `${prt2}`, false)
                                                                                                                            .addField("Nen", `${fichenen.get(`nen_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                            .addField("Pouvoir", `${fichepouvoir.get(`pouvoir_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                        message.channel.send({embeds: [embed]})
                                                                                                                    } else {
                                                                                                                        const embed = new MessageEmbed()
                                                                                                                            .setTitle(`Fiche de ${user.username}`)
                                                                                                                            .setColor('#E81224')
                                                                                                                            .setThumbnail(`${ficheimage.get(`image_${message.guild.id}_${user.id}`)}`)
                                                                                                                            .addField("Prénom Nom", `${ficheprenom.get(`prenom_${message.guild.id}_${user.id}`)} ${fichenom.get(`nom_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                            .addField("Âge", `${ficheage.get(`age_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                            .addField("Histoire", `${fichehistoire.get(`histoire_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                            .addField("Personnalité", `${fichepersonnalite.get(`personnalite_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                            .addField("Nen", `${fichenen.get(`nen_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                            .addField("Pouvoir", `${fichepouvoir.get(`pouvoir_${message.guild.id}_${user.id}`)}`, false)
                                                                                                                        message.channel.send({embeds: [embed]})
                                                                                                                    }
                                                                                                                    message.channel.send({content: "Est-ce que ta fiche te convient ?", components: [row1]}).then(function (message2) {
                                                                                                                        const collector = message.channel.createMessageComponentCollector({filterbutton, max: 1})
                                                                                                                            collector.on("end", async (ButtonInteraction) => {
                                                                                                                                ButtonInteraction.first().deferUpdate().then(function (interractionnocrash) {
                                                                                                                                    const id = ButtonInteraction.first().customId
                                                                                                                                    if (id === "UserNo") {
                                                                                                                                        return message.channel.send("Tu peux recommencer ta fiche")
                                                                                                                                    }
                                                                                                                                    if (id === "UserYes") {
                                                                                                                                        message.channel.send({content: "@STAFF Est-ce que la fiche est validé ?", components: [row2]}).then(function (message2) {
                                                                                                                                            const collector = message.channel.createMessageComponentCollector({filterbutton, max: 1})
                                                                                                                                            collector.on("end", async (ButtonInteraction) => {
                                                                                                                                                ButtonInteraction.first().deferUpdate().then(function (interractionnocrash) {
                                                                                                                                                    const id = ButtonInteraction.first().customId
                                                                                                                                                    if (id === "StaffNo") {
                                                                                                                                                        return message.channel.send("Ta fiche n'a pas été accepté, merci de la recommencé")
                                                                                                                                                    }
                                                                                                                                                    if (id === "StaffYes") {
                                                                                                                                                        return message.channel.send("Bravo ta fiche a été validé par le staff")
                                                                                                                                                    }
                                                                                                                                                })
                                                                                                                                            })
                                                                                                                                        })
                                                                                                                                    }
                                                                                                                                })
                                                                                                                            })
                                                                                                                    })
                                                                                                                } else {
                                                                                                                    message.channel.send("**La description du pouvoir est un peu trop longue, j'ai pas eu le temps de tout lire** \n**Réessaye avec une description un peu plus courte.**")
                                                                                                                    pouvoirfail()
                                                                                                                    return
                                                                                                                }
                                                                                                            })
                                                                                                        })
                                                                                                    }
                                                                                                } else {
                                                                                                    message.channel.send("**La description de la personnalité de ton perso est un peu longue à mon goût j'ai pas eu le temps de tout lire** \n**Réessaye avec un texte un peu plus court.**")
                                                                                                    persofail()
                                                                                                    return
                                                                                                }
                                                                                            })
                                                                                        })
                                                                                    }
                                                                                } else {
                                                                                    message.channel.send("**L'histoire est un peu longue à mon goût j'ai pas eu le temps de tout lire** \n**Réessaye avec une histoire plus courte.**")
                                                                                    histoirefail()
                                                                                    return
                                                                                }
                                                                            })
                                                                        })
                                                                    }
                                                                } else {
                                                                    message.channel.send("**En dessous de 10 ans ça fait un peu jeune pour un futur Héros**\n**Réessaye avec un personnage plus âgée.**")
                                                                    agefail()
                                                                    return
                                                                }
                                                            })
                                                        })
                                                    }
                                                } else {
                                                    message.channel.send("**Se type de format me donne un peu mal à la tête et j'aurais du mal à l'afficher dans ton profil.**\n**Réessaye avec une simple image. (png, jpg/jpeg ou webp)**")
                                                    imagefail()
                                                    return
                                                }
                                            } else {
                                                message.channel.send("**Envoie moi ton image (sans lien) directement pour que je puisse l'enregistrer.**")
                                                imagefail()
                                                return
                                            }
                                        })
                                    })
                                }
                            })
                        })
                    }
                })
            })
        }
    }
}

