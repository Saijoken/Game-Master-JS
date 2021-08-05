const db = require('quick.db')
const Discord = require('discord.js')
const money = new db.table("Money")
const bank = new db.table("Bank")
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'money',
    execute(message) {
        let user = message.mentions.members.first() || message.author;
        let argent = money.fetch(`money_${message.guild.id}_${user.id}`)
        let banque = bank.fetch(`bank_${message.guild.id}_${user.id}`)
        if (argent === null) argent = 0
        if (banque === null) banque = 0

        if(message.mentions.users.size === 1)   {
            const useravatar = message.mentions.members.first().user
            const embed = new MessageEmbed()
                .setTitle(`Jenny de ${message.mentions.users.first().username}`)
                .setColor('#E81224')
                .setThumbnail(useravatar.avatarURL())
                .addField("Porte Monnaie", `${argent}`, true)
                .addField("Compte en banque", `${banque}`, true)
            return message.channel.send(embed)
        } else {
            const useravatar = message.author
            const embed = new MessageEmbed()
                .setTitle(`Jenny de ${message.author.username}`)
                .setColor('#E81224')
                .setThumbnail(useravatar.avatarURL())
                .addField("Porte Monnaie", `${argent}`, true)
                .addField("Compte en banque", `${banque}`, true)
            return message.channel.send(embed)
        }
    }
}