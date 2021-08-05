const db = require('quick.db')
const Discord = require('discord.js')
const money = new db.table("Money")

module.exports = {
    name: 'removemoney',
    execute(message, args) {
        if (message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
            if (isNaN(args[1])) return;
            const moneyresult = money.get(`money_${message.guild.id}_${message.mentions.members.first().id}`) - args[1]

            if (0 <= moneyresult) {
                money.subtract(`money_${message.guild.id}_${message.mentions.members.first().id}`, args[1]);
                return message.channel.send(`Vous avez retiré ${args[1]} Jenny du porte monnaie`);
            } else {
                return message.channel.send("Impossible de mettre le porte monnaie en négatif")
            }
        }
    }
}