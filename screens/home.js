import React,{Component} from 'react';
import { StyleSheet, Text,Image ,ScrollView } from 'react-native';
import {Appbar} from 'react-native-paper'
import LottieView from 'lottie-react-native';

class Home extends Component {
  componentDidMount(){
   setTimeout(() => {
    this.props.navigation.navigate('Signup'); 
}, 5000);
}
render(){
  return (
    <ScrollView contentContainerStyle={styles.container}>
     <LottieView style={{marginTop:60}} source={require('../car2.json')} autoPlay loop />
     <Image style = {styles.logo} source={require('../assets/carepool.jpg')} />
    </ScrollView>
    
  );
  }
}
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',

  },
  logo:{
    height:150,
    width:300,
    marginLeft:30,
    marginTop:20
  }
});


