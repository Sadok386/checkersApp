/*
    ==============================
      Routes
    ==============================
*/

const utils = require('./utils.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (app) => {

  // Initialisation de la stratégie d'authentification avec passport et garder la session du user
  // @see : http://www.passportjs.org/
  app.use(passport.initialize());
  app.use(passport.session());

  /// -----
  /// Login
  /// -----
  app.post('/login', passport.authenticate('local', { successRedirect: '/home', failureRedirect: '/login', failureFlash: true }));

  // Serialiser et Deserialiser
  // serializable sera invoqué lors de l'authentification, et son travail consiste à sérialiser l'instance de l'utilisateur 
  //avec les informations que nous lui transmettons (l'identifiant de l'utilisateur dans ce cas) et à le stocker dans la session via un cookie
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(err, user);
  });

  // Personnalisation des champs car passport utilise 'username' et 'password' par défaut
  // @see: Comment s'authentifier -> http://www.passportjs.org/docs/username-password/
  passport.use(new LocalStrategy({
    usernameField: 'pseudo',
    passwordField: 'password',
  }, utils.login));

  /// ------
  /// Logout
  /// ------
  app.get('/logout', utils.logout);

  /* ================================== MAIN ROUTES =========================== */

  // Crée un utilisateur
  app.post('/createUser', utils.createUser);
}

