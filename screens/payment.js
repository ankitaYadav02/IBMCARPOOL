import React, { Component } from 'react';
import { View, Button } from 'react-native';
 ///import stripe from 'tipsi-stripe';
// // stripe.setOptions({
// //   publishableKey: 'pk_test_51GyzrWDFA9LPafghMpH3WW1hBPUDcZqs2UdwJTqVPMxaj0aaEtpC4TWNz9s8zskfqDyWozjNXHLVcCVtrOGcoTTw00fLXGCxEQ',
// // });

// export default class Payment extends Component {
//   requestPayment = () => {
//       var data= {
//           email: "ankita@gmail.com",
//           amount: 500,
//           name: "Ankita",
//           address: {
//             line1: '510 Townsend St',
//             postal_code: '98140',
//             city: 'San Francisco',
//             state: 'CA',
//             country: 'US',
//           },
//       }
//     this.setState({ isPaymentPending: true });
//     return stripe
//       .paymentRequestWithCardForm()
//       .then(stripeTokenInfo => {
//           data.stripeToken = stripeTokenInfo.tokenId
//         return doPayment(data);
//       })
//       .then(() => {
//         console.warn('Payment succeeded!');
//       })
//       .catch(error => {
//         console.warn('Payment failed', { error });
//       })
//       .finally(() => {
//         this.setState({ isPaymentPending: false });
//       });
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button
//           title="Make a payment"
//           onPress={this.requestPayment}
//           disabled={this.state.isPaymentPending}
//         />
//       </View>
//     );
//   }
// }

// const styles = {
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// };

//const client = new Stripe(apiKey);
import axios from 'axios';
import stripe from 'react-native-stripe-api'
//import stripeClient from 'react-native-stripe-client'
const apiKey = 'pk_test_51GyzrWDFA9LPafghMpH3WW1hBPUDcZqs2UdwJTqVPMxaj0aaEtpC4TWNz9s8zskfqDyWozjNXHLVcCVtrOGcoTTw00fLXGCxEQ';

 const stripeClient = new stripe(apiKey);
 
// Create a Stripe token with new card infos
 const token =  stripeClient.createToken('4242424242424242' , '09', '20', '111');
// const token =  stripeClient.createToken({
//   card: {
//     Number: "4242424242424242",
//     exp_month: 12,
//     exp_year: 2020,
//     cvc: "123"
//   }
// });
      var data= {
          email: "ankita@gmail.com",
          amount: 500,
          name: "Ankita",
          address: {
            line1: '510 Townsend St',
            postal_code: '98140',
            city: 'San Francisco',
            state: 'CA',
            country: 'US',
          },
          stripeToken: token
      }
      console.log(data)

export const doPayment = (values) => {

  const headers = {
    'Content-Type': 'application/json',
  };
  return axios
    .post('http://192.168.43.103:5000/addPayment', values, { headers })
    .then(({ data }) => {
      console.warn({data});
      return data;
    })
    .catch(error => {
      return Promise.reject('Error in making payment', error);
    });
};
