'use strict';
var io = require("socket.io");
var user = require("./user/user.js");
var room = require("./room/room.js");
// Chargement de index après connexion
var server = io.listen(8080);

var http = require( "http" ),
    pathUtils = require( "path" ),
    express = require( "express" ),
    app = express(),
    PORT = process.env.PORT || 8080,
    appDir = pathUtils.resolve( __dirname, "client" );

app.use( express.static( appDir ) );

app.get( "*", function( req, res ) {
    res.sendfile( pathUtils.resolve( appDir, "index.html" ) );
} );

http.createServer( app ).listen( PORT, function() {
    console.log( "Express server listening on port " + PORT );
    console.log( "http://localhost:" + PORT );
} );

server.on("connection", function(socket){

    socket.on("nouveau_joueur", function(data){
        user.userVerification(data,socket);
    })

    socket.on("disconnect", function(){
        user.userDisconnected(socket.pseudo,socket);
        room.userDisconnected(socket);
    })

    socket.on("JoueurGagnant", function(){
        room.joueurGagnant(socket);
    })

    socket.on("joinGame",function(){
        room.socketCheck(socket);
        //room.socketJoin(socket);
    })

    socket.on("checkRagequit", function(){
        room.checkForLeaver(socket);
    })

    socket.on("Surrender",function(){
        console.log("ooooh");
        room.socketSurrend(socket);
    })

    socket.on("getList", function(){
        room.getListRoom();
    })

    socket.on("updateGame",function(DepartX, DepartY, getX, getY, mangeX, mangeY, boardGame, makeQueen, changeQueenClass, turn){
        room.refresh(socket, DepartX, DepartY, getX, getY, mangeX, mangeY, boardGame, makeQueen, changeQueenClass, turn);
    })
});