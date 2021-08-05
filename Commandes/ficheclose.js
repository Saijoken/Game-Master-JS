const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'fiche-close',
    execute(message) {
        if (message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
            const filter = (reaction, user) => {
                return ['🔒'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            message.channel.send(`Veux-tu vraiment forcer la suppression du ticket ?`).then(function (message) {
                message.react("🔒")
                message.awaitReactions(filter, {max: 1, time: 120000}).then(collected2 => {
                    if (collected2.first().emoji.name == '🔒') {
                        message.channel.send("Suppression du ticket en cours <a:izukuhype:721399731326287954>").then(function (message3) {
                            return message.channel.delete()
                        })
                    }
                })
            }).catch(() => {
                return message.reply("Aucune réponse donné dans les 2 minutes.")
            })
        }
    }
}