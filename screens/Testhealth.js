//Import necessary modules
import React,{useState} from 'react';
import { StyleSheet, Text,Image ,ScrollView } from 'react-native';
import {Button} from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import Toast from 'react-native-toast-message'


//Create functional component with initial states 
function Testhealth (props) {
  const[DryCough,setDryCough]=useState("")
  const[tiredness,setTiredness]=useState("")
  const[fever,setfever]=useState("")
  const[sorethroat,setsorethroat]=useState("")
  const[diarrhoea,setDiarrhoea]=useState("")

 const submitDetails=()=>{
   console.log(DryCough,tiredness,fever,sorethroat,diarrhoea)
   const token = await AsyncStorage.getItem('token');     // Waitng for token for authentication
   console.log(token)
    fetch('http://192.168.43.27:5000/updatehealth',{       //Fetch API to update data in backend
        method:'put',
        headers:{
            'Content-Type':'application/json',
            "Authorization": "Bearer " +token
        },
        body:JSON.stringify({
            DryCough,
            tiredness,
            fever,
            sorethroat,
            diarrhoea
        })
    })
    //Promises and catching erros in response
    .then(res=>res.json())
    .then(result=>{
        console.log(result)

        //Toasts for notifications
        Toast.show({
          text1: 'Hurray',
          text2: 'You Successfully tested yourself 👋'
        })
    }).catch(err => {
      console.log(err)
      Toast.show({
        type:'error',
        text1: 'Error',
        text2: 'Oops!Something went wrong...'
      })
    })
}
     
  return (
    //Creating a View for user to interact making use of cards and buttons
    <ScrollView>
      <Image
        style={styles.logo}
        source={require('../assets/car2.png')}
      />
      <Card style={styles.cards}>
        <Card.Content>
          <Title>Did You notice any symptoms of Dry Cough?</Title>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.buttons} onPress={() => setDryCough(true)}>Yes</Button>
          <Button style={styles.buttons} onPress={() => setDryCough(false)}>No</Button>
        </Card.Actions>
      </Card>
      <Card style={styles.cards}>
        <Card.Content>
          <Title>Did You Feel Tired ?</Title>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.buttons} onPress={() => setTiredness(true)}>Yes</Button>
          <Button style={styles.buttons} onPress={() => setTiredness(false)}>No</Button>
        </Card.Actions>
      </Card>
      <Card style={styles.cards}>
        <Card.Content>
          <Title> You notice any symptoms of fever?</Title>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.buttons} onPress={() => setfever(true)}>Yes</Button>
          <Button style={styles.buttons} onPress={() => setfever(false)}>No</Button>
        </Card.Actions>
      </Card>
      <Card style={styles.cards}>
        <Card.Content>
          <Title>Did You notice any symptoms of Sore Throat?</Title>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.buttons} onPress={() => setsorethroat(true)}>Yes</Button>
          <Button style={styles.buttons} onPress={() => setsorethroat(false)}>No</Button>
        </Card.Actions>
      </Card>
      <Card style={styles.cards}>
        <Card.Content>
          <Title>Did You notice any symptoms of Diarrhoea?</Title>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.buttons} onPress={() => setDiarrhoea(true)}>Yes</Button>
          <Button style={styles.buttons} onPress={() => setDiarrhoea(false)}>No</Button>
        </Card.Actions>
      </Card>
      <Card style={styles.container}>
        <CardActions>
        <Button style={styles.buttons} onPress={() => props.navigation.navigate('Welcome')}>Submit</Button>
        </CardActions>
      </Card>
      
    </ScrollView>
  );
}
export default Healthcheck;
//Export file

//Applying styles to above code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    width: 200,
    height: 75,
    backgroundColor: '#f2f3f7',
    margin: 10,
    padding: 8,
    color: 'white',
    // borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  fonts: {
    fontSize: 18,
  },
  logo: {
    width: 90,
    height: 90,
    justifyContent:'center',
    alignContent:'center',
    alignSelf:'center'
  },
  cards: {
    width: 400,
    height: 175,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#78909C',
    flexDirection: 'row'
  }
});