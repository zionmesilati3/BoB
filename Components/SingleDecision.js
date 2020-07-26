import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Image,Button,FlatList,TouchableOpacity,useWindowDimensions,Slider } from 'react-native';
import { ActionButton,Card,Icon } from 'react-native-material-ui';


export default function Decisions({route,navigation}){
// single decision page still need alot of work

const [decision,setDecision]=useState(route.params.Decision)
const [pic,setPic]=useState(null)
const [picture1,setPicture1]=useState(route.params.Decision.Img1)
const [picture2,setPicture2]=useState(route.params.Decision.Img2)
const [answer,setAnswer]=useState(50)
const [picked,setPicked]=useState(2)


const ChosenAnswer=(value)=>{
    if(value<50){
        setPic(picture1);
        setAnswer(value);
        setPicked(0)
    }
    if(value>50){
        setPic(picture2);
        setAnswer(value);
        setPicked(1)
    }
    else{
        console.log("the user didnt put a specific pick")
    }
}

    async function SendAnswer(){
        
        if(picked===2&&answer===50){console.log("please pick an answer")}
        else{
            // here we need to send notification to the user in {decision.User_email}
            // the message will be something like "route.params.User.First_name route.params.User.Last_name has answerd your decision"
            // **** we will only send the notification in the fetch method after the "user has answerd decision" log **** //
            console.log(route.params.User)
            console.log(decision)
            let UD={
                "IndecisionID": decision.IndecisionID, 
                "UserInGroup_emailParticipant": route.params.User.Email,
                "UserInGroup_groupID": decision.Group_groupID,
                "Pic_num": picked,
                "Percent_option1": ((100-answer)/100),
                "Percent_option2": (answer/100),
            }
            console.log(UD)
            await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/UserInIndecision/updateAnswer/',{
                method:'PUT',
                headers:{
                    Accept:'application/json','Content-Type':'application/json',
                },
                body:JSON.stringify(UD)
            })
            .then((response)=>response.json())
            .then((json)=>{
                console.log(json)
                console.log("user has answered decision")
                getToken();
                alert("Thank you for the help")
            })
            .catch((error)=>console.log(error))
            .finally(()=>console.log('finished everything'))
        }
    }

    const getToken=async()=>{
        let str="'"+decision.User_email+"'";
        await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/UsersPushNotifications/'+str+'/',{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res!==null){
                res.map((mem)=>sendPush(mem))
            }
        })
        .catch((error)=>console.log(error))
    }


    const sendPush=async(mem)=>{
        const message = {
            to: mem.Token,
            sound: 'default',
            title: "user has answerd your decision",
            body: "hello "+mem.Email+" your friend "+route.params.User.Email+" has answerd your decision",
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
    navigation.navigate('Friends Decisions');
    }

    return(
        <View style={styles.container}>
            <View style={styles.spaceH}></View>
            <Text style={styles.title}> {decision.User_email} needs your help</Text>
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

                        <Slider
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor="#5af"
                            maximumTractTintColor="#5af"
                            step={1}
                            value={answer}
                            onValueChange={value => ChosenAnswer(value)}
                            style={styles.slider}
                            thumbTintColor="5af"
                        />

                        
                    </View>
                    <View style={styles.spaceH}></View>
                    <View style={styles.row}>
                        {pic &&(picked===1 && (<View style={styles.sqr1}>
                            <Text style={styles.title}>you vote {answer}% in favor of: </Text>
                            <View style={styles.spaceH}></View>
                        <Image source={{uri:pic}} style={styles.picture}/>
                        </View> )||picked===0 && (<View style={styles.sqr1}>
                            <Text style={styles.title}>you vote {(100-answer)}% in favor of: </Text>
                            <View style={styles.spaceH}></View>
                        <Image source={{uri:pic}} style={styles.picture}/>
                        </View> )
                        )}
                    </View>
                </View>
                
<View style={styles.btn}>
        <TouchableOpacity onPress={()=>SendAnswer()}>
            <Icon color='#5af' size={100} style={{alignSelf:'center'}} name="send" />
        </TouchableOpacity>
</View>
                

            </View>
        </View>
    )
}
/**
 * 
 * <Button title=" pick picture 1" onPress={()=>{ChosenAnswer(1)}} />
                        <View style={styles.space}></View><View style={styles.space}></View><View style={styles.space}></View>
                        <Button title=" pick picture 2" onPress={()=>{ChosenAnswer(2)}} />
 */
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
    },
    picture:{
        width: 150,
        height: 180,
        alignSelf:'center'
    },
    sqr:{
        flex:1,
        height:200,
        backgroundColor:'#fafafa',
        alignSelf:'center',
        justifyContent:'center',
        borderWidth:0.5,
    },
    sqr1:{
        flex:1,
        alignSelf:'center',
        alignItems:'center',
        alignContent:'center',
        justifyContent:'center',
        borderWidth:0.5,
        marginLeft:30,
        marginRight:30,
        paddingBottom:10,
        paddingTop:10,
    },
    colum:{
        flex:1,
        alignContent:'center',
        justifyContent:'center'
    },
    row2:{
        flex:0,

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
    },
    slider:{
        alignSelf:'stretch',
        padding:10
    }

  });