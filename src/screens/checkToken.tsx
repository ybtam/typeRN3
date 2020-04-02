import React, {useEffect} from "react";
import {Button, Text, View} from "react-native";
import {gql, useMutation} from "@apollo/client";
import {refreshTokenMutation} from "../graphql/mutations";

//todo think how to turn it into a function that will just run on it's own

export default function CheckToken({navigation: {navigate}}){

    const [refreshingToken, { error, loading}] = useMutation(refreshTokenMutation);

    async function runMutation () {
        const response = await refreshingToken().then();
        const data = response.data;

        if (error) console.error("error: " + error);

        if (!data.refreshToken) navigate("signedOut");

        if (data.refreshToken) navigate("signedIn");
    }

    useEffect(() => {
        runMutation().then();
    });

    return(
        <View style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={{width: 200}}>
                <Text>Loading...</Text>
            </View>
        </View>
    );
}