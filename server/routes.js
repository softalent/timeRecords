// var passport = require('passport');  
// var express = require('express');  
// var config = require('../config/main');  
var jwt = require('jsonwebtoken');
module.exports = function(router, passport){

	var timeRecordController = require('./app/controllers/timeRecord');
	var userController = require('./app/controllers/user');
	var authController = require('./app/controllers/auth');
	router.use(function(req, res, next) {
	    // do logging

	    console.log('Something is happening.');
	    next(); // make sure we go to the next routes and don't stop here
	});
	router.get('/', function(req, res) {
	    res.json({ message: 'hooray! welcome to our api!' });   
	});

	//user end points
	router.route('/users')
	  .get(userController.getUsers);

	router.route('/signup')
	  .post(userController.signupUser);

	router.route('/authenticate')
	  .post(authController.authenticate);




	router.route('/memberinfo')
	  .get(passport.authenticate('jwt', { session: false}),userController.memberinfo);
	router.route('/login')
	  .post(userController.login);
	router.route('/logout')
	  .get(userController.logout);


	// Create endpoint handlers for /timeRecords
	// passport.authenticate('jwt', { session: false}),
	console.log(passport.authenticate);
	router.route('/timeRecords')
	  .post(timeRecordController.postTimeRecords)
	  .get(timeRecordController.getTimeRecords);

	// Create endpoint handlers for /timeRecords/:record_id
	router.route('/timeRecords/:record_id')
	  .get(passport.authenticate('local', { session: false}), timeRecordController.getTimeRecord)
	  .put( passport.authenticate('local', { session: false}),timeRecordController.putTimeRecord)
	  .delete( passport.authenticate('local', { session: false}),timeRecordController.deleteTimeRecord);

};