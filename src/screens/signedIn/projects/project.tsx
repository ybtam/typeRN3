import React from "react";
import {Button, Card, ListItem, Text} from "react-native-elements";
import {FlatList, RefreshControl, ScrollView, View} from "react-native";
import {useMutation, useQuery} from "@apollo/client";
import {project_query} from "../../../graphql/queries";
import {setTaskStatusMutation} from "../../../graphql/mutations";

interface task {
    id: number,
    title: string,
    completed: boolean
}

export default function Project({route:{params}, navigation:{setOptions}}) {

    const {id, name} = params;

    setOptions({
        title: name
    });

    const {data, loading, error, refetch, networkStatus} = useQuery(project_query, {
        variables: {
            id: id
        },
        notifyOnNetworkStatusChange: true
    });

    const [setTaskStatusFunction] = useMutation(setTaskStatusMutation);

    if (networkStatus === 4) return null;

    if (loading || !data) return null;

    if (error) return <Text>{error}</Text>;

    const {project:{tasks}} = data;

    console.log(tasks);

    return(
        <View>
            <Button title={"Add new task"}/>
            <Card>
                <FlatList
                    data={
                        tasks.map(task => ({...task, key:task.id.toString()}))
                    }

                    renderItem={
                        ({item}:{item: task}) =>
                            <ListItem
                                title={item.title}
                                bottomDivider
                                checkBox={{
                                    checked:item.completed,
                                    onPress: async () => {
                                        try {
                                            console.log(item);

                                            const response = await setTaskStatusFunction({variables:{id: item.id}});
                                            const {setTaskStatus} = response.data;

                                            console.log(setTaskStatus);

                                            // if (setTaskStatus) await refetch();
                                        }catch (e) {
                                            console.log(e);
                                        }

                                    }
                                }}
                            />
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={refetch}
                        />
                    }
                />
            </Card>
        </View>
    );
}