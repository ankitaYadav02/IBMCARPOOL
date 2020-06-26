const express = require('express')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;
const healthSchema = new mongoose.Schema({
    DryCough:{
        type:Boolean,
        require:true,
        default:false
    },
    tiredness:{
        type:Boolean,
        require:true,
        default:false
    },
    fever:{
        type:Boolean,
        require:true,
        default:false
    },
    sorethroat:{
        type:Boolean,
        require:true,
        default:false
    },
    diarrhoea:{
        type:Boolean,
        require:true,
        default:false
    },
    postedBy: {
        type: ObjectId,
        ref: "user"
    }

})

var health = mongoose.model('health',healthSchema);
module.exports = health;