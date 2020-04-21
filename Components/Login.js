import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Button,Image,TouchableOpacity,TextInput, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Icon } from 'react-native-material-ui';

export default function Login({navigation}){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [check,setCheck]=useState(true)
    const [user,setUser]=useState('')

   /* useEffect(() => { //this function only need to work once we set the "remember me" option
        (async () => {
            try{
                let value=await AsyncStorage.getItem('User');
                if(value!==null){
                    setUser(JSON.parse(value));
                    console.log("user is set")
                }
            }
            catch(error){
                console.log(error)
            }
        })(); 
      }, []);*/

      //stores the data in local storage
    const _storeData = async(u) => {
            try{
                await AsyncStorage.setItem('User',JSON.stringify(u));
                console.log("user save succsses");
            }
            catch(error){
                console.log(error);
            }
    }

    //send the email and password to the server and get a 'User' object as response
    const sendLogin=()=>{
        fetch('https://proj.ruppin.ac.il/igroup21/proj/api/User/signIn/'+email+'/'+password,{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res!==null){
                console.log(res);
                _storeData(res);//stores the user object in local storage
                alert("welcome "+res.First_name+" "+res.Last_name+" enjoy your stay");
                navigation.navigate('Home');
            }
            else{alert("wrong user name or password")}
        })
        .catch((error)=>console.log(error))
        .finally(()=>console.log('finished everything'))
    }

    return(<View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.title}>Login</Text>
                        <View style={styles.space}></View>
                        <View style={styles.space}></View>
                        <View style={styles.space}></View>
                    <Text style={styles.title1}>Email</Text>
                            <TextInput style={styles.input} onChangeText={text=>setEmail(text)} value={email} placeholder="email" />
                        <View style={styles.space}></View>
                        <View style={styles.space}></View>
                        <View style={styles.space}></View>
                    <Text style={styles.title1}>Password</Text>
                            <TextInput style={styles.input} onChangeText={text=>setPassword(text)} value={password} placeholder='password' />
                            <View style={styles.space}></View>
                            <CheckBox containerStyle={styles.check} size={20} title='Remember me' checked={check} onPress={()=>setCheck(!check)} />
                            <View style={styles.space}></View>
                            <Button title='Login' color='#5af' onPress={()=>{sendLogin()}} />
                            <View style={styles.space}></View>
                </View>
            </View>
            
            <View style={styles.space}></View>

            <View style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.space}></View>

                    <TouchableOpacity style={{justifyContent:'center'}}>
                        <Text style={styles.link} onPress={()=>{console.log('password change')}}>forgot your password?</Text>
                    </TouchableOpacity>

                    <View style={styles.space}></View>
                    <View style={styles.space}></View>

                    <TouchableOpacity style={{justifyContent:'center'}}>
                        <Text style={styles.link1} onPress={()=>{navigation.navigate('SignUp')}}>Create new Account</Text>
                    </TouchableOpacity>

                    <View style={styles.space}></View>
                </View>
            </View>
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
        borderBottomWidth:0.2
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
        alignSelf:'center',
        alignContent:'center',
        borderBottomWidth:0.2,
    },
    space:{
        width:10,
        height:10
    },
    row:{
        flexDirection:'row',
        justifyContent:'center',
        height:50,
        alignContent:'center',
    },
})