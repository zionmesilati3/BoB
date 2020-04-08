import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Components/MyHome.js';
import MakeDecision from './Components/MakeDecision.js';
import Header from './Components/Header.js';
import Decisions from './Components/Decisions.js';
import CreateGroup from './Components/CreateGroup.js';
import GroupList from './Components/GroupList.js';
import Notifications from './Components/NotificationScreen.js';
import Login from './Components/Login.js';
import SignUp from './Components/SignUp.js';
import 'react-native-gesture-handler';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


/**
 * we will need those drawers later on in the project
 * we will need to use drawer as main navigator and add the stack screens that fit each drawer
 * 
 */


 /**
  * we will need those stack screens later on
  * each screen should be renderd inside a drawer screen and each drawer should have about 1 stack screen
  *   <Stack.Navigator initialRouteName="Home">

    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Decision" component={Decision} />
    <Stack.Screen name="GroupList" component={GroupList} />
    <Stack.Screen name="Group" component={Group} />
    <Stack.Screen name="Friends" component={Friends} />

  </Stack.Navigator>
  * 
  */
export default function App() {
  return (
<NavigationContainer style={{backgroundColor:'#5af'}}>
<Header></Header>
<Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Notifications" component={Notifications}  />
    <Drawer.Screen name="Make Decision" component={MakeDecision} />
    <Drawer.Screen name="GroupList" component={GroupList} />
    <Drawer.Screen name="Decisions of Friends" component={Decisions} />
    <Drawer.Screen name="Create Group" component={CreateGroup} />
    <Drawer.Screen name="Login" component={Login} />
    <Drawer.Screen name="SignUp" component={SignUp} />
  </Drawer.Navigator>

</NavigationContainer>

);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  black:{
    backgroundColor:'#000',
  }
});
