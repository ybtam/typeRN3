import {View} from "react-native";
import {Button} from "react-native-elements";
import LogOutButton from "../../../components/signedIn/logOut";
import React from "react";

export default function Other ({navigation:{navigate}}){

    return (
        <View style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={{width: 200}}>
                <Button title={'Checks'} onPress={()=>navigate("Checks")} buttonStyle={{marginTop: 10}}/>
                <Button title={'Users'} onPress={()=>navigate("Users")} buttonStyle={{marginTop: 10}}/>
                <Button title={'Companies'} onPress={()=>navigate("Companies")} buttonStyle={{marginTop:10}}/>
                <Button title={'Settings'} onPress={()=>navigate("Settings")} buttonStyle={{marginTop:10}}/>
                <LogOutButton buttonStyle={{marginTop: 10}}/>
            </View>
        </View>
    );
}