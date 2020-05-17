import React from "react";
import {Button} from "react-native-elements";
import {View} from "react-native";
import LogOutButton from "../../../components/signedIn/logOut";

export default function Settings ({navigation:{navigate}}){

        return (
            <View style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{width: 200}}>
                    <Button title={'Change Password'} onPress={()=>navigate("ChangePassword")}/>
                    <LogOutButton buttonStyle={{marginTop: 10}}/>
                </View>
            </View>
        );
}