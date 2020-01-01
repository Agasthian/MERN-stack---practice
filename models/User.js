//This file creates a user Model Class(COLLECTION) that is created using mongoose
const mongoose = require('mongoose');
//const Schema = mongoose.Schema; is refactored into (Destructring)
const { Schema } = mongoose; // A Schema gives a predefined properties that our records have in DB

const userSchema = new Schema({
  googleId: String
}); //Here er create a user schema with googleId - string type

mongoose.model('users', userSchema); //Instructing to creatre a new collection. Two arguments means we push new schema into arguments
