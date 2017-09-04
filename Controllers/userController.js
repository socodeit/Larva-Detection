var mongoose = require('mongoose');
var User = mongoose.model('Users');

exports.addUser = function(req,res) {
    
    //Creating a user object
    var user = new User;
    user.userId = req.userId;
    user.name = req.name;
    user.emailId = req.emailId;
    user.password = req.password;
    
    user.save(function(err){
        var response;
       if(err) {
           response = { "error": true, "message": "Unable to create account"};
       } else {
           response = { "error": false, "message": "User added successfully"};
       }
       res.json(response);
    });
}
