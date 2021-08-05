const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const imgur = require('imgur');

module.exports = {
    name: 'test',
    execute(message) {      
        message.channel.send("Hello");
        setTimeout(() => { message.channel.send("World!"); }, 2000);
        message.channel.send("Goodbye!");

    /*
    const user = message.author
    message.channel.send("**Histoire ? (max 2000 caractères)**").then(function (message) {
        message.channel.awaitMessages(message => user.id === message.author.id, {max: 1, time: 120000}).then(collected5 => {
            if (collected5.first().content.length <= 2000) {
                message.channel.send("Bon âge")
            } else {
                message.channel.send("Merci de donner une histoire inférieur à 2000 caractères\nMerci de recommencer")
                return
            }
        })
    })
    */
   
        /*
        const user = message.author
        message.channel.send("**Pour mieux voir les choses donne moi une image du visage de ton personnage.**").then(function (message) {
            message.channel.awaitMessages(message => user.id === message.author.id, {max: 1, time: 120000}).then(collected3 => {
                const imageurl = collected3.first().attachments.first().url

                if (imageurl.endsWith(".png") || imageurl.endsWith(".jpeg") || imageurl.endsWith(".jpg") || imageurl.endsWith(".webp")) {
                    message.channel.send("Sauvegarde de l'image en cours ...")
                    imgur
                        .uploadUrl(imageurl)
                        .then((json) => {
                            message.channel.bulkDelete(1)
                            var imgurlink = json.link
                            message.channel.send(imgurlink)
                        }).catch((err) => {
                            console.error(err.message);
                        });
                } else {
                    message.channel.send("Merci de donner une image non animé\nMerci de recommencer")
                    return
                }
            })
        })
        */
    }
}