import {createStackNavigator} from "@react-navigation/stack";
import searchProduct from "../../../screens/signedIn/search/searchProduct";
import React from "react";
import searchCompany from "../../../screens/signedIn/search/searchCompany";

export default function (){
    const searchStack = createStackNavigator();
    return(
        <searchStack.Navigator>
            <searchStack.Screen name={"searchProduct"} component={searchProduct}/>
            <searchStack.Screen name={"searchCompany"} component={searchCompany}/>
        </searchStack.Navigator>
    )

}