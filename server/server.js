// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');

var morgan       = require('morgan');
var jwt = require('jsonwebtoken');
var session      = require('express-session');


var config = require('./config/database.js');
var mongoose   = require('mongoose');
mongoose.connect(config.database); // connect to our databa
app.set('superSecret', 'wanghai');

app.use(cookieParser()); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


require('./config/passport')(passport);
var port = process.env.PORT || 8080;        


var router = express.Router();              
require('./routes.js')(router, passport);
app.use('/api', router);


app.listen(port);
console.log('Magic happens on port ' + port);