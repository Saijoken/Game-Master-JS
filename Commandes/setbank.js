const db = require('quick.db')
const Discord = require('discord.js')
const bank = new db.table("Bank")

module.exports = {
    name: 'setbank',
    execute(message, args) {
        if (message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
            if (isNaN(args[1])) return;
            bank.set(`bank_${message.guild.id}_${message.mentions.members.first().id}`, args[1]);
            return message.channel.send(`Vous avez défini le compte bancaire à ${args[1]} Jenny`);
        }
    }
}