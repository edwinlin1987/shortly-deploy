var mongoose = require('mongoose');
var db = require('../config');

var Schema = mongoose.Schema;

// mongoose.connect('mongodb://localhost/test');

var userSchema = new Schema({
  username: { type: String, required: true, unique: true},
  password: {type:String, required: true},
  created_at: Date,
  updated_at: Date
});

var User = db.model('User', userSchema);
module.exports = User;
