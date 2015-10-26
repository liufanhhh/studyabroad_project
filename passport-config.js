var LocalStrategy = require('passport-local').Strategy;

var User = require('./model/UserProfileModel');

module.exports = function(passport) {

  passport.serializeUser(function(user, next) {
    next(null, user.id);
  });

  passport.deserializeUser(function(id, next) {
    User.findById(id, function(err, user) {
      next(err, user);
    });
  });

  var fieldSetting = {
    usernameField: 'email',
    passwordField: 'password'
  };

  passport.use('local-login', new LocalStrategy(fieldSetting, function(email, password, next) {
    User.findOne({'email': email}, function(err, user) {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(null, false);
      };

      if (!user.isValidPassword(password)) {
        return next(null, false);
      };

      return next(null, user);

    });

  }));

}
