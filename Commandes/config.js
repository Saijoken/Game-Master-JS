
const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const { prefix } = require('../config.json');
const db = require('quick.db')
const configcolor = new db.table("ConfigColor")
const configstatut = new db.table("ConfigStatut")
const configmuterole = new db.table("ConfigMuteRole")
const configmembrerole = new db.table("ConfigMembreRole")

module.exports = {
    name: 'config', //alias configurer
    execute(message, args) { 
        if (message.member.permissions.has("ADMINISTRATOR")){

            if (args == 0) {
                const embed = new MessageEmbed()
                    .setTitle("🔧 **Configuration du bot** 🔧")
                    .setColor(configcolor.get(`configcolor_${message.guild.id}`))
                    .addField("**Changer la couleur**", `**Couleur prédéfini:**\n${prefix}config color [RED/GREEN/BLUE/YELLOW]\n**Couleur personnalisé:**\n${prefix}config color [Code hexadécimale]\n**Site pour le hexadécimale:**\nhttp://www.outils-web.com/page-generateur-code-couleur.asp`, false)
                    .addField("**Changer le statut**", `${prefix}config statut [Le statut]`, false)
                    .addField("**Configuration rôle mute**", `**Changer le rôle mute:**\n${prefix}config muteconfig mute [@Nom du rôle]\n**Changer le rôle membre:**\n${prefix}config muteconfig membre [@Nom du rôle]`, false)
                message.channel.send({embeds: [embed]})
            }
            if (args[0] === "color") {
                if (args[1] == null) {
                    const embed = new MessageEmbed()
                        .setTitle("🔧 **Configuration du bot** 🔧")
                        .setColor(configcolor.get(`configcolor_${message.guild.id}`))
                        .addField("**Changer la couleur**", `**Couleur prédéfini:**\n${prefix}config color [RED/GREEN/BLUE/YELLOW]\n**Couleur personnalisé:**\n${prefix}config color [Code hexadécimale]\n**Site pour le hexadécimale:**\nhttp://www.outils-web.com/page-generateur-code-couleur.asp`, false)
                    message.channel.send({embeds: [embed]})
                } else if (args[1] == "red" || args[1] == "RED") {
                    configcolor.set(`configcolor_${message.guild.id}`, `RED`)
                    const embedred = new MessageEmbed()
                        .setTitle("🔧 **Configuration du bot** 🔧")
                        .setColor(configcolor.get(`configcolor_${message.guild.id}`))
                        .setDescription("**La couleur du bot est maintenant du rouge.**")
                    message.reply({embeds: [embedred]})
                } else if (args[1] == "green" || args[1] == "GREEN") {
                    configcolor.set(`configcolor_${message.guild.id}`, `GREEN`)
                    const embedgreen = new MessageEmbed()
                        .setTitle("🔧 **Configuration du bot** 🔧")
                        .setColor(configcolor.get(`configcolor_${message.guild.id}`))
                        .setDescription("**La couleur du bot est maintenant du vert.**")
                    message.reply({embeds: [embedgreen]})
                } else if (args[1] == "blue" || args[1] == "BLUE") {
                    configcolor.set(`configcolor_${message.guild.id}`, `BLUE`)
                    const embedblue = new MessageEmbed()
                        .setTitle("🔧 **Configuration du bot** 🔧")
                        .setColor(configcolor.get(`configcolor_${message.guild.id}`))
                        .setDescription("**La couleur du bot est maintenant du bleu.**")
                    message.reply({embeds: [embedblue]})
                } else if (args[1] == "yellow" || args[1] == "YELLOW") {
                    configcolor.set(`configcolor_${message.guild.id}`, `YELLOW`)
                    const embedyellow = new MessageEmbed()
                        .setTitle("🔧 **Configuration du bot** 🔧")
                        .setColor(configcolor.get(`configcolor_${message.guild.id}`))
                        .setDescription(`**La couleur du bot est maintenant ${args[1]}.**`)
                    message.reply({embeds: [embedyellow]})
                } else if (args[1].startsWith("#")) {
                    configcolor.set(`configcolor_${message.guild.id}`, args[1])
                    const embedhexa = new MessageEmbed()
                        .setTitle("🔧 **Configuration du bot** 🔧")
                        .setColor(configcolor.get(`configcolor_${message.guild.id}`))
                        .setDescription(`**La couleur du bot est maintenant ${args[1]}.**`)
                    message.reply({embeds: [embedhexa]})
                }
            } else if (args[0] === "statut") {
                if (args[1] == null) {
                    const embed = new MessageEmbed()
                        .setTitle("🔧 **Configuration du bot** 🔧")
                        .setColor(configcolor.get(`configcolor_${message.guild.id}`))
                        .addField("**Changer le statut**", `${prefix}config statut [Le statut]`, false)
                    message.channel.send({embeds: [embed]})
                    return
                }
                configstatut.set(`configstatut_${message.guild.id}`, args.slice(1).join(' '))
                const embedstatut = new MessageEmbed()
                        .setTitle("🔧 **Configuration du bot** 🔧")
                        .setColor(configcolor.get(`configcolor_${message.guild.id}`))
                        .setDescription(`**Le statut du bot est maintenant "${args.slice(1).join(' ')}".\nLe statut sera appliqué après un redémarrage.**`)
                message.reply({embeds: [embedstatut]})
            } else if (args[0] === "muteconfig") {
                if (args[1] == null) {
                    const embed = new MessageEmbed()
                        .setTitle("🔧 **Configuration du bot** 🔧")
                        .setColor(configcolor.get(`configcolor_${message.guild.id}`))
                        .addField("**Configuration rôle mute**", `**Changer le rôle mute:**\n${prefix}config muteconfig mute [@Nom du rôle]\n**Changer le rôle membre:**\n${prefix}config muteconfig membre [@Nom du rôle]`, false)
                    message.channel.send({embeds: [embed]})
                    return
                } else if (args[1] == "mute") {
                    configmuterole.set(`configmuterole_${message.guild.id}`, args[2])
                    const embedred = new MessageEmbed()
                        .setTitle("🔧 **Configuration du bot** 🔧")
                        .setColor(configcolor.get(`configcolor_${message.guild.id}`))
                        .setDescription(`**Le rôle mute est maintenant ${args[2]}.**`)
                    message.reply({embeds: [embedred]})
                } else if (args[1] == "membre") {
                    configmembrerole.set(`configmembrerole_${message.guild.id}`, args[2])
                    const embedgreen = new MessageEmbed()
                        .setTitle("🔧 **Configuration du bot** 🔧")
                        .setColor(configcolor.get(`configcolor_${message.guild.id}`))
                        .setDescription(`**Le rôle membre est maintenant ${args[2]}.**`)
                    message.reply({embeds: [embedgreen]})
                }
            }
        } else {
            const embed = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour utiliser cette commande. ")
                .setColor('#E81224')
                .setFooter("... C'est que pour les admins : Commande Config")
            message.author.send({embeds: [embed]}).catch(err =>{
                message.channel.send({embeds: [embed]})
            })
        }
    }
}

