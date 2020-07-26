import React,{useState,useEffect} from 'react';
import { View, Text,StyleSheet,TextInput,ScrollView,AsyncStorage,Button,Alert } from 'react-native';
import { Card,ActionButton } from 'react-native-material-ui';
import ContactList from './ContactList.js';
import * as SMS from 'expo-sms';

export default function CreateGroup({navigation}){

    const[gname,setGname]=useState('')
    const[fl,setFl]=useState([])
    const[user,setUser]=useState(null)

    var fList=[];

// init function to set current user and his groups

useEffect(() => {
    (async () => {
        const reScreen = navigation.addListener('focus',()=>{
            getUser();
            console.log("event listener in cg")
          });
          return reScreen;
    })(); 
  }, []);


// save the contact from contact list in a list and save it in state
const placeContact=(friend)=>{
    if(fl.length<=10){
        friend.checked=!friend.checked;
        fList=[...fl];
        if(friend.checked){
            fList.push(friend);
        }
        else{
            let index=fList.indexOf(friend);
            fList.map((f)=>{
                if(index>-1){
                    fList.splice(index,1);
                }
            })
        }
        setFl(fList);
    }
    else{alert("group is full")}
}

const SendSMS=async(phone)=>{
    const isAvailable = await SMS.isAvailableAsync();
if (isAvailable) {
  // do your SMS stuff here also the link to download our app will be here
  const { result } = await SMS.sendSMSAsync(
    ["'"+phone+"'"],
    'i want you to help me with my decisions please join in and help me'+' https://expo.io/@zionmesilati3/BobApp'
  );
} else {
  // misfortune... there's no SMS available on this device
  alert("sms is not available")
}
}

const CheckFriend=async(friend)=>{
    await fetch("https://proj.ruppin.ac.il/igroup21/proj/api/User/phoneNumbersString/'"+friend.phone+"'/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.length===0){
                Alert.alert(
                    "user not found",
                    "we cant find your friend in our DB would you like to invite him?",
                    [
                        {
                            text:"yes",
                            onPress:()=>SendSMS(friend.phone)
                        },
                        {
                            text:"no",
                            onPress:()=>console.log("do noting")
                        }
                    ],
                    {cancelable:false}
                    )
            }
            else{
                placeContact(friend)
            }
        })
        .catch((error)=>console.log(error))
}

// get user from local storage
async function getUser(){
    try{
        let value=await AsyncStorage.getItem('User');
        if(value!==null){
            setUser(JSON.parse(value));
            console.log("user is set")
        }
    }
    catch(error){
        console.log(error)
    }
}


/*
const changePhoneNumbers=()=>{
    let pList=[];
    let pn='';
    fl.map((f)=>{
        pn=f.phoneNumbers[0].number.replace("+972 ",'0');
        pList.push(pn);
    });
    console.log(pList);
}
*/


// group from data base start here!!
// **** 1 **** //
// send the phone numbers of picked friends to DB to add to the new group

const sendData=async()=>{
    let pn;
    let phoneNumbersString = "'050555555111','050555555101','0522695041',";
    // we can use this if and map statements to send
    if(fl.length>0){
        fl.map((c)=>{
            pn=c.phone;
            pn=pn.replace("+972",'0');
            pn=pn.replace(" ",'');
            pn=pn.replace("-",'');
            pn=pn.replace("-",'');
            phoneNumbersString+="'"+pn+"',";
        });
        phoneNumbersString=phoneNumbersString.slice(0,-1);
    }
    // if the length is more than 10 the
    // here we send the string of phone numbers we made to the data base 
    // importent thing to note is that as of now we need the phone numbers to exist in the data base so we still use "static numbers that we have in the DB".
console.log(phoneNumbersString);
    await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/User/phoneNumbersString/'+phoneNumbersString+"/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>groupCheck(res))
        .catch((error)=>console.log(error))
        .finally(()=>console.log('sent numbers'))
    
}
// **** 2 **** //
// check if the group name is already used by the user and take care of it

