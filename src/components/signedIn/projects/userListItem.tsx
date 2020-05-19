import React, {PureComponent, useState} from "react";
import {ListItem} from "react-native-elements";
import {useApolloClient, useMutation, useQuery} from "@apollo/client";
import {setTaskStatusMutation, setUserToProjectMutation} from "../../../graphql/mutations";
import {meQuery, otherUsersQuery} from "../../../graphql/queries";
import {project, user} from "../../../interfaces";

interface args{
    user: user,
    working: boolean,
    projectId?: number
}

export default function UserListItem({user, working, projectId}:args) {
    const [setUserToProjectFunction] = useMutation(setUserToProjectMutation);
    const [userWork, setUserWork] = useState(working);
    const {data, loading, error} = useQuery(meQuery);

    if (loading) return null;
    if (error) console.log(error);

    const{me} = data;

    if (user.name == me.name) return (
        <ListItem
            title={user.name}
            bottomDivider
        />
    );

    async function onPress() {
        try {
            const response = await setUserToProjectFunction({
                variables:{
                    user:{
                        id: user.id
                    },
                    project:{
                        id: projectId
                    }

                }
            })

            const {setUserToProject} = response.data;

            setUserWork(!userWork);
            setUserWork(setUserToProject);
        }catch (e) {
            console.log(e);
        }
    }

    return (
        <ListItem
            title={user.name}
            checkBox={{
                checked:userWork,
                onPress: onPress
            }}
            bottomDivider
        />
    );
}