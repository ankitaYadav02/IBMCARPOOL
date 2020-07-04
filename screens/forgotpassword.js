import React, { useState } from 'react';
import { StyleSheet,Image, ScrollView, TextInput } from 'react-native';
import { Button, Appbar } from 'react-native-paper'
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message'
function mail(props) {
    const [email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[password1,setPassword1] = useState('')
    const SubmitDetails = ()=>{
        console.log(email,password)
        if(password==password1){
            fetch('http://192.168.43.103:5000/requestpassword', {
                method: 'post',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  email,
                  password,
                })
              }).then(res => res.json())
                .then(data => {
                  console.log(data)
                  Toast.show({
                    text1: 'Hurray',
                    text2: 'Your password changed Successfully 👋'
                  })
                  props.navigation.navigate('SignIn')
                }).catch(err => {
                  console.log(err)
                  Toast.show({
                    type:'error',
                    text1: 'Error',
                    text2: 'Oops!Something went wrong...'
                  })
                })
        }
       else{
        Toast.show({
            type:'error',
            text1: 'Error',
            text2: 'Password Do not match...'
          })
       }
        
      }
  return (
    <ScrollView >
      <Appbar.Header>
      <Appbar.BackAction
            onPress={props.navigation.goBack}
          />
        <Appbar.Content
          title="Search Parking"
        />
      </Appbar.Header>
      < View>
      <LottieView style={styles.logo} source={require('../car.json')} autoPlay loop />
        <TextInput
          label='Enter Email'
          style={styles.input}
          placeholder='Enter Email'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label='Enter Password'
          style={styles.input}
          placeholder='Enter Password'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={(text) => setPassword(text)}
        />
         <TextInput
          label='Confirm Password'
          style={styles.input}
          placeholder='Confirm Password'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={(text) => setPassword1(text)}
        />
        <Button style={styles.buttons} onPress={() => {
         SubmitDetails()
        }}>Change Password</Button>
      </View>


    </ScrollView>

  );
}
export default mail;
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
    marginLeft:90,
    marginTop:40
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
    marginTop:50,
  },
});