const express = require('express');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const passengerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  contactNo: {
    type: Number,
    require: true,
  },
  pickUp: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  healthStatus: {
    type: String,
    require: true,
  },
});

var passenger = mongoose.model('passenger', passengerSchema);
module.exports = passenger;
