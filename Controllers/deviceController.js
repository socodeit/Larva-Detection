var mongoose = require('mongoose');
var Device = mongoose.model('Devices');
var User = mongoose.model('Users');

const errorLog = require('../util/logger').errorlog;
const successLog = require('../util/logger').successlog;

exports.createDevice = function (req,res) {
    User.findOne({userId:req.body.userId},function (err,user) {
        if(err) {
            res.json({error:true,message:'Something went wrong.',error_detail:err});
            errorLog.error('createDevice: Error while finding user : ',err);
        } else {
            if(!user || user.type != 0) {
                res.json({error:true,message:'Not allowed to create device'});
                errorLog.error('createDevice: User not authorised. UserId : ',req.body.userId);
            } else {
                var device  = new Device;
                device.deviceId = req.body.deviceId;
                device.name = req.body.name;
                device.status = 100;
                device.deviceSecret = req.body.deviceSecret;
                device.save(function(err) {
                    if(err) {
                        res.json({error:true,message:'Unable to create device.',error_detail:err});
                        errorLog.error('createDevice: Unable to create device. Error : ',err);
                    } else {
                        successLog.info('createDevice: Device created successfully');
                        res.json({error:false,message:'Device created successfully.'})
                    }
                });
            }
        }

    });
};

//https://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose
exports.addDevice = function (req,res) {

    Device.findOne({deviceId:req.body.deviceId},function (err,device) {
        if (err) {
            res.json({error: true, message: 'Something went wrong.', error_detail: err});
            errorLog.error('addDevice: Error while finding device. Details : ',err);
        } else {
            if (!device) {
                res.json({error: true, message: 'No device found.'})
                errorLog.error('addDevice: No device with device id : ',req.body.deviceId);
            } else {
                User.findOne({userId: req.body.userId}, function (err, user) {
                    if (err) {
                        res.json({error: true, message: 'Something went wrong.', error_detail: err});
                        errorLog.error('addDevice: Error while verifying user. Error : ',err);
                    } else {
                        if (!user) {
                            res.json({error: true, message: 'No user with this userId'});
                            errorLog.error('addDevice: No user with user id : ',req.body.userId);
                        } else {
                            var isPresent = user.devices.some(function (t) { return t == req.body.deviceId; });

                            if(!isPresent) {
                                user.devices.push(req.body.deviceId);
                            }
                            user.save(function (err) {
                                var response;
                                if (err) {
                                    res.json({
                                        error: true,
                                        message: "Something went wrong",
                                        error_detail: err
                                    });
                                    errorLog.error('addDevice: Error while saving user details',err);
                                } else {
                                    isPresent = device.users.some(function (t) { return t == req.body.userId; });
                                    if(!isPresent) {
                                        device.users.push(req.body.userId);
                                    }
                                    if (req.body.name) {
                                        device.name = req.body.name;
                                    }
                                    device.save(function (err) {
                                        if (err) {
                                            res.json({
                                                error: true,
                                                message: "Something went wrong",
                                                error_detail: err
                                            });
                                            errorLog.error('addDevice: Error while saving device details. Error : ',err);
                                        } else {
                                            res.json({error:false, message:"Device added successfully."});
                                            successLog.info('addDevice: Device added successfully');
                                        }
                                    })
                                }
                            });

                        }
                    }
                });
            }
        }
    });
};

exports.updateDeviceStatus = function (req,res) {

    console.log(req.params.deviceSecret);
    Device.findOne({deviceSecret:req.params.deviceSecret}, function (err,device) {
       if(err) {
           res.json({error:true,message:"Something went wrong.",error_details:err});
           errorLog.error('updateDeviceStatus: Error while updating device status. Error : ',error);
       } else {
           if(!device) {
               res.json({error:true,message:"Device not found."});
               errorLog.error('updateDeviceStatus: Device not found with deviceSecret : ',req.params.deviceSecret);
           } else {
               device.status = req.params.status;
               device.save(function (err) {
                   if (err) {
                       res.json({error: true, message: "Unable to update", error_details: err});
                       errorLog.error('updateDeviceStatus: Unable to update. Error : ',err);
                   } else {
                       res.json({error: false, message: "Device status updated."});
                       successLog.info('updateDeviceStatus: Device updated successfully.');
                   }
               });
           }
       }
    });

};

exports.getDeviceStatus = function (req,res) {
    Device.findOne({deviceId:req.body.deviceId},function (err,device) {
        if(err) {
            res.json({error:true,message:"Something went wrong.",error_detail:err});
            errorLog.error('getDeviceStatus: Error while finding device. Error : ',err);
        } else {
            if(!device) {
                res.json({error:true, message:"Device not found."});
                errorLog.error('getDeviceStatus: Device not found with device id ',req.body.deviceId);
            } else {
                res.json({
                    error:false,
                    message:"Success",
                    details: {
                        deviceId:device.deviceId ,
                        name:device.name,
                        createdAt:device.createdAt,
                        updatedAt:device.updatedAt,
                        status:device.status
                    }});
                successLog.info('getDeviceStatus: Device details sent. Details : ',{
                    error:false,
                    message:"Success",
                    details: {
                        deviceId:device.deviceId ,
                        name:device.name,
                        createdAt:device.createdAt,
                        updatedAt:device.updatedAt,
                        status:device.status
                    }});
            }
        }
    });
};