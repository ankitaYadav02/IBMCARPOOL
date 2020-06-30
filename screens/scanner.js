'use strict';

import React, { Component } from 'react';
import { Appbar } from 'react-native-paper'
import {  Dimensions } from "react-native";

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
    const SCREEN_HEIGHT = Dimensions.get("window").height;
    return (
      //backgroundColor: '#00000000',opacity:.4
      <View >
        <Appbar.Header >
          <Appbar.BackAction
            onPress={this.props.navigation.goBack}
          />
          <Appbar.Content
            style={styles.Header}
            title="Scan Here"
          /> 
         </Appbar.Header>
        <QRCodeScanner
        style={{backgroundColor:'#111211'}}
          onRead={this.onSuccess}
          cameraStyle={{ height: SCREEN_HEIGHT }}
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
  }
});

AppRegistry.registerComponent('default', () => HealthScanScreen);
module.exports = HealthScanScreen;