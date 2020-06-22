import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Image } from 'react-native';
import { ActionButton,Card,Button,Icon } from 'react-native-material-ui';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Header(){

const [user,setUser]=useState('')
// just a header still need to learn how to get the user and show it if we want
  useEffect(() => {
    (async () => {
      try{
        let value=await AsyncStorage.getItem('User');
        if(value!==null){
          setUser(value);
        }
    }
    catch(error){
        console.log(error)
    }
    });
  }, []);

    return(
      <SafeAreaView style={styles.container}>
        <View>
          <Image style={styles.picture} source={require('./Images/logo.png')} />
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor:'#fff',
      borderBottomWidth:0.5,
      borderBottomColor:'black',
      justifyContent:'center'
    },
    picture:{
      alignSelf:'center',
    },
    card:{
      borderRadius:6,
      elevation:3,
      backgroundColor:'#fff',
      shadowOffset:{width:1,height:1},
      shadowColor:'#000',
      shadowOpacity:0.3,
      shadowRadius:2,
      marginHorizontal:4,
      marginVertical:6,
  },
    row:{
      flexDirection:'row',
      flex:1,
      
    },
    title:{
      fontSize:40,
      borderBottomWidth:1,
      borderBottomColor:'#fbd55a',
      justifyContent:'center',
      color:'#fbd55a',
  },
  space:{
    width:10
  },
  space1:{
    height:10
  },
  });