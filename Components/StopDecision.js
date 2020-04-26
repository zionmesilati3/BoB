import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Image,Button,FlatList,TouchableOpacity,useWindowDimensions } from 'react-native';
import { ActionButton,Card,Icon } from 'react-native-material-ui';

export default function Decisions({route,navigation}){
// single decision page still need alot of work

    const [decision,setDecision]=useState(route.params.Decision)
    const [picture1,setPicture1]=useState(route.params.Decision.Img1)
    const [picture2,setPicture2]=useState(route.params.Decision.Img2)

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
                        CloseDecision()
                        console.log("the decision will be closed")
                    })
                    .catch((error)=>console.log(error))
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
            <View style={styles.container}>
                <View style={styles.colum}>
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
    },
    picture:{
        width: 150,
        height: 180,
        alignSelf:'center'
    },
    sqr:{
        flex:1,
        height:200,
        backgroundColor:'#aecfe7',
        alignSelf:'center',
        justifyContent:'center',
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
        flex:0,
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
        alignItems:'center'
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