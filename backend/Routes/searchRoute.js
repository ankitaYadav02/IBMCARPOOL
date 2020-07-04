const express = require('express');
const bcrypt = require('bcrypt');
const requireLogin = require('../middleware/requireLogin');
const {Router} = require('express');
const passenger = require('../Models/passenger');
const mongoose = require('mongoose');
const router = Router();

router.post('/searchRoute', requireLogin, (req, res) => {
  console.log(req.body)
  passenger.create(req.body)
    .then(
      (Passenger) => {
        console.log('New Passenger Created ', Passenger);
        res.StatusCode = 200;
        res.json(Passenger);
      }
    )
    .catch((err) => next(err));
});

module.exports = router;
