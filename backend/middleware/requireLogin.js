//MiddleWare functions are functions that have access to the request (req) object , response(res) object
//and the (next) middleware function in application's request response cyle.

const jwt = require('jsonwebtoken');
const {JWT_TOKEN} = require('../config/key');
const mongoose = require('mongoose');
const User = mongoose.model('user');
module.exports = (req, res, next) => {
  const {authorization} = req.headers;
  if (!authorization) {
    return res.status(401).json({error: 'you have to logged in'});
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, JWT_TOKEN, (err, payload) => {
    if (err) {
      console.log(err);
      return res.status(401).json({error: 'you have to logged in for a while'});
    }
    const {_id} = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
