const db = require('quick.db')
const Discord = require('discord.js')
const money = new db.table("Money")
const bank = new db.table("Bank")
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'distributeur',
    execute(message, args) {

        let user = message.author;
        let argent = money.fetch(`money_${message.guild.id}_${user.id}`)
        let banque = bank.fetch(`bank_${message.guild.id}_${user.id}`)
        if (argent === null) argent = 0
        if (banque === null) banque = 0


        message.channel.send("**Distributeur de billet automatique de la YorkShin City Bank\nQuel action voulez vous effectuez :\n\n- Déposer de l'argent sur votre compte bancaire.\n\n- Retirer de l'argent depuis votre compte bancaire.**")
        message.channel.awaitMessages(message => user.id === message.author.id, {max: 1, time: 120000}).then(collected => {
            if (collected.first().content.toLowerCase() === "d" || collected.first().content.toLowerCase() === "déposer" || collected.first().content.toLowerCase() === "deposit" || collected.first().content.toLowerCase() === "deposer" || collected.first().content.toLowerCase() === "1") {
                message.channel.send("**Quel quantité de Jenny voulez vous déposer sur votre compte ?**")
                message.channel.awaitMessages(message => user.id === message.author.id, {max: 1, time: 120000}).then(collected2 => {

                    if (collected2.first().content.toLowerCase() === "tout" || collected2.first().content.toLowerCase() === "all"){
                        money.subtract(`money_${message.guild.id}_${user.id}`, `${argent}`);
                        bank.add(`bank_${message.guild.id}_${user.id}`, `${argent}`);
                        message.channel.send(`**Vous avez transféré ${argent} Jenny dans votre compte bancaire**`);
                        return message.channel.send("**La YorkShin City Bank vous souhaite une agréable fin de journée**");
                    } else if (collected2.first().content <= argent){
                        money.subtract(`money_${message.guild.id}_${user.id}`, collected2.first().content);
                        bank.add(`bank_${message.guild.id}_${user.id}`, collected2.first().content);
                        message.channel.send(`**Vous avez transféré ${collected2.first().content} Jenny dans votre compte bancaire**`);
                        return message.channel.send("**La YorkShin City Bank vous souhaite une agréable fin de journée**");
                    } else {
                        message.channel.send("**Impossible de déposer plus que ce qu'il y a dans votre porte monnaie. Fermeture du Terminal...**");
                        return message.channel.send("**La YorkShin City Bank vous souhaite une agréable fin de journée.**");
                    }
                }).catch(() => {
                message.channel.send(`**${user2} Temps de latence dépassé. Fermeture automatique du Terminal...**`); 
                })
            } else if (collected.first().content.toLowerCase() === "r" || collected.first().content.toLowerCase() === "retirer" || collected.first().content.toLowerCase() === "2"){
                message.channel.send("**Quel quantité de Jenny voulez vous retirer depuis votre compte ?**")
                message.channel.awaitMessages(message => user.id === message.author.id, {max: 1, time: 120000}).then(collected3 => {
                    if (collected3.first().content.toLowerCase() === "tout" || collected3.first().content.toLowerCase() === "all"){
                        bank.subtract(`bank_${message.guild.id}_${user.id}`, `${banque}`);
                        money.add(`money_${message.guild.id}_${user.id}`, `${banque}`);
                        message.channel.send(`**Vous avez transféré ${banque} Jenny dans votre porte monnaie**`);
                        return message.channel.send("**La YorkShin City Bank vous souhaite une agréable fin de journée.**");
                    } else if (collected3.first().content <= argent){
                        money.subtract(`money_${message.guild.id}_${user.id}`, collected3.first().content)
                        bank.add(`bank_${message.guild.id}_${user.id}`, collected3.first().content)
                        message.channel.send(`**Vous avez transféré ${collected3.first().content} Jenny dans votre compte bancaire**`);
                        return message.channel.send("**La YorkShin City Bank vous souhaite une agréable fin de journée.**");
                    } else {
                        message.channel.send("**Impossible de retirer plus que ce qu'il y a dans votre compte bancaire. Fermeture du Terminal...**");
                        return message.channel.send("**La YorkShin City Bank vous souhaite une agréable fin de journée.**");
                    }
                }).catch(() => {
                message.channel.send(`**${user2} Temps de latence dépassé. Fermeture automatique du Terminal...**`); 
                }) 
            } 
        }).catch(() => {
        message.channel.send(`**${user2} Temps de latence dépassé. Fermeture automatique du Terminal...**`);
        })


        /*
        console.log(args[1])
        let user = message.author;
        let argent = money.fetch(`money_${message.guild.id}_${user.id}`)
        let banque = bank.fetch(`bank_${message.guild.id}_${user.id}`)
        if (argent === null) argent = 0
        if (banque === null) banque = 0

        if (args[0] === "D")   {
            if (args[1] === "all") {
                money.subtract(`money_${message.guild.id}_${user.id}`, `${argent}`)
                bank.add(`bank_${message.guild.id}_${user.id}`, `${argent}`)
                return message.channel.send(`Vous avez transféré ${argent}€ dans votre compte bancaire`);
            } else {
                console.log(argent)
                if (args[1] <= argent) {
                    money.subtract(`money_${message.guild.id}_${user.id}`, args[1])
                    bank.add(`bank_${message.guild.id}_${user.id}`, args[1])
                    return message.channel.send(`Vous avez transféré ${args[1]}€ dans votre compte bancaire`);
                } else {
                    return message.channel.send("Impossible de déposer plus que ce qu'il y a dans le porte monnaie")
                }
            }
        } else if (args[0] === "R") {
            if (args[1] === "all") {
                bank.subtract(`bank_${message.guild.id}_${user.id}`, `${banque}`)
                money.add(`money_${message.guild.id}_${user.id}`, `${banque}`)
                return message.channel.send(`Vous avez transféré ${banque}€ dans votre porte monnaie`);
            } else {
                if (args[1] <= banque) {
                    bank.subtract(`bank_${message.guild.id}_${user.id}`, args[1])
                    money.add(`money_${message.guild.id}_${user.id}`, args[1])
                    return message.channel.send(`Vous avez transféré ${args[1]}€ dans votre porte monnaie`);
                } else {
                    return message.channel.send("Impossible de déposer plus que ce qu'il y a dans le compte banquaire")
                }
            }
        } else {
            const embed3 = new MessageEmbed()
                .setTitle(`Distributeur de banque`)
                .setColor('#E81224')
                .setThumbnail(message.author.avatarURL())
                .addField("**Déposer de l'argent**", `!!distributeur D {nombre d'argent}`, false)
                .addField("**Déposer tout l'argent**", `!!distributeur D all`, false)
                .addField("**Retirer de l'argent**", `!!distributeur R {nombre d'argent}`, false)
                .addField("**Retirer tout l'argent**", `!!distributeur R all`, false)
            return message.channel.send(embed3)
        }*/
    }
}