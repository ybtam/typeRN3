import React from "react";
import {Button, Card, ListItem, Text} from "react-native-elements";
import {useQuery} from "@apollo/client";
import {order_query} from "../../../graphql/queries";
import {order, orderProduct} from "../../../interfaces";
import {FlatList} from "react-native";

interface orderData {
    order: order
}

interface orderProductData {
    orderProduct: orderProduct
}

export default function Order({route:{params:{id}}, navigation:{navigate, setOptions}}) {
    setOptions({
        title: "Order #"+id
    });

    const {data, loading, error} = useQuery<orderData>(order_query, {variables:{id: id}});

    if (loading) return null;

    if (error) return <Text>{error}</Text>;

    const {order} = data;

    console.log(order);

    const renderOrderProduct = ({item:{orderProduct}}:{item:orderProductData}) =>(
        <ListItem
            title={orderProduct.product.code}
            subtitle={orderProduct.quantity + " x " + orderProduct.product.nowPrice.price}
            rightTitle={orderProduct.total.toString() + " zł"}
            chevron
            bottomDivider
        />
    );

    return(
        <Card>
            <ListItem
                title={"Company"}
                subtitle={"Company"}
            />
            <Card>
                <Button title={"Add Product"}/>
                <FlatList
                    data={order.orderProducts.map(orderProduct=>({orderProduct, key:orderProduct.id.toString()}))}
                    renderItem={renderOrderProduct}
                />
            </Card>
            <ListItem
                title={"Subtotal"}
                rightTitle={order.subtotal.toString()+ " zł"}
                bottomDivider
            />
            <ListItem
                title={"Delivery"}
                rightTitle={order.deliveryCost.toString() + " zł"}
                bottomDivider
            />
            <ListItem
                title={"Total"}
                rightTitle={order.total.toString()+ " zł"}
            />
        </Card>
    );
}