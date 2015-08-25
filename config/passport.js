var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, callback) {
    callback(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
      callback(err, user);
    });
  });

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback){
    // Searching for user from login form ONCE CREATED
    User.findOne({ 'local.email': email}, function(err, user) {
      if(err) return callback(err);

      // if user not found
      if(!user) return callback(null, false,, req.flash('loginMessage', 'Please sign up!'));

      // Checking correct password
      if(!user.validPassword(password)) return callback(null, false, req.flash('loginMessage', 'Wrong password'));

      // User Authenticated
      return callback(null, user)

    })
  }));
  