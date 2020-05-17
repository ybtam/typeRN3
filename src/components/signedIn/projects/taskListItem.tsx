import React, {PureComponent, useState} from "react";
import {ListItem} from "react-native-elements";
import {useMutation} from "@apollo/client";
import {setTaskStatusMutation} from "../../../graphql/mutations";

export default function TaskListItem({item}) {
    const [setTaskStatusFunction] = useMutation(setTaskStatusMutation);
    const [completed, setCompleted] = useState(item.completed);

    async function onPress() {
        try {
            const response = await setTaskStatusFunction({variables:{id: item.id}});
            const {setTaskStatus} = response.data;
            setCompleted(!completed);
            setCompleted(setTaskStatus);
        }catch (e) {
            console.log(e);
        }
    }

    return (
        <ListItem
            title={item.title}
            bottomDivider
            checkBox={{
                checked:completed,
                onPress: onPress
            }}
        />
    );
}