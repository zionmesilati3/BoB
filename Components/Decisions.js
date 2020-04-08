import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Image,Button,FlatList,TouchableOpacity,useWindowDimensions } from 'react-native';
import { ActionButton,Card,Icon } from 'react-native-material-ui';

export default function Decisions({navigation}){

    const window=useWindowDimensions();

    const [pic,setPic]=useState(null)
    const [picture1,setPicture1]=useState('https://my-test-11.slatic.net/p/fa4c59e5a0d08f18571329e03c0e2377.jpg')
    const [picture2,setPicture2]=useState('https://i5.walmartimages.com/asr/b69a1eb2-8a32-4758-be09-8f1a2e186314_1.a6a746b980d98eda585803edcd7922df.jpeg')

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Help with User Decision on Clothes</Text>

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
    
                        <Button title=" pick picture 1" onPress={()=>{setPic(picture1)}} />
                        <View style={styles.space}></View><View style={styles.space}></View><View style={styles.space}></View>
                        <Button title=" pick picture 2" onPress={()=>{setPic(picture2)}} />
                    </View>
                    <View style={styles.row}>
                        {pic && (<View style={styles.sqr1}><Text style={styles.title}>are you sure about your pick?</Text><Image source={{uri:pic}} style={styles.picture}/></View> )}
                    </View>
                </View>
                
<View style={styles.btn}>
        <TouchableOpacity onPress={()=>{console.log('sent!')}}>
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
    }

  });