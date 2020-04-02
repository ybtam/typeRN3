import {Card, ListItem} from "react-native-elements";
import React from "react";
import {useQuery} from "@apollo/client";
import {meQuery} from "../../../graphql/queries";
export default function Me() {
    const {data, loading, error, refetch, networkStatus} = useQuery(meQuery, {
        notifyOnNetworkStatusChange: true
    });

    if (networkStatus === 4) return null;

    if (loading) return null;

    if (error) return <Text>{error}</Text>;

    const {me} = data;

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refetch}/>
            }
        >
            <Card
                title={"Me: " + me.name}
            >
                <ListItem
                    title={"Email:"}
                    rightTitle={me.email}
                    bottomDivider
                />
                <ListItem
                    title={"Phone:"}
                    rightTitle={me.phone}
                    bottomDivider
                />
                <ListItem
                    title={"Last Check in"}
                    bottomDivider
                />
                <ListItem
                    title={"Last Check out"}
                    bottomDivider
                />
            </Card>
        </ScrollView>
    );
}

import {RefreshControl, ScrollView, Text} from "react-native";
