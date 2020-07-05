import React, {Component, useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  TextInput,
} from 'react-native';
import {Appbar, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';
function SearchRoute(props) {
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [pickUp, setPickUp] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');
  const [healthStatus, setHealthStatus] = useState('');

  const book = async () => {
    console.log(name, contactNo, pickUp, destination, time, healthStatus);
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    fetch('http://192.168.43.103:5000/searchRoute', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        name,
        contactNo,
        pickUp, //Stringify for data to come in a row
        destination,
        time,
        healthStatus,
      }),
    })
      //apply promises and catch errors
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        Toast.show({
          text1: 'Hurray',
          text2: 'You tested yourself successfully 👋',
        });
        //props.navigation.navigate('WELCOME')
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Oops!Something went wrong...',
        });
      });
  };

  return (
    // ScrollView to enable user scroll screen
    <ScrollView>
      {/* Creating view for user to enter details */}
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
            onChangeText={(text) => setName(text)}
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
            onChangeText={(text) => setContactNo(text)}
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
            onChangeText={(text) => setPickUp(text)}
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
            onChangeText={(text) => setDestination(text)}
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
            onChangeText={(text) => setTime(text)}
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
            onChangeText={(text) => setHealthStatus(text)}
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
            }}
            //props.navigation.navigate('BOOK IT !');
          >
            BOOK IT
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

//Applying styles to above code
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
//Exporting file
