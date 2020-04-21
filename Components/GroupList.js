import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Button,TouchableOpacity } from 'react-native';
import { ActionButton,Card,Icon} from 'react-native-material-ui';

export default function GroupList({navigation}){

    const[del,setDel]=useState(false);
    const[glist,setGlist]=useState([]);

    useEffect(()=>{
        const reScreen = navigation.addListener('focus',()=>{
          getData();
          console.log("event listener")
        });
        return reScreen;
      },[]);

      useEffect(()=>{
          console.log("first effect")
          getData();
      },[]);
    
        async function getData(){
            try{
                let value=await AsyncStorage.getItem('groupList');
                if(value!==null){
                    setGlist(JSON.parse(value));
                    console.log(value)
                }
            }
            catch(error){
                console.log(error)
            }
        }

        const delGroup=(g)=>{
            console.log(g.name)
        }

        const delFromGroup=(g,f)=>{
            console.log(g.name)
            console.log(f.name)
        }

    return(
        <View style={styles.container}>
            <Text>Group List</Text>
            <ScrollView>
                <View style={styles.container1}>
                    {glist.map((g,key)=>glist && <View style={styles.group} key={key}><Card>
                        <Text style={styles.title}>Group name: {g.name}</Text>
                            {(del && <TouchableOpacity onPress={()=>{delGroup(g)}}>
                                                <Icon color='#a0a0ff' size={30} style={{alignSelf:'flex-end'}} name="delete" />
                            </TouchableOpacity>)}
                            </Card>
                            
                                <View style={styles.friends}><Card>
                                <Text>participants:</Text>
                                    {g.friends.map((f,key)=><View key={key}>
                                            <Text>{" "+f.name+" - "+(f.phoneNumbers && f.phoneNumbers[0].number)}</Text>
                                        {(del && <TouchableOpacity onPress={()=>{delFromGroup(g,f)}}>
                                                <Icon color='#a0a0ff' size={30} style={{alignSelf:'flex-end'}} name="delete" />
                                        </TouchableOpacity>)}
                                    </View>)}
                                    </Card>
                                </View>
                        </View>)}
                </View>
            </ScrollView>
            <ActionButton style={{container:{backgroundColor:'#3838c7'}}} icon="delete" onPress={()=>setDel(!del)} />
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      flex:1,
      alignContent:'center',
      alignItems:'flex-start',
      alignSelf:'center'
    },
    container:{
        flex:1,
        backgroundColor:'#5af'
    },
    container1:{
        flex:1,
        alignItems:'center',
        alignContent:'center',
    },
    group:{
        backgroundColor:'#5af',
        flex:1,
        alignSelf:'stretch',
        alignContent:'center',
        alignItems:'center',
    },
    friends:{
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
    spaceW:{
        width:10
    },
    spaceH:{
        height:5
    },
  });