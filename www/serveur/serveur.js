var io = require("socket.io");
var user = require("./user/user.js");
var room = require("./room/room.js");
// Chargement de index après connexion
var server = io.listen(8080);

const database = require("./database/connection.js")

server.on("connection", function(socket){

    socket.on("nouveau_joueur", function(data){
        user.userVerification(data,socket);
    })

    socket.on("disconnect", function(){
        user.userDisconnected(socket.pseudo,socket);
        room.userDisconnected(socket);
    })

    socket.on("joinGame",function(){
        room.socketJoin(socket);
    })

    socket.on("updateGame",function(DepartX, DepartY, getX, getY){
        room.refresh(socket, DepartX, DepartY, getX, getY);
    })
});