var User = require('../app/models/user');
var config = require('../config/database'); // get db config file
var JwtStrategy = require('passport-jwt').Strategy;
    // ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local');

module.exports = function(passport) {
 const localOptions = { 
                      usernameField: 'name' 
                    };  
  const localLogin = new LocalStrategy(localOptions, function(name, password, done) {  
    User.findOne({ name: name }, function(err, user) {
      if(err) { return done(err); }
      if(!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

      user.comparePassword(password, function(err, isMatch) {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }
        return done(null, user);
      });
    });
  });

  const jwtOptions = {  
    // Telling Passport to check authorization headers for JWT
    // jwtFromRequest: ExtractJwt.fromAuthHeader(),
    // Telling Passport where to find the secret
    secretOrKey: config.secret
  };
  const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {  
    console.log(payload);
    User.findById(payload._id, function(err, user) {
      if (err) { return done(err, false); }

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  });
  passport.use(jwtLogin);  
  passport.use(localLogin);

};
