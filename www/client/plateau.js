
 var svgns = "http://www.w3.org/2000/svg";

//Fonction qui créer le plateau de jeu
function createRect()
{
    var svg = document.getElementById('svg');


    var str = "";
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++){
            var line1 = document.createElementNS(svgns, "rect")
            line1.setAttributeNS(null, "x", j*70)
            line1.setAttributeNS(null, "y", i*70)
            line1.setAttributeNS(null, 'height', '70');
            line1.setAttributeNS(null, 'width', '70');
            line1.setAttributeNS(null, 'fill', (i+j)%2 == 0 ? '#F885BE' : '#03D2FE');
            line1.setAttribute("class", "playableCell");
            svg.appendChild(line1);
        }
    }
    createCircle();
    createBoard()
}
//Fonction qui créer les pions sur le plateau de jeu
function createCircle()
{
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++){

        if((i+j)%2 == 0 && (i < 3 || i > 6) ){
            var circles = document.createElementNS(svgns, "circle")

                circles.setAttribute("cx",j*70+35);
                if(i < 3){
                circles.setAttributeNS(null, 'fill','#EBFE0C');
                circles.setAttribute("cy",i*70+35);
                circles.setAttribute("class", "yellow");
            }
                if(i > 6){
                circles.setAttributeNS(null, 'fill','white');
                circles.setAttribute("cy",i*70+35);
                circles.setAttribute("class", "white");
                }
                circles.setAttribute("r",25);
            }
            svg.appendChild(circles);
        }
    }
}
function createBoard(){
    var d = document.createElementNS(svgns, "rect")
    d.setAttributeNS(null, "x", 0)
    d.setAttributeNS(null, "y", 0)
    d.setAttributeNS(null, 'height', '80');
    d.setAttributeNS(null, 'width', '80');
    d.setAttributeNS(null, 'fill', 'orange');
    d.setAttribute("class", "dame");
    

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
return gameBoard;

}