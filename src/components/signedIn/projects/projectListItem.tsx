import {ListItem} from "react-native-elements";
import React from "react";
import {useNavigation} from "@react-navigation/native";

export default function ProjectListItem({project}){
    const {navigate} = useNavigation();

    return (
        <ListItem
            title={project.name}
            onPress={() => navigate("Project", {
                id: project.id,
                name: project.name,
            })}
            badge={{
                value: (project.noTasks-project.noTasksCompleted),
                badgeStyle: { backgroundColor: "#000000", minHeight: 21, minWidth: 30, },
                textStyle:{fontSize: 17}
            }}
            bottomDivider
            chevron
        />
    );
}