const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const CookieStrategy = require('passport-cookie').Strategy;
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');

passport.use(new LocalStrategy(
  (username, password, done) => {
    UserModel.findOne({
      username: username
    }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          error: 'Incorrect username.'
        });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, {
            error: 'Incorrect password.'
          });
        }
      });
    });
  }
));

passport.use(new CookieStrategy(
  (token, done) => {
    User.findByToken({ token: token }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    console.log('deserializeUser', user);
    delete user.password;
    delete user._id;
    delete user._v;
    done(err, user);
  });
});
