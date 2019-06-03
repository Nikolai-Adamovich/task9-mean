const express = require('express');
const router = express.Router();
const NewsModel = require('../models/news.js');
const UserModel = require('../models/user.js');

router.all('/*', (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    next();
  } else {
    res.redirect('../login');
  }
});

router.get('/', (req, res, next) => {
  res.render('index', {
    isDev: req.app.get('env') === 'development',
  });
});

router.get('/create-article', (req, res, next) => {
  res.render('index');
});

router.get('/users', (req, res, next) => {
  res.render('index');
});

router.get('/edit-news/:slug', (req, res, next) => {
  NewsModel.findOne({
    slug: req.params.slug
  }, (err, news) => {
    if (err || !news) {
      res.redirect('/');
    } else {
      res.render('edit-news', {
        title: 'Edit News',
        news: news
      });
    }
  });
});

router.get('/delete-news/:slug', (req, res, next) => {
  NewsModel.findOne({
    slug: req.params.slug
  }, (err, news) => {
    if (err || !news) {
      res.redirect('/');
    } else {
      res.render('delete-news', {
        title: 'Delete News',
        news: news
      });
    }
  });
});

/* Get list of all users */
router.get('/users-list', (req, res, next) => {
  UserModel.find({}, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(data || []);
    }
  });
});

module.exports = router;
