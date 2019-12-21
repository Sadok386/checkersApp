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
                socket.emit('message',socket.id);
                socket.to("room"+i).emit('message',socket.id);
                break;
            }
            //Si la room existe on vérifie qu'elle n'est pas plein sinon elle cherchera une autre room
            else
            {
                if(socket.adapter.rooms['room'+i].length<2)
                {
                    socket.join("room"+i);
                    socket.emit('message',socket.id);
                    socket.to("room"+i).emit('message',socket.id);
                    break;
                }
            }
        }
        console.log("Les chambres", socket.adapter.rooms);
    }
}