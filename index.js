const fs = require('fs');
const Discord = require('discord.js');
const { constants } = require('fs');
const {MessageEmbed} = require('discord.js');
const client = new Discord.Client();

const { prefix, token } = require('./config.json');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./Commandes').filter(file => file.endsWith('.js'));

for (const file of commandFiles)    {
    const command = require(`./Commandes/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Bot Connecté');
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'le Comeback du bot en force ft. un nouveau dev',
        }
    })
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        const embed = new MessageEmbed()
            .setTitle(`:warning: Une erreur est survenue :warning:`)
            .setColor('#E81224')
        message.channel.send(embed)
    }
});


client.on('message', message => {
    if (message.content.startsWith("discord.gg") || message.content.startsWith("Discord.gg") || message.content.startsWith("https://discord.gg") || message.content.startsWith("https://Discord.gg")) {
        if (!message.member.roles.cache.some(role => role.name === 'Administrateur')) {
            message.channel.bulkDelete(1)
            const embedpub = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour poster de la pub. ")
                .setColor('#E81224')
                .setFooter("... C'est que pour les partenaires : Lien d'invitation")
            message.author.send(embedpub)
        }
    }
})

/*
client.on('guildMemberAdd', client => {
    async function asyncCall() {
        const guild = await client.guilds.cache.get('705487063377510451')
        const channelid = '866084781485981696'
        const updateMembersRemove = (guild) => {
            const channel = guild.channels.cache.get(channelid)
            channel.setName(`Membres: ${memberCount.toLocaleString()}`)
        }
        updateMembersRemove(guild)
    }
    asyncCall()
})

client.on('guildMemberRemove', client => {
    async function asyncCall() {
        const guild = await client.guilds.cache.get('705487063377510451')
        const channelid = '866084781485981696'
        const updateMembersRemove = (guild) => {
            const channel = guild.channels.cache.get(channelid)
            channel.setName(`Membres: ${memberCount.toLocaleString()}`)
        }
        updateMembersRemove(guild)
    }
    asyncCall()
})
*/


client.login(token);