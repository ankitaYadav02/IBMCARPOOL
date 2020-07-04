const express = require('express');
const bcrypt = require('bcrypt');
const health = require('../Models/health');
const requireLogin = require('../middleware/requireLogin');
const {Router} = require('express');

const router = Router();

router.post('/healthdetails', requireLogin, (req, res) => {
  const {
    DryCough,
    tiredness,
    fever,
    sorethroat,
    diarrhoea,
    postedBy,
  } = req.body;
  console.log(req.body);
  const userhealth = new health({
    DryCough,
    tiredness,
    fever,
    sorethroat,
    diarrhoea,
    postedBy: req.user,
  });
  userhealth
    .save()
    .then((Health) => {
      res.json({message: 'data saved'});
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/health', requireLogin, (req, res) => {
  console.log(req.user._id);
  health
    .findOne({postedBy: req.user._id})
    .then((Health) => {
      res.json(Health);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/updatehealth', requireLogin, (req, res) => {
  console.log(req.user._id);
  health
    .findOneAndUpdate(
      {postedBy: req.user._id},
      {
        $set: {
          DryCough: req.body.DryCough,
          tiredness: req.body.tiredness,
          fever: req.body.fever,
          sorethroat: req.body.sorethroat,
          diarrhoea: req.body.diarrhoea,
        },
      },
      {new: true},
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.json(result);
      },
    )
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
