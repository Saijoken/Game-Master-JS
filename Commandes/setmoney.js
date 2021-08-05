const db = require('quick.db')
const Discord = require('discord.js')
const money = new db.table("Money")

module.exports = {
    name: 'setmoney',
    execute(message, args) {
        if (message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
            if (isNaN(args[1])) return;
            money.set(`money_${message.guild.id}_${message.mentions.members.first().id}`, args[1]);
            return message.channel.send(`Vous avez défini le porte monnaie à ${args[1]} Jenny`);
        }
    }
}