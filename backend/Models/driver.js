const express = require('express');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  contactNo: {
    type: Number,
    require: true,
  },
  vehicleLicense: {
    type: Number,
    require: true,
  },
  sanitization: {
    type: Buffer,
    require: true,
  },
  pickUp: {
    type: String,
    require: true,
  },
  destination: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
});

var driver = mongoose.model('driver', driverSchema);
module.exports = driver;
