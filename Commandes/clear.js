const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'clear',
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;
        if (message.member.roles.cache.some(role => role.name === 'STAFF')) {
            if (isNaN(amount))  {
                return
            }
            else if (amount <= 1)   {
               return
            }
            message.channel.bulkDelete(amount)
        } else {
            const embed = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour utiliser cette commande. ")
                .setColor('#E81224')
                .setFooter("... C'est que pour les modérateurs : Commande Clear")
            message.author.send(embed)
        }   
    }
};