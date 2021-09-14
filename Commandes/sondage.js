const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const clc = require('cli-color');

module.exports = {
    name: 'sondage', 
    execute(message, args) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            const react1 = args[0]
            const react2 = args[1]
            const mess = args.slice(2).join(' ')
            message.channel.bulkDelete(1).catch(err =>{
                console.log(clc.yellowBright('Message à supprimer invalide'))
            });
            message.channel.send(mess).then(function (message) {
                message.react(react1)
                message.react(react2)
            })
        } else {
            const embed = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour utiliser cette commande. ")
                .setColor('#E81224')
                .setFooter("... C'est que pour les admins : Commande Sondage")
            message.author.send({embeds: [embed]}).catch(err =>{
                message.channel.send({embeds: [embed]})
            })
        }   
    }
}

