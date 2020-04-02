import React from "react";
import {FlatList, RefreshControl, Text} from "react-native";
import {useQuery} from "@apollo/client";
import {Card, ListItem} from "react-native-elements";
import {meQuery, usersQuery} from "../../../graphql/queries";
import {user} from "../../../interfaces";

export default function Users({navigation:{navigate}}) {
    const {data, loading, error, refetch, networkStatus} = useQuery(usersQuery, {
        notifyOnNetworkStatusChange: true
    });

    if (networkStatus === 4) return null;

    if (loading) return null;

    if (error) return <Text>{error}</Text>;

    const {users} = data;

    return(
        <Card>
            <FlatList
                data={
                    users.map(user => ({...user, key:user.id.toString()}))
                }
                renderItem={
                    ({item}:{item:user}) => <ListItem
                            title={item.name}
                            subtitle={item.email}
                            onPress={() => navigate("User", {
                                id: item.id,
                                name: item.name,
                                email: item.email
                            })}
                            bottomDivider
                            chevron
                        />
                }
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={refetch}/>
                }
            />
        </Card>
    )
}

