import {Card, Text} from "react-native-elements";
import React from "react";
import {useQuery} from "@apollo/client";
import {userQuery} from "../../../graphql/queries";



export default function User({route: {params}, navigation:{setOptions}}) {
    const {id, name, email} = params;



    setOptions({
        title: name
    });

    const {data, loading, error} = useQuery(userQuery, {
        variables: {
            id: id
        }
    });

    if (loading) return null;

    const {user} = data;

    if (error) return <Text>{error}</Text>;

    return(
        <Card
            title={name}
        >
            <Text>First name: {user.firstName}</Text>
            <Text>Last name: {user.lastName}</Text>
            <Text>Email: {email}</Text>
            <Text>Phone: {user.phone}</Text>
        </Card>
    );
}