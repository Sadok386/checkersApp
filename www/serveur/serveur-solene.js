
var express = require ('express'); // on installe express
var app = express();
var port='8888' // on ecoute sur le port 8888
var mongoose = require('mongoose'); // on va installer mongoose
var bodyParser = require ('body-parser'); // Ce module body-parser analyse les données codées JSON
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/js', express.static(__dirname + '/js')); // lien avec express

/*Initialiser les sessions*/
app.use(cookieParser());
app.use(bodyParser());
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

/*Initialiser les Passport*/
// passport sert pour les authenficiations des users donc on initialise et on le met a la variable session
//pour enregistrer les users et leur password
app.use(passport.initialize());
app.use(passport.session());


var username = 'users'; // la il faut creer ces deux dans la BDD users et password 
var password = 'password';

var dbHost = 'localhost';
var dbPort = '27017';
var database = 'admin' // ici il faut mettre le nom de la base de donnée cree sur l'ordinateur

/*Connexion à la base de donnée - MongoDB*/

var url = 'mongodb://' + username + ':' + password + '@' + dbHost + ':' + dbPort + '/' + database;
console.log('mongodb connection = ' + url);

mongoose.connect(url, function(err) {
    if(err) {
        console.log('erreur de connexion : ', err);
    } else {
        console.log('connexion etablie');
    }
});

/***********
On declare les modeles ici
***********/

//User model
// nous utilisons Schema pour définir notre structure de données avec un username et un password
var UserSchema = new mongoose.Schema({
     _id: mongoose.Schema.ObjectId,
     username: String,
     password: String
 });
// Le premier paramètre est le nom de la collection dans la base de données. Le second est la référence à notre Schema 
//, et le troisième est le nom que nous assignons à la collection à l'intérieur de Mongoose
var User = mongoose.model('user', UserSchema, 'user');

//Model des parties du joueur qu on va enregistrer dans une collection Mongoose
var PartieSchema = new mongoose.Schema({
    user: String, // le nom de l'utilisateur
    score: String, // si la partie a ete gagné ou non 
    post_time: String, // l'heure de la partie 
});


// Le premier paramètre est le nom de la collection dans la base de données. Le second est la référence à notre Schema 
//, et le troisième est le nom que nous assignons à la collection à l'intérieur de Mongoose
var Parties = mongoose.model('partie', PartieSchema, 'partie'); 

/***********
Et en bas c'est les root pour connecter a la page HTML avec les differents get et post
***********/

var bcrypt = require('bcrypt-nodejs');
// pour le script des password (hachage)

app.get('/', function (req, res, next) {
    res.sendFile( __dirname + '/index.html');
});

//trouver un user lorqu'il se connecte
app.get('/user', loggedIn, function (req, res, next) {
    User.findById({ _id: req.user._id }, function(err, user) {
    	return res.json(user);
  	});
});

// lorsque l'user se deconnecte
app.get('/logout', function (req, res, next) {
    req.logout();
  	res.redirect('/');
});


app.post('/login', passport.authenticate('local'),
    function(req, res) {
        res.redirect('/home');
});

/*********
si il parvient a authentifier le passport, donc le login il regarde le mot de passe
On utilise la même commande que nous avons utilisée dans le shell Mongo pour trouver un enregistrement basé sur le nom d'utilisateur.
 Si un enregistrement est trouvé et que le mot de passe correspond, le code ci-dessus renvoie l' objet user. Sinon, il revient false.
***********/

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if(user !== null) {
                var isPasswordCorrect = bcrypt.compareSync(password, user.password);
                if(isPasswordCorrect) {
                    console.log("Username and password correct!"); // ok tout est bon ca retourne true
                    return done(null, user);
                } else {
                    console.log("Password incorrect!"); // si il a rentré le mauvais password
                    return done(null, false);
                }
           } else {
               console.log("Username does not exist!"); // si l'user n existe pas
               return done(null, false);
           }
       });
    }
));

// Serialiser et Deserialiser

// serializable sera invoqué lors de l'authentification, et son travail consiste à sérialiser l'instance de l'utilisateur 
//avec les informations que nous lui transmettons (l'identifiant de l'utilisateur dans ce cas) et à le stocker dans la session via un cookie
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(err, user);
});

// on regarde si nos mots de passe sont chiffrés avant d'être enregistrés

app.post('/creerCompte', function (req, res, next) { // quand l'utilisateur clique sur creerCompte (voir html)
	var password = bcrypt.hashSync(req.body.password); // ca va lui chiffrer son mot de passe
	req.body.password = password; // enregistre le password qu'on extrait du body html

    User.create(req.body, function(err, saved) { // on creer un User
        if(err) {
            console.log(err);
            res.json({ message : err });
        } else {
            res.json({ message : "Utilisateur bien enregistreé!"});
        }
    });
});

app.post('/add', function (req, res, next) { // quand l'user veut enregistrer sa partie 
	var partie = new Parties();
	partie.score = req.body.score; // lorsqu il rentre son score via le html
	partie.post_time = getDateTime(); // on peut extraire la date exacte de la partie
	partie.user = req.user.username; // on extrait le pseudo de l user

    Parties.create(item, function(err, saved) { // on cree la partie au on va stocker apres dans la collection sur mongoose
        if(err) {
            console.log(err);
            return res.json({ message : err });
        } else {
            return res.json({ message : "Partie bien enregistrée", partie: saved});
        }
    });
});


app.post('/delete', loggedIn, function (req, res, next) { // supprimer l'affichage du score, de la date d'une partie a travers son id
    Item.findOneAndRemove({ _id: req.body._id }, function(err, item) {
    	if(err) {
    		console.log(err);
            return res.json({ message : err });
    	} else {
    		return res.json({ message : "Objet supprimeé!"});
    	}
  	});
});


app.get('/items', loggedIn, function (req, res, next) { 
    //Nous voulons que les données (les parties) soient affichées chaque fois que nous chargeons la page , ca fait la liaison avec le script.js
    Parties.find({ user: req.user.username }, function(err, item) {
    	return res.json(item);
  	});
});


function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}


app.post('/add', passport.authenticate('local'),
    function(req, res) {
        res.redirect('/home');
});


function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

// on va extraire la date avec l heure exacte pour enregistrer l heure de sa partie et avoir une trace
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + " - " + hour + ":" + min + ":" + sec;

}
// on ecoute sur le port 
app.listen(port, '0.0.0.0', function(){
console.log('le serveur est sur le port '+ port)}
)

