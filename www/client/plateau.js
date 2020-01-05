
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
