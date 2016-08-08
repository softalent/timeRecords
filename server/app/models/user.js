var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
 
// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/
 
// set up a mongoose model
var UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
});
 
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        // console.log("before hash");
        bcrypt.hash(user.password, 10, function(err, hash){
            // console.log("in hash");
            // console.log(err);
            if(err)
                return next(err);
            user.password = hash;
            next();
        });
    } else {
        return next();
    }
});
 
// UserSchema.methods.comparePassword = function (passw, cb) {
//     bcrypt.compare(passw, this.password, function (err, isMatch) {
//         if (err) {
//             return cb(err);
//         }
//         cb(null, isMatch);
//     });
// };
 
module.exports = mongoose.model('User', UserSchema);