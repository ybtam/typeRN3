import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import Users from "../../screens/signedIn/users/users";
import User from "../../screens/signedIn/users/user";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Me from "../../screens/signedIn/users/me";

const users= createStackNavigator();
export default function usersStack() {
    return(
        <users.Navigator>
            <users.Screen name={"UsersTab"} component={usersTabs}/>
            <users.Screen name={"User"} component={User}/>
        </users.Navigator>
    );
}

const usersTab = createMaterialTopTabNavigator();

function usersTabs(){
    return(
        <usersTab.Navigator>
            <usersTab.Screen name={"Me"} component={Me}/>
            <usersTab.Screen name={"Users"} component={Users}/>
        </usersTab.Navigator>
    )

}
