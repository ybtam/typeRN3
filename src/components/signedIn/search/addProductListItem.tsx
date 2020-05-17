import NumericInput from "react-native-numeric-input";
import {Button, Icon, ListItem} from "react-native-elements";
import React, {useState} from "react";
import {useMutation} from "@apollo/client";
import {addProductToOrderMutation} from "../../../graphql/mutations";
import {View} from "react-native";
import {StyleSheet} from "react-native";
import {product} from "../../../interfaces";

export default function AddProductListItem({orderId, item, orderQuantity = 0}:{orderId: number, item:product, orderQuantity: number}){
    const [addProduct] = useMutation(addProductToOrderMutation);
    const [value, setValue] = useState(orderQuantity);

    async function add(){
        const response = await addProduct({variables:{
                orderId: orderId,
                productId: item.id,
                quantity: value
            }
        });

        const {addProductToOrder} = response.data;

    //    todo log the error and let the user know somehow
    }

    return(
        <ListItem
            title={item.code}
            rightElement={
                <View style={styles.container}>
                    <NumericInput
                        initValue={value}
                        onChange={setValue}
                        valueType='real'
                        minValue={0}
                        totalHeight={30}
                        totalWidth={75}
                    />
                    <Icon
                        reverse
                        name={"add"}
                        color='#517fa4'
                        size={15}
                        onPress={add}
                        disabled={(value===0&& value === orderQuantity)}
                    />
                </View>

            }
            rightTitle={(item.nowPrice.price*value).toFixed(2) + " zł"}
            subtitle={item.category.name}
            bottomDivider
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        backgroundColor: 'green',
        width: '40%',
        height: 40
    }
});