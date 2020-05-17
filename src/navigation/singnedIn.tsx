import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import signedInTabNavigator from "./signedIn/signedIn";
import searchStack from "./signedIn/search/searchStack";

const signedIn = createStackNavigator();

export default function signedInNavigator() {
    return(
        <signedIn.Navigator screenOptions={{headerShown: false}}>
            <signedIn.Screen name={"SignedInTab"} component={signedInTabNavigator}/>
            <signedIn.Screen name={"SearchStack"} component={searchStack}/>
        </signedIn.Navigator>
    )
}