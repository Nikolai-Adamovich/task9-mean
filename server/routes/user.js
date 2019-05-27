const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.js');
const bcrypt = require('bcryptjs');

/* POST (create) user */
router.post('/', async (req, res, next) => {
  const username = req.body.username.trim();
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  const errorMessages = [];
  const emailRe = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  // username, email, password validation
  if (!username || username.length < 2 || username.length > 20) {
    errorMessages.push('Invalid name');
  }

  if (!email || !emailRe.test(email)) {
    errorMessages.push('Invalid email');
  }

  if (!password || password.length < 6 || password.length > 20) {
    errorMessages.push('Invalid password');
  }

  if (errorMessages.length) {
    res.status(400).send(JSON.stringify({
      name: 'CustomError',
      errorMessages: errorMessages
    }));
  }

  // Check if username has not been registered yet
  try {
    const usernameExists = await UserModel.findOne({
      username: req.body.username
    });

    if (usernameExists) {
      errorMessages.push(`User «${req.body.username}» is already registered`);
      res.status(400).send(JSON.stringify({
        name: 'CustomError',
        errorMessages: errorMessages
      }));
      return;
    }
  } catch (err) {
    res.status(500).send(err);
  }

  // Check if email has not been used yet
  try {
    const emailExists = await UserModel.findOne({
      email: req.body.email
    });

    if (emailExists) {
      errorMessages.push(`Email ${req.body.email} is already used`);
      res.status(400).send(JSON.stringify({
        name: 'CustomError',
        errorMessages: errorMessages
      }));
      return;
    }
  } catch (err) {
    res.status(500).send(err);
  }

  // Registration
  let salt;

  try {
    salt = await bcrypt.genSalt(10);
  } catch (err) {
    res.status(500).send(err);
  }

  let passwordHash;

  try {
    passwordHash = await bcrypt.hash(req.body.password, salt);
  } catch (err) {
    res.status(500).send(err);
  }

  const newUser = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: passwordHash,
    // role: req.body.role,
    role: 'user',
    createdAt: new Date()
  });

  let data;

  try {
    data = await newUser.save();
  } catch (err) {
    res.status(500).send(err);
  }

  res.send({
    username: data.username
  });
});

/* DELETE user by ID */
router.delete('/:userId', async (req, res, next) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.userId);

    res.send({
      username: deletedUser.username
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/* PUT (update) user */
router.put('/', async (req, res, next) => {
  console.log('put:', req.body);
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.body._id, {
      // TODO: validateUser();
      username: req.body.username,
      role: req.body.role,
      email: req.body.email,
    });

    res.send({
      username: updatedUser.username
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/* Get current user */
router.get('/', (req, res, next) => {
  console.log('/user/', req.isAuthenticated(), req.user);
  req.user ? res.json({
    username: req.user.username,
    email: req.user.email,
    role: req.user.role,
  }) : res.json(req.user);
});

module.exports = router;
