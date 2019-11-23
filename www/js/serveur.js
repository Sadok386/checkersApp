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

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
});

//Vers le client
io.sockets.on('connection', function (socket) {
    socket.emit('message', 'POUSSIERE');

    //Lorsque le client envoie un "message"
    socket.on('message', function(message){
        console.log("Le message : " , message);
    })

    //Faire des broadcast pour communiquer avec plusieurs clients
    //Variables de session pour save des trucs

});


server.listen(8080);