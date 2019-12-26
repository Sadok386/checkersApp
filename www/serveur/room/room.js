var io = require("socket.io");

module.exports = {
    socketJoin: function _socketJoinGame(socket)
    {
        for(var i=0; i<10; i++)
        {
            //Si la room est vide (undefined) ou ne contient qu'une personne on rentre sinon, on choisit une autre room
            //On ne peut pas .length si Undefined
            if(socket.adapter.rooms['room'+i]==undefined)
            {
                console.log("La room n'est pas encore créé");
                socket.join("room"+i);
                socket.emit('nouveauArticle',socket.id);
                socket.emit('showGame');
                //io.sockets.in(nom de la salle).emit(...) Renvoie à tout le monde y comrpris le client courant
                break;
            }
            //Si la room existe on vérifie qu'elle n'est pas plein sinon elle cherchera une autre room
            else
            {
                if(socket.adapter.rooms['room'+i].length<2)
                {
                    socket.join("room"+i);
                    socket.emit('nouveauArticle',socket.id);
                    socket.to("room"+i).emit('message',socket.id);
                    socket.emit('showGame');
                    break;
                }
            }
        }
        console.log("Les chambres", socket.adapter.rooms);
        //Changer la visibilité de certains items pour permettre le jeu et l'interraction user/model/user
    },

    updateGame: function _updateGame(socket)
    {
        var currentRoom = Object.keys(socket.rooms).filter(item => item!=socket.id);
        socket.in(currentRoom).emit('modificationJeu', socket.id);
    },
}