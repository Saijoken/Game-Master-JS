const db = require('quick.db')
const Discord = require('discord.js')
const money = new db.table("Money")

module.exports = {
    name: 'addmoney',
    execute(message, args) {
        if (message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
            if (isNaN(args[1])) return;
            money.add(`money_${message.guild.id}_${message.mentions.members.first().id}`, args[1]);
            return message.channel.send(`Vous avez donné ${args[1]} Jenny dans le porte monnaie`);
        }
    }
}