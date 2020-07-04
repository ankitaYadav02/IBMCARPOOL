// import React, {Component} from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Dimensions,
//   Image,
//   View,
//   StatusBar,
//   TouchableOpacity,
// } from 'react-native';
// import {Container, Text} from 'native-base';

// import MapView from 'react-native-maps';
// import Polyline from '@mapbox/polyline';

// class getDirections extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       latitude: null,
//       longitude: null,
//       error: null,
//       concat: null,
//       coords: [],
//       x: 'false',
//       cordLatitude: -6.23,
//       cordLongitude: 106.75,
//     };

//     this.mergeLot = this.mergeLot.bind(this);
//   }

//   componentDidMount() {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         this.setState({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           error: null,
//         });
//         this.mergeLot();
//       },
//       (error) => this.setState({error: error.message}),
//       {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
//     );
//   }

//   mergeLot() {
//     if (this.state.latitude != null && this.state.longitude != null) {
//       let concatLot = this.state.latitude + ',' + this.state.longitude;
//       this.setState(
//         {
//           concat: concatLot,
//         },
//         () => {
//           this.getDirections(concatLot, '-6.270565,106.759550');
//         },
//       );
//     }
//   }

//   async getDirections(startLoc, destinationLoc) {
//     try {
//       let resp = await fetch(
//         `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`,
//       );
//       let respJson = await resp.json();
//       let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
//       let coords = points.map((point, index) => {
//         return {
//           latitude: point[0],
//           longitude: point[1],
//         };
//       });
//       this.setState({coords: coords});
//       this.setState({x: 'true'});
//       return coords;
//     } catch (error) {
//       console.log('masuk fungsi');
//       this.setState({x: 'error'});
//       return error;
//     }
//   }
//   render() {
//     return (
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: -6.270565,
//           longitude: 106.75955,
//           latitudeDelta: 1,
//           longitudeDelta: 1,
//         }}>
//         {!!this.state.latitude && !!this.state.longitude && (
//           <MapView.Marker
//             coordinate={{
//               latitude: this.state.latitude,
//               longitude: this.state.longitude,
//             }}
//             title={'Your Location'}
//           />
//         )}

//         {!!this.state.cordLatitude && !!this.state.cordLongitude && (
//           <MapView.Marker
//             coordinate={{
//               latitude: this.state.cordLatitude,
//               longitude: this.state.cordLongitude,
//             }}
//             title={'Your Destination'}
//           />
//         )}

//         {!!this.state.latitude &&
//           !!this.state.longitude &&
//           this.state.x == 'true' && (
//             <MapView.Polyline
//               coordinates={this.state.coords}
//               strokeWidth={2}
//               strokeColor="red"
//             />
//           )}

//         {!!this.state.latitude &&
//           !!this.state.longitude &&
//           this.state.x == 'error' && (
//             <MapView.Polyline
//               coordinates={[
//                 {
//                   latitude: this.state.latitude,
//                   longitude: this.state.longitude,
//                 },
//                 {
//                   latitude: this.state.cordLatitude,
//                   longitude: this.state.cordLongitude,
//                 },
//               ]}
//               strokeWidth={2}
//               strokeColor="red"
//             />
//           )}
//       </MapView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   map: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
// });

// export default getDirections;

import React, {Component} from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Dimensions,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Container, Text} from 'native-base';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Polyline from '@mapbox/polyline';

export default class getDirections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({error: error.message}),
      {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation={true}>
          <Marker coordinate={this.state} />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 800,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
