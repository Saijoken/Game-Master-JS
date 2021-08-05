const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'help',
    execute(message, args) {
        if (args == 0) {
            const embed = new MessageEmbed()
                .setTitle("\\❓ | Besoin d'aide ?")
                .setDescription("Pour consulter un type de commande taper !help <Catégorie>.\nVoici les différentes catégories :\n Aventure, Moderation, Economie.")
                .setColor('#E81224')
                .setThumbnail('https://cdn.discordapp.com/avatars/740502952405499905/4302949675662d03170dd52ace7ac17c.png')
                .addField("**Commande Start**", "Commande pour débuter ton aventure si ce n'est pas déjà fait. N'hésite pas à passer voir les salons infos auparavant.", false)
                .addField("**Commandes d'Aventure**", "Si tu viens de mettre les pieds dans ce monde et tu souhaites te repérer un peu.", false)
                .addField("**Commandes de Modérations (Réservé au Staff)**", "Commandes utiles aux modérateurs pour modérer les messages et les utilisateurs", false)
                .addField("**Commandes d'Economie**", "Les commandes servant a utiliser (ou gérer pour le Staff) l'argent et le Shop des utilisateurs.", false)
                .addField("**Commandes Fun**", "Des commandes sympa ou utiles pour passer le temps ou rigoler entre potes.", false)
            message.channel.send(embed)

        } else if (args == "Moderation" || args == "moderation" || args == "Modération" || args == "modération"){
            const embed = new MessageEmbed()
                .setTitle("Commandes de Modérations")
                .setDescription("Voici les différentes commandes de modérations disponibles sur le bot :")
                .setColor('#E81224')
                .setThumbnail('https://cdn.discordapp.com/avatars/740502952405499905/4302949675662d03170dd52ace7ac17c.png')
                .addField("**Ban :**", "Commande pour débuter ton aventure si ce n'est pas déjà fait. N'hésite pas à passer voir les salons infos auparavant.", false)
                .addField("**Kick :**", "Si tu viens de mettre les pieds dans ce monde et tu souhaites te repérer un peu.", false)
                .addField("**Clear :**", "Commandes utiles aux modérateurs pour modérer les messages et les utilisateurs", false)
                .addField("**Unban :**", "Les commandes servant a utiliser (ou gérer pour le Staff) l'argent et le Shop des utilisateurs.", false)
            message.channel.send(embed)
        } else if (args == "Economy" || args == "Economie" || args == "Économie" || args == "economie" || args == "economy" || args == "économie"){
            const embed = new MessageEmbed()
                .setTitle("Commandes d'Economie")
                .setDescription("Voici les commandes d'Economie elles vous serviront a gérer votre porte monnaie et accéder à la boutique par exemple.")
                .setColor('#E81224')
                .setThumbnail('https://cdn.discordapp.com/avatars/740502952405499905/4302949675662d03170dd52ace7ac17c.png')
                .addField("**Money :**", "Commande pour savoir quel somme d'argent vous avez dans votre porte-monnaie et vous permettre de gérer votre budget.", false)
                .addField("**Shop :**", "Commande pour obtenir les informations de la boutique et connaitre les objets que vous pouvez payer en fonction de votre budget.", false)
                .addField("**Buy (Objet) :**", "Commande pour acheter un objet dans le Shop et si vous en avez les moyens.", false)
                .addField("**Sell (Objet) (Utilisateur (facultatif)) :**", "Commande pour vendre un objet à une boutique ou à un utilisateur en particulier s'il accepte ou non", false)
                .addField("**Items :**", "Commande pour voir tout les objets que vous avez dans votre inventaire leurs quantités et leurs valeurs", false)
                .addField("**Add_Money :**", "Commande réservé aux administrateurs permettant de donner une certaine somme d'argent à un joueur", false)
                .addField("**Remove_Money :**", "Commande réservé aux administrateurs permettant de prendre une certaine somme d'argent à un joueur.", false)
            message.channel.send(embed)
        } else if (args == "Aventure" || args == "aventure" || args == "adventure" || args == "Adventure"){
            const embed = new MessageEmbed()
                .setTitle("Commandes d'Aventure")
                .setDescription("Tu viens de commencer ton aventure et tu souhaites decouvrir des commandes qui t'aideront a mieux vivre ton RP alors tu es au bon endroit.")
                .setColor('#E81224')
                .setThumbnail('https://cdn.discordapp.com/avatars/740502952405499905/4302949675662d03170dd52ace7ac17c.png')
                .addField("**Start :**", "Commande pour débuter ton aventure si ce n'est pas déjà fait. N'hésite pas à passer voir les salons infos auparavant.", false)
                .addField("**Fiche :**", "Commande pour aider le membre à créer sa fiche avec des instructions a noter etc etc une fois la fiche faite en tapant la commande on pourra voir la fiche du personnage en question.", false)
                .addField("**Profil (ou p) :**", "Commande pour afficher des données de l'utilisateur aussi bien inRP que HRP avec une image (comme Koya ^^).", false)
                .addField("**Train :**", "Commande pour entrainer son personnage et amélioré ces statistiques de combat.", false)
                .addField("**Fight @Adversaire :**", "Commande pour combattre un adversaire avec système de sélection des attaques et actions avec utlisations d'item (style jeu vidéo).", false)
                .addField("**Statistiques (ou stats) :**", "Commande pour afficher les statistiques du personnage montrant le nombre d'entrainements restants par jour etc etc...", false)
            message.channel.send(embed)
        } else if (args == "fun" || args == "Fun"){
            const embed = new MessageEmbed()
                .setTitle("Commande Fun")
                .setDescription("A faire")
                .setColor('#E81224')
                .setThumbnail('https://cdn.discordapp.com/avatars/740502952405499905/4302949675662d03170dd52ace7ac17c.png')
                .addField("A faire", "A faire <a:izukuhype:721399731326287954>", false)
            message.channel.send(embed)
        } else {
            message.channel.send("**:x: Cela ne correspond pas a une catégorie disponible.**")
        }
    }
}