'use strict';

import React, { useState,useEffect } from 'react'
import QRCode from 'react-native-qrcode-generator';
import {Appbar} from 'react-native-paper'

import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';



function HelloWorld(props) {
  const[details,setDetails]=useState([])
  useEffect(() => {
   fetch('http://192.168.43.103:5000/health').
   then(res => res.json())
       .then(result => {
           console.log(result)
           setDetails(result)
       })
 }, [])
    return (
      <View >
         <Appbar.Header>
       <Appbar.BackAction
          onPress={props.navigation.goBack}
        />
        <Appbar.Content
        style={styles.Header}
          title="Health QR Code"
        />
      </Appbar.Header>
        <QRCode
        style={styles.container}
          value={details}
          size={200}
          bgColor='black'
          fgColor='white'/>
      </View>
    );
  };


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    code:{
     alignContent:'center',
     justifyContent: 'center',
     marginTop:100,
    marginLeft:100
    },Header:{
      alignItems:"center"
    }
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);

module.exports = HelloWorld;