import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Button,Image,TouchableOpacity,TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Icon } from 'react-native-material-ui';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function SignUp({navigation}){

    const [first,setFirst]=useState('')
    const [last,setLast]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [phone,setPhone]=useState('')
    const [birthday,setBirthday]=useState(new Date())
    const [show,setShow]=useState(false)    
    const [categoryArr,setCategoryArr]=useState([
        {name:"Art",checked:false},
        {name:"Food",checked:false},
        {name:"Games",checked:false},
        {name:"Gym",checked:false},
        {name:"Movies",checked:false},
        {name:"Shopping",checked:false},
        {name:"Travel",checked:false}
    ])
    const [fcategory,setFCategory]=useState('');
    const [scategory,setSCategory]=useState('');
    const [stage,setStage]=useState(true);

    const saveCategory=(category)=>{
        let arr=[];
        let first=fcategory;
        let second=scategory;
        categoryArr.map((c)=>{
            if(c.name===category){
                if(stage){
                    setFCategory(c.name)
                    first=c.name
                    setStage(!stage)
                }
                else {
                    setSCategory(c.name)
                    second=c.name
                    setStage(!stage)
                }
            }
            c.checked=false;
            arr.push(c);
        })
        arr.map((c)=>{
            if(c.name===first || c.name===second){
                c.checked=true;
            }
        })
        setCategoryArr(arr);
    }


// this is a function for the date only 
// its main useage is when to show the date and also save the date

    const onChange=(event,selectedDate)=>{
        const currentDate=selectedDate||birthday;
        setShow(false);
        setBirthday(currentDate);
    }

    const sendCategoriesPUT=(categories)=>{
        console.log("categories",categories)
        fetch('https://proj.ruppin.ac.il/igroup21/proj/api/Category/Update/Category',{
                method:'PUT',
                headers:{
                    Accept:'application/json','Content-Type':'application/json',
                },
                body:JSON.stringify(categories),
            })
            .then((response)=>response.json())
            .then((data)=>{
                console.log("put succses")
            })
            .catch((error)=>console.log(error))
            .finally(()=>console.log('finished everything'))
    }

    const sendCategoriesPOST=(user_cat)=>{
        console.log("user categories",user_cat)
        fetch('https://proj.ruppin.ac.il/igroup21/proj/api/algoUser_Category',{
                method:'POST',
                headers:{
                    Accept:'application/json','Content-Type':'application/json',
                },
                body:JSON.stringify(user_cat),
            })
            .then((response)=>{
                console.log("post succses")
            })
            .catch((error)=>console.log(error))
            .finally(()=>console.log('finished everything'))
    }


    const getCategories=()=>{
        let arr=[];
        arr.push(fcategory);
        arr.push(scategory);
        console.log(arr);
        fetch('https://proj.ruppin.ac.il/igroup21/proj/api/algoSimilarity_paired',{
                method:'GET',
                headers:{
                    Accept:'application/json','Content-Type':'application/json',
                },
            })
            .then((response)=>response.json())
            .then((data)=>{
                data.map((cat)=>{
                    if((cat.Category_name===fcategory && cat.Category_paired===scategory)||(cat.Category_name===scategory && cat.Category_paired===fcategory)){
                        let Category={
                            "Category_name":cat.Category_name,
                            "Category_paired":cat.Category_paired
                        }
                        let user_categories={
                            Category_name:cat.Category_name,
                            User_email:email
                        }
                        sendCategoriesPUT(Category);
                        sendCategoriesPOST(user_categories);
                }
                
            })
                })
            
            .catch((error)=>console.log(error))
            .finally(()=>navigation.navigate('Login'))
    }


// takes all the data the user wrote in the fields and send it to the server 
    const sendLogin=()=>{
        if(email && password && first && last && birthday && phone && fcategory && scategory){//fill the whole form?
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(reg.test(email)){//check if an email was entered
            let u={
                "Email":email,
                "Password":password,
                "First_name":first,
                "Last_name":last,
                "DateTime":birthday,
                "Phone":phone,
            }

            fetch('https://proj.ruppin.ac.il/igroup21/proj/api/User',{
                method:'POST',
                headers:{
                    Accept:'application/json','Content-Type':'application/json',
                },
                body:JSON.stringify(u)
            })
            .then(()=>{
                console.log("user signed up succses");
                getCategories();
        })
            .catch((error)=>console.log(error))
            .finally(()=>console.log('finished everything'))
        }
        else{
            alert("you havent entered a currect email address");
        }
        // here is the category section
    }
    else{
        alert("please fill all the details")
    }
}

    return(<View style={styles.container}>
        <ScrollView>
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.title}>Create new account</Text>
                        <View style={styles.space}></View>
                        <View style={styles.space}></View>

                            <Text style={styles.title1}>Email</Text>
                            <TextInput keyboardType='email-address' style={styles.input} onChangeText={text=>setEmail(text)} value={email} placeholder=" Email" />

                            <View style={styles.space}></View>

                            <Text style={styles.title1}>Password</Text>
                            <TextInput secureTextEntry={true} style={styles.input} onChangeText={text=>setPassword(text)} value={password} placeholder=" Password" />

                            <View style={styles.space}></View>

                            <Text style={styles.title1}>First name</Text>
                            <TextInput style={styles.input} onChangeText={text=>setFirst(text)} value={first} placeholder=" first name" />

                            <View style={styles.space}></View>

                            <Text style={styles.title1}>Last name</Text>
                            <TextInput style={styles.input} onChangeText={text=>setLast(text)} value={last} placeholder=" last name" />

                            <View style={styles.space}></View>

                            <Text style={styles.title1}>Phone number</Text>
                            <TextInput keyboardType='number-pad' style={styles.input} onChangeText={text=>setPhone(text)} value={phone} placeholder=" phone number" />

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
                                <Text style={styles.title1}>Pick 2 categories</Text>
                                <View style={styles.sqr}>
                                {categoryArr&&categoryArr.map((c)=><CheckBox key={c.name} title={c.name} checked={c.checked} 
                                    onPress={()=>saveCategory(c.name)} size={10} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' />)}
                                </View>
<View style={styles.space}></View>
<View style={styles.space}></View>
<Button title='Register' onPress={()=>sendLogin()} />
<View style={styles.space}></View>
<Button title='Go back' onPress={()=>navigation.navigate('Login')} />
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
        backgroundColor:'#eee',
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
        width:300,
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
    sqr:{
        marginTop:2,
        marginBottom:2,
        padding:2,
        borderRadius:10,
        elevation:2,
        backgroundColor:'#ffffff',
        shadowOffset:{width:1,height:1},
        shadowColor:'#000',
        shadowOpacity:0.3,
        shadowRadius:1,
        marginHorizontal:2,
        marginVertical:3,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'flex-start'
      },
})