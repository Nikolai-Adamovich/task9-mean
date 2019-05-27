const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  req.logout();
  res.status(200).end();
});

module.exports = router;
