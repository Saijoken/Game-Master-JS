module.exports = {
    name: 'ping',
    execute(message) {
        message.channel.send("Calcul du ping ...").then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            message.channel.bulkDelete(1)
            message.channel.send(`:ping_pong: **Pong : ${ping}ms**`)
        })
    }
}