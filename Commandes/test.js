const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const ms = require("pretty-ms")
const db = require('quick.db')
const workdaily = new db.table("WorkDaily")
const money = new db.table("Money")

module.exports = {
    name: 'test',
    execute(message, args) { 
        let user = message.author;
        const check = workdaily.get(`workerdaily_${message.guild.id}_${user.id}`)
        const timeout = 86400000
        if (check !== null && timeout - (Date.now() - check) > 0) {
            
            const TimeLeft = ms(timeout - (Date.now() - check)).slice(0, 8)
            caracH = TimeLeft.slice(2,3)
            if (caracH == "h") {
                caracM = TimeLeft.slice(6,7)
                stringH = TimeLeft.slice(0,2)

                if (caracM == "m"){
                    stringM = TimeLeft.slice(4,6)
                } else {
                    stringM = TimeLeft.slice(4,5)
                }
            } else {
                caracM = TimeLeft.slice(5,6)
                stringH = TimeLeft.slice(0,1)

                if (caracM == "m"){
                    stringM = TimeLeft.slice(3,5)
                } else {
                    stringM = TimeLeft.slice(3,4)
                }
            }
            console.log(stringH)
            console.log(stringM)
            console.log(TimeLeft)
            heure = "Heures"
            minute = "Minutes"

            if (stringH == "1"){
                heure = "Heure"
            }

            if (stringM == "1"){
                minute = "Minute"
            }

            message.channel.send(`**Tu as déjà pris ton argent du jour.\nReviens dans ${stringH} ${heure} et ${stringM} ${minute}.**`)

        } else {
            const reward = Math.floor(Math.random() * (150 - 100 + 1)) + 100
            money.add(`money_${message.guild.id}_${user.id}`, reward)
            workdaily.set(`workerdaily_${message.guild.id}_${user.id}`, Date.now())
            message.channel.send(`**Vous avez gagner ${reward}€.\nReviens demain.**`)
        }
    }
}