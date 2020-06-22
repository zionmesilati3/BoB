import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Image,Button,FlatList,TouchableOpacity,useWindowDimensions } from 'react-native';
import { ActionButton,Card,Icon } from 'react-native-material-ui';

export default function Decisions({route,navigation}){
// single decision page still need alot of work
    
    const [decision,setDecision]=useState(route.params.Decision)
    const [picture1,setPicture1]=useState(route.params.Decision.Img1)
    const [picture2,setPicture2]=useState(route.params.Decision.Img2)
    const [value,setValue]=useState('');
    const [winner,setWinner]=useState('');
    useEffect(()=>{
        if(route.params.Decision.CurrectAnswerPercent>0.5){
            setWinner("Image 2");
            setValue(route.params.Decision.CurrectAnswerPercent*100)
        }
        else if(route.params.Decision.CurrectAnswerPercent<0.5){
            setWinner("Image 1");
            setValue((1-route.params.Decision.CurrectAnswerPercent)*100)
        }
        else{
            setWinner("No leading Image so far");
        }
    },[])

    return(
        <View style={styles.container}>
            <Text style={styles.title}> {decision.Description_}</Text>
            <View style={styles.container}>
                <View style={styles.row}>
                <View style={styles.space}></View>
                <View style={styles.colum}>
                    
                    <View style={styles.space}></View>
                    <Text style={styles.title}>Image 1</Text>
                        <View style={styles.sqr}>
                            <Image
                            style={styles.picture}
                            source={{uri: picture1}}
                            />
                        </View>
                    </View>
                    <View style={styles.space}></View>
                    <View style={styles.colum}>
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
                <View style={styles.space}></View>
                </View>

                <View style={styles.sqr1}>
                    <Text style={styles.title1}>{winner} is leading by {value}% </Text>
                    {winner==="Image 1"&&<Image
                            style={styles.picture1}
                            source={{uri: picture1}}
                    />||winner==="Image 2"&&<Image
                    style={styles.picture1}
                    source={{uri: picture2}}
            />}
                    
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
    },
    picture:{
        width: 160,
        flex:1,
        alignSelf:'center',
        resizeMode:'contain'
    },
    picture1:{
        width: 220,
        flex:1,
        alignSelf:'center',
        resizeMode:'contain'
    },
    sqr:{
        height:180,
        backgroundColor:'#fafafa',
        alignSelf:'center',
        justifyContent:'center',
        padding:10,
        margin:10,
        marginRight:10,
        marginLeft:10,
        borderWidth:0.5
    },
    sqr1:{
        flex:1,
        backgroundColor:'#fafafa',
        alignSelf:'center',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        alignContent:'flex-start',
        padding:10,
        margin:10,
        marginRight:10,
        marginLeft:10,
        borderWidth:0.5
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
    },
    title1:{
        fontSize:14,
        alignSelf:'center'
    },
  });