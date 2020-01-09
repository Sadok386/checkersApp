/*
    ==========================================
      Connexion à la base de données MongoDB
    ==========================================
*/

/// -----------
/// Dépendances
/// -----------

const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);

/// ----------------------
/// Mongoose configuration
/// ----------------------

const url = 'mongodb://localhost:27017/database'

// 1. Connexion à la base de données
mongoose.connect(url, {useNewUrlParser: true }, function(err) {
  if (err) {
      console.log('[ERROR] Erreur de connexion à la base de données : ', err);
  } else {
      console.log('[INFO] Connexion à la base de données établie');
  }
});

// 2. Définition des schémas
// L'id est automatiquement créé par MongoDB
const userSchema = new mongoose.Schema({
  pseudo: { type: String, unique: true },
  password: String,
  socketID: String
});

// 3. Compiler les schémas en modèles
const User = mongoose.model('User', userSchema);

// 4. Instanciation de modèles (ici données de test)
const poussiere = new User ({
  pseudo: 'Poussière',
  password: 'Poussière',
  socketID: null
});

// 5. Enregistrer les modèles dans la base de données
poussiere.save().then(() => console.log('[INFO] L\'utilisateur "' + poussiere.pseudo + '" a été ajouté dans la base de donnée'));

/// ----------------------
/// Exports
/// ----------------------
module.exports = {
  User: mongoose.model('User', userSchema)
}