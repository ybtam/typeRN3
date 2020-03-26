import {createStackNavigator} from "@react-navigation/stack";
import LogIn from "../screens/signedOut/logIn";
import SignUp from "../screens/signedOut/signUp";
import React from "react";

const signedOut = createStackNavigator();

export default function signedOutNavigator() {
    return(
        <signedOut.Navigator>
            <signedOut.Screen name={"LogIn"} component={LogIn}/>
            <signedOut.Screen name={"SignUp"} component={SignUp}/>
        </signedOut.Navigator>
    )
}