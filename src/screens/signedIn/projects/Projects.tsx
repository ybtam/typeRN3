import React, {useCallback} from "react";
import {Button, Card, ListItem, Text} from "react-native-elements"
import {useQuery} from "@apollo/client";
import {FlatList, RefreshControl, ScrollView, View} from "react-native";
import {projectsQuery} from "../../../graphql/queries";
import {project} from "../../../interfaces";
import {tabScreenStyle} from "../../../styles";
import {useFocusEffect} from "@react-navigation/native";
import ProjectListItem from "../../../components/signedIn/projects/projectListItem";

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
                    renderItem={({item}:{item: project}) => <ProjectListItem project={item}/> }
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch}/>}
                    ListEmptyComponent={<Text>No Projects</Text>}
                />
            </Card>
        </View>
    );
}

