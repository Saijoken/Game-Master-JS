const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db')
const imgur = require('imgur');

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
function sleep2(milliseconds2) {
    const date2 = Date.now();
    let currentDate2 = null;
    do {
        currentDate2 = Date.now();
    } while (currentDate2 - date2 < milliseconds2);
}

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
        const user = message.mentions.members.first() || message.author;
        message.channel.send(`**Bienvenue dans le créateur de fiche ${user} n'est-ce pas excitant !!!\nC'est ici que tu vas pouvoir donner vie à ton personnage mais réflechis bien car les changements seront définitifs sauf si vous effectuez le reset de votre personnage en reprenant l'aventure de ZERO.\nSi tu es prêt ALLONS-Y !!!**`)
        //Prénom
        message.channel.send("**Pour commencer quel sera le prénom de ton personnage ?**").then(function (message) {
            message.channel.awaitMessages(message => user.id === message.author.id, {max: 1, time: null}).then(collected => {
                if (30 <= collected.first().content.length) {
                    message.channel.send("**Le prénom est trop long**")
                    return
                }
                ficheprenom.set(`prenom_${message.guild.id}_${user.id}`, collected.first().content)
                //Nom
                message.channel.send("**Quel sera son nom de famille ?**").then(function (message) {
                    message.channel.awaitMessages(message => user.id === message.author.id, {max: 1, time: null}).then(collected2 => {
                        if (30 <= collected2.first().content.length) {
                            message.channel.send("**Le nom est trop long**")
                            return
                        }
                        fichenom.set(`nom_${message.guild.id}_${user.id}`, collected2.first().content)
                        //Image
                        message.channel.send("**Pour mieux voir les choses donne moi une image du visage de ton personnage.**").then(function (message) {
                            message.channel.awaitMessages(message => user.id === message.author.id, {max: 1, time: null}).then(collected3 => {
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
                                            });
                                        //Age
                                        message.channel.send("**Donne moi l'âge de ton personnage (au moins supérieur à 10 ans pour rester logique) (Ex: 25)**").then(function (message) {
                                            message.channel.awaitMessages(message => user.id === message.author.id, {max: 1, time: null}).then(collected4 => {
                                                if (collected4.first().content > 9) {
                                                    ficheage.set(`age_${message.guild.id}_${user.id}`, collected4.first().content)
                                                    //Histoire
                                                    message.channel.send("**Histoire ? (max 2000 caractères)**").then(function (message) {
                                                        message.channel.awaitMessages(message => user.id === message.author.id, {max: 1, time: null}).then(collected5 => {
                                                            if (collected5.first().content.length <= 2000) {
                                                                fichehistoire.set(`histoire_${message.guild.id}_${user.id}`, collected5.first().content)
                                                                //Personnalité et facon d'être
                                                                message.channel.send("**Personnalité et façon d'être ? (max 2000 caractères)**").then(function (message) {
                                                                    message.channel.awaitMessages(message => user.id === message.author.id, {max: 1, time: null}).then(collected6 => {
                                                                        if (collected6.first().content.length <= 2000) {
                                                                            fichepersonnalite.set(`personnalite_${message.guild.id}_${user.id}`, collected5.first().content)
                                                                            //Définition du Nen
                                                                            if (fichenen.get(`nen_${message.guild.id}_${user.id}`) === null) {
                                                                                const pouvoirnumber = Math.floor(Math.random() * 6) + 1
                                                                                message.channel.send("**Ton Nen ne t'es pas encore acquis si tu veux l'obtenir tu devras passer des épreuves ne soit pas impatient.**").then(function (messagesleep){
                                                                                    sleep(3000);
                                                                                    messagesleep.edit("**La nature de ton Nen est ...**")
                                                                                    sleep2(3000);
                                                                                    if (pouvoirnumber === 1) {
                                                                                        messagesleep.edit("**Renforcement \nLe Renforcement est la possibilité d'utiliser l'aura pour augmenter les capacités naturelles d'un objet ou de son propre corps. Par conséquent, les utilisateurs du Renforcement sont en mesure d'augmenter considérablement leur attaque physique et leur défense et sont les mieux adaptés pour les combat aux corps-à-corps.**")
                                                                                        const pouvoirnen = "Renforcement"
                                                                                        fichenen.set(`nen_${message.guild.id}_${user.id}`, pouvoirnen)
                                                                                    } else if (pouvoirnumber === 2) {
                                                                                        messagesleep.edit(`**Matérialisation \nLa matérialisation est la possibilité de créer un objet matériel indépendant physiquement de l'aura. Une fois qu'une personne a maîtrisé la matérialisation d'un certain objet, il peut l'invoquer et le dissiper en un instant, quand il le veut. La matérialisation est la seule manière dont le Nen peut créer des choses que les gens ordinaires (ignorant le Nen) peuvent voir et toucher. En outre, des objets ou des entités créées par cette technique ont une "indépendance" subtil à eux. Cela signifie qu'ils peuvent continuer à exister même si ils sont à une distance considérable de l'utilisateur, ou même si l'utilisateur n'est pas conscient qu'ils ne sont pas dématérialisés.**`)
                                                                                        const pouvoirnen = "Matérialisation"
                                                                                        fichenen.set(`nen_${message.guild.id}_${user.id}`, pouvoirnen)
                                                                                    } else if (pouvoirnumber === 3) {
                                                                                        messagesleep.edit("**Transformation \nCeux ayant une affinité pour la Transformation sont des personnes pouvant changer les propriétés de leur aura pour imiter quelque chose d'autre. Semblables à l'émission, les choses créées par la Transformation sont de l'aura pure. La transformation est souvent confondue avec la Matérialisation en raison de leurs similitudes. Une façon simple de penser serait que la transformation permet à votre aura d'imiter les propriétés d'une substance, alors que la Matérialisation vous permet de changer votre aura en substance réelle. Les utilisateurs de la Transformation peuvent copier les propriétés des choses réelles.**")
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
                                                                                        messagesleep.edit("**Spécialisation \nIl est possible que l'effet qui se produit lors de la divination de l'eau puisse donner une idée de la façon dont les utilisateurs de la Spécialisation utilisent leur pouvoir. La spécialisation est tout ce qui n'appartient pas aux cinq autres catégories. Il s'agit de la catégorie d'Hatsu la plus vague. Les utilisateurs de la Spécialisation possèdent très souvent un GRAND POUVOIR en eux à toi d'en faire bon usage.**")
                                                                                        const pouvoirnen = "Spécialisation"
                                                                                        fichenen.set(`nen_${message.guild.id}_${user.id}`, pouvoirnen)
                                                                                    }
                                                                                })
                                                                            } else {
                                                                                message.channel.send("**Ton Nen a déjà été défini passons à la suite.**")
                                                                            }
                                                                            //Pouvoir
                                                                            message.channel.send("**Pouvoir ? (max 500 caractères)**").then(function (message) {
                                                                                message.channel.awaitMessages(message => user.id === message.author.id, {max: 1, time: null}).then(collected7 => {
                                                                                    if (collected7.first().content.length <= 500) {
                                                                                        fichepouvoir.set(`pouvoir_${message.guild.id}_${user.id}`, collected7.first().content)
                                                                                        const embed = new MessageEmbed()
                                                                                        .setTitle(`Fiche de ${user}`)
                                                                                        .setColor('#E81224')
                                                                                        .setThumbnail(`${ficheimage.get(`image_${message.guild.id}_${user.id}`)}`)
                                                                                        .addField("Prénom Nom", `${ficheprenom.get(`prenom_${message.guild.id}_${user.id}`)} ${fichenom.get(`nom_${message.guild.id}_${user.id}`)}`, false)
                                                                                        .addField("Âge", `${ficheage.get(`age_${message.guild.id}_${user.id}`)}`, false)
                                                                                        .addField("Histoire", `${fichehistoire.get(`histoire_${message.guild.id}_${user.id}`)}`, false)
                                                                                        .addField("Personnalité", `${fichepersonnalite.get(`personnalite_${message.guild.id}_${user.id}`)}`, false)
                                                                                        .addField("Nen", `${fichenen.get(`nen_${message.guild.id}_${user.id}`)}`, false)
                                                                                        .addField("Pouvoir", `${fichepouvoir.get(`pouvoir_${message.guild.id}_${user.id}`)}`, false)
                                                                                    message.channel.send(embed)
                                                                                    } else {
                                                                                        message.channel.send("**La description du pouvoir est un peu longue à mon goût j'ai pas eu le temps de tout lire** \n **Réessaye avec un pouvoir un peu plus simple.**")
                                                                                        return
                                                                                    }
                                                                                })
                                                                            })
                                                                        } else {
                                                                            message.channel.send("**La description de la personnalité de ton perso est un peu longue à mon goût j'ai pas eu le temps de tout lire** \n **Réessaye avec un texte un peu plus court.**")
                                                                            return
                                                                        }
                                                                    })
                                                                })
                                                            } else {
                                                                message.channel.send("**L'histoire est un peu longue à mon goût j'ai pas eu le temps de tout lire** \n **Réessaye avec une histoire plus courte.**")
                                                                return
                                                            }
                                                        })
                                                    })
                                                } else {
                                                    message.channel.send("**En dessous de 10 ans ça fait un peu jeune pour un futur Héros**\n**Réessaye avec un personnage plus âgée.**")
                                                    return
                                                }
                                            })
                                        })
                                    } else {
                                        message.channel.send("**Les GIF me donnent un peu mal à la tête et j'aurais du mal à afficher ton profil avec un GIF**\n** Réessaye avec une simple image (png, jpg/jpeg ou webp)**")
                                        return
                                    }
                                } else {
                                    message.channel.send("**Envoie moi ton image (sans lien) directement pour que je puisse l'enregistrer**")
                                    return
                                }
                            })
                        })
                    })
                })
            })
        })
    }
}