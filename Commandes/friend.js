const Discord = require('discord.js');
const canvas = require('canvas');

module.exports = {
    name: 'friend', //aliases amis, friends
    execute(message) {
        const friend = message.mentions.user.first()
        //si la length de l'array est plus grande que 4 
        if (message.mentions.users.size === 1){
            const friendid = friend.id 

            //on va enregistré l'id de l'utilisateur 

            //a la fin on met pas d'image paske l'objectif c'est d'ajouter quelqu'un en ami 
        } else {
            const friend1 = 0
            const friend2 = 0

            return //ici on mettra l'image canvas avec la liste des amis 
        }

    }
};