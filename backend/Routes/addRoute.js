//Requiring necessary modules and files

const express = require('express');
const bcrypt = require('bcrypt');
const requireLogin = require('../middleware/requireLogin');
const {Router} = require('express');
const driver = require('../Models/driver');
const mongoose = require('mongoose');
const router = Router();

//Create  route for Post API- data being sent by driver

router.post('/addRoute', requireLogin, (req, res, next) => {
  driver
    .create(req.body)
    .then(
      (Driver) => {
        console.log('One route Created ', Driver);
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Driver);
      },
      (err) => next(err),
    )
    .catch((err) => next(err));
});

module.exports = router;
//Export file
