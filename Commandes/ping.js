const clc = require('cli-color');
module.exports = {
    name: 'ping',
    execute(message) {
        message.channel.send("Calcul du ping en cours... <a:izukuhype:721399731326287954>").then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            message.channel.bulkDelete(1).catch(err => {
                console.log(clc.yellowBright('Message à supprimer invalide'))
            })
            message.channel.send(`:ping_pong: **Pong : ${ping}ms**`)
        })
    }
}