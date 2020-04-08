import React,{useState,useEffect} from 'react';
import { View, Text,StyleSheet,TextInput,ScrollView,AsyncStorage } from 'react-native';
import { Button,Card,ActionButton } from 'react-native-material-ui';
import ContactList from './ContactList.js';

export default function CreateGroup({navigation}){

    const[gname,setGname]=useState('enter group name')
    const[groups,setGroups]=useState([])
    const[fl,setFl]=useState([])

    var fList=[];

useEffect(()=>{
    async()=>{
        console.log("in effect");
        getData();
    }
});

    async function getData(){
        try{
            let value=await AsyncStorage.getItem('groupList');
            if(value!==null){
                setGroup(JSON.parse(value));
                console.log(value);
            }
        }
        catch(error){
            console.log(error)
        }
    }

const addFriend=(friend)=>{
    friend.checked=!friend.checked;
    fList=[...fl];
    if(friend.checked){
        fList.push(friend);
        setFl(fList);
    }
    else{
        let index=fList.indexOf(friend);
        fList.map((f)=>{
            if(index>-1){
                fList.splice(index,1);
            }
        })
        setFl(fList);
    }
}



const _storeData = async(gname) => {
    let groupList=[...groups];
    let g={
        friends:[...fl],
        name:gname,
        checked:false,
    };
    groupList.push(g);
    setGroups(groupList);
    try{
        await AsyncStorage.setItem('groupList',JSON.stringify(groups));
        console.log("succses");
    }
    catch(error){
        console.log(error);
    }
}

    return(
        <View style={styles.container}>
            <View style={styles.input}>
                <Text>Title</Text>
                <Card style={{container:{backgroundColor:'#3838c7',alignSelf:'stretch'}}}><TextInput onChangeText={text=>setGname(text)} value={gname} /></Card>
            </View>

<ContactList placeContact={addFriend} />


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
  buttons:{
      flex:0,
      alignSelf:'center'
  }
  });