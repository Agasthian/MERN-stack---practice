const express = require('express'); //Express Lib
const mongoose = require('mongoose'); // Mongoose Lib
const cookieSession = require('cookie-session'); //Cookie - Session Lib
const passport = require('passport'); // Passport Lib
const bodyParser = require('body-parser');
const keys = require('./config/keys'); // keys.js fiels
//Order of importing is important, add user model first and then passport
require('./models/User'); // Including Mongoose User model class STEP 5
require('./services/passport'); //Adding the passport file into the index file (passport is in service folder) - STEP 3

mongoose.connect(keys.mongoURI); //Connecting Mongoose Library to Monogo DB Instance (from keys.js) STEP 4

const app = express(); // STEP 1

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
); // Creating a cookie , valid for 30days with a key  - STEP 6
//Cookie session(middleware) takes the data out of cookie and assigns it to req.seesion proprerty

app.use(passport.initialize()); //STEP - 7
app.use(passport.session());

require('./routes/authRoutes')(app); //Including the auth Route(Route folder) into index and calling it with express app - writen using short hand (the file returns a function and we are calling it with express app) - STEP 2
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
