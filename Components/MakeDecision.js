import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Button,Image,TextInput} from 'react-native';
import { ActionButton,Card } from 'react-native-material-ui';
import { CheckBox } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


export default function MakeDecision({navigation}){
    const [friends,setFriends]=useState(null);
    const [groups,setGroups]=useState(null);
    const [groupID,setGroupID]=useState(null);
    const [description,setDescription]=useState('');
    const [pic1,setPic1]=useState(null);
    const [pic2,setPic2]=useState(null);
    const [user,setUser]=useState('');

    let Flist=[];
    let Glist=[];

//-------------------------------- step 1 --------------------------------//
// this is the init function basicly and it 
useEffect(()=>{
    const reScreen = navigation.addListener('focus',()=>{
      getData();
      console.log("event listener in make dec")
    });
    return reScreen;
  },[]);

async function getData(){
            try{
                let value=await AsyncStorage.getItem('User');
                if(value!==null){
                    setUser(JSON.parse(value));// get the user from local storage
                    console.log("user is set");
                    getGroups(JSON.parse(value));// get the groups from db by sending the user email
                }
            }
            catch(error){
                console.log(error)
            }
            if (Constants.platform.ios) {
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);//this is the permissions to use gallery in phone
                if (status !== 'granted') {
                  alert('Sorry, we need camera roll permissions to make this work!');
                }
              }
}


//-------------------------------- step 2 --------------------------------//
// get all the groups that the user has
      const getGroups=async(u)=>{
          let g;
        fetch('https://proj.ruppin.ac.il/igroup21/proj/api/Group/' + u.Email+'/',{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res!==null){
                Glist=[]
                res.map((item)=>{
                    if(item.Group_name&&item.Group_ID){
                        g={
                            ...item,
                            checked:false
                        };
                        
                        Glist.push(g);
                    }
                });
                setGroups(Glist);
            }
        })
        .catch((error)=>console.log(error))
        .finally(()=>console.log('got group ID'))
      }

//-------------------------------- step 3 --------------------------------//
// send the decision to server and post it
      const MakeDecision=async()=>{
          console.log(user.Email,groupID,description,pic1,pic2)
          if(user.Email&&groupID&&description&&pic1&&pic2){
          let Indecision={
            "Group_groupID": groupID,
            "User_email": user.Email,
            "Description_": description,
            "Img1": pic1,
            "Img2": pic2,
            "Final_answer": "",
            "CurrectAnswerPercent":"",
            "closeIndecision":0,
    };
    console.log(Indecision);
        await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/Indecision/',{
            method:'POST',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
            body:JSON.stringify(Indecision),
        })
        .then((response)=>getDecisionID())
        .catch((error)=>console.log("error"))
        
      }
      else{alert("some data is missing please fill all the information")}
    }
// get decision ID and send it to the get group members function
    const getDecisionID=async()=>{
        await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/Indecision/'+user.Email+'/true/',{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>{
            console.log("that is the data we look for")
            console.log(res)
            getGroupMembers(res[0].IndecisionID)
        })
        .catch((error)=>console.log(error))

    }
