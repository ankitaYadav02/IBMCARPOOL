import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Signup from './screens/signup';
import SignIn from './screens/SignIn';
import Home from './screens/home';
import Welcome from './screens/Welcome';
const Stack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="WELCOME" component={Welcome} />
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

// import React from 'react';
// import {Text, View} from 'react-native';

// function HelloWorldApp() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text>Hello, world!</Text>
//     </View>
//   );
// }
// export default HelloWorldApp;
