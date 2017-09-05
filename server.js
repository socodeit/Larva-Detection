express        = require('express');
bodyParser     = require('body-parser');
app            = express();
mongoose       = require('mongoose');
User           = require('./Models/users');
Device         = require('./Models/devices');
config         = require('./config');
morgan         = require('morgan');

mongoose.Promise = global.Promise;
mongoose.connect(config.database,{ useMongoClient: true });

app.set('supersecret',config.secret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); //To log all requests

app.get('/',function (req,res) {
    res.send("Welcome, You won't find anything here...!!");
})
var userRoutes = require('./Routes/userRoute'); //importing route
var deviceRoutes = require('./Routes/deviceRoute');
userRoutes(app); //register the route
deviceRoutes(app);
port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('We are live on ' + port);
});