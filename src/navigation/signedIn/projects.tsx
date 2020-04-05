import {createStackNavigator} from "@react-navigation/stack";
import Projects from "../../screens/signedIn/projects/Projects";
import Project from "../../screens/signedIn/projects/project";
import React from "react";
import AddProject from "../../screens/signedIn/projects/addProject";
import AddTask from "../../screens/signedIn/projects/addTask";

const projects = createStackNavigator();

export default function projectsStack() {
    return(
        <projects.Navigator>
            <projects.Screen name={"Projects"} component={Projects}/>
            <projects.Screen name={"Project"} component={Project}/>
            <projects.Screen name={"AddProject"} component={AddProject} options={{title: "Add Project"}}/>
            <projects.Screen name={"AddTask"} component={AddTask} options={{title: "Add Task"}}/>
        </projects.Navigator>
    );
}