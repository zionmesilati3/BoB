import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Button,Image,TouchableOpacity,TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Icon } from 'react-native-material-ui';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function SignUp({navigation}){

    const [user,setUser]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [country,setCountry]=useState('')
    const [birthday,setBirthday]=useState(new Date()-315655555555)
    const [show,setShow]=useState(false)    



    const onChange=(event,selectedDate)=>{
        const currentDate=selectedDate||birthday;
        setShow(false);
        setBirthday(currentDate);
    }

    const sendLogin=()=>{
        fetch('https://reactnative.dev/movies.json')
        .then((response)=>response.json())
        .then((json)=>{console.log(json),console.log('json up here\n')})
        .catch((error)=>console.log(error))
        .finally(()=>console.log('finished everything'))
    }

    return(<View style={styles.container}>
        <ScrollView>
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.title}>Create new account</Text>
                        <View style={styles.space}></View>
                        <View style={styles.space}></View>

                            <Text style={styles.title1}>User Name</Text>
                            <TextInput style={styles.input} onChangeText={text=>setUser(text)} value={user} placeholder=" User name" />

                            <View style={styles.space}></View>

                            <Text style={styles.title1}>Email</Text>
                            <TextInput style={styles.input} onChangeText={text=>setEmail(text)} value={email} placeholder=" Email" />

                            <View style={styles.space}></View>

                            <Text style={styles.title1}>Password</Text>
                            <TextInput style={styles.input} onChangeText={text=>setPassword(text)} value={password} placeholder=" Password" />

                            <View style={styles.space}></View>

                            <Text style={styles.title1}>Country</Text>
                            <TextInput style={styles.input} onChangeText={text=>setCountry(text)} value={country} placeholder=" Country" />

                            <View style={styles.space}></View>

                            <Text style={styles.title1}>Birthday</Text>
                    <TouchableOpacity onPress={()=>{setShow(true)}}>
                        <View style={styles.row}>
                            <Icon color='#55f' size={15} style={{justifyContent:'center'}} name="date-range" />
                            <View style={styles.space1}></View>
                            <Text style={styles.date}>{true && moment.utc(birthday).format('DD/MM/YYYY')}</Text>
                        </View>
                    </TouchableOpacity>
                             {show && (<DateTimePicker
                                testID="dateTimePicker"
                                timeZoneOffsetInMinutes={0}
                                value={birthday}
                                mode='date'
                                is24Hour
                                display='default'
                                onChange={onChange}
                                style={{flex:1}}
                                maximumDate={new Date()}
                                />)}
<View style={styles.space}></View>
<View style={styles.space}></View>
<Button title='Register' onPress={()=>console.log('register account')} />
                </View>
            </View>
            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#5af',
    },
    check:{
        backgroundColor:'#fff',
        borderWidth:0
    },
    date:{
        color:'#5af',
        alignSelf:'center',
        justifyContent:'center',
    },
    link:{
        color:'#5af',
        alignSelf:'center'
    },
    link1:{
        color:'#5af',
        alignSelf:'center'
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
    input:{
        borderWidth:0.5
    },
    cardContent:{
        marginVertical:10,
        marginHorizontal:18,
    },
    title:{
        fontSize:20,
        alignSelf:'center',
        alignContent:'center',
        borderBottomWidth:0.6
    },
    title1:{
        fontSize:16,
        alignSelf:'flex-start',
        alignContent:'center',
    },
    space:{
        width:10,
        height:10
    },
    space1:{
        width:5,
        height:5
    },
    row:{
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
})