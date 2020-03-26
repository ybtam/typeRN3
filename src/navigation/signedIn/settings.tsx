import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import Settings from "../../screens/signedIn/settings/settings";
import ChangePassword from "../../screens/signedIn/settings/changePassword";

const settings = createStackNavigator();

export default function settingsStack() {
    return(
        <settings.Navigator>
            <settings.Screen name={"Settings"} component={Settings}/>
            <settings.Screen name={"ChangePassword"} component={ChangePassword}/>
        </settings.Navigator>
    );
}