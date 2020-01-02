let authorizedId ="Sélénium";
let authorizedPassword ="Test";
let authorizedId2 ="Poussière";
let authorizedPassword2 ="Poussière";
var io = require("socket.io");

module.exports = {

    userVerification: function(data,socket)
    {
        console.log(data);
        if((data.identifiant==authorizedId && data.password==authorizedPassword) || (data.identifiant==authorizedId2 && data.password==authorizedPassword2))
        {
            socket.pseudo=data.identifiant;
            socket.emit("nouveau_joueur", {identifiant: data.identifiant, password: data.password});
            socket.broadcast.emit("nouvel_adversaire", {identifiant: data.identifiant, password: data.password});
        }
    },

    userDisconnected:function(pseudo, socket){
        socket.broadcast.emit("deconnexion", pseudo);
        console.log("client disconnected from server ",pseudo);
    },
}
