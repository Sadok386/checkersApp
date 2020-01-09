var url = "http://localhost:8080";

function creerUser() { // creer un utilisateur 
     var username = document.getElementsByClassName("username");
     var password = document.getElementsByClassName("password");

     $.ajax({
         url: url + "/creerCompte",
         method: "post",
         data: {
             username: username[0].value,
             password: password[0].value
         }
     }).success(function(response){
         alert(response.message);
     }).error(function(response) {
         alert(response.message);
     });
}
function ConnexionUser() {
    var username = document.getElementsByClassName("username");
    var password = document.getElementsByClassName("password");

    $.ajax({
        url: "http://localhost:3000" + "/login",
        method: "post",
        data: {
            username: username[0].value,
            password: password[0].value
        }
        }).success(function(response){
             window.location.assign("/home");
         }).error(function(response) {
             alert("Incorrect Pseudo ou mot de passe!");
         });
}
function getUser() {
    var username = document.getElementsByClassName("username");

    $.ajax({
        url: url + "/user",
        method: "get"
    }).success(function(response){
        document.getElementsByClassName("username")[0].innerHTML = response.username;
    }).error(function(response) {
        alert("Impossible de charger les donneées. Essayer encore");
    });
    $.ajax({
        url: url + "/parties",
        method: "get"
    }).success(function(response) {

        //Loop through each row and display them in the HTML
        for(var a = 0; a < response.length; a++) {
            var item = response[a];

            //Display owner items data in the table
            $("#itemtable").append("<tr>" +
                "<td>" + partie._id + "</td>" +
                "<td>" + partie.score + "</td>" +
                "<td>" + partie.post_time + "</td>" +
                '<td><a href="">delete</a></td>' +
            "</tr>");
        }
     }).error(function(response) {
         alert("Impossible de récupérer les données");
     });

}

function addParties() {
    var score = document.getElementsByClassName("score")[0];

    $.ajax({
        url: url + "/add",
        method: "post",
        data: {
            score: score.value,
        }
    }).success(function(response){
        console.log(response);
        alert("partie ajouteé!");
        //Mettre les donneées dans la table
        $("#itemtable").append("<tr>" +
        "<td>" + partie._id + "</td>" +
        "<td>" + partie.score + "</td>" +
        "<td>" + partie.post_time + "</td>" +
    '<td><a href="">delete</a></td>' +
            "</tr>");

    }).error(function(response) {
        alert("Impossible d'ajouter la partie, essayer encore");
    });
}
