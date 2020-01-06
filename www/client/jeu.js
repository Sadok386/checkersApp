
var selectedElement = null;
var prevElement = null;
var currentX = 0;
var currentY = 0;
whitePoint = 0
yellowPoint = 0
var changeTurn = false;  
let pionMoveCy
let pionMoveCx
const joueurUn = {  
    color:"white", 
    pionStart: {
                cx: null,
                cy: null
            },
    pionEnd: {
                cx: null,
                cy: null,
        },
    mange: {
            cx: null,
            cy: null,
    },
    board: null,
            };
   function registercb(){
 
    //Ici on créer un rectangle qui remplira les changements de position 
    //(ex: Je mange un pion alors la case de ce pion mangé devient ce rectangle dans le tableau)
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

//CREATION DU TABLEAU DE JEU
      var a = document.getElementById("svg");
    
    //On récupere tout les enfants du svg 
      boardArray = Array.prototype.slice.call(a.childNodes);
    //On découpe les enfants en 2 partie

      //r = rectangle, ici on récupère tout les rectangles
      r = boardArray.slice(0,99)
      //p = cercles, ici on récupère tout les cercles qui vont nous servir de pions
      p = boardArray.slice(100,130)
            //On crée notre plateau de jeu à partir des enfants découpé au préalable         
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
        board = gameBoard

        // On initialise une variable pour connaitre la taille max du tableau
        // Cette variable servire à ne pas sortir du tableau lors des prochains traitements
        tailleMax = gameBoard.length;
        p[16].setAttribute ('class','queen')
        p[16].setAttribute("stroke", 'black');
        p[16].setAttribute("stroke-width", 10);
        p[12].setAttribute ('class','queenEnnemy')
        p[12].setAttribute("stroke", 'black');
        p[12].setAttribute("stroke-width", 10);

// DRAG & DROP
        //Ici on bind "touchstart" et "mousedown" afin de pouvoir traiter le mobile et le web
        $("#svg > circle").bind('touchstart mousedown',function (e) {

            //On récupère au clique les positions x et y et même principe "e.clientX || e.touches[0].pageX" permettent de traiter le mobile et le web
            currentX = e.clientX || e.touches[0].pageX ;
            currentY = e.clientY || e.touches[0].pageY;

            //On stock dans une variable l'élement sur lequel on a cliqué
            selectedElement = e.target;

            //On récupère la position x et y de l'élement selectionner, on le divise par 70 car dans plateau.js on créer des élements de 70px
            //Ainsi on peux recuperé un nombre entier x et y

            startPositionCx = Math.floor(parseInt(selectedElement.cx.baseVal.value)/70)
            startPionPositionCx = startPositionCx;
            startPositionCy = Math.floor(parseInt(selectedElement.cy.baseVal.value)/70)

            //On réupère aussi la position x et y en entier de l'élement

            startPositionCxPixel =  parseInt(selectedElement.getAttribute("cx"))
            startPositionCyPixel =   parseInt(selectedElement.getAttribute("cy"))
        
        //Traitement au mouvement de la souris 
        }).bind('touchmove mousemove',function (e) {    

            // Cette condition permet si l'élement existe, de le bouger           
            if (selectedElement) {
            //Même principe que plus ici on récupère les positions courante x et y lors du mouvement de la souris
                var dx = parseInt(selectedElement.getAttribute("cx")) + (e.clientX || e.touches[0].pageX) - currentX;
                var dy = parseInt(selectedElement.getAttribute("cy")) + (e.clientY || e.touches[0].pageY) - currentY;
                currentX = e.clientX || e.touches[0].pageX ;
                currentY = e.clientY || e.touches[0].pageY;
                selectedElement.setAttribute("cx", dx);
                selectedElement.setAttribute("cy", dy);
               
            }
        
        //Traitement a la fin d'un clique de la souris
        }).bind('touchend mouseup',function (e) {
            console.log('Joueur 1')

            stopPositionCx = Math.floor(parseInt(selectedElement.cx.baseVal.value)/70)
            stopPositionCy = Math.floor(parseInt(selectedElement.cy.baseVal.value)/70)

            //Permet de récuperer la couleur du pion selectionné


            lastX = startPositionCx;
            lastY = startPositionCy;

            couleurPion = selectedElement.className.baseVal;

            //Permet de récuperer la position de fin de l'élement selectionné
            stopPositionCxPixel =  parseInt(selectedElement.getAttribute("cx"))
            stopPositionCyPixel =   parseInt(selectedElement.getAttribute("cy"))

            finalX = Math.floor(parseInt(selectedElement.cx.baseVal.value));
            finalY = Math.floor(parseInt(selectedElement.cy.baseVal.value));
            board = gameBoard   
            console.log('startPositionCx : '+startPositionCx, 'startPositionCy : '+startPositionCy)
            // deactivate element after setting it into its new location

            
           
            console.log(gameBoard)

            //Fonction permettant de crée un dame à partir des Pion blanc
            function checkQueenWhite(){
                //On donne au variable la position d'arriver R = right L= left
                checkQueenR = gameBoard[startPositionCy-2][startPositionCx-1] 
                checkQueenL = gameBoard[startPositionCy-2][startPositionCx+3]
                
                //Et à partir de ces variables on check si notre pion est bien sur la derniere rangée ennemi  
                if((checkQueenR == r[1] || checkQueenR == r[3]|| checkQueenR == r[5] || checkQueenR == r[7] || checkQueenR==r[9]) 
                || (checkQueenL == r[1]|| checkQueenL== r[3]|| checkQueenL == r[5]|| checkQueenL==r[7] || checkQueenL==r[9])){
                    console.log('CREER DAME')

                    //On change la classe du pion pour le definir en tant que dame
                    selectedElement.setAttribute("class", 'queen');

                    //On change la bordure du pion pour le reperer visuellement sur le plateau
                    selectedElement.setAttribute("stroke", 'black');
                    selectedElement.setAttribute("stroke-width", 10);
                }
            }
            //Fonction permettant de crée un dame à partir des Pion jaune
            function checkQueenYellow(){
                checkQueenR = gameBoard[startPositionCy+2][startPositionCx-3] 
                checkQueenL = gameBoard[startPositionCy+2][startPositionCx+1]
                
                if((checkQueenR == r[90] || checkQueenR == r[92]|| checkQueenR == r[94] || checkQueenR == r[96] || checkQueenR==r[98]) 
                || (checkQueenL == r[90]|| checkQueenL== r[92]|| checkQueenL == r[94]|| checkQueenL==r[96] || checkQueenL==r[98])){
                    selectedElement.setAttribute("class", 'queenEnnemy');
                    selectedElement.setAttribute("stroke", 'black');
                    selectedElement.setAttribute("stroke-width", 10);
                }
            }

            //Méthode pour le comportement d'une dame
            let queenColor
            let queenEnnemyColor
            
            //Condition de verification pour le changement de tour des dames
            if (couleurPion =='queen' && changeTurn == false){
                queenProcess(startPositionCx, startPositionCy,stopPositionCx, stopPositionCy, gameBoard, couleurPion);            
                changeTurn = true
            }else if (couleurPion =='queenEnnemy' && changeTurn == true){
                queenProcess(startPositionCx, startPositionCy,stopPositionCx, stopPositionCy, gameBoard, couleurPion);
               
                changeTurn = false;
            }
            
            //Condition de comportement pour les pions blanc
            else if(couleurPion =='white' && changeTurn == false){
                //Condition qui vérifie si le pion blanc se deplace bien sur une diagonal haute droite ou gauche
                if(startPositionCx+1 == stopPositionCx && startPositionCy-1 == stopPositionCy && couleurPion =='white' 
                || startPositionCx-1 == stopPositionCx && startPositionCy-1 == stopPositionCy && couleurPion =='white')
                {
                    //Conditon qui permet de detecter si la case d'arrivée est libre
                    if(gameBoard[startPositionCy-1][startPositionCx+1] !=null && gameBoard[startPositionCy-1][startPositionCx+1].className.baseVal != 'playableCell' 
                    || gameBoard[startPositionCy-1][startPositionCx-1] !=null && gameBoard[startPositionCy-1][startPositionCx-1].className.baseVal != 'playableCell' )
                    {
                        //Condition qui permet de verifier les cases voisines sont differente de nul ainsi cela nous évite de déborder dans le tableau
                        if(gameBoard[startPositionCy-1][startPositionCx+1] !=null 
                        || gameBoard[startPositionCy-1][startPositionCx-1] !=null )
                        {
                            //Condition qui permet de detecter un ennemi en haut à droite
                            if(gameBoard[startPositionCy-1][startPositionCx+1]!= null 
                            && (gameBoard[startPositionCy-1][startPositionCx+1].className.baseVal =='yellow' || gameBoard[startPositionCy-1][startPositionCx+1].className.baseVal =='queenEnnemy') 
                            && gameBoard[startPositionCy-2][startPositionCx+2] != null
                            && gameBoard[startPositionCy-2][startPositionCx+2].className.baseVal == 'playableCell'
                            && gameBoard[stopPositionCy][stopPositionCx] == gameBoard[startPositionCy-1][startPositionCx+1])
                            {
                                console.log('BOBOBOB')
                                //Ici on change de position du pion dans notre gameBoard ainsi la position d'arrivé, stopPosition devient le pion
                                gameBoard[stopPositionCy-1][stopPositionCx+1]=gameBoard[startPositionCy][startPositionCx]
                                //Puis la position de départ est changer par r[0] sois le rectangle que l'on a crée au debut pour remplir les cases vides
                                gameBoard[startPositionCy][startPositionCx]= r[0]
                                //Puis ici on change la position du cercle sur le svg
                                selectedElement.setAttribute("cy", (startPositionCy-2)*70+35);
                                selectedElement.setAttribute("cx", (startPositionCx+2)*70+35);

                                joueurUn.pionEnd.cx = gameBoard[stopPositionCy-1][stopPositionCx+1].cx.baseVal.value;
                                joueurUn.pionEnd.cy = gameBoard[stopPositionCy-1][stopPositionCx+1].cy.baseVal.value;
                                joueurUn.pionStart.cy = startPositionCyPixel
                                joueurUn.pionStart.cx = startPositionCxPixel
                                joueurUn.mange.cx = gameBoard[stopPositionCy][stopPositionCx].cx.baseVal.value;
                                joueurUn.mange.cy = gameBoard[stopPositionCy][stopPositionCx].cy.baseVal.value;
                                
                                
                                //Ici on supprime le pion mangé en lui appliquant un display none
                                gameBoard[stopPositionCy][stopPositionCx].style.display = 'none';
                                //Et on change le cercle par notre r[0]
                                gameBoard[stopPositionCy][stopPositionCx] = r[0]
                                joueurUn.board = gameBoard
                                //On appel la méthode AddScore ce qui permet d'incrementer le score des blancs
                                AddScore()

                                //On appel la méthode checkScore afin de vérifier si la partie est fini ou non
                                checkScore()
                                console.log("Score white :"+whitePoint);

                                //Condition pour verifier les tours, on attribue des variables nous permettant de voir en fonction de la position d'arrivée
                                //si un coup est encore jouable ou non
                                if(gameBoard[stopPositionCy-2]!=null && gameBoard[stopPositionCx+2]!=null && gameBoard[stopPositionCx+3] !=null && gameBoard[stopPositionCy-3]!=null ){
                                    stopPositionRight = gameBoard[stopPositionCy-2][stopPositionCx+2]
                                    stopPositionLeft = gameBoard[stopPositionCy-2][stopPositionCx]
                                    stopPositionRightX = gameBoard[stopPositionCx+3]
                                    stopPositionRightY = gameBoard[stopPositionCy-3] 
                                    stopPositionRightNext = gameBoard[stopPositionCy-3][stopPositionCx+3]
                                    stopPositionLeftNext = gameBoard[stopPositionCy-3][stopPositionCx-1]
                                    stopPositionLeftX = gameBoard[stopPositionCx-1]
                                    stopPositionLeftY = gameBoard[stopPositionCy-3]
                                    //On appel la méthode checkTurnWhite en lui passant les paramètres qui permettrons de voir si un autre coup est jouable
                                    if(checkTurnWhite(stopPositionRight, stopPositionLeft, stopPositionRightNext, stopPositionLeftNext, stopPositionRightX, stopPositionRightY, stopPositionLeftX, stopPositionLeftY ) == true){
                                        console.log('C ENCORE TON TOUR')
                                    }
                                    else{
                                        //Si le coup n'est pas jouable on passe la variable changeTurn à true, ce qui permettre à l'ennemi de pouvoir jouer
                                        console.log('TOUR DE lAUTRE')
                                        changeTurn = true
                                    }
                                }
                                else{
                                    console.log('TOUR DE lAUTRE')
                                    changeTurn = true
                                }
                            }
                            //Condition qui permet de detecter un ennemi en haut à gauche
                            else if(gameBoard[startPositionCy-1][startPositionCx-1]!= null 
                            && (gameBoard[startPositionCy-1][startPositionCx-1].className.baseVal =='yellow' || gameBoard[startPositionCy-1][startPositionCx-1].className.baseVal =='queenEnnemy')  
                            && gameBoard[startPositionCy-2][startPositionCx-2]!= null
                            && gameBoard[startPositionCy-2][startPositionCx-2].className.baseVal =='playableCell'
                            && gameBoard[stopPositionCy][stopPositionCx] == gameBoard[startPositionCy-1][startPositionCx-1])
                            {
                                console.log('ZOZOZOZO')
                                
                                gameBoard[stopPositionCy-1][stopPositionCx-1]=gameBoard[startPositionCy][startPositionCx]
                                gameBoard[startPositionCy][startPositionCx]= r[0]

                                selectedElement.setAttribute("cy", (startPositionCy-2)*70+35);
                                selectedElement.setAttribute("cx", (startPositionCx-2)*70+35);

                                joueurUn.pionEnd.cx = gameBoard[stopPositionCy-1][stopPositionCx-1].cx.baseVal.value;
                                joueurUn.pionEnd.cy = gameBoard[stopPositionCy-1][stopPositionCx-1].cy.baseVal.value;
                                joueurUn.pionStart.cy = startPositionCyPixel
                                joueurUn.pionStart.cx = startPositionCxPixel
                                joueurUn.mange.cx = gameBoard[stopPositionCy][stopPositionCx].cx.baseVal.value;
                                joueurUn.mange.cy = gameBoard[stopPositionCy][stopPositionCx].cy.baseVal.value;

                                gameBoard[stopPositionCy][stopPositionCx].style.display = 'none';
                                gameBoard[stopPositionCy][stopPositionCx] = r[0]
                                joueurUn.board = gameBoard
                                
                                
                                
                                AddScore()
                                checkScore()
                                console.log("Score white :"+whitePoint);
                                if(gameBoard[stopPositionCy-2]!=null && gameBoard[stopPositionCx-2]!=null && gameBoard[stopPositionCx-3] !=null && gameBoard[stopPositionCy-3]!=null ){
                                    stopPositionRight = gameBoard[stopPositionCy-2][stopPositionCx]
                                    stopPositionLeft = gameBoard[stopPositionCy-2][stopPositionCx-2]
                                    stopPositionRightX = gameBoard[stopPositionCx+1]
                                    stopPositionRightY = gameBoard[stopPositionCx-3] 
                                    stopPositionRightNext = gameBoard[stopPositionCy-3][stopPositionCx+1]
                                    stopPositionLeftNext = gameBoard[stopPositionCy-3][stopPositionCx-3]
                                    stopPositionLeftX = gameBoard[stopPositionCx-3]
                                    stopPositionLeftY = gameBoard[stopPositionCy-3]
                                    
                                    if(checkTurnWhite(stopPositionRight, stopPositionLeft, stopPositionRightNext, stopPositionLeftNext,  stopPositionRightX, stopPositionRightY, stopPositionLeftX, stopPositionLeftY) == true ){
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
                            //Condition permettant de bouger un élement diagonalement et sauvegarder sa position
                            else if(gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='white'
                            && gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='queen'
                            && gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='queenEnnemy'   
                            && gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='yellow'){
                                
                                //Ici on change de position le pion dans notre gameBoard ainsi la position d'arrivé, stopPosition devient le pion
                                gameBoard[stopPositionCy][stopPositionCx]=gameBoard[startPositionCy][startPositionCx]
                                //Puis la position de départ est changer par r[0] sois le rectangle que l'on a crée au debut pour remplir les cases vides
                                gameBoard[startPositionCy][startPositionCx]= r[0]
                                //Puis ici on change la position du cercle sur le svg
                                selectedElement.setAttribute("cx", stopPositionCx*70+35);
                                selectedElement.setAttribute("cy", stopPositionCy*70+35);

                                joueurUn.pionEnd.cx = gameBoard[stopPositionCy][stopPositionCx].cx.baseVal.value;
                                joueurUn.pionEnd.cy = gameBoard[stopPositionCy][stopPositionCx].cy.baseVal.value;
                                joueurUn.pionStart.cy = startPositionCyPixel
                                joueurUn.pionStart.cx = startPositionCxPixel                                
                                joueurUn.mange.cx = null;
                                joueurUn.mange.cy = null;
                                joueurUn.board = gameBoard
                                changeTurn = true
                               
                            } 
                            //Si le mouvement est interdit alors, ici on change la position du cercle sur le svg 
                            else{     
                            selectedElement.setAttribute("cx", startPositionCx*70+35);
                            selectedElement.setAttribute("cy", startPositionCy*70+35);
                            joueurUn.pionEnd.cx = null;
                            joueurUn.pionEnd.cy = null;
                            joueurUn.pionStart.cy = null;
                            joueurUn.pionStart.cx = null;                                
                            joueurUn.mange.cx = null;
                            joueurUn.mange.cy = null;
                            } 
                        }
                        //Si le mouvement est interdit alors, ici on change la position du cercle sur le svg 
                        else{ 
                            selectedElement.setAttribute("cx", startPositionCx*70+35);
                            selectedElement.setAttribute("cy", startPositionCy*70+35);
                            joueurUn.pionEnd.cx = null;
                            joueurUn.pionEnd.cy = null;
                            joueurUn.pionStart.cy = null;
                            joueurUn.pionStart.cx = null;                                
                            joueurUn.mange.cx = null;
                            joueurUn.mange.cy = null;
                        } 
                    }
                    //Condition permettant de bouger un élement diagonalement et sauvegarder sa position
                    else{
                        gameBoard[stopPositionCy][stopPositionCx]=gameBoard[startPositionCy][startPositionCx]
                        gameBoard[startPositionCy][startPositionCx]= r[0]
                        
                        selectedElement.setAttribute("cx", stopPositionCx*70+35);
                        selectedElement.setAttribute("cy", stopPositionCy*70+35);
                        joueurUn.pionEnd.cx = gameBoard[stopPositionCy][stopPositionCx].cx.baseVal.value;
                        joueurUn.pionEnd.cy = gameBoard[stopPositionCy][stopPositionCx].cy.baseVal.value;
                        joueurUn.pionStart.cy = startPositionCyPixel
                        joueurUn.pionStart.cx = startPositionCxPixel                                
                        joueurUn.mange.cx = null;
                        joueurUn.mange.cy = null;
                        joueurUn.board = gameBoard
                        changeTurn = true
                        }  
                //On regarde si le pion peut devenir une dame
                checkQueenWhite();

                    console.log("Mouvement autoriser");
                }
                //Condition si on ne bouge pas le pion ou qu'on reste sur la position initial
                else if(startPositionCx == stopPositionCx && startPositionCy == stopPositionCy){
                    console.log("Veuillez bouger votre pion");
                    selectedElement.setAttribute("cx", startPositionCx*70+35);
                    selectedElement.setAttribute("cy", startPositionCy*70+35);
                    joueurUn.pionEnd.cx = null;
                            joueurUn.pionEnd.cy = null;
                            joueurUn.pionStart.cy = null;
                            joueurUn.pionStart.cx = null;                                
                            joueurUn.mange.cx = null;
                            joueurUn.mange.cy = null;
                    console.log("Tour : " +changeTurn)   
                }
                //Condition si le mouvement est interdit
                else{
                    selectedElement.setAttribute("cx", startPositionCxPixel);
                    selectedElement.setAttribute("cy", startPositionCyPixel);
                    joueurUn.pionEnd.cx = null;
                            joueurUn.pionEnd.cy = null;
                            joueurUn.pionStart.cy = null;
                            joueurUn.pionStart.cx = null;                                
                            joueurUn.mange.cx = null;
                            joueurUn.mange.cy = null;
                    console.log("Mouvement interdit");
                }
            }
            //Condition de comportement pour les pions blanc
            else if(couleurPion ='yellow' && changeTurn == true){
                if(startPositionCx-1 == stopPositionCx && startPositionCy+1 == stopPositionCy 
                || startPositionCx+1 == stopPositionCx && startPositionCy+1 == stopPositionCy)
                {
                    //Traitement à gauche
                    if(gameBoard[startPositionCy+1][startPositionCx-1] !=null && gameBoard[startPositionCy+1][startPositionCx-1].className.baseVal != 'playableCell' 
                    || gameBoard[startPositionCy+1][startPositionCx+1] !=null && gameBoard[startPositionCy+1][startPositionCx+1].className.baseVal != 'playableCell')
                    {
                        if(gameBoard[startPositionCy+1][startPositionCx-1] !=null 
                        || gameBoard[startPositionCy+1][startPositionCx+1] !=null )
                        {
                            if(gameBoard[startPositionCy+1][startPositionCx-1] != null 
                            && (gameBoard[startPositionCy+1][startPositionCx-1].className.baseVal =='white' || gameBoard[startPositionCy+1][startPositionCx-1].className.baseVal =='queen')
                            && gameBoard[startPositionCy+2][startPositionCx-2] != null 
                            && gameBoard[startPositionCy+2][startPositionCx-2].className.baseVal == 'playableCell'
                            && gameBoard[stopPositionCy][stopPositionCx] == gameBoard[startPositionCy+1][startPositionCx-1])
                            {
                                gameBoard[stopPositionCy+1][stopPositionCx-1]=gameBoard[startPositionCy][startPositionCx]
                                gameBoard[startPositionCy][startPositionCx]= r[0]

                                selectedElement.setAttribute("cx", (startPositionCx-2)*70+35);
                                selectedElement.setAttribute("cy", (startPositionCy+2)*70+35);

                                joueurUn.pionEnd.cx = gameBoard[stopPositionCy+1][stopPositionCx-1].cx.baseVal.value;
                                joueurUn.pionEnd.cy = gameBoard[stopPositionCy+1][stopPositionCx-1].cy.baseVal.value;
                                joueurUn.pionStart.cy = startPositionCyPixel
                                joueurUn.pionStart.cx = startPositionCxPixel
                                joueurUn.mange.cx = gameBoard[stopPositionCy][stopPositionCx].cx.baseVal.value;
                                joueurUn.mange.cy = gameBoard[stopPositionCy][stopPositionCx].cy.baseVal.value;

                                
                                gameBoard[stopPositionCy][stopPositionCx].style.display = 'none';
                                gameBoard[stopPositionCy][stopPositionCx] = r[0]
                                joueurUn.board = gameBoard
                                
                                

                                AddScore()
                                checkScore()
                                console.log("Score yellow :"+yellowPoint);
                                if(gameBoard[stopPositionCy+2]!=null && gameBoard[stopPositionCx]!=null && gameBoard[stopPositionCx+1] !=null && gameBoard[stopPositionCy+3]!=null ){
                                    stopPositionRight = gameBoard[stopPositionCy+2][stopPositionCx]
                                    stopPositionLeft = gameBoard[stopPositionCy+2][stopPositionCx-2]
                                    stopPositionRightX = gameBoard[stopPositionCx+1]
                                    stopPositionRightY = gameBoard[stopPositionCy+3] 
                                    stopPositionRightNext = gameBoard[stopPositionCy+3][stopPositionCx+1]
                                    stopPositionLeftNext = gameBoard[stopPositionCy+3][stopPositionCx-3]
                                    stopPositionLeftX = gameBoard[stopPositionCx-3]
                                    stopPositionLeftY = gameBoard[stopPositionCy+3]
                                    
                                    if(checkTurnYellow(stopPositionRight, stopPositionLeft, stopPositionRightNext, stopPositionLeftNext,  stopPositionRightX, stopPositionRightY, stopPositionLeftX, stopPositionLeftY) == true ){
                                            console.log('C ENCORE TON TOUR')
                                    }
                                    else{
                                    console.log('Tour de lautre')
                                    changeTurn = false;
                                    }
                                }
                                else
                                {
                                    console.log('Tour de lautre')
                                    changeTurn = false;
                                }
                            
                            }
                            else if(gameBoard[startPositionCy+1][startPositionCx+1] !=null 
                            && (gameBoard[startPositionCy+1][startPositionCx+1].className.baseVal =='white' || gameBoard[startPositionCy+1][startPositionCx+1].className.baseVal =='queen')
                            && gameBoard[startPositionCy+2][startPositionCx+2] != null
                            && gameBoard[startPositionCy+2][startPositionCx+2].className.baseVal =='playableCell'
                            && gameBoard[stopPositionCy][stopPositionCx] == gameBoard[startPositionCy+1][startPositionCx+1])
                            {
                                gameBoard[stopPositionCy+1][stopPositionCx+1]=gameBoard[startPositionCy][startPositionCx]
                                gameBoard[startPositionCy][startPositionCx]= r[0]

                                selectedElement.setAttribute("cy", (startPositionCy+2)*70+35);
                                selectedElement.setAttribute("cx", (startPositionCx+2)*70+35);

                                joueurUn.pionEnd.cx = gameBoard[stopPositionCy+1][stopPositionCx+1].cx.baseVal.value;
                                joueurUn.pionEnd.cy = gameBoard[stopPositionCy+1][stopPositionCx+1].cy.baseVal.value;
                                joueurUn.pionStart.cy = startPositionCyPixel
                                joueurUn.pionStart.cx = startPositionCxPixel
                                joueurUn.mange.cx = gameBoard[stopPositionCy][stopPositionCx].cx.baseVal.value;
                                joueurUn.mange.cy = gameBoard[stopPositionCy][stopPositionCx].cy.baseVal.value;

                                
                                gameBoard[stopPositionCy][stopPositionCx].style.display = 'none';
                                gameBoard[stopPositionCy][stopPositionCx] = r[0]
                                
                                joueurUn.board = gameBoard
                                
                                
                                AddScore()
                                checkScore()
                                console.log("Score yellow :"+ yellowPoint);
                                if(gameBoard[stopPositionCy+2]!=null && gameBoard[stopPositionCx]!=null && gameBoard[stopPositionCx-1] !=null && gameBoard[stopPositionCy+3]!=null ){
                                    stopPositionRight = gameBoard[stopPositionCy+2][stopPositionCx+2]
                                    stopPositionLeft = gameBoard[stopPositionCy+2][stopPositionCx]
                                    stopPositionRightX = gameBoard[stopPositionCx+1]
                                    stopPositionRightY = gameBoard[stopPositionCy+3] 
                                    stopPositionRightNext = gameBoard[stopPositionCy+3][stopPositionCx+3]
                                    stopPositionLeftNext = gameBoard[stopPositionCy+3][stopPositionCx-1]
                                    stopPositionLeftX = gameBoard[stopPositionCx-3]
                                    stopPositionLeftY = gameBoard[stopPositionCy+3]
                                    
                                    if(checkTurnYellow(stopPositionRight, stopPositionLeft, stopPositionRightNext, stopPositionLeftNext,  stopPositionRightX, stopPositionRightY, stopPositionLeftX, stopPositionLeftY) == true ){
                                            console.log('C ENCORE TON TOUR')
                                    }
                                    else
                                    {
                                    console.log('Tour de lautre')
                                    changeTurn = false;
                                    }
                                }
                                else{
                                console.log('Tour de lautre')
                                changeTurn = false;
                                }
                            }
                            else if(gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='white'
                            && gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='queen'
                            && gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='queenEnnemy'  
                            && gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='yellow')
                            {
                                gameBoard[stopPositionCy][stopPositionCx]=gameBoard[startPositionCy][startPositionCx]
                                gameBoard[startPositionCy][startPositionCx]= r[0]
                                selectedElement.setAttribute("cx", stopPositionCx*70+35);
                                selectedElement.setAttribute("cy", stopPositionCy*70+35);

                                joueurUn.pionEnd.cx = gameBoard[stopPositionCy][stopPositionCx].cx.baseVal.value;
                                joueurUn.pionEnd.cy = gameBoard[stopPositionCy][stopPositionCx].cy.baseVal.value;
                                joueurUn.pionStart.cy = startPositionCyPixel
                                joueurUn.pionStart.cx = startPositionCxPixel                                
                                joueurUn.mange.cx = null;
                                joueurUn.mange.cy = null;
                                joueurUn.board = gameBoard
                                changeTurn = false;
                                
                            }  
                            else{ 
                            selectedElement.setAttribute("cx", startPositionCx*70+35);
                            selectedElement.setAttribute("cy", startPositionCy*70+35);
                            joueurUn.pionEnd.cx = null;
                            joueurUn.pionEnd.cy = null;
                            joueurUn.pionStart.cy = null;
                            joueurUn.pionStart.cx = null;                               
                            joueurUn.mange.cx = null;
                            joueurUn.mange.cy = null;
                            } 
                        }
                        else{
                            selectedElement.setAttribute("cx", startPositionCx*70+35);
                            selectedElement.setAttribute("cy", startPositionCy*70+35);
                            joueurUn.pionEnd.cx = null;
                            joueurUn.pionEnd.cy = null;
                            joueurUn.pionStart.cy = null;
                            joueurUn.pionStart.cx = null;                               
                            joueurUn.mange.cx = null;
                            joueurUn.mange.cy = null;
                        } 
                    }
                    else
                    {
                        gameBoard[stopPositionCy][stopPositionCx]=gameBoard[startPositionCy][startPositionCx]
                        gameBoard[startPositionCy][startPositionCx]= r[0]
                        selectedElement.setAttribute("cx", stopPositionCx*70+35);
                        selectedElement.setAttribute("cy", stopPositionCy*70+35);
                        joueurUn.pionEnd.cx = gameBoard[stopPositionCy][stopPositionCx].cx.baseVal.value;
                        joueurUn.pionEnd.cy = gameBoard[stopPositionCy][stopPositionCx].cy.baseVal.value;
                        joueurUn.pionStart.cy = startPositionCyPixel
                        joueurUn.pionStart.cx = startPositionCxPixel                                
                        joueurUn.mange.cx = null;
                        joueurUn.mange.cy = null;
                        joueurUn.board = gameBoard
                        changeTurn = false;
                    }  
                    
                    checkQueenYellow()
                    console.log("Pos+1 : "+ gameBoard[startPositionCy+1][startPositionCx+1])
                    console.log("Mouvement autoriser");
                }
                else if(startPositionCx == stopPositionCx && startPositionCy == stopPositionCy){
                    console.log("Veuillez bouger votre pion");
                    selectedElement.setAttribute("cx", startPositionCx*70+35);
                    selectedElement.setAttribute("cy", startPositionCy*70+35);
                    console.log("Tour : " +changeTurn)
                    joueurUn.pionEnd.cx = null;
                            joueurUn.pionEnd.cy = null;
                            joueurUn.pionStart.cy = null;
                            joueurUn.pionStart.cx = null;                               
                            joueurUn.mange.cx = null;
                            joueurUn.mange.cy = null; 
                }
                else{
                    selectedElement.setAttribute("cx", startPositionCxPixel);
                    selectedElement.setAttribute("cy", startPositionCyPixel);
                    console.log("Mouvement interdit");
                    joueurUn.pionEnd.cx = null;
                            joueurUn.pionEnd.cy = null;
                            joueurUn.pionStart.cy = null;
                            joueurUn.pionStart.cx = null;                               
                            joueurUn.mange.cx = null;
                            joueurUn.mange.cy = null; 
                }
            }
            else{
                    selectedElement.setAttribute("cx", startPositionCxPixel);
                    selectedElement.setAttribute("cy", startPositionCyPixel);
                    console.log("Mouvement interdit");
                    joueurUn.pionEnd.cx = null;
                            joueurUn.pionEnd.cy = null;
                            joueurUn.pionStart.cy = null;
                            joueurUn.pionStart.cx = null;                               
                            joueurUn.mange.cx = null;
                            joueurUn.mange.cy = null; 
                }
            console.log('stopPositionCx : '+stopPositionCx, 'stopPositionCy : '+stopPositionCy)
            console.log(gameBoard[stopPositionCy][stopPositionCx]);
            selectedElement = null;   
        });
        
    };
    
    function log() {
        if (window.console && window.console.log)
            window.console.log('[XXX] ' + Array.prototype.join.call(arguments, ' '));
    };

    function getMoveCx(){
        return pionMoveCx;    
    }
    function getMoveCy(){
        return pionMoveCy;
    }
    
    function getJoueurUn(){
        return joueurUn;
    }
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
    function getChibre()
    {
        return board;
    }
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

    function gameBoardShow()
    {
        return gameBoard;
    }

    

 