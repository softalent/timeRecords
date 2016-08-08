// Load required packages
var User = require('../models/user');
var jwt         = require('jwt-simple');
var bcrypt =require('bcrypt');
var config = require('../../config/database.js');
var passport = require('passport');
var jwt = require('jsonwebtoken');
exports.authenticate = function(req,res){
	User.findOne({
	    name: req.body.name
	}, function(err, user) {

	    if (err) throw err;

	    if (!user) {
	      res.json({ success: false, message: 'Authentication failed. User not found.' });
	    } else if (user) {

			bcrypt.compare(req.body.password, user.password, function(err, isMatch){
				if(err){
					next(err);
				}	
	
				if(!isMatch)
					res.json({ success: false, message: 'Authentication failed. Wrong password.' });
				else{
					var token = jwt.sign(user, config.secret, {
						expiresIn:60*60*24 // expires in 24 hours
					});

					// return the information including token as JSON
					res.json({
						success: true,
						message: 'Enjoy your token!',
						token: token
					});
				}

			});
	    }
	});
}