// function that gets the group members from the DB
    const getGroupMembers=async(DecisionID)=>{
        await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/UserInGroup/GroupNameString/'+groupID+'/'+DecisionID+'/',{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>{
            console.log("that is the last data")
            console.log(res)
        })
        .catch((error)=>console.log(error))
        .finally(()=>console.log('finished everything'))
    }

      const handleChoosePhoto1 = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        });
        console.log("result!!",result);
        if(result.cancelled){
            return;
        }
        //imagepicker takes the photo from disk and returns the local uri
        let localUri=result.uri;
        let filename=localUri.split('/').pop();
        console.log("file name here: ");
        console.log(filename);
        //find the data type of the image 

        // /\.(\w+)$/ this is a mean of searching kind of file
        let match=/\.(\w+)$/.exec(filename);
        let type=match ? 'image/'+match[1] : 'image';

        console.log("match here: ");
        console.log(match);
        console.log("type here: ");
        console.log(type);

        //upload the image using fetch and FormData APIs
        let img={
            uri:localUri,
            name:filename,
            type
        }
        let formData=new FormData();

        //assume "UploadedFile" is the name of the form field the server expects !!!!

        formData.append('UploadedFile',img);

        console.log("formData here: ");
        console.log(formData);
        return await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/uploadPic',{
            method: 'POST',
            contentType: false,
            processData: false,
            mode:'no-cors',
            body:formData,
        }).then(()=>{
            console.log("the picture was uploaded!");
            setPic1('http://proj.ruppin.ac.il/igroup21/proj/uploadedFiles/'+filename);
        }).catch((error)=>{
            console.log(error);
        });
      }

      const handleChoosePhoto2 = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        });
        console.log("result!!",result);
        if(result.cancelled){
            return;
        }
        //imagepicker takes the photo from disk and returns the local uri
        let localUri=result.uri;
        let filename=localUri.split('/').pop();
        console.log("file name here: ");
        console.log(filename);
        //find the data type of the image 

        // /\.(\w+)$/ this is a mean of searching kind of file
        let match=/\.(\w+)$/.exec(filename);
        let type=match ? 'image/'+match[1] : 'image';

        console.log("match here: ");
        console.log(match);
        console.log("type here: ");
        console.log(type);

        //upload the image using fetch and FormData APIs
        let img={
            uri:localUri,
            name:filename,
            type
        }
        let formData=new FormData();

        //assume "UploadedFile" is the name of the form field the server expects !!!!

        formData.append('UploadedFile',img);

        console.log("formData here: ");
        console.log(formData);
        return await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/uploadPic',{
            method: 'POST',
            contentType: false,
            processData: false,
            mode:'no-cors',
            body:formData,
        }).then(()=>{
            console.log("the picture was uploaded!");
            setPic2('http://proj.ruppin.ac.il/igroup21/proj/uploadedFiles/'+filename);
        }).catch((error)=>{
            console.log(error);
        });
      }

    const FChange=(item)=>{
        Flist=[];
        console.log(item.key)
        friends.map((i)=>{
            if(i===item){
               if(i.checked===false){i.checked=true,console.log('changed to true')}
               else {i.checked=false,console.log('changed to false')} 
            }
            Flist.push(i)
        })
        setFriends(Flist);
    }

    const GChange=(item)=>{
        Glist=[];
        console.log(item.Group_name)
        groups.map((i)=>{
            if(i===item){
               if(i.checked===false){i.checked=true,console.log('changed to true'),setGroupID(i.Group_ID)}
               else {i.checked=false,console.log('changed to false'),setGroupID(null)} 
            }
            else{i.checked=false}
            Glist.push(i);
        })
        setGroups(Glist);
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Decision</Text>
            <TextInput style={{backgroundColor:'#a0faf0',}} onChangeText={text=>setDescription(text)} value={description} placeholder=" Enter Description" />
            <View style={styles.spaceH}></View>
            <View style={styles.container}>


                <View style={styles.colum}>
                    <View style={styles.row1}>
                    <View style={styles.spaceW}></View>
                        <View style={styles.sqr}>
                            {pic1 && (<Image
                            style={{width: 150, height: 200,alignSelf:'center'}}
                            source={{uri: pic1}}
                            />)}
                        </View>
                        <View style={styles.spaceW}></View>
                        <View style={styles.sqr}>{pic2 && (<Image
                            style={{width: 150, height: 200,alignSelf:'center'}}
                            source={{uri: pic2}}
                            />)}
                        </View>
                        <View style={styles.spaceW}></View>
                    </View>
                    <View style={styles.spaceH}></View>
                    <View style={styles.row}>
                        <Button title="upload picture 1" onPress={()=>handleChoosePhoto1()} />
                        <View style={styles.space}></View><View style={styles.space}></View>
                        <Button title="upload picture 2" onPress={()=>handleChoosePhoto2()} />
                    </View>
                    
                </View>

                <View style={styles.colum}>
                    <View style={styles.row1}>
                        <View style={styles.spaceW}></View>
                        <View style={styles.sqr2}>
                        <ScrollView>
                        {groups&&groups.map((item)=><CheckBox key={item.Group_name} title={item.Group_name} checked={item.checked} onPress={()=>GChange(item)} checkedIcon='dot-circle-o'
  uncheckedIcon='circle-o' />)}
                                </ScrollView>
                        </View>
                        
                        <View style={styles.spaceW}></View>
                    </View>
                    <ActionButton style={{container:{backgroundColor:'#5bf'}}} icon="add" onPress={()=>MakeDecision()} />
                </View>

            </View>
        </View>
    )
}


/* just incase we will want to show the group members and pick from there
<View style={styles.space}></View>
                            <View style={styles.sqr1}>
                                <ScrollView>
                                    
                                            {groups.map((item)=>item.checked && <View key={item.Group_name}><Text>{item.Group_name}</Text>
                                            {friends.map((i)=>(i.group===item.Group_name)&& <CheckBox key={i.key} title={i.key} checked={i.checked} onPress={()=>FChange(i)} checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o' />)}
                                        </View>)}
                                    
                                </ScrollView>
                            </View>
*/

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    title:{
        alignSelf:'center',
        fontSize:24,
        borderBottomWidth:1
    },
    sqr:{
        flex:1,
        height:230,
        backgroundColor:'#aecfe7',
        alignSelf:'stretch',
        justifyContent:'center',
    },
    sqr2:{
        flex:1,
        height:280,
        backgroundColor:'#aecfe7',
        alignSelf:'stretch',
        justifyContent:'center',
    },
    colum:{
        flex:1,
        alignContent:'stretch'
    },
    row: {
        flex:0.2,
        flexDirection: 'row',
        alignContent:'center',
        justifyContent:'center',
        alignItems:'flex-start',
        alignSelf:'stretch'
    },
    row1: {
        flexDirection: 'row',
        flex:1,
        alignContent:'center',
        alignItems:'flex-start',
        alignSelf:'stretch'
    },
    btn:{
        flex:1,
    },
    space:{
        width:20
    },
    spaceW:{
        width:10
    },
    spaceH:{
        height:10
    },
  });