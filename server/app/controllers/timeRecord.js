var TimeRecord = require('../models/timeRecord');


exports.postTimeRecords = function(req, res) {

  console.log("post");
  var timeRecord = new TimeRecord();


  timeRecord.description = req.body.description;
  timeRecord.atDate = req.body.atDate;
  timeRecord.workingHours = req.body.workingHours;
  timeRecord.userId = req.user._id;


  timeRecord.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'New time record added to the locker!', data: timeRecord });
  });
};

exports.getTimeRecords = function(req, res) {
  // Use the Beer model to find all beer

  TimeRecord.find({userId:req.user._id},function(err, records) {

    if (err)
      res.send(err);

    res.json(records);
  });
};


exports.getTimeRecord = function(req, res) {

  TimeRecord.findById({userId: req.user._id,_id:req.params.record_id}, function(err, timeRecord) {
    if (err)
      res.send(err);

    res.json(timeRecord);
  });
};


exports.putTimeRecord = function(req, res) {

  TimeRecord.findById({userId: req.user._id,_id:req.params.record_id}, function(err, timeRecord) {
    if (err)
      res.send(err);


    timeRecord.atDate = req.body.atDate;
    timeRecord.workingHours = req.body.workingHours;

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
