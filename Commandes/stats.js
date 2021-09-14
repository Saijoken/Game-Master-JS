const db = require('quick.db')
const Discord = require('discord.js')
const attaque = new db.table("Attaque")
const defense = new db.table("Defense")
const pv = new db.table("PV")
const pvmax = new db.table("PV_Max")
const fichenen  = new db.table("Nen")

module.exports = {
    name: 'stats', //aliases stat, statistiques, statistique
    execute(message) {
        let user = message.mentions.members.first() || message.author;
        let attaque2 = attaque.fetch(`attaque_${message.guild.id}_${user.id}`)
        let defense2 = defense.fetch(`defense_${message.guild.id}_${user.id}`)
        let pv2 = pv.fetch(`pv_${message.guild.id}_${user.id}`)
        let pvmax2 = pvmax.fetch(`pvmax_${message.guild.id}_${user.id}`)
        let nen2 = fichenen.fetch(`fichenen_${message.guild.id}_${user.id}`)
        if (attaque2 === null) attaque2 = 0
        if (defense2 === null) defense2 = 0
        if (pv2 === null) pv2 = 0
        if (pvmax2 === null) pvmax2 = 0

        if(message.mentions.users.size === 1)   {
            message.channel.send(`**Voici les statistiques de ${message.mentions.members.first()} :**\n⚔️ Attaque = ${attaque2}\n🛡️ Défense = ${defense2}\n❤️ Point de vie = ${pv2}/${pvmax2}\n✨ Nen = ${nen2}`)
        } else {
            message.channel.send(`**Voici vos statistiques elles évolueront en fonction de votre niveau et experience en combat donc entrainez-vous et donnez votre maximum pour les augmenter :**\n⚔️ Attaque = ${attaque2}\n🛡️ Défense = ${defense2}\n❤️ Point de vie = ${pv2}/${pvmax2}\n✨ Nen = ${nen2}`)
        }
    }
}