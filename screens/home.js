import React,{Component} from 'react';
import { StyleSheet, Text,Image ,ScrollView } from 'react-native';
import {Appbar} from 'react-native-paper'

class Home extends Component {
  componentDidMount(){
setTimeout(() => {
    this.props.navigation.navigate('Signup'); 
}, 5000);
}
render(){
  console.log(this.props)
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/car2.png')}
      />
   <Text style={styles.texts}>Car Pool</Text>
    </ScrollView>
    
  );
  }
}
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  texts:{
    fontSize:48,
    fontStyle:"normal",
    fontWeight:"100",
    color:'blue',
  }
});


