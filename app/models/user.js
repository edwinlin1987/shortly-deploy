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

userSchema.methods.comparePassword = function (string, callback) {
  var match = false;
  if ( string === this.password ){
    match = true;
  }
  callback(match);
};

var User = db.model('User', userSchema);
module.exports = User;
