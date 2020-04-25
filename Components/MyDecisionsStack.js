import React,{useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function HomeStack({navigation}){
    // just a basic navigator to make some screen not apper
    // i still need to fix something here to make the login screen not part of the drawer at all
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}