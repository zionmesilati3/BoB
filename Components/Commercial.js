import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Button,Image,TouchableOpacity} from 'react-native';
import { Video } from 'expo-av';

export default function Commercial({route,navigation}){
    const value=route.params.Calc;






    return(
        <View style={styles.container}>
            <View style={styles.sqr}>
                <Text>{route.params.ComName} commercial</Text>
                <Image
                        style={styles.picture}
                        source={{uri: route.params.Com}}
                />
                <Button title='Skip' color='#5af' onPress={()=>{navigation.navigate('Home')}} />
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
        marginTop:10,
        marginBottom:10,
        marginLeft:10,
        marginRight:10,
        padding:20,
        borderRadius:6,
        elevation:3,
        backgroundColor:'#fcfcfc',
        shadowOffset:{width:1,height:1},
        shadowColor:'#000',
        shadowOpacity:0.3,
        shadowRadius:1,
        marginHorizontal:3,
        marginVertical:4,
        alignSelf:'stretch',
        alignItems:'center',
    },
    picture:{
        width: 350,
        flex:1,
        alignSelf:'center',
        resizeMode:'contain'
    },
  });