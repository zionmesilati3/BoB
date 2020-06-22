import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Button,Image,TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-material-ui';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './MyHome.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Commercial from './Commercial.js';

const Stack = createStackNavigator();

export default function HomeStack({navigation}){
    // just a basic navigator to make some screen not apper
    // i still need to fix something here to make the login screen not part of the drawer at all
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
            <Stack.Screen name="Commercial" component={Commercial} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}
