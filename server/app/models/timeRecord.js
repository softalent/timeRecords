var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var timeRecordSchema  = new Schema({
    description: String,
    atDate: Date,
    workingHours:Number,
    userId: String,
});

module.exports = mongoose.model('timeRecord', timeRecordSchema);