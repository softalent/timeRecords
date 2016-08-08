// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var passport = require('passport');


////db connecting
var config = require('./config/database.js');
var mongoose   = require('mongoose');
mongoose.connect(config.database); // connect to our databa
require('./config/passport')(passport);
// Use the passport package in our application
app.use(passport.initialize());

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port





var User   = require('./app/models/user'); // get our mongoose model


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var timeRecordController = require('./app/controllers/timeRecord');
var userController = require('./app/controllers/user');


// more routes for our API will happen here
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log(req.headers);
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});




//user end points
router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers);

router.route('/signup')
  .post(userController.signupUser);
router.route('/authenticate')
  .post(userController.authenticate);
router.route('/memberinfo')
  .get(passport.authenticate('jwt', { session: false}),userController.memberinfo);



// Create endpoint handlers for /timeRecords
router.route('/timeRecords')
  .post( passport.authenticate('jwt', { session: false}),timeRecordController.postTimeRecords)
  .get(passport.authenticate('jwt', { session: false}),timeRecordController.getTimeRecords);

// Create endpoint handlers for /timeRecords/:record_id
router.route('/timeRecords/:record_id')
  .get(passport.authenticate('jwt', { session: false}), timeRecordController.getTimeRecord)
  .put( passport.authenticate('jwt', { session: false}),timeRecordController.putTimeRecord)
  .delete( passport.authenticate('jwt', { session: false}),timeRecordController.deleteTimeRecord);



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);





// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);