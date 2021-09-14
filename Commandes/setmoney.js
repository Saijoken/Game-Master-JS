const db = require('quick.db')
const Discord = require('discord.js')
const money = new db.table("Money")
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'setmoney',
    execute(message, args) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            if (isNaN(args[1])) return;
            let argent = money.get(`money_${message.guild.id}_${message.mentions.members.first().id}`)
            if (argent === null) argent = 0
            money.subtract(`money_${message.guild.id}_${message.mentions.members.first().id}`, `${argent}`);
            money.add(`money_${message.guild.id}_${message.mentions.members.first().id}`, `${args[1]}`);
            return message.channel.send(`Vous avez défini le porte monnaie de ${message.mentions.members.first()} à ${args[1]} Jenny`);
        } else {
            const embed = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour utiliser cette commande. ")
                .setColor('#E81224')
                .setFooter("... C'est que pour les admins : Commande SetMoney")
            message.author.send({embeds: [embed]}).catch(err =>{
                message.channel.send({embeds: [embed]})
            })
        }  
    }
}