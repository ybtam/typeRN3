import React from "react";
import {Button, Card, ListItem, Text} from "react-native-elements";
import {useQuery} from "@apollo/client";
import {order_query} from "../../../graphql/queries";
import {order, orderProduct} from "../../../interfaces";
import {FlatList, RefreshControl, ScrollView, View} from "react-native";
import {tabScreenStyle} from "../../../styles";
import CompanyListItem from "../../../components/signedIn/orders/order/companyListItem";

interface orderData {
    order: order
}
interface orderProductData {
    orderProduct: orderProduct
}

export default function Order({route:{params:{id}}, navigation:{navigate, setOptions}}) {
    setOptions({title: "Order #"+id});

    const {data, loading, error, refetch} = useQuery<orderData>(
        order_query, {
            variables:{id: id},
            pollInterval: 10000
        }
        );

    if (loading) return null;
    if (error) return <Text>{error}</Text>;

    const {order} = data;

    const renderOrderProduct = ({item:{orderProduct}}:{item:orderProductData}) =>(
        <ListItem
            title={orderProduct.product.code}
            subtitle={orderProduct.quantity + " x " + orderProduct.product.nowPrice.price.toFixed(2) + ' zł'}
            rightTitle={orderProduct.total.toFixed(2) + " zł"}
            chevron
            bottomDivider
        />
    );

    return(
        <View style={tabScreenStyle.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch}/> }>
                <Card>
                    <CompanyListItem orderId={order.id} company={order.company} onRefresh={refetch}/>
                    <Card>
                        <Button title={"Add Product"} onPress={()=>navigate("SearchStack", {
                            screen: 'searchProduct',
                            params: {
                                orderId: id,
                                orderProducts: order.orderProducts
                            }
                        })}/>
                        <FlatList
                            data={order.orderProducts.map(orderProduct=>({orderProduct, key:orderProduct.id.toString()}))}
                            renderItem={renderOrderProduct} scrollEnabled={false}
                        />
                    </Card>
                    <ListItem
                        title={"Subtotal"}
                        rightTitle={order.subtotal.toFixed(2)+ " zł"}
                        bottomDivider
                    />
                    <ListItem
                        title={"Delivery"}
                        rightTitle={order.deliveryCost.toFixed(2) + " zł"}
                        bottomDivider
                    />
                    <ListItem
                        title={"Total"}
                        rightTitle={order.total.toFixed(2)+ " zł"}
                    />
                </Card>
            </ScrollView>

        </View>
    );
}