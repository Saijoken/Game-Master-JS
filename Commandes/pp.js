const Discord = require('discord.js')
module.exports = {
    name: 'pp',
    execute(message) {
        if(message.mentions.users.size === 1)   {
            const user = message.mentions.members.first().user
            message.channel.send(user.avatarURL())
        } else {
            const user = message.author
            message.channel.send(user.avatarURL())
        }
    }
}