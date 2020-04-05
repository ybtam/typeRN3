import React from "react";
import {Button, Text} from "react-native-elements";
import {FlatList, RefreshControl, View} from "react-native";
import {useMutation, useQuery} from "@apollo/client";
import {orders_query} from "../../../graphql/queries";
import {order} from "../../../interfaces";
import {createOrderMutation} from "../../../graphql/mutations";
import {useForm} from "../../../hooks/useForm";
import OrderListItem from "../../../components/orderListItem";
import {tabScreenStyle} from "../../../styles";

const defaultState1 = {
    errors: {},
    isSubmitting: false,
};

export default function Orders({navigation:{navigate}}) {
    const [createNewOrder] = useMutation(createOrderMutation);
    const {values: values1, setValues: setValues1, handleChange: handleChange1} = useForm(defaultState1);

    const {data, loading, error, refetch} = useQuery(orders_query);
    if (loading) return null;

    if (error) return <Text>{error}</Text>;

    const {orders} = data;

    async function createOrder() {
        if (values1.isSubmitting) return ;

        handleChange1("isSubmitting", false);

        let data;

        try {
            const response = await createNewOrder();
            data = response.data;
        } catch (e){
            console.log(e);
        }

        const {createOrder} = data;

        if (createOrder == null || !createOrder) {
            setValues1(values => ({
                ...values,
                errors: {
                    message:'something went wrong'
                },
                isSubmitting: false
            }));
            return ;
        }

        setValues1(defaultState1);

        await refetch();

        navigate('Order',{
            id: createOrder.id,
        });
    }

    return(
        <View style={tabScreenStyle.container}>
            <Button title={"Create Order"} onPress={createOrder}/>
            <FlatList
                data={orders.map(order => ({...order, key:order.id.toString()}))}
                renderItem={({item}:{item:order})=><OrderListItem item={item}/>}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch}/> }
            />
        </View>
    )
}
