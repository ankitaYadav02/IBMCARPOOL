//Import necessary modules
import React from 'react';
import {StyleSheet, Image, View, TextInput} from 'react-native';
import {Button, Appbar} from 'react-native-paper';
import LottieView from 'lottie-react-native';

//Create functional component
function Parking(props) {
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={props.navigation.goBack} // navigating to previous screen
        />
        <Appbar.Content title="Search Parking" />
      </Appbar.Header>
      <View>
        {/* //Adding image */}
        <LottieView
          style={styles.logo}
          source={require('../car.json')}
          autoPlay
          loop
        />
        {/* TextInput for user to enter details */}
        <TextInput
          label="Enter Destination"
          style={styles.input}
          placeholder="Enter Destination"
          autoCapitalize="none"
          placeholderTextColor="black"
        />
        <Button
          style={styles.buttons}
          onPress={() => {
            console.log('pressed');
          }}>
          Search
        </Button>
      </View>
    </View>
  );
}
export default Parking; //Exporting file

// Applying styles to above code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 250,
    height: 55,
    backgroundColor: '#f2f7f6',
    margin: 10,
    padding: 8,
    color: 'black',
    // borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 90,
    marginTop: 90,
  },
  buttons: {
    width: 250,
    height: 55,
    backgroundColor: '#f2f3f7',
    margin: 10,
    padding: 8,
    color: 'white',
    // borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 40,
  },
  fonts: {
    fontSize: 18,
    marginLeft: 70,
  },
  logo: {
    width: 90,
    height: 90,
    marginTop: 50,
  },
});
