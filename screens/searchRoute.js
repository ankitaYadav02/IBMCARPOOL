import React, {Component, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  TextInput,
} from 'react-native';
import {Appbar, Button} from 'react-native-paper';

function SearchRoute(props) {
  const [name, setname] = useState('');
  const [contactNo, setcontactNo] = useState('');
  const [pickUp, setpickUp] = useState('');
  const [destination, setdestination] = useState('');
  const [time, settime] = useState('');
  const [healthStatus, sethealthStatus] = useState('');

  const book = async () => {
    let collection = {};
    (collection.name = this.state.name),
      (collection.contactNo = this.state.contactNo),
      (collection.pickUp = this.state.pickUp),
      (collection.destination = this.state.destination),
      (collection.time = this.state.time),
      (collection.healthStatus = this.state.healthStatus),
      console.log(collection);
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    fetch('http://192.168.43.27:5000/searchRoute', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(collection),
    })
      .then((response) => response.json())
      .then((collection) => {
        console.log('Success:', collection);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: '10%',
          alignSelf: 'auto',
        }}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={(text) => setname(text)}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          top: '20%',
          alignSelf: 'auto',
        }}>
        <TextInput
          placeholder="Contact Number"
          style={styles.input}
          onChangeText={(text) => setcontactNo(text)}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: '30%',
          alignSelf: 'auto',
        }}>
        <TextInput
          placeholder="PickUp"
          style={styles.input}
          onChangeText={(text) => setpickUp(text)}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: '40%',
          alignSelf: 'auto',
        }}>
        <TextInput
          placeholder="Destination"
          style={styles.input}
          onChangeText={(text) => setdestination(text)}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: '50%',
          alignSelf: 'auto',
        }}>
        <TextInput
          placeholder="Time"
          style={styles.input}
          onChangeText={(text) => settime(text)}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: '60%',
          alignSelf: 'auto',
        }}>
        <TextInput
          placeholder="Health Status"
          style={styles.input}
          onChangeText={(text) => sethealthStatus(text)}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          top: '90%',
          paddingLeft: 110,
          alignSelf: 'auto',
        }}>
        <Button
          style={styles.btn}
          onPress={() => {
            book();
            props.navigation.navigate('BOOK IT !');
          }}>
          BOOK IT
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#91b7e6',
    height: 750,
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 10,
    borderColor: '#0a0a0a',
  },

  btn: {
    backgroundColor: '#f7f3f2',
    color: '#080807',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    margin: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#f5f7f7',
    width: 375,
    height: 50,
    marginLeft: 5,
    padding: 15,
    borderColor: '#0a0a0a',
    borderRadius: 40,
  },
  Header: {
    alignItems: 'center',
  },
});
export default SearchRoute;
