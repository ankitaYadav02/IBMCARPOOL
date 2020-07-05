// Import necessary modules before starting
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  NativeModules,
  NativeEventEmitter,
  ScrollView,
  Alert,
} from 'react-native';
navigator.geolocation = require('@react-native-community/geolocation');
import BleManager from 'react-native-ble-manager';
import Sound from 'react-native-sound';
import {Appbar, Button} from 'react-native-paper';
import {Card} from 'react-native-elements';
import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {TouchableOpacity} from 'react-native-gesture-handler';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule); //declaring some constants

const sound = new Sound('./dhoom.mp3');
var list = 0;

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      // initial state of components being set
      peripherals: new Map(),
      location: null,
    };
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = JSON.stringify(position); //function to detect live location

        this.setState({location});
        console.log({location});
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  componentDidMount() {
    // In componentdidmount, state updates , ajax requests occurs
    BleManager.start({showAlert: false});

    this.handlerDiscover = bleManagerEmitter.addListener(
      //listeners to update the values
      'BleManagerDiscoverPeripheral',
      this.handleDiscoverPeripheral,
    );

    this.handlerStop = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      this.handleStopScan,
    );

    this.scanForDevices(); //Bluetooth start scanning
  }

  scanForDevices() {
    BleManager.scan([], 60);
    console.log('Scan started');
  }

  handleDiscoverPeripheral = (peripheral) => {
    //function to handle discovered peripherals
    const {peripherals} = this.state;

    BleManager.getDiscoveredPeripherals([]).then((item) => {
      peripherals.set(item.length);
      this.setState({peripherals});
      console.log('Discovered peripherals: ' + item.length); // returning no of discovered peripherals
      list = item.length;
      console.log(list);
    });
  };

  handleStopScan = () => {
    // After scan functions
    console.log('Scan is stopped. Devices: ', this.state.peripherals);
    console.log(list);
    if (list == 4) {
      Alert.alert(
        //Alert will appear containing two buttons
        'Pay Attention',
        'Passenger limit exceeded',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: true},
      );
    }
    sound.play();
  };

  render() {
    return (
      //For returing google maps
      <ScrollView contentContainerStyle={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
        <Appbar.Header>
          <Appbar.Content title="Welcome" />
        </Appbar.Header>
        <View
          style={{
            position: 'absolute', //use absolute position to show button on top of the map
            top: '3%', //for center align
            // alignSelf: 'auto', //for align to right
            marginLeft: 30,
          }}>
          <Appbar.Header style={styles.Header}>
            <Appbar.Action
              icon="dots-vertical"
              style={styles.dots} //opens dashboard
              onPress={() => {
                this.props.navigation.openDrawer();
              }}
            />
            <Appbar.Content title="Welcome User  :)" />
          </Appbar.Header>
        </View>

        <View
          style={{
            position: 'absolute',
            top: '20%', //for center align
            alignSelf: 'auto', //for align to right
          }}>
          <Button //On pressing this button it will navigate to another screen
            style={styles.buttons}
            mode="outlined"
            onPress={() => this.props.navigation.navigate('ADD ROUTE')}>
            {' '}
            ADD ROUTE
          </Button>
        </View>

        <View
          style={{
            position: 'absolute',
            top: '40%',
            alignSelf: 'auto',
          }}>
          <Button //On pressing this button it will navigate to another screen
            style={styles.buttons}
            mode="outlined"
            onPress={() => this.props.navigation.navigate('SEARCH ROUTE')}>
            SEARCH ROUTE
          </Button>

          <View style={styles.view}>
            <TouchableOpacity onPress={this.findCoordinates}>
              {' '}
              <Text style={styles.welcome}>Enable social distancing?</Text>{' '}
              {/* //calling function on pressing the text */}
              {/* <Text>Location: {this.state.location}</Text> */}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

//Applying styles to above code
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

  buttons: {
    width: 250,
    height: 75,
    backgroundColor: 'transparent',
    margin: 10,
    padding: 15,
    color: '#080807',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  Header: {
    height: 70,
    width: 300,
    marginLeft: 30,
    backgroundColor: '#a622d6',
  },
  dots: {
    padding: 5,
  },
  view: {
    flex: 1,
    margin: 20,
    top: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    top: '10%',
  },
});
export default Welcome;
//Export file
