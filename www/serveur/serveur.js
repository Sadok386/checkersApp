var io = require("socket.io");
var user = require("./user/user.js");
// Chargement de index après connexion
var server = io.listen(8080);

console.log("Test");
server.on("connection", function(socket){
    console.log("Connection");

    socket.on("nouveau_joueur", function(data){
        user.userVerification(data,socket);
    })

    socket.on("disconnect", function(){
        console.log("dans le disconnect côté serveur ",socket.pseudo);
        user.userDisconnected(socket.pseudo,socket);
    })

});



/*
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

    

    //Faire des broadcast pour communiquer avec plusieurs clients
    //Variables de session pour save des trucs

    socket.on("disconnect", function(){
        socket.broadcast.emit("deconnexion", socket.pseudo);
        console.log("client disconnected from server", socket.pseudo);
    });

});



server.listen(8080); */