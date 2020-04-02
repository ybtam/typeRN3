import React from "react";
import {Button, Card, ListItem, Text} from "react-native-elements";
import {FlatList, View} from "react-native";
import {useQuery} from "@apollo/client";
import {orders_query} from "../../../graphql/queries";
import {order} from "../../../interfaces";

export default function Orders() {
    const {data, loading, error} = useQuery(orders_query);

    if (loading) return null;

    if (error) return <Text>{error}</Text>;

    const {orders} = data;

    console.log(orders);

    return(
        <View>
            <Button title={"Create Order"}/>
            <FlatList
                data={orders.map(order => ({...order, key:order.id.toString()}))}
                renderItem={
                    ({item}:{item:order})=>
                        <Card
                            title={"#"+item.id}
                        >
                            <ListItem
                                title={"total"}
                                rightTitle={item.total.toString()+" zł"}
                            />
                            <ListItem
                                title={"Company"}
                                rightTitle={item.company.name}
                            />
                        </Card>
                }
            />
        </View>
    )
}