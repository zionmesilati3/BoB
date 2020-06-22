import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Button,Image,TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-material-ui';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export default function MyHome({navigation}){
    const [user,setUser]= useState(0);
    const [push,setPush]=useState('');
    /**  **/


    useEffect(()=>{
        const reScreen = navigation.addListener('focus',()=>{
          getData();
          console.log("event listener in Home")
        });
        return reScreen;
      },[]);
    
// seems like its working but it will upload the same device and user multiplay times

async function sendUserPushDB(userPush){
    await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/UsersPushNotifications/',{
        method:'POST',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
        body:JSON.stringify(userPush)
    })
    .then((response)=>response.json())
    .catch((error)=>console.log(error))
    .finally(()=>console.log("userPush was uploaded to the DB"))
}



    const registerForPushNotificationsAsync = async (u) => {
        if (Constants.isDevice) {
          const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = await Notifications.getExpoPushTokenAsync();
          console.log(token);
          setPush(token);
// send device and user to DB
// only if the user doesnt exist there now
          let userPush={
            "email":u.Email,
            "phone":u.Phone,
            "token":token
        }
// check if the user with this email/phone exist with this token 
// if the user already exist with this device it does noting 
// ***** if the email and phone are the same but device isnt it will replace device *****//
// ***** if the device already exist in the DB it should delete all other lines that has this device *****//
// ***** just so the device wont recive multiplay messages *****//
        await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/UsersPushNotifications/'+u.Email+'/'+u.Phone+'/'+token+'/',{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            }
        })
        .then((response)=>response.json())
        .then((count)=>{
            // send user to DB incase we havent found any
            console.log(count);
        if(count===0){
            sendUserPushDB(userPush);
        }
        else{
                console.log("user already exist so it wont add in DB");
            }
        })
        .catch((error)=>console.log(error))

// here we save the userPush in DB
        } else {
          alert('Must use physical device for Push Notifications');
        }
    
        if (Platform.OS === 'android') {
          Notifications.createChannelAndroidAsync('default', {
            name: 'default',
            sound: true,
            priority: 'max',
            vibrate: [0, 250, 250, 250],
          });
        }
      };
    
    
    async function getData(){
                try{
                    let value=await AsyncStorage.getItem('User');
                    if(value!==null){
                        setUser(JSON.parse(value));
                        console.log(JSON.parse(value))
                        registerForPushNotificationsAsync(JSON.parse(value));
                    }
                }
                catch(error){
                    console.log(error)
                }
            }
// noting much here its just a home page that can navigate to other screens
    const MoveTo=(name)=>{
        navigation.navigate(name);
      }

      

/**
 * 
 * 
            <View style={styles.row}>
            <Text style={styles.space}></Text>
            <Button  title="Move to GL" onPress={()=>MoveTo('GroupList')} />
            <Text style={styles.space}></Text>
            <Button  title="Move to Dec" onPress={()=>MoveTo('Decision')} />
            <Text style={styles.space}></Text>
            <Button  title="Move to Not" onPress={()=>MoveTo('Notifications')} />
            <Text style={styles.space}></Text>
            </View>

 */
/**
      push notofications in here
 */




    return(
        <View style={styles.container}>
        <ScrollView>
            
            <View style={styles.container}>
            <View style={styles.spaceH}></View>

                <View style={styles.colum}>
                    <View style={styles.row1}>
                    <View style={styles.spaceW}></View>
                        <View style={styles.sqr}>
                            <TouchableOpacity onPress={()=>{MoveTo('Make Decision')}}>
                                <Image style={styles.picture} source={require('./Images/createDecision.jpeg')} />
                            </TouchableOpacity>
                        </View>
                            <View style={styles.spaceW}></View>
                        <View style={styles.sqr}>
                            <TouchableOpacity onPress={()=>{MoveTo('Friends Decisions')}}>
                            <Image style={styles.picture} source={require('./Images/friendsDecisions.jpeg')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.spaceW}></View>
                    </View>
                </View>

                    <View style={styles.spaceH}></View>
                    
                <View style={styles.colum}>
                    <View style={styles.row1}>
                    <View style={styles.spaceW}></View>
                        <View style={styles.sqr}>
                            <TouchableOpacity onPress={()=>{MoveTo('My Decisions')}}>
                            <Image style={styles.picture} source={require('./Images/myDecisions.jpeg')} />
                            </TouchableOpacity>
                        </View>
                            <View style={styles.spaceW}></View>
                        <View style={styles.sqr}>
                            <TouchableOpacity onPress={()=>{MoveTo('Create Group')}}>
                            <Image style={styles.picture} source={require('./Images/createGroup.jpeg')} />
                            </TouchableOpacity>    
                        </View>
                        <View style={styles.spaceW}></View>
                    </View>
                </View>
                    
                    <View style={styles.spaceH}></View>

                <View style={styles.colum}>
                    <View style={styles.row1}>
                    <View style={styles.spaceW}></View>
                        <View style={styles.sqr}>
                            <TouchableOpacity onPress={()=>{console.log('will be updated')}}>
                            <Image style={styles.picture} source={require('./Images/changeDetails.jpeg')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.spaceW}></View>
                        <View style={styles.sqr}>
                            <TouchableOpacity onPress={()=>{console.log('will be updated')}}>
                            <Image style={styles.picture} source={require('./Images/categories.jpeg')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.spaceW}></View>
                    </View>
                </View>

                <View style={styles.spaceH}></View>

            </View>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    sqr:{
        flex:1,
        height:200,
        alignSelf:'stretch',
        overflow:'hidden',
        backgroundColor:'#fafafa',
        alignItems:'center',
        alignContent:'center',
        justifyContent:'center'
    },
    sqr1:{
        flex:1,
        height:200,
        backgroundColor:'#aecfe7',
        alignSelf:'stretch',
        overflow:'hidden',
    },
    colum:{
        flex:1,
        alignContent:'stretch'
    },
    row: {
        flexDirection: 'row',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    row1: {
        flexDirection: 'row',
        flex:1,
        alignContent:'center',
        alignItems:'flex-start',
        alignSelf:'center'
    },
    btn:{
        flex:1,
    },
    spaceW:{
        width:5
    },
    spaceH:{
        height:5
    },
    picture:{
        width: 230,
        height: 180,
        alignSelf:'center',
        resizeMode:'contain'
    },
  });