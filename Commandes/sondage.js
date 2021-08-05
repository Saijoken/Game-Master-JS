const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'sondage',
    execute(message, args) {
        if (message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
            const react1 = args[0]
            const react2 = args[1]
            const mess = args.slice(2).join(' ')
            message.channel.bulkDelete(1);
            message.channel.send(mess).then(function (message) {
                message.react(react1)
                message.react(react2)
            })
        } else {
            const embed = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour utiliser cette commande. ")
                .setColor('#E81224')
                .setFooter("... C'est que pour les admins : Commande Sondage")
            message.author.send(embed)
        }   
    }
}

