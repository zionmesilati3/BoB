import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Button,Image,TouchableOpacity,TextInput, Alert,Animated } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Icon } from 'react-native-material-ui';

export default function Login({navigation}){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [check,setCheck]=useState(true)
    const [user,setUser]=useState('')
    const fade=new Animated.Value(0);


    useEffect(()=>{
        Animated.timing(fade,{
            toValue:1,
            duration:1000
        }).start();
    },[])

    const getCategories=async(u)=>{
        await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/algoUser_Category',{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>{
            console.log("res from categories",res)
            if(res!==null){
                let str='';
                let arr=[];
                res.map((c)=>{
                    if(email===c.User_email){
                        console.log("user from categories",c.User_email);
                        str+=c.Category_name+' ';
                        arr.push("categories from categories",c.Category_name);
                    }
                })
                console.log("arr from categories",arr)
                beforeEND(u,arr,str);
            }
            else{alert("none found")}
        })
        .catch((error)=>console.log(error))
        .finally(()=>console.log('finished everything'))
    }


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



    const beforeEND=async(use,likedArr,liked)=>{
        console.log("user liked array and string of liked in before end",use,likedArr,liked)
        await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/algoSimilarity_paired',{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((catList)=>{
            let maxMone = 1; //mone
            let mehaneCounter = 0; //mehane
            let suggest="";
            let finalVal=0;
            if(catList!==null){
                catList.map((c)=>{
                    likedArr.map((l)=>{
                        if(c.Category_name===l){
                            if(maxMone<c.Pair_counter){
                                maxMone=c.Pair_counter;
                                suggest=c.Category_paired;
                            }
                        }
                    })
                    mehaneCounter++;
                })
                if(suggest===""||likedArr.includes(suggest)){
                    let randPair=catList[Math.floor(Math.random()*catList.length)].Category_paired;// just adds a random pair insted of the non usable 1...
                    suggest=randPair;
                }
                maxMone=maxMone*10;
                mehaneCounter=mehaneCounter*10;
                finalVal=(maxMone/mehaneCounter);
                end(use,finalVal,liked,suggest);
            }
        })
        .catch((error)=>console.log(error))
        .finally(()=>console.log('finished everything'))
    }


    const end=(res,value,liked,suggest)=>{
        let c='';
        if(suggest==='Movies'){
            c='https://s3-us-west-2.amazonaws.com/flx-editorial-wordpress/wp-content/uploads/2018/08/29143522/RT_200EssentialMovies_731X200.jpg';
        }
        else if(suggest==='Gym'){
            c='https://cdn.groo.co.il/_media/media/13132/160983.jpg';
        }
        else if(suggest==='Art'){
            c='https://cdn.theculturetrip.com/wp-content/uploads/2019/05/d17jx0.jpg';
        }
        else if(suggest==='Food'){
            c='https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg';
        }
        else if(suggest==='Games'){
            c='https://i.ytimg.com/vi/9k6VBjN0hD0/maxresdefault.jpg';
        }
        else if(suggest==='Shopping'){
            c='https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Ifc_Zara_20071110.jpg/1200px-Ifc_Zara_20071110.jpg';
        }
        else{
            c='https://www.milagrostravel.com/Asset/img/backgrounds/default-k.jpg';
        }
        navigation.navigate('Commercial',{Com:c,User:res,ComName:suggest})
        //navigation.navigate('Home');
    }




    //send the email and password to the server and get a 'User' object as response
    const sendLogin=async()=>{
        await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/User/signIn/'+email+'/'+password+'/',{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res!==null){
                console.log("from login send",res);
                _storeData(res);//stores the user object in local storage
                getCategories(res);
            }
            else{alert("wrong user name or password")}
        })
        .catch((error)=>console.log(error))
        .finally(()=>console.log('finished everything'))
    }

    return(<View style={styles.container}>
            <Animated.View style={[styles.card,{opacity:fade}]}>
                <View style={styles.cardContent}>
                    <Text style={styles.title}>Login</Text>
                        <View style={styles.space}></View>
                        <View style={styles.space}></View>
                        <View style={styles.space}></View>
                    <Text style={styles.title1}>Email</Text>
                            <TextInput keyboardType='email-address' style={styles.input} onChangeText={text=>setEmail(text)} value={email} placeholder="email" />
                        <View style={styles.space}></View>
                        <View style={styles.space}></View>
                        <View style={styles.space}></View>
                    <Text style={styles.title1}>Password</Text>
                            <TextInput secureTextEntry={true} style={styles.input} onChangeText={text=>setPassword(text)} value={password} placeholder='password' />
                            <View style={styles.space}></View>
                            <CheckBox containerStyle={styles.check} size={20} title='Remember me' checked={check} onPress={()=>setCheck(!check)} />
                            <View style={styles.space}></View>
                            <Button title='Login' color='#5af' onPress={()=>{sendLogin()}} />
                            <View style={styles.space}></View>
                </View>
            </Animated.View>
            
            <View style={styles.space}></View>

            <Animated.View style={[styles.card,{opacity:fade}]}>
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
            </Animated.View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
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
        backgroundColor:'#fdfdfd',
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