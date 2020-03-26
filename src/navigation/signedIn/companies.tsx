import Companies from "../../screens/signedIn/companies/companies";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import AddCompany from "../../screens/signedIn/companies/addCompany";
import Company from "../../screens/signedIn/companies/company";

const companies = createStackNavigator();

export default function companiesStack() {
    return(
        <companies.Navigator>
            <companies.Screen name={"Companies"} component={Companies}/>
            <companies.Screen name={"AddCompany"} component={AddCompany} options={{title:"Add new company"}}/>
            <companies.Screen name={"Company"} component={Company}/>
        </companies.Navigator>
    );
}