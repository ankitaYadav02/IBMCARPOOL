import 'react-native-gesture-handler';
import React,{useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator,DrawerContentOptions} from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons'
import Signup from './screens/signup';
import SignIn from './screens/SignIn';
import Home from './screens/home';
import Healthcheck from './screens/Healthcheck';
import Welcome from './screens/Welcome';
import Guidelines from './screens/guidelines';
import QRCODE from './screens/healthqrcode'
import Parking from './screens/parking'
import Healthscanner from './screens/scanner'
import {DrawerContent} from './screens/drawerContent'
import Payment from './screens/payment'
import Recipt from './screens/pay'
import AsyncStorage from '@react-native-community/async-storage'
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
  function Dashboard (){
  return(
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
          <Drawer.Screen name="WELCOME" component={Welcome} />
          <Drawer.Screen name="Guidelines" component={Guidelines} />
          <Drawer.Screen name="Your Health QR code" component={QRCODE} />
          <Drawer.Screen name="Scan Health Qr" component={Healthscanner} />
          <Drawer.Screen name="Parking" component={Parking} />
        </Drawer.Navigator>
  )
  }
function App() {
  const [login,setLogin]=useState(null)
  useEffect(()=>{async()=>{
    const token = await AsyncStorage.getItem('token');
    console.log(token)
    if(token){
      setLogin(true)
    }
    else{
      setLogin(false)
    }
  }  
  },[])
 
  return (
    <View style={styles.container}>
      <Stack.Navigator headerMode='none' >
        {/* {
          login==null ?(
          <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="SignIn" component={SignIn} />
          </>)
          :
          login==true? (
          <>
          <Stack.Screen name="WELCOME" component={Dashboard} />
          <Stack.Screen name="Check" component={Healthcheck} />
          </>)
          :(
          <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="SignIn" component={SignIn} />
          </>)
        } */}
        
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Check" component={Healthcheck} />
        <Stack.Screen name="WELCOME" component={Dashboard} />
        <Stack.Screen name="Pay" component={Payment} />
        <Stack.Screen name="Recipt" component={Recipt} />
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

// import React from "react";
// //import "../assets/styles.css";
// import {View} from 'react-native'
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./screens/checkoutForm";

// const stripePromise = loadStripe("pk_test_51GyzrWDFA9LPafghMpH3WW1hBPUDcZqs2UdwJTqVPMxaj0aaEtpC4TWNz9s8zskfqDyWozjNXHLVcCVtrOGcoTTw00fLXGCxEQ");

// const App = () => {
//   return (
//     <View>
//           <Elements stripe={stripePromise}>
//             <CheckoutForm />
//           </Elements>
       
//     </View>
//   );
// };

// export default App;