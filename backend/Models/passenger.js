//Models contain the Schema of different objects.
// Our first step in making apersistent data store is to configure our data models.
//So we add a schema layer on top of mongodb using mongoose library

const express = require('express');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

//Passenger Schema
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
//Export File
