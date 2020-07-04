'use strict';

import React, {useState, useEffect} from 'react';
import QRCode from 'react-native-qrcode-generator';
import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {AppRegistry, StyleSheet, View, TextInput} from 'react-native';

const HelloWorld = (props) => {
  //var count=0;
  const [details, setDetails] = useState([]);
  useEffect(() => {
    async function fetch() {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      fetch('http://192.168.43.27:5000/health', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          //  result.map(item=>{
          //   if(item==true){
          //     count=count+1
          //   }
          // })
          setDetails(result);
        });
    }
  }, []);

  // count==1?setDetails('you are at moderate risk')
  // :count==2?setDetails('you are at risk and needs checkup')
  // :count==3?setDetails('you are at high risk')
  // :setDetails("you should isolate yourself")

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={props.navigation.goBack} />
        <Appbar.Content style={styles.Header} title="Health QR Code" />
      </Appbar.Header>
      <View style={styles.container}>
        <QRCode value={details} size={200} bgColor="black" fgColor="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
    marginRight: 200,
    marginLeft: 170,
  },
  Header: {
    alignItems: 'center',
  },
});

//AppRegistry.registerComponent('HelloWorld', () => HelloWorld);

module.exports = HelloWorld;
