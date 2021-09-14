const Discord = require('discord.js'); //COMMANDE REALISE PAR MANDO (AMELIORE PAR MOI)
const {MessageEmbed} = require('discord.js');

const embed1 = new MessageEmbed()
    .setTitle(":x: | Tu n'as pas assez de charisme pour utiliser cette commande. ")
    .setColor('#E81224')
    .setFooter("... C'est que pour les modérateurs : Commande Kick")

const embed2 = new MessageEmbed()
    .setTitle(":x: | Tu as oublié de mentionner un utilisateur. ")
    .setColor('#E81224')

const embed3 = new MessageEmbed()
    .setTitle(":x: | What ??????????? Keske ?????? Pourquoi tu essayes de t'expulser du serveur ? <:logik:721391751490830376> ")
    .setColor('#E81224')

const embed4 = new MessageEmbed()
    .setTitle(":x: | Les mains en l'air ! <:pepehandsup:884808195099492382> <:kermitgun:721391812383866891> Tu tenterais pas de kick Senku quand même. ")
    .setColor('#E81224')

const embed5 = new MessageEmbed()
    .setTitle(":x: | Tu n'oserais quand même pas sortir ton supérieur pas vrai ?")
    .setColor('#E81224')

const embed6 = new MessageEmbed()
    .setTitle(":x: | Je n'arrive pas à sortir ce membre...")
    .setColor('#E81224')

const vip = new MessageEmbed()
    .setTitle(":x: | Oh un privilégié je peux pas le kick il a été classé VIP (emoji pepe cool)")
    .setColor('#E81224')

module.exports = {
    name: 'kick',
    async execute(message, args) {

        const member = message.mentions.members.first()

        if (!member){
            return message.channel.send({embeds: [embed2]}) //si le mec a pas ping quelqu'un
        } 

        if (member.id === message.author.id){
            return message.channel.send({embeds: [embed3]}) //si tu veux te kick toi meme
        }

        if(!message.member.roles.cache.has(role => role.id === '720923304520581170')) { 
            return message.author.send({embeds: [embed1]}).catch(err => { //si t pas modo
                message.channel.send({embeds: [embed1]})
            });
        }

        if (member.id === ''){
            return message.channel.send({embeds: [vip]}) //si le mec que t'as ping est un boss qui ne peut pas etre kick du serv
        }

        if (member.id === message.guild.ownerID){
            return message.channel.send({embeds: [embed4]}) //si tu cherches à me kick fais gaffe mon pote
        } 

        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID){
            return message.channel.send({embeds: [embed5]}) //si c'est ton supérieur
        }

        if (!member.kickable){
            return message.channel.send({embeds: [embed6]}) //si tu peux pas le kick pour une raison ou une autre
        } 

        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'

        let embed7 = new MessageEmbed()
            .setTitle(`**${message.author.username} vient d'expulser ${member.username}**`)
            .setDescription(`**Raison :** ${reason}`)
            .setThumbnail(member.avatarURL())
            .setColor('#E81224')
        message.channel.send({embeds: [embed7]})

        let embed8 = new MessageEmbed()
            .setTitle(`**Tu viens d'être expulser du serveur : guildname**`)
            .setDescription(`**Raison :** ${reason}`)
            .setThumbnail(member.avatarURL())
            .setColor('#E81224')
        member.send({embeds: [embed8]}).catch(console.error)
        member.send("Si tu souhaites quand même retourner au serveur voici un lien pour y retourner:\nhttps://discord.gg/DtMRz3f").catch(console.error)

        
        setTimeout( () => {
            member.kick({reason})
        }, 950)

    }
}