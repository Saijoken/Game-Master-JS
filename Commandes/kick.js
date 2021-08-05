const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'kick',
    execute(message, args) {
        if (message.guild.member(message.author).hasPermission("KICK_MEMBERS")) {
            const embed = new MessageEmbed()
                .setTitle(`**Tu viens d'être exclu du serveur Hunter X Hunter RP : Hunter's Legacy.**`)
                .setDescription(`**Raison :** ${args.slice(1).join(' ')}`)
                .addField('Si tu veux y retourner clique sur le lien ci dessous :', "** **", false)
                .setColor('#E81224')
            message.mentions.members.first().send(embed)
            message.mentions.members.first().send("https://discord.gg/DtMRz3f").then(wait => {
                message.mentions.members.first().kick()
            })
            const embed2 = new MessageEmbed()
                .setTitle(`**${message.author.username} vient d'exclure ${message.mentions.users.first().username}**`)
                .setDescription(`**Raison :** ${args.slice(1).join(' ')}`)
                .setColor('#E81224')
            message.channel.send(embed2)
        } else {
            const embed = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour utiliser cette commande. ")
                .setColor('#E81224')
                .setFooter("... C'est que pour les modérateurs : Commande Kick")
            message.author.send(embed)
        }   
    }
}