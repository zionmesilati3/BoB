import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Button,TouchableOpacity, ActivityIndicator } from 'react-native';
import { ActionButton,Card,Icon} from 'react-native-material-ui';

export default function GroupList({navigation}){

    const[del,setDel]=useState(false);
    const[glist,setGlist]=useState(null);
    const[user,setUser]=useState(null);
    var GL=[];
    
    useEffect(()=>{
        const reScreen = navigation.addListener('focus',()=>{
          getData();
          console.log("event listener")
        });
        return reScreen;
      },);

    
      async function getData(){
        try{
            let value=await AsyncStorage.getItem('User');
            if(value!==null){
                setUser(JSON.parse(value));
                getGroupsFromDB(JSON.parse(value));
                console.log("get data")
            }
        }
        catch(error){
            console.log(error)
        }
    }

    const getGroupsFromDB=async(u)=>{
        try{
        await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/Group/'+u.Email+'/',{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>{
            let GroupL=[];
            if(res!==null){
                res.map((g)=>{
                    let GROUP={
                        ...g,
                        "Users":[],
                    }
                    GroupL.push(GROUP);
                })
                setGlist(GroupL);
            }
        })
        .catch((error)=>console.log(error))
    }
    catch(error){
        throw error;
    }
    }


    const getGroupUsers=async(g)=>{
        try{
                await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/UserInGroup/Users/'+g.Group_ID+'/',{
                method:'GET',
                headers:{
                    Accept:'application/json','Content-Type':'application/json',
                },
                })
                .then((response)=>response.json())
                .then((res)=>{
                    if(res!==null){
                        GL=glist;
                        GL.map((gr)=>{
                            if(gr.Group_ID===g.Group_ID){
                                gr.Users=res;
                                console.log(gr);
                            }
                            else{
                                gr.Users=[];
                                
                            }
                        })
                        
                }
                })
                .catch((error)=>console.log(error))
                setGlist(GL);
    }
    catch(error){
        throw error;
    }
    }


    return(
        <View style={styles.container}>
            <Text style={styles.title1} onPress={()=>console.log(glist)}>Groups</Text>
            <ScrollView>
                <View style={styles.container1}>
                    {glist && glist.map((g,key)=>(g.Group_name!==''&&<View style={styles.group} key={key}>
                    <TouchableOpacity onPress={()=>getGroupUsers(g)}><Text style={styles.title}>{g.Group_name}</Text></TouchableOpacity>
                        {g.Users&&<Text style={styles.subtitle}>{g.Users.map((u)=>
                            u.User_email+"\n"
                        )}</Text>}
                            {del&&<TouchableOpacity onPress={()=>{console.log(g)}}>
                                                <Icon color='#a0a0ff' size={30} style={{alignSelf:'flex-end'}} name="delete" />
                            </TouchableOpacity>}
                        </View>))}{!glist&&<ActivityIndicator animating={true} color='#bc2b78' size='large' />}
                </View>
            </ScrollView>
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
    title:{
        fontSize:20,
        alignSelf:'center',
        alignContent:'center',
        margin:5,
    },
    subtitle:{
        fontSize:14,
        alignSelf:'flex-start',
        alignContent:'center',
        margin:5,
    },
    title1:{
        fontSize:24,
        alignSelf:'center',
        alignContent:'center',
        margin:5,
        borderBottomWidth:0.2,
    },
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    container1:{
        flex:1,
        alignItems:'center',
        alignContent:'center',
    },
    group:{
        alignSelf:'stretch',
        alignItems:'center',
        alignContent:'center',
        borderRadius:6,
        elevation:3,
        backgroundColor:'#fafafa',
        shadowOffset:{width:1,height:1},
        shadowColor:'#000',
        shadowOpacity:0.3,
        shadowRadius:2,
        marginHorizontal:4,
        marginVertical:6,
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