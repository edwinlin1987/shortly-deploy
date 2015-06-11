var mongoose = require('mongoose');
var db = require('../config');

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

var Link = db.model('Link', linkSchema);
module.exports = Link;

