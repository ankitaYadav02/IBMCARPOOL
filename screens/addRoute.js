//Importing necessary modules
import React, {Component, useState, useEffect} from 'react';

import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  TextInput,
} from 'react-native';
import {Appbar, Button} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';
// import FileInput from 'react-input-file'
function AddRoute() {
  const [name, setName] = useState(''); //setting initial state of all the fields
  const [contactNo, setContactNo] = useState('');
  const [pickUp, setPickUp] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');
  const [licenseNo, setLicenseNo] = useState('');
  // const[photo,setPhoto]=useState(null)
  const [url, setUrl] = useState('');

  handleChoosePhoto = () => {
    //function to handle photos from gallery
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      //opens gallery of user enabling him to pick the image
      console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let newfile = {
          uri: response.uri,
          type: `test/${response.uri.split('.')[1]}`,
          name: `test.${response.uri.split('.')[1]}`,
        };
        console.log(newfile);
        postDetails(newfile);
      }
    });
  };
  const postDetails = (image) => {
    console.log(image);
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'carepool');
    data.append('cloud_name', 'ankita1297');
    console.log(data);
    fetch('	https://api.cloudinary.com/v1_1/ankita1297/image/upload', {
      // fetch API to upload image on Cloudinary
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submit = () => {
    fetch('http://192.168.43.103:5000/addRoute', {
      //Fetch API to submit the details entered by user
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //Stringifying JSON data so that it comes in a row
        name,
        contactNo,
        pickUp,
        destination,
        time,
        licenseNo,
        photo: url,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.Content style={styles.Header} title="Add Route" />
      </Appbar.Header>

      {/* //creating a view with different placeholders and changing their states */}
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
            placeholder="License Number"
            style={styles.input}
            onChangeText={(text) => setLicenseNo(text)}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            paddingLeft: 20,
            top: '80%',
            alignSelf: 'auto',
          }}>
          <Button
            style={styles.btn}
            onPress={() => {
              handleChoosePhoto();
            }}>
            Upload Sanitization Details Slip
          </Button>
        </View>
        <View
          style={{
            position: 'absolute',
            top: '90%',
            paddingLeft: 110,
            alignSelf: 'auto',
          }}>
          <Button
            onPress={() => {
              submit();
            }}
            style={styles.btn}>
            Submit
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
// Applying styles to above code
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#91b7e6',
    height: 700,
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

export default AddRoute; //exporting the file
