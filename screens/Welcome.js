import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';
import { Appbar, Button } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 900,
    width: 400,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  Header:{
    height:50,
    width:300
  }
});

export default (props) => (
  
  <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}/>
      <View  style={{
          position: 'absolute', //use absolute position to show button on top of the map
          top: '3%', //for center align
          // alignSelf: 'auto', //for align to right
          marginLeft:30
        }}>
      <Appbar.Header style={styles.Header}>
      <Appbar.Action
        icon="dots-vertical" onPress={() => {props.navigation.openDrawer()}} />
        <Appbar.Content
          title="Search Your Destination"
        />
        
      </Appbar.Header>
      </View>
      
  </View>
);
