const db = require('quick.db')
const Discord = require('discord.js')
const money = new db.table("Money")
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'removemoney', //alias remove
    execute(message, args) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            if (isNaN(args[1])) return;
            const moneyresult = money.get(`money_${message.guild.id}_${message.mentions.members.first().id}`) - args[1]

            if (0 <= moneyresult) {
                money.subtract(`money_${message.guild.id}_${message.mentions.members.first().id}`, args[1]);
                return message.channel.send(`Vous avez retiré ${args[1]} Jenny du porte monnaie de ${message.mentions.members.first()}`);
            } else {
                return message.channel.send("Impossible de mettre le porte monnaie en négatif")
            }
        } else {
            const embed = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour utiliser cette commande. ")
                .setColor('#E81224')
                .setFooter("... C'est que pour les admins : Commande RemoveMoney")
            message.author.send({embeds: [embed]}).catch(err =>{
                message.channel.send({embeds: [embed]})
            })
        }  
    }
}