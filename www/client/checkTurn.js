function checkTurnWhite(stopPositionRight, stopPositionLeft, stopPositionRightNext, stopPositionLeftNext, stopPositionRightX, stopPositionRightY, stopPositionLeftX,stopPositionLeftY){
    if(stopPositionRight!= null 
                            && stopPositionRight.className.baseVal =='yellow'
                            && stopPositionRightX.length<= tailleMax
                            && stopPositionRightY.length<= tailleMax
                            && stopPositionRightNext != null
                            && stopPositionRightNext.className.baseVal == 'playableCell'
                            ||
                            stopPositionLeft!= null 
                            && stopPositionLeft.className.baseVal =='yellow'
                            && stopPositionLeftX.length <= tailleMax
                            && stopPositionLeftY.length <= tailleMax 
                            && stopPositionLeft != null
                            && stopPositionLeftNext.className.baseVal == 'playableCell' 
    ){
        return true;
        
    }

    

}

function checkTurnYellow(stopPositionRight, stopPositionLeft, stopPositionRightNext, stopPositionLeftNext, stopPositionRightX, stopPositionRightY, stopPositionLeftX,stopPositionLeftY){
    if(stopPositionRight!= null 
                            && stopPositionRight.className.baseVal =='white' 
                            && stopPositionRightX.length<= tailleMax
                            && stopPositionRightY.length<= tailleMax
                            && stopPositionRightNext != null
                            && stopPositionRightNext.className.baseVal == 'playableCell'
                            ||
                            stopPositionLeft!= null 
                            && stopPositionLeft.className.baseVal =='white' 
                            && stopPositionLeftX.length <= tailleMax
                            && stopPositionLeftY.length <= tailleMax 
                            && stopPositionLeftNext != null
                            && stopPositionLeftNext.className.baseVal == 'playableCell' 
    ){
        return true;
    }

}