import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons'
import Component from './screens/component'
import Signup from './screens/signup';
import SignIn from './screens/SignIn';
import Home from './screens/home';
import Healthcheck from './screens/Healthcheck';
import Welcome from './screens/Welcome';
import Guidelines from './screens/guidelines';
import QRCODE from './screens/healthqrcode'
import Parking from './screens/parking'
import Healthscanner from './screens/scanner'
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
  function Dashboard (){
  return(
        <Drawer.Navigator>
          <Drawer.Screen name="WELCOME" component={Welcome} />
          <Drawer.Screen name="Guidelines" component={Guidelines} />
          <Drawer.Screen name="Your Health QR code" component={QRCODE} />
          <Drawer.Screen name="Scan Health Qr" component={Healthscanner} />
          <Drawer.Screen name="Parking" component={Parking} />
        </Drawer.Navigator>
  )
  }
function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator headerMode='none' >
      {/* <Stack.Screen name="component" component={Component} /> */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Check" component={Healthcheck} />
        <Stack.Screen name="WELCOME" component={Dashboard}
        // options={{
        //   headerRight: () => <Icon 
        //   name='three-bars' 
        //   size={30} 
        //   color='#000' 
        //   // onPress = {()=>navigation.openDrawer()}
          // />}}
        />
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
});