const fs = require('fs');
const Discord = require('discord.js');
const { constants } = require('fs');
const {MessageEmbed} = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const { prefix, token } = require('./config.json');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./Commandes').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./Commandes/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Bot Connecté');
    client.user.setActivity("Bot developpé par: Senku's Bizarre Adventure#0697, [BR] Cubix Gamer#7777 & MandoDB#0000")
});

client.on('messageCreate', message => {
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
        message.channel.send({embeds: [embed]})
    }
});

client.on('guildMemberUpdate', async (counter) => {

    const guild = client.guilds.cache.get("705487063377510451") 
    
    counterroleinscrit = guild.channels.cache.get("732666620232859782")//le channel qui compte les inscrits
    counterrolenon = guild.channels.cache.get("732667389740712007" )//le channel qui compte les non inscrits

    await guild.members.fetch()

    rolenombreinscrit = guild.roles.cache.get("720923318378823693")
    rolenombrenon = guild.roles.cache.get("720923326528225322")

    nombreinscrit = rolenombreinscrit.members.size
    nombrenon = rolenombrenon.members.size

    await counterroleinscrit.setName(`〘✅〙Inscrits : ${nombreinscrit}`)
    await counterrolenon.setName(`〘❌〙Non-Inscrits : ${nombrenon}`)
})

client.on('guildMemberAdd', async member => {
    const guild2 = client.guilds.cache.get("705487063377510451")
    const welcome = guild2.channels.cache.get("720923603859800084")
    const countergens1 = guild2.channels.cache.get("732539010358181960")

    const nouveaurole = guild2.roles.cache.get("720923324485599294")
    const noninscrit = guild2.roles.cache.get("720923326528225322")

    await guild2.members.fetch()

    welcome.send(`Yosh ${member} !!! Bienvenue sur Hunter X Hunter RP : Hunter's Legacy !\nC'est ici que commence ton aventure !!! Prépare tes bagages et soit prêt à vivre une aventure hors du commun !\nCommence par t'informer en regardant les salons infos, si tu as mal compris quelque chose le staff est là pour t'aider dans <#720923630573453353>.\nUne fois fait tu pourras taper la commande !start pour débuter ta grande histoire !!!\nhttps://tenor.com/view/hunter-xhunter-gon-killua-gif-18303674`)
    
    member.roles.add(nouveaurole)
    member.roles.add(noninscrit)

    nombregens = guild2.members.cache.filter(member => !member.user.bot).size;

    await countergens1.setName(`Membres : ${nombregens}`)

})

client.on('guildMemberRemove', async member => {
    const guild3 = client.guilds.cache.get("705487063377510451")
    const welcome = guild3.channels.cache.get("720923603859800084")
    const countergens2 = guild3.channels.cache.get("732539010358181960")

    await guild3.members.fetch()

    welcome.send(`**On dirait que ${member.user.tag} vient de nous quitté. Bonne continuation en espérant que notre serveur t'ai plu ^^ !!!**\nhttps://tenor.com/view/peace-hunterxhunter-smile-peace-sign-gif-13122038`)

    nombregens = guild3.members.cache.filter(member => !member.user.bot).size;

    await countergens2.setName(`Membres : ${nombregens}`)     
})


client.login(token);