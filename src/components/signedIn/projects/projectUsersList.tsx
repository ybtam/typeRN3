import {useQuery} from "@apollo/client";
import {usersQuery} from "../../../graphql/queries";
import {FlatList, RefreshControl, Text} from "react-native";
import {user} from "../../../interfaces";
import UserListItem from "./userListItem";
import {Card} from "react-native-elements";
import React from "react";

interface args {
    taskUsers: [user],
    projectId?: number
}

export default function ProjectUsersList({taskUsers, projectId}:args){
    const {data, loading, error} = useQuery(usersQuery);

    if (loading) return null;

    if (error) alert(error);

    const {users} = data;

    const renderItem = ({item}:{item: user}) => {
        if (taskUsers.find(user => user.name===item.name)) return (<UserListItem user={item} working={true}/>);

        return (
            <UserListItem user={item} working={false} projectId={projectId}/>
        );
    }

    return (
        <Card>
            <FlatList
                data={users.map(user => ({...user, key:user.id.toString()}))}
                renderItem={renderItem}
            />
        </Card>
    );
}