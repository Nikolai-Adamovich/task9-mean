const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', {
    isDev: req.app.get('env') === 'development',
  });
});

module.exports = router;
