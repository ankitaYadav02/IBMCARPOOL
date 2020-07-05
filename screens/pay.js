//Import necessary modules
import React, {Component, useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View, Image, Linking} from 'react-native';
import Stripe from 'react-native-stripe-api';
import {Card, Title, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {Link} from '@react-navigation/native';

//Setting initial state
const invoice = () => {
  const [data, setData] = useState([]);
  //console.log(data)

  //Waiting to get token for authentication
  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    fetch('http://192.168.43.27:5000/userInvoice', {
      //Fetch API for interacting with backend
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      //Promise after reponse
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
        // console.log(data)
      });
  }, []);

  const recipts = data.map((item) => {
    return (
      <View style={{margin: 10}}>
        {/* <Text>{item}</Text> */}
        <Card
          style={({marginTop: 0}, {height: 100})}
          onPress={() => Linking.openURL(item)}>
          <Card.Content style={({marginTop: 10}, {backgroundColor: '#aeddf5'})}>
            <Title style={styles.font}>{item}</Title>
          </Card.Content>
        </Card>
      </View>
    );
  });

  //Returning View for user to interact by filling details.We make use of card to display
  return (
    <ScrollView>
      <View style={styles.container}>
        <Card style={({marginTop: 20}, {height: 50})}>
          <Card.Content style={({marginTop: 10}, {backgroundColor: '#fffff'})}>
            <Title
              style={
                ({fontSize: 24},
                {fontStyle: 'italic'},
                {alignItems: 'center'},
                {marginLeft: 30})
              }>
              Click to Check Your Recipt
            </Title>
          </Card.Content>
        </Card>
        {recipts}
      </View>
    </ScrollView>
  );
};

export default invoice;
//Export file

//Apply styles to above code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  font: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});
