'use strict';
var io = require("socket.io");
var user = require("./user/user.js");
var room = require("./room/room.js");
// Chargement de index après connexion
var server = io.listen(8080);

// Init express
const express = require('express');
const bodyParser = require ('body-parser'); // Ce module body-parser analyse les données codées JSON
const cors = require('cors');
const app = express();

// Le fait que le client tourne sur le port 8000 et le serveur 3000 je dois ajouter ces éléments aux headers des requêtes
// See https://stackoverflow.com/questions/18642828/origin-origin-is-not-allowed-by-access-control-allow-origin
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

// Parse request to json
app.use(express.json());

app.use(cors());

/// ------------------------------
/// Socket
/// ------------------------------
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

/// ------------------------------
/// Express
/// ------------------------------

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// Init database module
require("./database/connection.js");
require("./database/routes.js")(app)

// Route de test
app.get('/', (req, res) => {
    res.json({"message": "Le serveur démarre et écoute le port 3000"});
});

app.listen(3000, () => {
    console.log("[INFO] Le serveur démarre et écoute le port 3000");
});