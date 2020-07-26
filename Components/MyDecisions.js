import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Button, ActivityIndicator,Image } from 'react-native';
import { ActionButton,Card } from 'react-native-material-ui';
import { CheckBox } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MyDecisions({navigation}){
    const[decisions,setDecisions]=useState(null)
    const[user,setUser]=useState(null);
    const[closed,setClosed]=useState(null)
//-------------------------------- step 1 --------------------------------//
// this is the init function in react 
// 1. we get the user from local storage 
// 2. the decisions of the user we get from DB

// 3. build of current decisions CARD is still in process

useEffect(()=>{
    const reScreen = navigation.addListener('focus',()=>{
      getData();
      console.log("event listener in my Dec")
    });
    return reScreen;
  },[]);

async function getData(){
            try{
                let value=await AsyncStorage.getItem('User');
                if(value!==null){
                    fetch('https://proj.ruppin.ac.il/igroup21/proj/api/Indecision/getIndecisionByUserEmail/' +JSON.parse(value).Email+'/' ,{
                        method:'GET',
                        headers:{
                            Accept:'application/json','Content-Type':'application/json',
                        },
                    })
                    .then((response)=>response.json())
                    .then((res)=>{
                        let cList=[];
                        let oList=[];
                        if(res){
                            res.map((dec)=>{
                                if(dec.Close_indecision==0){
                                    oList.push(dec);
                                }
                                else{
                                    cList.push(dec);
                                }
                            })
                        }
                        console.log(cList)
                        setDecisions(oList)
                        setClosed(cList)
                })
                    .catch((error)=>console.log(error))

                    setUser(JSON.parse(value));
                    console.log("user is set");
                }
            }
            catch(error){
                console.log(error)
            }
        }

const GR=(decID)=>{
        GetResults(decID)
    }


async function GetResults(decID){
    console.log(user);
    console.log(decID)
    await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/UserToUser/getAnswerPerDecision/'+user.Email+"/"+decID+ "/",{
                        method:'GET',
                        headers:{
                            Accept:'application/json','Content-Type':'application/json',
                        },
                    })
                    .then((response)=>response.json())
                    .then((res)=>{
                        console.log(res)
                        if (!(res >= 0 || res <= 1))
                     alert("nobody answer yet");

                 else if (res < 0.5) {
                        alert("img 1 win with " + (1-res) + " %");
                    }
                 else {
                         alert("img 2 win with " + res + " %");
                    }
                    })
                    .catch((error)=>console.log(error))
}

    return(
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.container}>
            <View style={styles.spaceH}></View><Text style={styles.title}>My Opened Decisions</Text><View style={styles.spaceH}></View>
                        {decisions&&decisions.map((item)=><View style={styles.sqr} key={item.IndecisionID}><View style={styles.spaceH}></View>
                            <Text style={styles.title1}> {item.Description_}</Text>
                            <View style={styles.spaceH}></View>
                            <View style={styles.row}>
                                <Image style={styles.picture} source={{uri: item.Img1}} />
                                <View style={styles.spaceW}></View>
                                <Image style={styles.picture} source={{uri: item.Img2}} />
                            </View>
                            <View style={styles.spaceH}></View>
                            <View style={styles.row}>
                                <Button style={styles.btnL} onPress={()=>navigation.navigate('My Single Decision',{Decision:item,User:user})} title="View" />
                                <View style={styles.spaceW}></View>
                                <Button style={styles.btnR} onPress={()=>GR(item.IndecisionID)} title="Results" />
                                <View style={styles.spaceW}></View>
                                <Button style={styles.btnR} onPress={()=>navigation.navigate("Stop Decision",{Decision:item,User:user})} title="Stop" />
                            </View>
                            <View style={styles.spaceH}></View>
                        </View>)}{!decisions&&<ActivityIndicator animating={true} color='#bc2b78' size='large' />}
                        <View style={styles.spaceH}></View><Text style={styles.title}>My Closed Decisions</Text><View style={styles.spaceH}></View>
                        {closed&&closed.map((item)=><View style={styles.sqr} key={item.IndecisionID}><View style={styles.spaceH}></View>
                            <Text style={styles.title1}> {item.Description_}</Text>
                            <View style={styles.spaceH}></View>
                            <View style={styles.row}>
                                <Image style={styles.picture} source={{uri: item.Img1}} />
                                <View style={styles.spaceW}></View>
                                <Image style={styles.picture} source={{uri: item.Img2}} />
                            </View>
                            <View style={styles.spaceH}></View>
                            <View style={styles.row}>
                                <Button style={styles.btnR} onPress={()=>GR(item.IndecisionID)} title="Results" />
                            </View>
                            <View style={styles.spaceH}></View>
                        </View>)}{!closed&&<ActivityIndicator animating={true} color='#bc2b78' size='large' />}
            </View>
            </ScrollView>
                <ActionButton style={{container:{backgroundColor:'#5af'}}} icon="add" onPress={()=>navigation.navigate('Make Decision')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    picture:{
        width:80,
        height:100,
        alignSelf:'center',
        padding:60,
    },
    sqr:{
        marginTop:10,
        marginBottom:10,
        marginLeft:20,
        marginRight:20,
        padding:10,
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
    },
    title:{
        fontSize:24,
        alignSelf:'center',
        borderBottomWidth:1,
    },
    title1:{
        fontSize:18,
        alignSelf:'center',
    },
    row: {
        flexDirection: 'row',
        flex:1,
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
    spaceW:{
        width:20,
    },
    spaceH:{
        height:10,
    },
    btnL:{
        alignSelf:'flex-start',
    },
    btnR:{
        alignSelf:'flex-end',
    },
})