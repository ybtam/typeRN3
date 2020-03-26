import {createStackNavigator} from "@react-navigation/stack";
import Product from "../../screens/signedIn/products/product";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Products from "../../screens/signedIn/products/products";
import Categories from "../../screens/signedIn/products/categories";
import React from "react";

const product = createStackNavigator();

export default function productStack() {
    return(
        <product.Navigator>
            <product.Screen name={"ProductsTab"} component={productsTab} options={{title: "Products",}}/>
            <product.Screen name={"Product"} component={Product}/>
        </product.Navigator>
    )
}

const products = createMaterialTopTabNavigator();

function productsTab() {
    return(
        <products.Navigator>
            <products.Screen name={"Products"} component={Products}/>
            <products.Screen name={"Categories"} component={Categories}/>
        </products.Navigator>
    );
}