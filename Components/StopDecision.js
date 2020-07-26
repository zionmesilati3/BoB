import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Image,Button,FlatList,TouchableOpacity,useWindowDimensions } from 'react-native';
import { ActionButton,Card,Icon } from 'react-native-material-ui';

export default function Decisions({route,navigation}){
// single decision page still need alot of work

    const [decision,setDecision]=useState(route.params.Decision)
    const [picture1,setPicture1]=useState(route.params.Decision.Img1)
    const [picture2,setPicture2]=useState(route.params.Decision.Img2)
    const [winner,setWinner]=useState('')
    const [value,setValue]=useState(null)

    useEffect(()=>{
        if(route.params.Decision.CurrectAnswerPercent>0.5){
            setWinner("Image 2");
            setValue(route.params.Decision.CurrectAnswerPercent*100)
        }
        else if(route.params.Decision.CurrectAnswerPercent<0.5&&route.params.Decision.CurrectAnswerPercent>0){
            setWinner("Image 1");
            setValue((1-route.params.Decision.CurrectAnswerPercent)*100)
        }
        else{
            setWinner("No leading Image so far");
        }
    },[])

    const Dclose=(bool)=>{
        ChosenItem(bool);
    }

    async function ChosenItem(bool){
        await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/UserToUser/changeWeight/' + route.params.User.Email + "/" + decision.IndecisionID + "/" + bool+ "/",{
                        method:'GET',
                        headers:{
                            Accept:'application/json','Content-Type':'application/json',
                        },
                    })
                    .then((response)=>response.json())
                    .then((res)=>{
                        console.log("res in chosenItem: ",res)
                        getGroupMembers(decision.IndecisionID,decision.Group_groupID,bool)
                        console.log("the decision will be closed")
                    })
                    .catch((error)=>console.log(error))
    }


    const getGroupMembers=async(DecisionID,groupID,pickedItem)=>{
        let str='';
        await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/UserInGroup/GroupNameString/'+groupID+'/'+DecisionID+'/',{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>{
            console.log("res in getGroupMembers: ",res)
            res.map((mem)=>{
                str+="'"+mem.User_email+"',";
            })
            str=str.slice(0,-1);
            getTokens(str,pickedItem);
        })
        .catch((error)=>console.log(error))
    }

    const getTokens=async(membersString,pickedItem)=>{
        await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/UsersPushNotifications/'+membersString+'/',{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>{
            console.log("res in getTokens: ",res)
            res.map((mem)=>sendPush(mem,pickedItem))
        })
        .catch((error)=>console.log(error))
    }


    const sendPush=async(mem,pickedItem)=>{
        let pick;
        if(pickedItem==true){
            pick=1;
        }
        else{pick=2;}
        const message = {
            to: mem.Token,
            sound: 'default',
            title: "thank you for helping",
            body: "the user has picked item number: "+pick,
            data: { data: 'i dont know what this does' },
            _displayInForeground: true,
          };
          const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    CloseDecision();
    }

async function CloseDecision(){
    let Indecision={
        "IndecisionID":decision.IndecisionID
    }
    await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/Indecision/PutIndecision',{
                        method:'PUT',
                        headers:{
                            Accept:'application/json','Content-Type':'application/json',
                        },
                        body:JSON.stringify(Indecision)
                    })
                    .then((response)=>response.json())
                    .then((res)=>{
                        console.log("the decision was closed down by the user")
                        navigation.navigate("My Decisions")
                    })
                    .catch((error)=>console.log(error))
}


    return(
        <View style={styles.container}>
            <View style={styles.spaceH}></View>
            <Text style={styles.title}>{route.params.User.First_name} {route.params.User.Last_name} are you sure you want to stop this decision?</Text>
            <View style={styles.spaceH}></View>
            <Text style={styles.title}> {decision.Description_}</Text>
            <View style={styles.container1}>
                <View style={styles.colum}>
                <View style={styles.spaceH}></View>
                <View>
                    {value && (<Text style={styles.title}>your friends choose {winner} and its leading by {value}% </Text>)}
                    {!value && (<Text style={styles.title}>{winner}</Text>)}
                </View>
                
                    <View style={styles.row1}>
                    <View style={styles.space}></View>
                        <View style={styles.sqr}>
                            <Image
                            style={styles.picture}
                            source={{uri: picture1}}
                            />
                        </View>
                        <View style={styles.space}></View>
                        <View style={styles.sqr}>
                            <Image
                            style={styles.picture}
                            source={{uri: picture2}}
                            />
                        </View>
                        <View style={styles.space}></View>
                    </View>
                    
                    <View style={styles.row2}>
    
                        <Button title="I picked this item" onPress={()=>{Dclose(true)}} />
                        <View style={styles.space}></View><View style={styles.space}></View>
                        <Button title="I picked this item" onPress={()=>{Dclose(false)}} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
    },
    container1:{
        flex:1,
        backgroundColor:'#ffffff',
        alignContent:'flex-start',
        justifyContent:'flex-start',
    },
    picture:{
        width: 150,
        height: 180,
        alignSelf:'center'
    },
    sqr:{
        flex:1,
        height:200,
        backgroundColor:'#fcfcfc',
        alignSelf:'center',
        justifyContent:'center',
        borderWidth:0.5,
    },
    sqr1:{
        height:220,
        backgroundColor:'#aecfe7',
        alignSelf:'center',
        alignItems:'center',
        alignContent:'center',
        justifyContent:'center',
    },
    colum:{
        flex:1,
        alignContent:'center',
        justifyContent:'center'
    },
    row2:{
        flex:1,
        flexDirection: 'row',
        alignContent:'center',
        justifyContent:'center',
        alignItems:'flex-start',
        alignSelf:'stretch',

    },
    row: {
        flex:1,
        flexDirection: 'row',
        alignContent:'center',
        justifyContent:'center',
        alignItems:'flex-start',
        alignSelf:'stretch',
    },
    row1: {
        flexDirection: 'row',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        
    },
    btn:{
        alignSelf:'stretch',
        backgroundColor:'#00ffff'
    },
    space:{
        width:20
    },
    title:{
        fontSize:16,
        alignSelf:'center'
    },
    spaceH:{
        height:10,
    }

  });