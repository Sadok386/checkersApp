//Fonction d'ajout de score
function AddScore(){             
    if (couleurPion =='white' || couleurPion =='queen'){
        whitePoint++
       console.log('Point blanc :' + whitePoint);
    }else if (couleurPion =='yellow' || couleurPion =='queenEnnemy'){
        yellowPoint++
        console.log('Point jaune :' + yellowPoint);
    }
}
//Fuction qui vérifie si nous avons un gagnant
function checkScore(){
    if(whitePoint == 15){
        console.log('white won the game')
    }
    else if (yellowPoint == 15){
        console.log("yellow won the game")
    }
}