import React, { Component, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Linking } from 'react-native';
import Stripe from 'react-native-stripe-api'
import { Card, Title, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'
import { Link } from '@react-navigation/native';

const invoice = () => {
  const [data, setData] = useState([])
  //console.log(data)
  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token)
    fetch('http://192.168.43.103:5000/userInvoice', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        setData(result)
        // console.log(data)
      })

  }, [])
  return (
    <View style={styles.container}>
      <Text>Download Your Recipts Here</Text>
      <Text>{data}</Text>
    </View>

  )
}

export default invoice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignContent: 'center',
    justifyContent: 'center'
  }
});