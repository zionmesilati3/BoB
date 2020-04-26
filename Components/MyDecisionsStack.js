import React,{useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MySingleDecision from './MySingleDecision.js';
import MyDecisions from './MyDecisions.js';
import StopDecisions from './StopDecision.js';


const Stack = createStackNavigator();

export default function MyDecisionsStack({navigation}){
    // just a basic navigator to make some screen not apper
    // i still need to fix something here to make the login screen not part of the drawer at all
    return (
        <Stack.Navigator initialRouteName="My Decisions">
            <Stack.Screen name="My Decisions" component={MyDecisions} options={{headerShown:false}} />
            <Stack.Screen name="My Single Decision" component={MySingleDecision} options={{headerShown:false}} />
            <Stack.Screen name="Stop Decision" component={StopDecisions} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}