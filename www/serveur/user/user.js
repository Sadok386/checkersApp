let authorizedId ="lol";
let authorizedPassword ="lol";
let authorizedId2 ="Poussière";
let authorizedPassword2 ="Poussière";
let authorizedId3 ="test";
let authorizedPassword3 ="test";
var io = require("socket.io");

module.exports = {

    userVerification: function _VérificationUtilisateur(data,socket)
    {
        if((data.identifiant==authorizedId && data.password==authorizedPassword) || (data.identifiant==authorizedId2 && data.password==authorizedPassword2) || (data.identifiant==authorizedId3 && data.password==authorizedPassword3))
        {
            socket.pseudo=data.identifiant;
            socket.emit("nouveau_joueur", {identifiant: data.identifiant, password: data.password});
            socket.broadcast.emit("nouvel_adversaire", {identifiant: data.identifiant, password: data.password});
        }
        else
        {
            //Créer un nouvel utilisateur??????????
            socket.emit("error","Erreur dans l'identifiant ou le mdp");
        }
    },

    userDisconnected:function _DéconnexionClient(pseudo, socket){
        socket.broadcast.emit("deconnexion", pseudo);
        console.log("client disconnected from server ",pseudo);
    },
}
