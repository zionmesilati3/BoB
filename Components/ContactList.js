import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Button, ShadowPropTypesIOS, ActivityIndicator } from 'react-native';
import { ActionButton,Card } from 'react-native-material-ui';
import { CheckBox } from 'react-native-elements';
import * as Contacts from 'expo-contacts';

export default function ContactList(props,{navigation}){

    const[contacts,setContacts]=useState(null)

    let conL=[];
// init function is used to get the contact list from the user 
      useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.PhoneNumbers,Contacts.Fields.Emails],
            });
    
            if (data.length > 0) {
              let con;
              let pn;
              conL=[];
              data.map((c)=>{
                console.log(c);
                if(c.phoneNumbers){
                  pn=c.phoneNumbers[0].number;
                  pn=pn.replace("+972",'0');
                  pn=pn.replace(" ",'');
                  pn=pn.replace("-",'');
                  pn=pn.replace("-",'');
                  
                con={
                  ...c,checked:false,
                  phone:pn,
                  inGroupCheck:false,
                }
                conL.push(con);
              }
              })
              setContacts(conL)
              // i have the functions to make the contact list contain only users that already exist in the DB
            }
          }
        })();
      }, []);

async function LaunchContacts(ContactList){
  let phoneNumbersString='';
  ContactList.map((c)=>{
    phoneNumbersString+="'"+c.phoneNum+"',";
  })
  phoneNumbersString=phoneNumbersString.slice(0,-1);
  // the string is too long so it doesnt work need to fix on server so i can send an array and remake it into string
    await fetch('https://proj.ruppin.ac.il/igroup21/proj/api/User/phoneNumbersString/'+phoneNumbersString+"/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>reLaunchContacts(res,ContactList))
        .catch((error)=>console.log(error))
}

function reLaunchContacts(usersList,contactsList){
  let conList=[];
  let cont;
  usersList.map((u)=>{
    contactsList.map((c)=>{
      if(u.Phone===c.phone){
        cont={
          name:c.name,
          phone:c.phone,
          id:c.id,
          email:u.Email,
        }
        conList.push(cont)
      }
    })
  })
  if(conList){
    setContacts(conList);
  }
}

    return(
        <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
           
              <View style={styles.row}>
                <View style={styles.spaceW}></View>
                        <ScrollView>
                                {contacts&&contacts.map((c)=><View style={styles.sqr} key={c.id}><View style={styles.spaceH}></View><CheckBox title={" "+c.name+" - "+ c.phone} checked={c.checked} 
                                    onPress={()=>props.placeContact(c)} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' /></View>)}
                                    {!contacts&&<ActivityIndicator animating={true} color='#bc2b78' size='large' />}   
                        </ScrollView>
                <View style={styles.spaceW}></View>
              </View>
        </View>
    )
}

const styles = StyleSheet.create({

  row: {
    flexDirection: 'row',
    flex:1,
    alignContent:'center',
    alignItems:'flex-start',
    alignSelf:'center'
},
sqr:{
  marginTop:5,
  marginBottom:5,
  padding:5,
  borderRadius:6,
  elevation:3,
  backgroundColor:'#fafafa',
  shadowOffset:{width:1,height:1},
  shadowColor:'#000',
  shadowOpacity:0.3,
  shadowRadius:1,
  marginHorizontal:3,
  marginVertical:4,
  alignSelf:'stretch',
  alignItems:'stretch',
  justifyContent:'center',
},
  spaceW:{
      width:10
  },
  spaceH:{
      height:5
  },
});