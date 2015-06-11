var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var db = mongoose;

module.exports = db;

// var dog = function () {
//   var userSchema = mongoose.Schema({
//     username: String,
//     password: String
//   });

//   var User = mongoose.model('User', userSchema);

//   var first = new User({ name: 'bob'});

//   console.log(first.name);

//   first.save(function( err, user) {
//     if(err) { return console.error(err);}
//     console.log(user.name);
//   });

//   User.find(function(err, users) {
//     if (err) { return console.err(err);}
//     console.log(users);
//   });
// };

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function(callback) {

// });































// var server = new mongodb.Server("127.0.0.1", 27017, {});

// var client = new mongodb.Db('test',server);

// client.open(function(err, p_client) {
//   console.log('connected to mongodb!');

//   client.createCollection("demo-collection", function(err, collection) {
//     console.log("Created collection");

//     var doc = {name: "Jean Valjean", password: "12345"};

//     collection.insert( doc, function(err,docs) {
//       console.log('inserted document.');
//       client.close();
//     });
//   });


// });

// client

// module.exports = client;
