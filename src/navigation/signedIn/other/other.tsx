import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import Other from "../../../screens/signedIn/other/other";
import Settings from "../../../screens/signedIn/settings/settings";
import {usersTabs} from "./users";
import companiesStack from "../companies";
import checkStack from "../checks";
import settingsStack from "./settings";
import User from "../../../screens/signedIn/users/user";

const other = createStackNavigator();

export default function otherStack() {
    return(
        <other.Navigator>
            <other.Screen name={"Other"} component={Other}/>
            <other.Screen name={"Users"} component={usersTabs} options={{title: "Users"}}/>
            <other.Screen name={"User"} component={User}/>
            <other.Screen name={"Companies"} component={companiesStack}/>
            <other.Screen name={"Checks"} component={checkStack}/>
            <other.Screen name={"Settings"} component={settingsStack}/>
        </other.Navigator>
    );
}