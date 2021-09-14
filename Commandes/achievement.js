const Discord = require('discord.js');

module.exports = {
    name: 'achievement', //aliases success, exploit, exploits
    execute(message) {
        //ici faudra mettre une table contenant des tas de données dans la bdd du type : table success qui a une liste du type 
        //                                                                               1  "Combattant des ténèbres :\nAvoir rejoint une organisation criminelle"
        //                                                                               2  "Grand Explorateur :\nAvoir exploré une zone encore jamais exploré par aucun Hunter auparavant"
        //                                                                               3  "Expert Culinaire :\nAvoir rempli le gourmet book" 
        //                                                                               4  "La véritable essence d'un Hunter :\nObtenir le Nen"

        //et genre exemple membre 1 a comme donnée [1]
        //                 membre 2 a comme donnée [4,3] ici on affiche le succes 4 avant le 3    (comme il a obtenu le 4 avant le 3)
        //                 membre 3 a comme donnée [2,4] ici on affiche le succes 2 avant le 4    (comme il a obtenu le 2 avant le 4)

        //ducoup on affichera les succès dans l'ordre où ils ont été obtenus et pour ça on utilisera la méthode ci dessous 

        message.channel.send("Voici la liste de vos exploits et succès accomplis :")

        //get le premier nombre de la liste 
            //si le premier numéro de la liste n'existe pas (s'il a aucun succès faire un return en gros)
            //renvoyer le succès associé au premier numéro de la liste depuis la db

        //get le deuxième nombre de la liste
            //si le 2ème numéro de la liste n'existe pas faire un return
            //renvoyer le succès associé au deuxième numéro de la liste depuis la db

        //get le troisième nombre de la liste
            //si le 3ème numéro de la liste n'existe pas faire un return
            //renvoyer le succès associé au troisième numéro de la liste depuis la db
        
        //etc etc 
        
        //on pourra simplifier ça avec une boucle jpense c plus simple genre on renommera avec des noms de variables success1 success2 
        //et on fera une boucle avec incrementation et le numero de variable changera a chaque boucle


    }
};