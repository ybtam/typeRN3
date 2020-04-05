import React, {useState} from "react";
import {ListItem} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";

export default function OrderListItem({item}) {

    const {navigate} = useNavigation();

    async function onPress() {
        navigate("Order", {
            id: item.id
        });
    }

    if (!item.company) return (
        <ListItem
            title={"Temp Order"}
            subtitle={"#" + item.id}
            rightTitle={item.total.toString()+" zł"}
            rightSubtitle={"Total"}
            onPress={onPress}
            bottomDivider
        />
    );

    return (
        <ListItem
            title={item.company.name}
            subtitle={"#" + item.id}
            rightTitle={item.total.toString()+" zł"}
            rightSubtitle={"Total"}
            onPress={onPress}
            bottomDivider
        />
    );
}