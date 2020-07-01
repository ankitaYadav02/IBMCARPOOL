const express = require('express')
const { Router } = require('express');
const mongoose = require('mongoose');
const { default: Stripe } = require('stripe');
//const { Value } = require('react-native-reanimated');
const requireLogin = require('../middleware/requireLogin')
const user = require('../Models/user')
var stripe = require('stripe')('sk_test_51GyzrWDFA9LPafghHVjso1Z07IFKf643JGIKw0yjbsCZu0E94YuSU9VduYjJuPorKtitWe7dtC33p1fk6J4w49C900GXhLZCEH');

const router = Router();

router.post('/addPayment', async (req,res)=>{

  var value = req.body;

  console.log(value, "==================================")
  try{
      var customer;
          var customerResponse = await  user.findOne({email:value.email})
         console.log(customerResponse,'====');
      if(customerResponse && customerResponse.stripe_customerId){
          customer = customerResponse.stripe_customerId
          console.log('ankita')
      } else{

        console.log('tanya')
        console.log('mandeep')
      var stripeCustomer = await stripe.customers.create({
        source:  value.stripeToken, //token.id,
        email:  value.email, //"jenny.rosen@example.com",
        name: value.name, // 'Jenny Rosen',
        address: {
          line1: value.address.line1, //'510 Townsend St',
          postal_code: value.address.postal_code, //'98140',
          city: value.address.city, // 'San Francisco',
          state: value.address.state, //'CA',
          country: value.address.country //'US',
        },
      });
      console.log(stripeCustomer.id,'mkiol');
      var userReturn = await user.findOneAndUpdate({email: value.email},{$set:{stripe_customerId: stripeCustomer.id}}, {new : true})
      console.log(userReturn,'asdfghjkl');
      customer=userReturn.stripe_customerId
      console.log(customer,'customer')
    }
      // console.log(customer, "!!!!!!!!!!!!!!!!!!!!!!!!1")
    var charge = await stripe.charges.create({
        amount: value.amount, //250,    
       description: value.description, //'Web Development Product',
        currency: value.currency,  //'USD',
        customer: customer,     
      });
    
     // console.log(charge, "===============")
     // res.send(charge)



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

router.get('/userInvoice',requireLogin,async (req, res)=>{
  var customerResponse = await  user.findOne({_id: mongoose.Types.ObjectId(req.user._id)})

  console.log(customerResponse.stripe_customerId)
  var invoice = await stripe.charges.list({
    limit: 100,
    customer: customerResponse.stripe_customerId
  });

  var inv = invoice.data
  var finalInvoiceArr = []
  await inv.map(x=>{
    finalInvoiceArr.push(x.receipt_url)
  } )

  console.log(finalInvoiceArr,'invoice')

  res.send(finalInvoiceArr)
})
module.exports = router;