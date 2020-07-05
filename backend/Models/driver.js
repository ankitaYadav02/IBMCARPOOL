//Models contain the Schema of different objects.
// Our first step in making apersistent data store is to configure our data models.
//So we add a schema layer on top of mongodb using mongoose library

const express = require('express');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

//Driver SChema
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
  photo: {
    type: String,
    required: true,
  },
});

var driver = mongoose.model('driver', driverSchema);
module.exports = driver;
//Export file
