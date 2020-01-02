function AddScore(){
                
    if (couleurPion =='rose'){
        pinkPoint++
       
    }else(
        greenPoint++
    )
}
function checkScore(){
    if(pinkPoint == 15){
        console.log('Pink won the game')
    }
    else if (greenPoint == 15){
        console.log("Green won the game")
    }
}