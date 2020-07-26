import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStack from './Components/HomeStack.js';
import Header from './Components/Header.js';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './Components/Login.js';
import SignUp from './Components/SignUp.js';
import Commercial from './Components/Commercial.js';


const Stack = createStackNavigator();


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

const [login,setLogin]=useState(false);
const [user,setUser]=useState('');


// this is the navigation container 
// the screens that are in the drawer are all shown when you swipe the screen to the side
// we have some other screens that cant be seen and they are not in the drawer like login,signin and others

  return (
    <SafeAreaProvider>
<NavigationContainer>
  <Header user={user}/>
  <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
            <Stack.Screen name="Home" component={HomeStack} options={{headerShown:false}} />
            <Stack.Screen name="Commercial" component={Commercial} options={{headerShown:false}} />
        </Stack.Navigator>
</NavigationContainer>
</SafeAreaProvider>

);
}


/**


<Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Friends Decisions" component={FDecisionsStack} />
        <Drawer.Screen name="My Decisions" component={MyDecisionsStack} />
        <Drawer.Screen name="Make Decision" component={MakeDecision} />
        <Drawer.Screen name="GroupList" component={GroupList} />
        <Drawer.Screen name="Create Group" component={CreateGroup} />
      </Drawer.Navigator>

 */

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
