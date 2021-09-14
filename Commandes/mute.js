const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');

const db = require('quick.db')
const configmuterole = new db.table("ConfigMuteRole")
const configmembrerole = new db.table("ConfigMembreRole")

module.exports = {
    name: 'mute', //alias chut
    execute(message) { 
        if (message.member.permissions.has("MANAGE_MESSAGES")) {
            const muteuser = message.mentions.users.first()
            if(muteuser) {
                // const RoleBase = message.guild.roles.cache.find(role => role.name === 'Membre')
                // const RoleMute = message.guild.roles.cache.find(role => role.name === 'Mute')
                console.log(configmembrerole.get(`configmembrerole_${message.guild.id}`))
                console.log(configmuterole.get(`configmuterole_${message.guild.id}`))
                const RoleBase = message.guild.roles.cache.find(role => role.name === configmembrerole.get(`configmembrerole_${message.guild.id}`))
                const RoleMute = message.guild.roles.cache.find(role => role.name === configmuterole.get(`configmuterole_${message.guild.id}`))
                const muteuser2 = message.guild.members.cache.get(muteuser.id)
                
                muteuser2.roles.remove(RoleBase)
                muteuser2.roles.add(RoleMute)

                const embed2 = new MessageEmbed()
                    .setTitle(`**${message.author.username} vient de mute ${message.mentions.users.first().username}**`)
                    .setColor('#E81224')
                message.channel.send({embeds: [embed2]})
            } else {
                message.reply("Merci de mentionner un utilisateur valide")
            }
        } else {
            const embed3 = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour utiliser cette commande. ")
                .setColor('#E81224')
                .setFooter("... C'est que pour les modérateurs : Commande Mute")
            message.author.send({embeds: [embed3]}).catch(err =>{
                message.channel.send({embeds: [embed3]})
            })
        }
    }
}