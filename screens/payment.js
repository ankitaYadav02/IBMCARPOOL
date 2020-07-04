import React, { Component, useState,useEffect} from 'react';
import {ScrollView ,StyleSheet,TextInput,View ,Image } from 'react-native';
import Stripe from 'react-native-stripe-api'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'
import Toast from 'react-native-toast-message'
const payment = (props)=>{

const[card,setCard]=useState('')
const[expyear,setExpyear]=useState('')
const[expmonth,setExpmonth]=useState('')
const[cvc,setCVC]=useState('')
const[zip,setAddresszip]=useState('')
const[name,setName]=useState('')
const[email,setEmail]=useState('')


useEffect(async()=>{
  const token = await AsyncStorage.getItem('token');
  console.log(token)
  fetch('http://192.168.43.103:5000/getuser',{
  headers:{
      'Content-Type':'application/json',
      Authorization:'Bearer '+token
    }
}).then(res=>res.json())
.then(result=>{
  console.log(result)
  setName(result.name)
  setEmail(result.email)
})
 
},[])


const dopayment = async () =>{
  try {
    const apiKey = 'pk_test_51GyzrWDFA9LPafghMpH3WW1hBPUDcZqs2UdwJTqVPMxaj0aaEtpC4TWNz9s8zskfqDyWozjNXHLVcCVtrOGcoTTw00fLXGCxEQ';
    const client = new Stripe(apiKey);
    const token = await client.createToken({
      number:card ,
      exp_month:expmonth, 
      exp_year:expyear, 
      cvc:cvc,
      address_zip:zip
    });

    var amount = 50;
    const data= {
      email: email,
      amount: amount * 100,
      name: name,
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },
      stripeToken: token.id,
      currency: 'INR',
      description: 'Test payment'
    };

    console.log(data, '_-----------------------------');
    // 
     fetch(
      'http://192.168.43.103:5000/addPayment',
      {
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type':"application/json",
        },
        body:JSON.stringify(data)
      }
    ).then ((res) => res.json())
    .then((result) => {
     console.log(result)
     Toast.show({
      text1: 'WOW',
      text2: 'You Paid Successfully 👋'
    })
      props.navigation.navigate('Recipt')
    })
    .catch(err=> {console.log(err)
      Toast.show({
        type:'error',
        text1: 'Error',
        text2: 'Oops!Something went wrong...'
      })
    })
  } catch(err) {
    console.log(err);
    console.error(err);
    Toast.show({
      type:'error',
      text1: 'Error',
      text2: 'Oops!Something went wrong...'
    })
  }
  
}

return(
  <ScrollView>
<Image style = {styles.logo} source={require('../assets/payment.jpg')} />
    <View style={styles.container}>

    <TextInput
          style={styles.input}
          placeholder='Card Number'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText = {(text)=>setCard(text)}
        />
         <TextInput
          style={styles.input}
          placeholder='Expire year'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText = {(text)=>setExpyear(text)}
        />
         <TextInput
          style={styles.input}
          placeholder='Expire Month'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText = {(text)=>setExpmonth(text)}
        />
         <TextInput
          style={styles.input}
          placeholder='CVC'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText = {(text)=>setCVC(text)}
        />
         <TextInput
          style={styles.input}
          placeholder='Address Zip'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText = {(text)=>setAddresszip(text)}
        />
    </View>
 
         <Button style={styles.buttons} onPress={() => {dopayment()}}>Pay</Button>
  </ScrollView>
)
}
//   console.log('pressed')
export default payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30
  },
  input: {
    width: 250,
    height: 55,
    backgroundColor: '#f2f7f6',
    margin: 10,
    padding: 8,
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    marginLeft:50,
  },
  buttons:{
    width: 250,
    height: 55,
    backgroundColor:'#f2f3f7',
    margin: 10,
    padding: 8,
    fontSize: 18,
    fontWeight: '500',
    marginLeft:40
  },
  logo:{
    height:150,
    width:300,
    marginLeft:30,
    marginTop:60
  }
});