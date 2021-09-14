const db = require('quick.db')
const Discord = require('discord.js')
const money = new db.table("Money")
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'addmoney', //alias add
    execute(message, args) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            if (isNaN(args[1])) return;
            money.add(`money_${message.guild.id}_${message.mentions.members.first().id}`, args[1]);
            return message.channel.send(`Vous avez ajouté ${args[1]} Jenny dans le porte monnaie de ${message.mentions.members.first()}`);
        } else {
            const embed = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour utiliser cette commande. ")
                .setColor('#E81224')
                .setFooter("... C'est que pour les admins : Commande AddMoney")
            message.author.send({embeds: [embed]}).catch(err =>{
                message.channel.send({embeds: [embed]})
            })
        }  
    }
}