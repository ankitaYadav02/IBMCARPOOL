import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

export default class Driverwaiting extends Component {
  constructor(props) {
    super(props);
    this.state = {visible: true};
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        visible: !this.state.visible,
      });
    }, 10000);
  }
  render() {
    const {visible} = this.state;

    return (
      <View style={styles.container}>
        {/* <Image source={require('./fare.jpg')} /> */}
        <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          // source={require('./loader.json')}
          animationStyle={styles.lottie}
          speed={1}
        />
        <Text style={styles.welcome}>Finding Fare For You ...</Text>
        <Text style={styles.instructions}>Please Wait...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',

    marginBottom: 5,
  },
});
