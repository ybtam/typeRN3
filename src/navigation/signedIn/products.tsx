import {createStackNavigator} from "@react-navigation/stack";
import Product from "../../screens/signedIn/products/product";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Products from "../../screens/signedIn/products/products";
import Categories from "../../screens/signedIn/products/categories";
import React from "react";
import AddCategory from "../../screens/signedIn/products/addCategory";
import AddProduct from "../../screens/signedIn/products/addProduct";

const product = createStackNavigator();

export default function productStack() {
    return(
        <product.Navigator>
            <product.Screen name={"ProductsTab"} component={productsTab} options={{title: "Products",}}/>
            <product.Screen name={"Product"} component={Product}/>
            <product.Screen name={"CreateCategory"} component={AddCategory}/>
            <product.Screen name={"AddProduct"} component={AddProduct}/>
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