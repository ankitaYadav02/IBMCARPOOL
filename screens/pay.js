import React, { Component, useState } from 'react';
import { View ,Text, I18nManager  } from 'react-native';
import { Input } from 'react-native-elements';
import Stripe from 'react-native-stripe-api'
import { Button } from 'react-native-paper'

const  do_payment = async () => {

  try {
    const apiKey = 'pk_test_51GyzrWDFA9LPafghMpH3WW1hBPUDcZqs2UdwJTqVPMxaj0aaEtpC4TWNz9s8zskfqDyWozjNXHLVcCVtrOGcoTTw00fLXGCxEQ';
    const client = new Stripe(apiKey);
    const token = await client.createToken({
      number: '4242424242424242' ,
      exp_month: '09', 
      exp_year: '21', 
      cvc: '111',
      address_zip: '12345'
    });

    const data= {
      email: "ankita@gmail.com",
      amount: 500,
      name: "Ankita",
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },
      stripeToken: token.id,
    };

    console.log(data, '_-----------------------------');

     fetch(
      'http://192.168.43.103:5000/addPayment',
      {
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type':"application/json"
        },
        body:JSON.stringify(data)
        //body:data
      }
    ).then ((res) => res.json())
    .then((result) => console.log(result))
    .catch(err=> console.log(err))
    // console.log('before convering');
    // console.log('--------------------', res);

    // const result = await res.json();
    // console.log(result);
  } catch(err) {
    console.log(err);
    console.error(err);
    // console.log(...err);
  }
  
}

function doPayment(){
    


    // console.log(token.id, 'token id------------------------')
    // debugger;
    // const[cardno,setCardNo] = useState("")
    // const [expmonth,setExpMonth] = useState("")
    // const [expyear,setExpYear] = useState("")
    // const [cvc,setCvc] = useState("")
    
    // const token =  stripeClient.createToken({
    //       card: {
    //         number: cardno,
    //         exp_month: expmonth,
    //         exp_year: expyear,
    //         cvc: cvc
    //       }
    //     });
    // stripeClient.createToken({
    //     number: '4242424242424242' ,
    //     exp_month: '09', 
    //     exp_year: '20', 
    //     cvc: '111'
    //  }.then((res)=>{
    //      console.log(res,"=======================")

    //  }).catch((e)=>{
    //     console.log(e)
    // })
    //  )

    do_payment();
    
    const submit=()=>{
        
    }
   
return(
  <View>
      <Input
        textAlign={I18nManager.isRTL ? "right" : "left"}
        placeholder="Card Number"
        value={"09"}
        //style={styles.inputmain}
        onChangeText={cardnum => {
          //
        }}
        autoCapitalize="none"
      /> 
    
    <Input
        textAlign={I18nManager.isRTL ? "right" : "left"}
        placeholder="expmonth"
        value={"09"}
        //style={styles.inputmain}
        onChangeText={expmonth => {
          //  
        }}
        autoCapitalize="none"
      />
    <Input
        textAlign={I18nManager.isRTL ? "right" : "left"}
        placeholder="expyear"
        value={"09"}
        // style={styles.inputmain}
        onChangeText={expyear => {
          //
        }}
        autoCapitalize="none"
      />
    
    <Input
        textAlign={I18nManager.isRTL ? "right" : "left"}
        placeholder="cvc"
        value={"09"}
        // style={styles.inputmain}
        onChangeText={cvc => {
          //
        }}
        autoCapitalize="none"
      />
      <Button onPress={()=>{submit()}}>submit</Button>
  </View>
)
//       .post('http://192.168.43.103:5000/addPayment', values, { headers })
//       .then(({ data }) => {
//         console.warn({data});
//         return data;
//       })
//       .catch(error => {
//         return Promise.reject('Error in making payment', error);
//       });
   };

   export default doPayment;
  