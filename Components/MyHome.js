import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Button,Image,TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-material-ui';

export default function MyHome({navigation}){
    const [user,setUser]= useState(0);
    /**  **/
// noting much here its just a home page that can navigate to other screens
    const MoveTo=(name)=>{
        navigation.navigate(name);
      }


/**
 * 
 * 
            <View style={styles.row}>
            <Text style={styles.space}></Text>
            <Button  title="Move to GL" onPress={()=>MoveTo('GroupList')} />
            <Text style={styles.space}></Text>
            <Button  title="Move to Dec" onPress={()=>MoveTo('Decision')} />
            <Text style={styles.space}></Text>
            <Button  title="Move to Not" onPress={()=>MoveTo('Notifications')} />
            <Text style={styles.space}></Text>
            </View>

 */


    return(
        <View style={styles.container}>
        <ScrollView>
            
            <View style={styles.container}>
            <View style={styles.spaceH}></View>

                <View style={styles.colum}>
                    <View style={styles.row1}>
                    <View style={styles.spaceW}></View>
                        <View style={styles.sqr}>
                            <TouchableOpacity onPress={()=>{MoveTo('My Decisions')}}>
                                <Icon color='#787' size={180} style={{alignSelf:'center',justifyContent:'center',}} name="live-help" />
                            </TouchableOpacity>
                        </View>
                            <View style={styles.spaceW}></View>
                        <View style={styles.sqr1}>
                            <TouchableOpacity onPress={()=>{MoveTo('Create Group')}}>
                                <Icon color='#787' size={180} style={{alignSelf:'center',justifyContent:'center',}} name="group" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.spaceW}></View>
                    </View>
                </View>

                    <View style={styles.spaceH}></View>
                    
                <View style={styles.colum}>
                    <View style={styles.row1}>
                    <View style={styles.spaceW}></View>
                        <View style={styles.sqr1}>
                            <TouchableOpacity onPress={()=>{MoveTo('My Decisions')}}>
                                <Icon color='#787' size={180} style={{alignSelf:'center',justifyContent:'center',}} name="rate-review" />
                            </TouchableOpacity>
                        </View>
                            <View style={styles.spaceW}></View>
                        <View style={styles.sqr}>
                            <TouchableOpacity onPress={()=>{console.log('sent!')}}>
                                <Icon color='#787' size={180} style={{alignSelf:'center',justifyContent:'center',}} name="settings" />
                            </TouchableOpacity>    
                        </View>
                        <View style={styles.spaceW}></View>
                    </View>
                </View>
                    
                    <View style={styles.spaceH}></View>

                <View style={styles.colum}>
                    <View style={styles.row1}>
                    <View style={styles.spaceW}></View>
                        <View style={styles.sqr}>
                            <TouchableOpacity onPress={()=>{console.log('sent!')}}>
                                <Icon color='#787' size={180} style={{alignSelf:'center',justifyContent:'center',}} name="settings" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.spaceW}></View>
                        <View style={styles.sqr1}>
                            <TouchableOpacity onPress={()=>{console.log('sent!')}}>
                                <Icon color='#787' size={180} style={{alignSelf:'center',justifyContent:'center',}} name="settings" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.spaceW}></View>
                    </View>
                </View>

                <View style={styles.spaceH}></View>

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
        flex:1,
        height:200,
        backgroundColor:'#fe9',
        alignSelf:'stretch',
        overflow:'hidden',
    },
    sqr1:{
        flex:1,
        height:200,
        backgroundColor:'#0f9',
        alignSelf:'stretch',
        overflow:'hidden',
    },
    colum:{
        flex:1,
        alignContent:'stretch'
    },
    row: {
        flexDirection: 'row',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    row1: {
        flexDirection: 'row',
        flex:1,
        alignContent:'center',
        alignItems:'flex-start',
        alignSelf:'center'
    },
    btn:{
        flex:1,
    },
    spaceW:{
        width:5
    },
    spaceH:{
        height:5
    },
  });