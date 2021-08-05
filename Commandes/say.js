const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'say',
    execute(message, args) {
        if (message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
            message.channel.bulkDelete(1);
            message.channel.send(args.join(' '));
        } else {
            const embed = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour utiliser cette commande. ")
                .setColor('#E81224')
                .setFooter("... C'est que pour les admins : Commande Say")
            message.author.send(embed)
        }   
    }
}