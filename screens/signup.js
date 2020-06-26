import React ,{useState}from 'react';
import { StyleSheet, Text,Image ,ScrollView, TextInput,TouchableNativeFeedback } from 'react-native';
import {Button,Appbar} from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';

  function SignUp (props) {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ContactNo, setContactNo] = useState("");
  const SubmitDetails = ()=>{
    console.log(name,email,password,ContactNo)
    fetch('http://192.168.43.103:5000/signup', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        ContactNo
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
  }
  return (
    <ScrollView >
      <Appbar.Header>
        {/* <Appbar.BackAction
          onPress={this._goBack}
        /> */}
        <Appbar.Content
        style={styles.Header}
          title="Sign Up Your Account"
        />
      </Appbar.Header>
      <Image
        style={styles.logo}
        source={require('../assets/car2.png')}
      />
      <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText = {(text)=>setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText = {(text)=>setEmail(text)}
        />
       <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText = {(text)=>setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText = {(text)=>setContactNo(text)}
        />
{/* <Button>Submit me</Button> */}
        <Button style={styles.buttons} onPress={() =>{SubmitDetails()
          props.navigation.navigate('Check')
        
      }}>Sign Up</Button>
        <TouchableOpacity>
        <Text style={styles.fonts}onPress={() =>props.navigation.navigate('SignIn')}>Have An Account?</Text>
        </TouchableOpacity>
        
    </ScrollView>
    
  );
  }
export default SignUp;
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
    marginLeft:100
  },
  logo: {
    width: 90,
    height: 90,
    marginTop:20,
    marginLeft:130
  },
  Header:{
    alignItems:"center"
  }
});


