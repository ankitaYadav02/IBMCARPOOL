'use strict';

import React, { Component } from 'react';
import { Appbar } from 'react-native-paper'


import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

class HealthScanScreen extends Component {
  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  };

  render() {
    return (
      <View style={{backgroundColor:'black'}}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={this.props.navigation.goBack}
          />
          <Appbar.Content
            style={styles.Header}
            title="Scan Here"
          />
        </Appbar.Header>
        <QRCodeScanner
       
          onRead={this.onSuccess}
          // bottomContent={
          //   <TouchableOpacity style={styles.buttonTouchable}>
          //     <Text style={styles.buttonText}>OK. Got it!</Text>
          //   </TouchableOpacity>
        //}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
          centerText: {
          flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
});

AppRegistry.registerComponent('default', () => HealthScanScreen);
module.exports = HealthScanScreen;