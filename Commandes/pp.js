const Discord = require('discord.js')  //COMMANDE REALISE PAR MANDO GG A LUI
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'pp', //alias miroir
    execute(message) {
        var author = message.author;
        var mention = message.mentions.users.first()

    if(!mention) {

        let embedAvatarAuthor = new Discord.MessageEmbed()
            .setImage(author.displayAvatarURL({dynamic: true, size: 4096}))
            .setColor("#E81224")
            .setFooter(author.tag)

            message.channel.send({embeds: [embedAvatarAuthor]}).catch(err => {

                message.channel.send("**Une erreur est survenue.**")

            });
        
    } else {

        if(author.id != mention.id) {

        let embedAvatarMention = new Discord.MessageEmbed()
            .setImage(mention.displayAvatarURL({dynamic: true, size: 4096}))
            .setColor("#E81224")
            .setFooter(mention.tag)

            message.channel.send({embeds: [embedAvatarMention]}).catch(err => {

                message.channel.send("**Une erreur est survenue.**")

            });

        }

    }
    }
}