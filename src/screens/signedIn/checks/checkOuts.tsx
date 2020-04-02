import React from "react";
import {Button, Card, ListItem, Text} from "react-native-elements";
import {useQuery} from "@apollo/client";
import {checkOuts_query, orders_query} from "../../../graphql/queries";
import {FlatList, View} from "react-native";
import {checkIn, checkOut, order} from "../../../interfaces";
import {DMY, HM} from "../../../functions/checks";

export default function CheckOuts(){
    const {data, loading, error} = useQuery(checkOuts_query);

    if (loading) return null;

    if (error) console.log(error);

    const {checkOuts} = data;

    return(
        <FlatList
            data={checkOuts.map(checkOut => ({...checkOut, key:checkOut.id.toString()}))}
            renderItem={
                ({item}:{item:checkOut}) =>
                    <ListItem
                        title={"No. " + item.id}
                        rightTitle={DMY(item.createAt)}
                        rightSubtitle={HM(item.createAt)}
                    />
            }
        />
    )
}
