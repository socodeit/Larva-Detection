module.exports = function(app) {
  var userController = require('../Controllers/userController');

  // todoList Routes
  app.route('/addUser')
    .post(userController.addUser);

  // app.route('/users/:userid')
  //   .get(userController.deviceList);

  // app.route('/devices/:userid')
  //   .put(userController.addDevice)
  //   .delete(userController.removeDevice);
};
