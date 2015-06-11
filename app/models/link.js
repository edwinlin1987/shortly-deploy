var mongoose = require('mongoose');
var db = require('../config');
var crypto = require('crypto');

var Schema = mongoose.Schema;

// mongoose.connect('mongodb://localhost/test');

var linkSchema = new Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number,
  created_at: Date,
  updated_at: Date
});

linkSchema.methods.shorten = function(){
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
};

var Link = db.model('Link', linkSchema);
module.exports = Link;

