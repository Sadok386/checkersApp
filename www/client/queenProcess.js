function queenProcess(startPositionCx, startPositionCy, stopPositionCx, stopPositionCy, gameBoard, couleurPion){

    //---------------//
    //Cette condition permet de définir quel dame a été selectionné et ainsi désigné qui sont ses cibles
    if(couleurPion =='queen'){
        console.log(couleurPion);
        queenColor = couleurPion
        queenEnnemyColor = 'queenEnnemy'
        ennemyColor = 'yellow'
    }else if(couleurPion == 'queenEnnemy')
    {
        console.log(couleurPion);
        queenColor = couleurPion
        queenEnnemyColor = 'queen'
        ennemyColor = 'white'
    }
    //---------------//

    //On verifie si on selectionen bien une dame
    if(queenColor){
        console.log('Queen pos: ' +startPositionCx +startPositionCy)

        //Double boucle permettant de selectionner les diagonals des dames
        for(var i = 0; i < tailleMax; i++){
            for (var j = 0; j < tailleMax; j++){
                if(i == j ){

            //Traitement pour la diagonal haute droite
                //On vérifie si le deplacement est bien diagonal
                if(startPositionCx+j == stopPositionCx && startPositionCy-i == stopPositionCy){
                //On vérifie aussi si la diagonal ne depasse pas la range max du tableau
                if(gameBoard[startPositionCy-i] != null && gameBoard[startPositionCx+j] != null)
                {
                    //On vérifie si dans notre diagonal un ennemi est localisé et que son voisin n'est pas a coté de lui
                    if((gameBoard[stopPositionCy][stopPositionCx].className.baseVal == queenEnnemyColor || gameBoard[stopPositionCy][stopPositionCx].className.baseVal == ennemyColor)
                    && gameBoard[stopPositionCy-1][stopPositionCx+1] != null
                    && gameBoard[stopPositionCy-1][stopPositionCx+1].className.baseVal == 'playableCell')
                    {
                    //Traitement pour manger un pion
                        //Ici on change de position la dame dans notre gameBoard ainsi la position d'arrivé, stopPosition devient la dame
                        gameBoard[stopPositionCy-1][stopPositionCx+1]=gameBoard[startPositionCy][startPositionCx]
                        //Puis la position de départ est changer par r[0] sois le rectangle que l'on a crée au debut pour remplir les cases vides
                        gameBoard[startPositionCy][startPositionCx]= r[0]
                        //Puis ici on change la position du cercle sur le svg
                        selectedElement.setAttribute("cy", (stopPositionCy-1)*70+35);
                        selectedElement.setAttribute("cx", (stopPositionCx+1)*70+35);

                        joueurUn.pionEnd.cx = gameBoard[stopPositionCy-1][stopPositionCx+1].cx.baseVal.value;
                        joueurUn.pionEnd.cy = gameBoard[stopPositionCy-1][stopPositionCx+1].cy.baseVal.value;
                        joueurUn.pionStart.cy = startPositionCyPixel
                        joueurUn.pionStart.cx = startPositionCxPixel
                        joueurUn.mange.cx = gameBoard[stopPositionCy][stopPositionCx].cx.baseVal.value;
                        joueurUn.mange.cy = gameBoard[stopPositionCy][stopPositionCx].cy.baseVal.value;
                        //Ici on supprime le pion manger en lui appliquant un display none
                        gameBoard[stopPositionCy][stopPositionCx].style.display = 'none';
                        //Et on cercle par notre r[0]
                        gameBoard[stopPositionCy][stopPositionCx] = r[0]
                        joueurUn.board = gameBoard
                        console.log('Mange 1')
                        //On incremente le score
                        AddScore();
                        return;
                    }
                    //Condition permettant de bouger un élement diagonalement
                    else if(gameBoard[stopPositionCy][stopPositionCx] == gameBoard[startPositionCy-i][startPositionCx+j]
                    && gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='white'
                    && gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='yellow')
                    {
                        console.log('DIAGGGGGGGGGGG 1')
                        //Ici on change de position la dame dans notre gameBoard ainsi la position d'arrivé, stopPosition devient la dame
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
                        return;
                    }
                    //Condition si le mouvement est interdit
                    else
                    {
                        //Ici on change la position du cercle sur le svg
                        selectedElement.setAttribute("cx", startPositionCxPixel);
                        selectedElement.setAttribute("cy", startPositionCyPixel);
                        joueurUn.pionEnd.cx = null;
                        joueurUn.pionEnd.cy = null;
                        joueurUn.pionStart.cy = null;
                        joueurUn.pionStart.cx = null;
                        joueurUn.mange.cx = null;
                        joueurUn.mange.cy = null;
                        console.log("Mouvement interdit QUEEN 1");
                    }

                }
                //Condition si le mouvement est interdit
                else
                {
                    //Ici on change la position du cercle sur le svg
                    selectedElement.setAttribute("cx", startPositionCxPixel);
                    selectedElement.setAttribute("cy", startPositionCyPixel);
                    joueurUn.pionEnd.cx = null;
                    joueurUn.pionEnd.cy = null;
                    joueurUn.pionStart.cy = null;
                    joueurUn.pionStart.cx = null;
                    joueurUn.mange.cx = null;
                    joueurUn.mange.cy = null;
                }
                }
            //Traitement pour la diagonal haute gauche
                if(startPositionCx-j == stopPositionCx && startPositionCy-i == stopPositionCy)
                {
                    if(gameBoard[startPositionCy-i]!= null && gameBoard[startPositionCx-j] !=null)
                    {
                        console.log('Je rentre ici 2')
                        if((gameBoard[stopPositionCy][stopPositionCx].className.baseVal == queenEnnemyColor
                        || gameBoard[stopPositionCy][stopPositionCx].className.baseVal == ennemyColor)
                        && gameBoard[stopPositionCy-1] != null
                        && gameBoard[stopPositionCy-1][stopPositionCx-1] != null
                        && gameBoard[stopPositionCy-1][stopPositionCx-1].className.baseVal == 'playableCell')
                        {
                            gameBoard[stopPositionCy-1][stopPositionCx-1]=gameBoard[startPositionCy][startPositionCx]

                            gameBoard[startPositionCy][startPositionCx]= r[0]
                            selectedElement.setAttribute("cy", (stopPositionCy-1)*70+35);
                            selectedElement.setAttribute("cx", (stopPositionCx-1)*70+35);



                            console.log('Mange 2')
                            joueurUn.pionEnd.cx = gameBoard[stopPositionCy-1][stopPositionCx-1].cx.baseVal.value;
                            joueurUn.pionEnd.cy = gameBoard[stopPositionCy-1][stopPositionCx-1].cy.baseVal.value;
                            joueurUn.pionStart.cy = startPositionCyPixel
                            joueurUn.pionStart.cx = startPositionCxPixel
                            joueurUn.mange.cx = gameBoard[stopPositionCy][stopPositionCx].cx.baseVal.value;
                            joueurUn.mange.cy = gameBoard[stopPositionCy][stopPositionCx].cy.baseVal.value;

                            gameBoard[stopPositionCy][stopPositionCx].style.display = 'none';
                            gameBoard[stopPositionCy][stopPositionCx] = r[0]

                            joueurUn.board = gameBoard
                            AddScore();
                            return;
                        }
                    else if(gameBoard[stopPositionCy][stopPositionCx] == gameBoard[startPositionCy-i][startPositionCx-j]
                    && gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='white'
                    && gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='yellow')
                    {
                        console.log('DIAGGGGGGGGGGG 2')
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
                        return;
                    }
                    else
                    {
                        selectedElement.setAttribute("cx", startPositionCxPixel);
                        selectedElement.setAttribute("cy", startPositionCyPixel);
                        console.log("Mouvement interdit QUEEN 2");
                        joueurUn.pionEnd.cx = null;
                        joueurUn.pionEnd.cy = null;
                        joueurUn.pionStart.cy = null;
                        joueurUn.pionStart.cx = null;
                        joueurUn.mange.cx = null;
                        joueurUn.mange.cy = null;
                    }
                }
            }
            else
            {
                selectedElement.setAttribute("cx", startPositionCxPixel);
                selectedElement.setAttribute("cy", startPositionCyPixel);
                console.log("Mouvement interdit QUEEN 2 - 1");
                joueurUn.pionEnd.cx = null;
                joueurUn.pionEnd.cy = null;
                joueurUn.pionStart.cy = null;
                joueurUn.pionStart.cx = null;
                joueurUn.mange.cx = null;
                joueurUn.mange.cy = null;
            }
        //Traitement pour la diagonal bas gauche
            if(startPositionCx-j == stopPositionCx && startPositionCy+i == stopPositionCy)
            {
                if(gameBoard[startPositionCy+i] != null && gameBoard[startPositionCx-j] != null)
                {
                    console.log('Je rentre ici 3')
                    if((gameBoard[stopPositionCy][stopPositionCx].className.baseVal == queenEnnemyColor
                    || gameBoard[stopPositionCy][stopPositionCx].className.baseVal == ennemyColor)
                    && gameBoard[stopPositionCy+1][stopPositionCx-1] != null
                    && gameBoard[stopPositionCy+1][stopPositionCx-1].className.baseVal == 'playableCell')
                    {
                        gameBoard[stopPositionCy+1][stopPositionCx-1]=gameBoard[startPositionCy][startPositionCx]

                        gameBoard[startPositionCy][startPositionCx]= r[0]
                        selectedElement.setAttribute("cy", (stopPositionCy+1)*70+35);
                        selectedElement.setAttribute("cx", (stopPositionCx-1)*70+35);

                        joueurUn.pionEnd.cx = gameBoard[stopPositionCy+1][stopPositionCx-1].cx.baseVal.value;
                        joueurUn.pionEnd.cy = gameBoard[stopPositionCy+1][stopPositionCx-1].cy.baseVal.value;
                        joueurUn.pionStart.cy = startPositionCyPixel
                        joueurUn.pionStart.cx = startPositionCxPixel
                        joueurUn.mange.cx = gameBoard[stopPositionCy][stopPositionCx].cx.baseVal.value;
                        joueurUn.mange.cy = gameBoard[stopPositionCy][stopPositionCx].cy.baseVal.value;

                        gameBoard[stopPositionCy][stopPositionCx].style.display = 'none';
                        gameBoard[stopPositionCy][stopPositionCx] = r[0]

                        joueurUn.board = gameBoard
                        console.log('Mange 3')
                        AddScore();
                        return;
                    }
                    else if(gameBoard[stopPositionCy][stopPositionCx] == gameBoard[startPositionCy+i][startPositionCx-j]
                    && gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='white'
                    && gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='yellow')
                    {
                        console.log('DIAGGGGGGGGGGG 3')
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
                        return;
                    }
                    else
                    {
                        selectedElement.setAttribute("cx", startPositionCxPixel);
                        selectedElement.setAttribute("cy", startPositionCyPixel);
                        joueurUn.pionEnd.cx = null;
                        joueurUn.pionEnd.cy = null;
                        joueurUn.pionStart.cy = null;
                        joueurUn.pionStart.cx = null;
                        joueurUn.mange.cx = null;
                        joueurUn.mange.cy = null;
                        console.log("Mouvement interdit QUEEN 3");
                    }
                }
            }
            else{
                selectedElement.setAttribute("cx", startPositionCxPixel);
                selectedElement.setAttribute("cy", startPositionCyPixel);
                joueurUn.pionEnd.cx = null;
                joueurUn.pionEnd.cy = null;
                joueurUn.pionStart.cy = null;
                joueurUn.pionStart.cx = null;
                joueurUn.mange.cx = null;
                joueurUn.mange.cy = null;
                console.log("Mouvement interdit QUEEN 3 - 1");
            }
        //Traitement pour la diagonal bas droite
            if(startPositionCx+j == stopPositionCx && startPositionCy+i == stopPositionCy){
                if(gameBoard[startPositionCy+i] != null && gameBoard[startPositionCx+j] != null)
                {
                    console.log('Je rentre ici 4')
                    if((gameBoard[stopPositionCy][stopPositionCx].className.baseVal == queenEnnemyColor
                    || gameBoard[stopPositionCy][stopPositionCx].className.baseVal == ennemyColor)
                    && gameBoard[stopPositionCy+1][stopPositionCx+1] != null
                    && gameBoard[stopPositionCy+1][stopPositionCx+1].className.baseVal == 'playableCell')
                    {
                        gameBoard[stopPositionCy+1][stopPositionCx+1]=gameBoard[startPositionCy][startPositionCx]

                        gameBoard[startPositionCy][startPositionCx]= r[0]
                        selectedElement.setAttribute("cy", (stopPositionCy+1)*70+35);
                        selectedElement.setAttribute("cx", (stopPositionCx+1)*70+35);



                        joueurUn.pionEnd.cx = gameBoard[stopPositionCy+1][stopPositionCx+1].cx.baseVal.value;
                        joueurUn.pionEnd.cy = gameBoard[stopPositionCy+1][stopPositionCx+1].cy.baseVal.value;
                        joueurUn.pionStart.cy = startPositionCyPixel
                        joueurUn.pionStart.cx = startPositionCxPixel
                        joueurUn.mange.cx = gameBoard[stopPositionCy][stopPositionCx].cx.baseVal.value;
                        joueurUn.mange.cy = gameBoard[stopPositionCy][stopPositionCx].cy.baseVal.value;

                        gameBoard[stopPositionCy][stopPositionCx].style.display = 'none';
                        gameBoard[stopPositionCy][stopPositionCx] = r[0]

                        joueurUn.board = gameBoard
                        console.log('Mange 4')
                        AddScore();
                        return;
                    }
                    else if(gameBoard[stopPositionCy][stopPositionCx] == gameBoard[startPositionCy+i][startPositionCx+j]
                    && gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='white'
                    && gameBoard[stopPositionCy][stopPositionCx].className.baseVal !='yellow')
                    {
                        console.log('DIAGGGGGGGGGGG 4')
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
                        return;
                    }
                    else
                    {
                        selectedElement.setAttribute("cx", startPositionCxPixel);
                        selectedElement.setAttribute("cy", startPositionCyPixel);
                        joueurUn.pionEnd.cx = null;
                        joueurUn.pionEnd.cy = null;
                        joueurUn.pionStart.cy = null;
                        joueurUn.pionStart.cx = null;
                        joueurUn.mange.cx = null;
                        joueurUn.mange.cy = null;
                        console.log("Mouvement interdit QUEEN 4");
                    }
                }
            }
            else{
                selectedElement.setAttribute("cx", startPositionCxPixel);
                selectedElement.setAttribute("cy", startPositionCyPixel);
                console.log("Mouvement interdit QUEEN 4 - 1");
                joueurUn.pionEnd.cx = null;
                joueurUn.pionEnd.cy = null;
                joueurUn.pionStart.cy = null;
                joueurUn.pionStart.cx = null;
                joueurUn.mange.cx = null;
                joueurUn.mange.cy = null;
                }
            }
        }
    }
}
}