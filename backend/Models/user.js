const express = require('express')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
   
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    ContactNo:{
        type:Number,
        require:true
    }

})

var user = mongoose.model('user',userSchema);
module.exports = user;