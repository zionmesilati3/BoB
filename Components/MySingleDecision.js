import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Image,Button,FlatList,TouchableOpacity,useWindowDimensions } from 'react-native';
import { ActionButton,Card,Icon } from 'react-native-material-ui';

export default function Decisions({route,navigation}){
// single decision page still need alot of work
    
    const [decision,setDecision]=useState(route.params.Decision)
    const [picture1,setPicture1]=useState(route.params.Decision.Img1)
    const [picture2,setPicture2]=useState(route.params.Decision.Img2)

    return(
        <View style={styles.container}>
            <Text style={styles.title}> {decision.Description_}</Text>
            <View style={styles.container}>
                <View style={styles.colum}>
                    <View style={styles.space}></View>
                    <Text style={styles.title}>Image 1</Text>
                        <View style={styles.sqr}>
                            <Image
                            style={styles.picture}
                            source={{uri: picture1}}
                            />
                        </View>
                        <View style={styles.space}></View>
                        <Text style={styles.title}>Image 2</Text>
                        <View style={styles.sqr}>
                            <Image
                            style={styles.picture}
                            source={{uri: picture2}}
                            />
                        </View>
                        <View style={styles.space}></View>
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
        width: 260,
        height: 180,
        alignSelf:'center',
        resizeMode:'contain'
    },
    sqr:{
        flex:1,
        height:190,
        backgroundColor:'#aecfe7',
        alignSelf:'center',
        justifyContent:'center',
        padding:10,
        margin:10,
        borderWidth:2
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
        width:20,
        height:10
    },
    title:{
        fontSize:20,
        alignSelf:'center'
    }

  });