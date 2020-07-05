//Import necessary modules
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
  LayoutAnimation,
} from 'react-native';
import {Button, Card, Title, Appbar} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';

//Create functional component conatining initial states
function Healthcheck(props) {
  const [DryCough, setDryCough] = useState(null);
  const [tiredness, setTiredness] = useState(null);
  const [fever, setfever] = useState(null);
  const [sorethroat, setsorethroat] = useState(null);
  const [diarrhoea, setDiarrhoea] = useState(null);

  //function of submit
  const submitDetails = async () => {
    console.log(DryCough, tiredness, fever, sorethroat, diarrhoea);

    //waiting for token for authentication
    const token = await AsyncStorage.getItem('token');
    // console.log(token)

    //Fetch API to post data on backend
    fetch('http://192.168.43.27:5000/healthdetails', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },

      //data sent in JSON format
      body: JSON.stringify({
        DryCough,
        tiredness,
        fever,
        sorethroat,
        diarrhoea,
      }),
    })
      //Promises and catching errors
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        //Toasts for notifications
        Toast.show({
          text1: 'Hurray',
          text2: 'You tested yourself successfully 👋',
        });

        //Navigating to different screen
        props.navigation.navigate('WELCOME');
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Oops!Something went wrong...',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    //ScrollView to scroll user's screen
    <ScrollView>
      {/* <Appbar.Header>
        <Appbar.Content
        style={styles.Header}
          title="Health Check"
        />
      </Appbar.Header> */}
      {/* <Card style={styles.container}>
        <Card.Content >
        <Image
        style={styles.logo}
        source={require('../assets/car2.png')}
      /> */}
      {/* </Card.Content>
      </Card> */}

      {/* //Create View for user to interact using cards , buttons , texts */}
      <LottieView
        style={styles.logo}
        source={require('../car.json')}
        autoPlay
        loop
      />
      <Text style={styles.fonts}>Let's Take a Health Check</Text>
      <Card style={styles.cards}>
        <Card.Content>
          <Title>Did You notice any symptoms of Dry Cough?</Title>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.buttons} onPress={() => setDryCough(true)}>
            Yes
          </Button>
          <Button style={styles.buttons} onPress={() => setDryCough(false)}>
            No
          </Button>
        </Card.Actions>
      </Card>
      <Card style={styles.cards}>
        <Card.Content>
          <Title>Did You Feel Tired ?</Title>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.buttons} onPress={() => setTiredness(true)}>
            Yes
          </Button>
          <Button style={styles.buttons} onPress={() => setTiredness(false)}>
            No
          </Button>
        </Card.Actions>
      </Card>
      <Card style={styles.cards}>
        <Card.Content>
          <Title> You notice any symptoms of fever?</Title>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.buttons} onPress={() => setfever(true)}>
            Yes
          </Button>
          <Button style={styles.buttons} onPress={() => setfever(false)}>
            No
          </Button>
        </Card.Actions>
      </Card>
      <Card style={styles.cards}>
        <Card.Content>
          <Title>Did You notice any symptoms of Sore Throat?</Title>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.buttons} onPress={() => setsorethroat(true)}>
            Yes
          </Button>
          <Button style={styles.buttons} onPress={() => setsorethroat(false)}>
            No
          </Button>
        </Card.Actions>
      </Card>
      <Card style={styles.cards}>
        <Card.Content>
          <Title>Did You notice any symptoms of Diarrhoea?</Title>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.buttons} onPress={() => setDiarrhoea(true)}>
            Yes
          </Button>
          <Button style={styles.buttons} onPress={() => setDiarrhoea(false)}>
            No
          </Button>
        </Card.Actions>
      </Card>
      <Card style={styles.container}>
        <Card.Actions>
          <Button
            style={styles.buttons}
            onPress={
              () => props.navigation.navigate('Welcome')
              // submitDetails()
            }>
            Submit
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}
export default Healthcheck;
//Export file

//Applying Styles to above code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    width: 150,
    height: 55,
    backgroundColor: '#f2f3f7',
    margin: 10,
    padding: 8,
    color: 'white',
    // borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  fonts: {
    fontSize: 24,
    marginLeft: 50,
    marginTop: 20,
  },
  logo: {
    width: 90,
    height: 90,
    marginTop: 20,
  },
  cards: {
    width: 400,
    height: 175,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#f0ebeb',
    flexDirection: 'row',
    elevation: 0,
    backgroundColor: '#faf5f5',
  },
  Header: {
    alignItems: 'center',
  },
});
