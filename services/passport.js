const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose'); //Mongoose lib for importing user class
const keys = require('../config/keys');

const User = mongoose.model('users'); //Importing Mongoose user class inside passport. One arugment means we pull from mongoose

//step 4 - Generating Uniq id for passport to use in cookie // 1st arg - the same user from  mongo db (i.e assinging data to cookie)
passport.serializeUser((user, done) => {
  done(null, user.id); // 1st arg - no error obj , 2nd arg - the id generated by mongo db is used. Google id is not used, becoz of multiple O auth like fb, google, linkedin
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//Intializing passport using google Strategy(google o Auth)
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback' // return route after reaching to google user access page
    },
    (accessToken, refreshToken, profile, done) => {
      //step 1
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //We alredy have a record of the user //step 2
          done(null, existingUser); //First argument return null means no error, 2nd argu - user record
        } else {
          //We dont have a record so make new one
          //A model instance is created and saved to DB //step 3
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
