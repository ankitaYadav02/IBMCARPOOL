//Import necessary modules
import React, {useState} from 'react';
import {StyleSheet, Text, Image, View, TextInput} from 'react-native';
import {Button, Appbar} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';

//Create functional component
function SignIn(props) {
  //setting initial state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //function on submit
  const submitDetails = () => {
    console.log(email, password);
    fetch('http://192.168.43.27:5000/signin', {
      // Fetch API to post data on backend
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //Data come in JSON format and stringified to come in arow
        email,
        password,
      }),
    })
      //Promise and catching errors in response
      .then((res) => res.json())
      .then(async (result) => {
        if (result.error) {
          console.log(result.error);
          //Toasts for notification
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Oops!Something went wrong...',
          });
        }
        console.log(result);

        //waiting till getting a token for authentication
        try {
          await AsyncStorage.setItem('token', result);
          Toast.show({
            text1: 'Hurray',
            text2: 'You Signed In Successfully 👋',
          });
          props.navigation.replace('Check'); // navigation for switching between screens
          //props.navigation.navigate('WELCOME')
          // props.navigation.navigate('Pay')
        } catch (error) {
          console.log(error.message);
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Oops!Something went wrong...',
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Oops!Something went wrong...',
        });
      });
  };

  return (
    //User's View containing buttons and textinputs for interaction
    <View>
      {/* <Appbar.Header>
        <Appbar.Content
        style={styles.Header}
          title="Sign In"
        />
      </Appbar.Header> */}
      <View>
        <LottieView
          style={styles.logo}
          source={require('../car.json')}
          autoPlay
          loop
        />
        <View style={{marginTop: 70}}>
          <TextInput
            label="email"
            value={email}
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor="black"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            label="password"
            value={password}
            style={styles.input}
            placeholder="password"
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor="black"
            onChangeText={(text) => setPassword(text)}
          />
          <Button
            style={styles.buttons}
            onPress={() => {
              submitDetails();
              //props.navigation.navigate('WELCOME')
            }}>
            Sign In
          </Button>
          <Button
            style={styles.buttons}
            onPress={() => props.navigation.navigate('Forgot Password')}>
            Forgot Password
          </Button>
          <TouchableOpacity>
            <Text
              style={styles.fonts}
              onPress={() => props.navigation.navigate('Signup')}>
              Don't Have An Account?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default SignIn;
//Export file

//Applying styles to above code
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
    marginLeft: 50,
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
    marginTop: 20,
  },
  Header: {
    alignItems: 'center',
  },
});
