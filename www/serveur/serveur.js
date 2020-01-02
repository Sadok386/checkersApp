var io = require("socket.io");
var user = require("./user/user.js");
var room = require("./room/room.js");
// Chargement de index après connexion
var server = io.listen(8080);

server.on("connection", function(socket){
    console.log("Connection");

    socket.on("nouveau_joueur", function(data){
        user.userVerification(data,socket);
    })

    socket.on("disconnect", function(){
        user.userDisconnected(socket.pseudo,socket);
    })

    socket.on("joinGame",function(){
        room.socketJoin(socket);
    })

    socket.on("updateGame",function(){
        console.log("Je m'update");
        room.updateGame(socket);
    })
});