const mongoose = require('mongoose');
const uri = 'mongodb://localhost/checkersData';
const db = mongoose.createConnection(uri);

const testSchema = new Schema({
    name: String,
    password: String,
  });
  
  const Collection = db.model('user', testSchema)
  
  const newCollection = new Collection({ name: 'Poussière', password: 'Poussière' })
  

db.once('connected', function (err) {
    if (err) { return console.error(err) }
    Collection.create(newCollection, function (err, doc) {
      if (err) { return console.error(err) }
      console.log(doc)
      return db.close()
    }) 
});