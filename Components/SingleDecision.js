import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Image,Button,FlatList,TouchableOpacity,useWindowDimensions } from 'react-native';
import { ActionButton,Card,Icon } from 'react-native-material-ui';

export default function Decisions({route,navigation}){
// single decision page still need alot of work

    const [decision,setDecision]=useState(route.params.Decision)
    const [pic,setPic]=useState(null)
    const [picture1,setPicture1]=useState(route.params.Decision.Img1)
    const [picture2,setPicture2]=useState(route.params.Decision.Img2)
    const [answer1,setAnswer1]=useState(0)
    const [answer2,setAnswer2]=useState(0)






    const ChosenAnswer=(picked)=>{
        if(picked===1){
            setPic(picture1);
            setAnswer1(84/100);
            setAnswer2(16/100);
        }
        else{
            setPic(picture2);
            setAnswer1(34/100);
            setAnswer2(66/100);
        }
    }

    async function SendAnswer(){
        if(answer1===0 && answer2===0){console.log("please pick an answer")}
        else{
        let finale_answer=0;
        if(answer1>=0.51){finale_answer=1};
        let UD={
            "IndecisionID": decision.IndecisionID, 
            "UserInGroup_emailParticipant": route.params.User.Email,
            "UserInGroup_groupID": decision.Group_groupID,
            "Pic_num": finale_answer,
            "Percent_option1": answer1,
            "Percent_option2": answer2,
        }
        console.log(UD)
        fetch('https://proj.ruppin.ac.il/igroup21/proj/api/UserInIndecision/updateAnswer/',{
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
            navigation.navigate('Friends Decisions')
            alert("Thank you for the help")
        })
        .catch((error)=>console.log(error))
        .finally(()=>console.log('finished everything'))
    }
}



    return(
        <View style={styles.container}>
            <View style={styles.spaceH}></View>
            <Text style={styles.title}> {decision.User_email} need your aid</Text>
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
    
                        <Button title=" pick picture 1" onPress={()=>{ChosenAnswer(1)}} />
                        <View style={styles.space}></View><View style={styles.space}></View><View style={styles.space}></View>
                        <Button title=" pick picture 2" onPress={()=>{ChosenAnswer(2)}} />
                    </View>
                    <View style={styles.spaceH}></View>
                    <View style={styles.row}>
                        {pic && (<View style={styles.sqr1}><Text style={styles.title}>are you sure about your pick?</Text><Image source={{uri:pic}} style={styles.picture}/></View> )}
                    </View>
                </View>
                
<View style={styles.btn}>
        <TouchableOpacity onPress={()=>SendAnswer()}>
            <Icon color='#a0a0ff' size={100} style={{alignSelf:'center'}} name="send" />
        </TouchableOpacity>
</View>
                

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#00ffff'
    },
    picture:{
        width: 150,
        height: 180,
        alignSelf:'center'
    },
    sqr:{
        flex:1,
        height:200,
        backgroundColor:'#fe9',
        alignSelf:'center',
        justifyContent:'center',
    },
    sqr1:{
        height:220,
        backgroundColor:'#0f9',
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