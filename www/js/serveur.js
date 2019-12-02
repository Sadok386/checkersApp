var http = require('http');
var fs = require('fs');

// Chargement de index après connexion
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

let authorizedId ="Sélénium";
let authorizedPassword ="Test";
let authorizedId2 ="Poussière";
let authorizedPassword2 ="Poussière";

// Quand un client se connecte, on le note dans la console et on envoie un message
io.sockets.on('connection', function (socket,pseudo) {
    
    console.log('Un client est connecté !');
    //socket.emit('message', 'POUSSIERE');

    //Envoie un message aux autres session
    //socket.broadcast.emit('message', 'Une autre session en même temps');

    //Lorsque le client envoie un "message"
    socket.on('message', function(message){
        console.log(socket.pseudo, " Le message : " , message);
    })

    socket.on("nouveau_joueur", function(data){
        if((data.identifiant==authorizedId && data.password==authorizedPassword) || (data.identifiant==authorizedId2 && data.password==authorizedPassword2))
        {
            socket.pseudo=data.identifiant;
            socket.emit("nouveau_joueur", {identifiant: data.identifiant, password: data.password});
            socket.broadcast.emit("nouvel_adversaire", {identifiant: data.identifiant, password: data.password});
        }
    })

    //Faire des broadcast pour communiquer avec plusieurs clients
    //Variables de session pour save des trucs

    socket.on("disconnect", function(){
        socket.broadcast.emit("deconnexion", socket.pseudo);
        console.log("client disconnected from server", socket.pseudo);
    });

});



server.listen(8080);