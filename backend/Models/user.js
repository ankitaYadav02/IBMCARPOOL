//Models contain the Schema of different objects.
// Our first step in making apersistent data store is to configure our data models.
//So we add a schema layer on top of mongodb using mongoose library

const express = require('express');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

//User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  ContactNo: {
    type: Number,
    require: true,
  },
  stripe_customerId: {
    type: String,
  },
});

var user = mongoose.model('user', userSchema);
module.exports = user;
//Export File
