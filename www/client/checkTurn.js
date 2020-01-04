function checkTurnPink(stopPositionRight, stopPositionLeft, stopPositionRightNext, stopPositionLeftNext, stopPositionRightX, stopPositionRightY, stopPositionLeftX,stopPositionLeftY){
    if(stopPositionRight!= null 
                            && stopPositionRight.className.baseVal =='vert'
                            && stopPositionRightX.length<= tailleMax
                            && stopPositionRightY.length<= tailleMax
                            && stopPositionRightNext != null
                            && stopPositionRightNext.className.baseVal == 'playableCell'
                            ||
                            stopPositionLeft!= null 
                            && stopPositionLeft.className.baseVal =='vert'
                            && stopPositionLeftX.length <= tailleMax
                            && stopPositionLeftY.length <= tailleMax 
                            && stopPositionLeft != null
                            && stopPositionLeftNext.className.baseVal == 'playableCell' 
    ){
        return true;
        
    }
    console.log(stopPositionRight)
    console.log(stopPositionRightNext)
    console.log(stopPositionLeft)
    console.log(stopPositionLeftNext)
    

}

function checkTurnGreen(stopPositionRight, stopPositionLeft, stopPositionRightNext, stopPositionLeftNext, stopPositionRightX, stopPositionRightY, stopPositionLeftX,stopPositionLeftY){
    if(stopPositionRight!= null 
                            && stopPositionRight.className.baseVal =='rose' 
                            && stopPositionRightX.length<= tailleMax
                            && stopPositionRightY.length<= tailleMax
                            && stopPositionRightNext != null
                            && stopPositionRightNext.className.baseVal == 'playableCell'
                            ||
                            stopPositionLeft!= null 
                            && stopPositionLeft.className.baseVal =='rose' 
                            && stopPositionLeftX.length <= tailleMax
                            && stopPositionLeftY.length <= tailleMax 
                            && stopPositionLeftNext != null
                            && stopPositionLeftNext.className.baseVal == 'playableCell' 
    ){
        return true;
    }
    console.log(stopPositionRight)
    console.log(stopPositionRightNext)
    console.log(stopPositionLeft)
    console.log(stopPositionLeftNext)
    console.log(stopPositionRight!= null 
                            && stopPositionRight.className.baseVal =='vert' 
                            && stopPositionRightX.length<= tailleMax
                            && stopPositionRightY.length<= tailleMax
                            && stopPositionRightNext != null
                            && stopPositionRightNext.className.baseVal == 'playableCell'
                            ||
                            stopPositionLeft!= null 
                            && stopPositionLeft.className.baseVal =='vert' 
                            && stopPositionLeftX.length <= tailleMax
                            && stopPositionLeftY.length <= tailleMax 
                            && stopPositionLeftNext != null
                            && stopPositionLeftNext.className.baseVal == 'playableCell' )
}