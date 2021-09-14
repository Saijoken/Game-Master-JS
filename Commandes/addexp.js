const Discord = require('discord.js');
const canvas = require('canvas');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'addexp', 
    execute(message, args) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            if (isNaN(args[1])) return;
            bank.add(`bank_${message.guild.id}_${message.mentions.members.first().id}`, args[1]);
            return message.channel.send(`Vous avez donné ${args[1]} Jenny dans le compte bancaire de ${message.mentions.members.first()}`);
        } else {
            const embed = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour utiliser cette commande. ")
                .setColor('#E81224')
                .setFooter("... Réservé aux admins : Commande AddExp")
            message.author.send({embeds: [embed]}).catch(err =>{
                message.channel.send({embeds: [embed]})
            })
        }
    }
};