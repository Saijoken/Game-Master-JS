const db = require('quick.db')
const Discord = require('discord.js')
const bank = new db.table("Bank")
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'addbank',
    execute(message, args) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            if (isNaN(args[1])) return;
            bank.add(`bank_${message.guild.id}_${message.mentions.members.first().id}`, args[1]);
            return message.channel.send(`Vous avez donné ${args[1]} Jenny dans le compte bancaire de ${message.mentions.members.first()}`);
        } else {
            const embed = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour utiliser cette commande. ")
                .setColor('#E81224')
                .setFooter("... C'est que pour les admins : Commande AddBank")
            message.author.send({embeds: [embed]}).catch(err =>{
                message.channel.send({embeds: [embed]})
            })
        }  
    }
}