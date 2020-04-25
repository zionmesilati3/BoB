import React,{useState,useEffect} from 'react';
import { View, Text,StyleSheet,TextInput,ScrollView,AsyncStorage,Button } from 'react-native';
import { Card,ActionButton } from 'react-native-material-ui';
import ContactList from './ContactList.js';

export default function CreateGroup({navigation}){

    const[gname,setGname]=useState('enter group name')
    const[groups,setGroups]=useState([])
    const[fl,setFl]=useState([])
    const[user,setUser]=useState(null)
    const[phones,setPhones]=useState(null)

    var fList=[];

// init function to set current user and his groups

useEffect(() => {
    (async () => {
        console.log("in effect");
        getData();
        getUser();
    })(); 
  }, []);

// get the group list from local storage
    async function getData(){
        try{
            let value=await AsyncStorage.getItem('groupList');
            if(value!==null){
                setGroups(JSON.parse(value));
                console.log("groups are set")
            }
        }
        catch(error){
            console.log(error)
        }
    }
// save the contact from contact list in a list and save it in state
const placeContact=(friend)=>{
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
    console.log(fList);
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

// stores group in local storage

const _storeData = async(gname) => {
    let groupList=[...groups];
    let g={
        friends:[...fl],
        name:gname,
        checked:false,
    };
    groupList.push(g);
    setGroups(groupList);
    console.log(groupList)
    try{
        await AsyncStorage.setItem('groupList',JSON.stringify(groupList));
        console.log("succses");
    }
    catch(error){
        console.log(error);
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
    let phoneNumbersString = "'050555555111','050555555101','0522695041'";

    if(fl!==[]){//this function pass over all the contacts and add them to the string 
        phoneNumbersString="";
        fl.map((c)=>{
            pn=c.phoneNumbers[0].number;
            pn=pn.replace("+972 ",'0');
            pn=pn.replace("-",'');
            pn=pn.replace("-",'');
            phoneNumbersString+="'"+pn+"',";
        });
        phoneNumbersString=phoneNumbersString.slice(0,-1);
        
    }
// here we send the string of phone numbers we made to the data base 
// importent thing to note is that as of now we need the phone numbers to exist in the data base so we still use "static numbers that we have in the DB".

    fetch('https://proj.ruppin.ac.il/igroup21/proj/api/User/phoneNumbersString/'+phoneNumbersString+"/",{
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
    setPhones(data);
    console.log(data);

    fetch('https://proj.ruppin.ac.il/igroup21/proj/api/Group/GroupNameStringGroup/' + user.Email + "/" + gname+"/true/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res>0){
                alert("group name already exist in DB");
                console.log("group name already in use");
            }
            else if(res===0){
                alert("group doesnt exist in DB you can use it");
                groupIN(res);
            }
            else{alert("error of some kind");}
        })
        .catch((error)=>console.log(error))
        .finally(()=>console.log('group checked'))
}

// **** 3 **** //
// insert group into DB with the user

const groupIN=async(data)=>{
    let gr={
        "User_manager": user.Email,
        "Group_name": gname
    }

    fetch('https://proj.ruppin.ac.il/igroup21/proj/api/Group',{
        method:'POST',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
        body:JSON.stringify(gr)
    })
    .then((response)=>{
        GroupID();
    })
    .catch((error)=>console.log(error))
    .finally(()=>console.log('group added'))
}

// **** 4 **** //
// get group ID

const GroupID=async()=>{
    fetch('https://proj.ruppin.ac.il/igroup21/proj/api/Group/GroupNameStringGroup/' + user.Email + "/" + gname+"/true/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>UsersAdder(res))
        .catch((error)=>console.log(error))
        .finally(()=>console.log('got group ID'))
}

// **** 5 **** //
// add users to group

const UsersAdder=async(groupID)=>{
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
            .then((response)=>console.log("added friends to group"))
            .catch((error)=>console.log(error))
        });

    }
}

// group from data base end here


    return(
        <View style={styles.container}>
            <View style={styles.input}>
                <Text>Title</Text>
                <Card style={{container:{backgroundColor:'#3838c7',alignSelf:'stretch'}}}><TextInput onChangeText={text=>setGname(text)} value={gname} /></Card>
            </View>

<ContactList placeContact={placeContact} />

<Button title="send group to server" onPress={()=>sendData()} />
                <ActionButton style={{container:{backgroundColor:'#3838c7'}}} icon="add" onPress={()=>_storeData(gname)} />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#5af',
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