import React, {useCallback, useState} from "react";
import {Button, ButtonGroup, Card, ListItem, Text} from "react-native-elements";
import {FlatList, RefreshControl, ScrollView, View} from "react-native";
import {useMutation, useQuery} from "@apollo/client";
import {project_query} from "../../../graphql/queries";
import {task, user} from "../../../interfaces";
import TaskListItem from "../../../components/signedIn/projects/taskListItem";
import {useFocusEffect} from "@react-navigation/native";
import UserListItem from "../../../components/signedIn/projects/userListItem";
import ProjectUsersList from "../../../components/signedIn/projects/projectUsersList";

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
    const [index, setIndex] = useState(0);

    useFocusEffect(
        useCallback(()=>{
            refetch().then();
        },[])
    );

    if (loading || !data) return null;

    if (error) return <Text>{error}</Text>;

    const {project:{id:projectId, tasks, users}} = data;

    const Tasks_component = () => (
        <View>
            <Button
                title={"Add new task"}
                onPress={()=>navigate("AddTask", {
                    id: id
                })}/>
            <Card>
                <FlatList
                    data={tasks.map(task => ({...task, key:task.id.toString()}))}
                    renderItem={({item}:{item: task}) => <TaskListItem item={item}/>}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch}/>}
                    ListEmptyComponent={<Text>No tasks</Text>}
                />
            </Card>
        </View>
    );

    const buttons = ["Tasks", "Users"]

    return(
        <View>
            <ButtonGroup buttons={buttons} onPress={setIndex} selectedIndex={index}/>
            {index == 0 && <Tasks_component/>}
            {index == 1 && <ProjectUsersList taskUsers={users} projectId={projectId}/>}
        </View>
    );
}