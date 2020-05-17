import {Button} from "react-native-elements";
import React, {useCallback, useState} from "react";
import {useQuery} from "@apollo/client";
import {meQuery} from "../../../graphql/queries";
import {RefreshControl, ScrollView, Text, View} from "react-native";
import MeCard from "../../../components/signedIn/users/meCard";
import MeEditCard from "../../../components/signedIn/users/meEditCard";
import {useFocusEffect} from "@react-navigation/native";

export default function Me() {
    const {data, loading, error, refetch, networkStatus} = useQuery(meQuery, {
        notifyOnNetworkStatusChange: true
    });

    const [edit, setEdit] = useState(false);

    useFocusEffect(
        useCallback(()=>{
            refetch().then();
        },[edit])
    );

    if (networkStatus === 4) return null;

    if (loading) return null;

    if (error) return <Text>{error}</Text>;

    const {me} = data;

    if (edit) return (
        <View>
            <MeEditCard me={me} setEdit={setEdit}/>
        </View>
    );

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refetch}/>
            }
        >
            <Button title={"Edit"} onPress={()=>setEdit(true)}/>
            <MeCard me={me}/>
        </ScrollView>
    );
}


