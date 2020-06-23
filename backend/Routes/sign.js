const express = require('express')
const bcrypt = require('bcrypt')
const user = require('../Models/user');
const { Router } = require('express');

const router = Router();

router.post('/signup',(req,res)=>{
    const {name,email,ContactNo,password} = req.body
    //console.log(name,email,contactNo,password,cough,cold,fever)
    if(!name||!email||!ContactNo||!password){
        return res.status(422).json({ message: "please fill all details" })
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
                        res.json({ message: "data saved" })
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
        res.status(422).json({message:'please fill all details'})
    }
    user.findOne({email,email})
    .then(saveduser=>{
        if(!saveduser){
            res.status(422).json({message:'invalid email or password'})  
        }
        bcrypt.compare(password,saveduser.password)
        .then(domatch=>{
            if(domatch){
               res.status(200).json({message:'successfully signed in'}) 
            }else{
                res.status(422).json({message:'invalid email or password'})     
            }
        })
        .catch(error=>{
            console.log(error)
        })
    })
})
    
module.exports = router;