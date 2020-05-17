import React from "react";
import {FlatList, RefreshControl, Text, View} from "react-native";
import {useQuery} from "@apollo/client";
import {Card, ListItem} from "react-native-elements";
import {meQuery, otherUsersQuery, usersQuery} from "../../../graphql/queries";
import {user} from "../../../interfaces";

export default function Users({navigation:{navigate}}) {
    const {data, loading, error, refetch, networkStatus} = useQuery(otherUsersQuery, {
        notifyOnNetworkStatusChange: true
    });

    if (networkStatus === 4) return null;

    if (loading) return null;

    if (error) return <Text>{error}</Text>;

    const {otherUsers} = data;

    return(
        <View
            style={{ flex: 1, justifyContent: 'space-between' }}
        >
            <Card>
                <FlatList
                    data={
                        otherUsers.map(user => ({...user, key:user.id.toString()}))
                    }
                    renderItem={
                        ({item}:{item:user}) => <ListItem
                            title={item.name}
                            subtitle={item.email}
                            onPress={() => navigate("User", {
                                id: item.id,
                                name: item.name,
                                firstName: item.firstName,
                                lastName: item.lastName,
                                email: item.email,
                                phone: item.phone
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
        </View>

    )
}

