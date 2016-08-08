// Load required packages
var User = require('../models/user');
var jwt         = require('jwt-simple');
var config = require('../../config/database.js');
var passport = require('passport');

exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};
exports.signupUser = function(req, res){
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
};

exports.login = function(req,res,next){
   var user = new User({
    name: req.body.name,
    password: req.body.password
  });

  console.log(user);
   req.login(user, function(err) {
    if (err) { return next(err); }
    return res.json(user);
  });
};
exports.logout = function(req,res,next){
  req.logout();
  res.json({success:true, msg:"log out"});
};
exports.memberinfo = function(req, res){
  res.send(req.user);
  // console.log(token);
  // var token = getToken(req.headers);
  // console.log(token);
  // if (token) {
  //   var decoded = jwt.decode(token, config.secret);
  //   User.findOne({
  //     name: decoded.name
  //   }, function(err, user) {
  //       if (err) throw err;
 
  //       if (!user) {
  //         return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
  //       } else {
  //         res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
  //       }
  //   });
  // } else {
  //   return res.status(403).send({success: false, msg: 'No token provided.'});
  // }
};
