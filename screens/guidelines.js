import  React from 'react'
import {ScrollView,StyleSheet,Image}  from 'react-native'
import {Card, Title, Paragraph,Appbar } from 'react-native-paper';


const Guidelines = (props) => (
  
    <ScrollView style={styles.container}>
       <Appbar.Header>
       <Appbar.BackAction
          onPress={props.navigation.goBack}
        />
        <Appbar.Content
        style={styles.Header}
          title="Guidelines"
        />
      </Appbar.Header>
    <Card>
      <Card.Content style = {styles.heading}>
        <Title>Stay Home Stay Safe</Title>
        <Paragraph>Your Life Matters So to Stay Safe Follow these Guidelines</Paragraph>
      </Card.Content>
    </Card>
    <Card style={styles.cards}>
    <Card.Cover source={require('../assets/11.jpg')} />
  </Card>
  <Card style={styles.cards}>
    <Card.Cover source={ require('../assets/12.jpeg')} />
  </Card>
  <Card style={styles.cards}>
    <Card.Cover source={require('../assets/13.jpeg')} />
  </Card>
  <Card style={styles.cards}>
    <Card.Cover source={require('../assets/14.jpeg')} />
  </Card>
  <Card style={styles.cards}>
    <Card.Cover source={require('../assets/15.jpeg')} />
  </Card>
  <Card style={styles.cards}>
    <Card.Cover source={require('../assets/16.jpeg')} />
  </Card>
    </ScrollView>
  );
  
  export default Guidelines;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e0e0e0',
    },
    heading:{
        // margin: 10,
        padding: 8,
        height:100,
        // backgroundColor:'#3443eb',
        color: 'black',
        fontSize: 18,
        fontWeight: '500',
        alignContent:"center",
        fontFamily:'Bitstream Cyberbit'
    },
    cards:{
      width:350,
      height:200,
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#78909C',
      flexDirection: 'row'
    },
    Header:{
      alignItems:"center"
    }
  });