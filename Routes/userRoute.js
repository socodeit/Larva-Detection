module.exports = function (app) {
    var userController = require('../Controllers/userController');
    var express = require('express');
    var router = express.Router();

    app.route('/login')
        .post(userController.login);

    app.route('/addUser')
        .post(userController.addUser);

};
