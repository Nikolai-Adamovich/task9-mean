const express = require('express');
const router = express.Router();
const NewsModel = require('../models/news.js');

/* GET news listing. */
/* router.get('/', (req, res, next) => {
  NewsModel.find({}, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
}); */

/* GET news by slug. */
router.get('/:slug', (req, res, next) => {
  NewsModel.findOne({
    slug: req.params.slug
  }, (err, data) => {
    if (err || !data) {
      res.redirect('/');
    } else {
      res.render('news', data);
    }
  });
});

/* POST (create) news */
router.post('/', (req, res, next) => {
  const news = new NewsModel({
    author: req.user.username,
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    imgUrl: req.body.imgUrl,
    publishedAt: new Date()
  });

  news.save((err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

/* PUT (update) news by ID. */
router.put('/:id', (req, res, next) => {
  const updateObj = {
    author: req.user.username,
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    imgUrl: req.body.imgUrl,
    updatedAt: new Date()
  };

  NewsModel.findByIdAndUpdate(req.params.id, updateObj, {
        new: true
      }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

/* DELETE news by ID. */
router.delete('/:id', (req, res, next) => {
  NewsModel.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
