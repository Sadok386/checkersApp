/*
    ==============================
      Utils (database)
    ==============================
*/
// Appel du modèle User (MongoDB)
const { User } = require("./connection.js")
// Hachage des passwords (chiffrage)
const bcrypt = require('bcrypt-nodejs');

module.exports = {

  /**
   * Login
   */
  login: async (pseudo, password, done) => {
    try {
      const result = await User.findOne({ pseudo: pseudo }, function(err, user) {
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (isPasswordCorrect) {
          console.log("Pseudo et password correct!");
          return done(null, user);
        }
        
        
      });
    } catch (error) {
      console.log('login incorrect')
    }
    
  },

  /**
   * Logout
   */
  logout: (req, res) => {
    req.logout();
    res.redirect('/home');
  },

  /**
   * Crée et enregistre un utilisateur dans la base de données
   */
  createUser: async (req, res) => {
    try {
      // Chiffrage du password
      const passwordEncoded = bcrypt.hashSync(req.body.password);

      // Instanciation du modèle
      const user = new User({
        pseudo: req.body.pseudo, 
        password: passwordEncoded
      });

      // Enregistre le modèle dans la base de données
      const result = await user.save()
      
      // Renvoie l'objet user au client
      res.json({ 'message': 'Utilisateur créé', 'user': result });
    } catch (error) {
      res.json({ message: 'Erreur: existe déjà, mauvaise requête...' })
    }
  },

}