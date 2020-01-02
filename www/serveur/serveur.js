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

    socket.on("updateGame",function(DepartX, DepartY, getX, getY){
        console.log("Je m'update à partir de la modif d'un pion: ",DepartX, DepartY, getX, getY);
        //room.updateGame(socket);
        room.refresh(socket, DepartX, DepartY, getX, getY);
    })
});