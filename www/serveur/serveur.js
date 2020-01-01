
var express = require ('express');
var app = express();
var port='8888'
var mongoose = require('mongoose');
var bodyParser = require ('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');


app.use(bodyParser.urlencoded)(
{
extended: true;
})
}
app.use('/js', express.static(__dirname + '/js'));

/*Initialiser les sessions*/
app.use(cookieParser());
app.use(bodyParser());
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

/*Connexion à la base de donnée - MongoDB*/
/*Initialize Passport*/
app.use(passport.initialize());
app.use(passport.session());


var username = 'siteUserAdmin';
var password = 'password';

var dbHost = 'localhost';
var dbPort = '27017';
var database = 'admin';

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
var UserSchema = new mongoose.Schema({
     _id: mongoose.Schema.ObjectId,
     username: String,
     password: String
 });

var User = mongoose.model('user', UserSchema);

//Item model
var ItemSchema = new mongoose.Schema({
    owner: String,
    details: String,
    post_time: String,
    edit_time: String,
    isPublic: Boolean
});

var Item = mongoose.model('item', ItemSchema);

/***********
Et en bas c'est les routes
***********/

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if(user !== null) {
                var isPasswordCorrect = bcrypt.compareSync(password, user.password);
                if(isPasswordCorrect) {
                    console.log("Username and password correct!");
                    return done(null, user);
                } else {
                    console.log("Password incorrect!");
                    return done(null, false);
                }
           } else {
               console.log("Username does not exist!");
               return done(null, false);
           }
       });
    }
));
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(err, user);
});
app.post('/creerCompte', function (req, res, next) {
var bcrypt = require('bcrypt-nodejs');
// on regarde si nos mots de passe sont chiffrés avant d'être enregistrés
app.post('/creerCompte', function (req, res, next) {
    var password = bcrypt.hashSync(req.body.password);
    req.body.password = password;
});
}
User.create(req.body, function(err, saved) {
    if(err) {
        console.log(err);
        res.json({ message : err });
    } else {
        res.json({ message : "User crée avec succès!"});
    }
});

app.get('/items', loggedIn, function (req, res, next) {
    Item.find({ owner: req.user.username }, function(err, item) {
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
app.listen(port, '0.0.0.0', function(){
console.log('le serveur est sur le port '+ port)}
)
app.get('/creerCompte', function (req, res, next) {
    res.sendFile( __dirname + '/creerCompte.html');
});

app.get('/home', function (req, res, next) {
    res.sendFile( __dirname + '/creerCompte.html');
});

app.get('/home', loggedIn, function (req, res, next) {
     res.sendFile( __dirname + '/home.html');
});

app.post('/login', passport.authenticate('local'),
    function(req, res) {
        res.redirect('/home');
});

app.post('/creerCompte', function (req, res, next) {
     console.log('username = ' + req.body.username);
     console.log('password = ' + req.body.password);
});

app.get('/user', loggedIn, function (req, res, next) {
    User.findById({ _id: req.user._id }, function(err, user) {
        return res.json(user);
    });
});

app.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}


app.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

