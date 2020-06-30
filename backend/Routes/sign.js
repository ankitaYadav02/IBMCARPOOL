const express = require('express')
const { Router } = require('express');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const user = require('../Models/user');
const jwt = require('jsonwebtoken');
const {JWT_TOKEN} = require('../config/key')
const requireLogin = require('../middleware/requireLogin')

const router = Router();

router.post('/signup',(req,res)=>{
    const {name,email,ContactNo,password} = req.body
    //console.log(name,email,contactNo,password,cough,cold,fever)
    if(!name||!email||!ContactNo||!password){
        return res.status(422).json({ error: "please fill all details" })
    }
    user.findOne({ email: email }).then((saveduser) => {
        if (saveduser) {
            return res.status(422).json({ error: "email exists" })
        }
        bcrypt.hash(password, 12)
            .then(hashedpassword => {
                const User = new user({
                    name,
                    email,
                    password:hashedpassword,
                    ContactNo,
                })
                User.save()
                    .then(User => {
                        res.json(User)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })

    })

        .catch(err => {
            console.log(err)
        })
})

router.post('/signin',(req,res)=>{
    const{email,password} = req.body
    if(!email||!password){
        res.status(422).json({error:'please fill all details'})
    }
    user.findOne({email,email})
    .then(saveduser=>{
        if(!saveduser){
            res.status(422).json({error:'invalid email or password'})  
        }
        bcrypt.compare(password,saveduser.password)
        .then(domatch=>{
            if(domatch){
              // res.status(200).json({message:'successfully signed in'}) 
               const token = jwt.sign({_id:saveduser._id},JWT_TOKEN)
               console.log("token is:",token) 
               res.status(200).json(token)
                // const {_id,name,email,ContactNo} = saveduser
                // res.json({token,user:{_id,name,email,ContactNo}})
            }else{
                res.status(422).json({error:'invalid email or password'})     
            }
        })
        .catch(error=>{
            console.log(error)
        })
    })
})
 
router.get('/getuser',requireLogin,(req,res)=>{
    console.log(req.user.name)
    user.findOne({name:req.user.name})
    .populate('user.name')
    .exec((err,User)=>{
        if(err){
            //res.status(422).json(err)
            console.log(err)
        }
        console.log({User})
        res.status(200).json(User)
    })
})

module.exports = router;