import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import Orders from "../../screens/signedIn/orders/orders";
import CreateOrder from "../../screens/signedIn/orders/createOrder";
import Order from "../../screens/signedIn/orders/order";

const orders = createStackNavigator();

export default function ordersStack() {
    return(
        <orders.Navigator>
            <orders.Screen name={"Orders"} component={Orders}/>
            <orders.Screen name={"Order"} component={Order}/>
            <orders.Screen name={"CreateOrder"} component={CreateOrder} options={{title:"Create Order"}}/>
        </orders.Navigator>
    );
}