import React,{useState, useEffect} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './MyHome.js';
import CreateGroup from './CreateGroup.js';
import GroupList from './GroupList.js';
import MyDecisionsStack from './MyDecisionsStack.js';
import FDecisionsStack from './FDecisionsStack.js';
import MakeDecision from './MakeDecision.js';



const Drawer = createDrawerNavigator();

export default function HomeStack({navigation}){
    // just a basic navigator to make some screen not apper
    // i still need to fix something here to make the login screen not part of the drawer at all
    return (
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Friends Decisions" component={FDecisionsStack} />
        <Drawer.Screen name="My Decisions" component={MyDecisionsStack} />
        <Drawer.Screen name="Make Decision" component={MakeDecision} />
        <Drawer.Screen name="GroupList" component={GroupList} />
        <Drawer.Screen name="Create Group" component={CreateGroup} />
    </Drawer.Navigator>
    )
}
