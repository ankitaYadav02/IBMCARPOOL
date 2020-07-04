import React, {Component} from 'react';

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

class AddRoute extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      contactNo: '',
      pickUp: '',
      destination: '',
      time: '',
      licenseNo: '',
      photo: null,
    };
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };

  handleUploadPhoto = () => {
    fetch('http://192.168.43.27:5000/addRoute', {
      method: 'post',
      body: createFormData(this.state.photo),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('upload success', response);
        alert('Upload success!');
        this.setState({photo: response});
      })
      .catch((error) => {
        console.log('upload error', error);
        alert('Upload failed!');
      });
  };

  updateValue(text, field) {
    if (field == 'name') {
      this.setState({
        name: text,
      });
    } else if (field == 'contactNo') {
      this.setState({
        contactNo: text,
      });
    } else if (field == 'pickUp') {
      this.setState({
        pickUp: text,
      });
    } else if (field == 'destination') {
      this.setState({
        destination: text,
      });
    } else if (field == 'time') {
      this.setState({
        time: text,
      });
    } else if (field == 'licenseNo') {
      this.setState({
        licenseNo: text,
      });
    }
  }

  createFormData = (photo, body) => {
    const data = new FormData();

    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  submit() {
    let collection = [];
    (collection.name = this.state.name),
      (collection.contactNo = this.state.contactNo),
      (collection.pickUp = this.state.pickUp),
      (collection.destination = this.state.destination),
      (collection.time = this.state.time),
      (collection.licenseNo = this.state.licenseNo),
      (collection.photo = this.state.photo);
    console.log(collection);

    fetch('http://192.168.43.27:5000/addRoute', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collection),
    })
      .then((response) => response.json())
      .then((collection) => {
        console.log('Success:', collection);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  render() {
    const {photo} = this.state;
    return (
      <ScrollView>
        <Appbar.Header>
          <Appbar.Content style={styles.Header} title="Add Route" />
        </Appbar.Header>

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
              onChangeText={(text) => this.updateValue(text, 'name')}
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
              onChangeText={(text) => this.updateValue(text, 'contactNo')}
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
              onChangeText={(text) => this.updateValue(text, 'pickUp')}
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
              onChangeText={(text) => this.updateValue(text, 'destination')}
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
              onChangeText={(text) => this.updateValue(text, 'time')}
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
              onChangeText={(text) => this.updateValue(text, 'licenseNo')}
            />
          </View>
          <View
            style={{
              paddingLeft: 100,
              top: '65%',
              alignSelf: 'auto',
            }}>
            {photo && (
              <React.Fragment>
                <Image
                  source={{uri: photo.uri}}
                  style={{width: 110, height: 90}}
                />
                <Button title="Upload" onPress={this.handleUpload} />
              </React.Fragment>
            )}
          </View>

          <View
            style={{
              position: 'absolute',
              paddingLeft: 20,
              top: '80%',
              alignSelf: 'auto',
            }}>
            <Button style={styles.btn} onPress={this.handleChoosePhoto}>
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
              onPress={
                (() => this.submit(),
                () => this.props.navigation.navigate('WAITING'))
              }
              style={styles.btn}>
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

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

export default AddRoute;
