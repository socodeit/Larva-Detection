var mongoose = require('mongoose');
var User = mongoose.model('Users');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
config = require('../config');
exports.login = function (req,res) {
    User.findOne({userId: req.body.userId},function (err,user) {
        var response;
        if(err) {
            res.json({"error" : true, "message":"Unable to authenticate", "error_details":err});
        }
        if(!user) {
            res.json({"error" : true, "message":"Authentication failed. User not found."});
        } else if(user) {
            if(!passwordHash.verify(req.body.password,user.password)) {
                res.json({ "error": true, message: 'Authentication failed. Wrong password.' });
            } else {
                if(user.type == req.body.type) {
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 525600 // expires in 9 years
                    });

                    res.json({"error": false, "message": "Authentication Successful", "token": token});
                } else {
                    res.json({"error" : true, "message":"Unable to authenticate"});
                }
            }
        }
    })
}

exports.addUser = function (req, res) {

    //Creating a user object
    var user = new User;
    user.type = req.body.type;
    user.userId = req.body.userId;
    user.name = req.body.name;
    user.emailId = req.body.emailId;
    user.password = passwordHash.generate(req.body.password);
    user.phoneNo = req.body.phoneNo;
    user.devices = [];
    user.save(function (err) {
        var response;
        if (err) {
            response = {error: true, message: "Unable to create account", "error_detail": err};
        } else {
            response = {error: false, message: "User added successfully"};
        }
        res.json(response);
    });
}

