//Dependencies
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');

//Schema
var deviceSchema = new Schema({
    deviceSecret: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    deviceId: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    users: {
        type: [String]
    }
});

// Apply the uniqueValidator plugin to userSchema.
deviceSchema.plugin(uniqueValidator);
deviceSchema.plugin(timestamps);

module.exports = mongoose.model('Devices', deviceSchema);