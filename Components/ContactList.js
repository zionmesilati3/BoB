import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView,Button, ShadowPropTypesIOS } from 'react-native';
import { ActionButton,Card } from 'react-native-material-ui';
import { CheckBox } from 'react-native-elements';
import * as Contacts from 'expo-contacts';

export default function ContactList(props,{navigation}){

    const[contacts,setContacts]=useState([])

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
              let con
              data.map((c)=>{
                con={
                  ...c,checked:false,
                  inGroupCheck:false,
                }
                conL.push(con);
              })
              setContacts(conL)
            }
          }
        })();
      }, []);



    return(
        <View style={{flex: 1,backgroundColor: '#5af',alignItems: 'center',justifyContent: 'center',borderBottomWidth:0.5,borderTopWidth:1}}>
           
              <View style={styles.row}>
                <View style={styles.spaceW}></View>
                        <ScrollView>
                                {contacts.map((c)=><View key={c.id}><View style={styles.spaceH}></View><CheckBox title={" "+c.name+" - "+ (c.phoneNumbers && c.phoneNumbers[0].number)} checked={c.checked} 
                                    onPress={()=>props.placeContact(c)} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' /></View>)}   
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
  spaceW:{
      width:10
  },
  spaceH:{
      height:5
  },
});