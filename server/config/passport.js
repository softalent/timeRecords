var JwtStrategy = require('passport-jwt').Strategy;
var User = require('../app/models/user');
var config = require('../config/database'); 
var opts = {};
opts.jwtFromRequest = function(req) {

    var token = null;
    if (req && req.headers) {
        token = req.headers.authorization;
    }
    return token;
};
opts.secretOrKey = config.secret;
module.exports = function(passport) {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({_id: jwt_payload._doc._id}, function(err, user) {

            if (err) {
              return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
              done(null, false);
            }
        });
        
    }));
};
