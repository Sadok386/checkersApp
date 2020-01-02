
var selectedElement = null;
var prevElement = null;
var currentX = 0;
var currentY = 0;
pinkPoint = 0
greenPoint = 0
var changeTurn = false;
var startPositionCx;
var startPositionCy;
var selectPion;

   function registercb(){
       
    var d = document.createElementNS(svgns, "rect")
            d.setAttributeNS(null, "x", 0)
            d.setAttributeNS(null, "y", 0)
            d.setAttributeNS(null, 'height', '80');
            d.setAttributeNS(null, 'width', '80');
            d.setAttributeNS(null, 'fill', 'orange');
            d.setAttribute("class", "dame");
      var startPositionCx = 0
      var startPositionCy = 0
      var stopPositionCx = 0
      var stopPositionCy = 0

      var a = document.getElementById("svg");
    console.log(a.childNodes);
      boardArray = Array.prototype.slice.call(a.childNodes);
            r = boardArray.slice(0,99)
            p = boardArray.slice(100,130)
            
            var gameBoard = [
            [p[0], r[1], p[1], r[3], p[2], r[5], p[3], r[7], p[4], r[9]],
            [r[11], p[5], r[13], p[6], r[15], p[7], r[17], p[8], r[19] ,p[9]],
            [p[10], r[21], p[11], r[23], p[12], r[25], p[13], r[27], p[14], r[29]],
            [r[30], r[31], r[32], r[33], r[34], r[35], r[36], r[37], r[38], r[39]],
            [r[40], r[41], r[42], r[43], r[44], r[45], r[46], r[47], r[48], r[49]],
            [r[50], r[51], r[52], r[53], r[54], r[55], r[56], r[57], r[58], r[59]],
            [r[60], r[61], r[62], r[63], r[64], r[65], r[66], r[67], r[68], r[69]],
            [r[70], p[15], r[72], p[16], r[74], p[17], r[76], p[18], r[78], p[19]],
            [p[20], r[81], p[21], r[83], p[22], r[85], p[23], r[87], p[24], r[89]],
            [r[90], p[25], r[92], p[26], r[94], p[27], r[96], p[28], r[98], p[29]],
        
        ]; console.log(gameBoard)
        tailleMax = gameBoard.length;
        p[16].setAttribute ('class','queen')
        p[16].setAttribute("fill", 'blue');
        $("#svg > circle").bind('touchstart mousedown',function (e) {

          
       
//get the inner DOM of alpha.svg

            // boardArraySliced.forEach((item, index) => {
            // console.log(index);
            
            // })
          console.log("ici")
            // save the original values
            currentX = e.clientX || e.touches[0].pageX ;
            currentY = e.clientY || e.touches[0].pageY;
            selectedElement = e.target;
            selectPion = selectedElement;
            startPositionCx = Math.floor(parseInt(selectedElement.cx.baseVal.value)/70)
            startPionPositionCx = startPositionCx;
            startPositionCy = Math.floor(parseInt(selectedElement.cy.baseVal.value)/70)
            startPionPositionCy = startPositionCy;
            startPositionCxPixel =  parseInt(selectedElement.getAttribute("cx"))
            startPositionCyPixel =   parseInt(selectedElement.getAttribute("cy"))
        }).bind('touchmove mousemove',function (e) {    
            // if there is an active element, move it around            
            if (selectedElement) {
                var dx = parseInt(selectedElement.getAttribute("cx")) + (e.clientX || e.touches[0].pageX) - currentX;
                var dy = parseInt(selectedElement.getAttribute("cy")) + (e.clientY || e.touches[0].pageY) - currentY;
                currentX = e.clientX || e.touches[0].pageX ;
                currentY = e.clientY || e.touches[0].pageY;
                selectedElement.setAttribute("cx", dx);
                selectedElement.setAttribute("cy", dy);
               
            }
        }).bind('touchend mouseup',function (e) {

            
            stopPositionCx = Math.floor(parseInt(selectedElement.cx.baseVal.value)/70);
            stopPositionCy = Math.floor(parseInt(selectedElement.cy.baseVal.value)/70);

            lastX = startPositionCx;
            lastY = startPositionCy;

            couleurPion = selectedElement.className.baseVal;
            stopPositionCxPixel =  parseInt(selectedElement.getAttribute("cx"))
            stopPositionCyPixel =   parseInt(selectedElement.getAttribute("cy"))

            finalX = stopPositionCxPixel;
            finalY = stopPositionCyPixel;

            console.log('startPositionCx : '+startPositionCx, 'startPositionCy : '+startPositionCy)
            // deactivate element after setting it into its new location
            
           
            console.log(gameBoard)
            function checkQueenPink(){
                checkQueenR = gameBoard[startPositionCy-2][startPositionCx-1] 
                    checkQueenL = gameBoard[startPositionCy-2][startPositionCx+3]
                    if((checkQueenR == r[1] || checkQueenR == r[3]|| checkQueenR == r[5] || checkQueenR == r[7] || checkQueenR==r[9]) 
                    || (checkQueenL == r[1]|| checkQueenL== r[3]|| checkQueenL == r[5]|| checkQueenL==r[7] || checkQueenL==r[9])){
                        console.log('CREER DAME')
                        selectedElement.setAttribute("class", 'queen');
                        selectedElement.setAttribute("fill", 'blue');

                    }
            }
            function checkQueenGreen(){
                checkQueenR = gameBoard[startPositionCy+2][startPositionCx-3] 
                    checkQueenL = gameBoard[startPositionCy+2][startPositionCx+1]
                    if((checkQueenR == r[90] || checkQueenR == r[92]|| checkQueenR == r[94] || checkQueenR == r[96] || checkQueenR==r[98]) 
                    || (checkQueenL == r[90]|| checkQueenL== r[92]|| checkQueenL == r[94]|| checkQueenL==r[96] || checkQueenL==r[98])){
                        console.log('CREER DAME')
                    }
            }

            function queenProcess(){
                if(couleurPion =='queen'){
                    console.log('Queen pos: ' +stopPositionCx +stopPositionCy)
                    for(var i = 0; i < tailleMax; i++){
                        for (var j = 0; j < tailleMax; j++){
                            if(i == j && gameBoard[stopPositionCy-i] != null && gameBoard[stopPositionCy-i][stopPositionCx+j] != gameBoard[stopPositionCy][stopPositionCx]){
                            if(gameBoard[stopPositionCy-i] != null && gameBoard[stopPositionCx+j] != null){
                                console.log(gameBoard[stopPositionCy-i-1][stopPositionCx+j+1])
                                if(gameBoard[stopPositionCy-i-1][stopPositionCx+j+1] != null 
                                && gameBoard[stopPositionCy-i][stopPositionCx+j].className.baseVal =='vert'
                                && gameBoard[stopPositionCy-i-1][stopPositionCx+j+1].className.baseVal == 'playableCell'){
                                console.log('enemy spotted')
                                }
                            }
                            if(gameBoard[stopPositionCy-i]!= null && gameBoard[stopPositionCx-j] !=null){
                                console.log(gameBoard[stopPositionCy-i][stopPositionCx-j])
                                if(gameBoard[stopPositionCy-i-1] != null && [stopPositionCx-j-1] != null 
                                && gameBoard[stopPositionCy-i][stopPositionCx-j].className.baseVal =='vert'
                                && gameBoard[stopPositionCy-i-1][stopPositionCx-j-1]!=null  && gameBoard[stopPositionCy-i-1][stopPositionCx-j-1].className.baseVal == 'playableCell'){
                                console.log('enemy spotted')
                                }
                            }
                            if(gameBoard[stopPositionCy+i] != null && gameBoard[stopPositionCx-j] != null){
                                console.log(gameBoard[stopPositionCy+i][stopPositionCx-j])
                                if(gameBoard[stopPositionCy+i+1] != null && [stopPositionCx-j-1] != null 
                                    && gameBoard[stopPositionCy+i][stopPositionCx-j].className.baseVal =='vert' 
                                    && gameBoard[stopPositionCy+i+1][stopPositionCx-j-1].className.baseVal == 'playableCell'){
                                console.log('enemy spotted')
                                }
                            }
                            if(gameBoard[stopPositionCy+i] != null && gameBoard[stopPositionCx+j] != null){
                                console.log(gameBoard[stopPositionCy+i][stopPositionCx+j])
                                if(gameBoard[stopPositionCy+i+1] != null && [stopPositionCx+j+1] != null 
                                    && gameBoard[stopPositionCy+i][stopPositionCx+j].className.baseVal =='vert' 
                                    && gameBoard[stopPositionCy+i+1][stopPositionCx+j+1].className.baseVal == 'playableCell'){
                                console.log('enemy spotted')
                                }
                            }
                        }
                        }
                    }
            }
        }
            
            if(couleurPion =='rose' && changeTurn == false || couleurPion=='queen'){
                
                  queenProcess();
                 
                
                if(startPositionCx+1 == stopPositionCx && startPositionCy-1 == stopPositionCy 
                    || startPositionCx-1 == stopPositionCx && startPositionCy-1 == stopPositionCy){
              
               
                        if(gameBoard[startPositionCy-1][startPositionCx+1] ==null 
                        || gameBoard[startPositionCy-1][startPositionCx-1] ==null ){
                            console.log('NTM')
                        }
                    //Traitement à gauche
                    if(gameBoard[startPositionCy-1][startPositionCx+1] !=null && gameBoard[startPositionCy-1][startPositionCx+1].className.baseVal != 'playableCell' 
                    || gameBoard[startPositionCy-1][startPositionCx-1] !=null && gameBoard[startPositionCy-1][startPositionCx-1].className.baseVal != 'playableCell' )
                    {
                        if(gameBoard[startPositionCy-1][startPositionCx+1] !=null 
                        || gameBoard[startPositionCy-1][startPositionCx-1] !=null )
                        {
                            if(gameBoard[startPositionCy-1][startPositionCx+1]!= null 
                            && gameBoard[startPositionCy-1][startPositionCx+1].className.baseVal =='vert' 
                            && gameBoard[startPositionCy-2][startPositionCx+2] != null
                            && gameBoard[startPositionCy-2][startPositionCx+2].className.baseVal == 'playableCell'
                            && gameBoard[stopPositionCy][stopPositionCx] == gameBoard[startPositionCy-1][startPositionCx+1]
                             )
                            {
                                console.log('BOBOBOB')
                                

                                gameBoard[stopPositionCy-1][stopPositionCx+1]=gameBoard[startPositionCy][startPositionCx]
                                
                                gameBoard[startPositionCy][startPositionCx]= r[0]
                                selectedElement.setAttribute("cy", (startPositionCy-2)*70+35);
                                gameBoard[stopPositionCy][stopPositionCx].style.display = 'none';
                                
                                selectedElement.setAttribute("cx", (startPositionCx+2)*70+35);
                                AddScore()
                                checkScore()
                                console.log("Score rose :"+pinkPoint);
                                if(gameBoard[stopPositionCy-2]!=null && gameBoard[stopPositionCx+2]!=null && gameBoard[stopPositionCx+3] !=null && gameBoard[stopPositionCy-3]!=null ){
                                    stopPositionRight = gameBoard[stopPositionCy-2][stopPositionCx+2]
                                    stopPositionLeft = gameBoard[stopPositionCy-2][stopPositionCx]
                                    stopPositionRightX = gameBoard[stopPositionCx+3]
                                    stopPositionRightY = gameBoard[stopPositionCy-3] 
                                    stopPositionRightNext = gameBoard[stopPositionCy-3][stopPositionCx+3]
                                    stopPositionLeftNext = gameBoard[stopPositionCy-3][stopPositionCx-1]
                                    stopPositionLeftX = gameBoard[stopPositionCx-1]
                                    stopPositionLeftY = gameBoard[stopPositionCy-3]
                                    if(checkTurnPink(stopPositionRight, stopPositionLeft, stopPositionRightNext, stopPositionLeftNext, stopPositionRightX, stopPositionRightY, stopPositionLeftX, stopPositionLeftY ) == true
                                          ){
                                            console.log('C ENCORE TON TOUR')
                                }
                                else{
                                    console.log('TOUR DE lAUTRE')
                                    changeTurn = true
                                }
                                }
                                
                                else{
                                    console.log('TOUR DE lAUTRE')
                                    changeTurn = true
                                }
                                gameBoard[stopPositionCy][stopPositionCx] = r[0]
                            }
                            else if(gameBoard[startPositionCy-1][startPositionCx-1]!= null 
                            && gameBoard[startPositionCy-1][startPositionCx-1].className.baseVal =='vert' 
                            && gameBoard[startPositionCy-2][startPositionCx-2]!= null
                            && gameBoard[startPositionCy-2][startPositionCx-2].className.baseVal =='playableCell'
                            && gameBoard[stopPositionCy][stopPositionCx] == gameBoard[startPositionCy-1][startPositionCx-1]
                             )
                            {
                                console.log('ZOZOZOZO')
                                gameBoard[stopPositionCy-1][stopPositionCx-1]=gameBoard[startPositionCy][startPositionCx]
                                
                                gameBoard[startPositionCy][startPositionCx]= r[0]
                                selectedElement.setAttribute("cy", (startPositionCy-2)*70+35);
                                gameBoard[stopPositionCy][stopPositionCx].style.display = 'none';
                                gameBoard[stopPositionCy][stopPositionCx] = r[0]
                                selectedElement.setAttribute("cx", (startPositionCx-2)*70+35);
                                AddScore()
                                checkScore()
                                console.log("Score rose :"+pinkPoint);
                                if(gameBoard[stopPositionCy-2]!=null && gameBoard[stopPositionCx-2]!=null && gameBoard[stopPositionCx-3] !=null && gameBoard[stopPositionCy-3]!=null ){
                                    stopPositionRight = gameBoard[stopPositionCy-2][stopPositionCx]
                                    stopPositionLeft = gameBoard[stopPositionCy-2][stopPositionCx-2]
                                    stopPositionRightX = gameBoard[stopPositionCx+1]
                                    stopPositionRightY = gameBoard[stopPositionCx-3] 
                                    stopPositionRightNext = gameBoard[stopPositionCy-3][stopPositionCx+1]
                                    stopPositionLeftNext = gameBoard[stopPositionCy-3][stopPositionCx-3]
                                    stopPositionLeftX = gameBoard[stopPositionCx-3]
                                    stopPositionLeftY = gameBoard[stopPositionCy-3]
                                    
                                    if(checkTurnPink(stopPositionRight, stopPositionLeft, stopPositionRightNext, stopPositionLeftNext,  stopPositionRightX, stopPositionRightY, stopPositionLeftX, stopPositionLeftY) == true ){
                                            console.log('C ENCORE TON TOUR')
                                }
                                else{
                                    console.log('TOUR DE lAUTRE')
                                    changeTurn = true
                                }
                                }
                                else{
                                    console.log('TOUR DE lAUTRE')
                                    changeTurn = true
                                }
                                
                            }
                            else if(gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='rose' && gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='vert'){
                                
                                gameBoard[stopPositionCy][stopPositionCx]=gameBoard[startPositionCy][startPositionCx]
                                gameBoard[startPositionCy][startPositionCx]= r[0]
                                selectedElement.setAttribute("cx", stopPositionCx*70+35);
                                selectedElement.setAttribute("cy", stopPositionCy*70+35);
                                changeTurn = true
                               
                            }  
                            else{
                                
                                selectedElement.setAttribute("cx", startPositionCx*70+35);
                            selectedElement.setAttribute("cy", startPositionCy*70+35);
                                
                            } 
                        }
                        else{
                            
                            selectedElement.setAttribute("cx", startPositionCx*70+35);
                            selectedElement.setAttribute("cy", startPositionCy*70+35);
                        } 
                    }
                    else{
                        gameBoard[stopPositionCy][stopPositionCx]=gameBoard[startPositionCy][startPositionCx]
                        gameBoard[startPositionCy][startPositionCx]= r[0]
                        
                        selectedElement.setAttribute("cx", stopPositionCx*70+35);
                        selectedElement.setAttribute("cy", stopPositionCy*70+35);
                        changeTurn = true
                        }  
                    
                    //QUEEN PROCESS
                    
                  checkQueenPink();
             
                    
                    

                    console.log("Mouvement autoriser");
                }
                else if(startPositionCx == stopPositionCx && startPositionCy == stopPositionCy){
                    console.log("Veuillez bouger votre pion");
                    selectedElement.setAttribute("cx", startPositionCx*70+35);
                    selectedElement.setAttribute("cy", startPositionCy*70+35);
                    console.log("Tour : " +changeTurn)
                    
                    
                }else{
                    selectedElement.setAttribute("cx", startPositionCxPixel);
                    selectedElement.setAttribute("cy", startPositionCyPixel);
                    console.log("Mouvement interdit");
                }}
            else if(couleurPion ='vert' && changeTurn == true){
                if(startPositionCx-1 == stopPositionCx && startPositionCy+1 == stopPositionCy 
                || startPositionCx+1 == stopPositionCx && startPositionCy+1 == stopPositionCy){
                    console.log('-----------DROITE------------')
            console.log(gameBoard[startPositionCy+1][startPositionCx-1])
            console.log('-----------GAUCHE------------')
            console.log(gameBoard[startPositionCy+1][startPositionCx+1])
                    //Traitement à gauche
                    if(gameBoard[startPositionCy+1][startPositionCx-1] !=null && gameBoard[startPositionCy+1][startPositionCx-1].className.baseVal != 'playableCell' 
                    || gameBoard[startPositionCy+1][startPositionCx+1] !=null && gameBoard[startPositionCy+1][startPositionCx+1].className.baseVal != 'playableCell' )
                    {
                        if(gameBoard[startPositionCy+1][startPositionCx-1] !=null 
                        || gameBoard[startPositionCy+1][startPositionCx+1] !=null )
                        {
                            if(gameBoard[startPositionCy+1][startPositionCx-1] != null 
                            && gameBoard[startPositionCy+1][startPositionCx-1].className.baseVal =='rose'
                            && gameBoard[startPositionCy+2][startPositionCx-2] != null 
                            && gameBoard[startPositionCy+2][startPositionCx-2].className.baseVal == 'playableCell'
                            && gameBoard[stopPositionCy][stopPositionCx] == gameBoard[startPositionCy+1][startPositionCx-1]
                             )
                            {
                                gameBoard[stopPositionCy+1][stopPositionCx-1]=gameBoard[startPositionCy][startPositionCx]
                                gameBoard[startPositionCy][startPositionCx]= r[0]
                                selectedElement.setAttribute("cy", (startPositionCy+2)*70+35);
                                gameBoard[stopPositionCy][stopPositionCx].style.display = 'none';
                                gameBoard[stopPositionCy][stopPositionCx] = r[0]
                                selectedElement.setAttribute("cx", (startPositionCx-2)*70+35);
                                
                                AddScore()
                                checkScore()
                                console.log("Score vert :"+greenPoint);
                                if(gameBoard[stopPositionCy+2]!=null && gameBoard[stopPositionCx]!=null && gameBoard[stopPositionCx+1] !=null && gameBoard[stopPositionCy+3]!=null ){
                                    stopPositionRight = gameBoard[stopPositionCy+2][stopPositionCx]
                                    stopPositionLeft = gameBoard[stopPositionCy+2][stopPositionCx-2]
                                    stopPositionRightX = gameBoard[stopPositionCx+1]
                                    stopPositionRightY = gameBoard[stopPositionCy+3] 
                                    stopPositionRightNext = gameBoard[stopPositionCy+3][stopPositionCx+1]
                                    stopPositionLeftNext = gameBoard[stopPositionCy+3][stopPositionCx-3]
                                    stopPositionLeftX = gameBoard[stopPositionCx-3]
                                    stopPositionLeftY = gameBoard[stopPositionCy+3]
                                    
                                    if(checkTurnGreen(stopPositionRight, stopPositionLeft, stopPositionRightNext, stopPositionLeftNext,  stopPositionRightX, stopPositionRightY, stopPositionLeftX, stopPositionLeftY) == true ){
                                            console.log('C ENCORE TON TOUR')
                                }else{
                                console.log('Tour de lautre')
                                changeTurn = false;
                            }}else{
                                console.log('Tour de lautre')
                                changeTurn = false;
                            }
                            
                            }
                            else if(gameBoard[startPositionCy+1][startPositionCx+1] !=null 
                            && gameBoard[startPositionCy+1][startPositionCx+1].className.baseVal =='rose' 
                            && gameBoard[startPositionCy+2][startPositionCx+2] != null
                            && gameBoard[startPositionCy+2][startPositionCx+2].className.baseVal =='playableCell'
                            && gameBoard[stopPositionCy][stopPositionCx] == gameBoard[startPositionCy+1][startPositionCx+1]
                            )
                            {
                                gameBoard[stopPositionCy+1][stopPositionCx+1]=gameBoard[startPositionCy][startPositionCx]
                                gameBoard[startPositionCy][startPositionCx]= r[0]
                                selectedElement.setAttribute("cy", (startPositionCy+2)*70+35);
                                gameBoard[stopPositionCy][stopPositionCx].style.display = 'none';
                                gameBoard[stopPositionCy][stopPositionCx] = r[0]
                                selectedElement.setAttribute("cx", (startPositionCx+2)*70+35);
                                AddScore()
                                checkScore()
                                console.log("Score vert :"+ greenPoint);
                                if(gameBoard[stopPositionCy+2]!=null && gameBoard[stopPositionCx]!=null && gameBoard[stopPositionCx-1] !=null && gameBoard[stopPositionCy+3]!=null ){
                                    stopPositionRight = gameBoard[stopPositionCy+2][stopPositionCx+2]
                                    stopPositionLeft = gameBoard[stopPositionCy+2][stopPositionCx]
                                    stopPositionRightX = gameBoard[stopPositionCx+1]
                                    stopPositionRightY = gameBoard[stopPositionCy+3] 
                                    stopPositionRightNext = gameBoard[stopPositionCy+3][stopPositionCx+3]
                                    stopPositionLeftNext = gameBoard[stopPositionCy+3][stopPositionCx-1]
                                    stopPositionLeftX = gameBoard[stopPositionCx-3]
                                    stopPositionLeftY = gameBoard[stopPositionCy+3]
                                    
                                    if(checkTurnGreen(stopPositionRight, stopPositionLeft, stopPositionRightNext, stopPositionLeftNext,  stopPositionRightX, stopPositionRightY, stopPositionLeftX, stopPositionLeftY) == true ){
                                            console.log('C ENCORE TON TOUR')
                                }else{
                                console.log('Tour de lautre')
                                changeTurn = false;
                            }}else{
                                console.log('Tour de lautre')
                                changeTurn = false;
                            }
                            }
                            else if(gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='rose' 
                            && gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='vert')
                            {
                                
                                gameBoard[stopPositionCy][stopPositionCx]=gameBoard[startPositionCy][startPositionCx]
                                gameBoard[startPositionCy][startPositionCx]= r[0]
                                selectedElement.setAttribute("cx", stopPositionCx*70+35);
                                selectedElement.setAttribute("cy", stopPositionCy*70+35);
                                changeTurn = false;

                               
                            }  
                            else{
                                
                                selectedElement.setAttribute("cx", startPositionCx*70+35);
                            selectedElement.setAttribute("cy", startPositionCy*70+35);
                                
                            } 
                        }
                        else{
                            selectedElement.setAttribute("cx", startPositionCx*70+35);
                            selectedElement.setAttribute("cy", startPositionCy*70+35);
                        } 
                    }
                    else{
                        gameBoard[stopPositionCy][stopPositionCx]=gameBoard[startPositionCy][startPositionCx]
                        gameBoard[startPositionCy][startPositionCx]= r[0]
                        selectedElement.setAttribute("cx", stopPositionCx*70+35);
                        selectedElement.setAttribute("cy", stopPositionCy*70+35);
                        changeTurn = false;
                        }  
                        checkQueenGreen()
                  
             
                    
                    console.log("Pos+1 : "+ gameBoard[startPositionCy+1][startPositionCx+1])

                    console.log("Mouvement autoriser");
                }
                else if(startPositionCx == stopPositionCx && startPositionCy == stopPositionCy){
                    console.log("Veuillez bouger votre pion");
                    selectedElement.setAttribute("cx", startPositionCx*70+35);
                    selectedElement.setAttribute("cy", startPositionCy*70+35);
                    console.log("Tour : " +changeTurn)
                }else{
                    selectedElement.setAttribute("cx", startPositionCxPixel);
                    selectedElement.setAttribute("cy", startPositionCyPixel);
                    console.log("Mouvement interdit");
                }

            }
            else{
                    selectedElement.setAttribute("cx", startPositionCxPixel);
                    selectedElement.setAttribute("cy", startPositionCyPixel);
                    console.log("Mouvement interdit");
                }
            
            //if(startPositionCx+1 == stopPositionCx && startPositionCy-1 == stopPositionCy)
            
            console.log('stopPositionCx : '+stopPositionCx, 'stopPositionCy : '+stopPositionCy)
            console.log(gameBoard[stopPositionCy][stopPositionCx]);
            selectedElement = null;  
           
        });
    };
    
    function log() {
        if (window.console && window.console.log)
            window.console.log('[XXX] ' + Array.prototype.join.call(arguments, ' '));
    };

    function getstartPositionCx()
    {
        return startPionPositionCx;
    };

    function UntrucAuPifx()
    {
        return lastX;
    };

    function UntrucAuPify()
    {
        return lastY;
    };

    function getFinalX()
    {
        return finalX;
    };
    function startPionPositionCy()
    {
        return startPositionCy;
    };
    function getY()
    {
        return lastY;
        
    };
    function getFinalY()
    {
        return finalY;
    };
    function getSelectedElement()
    {
        return selectPion;
    };

    function deplacerPion(selectedElement, x ,y)
    {

        selectedElement.setAttribute("cx", 385);
        selectedElement.setAttribute("cy", 385);

    };

    function gameBoardShow()
    {
        return gameBoard;
    }

    

 