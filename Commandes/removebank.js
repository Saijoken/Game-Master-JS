const db = require('quick.db')
const Discord = require('discord.js')
const bank = new db.table("Bank")

module.exports = {
    name: 'removebank',
    execute(message, args) {
        if (message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
            if (isNaN(args[1])) return;
            const moneyresult = bank.get(`bank_${message.guild.id}_${message.mentions.members.first().id}`) - args[1]

            if (0 <= moneyresult) {
                bank.subtract(`bank_${message.guild.id}_${message.mentions.members.first().id}`, args[1]);
                return message.channel.send(`Vous avez retiré ${args[1]} Jenny du compte bancaire`);
            } else {
                return message.channel.send("Impossible de mettre le compte bancaire en négatif")
            }
        }
    }
}