module.exports = function (app) {
    var userController = require('../Controllers/userController');
    var express = require('express');
    var router = express.Router();

    app.route('/login')
        .post(userController.login);

    app.route('/addUser')
        .post(userController.addUser);

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

    router.post('updateUser',userController.updateUser);
    app.use('/user',router);
};
