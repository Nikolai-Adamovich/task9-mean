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
  res.render('admin', { title: 'Admin' });
});

router.get('/create-news', (req, res, next) => {
  res.render('create-news', { title: 'Create News' });
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

router.get('/users-list', async (req, res, next) => {
  try {
    const usersPerPage = req.session.usersPerPage;
    const usersList = await UserModel.find().limit(usersPerPage);
    const usersCount = await UserModel.find().countDocuments();
    const pagesCount = Math.ceil(usersCount / usersPerPage);

    res.render('users-list', {
      title: 'Users List',
      usersList: usersList,
      pageNumber: 1,
      pagesCount: pagesCount,
      path: '/admin/users-list/'
    });
  } catch (error) {
    res.render('error');
  }
});

router.get('/users-list/:pageNumber(0|1)', (req, res, next) => {
  res.redirect('/admin/users-list');
});

router.get('/users-list/:pageNumber(\\d+)', async (req, res, next) => {
  try {
    const usersPerPage = req.session.usersPerPage;
    const pageNumber = parseInt(req.params.pageNumber, 10);
    const usersCount = await UserModel.find().countDocuments();
    const pagesCount = Math.ceil(usersCount / usersPerPage);

    if (!usersCount || pageNumber > pagesCount) {
      res.redirect('/');
    } else {
      const usersList = await UserModel.find().skip((pageNumber - 1) * usersPerPage).limit(usersPerPage);

      res.render('users-list', {
        title: `Users List: Page ${pageNumber}`,
        usersList: usersList,
        pageNumber: pageNumber,
        pagesCount: pagesCount,
        path: '/admin/users-list/'
      });
    }
  } catch (error) {
    res.render('error');
  }
});

module.exports = router;