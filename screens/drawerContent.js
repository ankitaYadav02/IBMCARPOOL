import React, { useState ,useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-community/async-storage'

export function DrawerContent(props) {
    const [Name,setName]=useState('')
    const [Email,setEmail]=useState('')
    const logout=async ()=>{
           console.log('welcome here')
        try {
            await AsyncStorage.removeItem('token');
             props.navigation.navigate('Home')
             Toast.show({
                text1: 'We Will miss You',
                text2: 'You Log Out Successfully 👋'
              })
          } catch (error) {
            console.log(error.message);
            Toast.show({
                type:'error',
                text1: 'Error',
                text2: 'Oops!Something went wrong...'
              })
          }
    }
    useEffect(async()=>{
            console.log('=============')
            const token = await AsyncStorage.getItem('token');
            console.log(token)
            fetch('http://192.168.43.103:5000/getuser',{
            headers:{
                'Content-Type':'application/json',
                Authorization:'Bearer '+token
              }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setName(result.name)
            setEmail(result.email)
        })
           
    },[])
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={require('../assets/default.jpg')}
                                size={50}
                            />
                            <View style={{marginLeft:55, flexDirection:'column'}}>
    <Title style={styles.title}>{Name}</Title>
                                <Caption style={styles.caption}>{Email}</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            label="Welcome"
                            onPress={() => {props.navigation.navigate('WELCOME')}}
                        />
                        <DrawerItem 
                            label="Guidelines"
                            onPress={() => {props.navigation.navigate('Guidelines')}}
                        />
                        <DrawerItem 
                            label="Your Health QR code"
                            onPress={() => {props.navigation.navigate('Your Health QR code')}}
                        />
                        <DrawerItem 
                            label="Scan Health Qr"
                            onPress={() => {props.navigation.navigate('Scan Health Qr')}}
                        />
                        <DrawerItem 
                            label="Parking"
                            onPress={() => {props.navigation.navigate('Parking')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    label="Sign Out"
                    onPress={() =>logout()}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
     marginLeft:20,
      marginTop:30
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    // paragraph: {
    //   fontWeight: 'bold',
    //   marginRight: 3,
    // },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#ffffff',
        borderTopWidth: 1,
        alignItems:'center',
        backgroundColor:'#531e8f'
    },
    // preference: {
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   paddingVertical: 12,
    //   paddingHorizontal: 16,
    // },
  });