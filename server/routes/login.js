const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('index', {
    isDev: req.app.get('env') === 'development',
  });
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).send({
        message: info.error
      });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.send(user);
    });
  })(req, res, next);
});

module.exports = router;
