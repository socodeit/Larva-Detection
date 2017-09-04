express        = require('express');
bodyParser     = require('body-parser');
app            = express();
mongoose       = require('mongoose');
User           = require('./Models/users');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./Routes/userRoute'); //importing route
routes(app); //register the route

port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('We are live on ' + port);
});