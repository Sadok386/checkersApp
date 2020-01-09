'use strict';
var io = require("socket.io");
var user = require("./user/user.js");
var room = require("./room/room.js");
// Chargement de index après connexion
var server = io.listen(8080);

// Init express
const express = require('express');
const bodyParser = require ('body-parser'); // Ce module body-parser analyse les données codées JSON
const app = express();

// Add headers
app.use(function (res) {

    // Permet d'utiliser le localhost:8000 (client) car le serveur est lancé sur le port 3000
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Méthodes autorisées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
});

// Parse request to json
app.use(express.json());

// Init database module
require("./database/connection.js");
require("./database/routes.js")(app)

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

    socket.on("joinGame",function(){
        room.socketJoin(socket);
    })

    socket.on("updateGame",function(DepartX, DepartY, getX, getY){
        room.refresh(socket, DepartX, DepartY, getX, getY);
    })
});

/// ------------------------------
/// Express
/// ------------------------------

app.use(bodyParser.urlencoded({ extended: true }))

// Route de test
app.get('/', (req, res) => {
    res.json({"message": "Le serveur démarre et écoute le port 3000"});
});

app.listen(3000, () => {
    console.log("[INFO] Le serveur démarre et écoute le port 3000");
});