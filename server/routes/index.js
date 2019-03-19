const express = require('express');
const router = express.Router();
const NewsModel = require('../models/news.js');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const newsPerPage = req.session.newsPerPage;
    const newsList = await NewsModel.find().limit(newsPerPage);
    const newsCount = await NewsModel.find().countDocuments();
    const pagesCount = Math.ceil(newsCount / newsPerPage);

    res.render('index', {
      title: 'Some News',
      newsList: newsList,
      pageNumber: 1,
      pagesCount: pagesCount
    });
  } catch (error) {
    res.render('error');
  }
});

router.get('/:pageNumber(0|1)', (req, res, next) => {
  res.redirect('/');
});

/* Pages 2, 3, 4 ... */
router.get('/:pageNumber(\\d+)', async (req, res, next) => {
  try {
    const newsPerPage = req.session.newsPerPage;
    const pageNumber = parseInt(req.params.pageNumber, 10);
    const newsCount = await NewsModel.find().countDocuments();
    const pagesCount = Math.ceil(newsCount / newsPerPage);

    if (!newsCount || pageNumber > pagesCount) {
      res.redirect('/');
    } else {
      const newsList = await NewsModel.find().skip((pageNumber - 1) * newsPerPage).limit(newsPerPage);

      res.render('index', {
        title: `Some News: Page ${pageNumber}`,
        newsList: newsList,
        pageNumber: pageNumber,
        pagesCount: pagesCount
      });
    }
  } catch (error) {
    res.render('error');
  }
});

module.exports = router;
