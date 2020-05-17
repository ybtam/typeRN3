import Products from "../../screens/signedIn/products/products";
import Companies from "../../screens/signedIn/companies/companies";
import React from "react";
import productStack from "./products";
import projectsStack from "./projects";
import usersStack from "./other/users";
import settingsStack from "./other/settings";
import companiesStack from "./companies";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
// @ts-ignore
import { MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons';
import ordersStack from "./orders";
import QRCodeReader from "../../screens/signedIn/checks/QRCodeReader";
import checksStack from "./checks";
import otherStack from "./other/other";
import QRStack from "./QR";

const signedIn = createMaterialBottomTabNavigator();

export default function signedInTabNavigator() {

    return(
        <signedIn.Navigator
            style={{ backgroundColor: 'tomato' }}
        >
            <signedIn.Screen name={"Projects"} component={projectsStack} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="assignment" color={color} size={26} />
                ),
            }}/>
            <signedIn.Screen name={"Products"} component={productStack} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="database" color={color} size={26} />
                ),
            }}/>
            <signedIn.Screen name={"Orders"} component={ordersStack} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="description" color={color} size={26} />
                ),
            }}/>
            <signedIn.Screen name={"QR"} component={QRStack} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="qrcode" color={color} size={26} />
                ),
            }}/>
            <signedIn.Screen name={"Other"} component={otherStack} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="dots-vertical" color={color} size={26} />
                ),
            }}/>


        </signedIn.Navigator>
    )
}

