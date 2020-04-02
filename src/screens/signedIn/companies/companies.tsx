import React, {useCallback, useState} from "react";
import {useQuery} from "@apollo/client";
import {companies_query} from "../../../graphql/queries";
import {Button, Card, ListItem, Overlay, Text} from "react-native-elements";
import {FlatList, View} from "react-native";
import {useFocusEffect} from "@react-navigation/native";

interface company {
    id: number,
    name: string,
    nip: number
}

export default function Companies({navigation:{navigate}}) {
    const {data, loading, error, refetch} = useQuery(companies_query);

    useFocusEffect(
        useCallback(()=>{
            refetch().then();
        },[])
    );

    if (loading) return null;

    if (error) return <Text>{error}</Text>;

    const {companies} = data;

    return (
        <View>
            <Button
                title={"Add new company"}
                onPress={()=>navigate("AddCompany")}
            />
            <Card>
                <FlatList
                    data={
                        companies.map(company => ({...company, key:company.id.toString()}))
                    }
                    renderItem={
                        ({item}:{item: company}) =>
                            <ListItem
                                title={item.name}
                                subtitle={"nip: " + item.nip}
                                onPress={() => navigate("Company", {
                                    id: item.id,
                                    name: item.name
                                })}
                                bottomDivider
                                chevron
                            />
                    }
                />
            </Card>
        </View>

    );
}