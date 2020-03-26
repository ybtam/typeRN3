import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import Orders from "../../screens/signedIn/orders/orders";

const orders = createStackNavigator();

export default function ordersStack() {
    return(
        <orders.Navigator>
            <orders.Screen name={"Orders"} component={Orders}/>
            {/*<orders.Screen name={"Order"} component={Order}/>*/}
        </orders.Navigator>
    );
}