import React, {useCallback} from "react";
import {Button, Card, ListItem, Text} from "react-native-elements"
import {useQuery} from "@apollo/client";
import {FlatList, RefreshControl, ScrollView, View} from "react-native";
import {projectsQuery} from "../../../graphql/queries";
import {project} from "../../../interfaces";
import {tabScreenStyle} from "../../../styles";
import {useFocusEffect} from "@react-navigation/native";

export default function Projects ({navigation:{navigate}}) {
    const {loading, error, data, refetch, networkStatus} = useQuery(projectsQuery, {
        notifyOnNetworkStatusChange: true
    });

    useFocusEffect(
        useCallback(()=>{
            refetch().then();
        },[])
    );

    if (networkStatus === 4) return null;
    if (loading || !data) return null;
    if (error) return <Text>{error}</Text>;

    const {myProjects} = data;

    if (!myProjects) return(
        <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch}/>}>
            <View
                style={tabScreenStyle.container}
            >
                <Button
                    title={"Add Project"}
                    onPress={()=>navigate("AddProject")}
                />
                <Text h3>You have no projects.</Text>
            </View>
        </ScrollView>
    );

    //render item for flatlist
    const renderItem = ({item}:{item: project}) =>(
        <ListItem
            title={item.name}
            onPress={() => navigate("Project", {
                id: item.id,
                name: item.name,
            })}
            badge={{
                value: (item.noTasks-item.noTasksCompleted),
                badgeStyle: { backgroundColor: "#000000", minHeight: 21, minWidth: 30, },
                textStyle:{fontSize: 17}
            }}
            bottomDivider
            chevron
        />
    );

    return(
        <View
            style={tabScreenStyle.container}
        >
            <Button
                title={"Add Project"}
                onPress={()=>navigate("AddProject")}
            />
            <Card>
                <FlatList
                    data={myProjects.map(myProject => ({...myProject, key:myProject.id.toString()}))}
                    renderItem={renderItem}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch}/>}
                />
            </Card>
        </View>
    );
}

