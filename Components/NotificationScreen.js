import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,AsyncStorage,ScrollView } from 'react-native';
import { ActionButton,Card,Button } from 'react-native-material-ui';

export default function NotificationScreen({navigation}){


    return(
        <View>
            <Text>NotificationScreen</Text>
            <Button onPress={()=>navigation.navigate('Home')} text="go back Home" />
        </View>
    )
}