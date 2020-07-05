//Importing required modules
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  Linking,
  Text,
} from 'react-native';
import {Card, Title, Paragraph, Appbar} from 'react-native-paper';
import Video from 'react-native-video';
import MarqueeText from 'react-native-marquee';

//passing props for states
const Guidelines = (props) => (
  <ScrollView style={styles.container}>
    <Appbar.Header>
      <Appbar.Action
        icon="dots-vertical"
        onPress={() => props.navigation.openDrawer()} //opens up drawer on pressing vertical-dots
      />
      <Appbar.Content title="Guidelines" />
    </Appbar.Header>

    {/* //creating a view that will contain text moving on the screen using marquee modules */}
    <View style={styles.container1}>
      <MarqueeText
        style={({fontSize: 34}, {fontStyle: 'bold'})}
        duration={3000}
        marqueeOnStart
        loop
        marqueeDelay={1000}
        marqueeResetDelay={1000}>
        Welcome to CarePool.! Stay Home, Stay Safe. At the end of the day,the
        goals are simple: Safety and Security
      </MarqueeText>
    </View>
    <View style={styles.container1}>
      <Text
        onPress={() =>
          Linking.openURL(
            'https://www.who.int/emergencies/diseases/novel-coronavirus-2019',
          )
        }>
        For more Information about COVID-19 CLICK HERE
        {/* // function is applied on pressing above line   */}
      </Text>

      {/* //Again created new view that contains videos */}
    </View>
    <SafeAreaView style={styles.Video}>
      <Video
        source={require('../synp1.mp4')}
        repeat={true}
        resizeMode={'cover'}
        muted={true}
        style={styles.backgroundVideo}
      />
    </SafeAreaView>
    <SafeAreaView style={styles.Video}>
      <Video
        source={require('../sym3.mp4')}
        repeat={true}
        resizeMode={'cover'}
        muted={true}
        style={styles.backgroundVideo2}
      />
    </SafeAreaView>
    <SafeAreaView style={styles.Video}>
      <Video
        source={require('../symp.mp4')}
        repeat={true}
        resizeMode={'cover'}
        muted={true}
        style={styles.backgroundVideo2}
      />
    </SafeAreaView>
  </ScrollView>
);

export default Guidelines; //exporting the file

//Applying styles to above code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundVideo: {
    position: 'absolute',
    width: 400,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  Video: {
    height: 350,
    marginLeft: 0,
    width: 100,
    marginBottom: 30,
  },
  backgroundVideo2: {
    height: 350,
    width: 400,
    padding: 0,
  },
  font: {
    fontSize: 18,
    fontStyle: 'italic',
    alignItems: 'center',
    marginLeft: 30,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    height: 80,
    fontSize: 44,
    borderWidth: 10,
    borderColor: '#ede6d1',
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: '#edeb53',
    alignItems: 'center',
  },
});
