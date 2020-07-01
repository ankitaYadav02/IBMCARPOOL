import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, TextInput } from 'react-native';
import { Button, Appbar } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import LottieView from 'lottie-react-native';
function SignIn(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
 
  const submitDetails = () => {
    console.log(email, password)
    fetch('http://192.168.43.103:5000/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => res.json())
      .then(async(result) => {
        if(result.error){
          console.log(result.error)
        }
        console.log(result)
        try {
          await AsyncStorage.setItem('token', result);
          props.navigation.replace('Check')
          //props.navigation.navigate('WELCOME')
         // props.navigation.navigate('Pay')
        } catch (error) {
          console.log(error.message);
        }
       
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <View >
      {/* <Appbar.Header>
        <Appbar.Content
        style={styles.Header}
          title="Sign In"
        />
      </Appbar.Header> */}
      < View>
      <LottieView style={styles.logo} source={require('../car.json')} autoPlay loop />
      <View   style={{marginTop:70}}>
      <TextInput
          label='email'
          value={email}
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label='password'
          value={password}
          style={styles.input}
          placeholder='password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={(text) => setPassword(text)}
        />
        <Button style={styles.buttons} onPress={() => {
         submitDetails()  
         //props.navigation.navigate('WELCOME')
        }}>Sign In</Button>
        <Button style={styles.buttons} onPress={() => console.log('pressed')}>Forgot Password</Button>
        <TouchableOpacity>
          <Text style={styles.fonts} onPress={() => props.navigation.navigate('Signup')}>Don't Have An Account?</Text>

        </TouchableOpacity>
      </View>
      

      </View>


    </View>

  );
}
export default SignIn;
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
    marginLeft:50
  },
  buttons:{
    width: 250,
    height: 55,
    backgroundColor:'#f2f3f7',
    margin: 10,
    padding: 8,
    color: 'white',
    // borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
    marginLeft:40
  },
  fonts:{
    fontSize:18,
    marginLeft:70
  },
  logo: {
    width: 90,
    height: 90,
    marginTop:20
  },
  Header:{
    alignItems:"center"
  }
});
