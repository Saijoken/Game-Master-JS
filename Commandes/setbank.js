const db = require('quick.db')
const Discord = require('discord.js')
const bank = new db.table("Bank")
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'setbank',
    execute(message, args) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            if (isNaN(args[1])) return;
            let banque = bank.get(`bank_${message.guild.id}_${message.mentions.members.first().id}`)
            if (banque === null) banque = 0
            bank.subtract(`bank_${message.guild.id}_${message.mentions.members.first().id}`, `${banque}`);
            bank.add(`bank_${message.guild.id}_${message.mentions.members.first().id}`, `${args[1]}`);
            return message.channel.send(`Vous avez défini le compte bancaire de ${message.mentions.members.first()} à ${args[1]} Jenny`);
        } else {
            const embed = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour utiliser cette commande. ")
                .setColor('#E81224')
                .setFooter("... C'est que pour les admins : Commande SetBank")
            message.author.send({embeds: [embed]}).catch(err =>{
                message.channel.send({embeds: [embed]})
            })
        }  
    }
}