let authorizedId ="Sélénium";
let authorizedPassword ="Test";
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
            socket.emit("nouveau_Compte", {identifiant: data.identifiant, password: data.password},"Un compte vient de vous être crée avec ses identifiants");
            socket.broadcast.emit("nouvel_adversaire", {identifiant: data.identifiant, password: data.password});
        }
    },

    userDisconnected:function _DéconnexionClient(pseudo, socket){
        if(pseudo != undefined)
            socket.broadcast.emit("deconnexion", pseudo);
    },
}
