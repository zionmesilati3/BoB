import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Button } from 'react-native';
import { ActionButton,Card } from 'react-native-material-ui';
import { CheckBox } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function FriendsDecisions({navigation}){
    const[friendsDec,setFriendsDec]=useState(null)
    const[user,setUser]=useState(null);
//-------------------------------- step 1 --------------------------------//
// this is the init function in react 
// 1. we get the user from local storage 
// 2. the decisions of the user we get from DB

// 3. build of current decisions CARD is still in process
var list=[];

useEffect(()=>{
    const reScreen = navigation.addListener('focus',()=>{
      getData();
      console.log("event listener in FD")
    });
    return reScreen;
  },[]);

async function getData(){
            try{
                let value=await AsyncStorage.getItem('User');
                if(value!==null){
                    fetch('https://proj.ruppin.ac.il/igroup21/proj/api/Indecision/getFriendIndecisionByUserPart/' +JSON.parse(value).Email+'/0/' ,{
                        method:'GET',
                        headers:{
                            Accept:'application/json','Content-Type':'application/json',
                        },
                    })
                    .then((response)=>response.json())
                    .then((res)=>{
                        if(res){
                            list=[];
                            res.map((dec)=>{
                                if(dec.Percent_option1===0 && dec.Percent_option2===0){
                                    list.push(dec);
                                }
                            })
                        }
                        setFriendsDec(list)
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


      function nav(dec){
        navigation.navigate('Single Decision',{Decision:dec,User:user})
      }


    return(
        <View style={styles.container}>
            <Text style={styles.title}>Friends Decisions</Text>
            <View style={styles.spaceH}></View>
            <ScrollView>
            <View style={styles.container}>
                        {friendsDec&&friendsDec.map((item)=><View style={styles.sqr} key={item.IndecisionID}><View style={styles.spaceH}></View>
                            <Text style={styles.title1}> {item.Description_}</Text>
                            <View style={styles.spaceH}></View>
                            <View style={styles.row}>
                                <Button style={styles.btnL} onPress={()=>nav(item)} title='Help your Friend Decision'></Button>
                            </View>
                            <View style={styles.spaceH}></View>
                        </View>)}
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
            borderRadius:6,
            elevation:3,
            backgroundColor:'#fff',
            shadowOffset:{width:1,height:1},
            shadowColor:'#000',
            shadowOpacity:0.3,
            shadowRadius:1,
            marginHorizontal:3,
            marginVertical:4,
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