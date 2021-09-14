const Discord = require('discord.js'); //COMMANDE REALISE ENTIEREMENT PAR MANDO
const clc = require('cli-color');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'clear',
    execute(message, args) {
      if(!message.member.permissions.has("MANAGE_MESSAGES")) {
        const user = message.author;

        var error_permissions = new Discord.MessageEmbed()
          .setDescription(`Tu ne disposes pas des permissions nécessaires pour clear les messages !  `)
          .setColor("#E81224")

        message.channel.send({embeds: [error_permissions]})

      } else {

        let args = message.content.split(/ +/g);

        if(args[1]) {

          if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 100) {

            message.channel.bulkDelete(args[1]++, true).then(collection => {

            var delete_message_ok = new Discord.MessageEmbed()

              .setDescription(`**${collection.size} messages** ont été supprimés !  <:syntax:880275046009032784>`)
              .setColor("#E81224")

            message.channel.send({embeds: [delete_message_ok]}).then(message => {

              setTimeout(() => {
                message.delete().catch(() => {
                  console.log(clc.yellowBright("Message à supprimer invalide"))
                })
              },5000)

            })

            })
    
          } else {

          const user = message.author

          var error_num = new Discord.MessageEmbed()
            .setDescription(`Ton nombre doit être compris entre 1 et 99 !  <:syntax:880275046009032784>`)
            .setColor("#E81224")
            
          message.channel.send({embeds: [error_num]}).then(message => {

            setTimeout(() => {
              message.delete().catch(() => {   
                  console.log(clc.yellowBright("Message à supprimer invalide"))
                })
            },10000)

          })

          };
    
        } else {

          const user = message.author

          var error_num = new Discord.MessageEmbed()
            .setDescription(`Le nombre de messages à supprimer doit être compris entre 1 et 99 ! `)
            .setColor("#E81224")

          message.channel.send({embeds: [error_num]}).then(message => {

            setTimeout(() => {
              message.delete().catch(() => {
                console.log(clc.yellowBright("Message à supprimer invalide"))
              })
            },10000)

          })

        };
        
      };
    } 
}