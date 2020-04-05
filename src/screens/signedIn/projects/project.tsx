import React from "react";
import {Button, Card, ListItem, Text} from "react-native-elements";
import {FlatList, RefreshControl, ScrollView, View} from "react-native";
import {useMutation, useQuery} from "@apollo/client";
import {project_query} from "../../../graphql/queries";
import {task} from "../../../interfaces";
import TaskListItem from "../../../components/taskListItem";

export default function Project({route:{params:{id, name}}, navigation:{navigate, setOptions}}) {
    setOptions({
        title: name
    });

    const {data, loading, error, refetch} = useQuery(project_query, {
        variables: {
            id: id
        },
        notifyOnNetworkStatusChange: true
    });

    if (loading || !data) return null;

    if (error) return <Text>{error}</Text>;

    const {project:{tasks}} = data;

    //todo add a conditional render to this

    return(
        <View>
            <Button
                title={"Add new task"}
                onPress={()=>navigate("AddTask", {
                    id: id
                })}/>
            <Card>
                <FlatList
                    data={
                        tasks.map(task => ({...task, key:task.id.toString()}))
                    }

                    renderItem={
                        ({item}:{item: task}) =>
                            <TaskListItem item={item}/>
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