var mongoose = require('mongoose');
var User = mongoose.model('Users');
var Device = mongoose.model('Devices');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
config = require('../config');

const errorLog = require('../util/logger').errorlog;
const successLog = require('../util/logger').successlog;

exports.login = function (req,res) {
    User.findOne({userId: req.body.userId},function (err,user) {
        var response;
        if(err) {
            res.json({error : true, message:"Unable to authenticate", "error_details":err});
            errorLog('login: Unable to authenticate. Error : ',err);
        }

        if(!user) {
            res.json({error : true, message:"Authentication failed. User not found."});
            errorLog('login: user not found. UserId: ',req.body.userId);
        } else if(user) {
            if(!passwordHash.verify(req.body.password,user.password)) {
                res.json({ error: true, message: 'Authentication failed. Wrong password.' });
            } else {
                if(user.type == req.body.type) {
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 525600 // expires in 9 years
                    });

                    res.json({error: false, message: "Authentication Successful", token: token,
                        userDetails: {
                            userId:user.userId,
                            name:user.name,
                            emailId:user.emailId,
                            phoneNo:user.phoneNo,
                            type:user.type
                        }
                    });
                } else {
                    res.json({error : true, message:"Unable to authenticate"});
                }
            }
        }
    })
};

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
            errorLog.error('addUser: Unable to create account. Error : ',err);
        } else {
            response = {error: false, message: "User added successfully"};
            successLog.error('addUser: Account created succesfully.');
        }
        res.json(response);
    });
};

exports.updateUser = function (req,res) {
    User.findOne({userId:req.body.userId},function (err,user){
        if(err) {
            res.json({error:true,message:"Unable to update",error_details:err});
            errorLog.error("updateUser: Unable to update user. Error : ",err);
        } else {
            if(!user) {
                res.json({error:true,message:"User not found"});
                errorLog.error("updateUser: Unable to find user. userId : ",userId);
            } else {
                if(req.body.name) {
                    user.name = req.body.name;
                }
                if(req.body.emailId) {
                    user.emailId = req.body.emailId;
                }
                if(req.body.phoneNo) {
                    user.phoneNo = res.body.phoneNo;
                }

                user.save(function (err) {
                    if(err) {
                        res.json({error:true,message:'Unable to save user.',error_details:err});
                        errorLog.error("updateUser: Unable to save user. Error : ",err);
                    } else {
                        res.json({error:false,message:"User details updated."});
                        successLog.info("updateUser: User details updated. userId : ",user.userId);
                    }
                });
            }
        }
    });
};
