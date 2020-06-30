const express = require('express')
const { Router } = require('express');
const mongoose = require('mongoose');
//const { Value } = require('react-native-reanimated');

var stripe = require('stripe')('sk_test_51GyzrWDFA9LPafghHVjso1Z07IFKf643JGIKw0yjbsCZu0E94YuSU9VduYjJuPorKtitWe7dtC33p1fk6J4w49C900GXhLZCEH');

const router = Router();

router.get('/addPayment', async (req,res)=>{

  var value = req.body;

  console.log(value, "==================================")
  try{

    // var token = await stripe.tokens.create(
    //   {
    //     card: {
    //       number: '4242424242424242',
    //       exp_month: 6,
    //       exp_year: 2021,
    //       cvc: '314'
    //     },
    //   });
  
  
      var customer = await stripe.customers.create({
        source:  value.stripeToken, //token.id,
        email:  value.email, //"jenny.rosen@example.com",
        name: value.name, // 'Jenny Rosen',
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      });
    var charge = await stripe.charges.create({
        amount: value.amount, //250,    
        // description: 'Web Development Product',
        currency: 'USD',
        customer: customer.id,     
      });
    
      console.log(charge, "===============")
      res.send(charge)



  // var charge = await stripe.charges.create({
  //   amount: 1000,
  //   currency: "usd",
  //   customer: customer.id
  // })

  console.log(charge, "PAYMENT SUCESSFUL ********************")
   res.send(charge)
  } catch (error) {
  res.send(error)
  }
})
module.exports = router;