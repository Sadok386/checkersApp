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
   * Crée et enregistre un utilisateur dans la base de données
   */
  createUser: (req, res) => {
    // Cas d'erreur 400
    if(!req.body.pseudo) {
      return res.status(400).send({
        message: "Bad Request"
      });
    }
    
    // Chiffrage du password
    const passwordEncoded = bcrypt.hashSync(req.body.password);

    // Instanciation du modèle
    const user = new User({
      pseudo: req.body.pseudo, 
      password: passwordEncoded
    });

    // Enregistre le modèle dans la base de données
    user.save().then(() => console.log('[INFO] L\'utilisateur "' + user.pseudo + '" a été ajouté dans la base de donnée'));
  },


}