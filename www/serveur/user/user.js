let authorizedId ="lol";
let authorizedPassword ="lol";
let authorizedId2 ="Poussière";
let authorizedPassword2 ="Poussière";
let authorizedId3 ="test";
let authorizedPassword3 ="test";
var io = require("socket.io");

let listJoueur = []

module.exports = {

    //Ce que je dois faire
    //Si un mec connu se reco on lui redonne son id qui est censé être dans une liste

    userVerification: function _VérificationUtilisateur(data,socket)
    {
        //En théorie rechercher dans la BDD si il existe si oui on lui redonne son id?
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
            listJoueur.push({Identifiant: socket.id, Nom:data.identifiant});
        }
    },

    userDisconnected:function _DéconnexionClient(pseudo, socket){
        if(pseudo != undefined)
            socket.broadcast.emit("deconnexion", pseudo);
    },
}
