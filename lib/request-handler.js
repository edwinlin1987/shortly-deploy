var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');
//var Users = require('../app/collections/users');
//var Links = require('../app/collections/links');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

// exports.fetchLinks = function(req, res) {
//   Links.reset().fetch().then(function(links) {
//     res.send(200, links.models);
//   })
// };

exports.fetchLinks = function(req, res) {
  Link.find({}, function(err,links) {
    if(err) {console.log(err + links);}
    res.send(200, links);
  });
};



exports.saveLink = function(req, res) {
  var uri = req.body.url;
  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  Link.find({url:uri}, function(err, found) {
    if (found.length) {
      console.log('found, ', found);
      res.send(200, found.attributes);
    } else {
      console.log('not found');
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }

        var link = new Link({
          url: uri,
          title: title,
          base_url: req.headers.origin
        });

        // link.shorten();
        link.save(function(err) {
          if (err) throw err;
          console.log('saving link', link);
          res.send(200, link);
        });
      });
    }
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  User.find({username:username}, function(err, user) {
      if (!user.length) {
        res.redirect('/login');
      } else {
        user[0].comparePassword(password, function(match) {
          if (match) {
            util.createSession(req, res, user);
          } else {
            res.redirect('/login');
          }
        })
      }
  });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;



  User.find({ username: username }, function(err, user) {
      console.log(user);
      if (!user.length) {
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save(function(err) {
          if (err) {throw err;}
          util.createSession(req, res, newUser);
        });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    })
};

exports.navToLink = function(req, res) {
  console.log(req.params[0]);
  Link.find({ code: req.params[0] }, function(err, link) {
    console.log(link);
    if (!link.length) {
      res.redirect('/');
    } else {
      return res.redirect(link[0].url);
    }
  });
};
