import React from "react";
import Users from "../../../screens/signedIn/users/users";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Me from "../../../screens/signedIn/users/me";

const usersTab = createMaterialTopTabNavigator();

export function usersTabs(){
    return(
        <usersTab.Navigator>
            <usersTab.Screen name={"Me"} component={Me}/>
            <usersTab.Screen name={"Users"} component={Users}/>
        </usersTab.Navigator>
    )
}
