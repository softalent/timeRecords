var JwtStrategy = require('passport-jwt').Strategy;
var User = require('../app/models/user');
var config = require('../config/database'); // get db config file
module.exports = function(passport) {
    var opts = {};
    // opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    // console.log(opts);
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload._id);
        User.findOne({_id: jwt_payload._id}, function(err, user) {
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
