const express = require('express');
const bcrypt = require('bcrypt');
const requireLogin = require('../middleware/requireLogin');
const {Router} = require('express');
const mongoose = require('mongoose');
const passenger = require('../Models/passenger');
const router = Router();

router.post('/bookRoute', requireLogin, (req, res, next) => {
  passenger
    .create(req.body)
    .then(
      (Passenger) => {
        console.log('One route Created ', passenger);
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(driver);
      },
      (err) => next(err),
    )
    .catch((err) => next(err));
});

module.exports = router;
