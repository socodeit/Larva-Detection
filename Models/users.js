//TODO Add password encryption

//Dependencies
var mongoose = require("mongoose");
var Schema = mongoose.Schema ;
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');


//Schema
var userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    name: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    password: {
        type: String,
        required: true
    },
    devices: {
        type: [String]
    }
});

// Apply the uniqueValidator plugin to userSchema. 
userSchema.plugin(uniqueValidator);
userSchema.plugin(timestamps);

module.exports = mongoose.model('Users',userSchema);