const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.js');
const bcrypt = require('bcryptjs');

/* POST (create) user */
router.post('/', (req, res, next) => {
  // TODO: validate parameters (username, email, password)

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      res.status(400).send(err);
    } else {
      bcrypt.hash(req.body.password, salt, (err, passwordHash) => {
        if (err) {
          res.status(400).send(err);
        } else {
          const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: passwordHash,
            role: req.body.role,
            createdAt: new Date()
          });

          newUser.save((err, data) => {
            if (err) {
              res.status(400).send(err);
            } else {
              res.send({
                username: data.username
              });
            }
          });
        }
      });
    }
  });
});

/* PUT (update) user by ID. */
/* router.put('/:id', (req, res, next) => {
  const user = new UserModel({
    author: req.body.author,
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    imgUrl: req.body.imgUrl,
    updatedAt: new Date()
  });

  UserModel.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data.username);
    }
  });
}); */

/* DELETE user by ID. */
router.delete('/:id', (req, res, next) => {
  UserModel.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data.username);
    }
  });
});

module.exports = router;
