import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Button } from 'react-native';
import { ActionButton,Card } from 'react-native-material-ui';
import { CheckBox } from 'react-native-elements';

export default function MyDecisions({navigation}){
    const[decisions,setDecisions]=useState(null)
    const[user,setUser]=useState(null);
//-------------------------------- step 1 --------------------------------//
// this is the init function in react 
// 1. we get the user from local storage 
// 2. the decisions of the user we get from DB

// 3. build of current decisions CARD is still in process

    useEffect(() => {
        (async () => {
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
                        console.log(res)
                        setDecisions(res)
                })
                    .catch((error)=>console.log(error))

                    setUser(JSON.parse(value));
                    console.log("user is set");
                }
            }
            catch(error){
                console.log(error)
            }
        })(); 
      }, []);




    return(
        <View>
            <Text>My Decisions</Text>
            <View style={styles.sqr2}>
                        <ScrollView>
                        {decisions&&decisions.map((item)=><View><Text key={item.IndecisionID}  
                         onPress={()=>console.log(item.IndecisionID)}>{item.Description_}</Text> 
                        </View>)}
                                </ScrollView>
                        </View>
            <Button onPress={()=>navigation.navigate('Home')} title="go back Home" />
        </View>
    )
}

const styles = StyleSheet.create({

})