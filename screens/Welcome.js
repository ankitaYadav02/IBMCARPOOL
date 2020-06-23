// import React, {useState} from 'react';
// import {StyleSheet, Text, Image, ScrollView} from 'react-native';
// import {Button} from 'react-native-paper';

// function Welcome() {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Image
//         style={styles.logo}
//         source={{
//           uri:
//             'data:image/webp;base64,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',
//         }}
//       />
//       <Text>AAA GAEEEEE HUM YAHA TUM YAHA SAB YAHA OR AB JAO BHAAD MEIN</Text>
//     </ScrollView>
//   );
// }
// export default Welcome;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f7f7f7',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttons: {
//     width: 250,
//     height: 55,
//     backgroundColor: '#32a889',
//     margin: 10,
//     padding: 8,
//     color: 'black',
//     // borderRadius: 14,
//     fontSize: 18,
//     fontWeight: '500',
//   },
//   logo: {
//     width: 100,
//     height: 100,
//   },
// });

// import React from 'react';
// import MapView from 'react-native-maps';
// import {StyleSheet, Text, View, Dimensions} from 'react-native';
// import {Marker} from 'react-native-maps';

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <MapView
//           style={styles.mapStyle}
//           initialRegion={{
//             latitude: 20.5937,
//             longitude: 78.9629,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//           zoomEnabled={true}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mapStyle: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });

import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 900,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default () => (
  <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}></MapView>
  </View>
);
