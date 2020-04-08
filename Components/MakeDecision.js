import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Button,Image,FlatList} from 'react-native';
import { ActionButton,Card } from 'react-native-material-ui';
import { CheckBox } from 'react-native-elements';

export default function MakeDecision({navigation}){
    const [friends,setFriends]=useState([
        {key: 'Devin',checked:false,group:'Friends'},
        {key: 'Dan',checked:true,group:'Family'},
        {key: 'Dominic',checked:false,group:'Family'},
        {key: 'Jackson',checked:false,group:'Friends'},
        {key: 'James',checked:false,group:'Work'},
        {key: 'Joel',checked:false,group:'Work'},
        {key: 'John',checked:false,group:'Close Friends'},
        {key: 'Jillian',checked:false,group:'Study Group'},
        {key: 'Jimmy',checked:false,group:'Close Family'},
        {key: 'Mom',checked:false,group:'Close Family'},
        {key: 'Dad',checked:false,group:'Close Family'},
        {key: 'Julie',checked:false,group:'Study Group'},
    ]);
    const [groups,setGroups]=useState([
        {key: 'Friends',checked:false},
        {key: 'Family',checked:true},
        {key: 'Work',checked:false},
        {key: 'Close Friends',checked:true},
        {key: 'Close Family',checked:false},
        {key: 'Study Group',checked:false},
    ]);

    let Flist=[];
    let Glist=[];

    const FChange=(item)=>{
        Flist=[];
        console.log(item.key)
        friends.map((i)=>{
            if(i===item){
               if(i.checked===false){i.checked=true,console.log('changed to true')}
               else {i.checked=false,console.log('changed to false')} 
            }
            Flist.push(i)
        })
        setFriends(Flist);
    }
    const GChange=(item)=>{
        Glist=[];
        console.log(item.key)
        groups.map((i)=>{
            if(i===item){
               if(i.checked===false){i.checked=true,console.log('changed to true')}
               else {i.checked=false,console.log('changed to false')} 
            }
            Glist.push(i);
        })
        setGroups(Glist);
    }
    return(
        <View style={styles.container}>
            <Text>Decision</Text>
            <View style={styles.container}>


                <View style={styles.colum}>
                    <View style={styles.row1}>
                    <View style={styles.space}></View>
                        <View style={styles.sqr1}><Image
                            style={{width: 150, height: 230,alignSelf:'center'}}
                            source={{uri: 'https://my-test-11.slatic.net/p/fa4c59e5a0d08f18571329e03c0e2377.jpg'}}
                            />
                        </View>
                        <View style={styles.space}></View>
                        <View style={styles.sqr}><Image
                            style={{width: 150, height: 230,alignSelf:'center'}}
                            source={{uri: 'https://i5.walmartimages.com/asr/b69a1eb2-8a32-4758-be09-8f1a2e186314_1.a6a746b980d98eda585803edcd7922df.jpeg'}}
                            />
                        </View>
                        <View style={styles.space}></View>
                    </View>
                    
                    <View style={styles.row}>
                        <Button title="upload picture 1" />
                        <View style={styles.space}></View><View style={styles.space}></View>
                        <Button title="upload picture 2" />
                    </View>
                </View>
<Text></Text>
                <View style={styles.colum}>
                    <View style={styles.row1}>
                        <View style={styles.space}></View>
                        <View style={styles.sqr}>
                        <ScrollView>
                        {groups.map((item)=><CheckBox key={item.key} title={item.key} checked={item.checked} onPress={()=>GChange(item)} checkedIcon='dot-circle-o'
  uncheckedIcon='circle-o' />)}
                                </ScrollView>
                        </View>

                        <View style={styles.space}></View>
                            <View style={styles.sqr1}>
                                <ScrollView>
                                    
                                            {groups.map((item)=>item.checked && <View key={item.key}><Text>{item.key}</Text>
                                            {friends.map((i)=>(i.group===item.key)&& <CheckBox key={i.key} title={i.key} checked={i.checked} onPress={()=>FChange(i)} checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o' />)}
                                        </View>)}
                                    
                                </ScrollView>
                            </View>
                        <View style={styles.space}></View>
                    </View>
                    <Button title="make decision"/>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    sqr:{
        flex:1,
        height:250,
        backgroundColor:'#fe9',
        alignSelf:'stretch',
        justifyContent:'center',
    },
    sqr1:{
        flex:1,
        height:250,
        backgroundColor:'#0f9',
        alignSelf:'stretch',
        justifyContent:'center',
    },
    colum:{
        flex:1,
        alignContent:'stretch'
    },
    row: {
        flex:0.2,
        flexDirection: 'row',
        alignContent:'center',
        justifyContent:'center',
        alignItems:'flex-start',
        alignSelf:'stretch'
    },
    row1: {
        flexDirection: 'row',
        flex:1,
        alignContent:'center',
        alignItems:'flex-start',
        alignSelf:'stretch'
    },
    btn:{
        flex:1,
    },
    space:{
        width:20
    },
  });