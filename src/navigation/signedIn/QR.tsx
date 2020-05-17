import {createStackNavigator} from "@react-navigation/stack";
import QRCodeReader from "../../screens/signedIn/checks/QRCodeReader";
import React from "react";

const QRstack = createStackNavigator();

export default function QRStack(){
    return(
        <QRstack.Navigator>
            <QRstack.Screen name={"QR"} component={QRCodeReader}/>
        </QRstack.Navigator>
    )
}