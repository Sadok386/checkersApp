/*
    ==============================
      Routes
    ==============================
*/

const utils = require('./utils.js');

module.exports = (app) => {

  // Crée un utilisateur
  app.post('/createUser', utils.createUser);


}
