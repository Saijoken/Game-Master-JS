const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const clc = require('cli-color');

module.exports = {
    name: 'say',
    execute(message, args) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            message.channel.bulkDelete(1).catch(err =>{
                console.log(clc.yellowBright('Message à supprimer invalide'))
            })
            message.channel.send(args.join(' '));
        } else {
            const embed = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour utiliser cette commande. ")
                .setColor('#E81224')
                .setFooter("... C'est que pour les admins : Commande Say")
            message.author.send({embeds: [embed]}).catch(err =>{
                message.channel.send({embeds: [embed]})
            })
        }   
    }
}