import React from "react";
import QRCodeReader from "../../screens/signedIn/checks/QRCodeReader";
import CheckIns from "../../screens/signedIn/checks/checkIns";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import CheckOuts from "../../screens/signedIn/checks/checkOuts";

const checksStack = createStackNavigator();

export default function checkStack(){
    return(
        <checksStack.Navigator>
            <checksStack.Screen name={"Checks"} component={checksTabs}/>
        </checksStack.Navigator>
    )
}

const checks = createMaterialTopTabNavigator();

function checksTabs() {
    return(
        <checks.Navigator>
            <checks.Screen name={"QR"} component={QRCodeReader}/>
            <checks.Screen name={"Check Ins"} component={CheckIns}/>
            <checks.Screen name={"Check Outs"} component={CheckOuts}/>
        </checks.Navigator>
    );
}