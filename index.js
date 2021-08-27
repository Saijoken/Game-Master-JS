const fs = require('fs');
const Discord = require('discord.js');
const { constants } = require('fs');
const {MessageEmbed} = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const { prefix, token } = require('./config.json');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./Commandes').filter(file => file.endsWith('.js'));

for (const file of commandFiles)    {
    const command = require(`./Commandes/${file}`);
    client.commands.set(command.name, command, {
        aliases: command.aliases,
    })
}

client.on('ready', () => {
    console.log('Bot Connecté');
    client.user.setActivity("Bot dev par: Senku's Bizarre Adventure#0697 & [BR] Cubix Gamer#7777")
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (!client.commands.has(command)) return;
    if (command != client.commands.get(client.aliases.get(command))) return

    try {
        client.commands.get(command).execute(message, args) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    } catch (error) {
        console.error(error);
        const embed = new MessageEmbed()
            .setTitle(`:warning: Une erreur est survenue :warning:`)
            .setColor('#E81224')
        message.channel.send({embeds: [embed]})
    }
});


client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.content.includes("discord.gg/") || message.content.includes("Discord.gg/") || message.content.includes("https://discord.gg/") || message.content.includes("https://Discord.gg/") || message.content.includes("http://discord.gg/") || message.content.includes("http://Discord.gg/")) {
        if (!message.member.roles.cache.some(role => role.name === 'Administrateur')) {
            message.channel.bulkDelete(1)
            const embedpub = new MessageEmbed()
                .setTitle(":x: | Tu n'as pas assez de charisme pour poster de la pub.")
                .setColor('#E81224')
                .setFooter("... C'est que pour les partenariats : Lien d'invitation")
                message.author.send({embeds: [embedpub]})
        }
    }
})

client.login(token);
