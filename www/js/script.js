var url = "http://localhost:8888";

function creerUser() {
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
        url: url + "/login",
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
        url: url + "/items",
        method: "get"
    }).success(function(response) {

        //Loop through each row and display them in the HTML
        for(var a = 0; a < response.length; a++) {
            var item = response[a];

            //Display owner items data in the table
            $("#itemtable").append("<tr>" +
                "<td>" + item._id + "</td>" +
                "<td>" + item.details + "</td>" +
                "<td>" + item.post_time + "</td>" +
                "<td>" + item.edit_time + "</td>" +
                '<td><a href="">edit</a></td>' +
                '<td><a href="">delete</a></td>' +
                "<td>" + item.isPublic + "</td>" +
            "</tr>");
        }
     }).error(function(response) {
         alert("Impossible de récupérer les données");
     });

}

function addItem() {
    var details = document.getElementsByClassName("details")[0];
    var isPublic = document.getElementsByClassName("isPublic")[0];

    console.log(isPublic.checked);

    $.ajax({
        url: url + "/add",
        method: "post",
        data: {
            details: details.value,
            isPublic: isPublic.checked
        }
    }).success(function(response){
        console.log(response);
        alert("Objet ajouteé!");
        //Mettre les donneées dans la table
        ("#itemtable").append("<tr>" +
            "<td>" + response.item._id + "</td>" +
            "<td>" + response.item.details + "</td>" +
            "<td>" + response.item.post_time + "</td>" +
            "<td>" + response.item.edit_time + "</td>" +
            '<td><a href="">edit</a></td>' +
            '<td><a href="">delete</a></td>' +
            "<td>" + response.item.isPublic + "</td>" +
            "</tr>");

    }).error(function(response) {
        alert("Impossible d'ajouter l'objet, essayer encore");
    });
}


