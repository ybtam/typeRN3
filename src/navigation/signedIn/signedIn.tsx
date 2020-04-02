import Products from "../../screens/signedIn/products/products";
import Companies from "../../screens/signedIn/companies/companies";
import React from "react";
import productStack from "./products";
import projectsStack from "./projects";
import usersStack from "./users";
import settingsStack from "./settings";
import companiesStack from "./companies";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons';
import ordersStack from "./orders";
import QRCodeReader from "../../screens/signedIn/checks/QRCodeReader";
import checksStack from "./checks";

const signedIn = createMaterialBottomTabNavigator();

export default function signedInNavigator() {

    return(
        <signedIn.Navigator style={{ backgroundColor: 'tomato' }}>
            <signedIn.Screen name={"Projects"} component={projectsStack} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="assignment" color={color} size={26} />
                ),
            }}/>
            <signedIn.Screen name={"Users"} component={usersStack} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
            }}/>
            <signedIn.Screen name={"Products"} component={productStack} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="database" color={color} size={26} />
                ),
            }}/>
            <signedIn.Screen name={"Companies"} component={companiesStack} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="domain" color={color} size={26} />
                ),
            }}/>
            <signedIn.Screen name={"Orders"} component={ordersStack} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="description" color={color} size={26} />
                ),
            }}/>
            <signedIn.Screen name={"Settings"} component={settingsStack} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="cogs" color={color} size={26} />
                ),
            }}/>

            <signedIn.Screen name={"Checks"} component={checksStack} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="qrcode" color={color} size={26} />
                ),
            }}/>

        </signedIn.Navigator>
    )
}

