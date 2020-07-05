//Import necessary modules
import React, {Component} from 'react';
import {StyleSheet, Text, Image, ScrollView} from 'react-native';
import {Appbar} from 'react-native-paper';
import LottieView from 'lottie-react-native';

//Creating class component
class Home extends Component {
  // Adding state/Dom updates in this function
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Signup');
    }, 5000);
  }
  render() {
    // returns view for use conatining images and gifs
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <LottieView
          style={{marginTop: 60}}
          source={require('../car2.json')}
          autoPlay
          loop
        />
        <Image style={styles.logo} source={require('../assets/carepool.jpg')} />
      </ScrollView>
    );
  }
}
export default Home; //exporting file to be used in another files

// Applying styles to above code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logo: {
    height: 150,
    width: 300,
    marginLeft: 30,
    marginTop: 20,
  },
});
