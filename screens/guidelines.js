import React from 'react'
import { ScrollView, StyleSheet, SafeAreaView, Linking } from 'react-native'
import { Card, Title, Paragraph, Appbar } from 'react-native-paper';
import Video from 'react-native-video';

const Guidelines = (props) => (

  <ScrollView style={styles.container}>
    <Appbar.Header>
       <Appbar.Action
       icon="dots-vertical"
        onPress={props.navigation.goBack}
      /> 
       {/* <Appbar.Action
        icon="dots-vertical" onPress={() => {props.navigation.openDrawer()}} /> */}
      <Appbar.Content
        title="Guidelines"
      />
    </Appbar.Header>
    <Card style={{ marginTop: 20 }} onPress={() => Linking.openURL('https://www.who.int/emergencies/diseases/novel-coronavirus-2019')}>
      <Card.Content style={styles.heading, { marginTop: 10 }, { backgroundColor: '#aeddf5' }}>
        <Title style={styles.font}>Stay Home Stay Safe</Title>
        <Paragraph style={styles.font}>At the end of the day,the goals are simple:safety and security</Paragraph>
        <Paragraph style={styles.font}>For more Information about COVID-19 CLICK HERE</Paragraph>
      </Card.Content>
    </Card>
    <SafeAreaView style={styles.Video}>
      <Video source={require('../symp.mp4')}
        repeat={true} muted={true}
        style={styles.backgroundVideo} />
    </SafeAreaView>
    <SafeAreaView style={styles.Video}>
      <Video source={require('../synp1.mp4')}
        repeat={true} muted={true}
        style={styles.backgroundVideo} />
    </SafeAreaView>
  </ScrollView>
);

export default Guidelines;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  Video: {
    height: 350,
    width:100,
    marginBottom: 10
  },
  font: {
    fontSize: 18,
    fontStyle: 'italic',
    alignItems: 'center',
    marginLeft: 30
  }
});