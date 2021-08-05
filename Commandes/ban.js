const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'ban',
    execute(message, args) {
        if (message.guild.member(message.author).hasPermission("BAN_MEMBERS")) {
            const embed = new MessageEmbed()
                .setTitle(`**Tu viens d'être banni du serveur Hunter X Hunter RP : Hunter's Legacy.**`)
                .setDescription(`**Raison :** ${args.slice(1).join(' ')}`)
                .setColor('#E81224')
            message.mentions.members.first().send(embed).then(wait => {
                message.mentions.members.first().ban()
            })
            const embed2 = new MessageEmbed()
                .setTitle(`**${message.author.username} vient de bannir ${message.mentions.users.first().username}**`)
                .setDescription(`**Raison :** ${args.slice(1).join(' ')}`)
                .setColor('#E81224')
            message.channel.send(embed2)
        } else {
            const embed = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour utiliser cette commande. ")
                .setColor('#E81224')
                .setFooter("... C'est que pour les modérateurs : Commande Ban")
            message.author.send(embed)
        }   
    }
}