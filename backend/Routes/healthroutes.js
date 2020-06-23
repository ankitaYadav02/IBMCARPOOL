const express = require('express')
const bcrypt = require('bcrypt')
const health = require('../Models/health');
const { Router } = require('express');

const router = Router();

router.post('/healthdetails',(req,res)=>{
    const userhealth = new health({
        drycough,
        tiredness,
        fever,
        sorethroat,
        diarrhoea,
        postedBy:req.user
    })
    userhealth.save()
    .then(Health => {
        res.json({ message: "data saved" })
    })
    .catch(err => {
        console.log(err)
    })
})
module.exports = router;