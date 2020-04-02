import React from "react";
import {useQuery} from "@apollo/client";
import {checkIns_query} from "../../../graphql/queries";
import {FlatList} from "react-native";
import {checkIn, order} from "../../../interfaces";
import {ListItem, Text} from "react-native-elements";
import {DMY, HM} from "../../../functions/checks";

export default function CheckIns(){
    const {data, loading, error} = useQuery(checkIns_query);

    if (loading) return null;

    if (error) console.log(error);

    const {checkIns} = data;

    return (
        <FlatList
            data={checkIns.map(checkIn => ({...checkIn, key:checkIn.id.toString()}))}
            renderItem={
                ({item}:{item:checkIn}) =>
                    <ListItem
                        title={"No. " + item.id}
                        rightTitle={DMY(item.createAt)}
                        rightSubtitle={HM(item.createAt)}
                    />
            }
        />
    )
}
