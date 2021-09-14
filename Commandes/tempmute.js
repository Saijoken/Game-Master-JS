const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const ms = require('ms')

module.exports = {
    name: 'tempmute',
    execute(message, args) { 
        if (message.member.permissions.has("MANAGE_MESSAGES")) {
            const muteuser = message.mentions.users.first()
            if(muteuser) {
                const RoleBase = message.guild.roles.cache.find(role => role.name === 'Membre')
                const RoleMute = message.guild.roles.cache.find(role => role.name === 'Mute')
                const muteuser2 = message.guild.members.cache.get(muteuser.id)

                const embed2 = new MessageEmbed()
                    .setTitle(`**${message.author.username} vient de mute ${message.mentions.users.first().username} pour ${ms(ms(args[1]))}**`)
                    .setColor('#E81224')
                message.channel.send({embeds: [embed2]})

                muteuser2.roles.remove(RoleBase.id)
                muteuser2.roles.add(RoleMute.id)
                
                setTimeout(function () {
                    muteuser2.roles.remove(RoleMute.id)
                    muteuser2.roles.add(RoleBase.id)
                    message.channel.send(`Le mute de ${message.mentions.users.first()} vient de se finir.`)
                }, ms(args[1]))
            } else {
                message.reply("Merci de mentionner un utilisateur valide")
            }
        } else {
            const embed3 = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour utiliser cette commande. ")
                .setColor('#E81224')
                .setFooter("... C'est que pour les modérateurs : Commande Tempmute")
            message.author.send({embeds: [embed3]}).catch(err =>{
                message.channel.send({embeds: [embed3]})
            })
        }
    }
}