const groupCheck=async(data)=>{
    let phones=data;
    console.log(data);

    fetch('https://proj.ruppin.ac.il/igroup21/proj/api/Group/GroupNameStringGroup/' + user.Email + "/" + gname+"/true/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>{
            console.log(res);
            if(res>0){
                alert("group name is already in use");
                console.log("group name already in use");
            }
            else if(res===0){
                alert("creating new group");
                groupIN(res,phones);
            }
            else{alert("error of some kind");}
        })
        .catch((error)=>console.log(error))
        .finally(()=>console.log('group checked'))
}

// **** 3 **** //
// insert group into DB with the user

const groupIN=async(data,phones)=>{
    let gr={
        "User_manager": user.Email,
        "Group_name": gname
    }

    await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/Group',{
        method:'POST',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
        body:JSON.stringify(gr)
    })
    .then((response)=>{
        GroupID(phones);
    })
    .catch((error)=>console.log(error))
    .finally(()=>console.log('group added'))
}

// **** 4 **** //
// get group ID

const GroupID=async(phones)=>{
    await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/Group/GroupNameStringGroup/' + user.Email + "/" + gname+"/true/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>UsersAdder(res,phones))
        .catch((error)=>console.log(error))
        .finally(()=>console.log('got group ID'))
}

// **** 5 **** //
// add users to group

const UserToUserAdd=async(phones)=>{
    if(phones!==null){
        phones.map((friend)=>{

            let UserToUser = {
                "UserSend": user.Email,
                "UserReceive": friend.Email,
                "NumOfCurrectAnswer": 1,
            }
            console.log("here is what i need ",UserToUser)

            fetch('https://proj.ruppin.ac.il/igroup21/proj/api/UserToUser/',{
                method:'POST',
                headers:{
                    Accept:'application/json','Content-Type':'application/json',
                },
                body:JSON.stringify(UserToUser)
            })
            .then((response)=>console.log("friend was added to UserToUser table"))
            .catch((error)=>console.log(error))
        })
        endFunc();
    }
}

const endFunc=()=>{
    navigation.navigate('Home');
}


const UsersAdder=async(groupID,phones)=>{
    console.log(phones)
    if(phones!==null){
        phones.map((friend)=>{
            let UserInGroup={
                "User_email": friend.Email,
                "Group_groupID": groupID
            }

            fetch('https://proj.ruppin.ac.il/igroup21/proj/api/UserInGroup',{
                method:'POST',
                headers:{
                    Accept:'application/json','Content-Type':'application/json',
                },
                body:JSON.stringify(UserInGroup)
            })
            .then((response)=>console.log("added friend to group"))
            .catch((error)=>console.log(error))
        });
        UserToUserAdd(phones);
    }
}

// group from data base end here


    return(
        <View style={styles.container}>
            <View style={styles.input}>
                <Text style={styles.title}>Group Creation</Text>
                <View style={styles.sqr}><TextInput onChangeText={text=>setGname(text)} value={gname} placeholder='enter group name' /></View>
                <Text style={styles.title}>Pick Members</Text>
            </View>

<ContactList placeContact={CheckFriend} />


                <ActionButton style={{container:{backgroundColor:'#5af'}}} icon="add" onPress={()=>sendData()} />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#fcfcfc',
  },
  sqr:{
    marginTop:3,
    marginBottom:3,
    padding:3,
    borderRadius:6,
    elevation:3,
    backgroundColor:'#fcfcfc',
    shadowOffset:{width:1,height:1},
    shadowColor:'#000',
    shadowOpacity:0.3,
    shadowRadius:1,
    marginHorizontal:3,
    marginVertical:4,
    alignSelf:'stretch',
    alignItems:'center',
    marginRight:10,
    marginLeft:10,
},
  list:{
    flex:1,
    alignSelf:'stretch'
  },
  input:{
    alignSelf:'stretch',
  },
  row: {
    flexDirection: 'row',
    flex:1,
    alignContent:'center',
    alignItems:'flex-start',
    alignSelf:'center'
},
title:{
    fontSize:20,
    alignSelf:'center',
},
  spaceW:{
      width:10
  },
  spaceH:{
      height:5
  },  
  buttons:{
      flex:0,
      alignSelf:'center'
  }
  });