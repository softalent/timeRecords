// Load required packages
var TimeRecord = require('../models/timeRecord');

// Create endpoint /api/beers for POSTS
exports.postTimeRecords = function(req, res) {
  // Create a new instance of the Beer model
  console.log("post");
  var timeRecord = new TimeRecord();

  // Set the beer properties that came from the POST data
  timeRecord.description = req.body.description;
  timeRecord.atDate = req.body.atDate;
  timeRecord.workingHours = req.body.workingHours;
  timeRecord.userId = req.user._id;

  // Save the beer and check for errors
  timeRecord.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'New time record added to the locker!', data: timeRecord });
  });
};

// Create endpoint /api/beers for GET
exports.getTimeRecords = function(req, res) {
  // Use the Beer model to find all beer
  console.log("get");
  TimeRecord.find({userId:req.user._id},function(err, records) {
    console.log(records);
    if (err)
      res.send(err);

    res.json(records);
  });
};

// Create endpoint /api/beers/:beer_id for GET
exports.getTimeRecord = function(req, res) {
  // Use the Beer model to find a specific beer
  TimeRecord.findById({userId: req.user._id,_id:req.params.record_id}, function(err, timeRecord) {
    if (err)
      res.send(err);

    res.json(timeRecord);
  });
};

// Create endpoint /api/beers/:beer_id for PUT
exports.putTimeRecord = function(req, res) {
  // Use the Beer model to find a specific beer
  TimeRecord.findById({userId: req.user._id,_id:req.params.record_id}, function(err, timeRecord) {
    if (err)
      res.send(err);

    // Update the existing beer quantity
    timeRecord.atDate = req.body.atDate;
    timeRecord.workingHours = req.body.workingHours;

    // Save the beer and check for errors
    timeRecord.save(function(err) {
      if (err)
        res.send(err);

      res.json(timeRecord);
    });
  });
};

// Create endpoint /api/beers/:beer_id for DELETE
exports.deleteTimeRecord = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  TimeRecord.findByIdAndRemove({userId: req.user._id,_id:req.params.record_id}, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Time Record removed from the locker!' });
  });
};
