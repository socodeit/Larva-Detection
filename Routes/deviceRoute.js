module.exports = function (app) {
    var deviceController = require('../Controllers/deviceController');
    var express = require('express');
    var router = express.Router();
    var jwt = require('jsonwebtoken');
    config = require('../config');
    // app.route('/getDeviceStatus')
    //     .get(deviceController.getDeviceStatus);

    app.route('/updateDeviceStatus/:deviceSecret/:status')
        .post(deviceController.updateDeviceStatus);

    router.use(function (req,res,next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.json({error: true, message: 'Failed to authenticate token.'});
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    router.post('/createDevice',deviceController.createDevice);

    router.post('/addDevice',deviceController.addDevice);

    router.post('/getDeviceStatus',deviceController.getDeviceStatus);

    router.post('/removeDevice',deviceController.removeDevice);

    router.post('/getDeviceList',deviceController.getDeviceList);

    app.use('/api',router);


};
