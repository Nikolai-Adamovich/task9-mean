const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {
    isDev: req.app.get('env') === 'development',
  });
});

module.exports = router;
