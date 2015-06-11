var mongoose = require('mongoose');
//if process.env.sdfasdf
//
var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/test';
mongoose.connect(connectionString);
var db = mongoose;

module.exports = db;






