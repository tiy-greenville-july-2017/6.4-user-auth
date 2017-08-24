var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session'),
    flash = require('express-flash-messages');

var router = require('./routes.js');
var User = require('./models/user');


var app = express();


/**
 * Database config
 */

var database = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
mongoose.connect(database);


/**
 * View Config & Static
 */

app.engine('handlebars', handlebars({'defaultLayout': 'base'}));
app.set('view engine', 'handlebars');


/**
 * Passport user auth config
 */
passport.use('local-login', new LocalStrategy(
  function(username, password, done) {
    User.authenticate(username, password, function(err, user) {
       if (err) {
           return done(err)
       }
       if (user) {
           return done(null, user)
       } else {
           return done(null, false, {
               message: "There is no user with that username and password."
           })
       }
   })
}));

passport.use('local-signup', new LocalStrategy(
  function(username, password, done){
    console.log('local-signup');
    console.log(username, password);
    User.signup(username, password, function(err, user){
      if (err) {
          return done(err)
      }
      if (user) {
          return done(null, user)
      } else {
          return done(null, false, {
              message: "There is already a user with that username."
          });
      }
    });
  }
));

 passport.serializeUser(function(user, done) {
     done(null, user.id);
 });

 passport.deserializeUser(function(id, done) {
     User.findById(id, function(err, user) {
         done(err, user);
     });
 });


/**
 * Middleware
 */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/**
 * Router
 */

router(app);

app.listen(process.env.PORT || 3000);
