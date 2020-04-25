import React,{useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SingleDecision from './SingleDecision.js';
import FriendsIndecisions from './FriendsIndecisions.js';


const Stack = createStackNavigator();

export default function HomeStack({navigation}){
    // just a basic navigator to make some screen not apper
    // i still need to fix something here to make the login screen not part of the drawer at all
    return (
        <Stack.Navigator initialRouteName="Friends Decisions">
            <Stack.Screen name="Friends Decisions" component={FriendsIndecisions} options={{headerShown:false}} />
            <Stack.Screen name="Single Decision" component={SingleDecision} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}