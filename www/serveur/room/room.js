var io = require("socket.io");
var game = require("../../client/plateau");

//Liste des Rooms en cours d'utilisation
let listRoom = [];


function localAddToList(nomRoom ,socketId1, socketId2)
{
    let roomtest = {nomPiece: nomRoom,J1: socketId1,J2: socketId2};
    let objRoom = Object.create(roomtest);
    listRoom.push(objRoom);
    console.log("La liste des rooms des test : ",listRoom[0].nomPiece);
}

function localGetListRoom()
{
    return listRoom;
}

function socketJoinGame(socket)
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
                var currentRoom = Object.keys(socket.rooms);
                console.log("current room : ",currentRoom);
                

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
                    socket.to("room"+i).emit('createSVG', socket.id);

                    //Récupération des informations des deux sockets de la room
                    let roomInformation = socket.adapter.rooms['room'+i].sockets;
                    let roomInformation1 = Object.keys(roomInformation)[0];let roomInformation2 = Object.keys(roomInformation)[1];

                    //Ajout des sockets et de la room à la liste des rooms en cour de fonctionnement
                    localAddToList('room'+i, roomInformation1, roomInformation2);
                    localGetListRoom();
                    break;
                }
            }
        }
    }

module.exports = {

    getListRoom:function localGetListRoom()
    {
        console.log("La liste ds rooms : ", listRoom );
        return listRoom;
        
    },

    socketCheck: function _CheckSocketAlreadyInRoom(socket)
    {
        if(listRoom.length != 0){
            for(let i=0; i<listRoom.length; i++)
            {
                if(socket.id == listRoom[i].J1 || socket.id == listRoom[i].J2)
                {
                    //On lui fait rejoindre la room donc
                    socket.join(listRoom[i].nomPiece);
                    break;
                }
                else{
                    socketJoinGame(socket);
                }
            }
        }
        else{
            socketJoinGame(socket);
        }
    },
    /**
     * If a player surrond, we tell the other that he won and display the menu
     * @param {*} socket 
     */
    socketSurrend: function _SocketSurrend(socket)
    {
        for(let i=0; i<listRoom.length; i++)
            {
                if(socket.id == listRoom[i].J1 || socket.id == listRoom[i].J2)
                socket.to(listRoom[i].nomPiece).emit('messageGagnant'," Vous avez gagné");
                socket.emit('gameFinished');
                socket.to(listRoom[i].nomPiece).emit('gameFinished');
                //On retire la Partie de la liste des rooms utilisées
                listRoom.splice(i);
            }
    },

    /**
     * Get all the people from a room
     * @param {*} socket 
     */
    updateGame: function _updateGame(socket)
    {
        //Récupération des personnes dans la room de la socket
        var currentRoom = Object.keys(socket.rooms).filter(item => item!=socket.id);
        socket.in(currentRoom).emit('modificationJeu', socket.id);
    },

    refresh: function _refreshGame(socket,pionStartX, pionStartY,pionEndX,pionEndY, mangeX, mangeY, board, makeQueen, changeQueenClass)
    {
        var element = game.se
        var currentRoom = Object.keys(socket.rooms).filter(item => item!=socket.id);
        socket.in(currentRoom).emit('refreshGame', socket.id, pionStartX, pionStartY,pionEndX,pionEndY, mangeX, mangeY, board, makeQueen, changeQueenClass);
    },

    checkForLeaver: function _CheckForLeaver(socket)
    {
        
        var currentRoom = Object.keys(socket.rooms).filter(item => item!=socket.id);
        if(socket.adapter.rooms[currentRoom])
        {
            //Recherche un groupe dans la liste qui à l'id qu'on à là puis on détruit la room
            for(let i=0; i<listRoom.length; i++)
            {
                if(listRoom[i].J1 == socket.id || listRoom[i].J2 == socket.id)
                {
                    if(socket.adapter.rooms[currentRoom].length != 2)
                    {
                        socket.emit("messageGagnant","Votre adversaire s'est déconnecté depuis trop longtemps")
                        socket.emit('gameFinished');
                        console.log("le current room : ", currentRoom);
                        listRoom.splice(i);
                    }
                }
            }
        }
        //if(socket.adapter.rooms['room'+i].length<2)
    },


    /**
     * Check if a user is in a room
     * @param {*} socket 
     */
    userDisconnected: function _CheckUserInRoom(socket)
    {
        //Récupération des personnes dans la room de la socket
        var currentRoom = Object.keys(socket.rooms).filter(item => item!=socket.id);
        //Si la socket est dans une room on met un interval et l'appel d'une autre fonction similaire à surrend sinon rien
        /*for(let i=0; i<listRoom.length; i++)
            {
                if(socket.id == listRoom[i].J1 || socket.id == listRoom[i].J2)//Il est donc dans une room
                setTimeout(ragequit(socket, listRoom[i].nomPiece), 50);
            }*/

    },
}

//setInterval(function() { ragequit("test");}, 5000) ;

//setInterval(ragequit, 10000);

/*
function ragequit()
{
    
}*/


//Faire une fonction qui vérifie que les rooms sont bien remplis si l'une des rooms remplis ne l'ai plus lancé le setTimeout