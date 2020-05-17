import {Card, ListItem, Text} from "react-native-elements";
import React from "react";



export default function User({route: {params:{name, email, firstName, lastName, phone}}, navigation:{setOptions}}) {
    setOptions({
        title: name
    });

    return(
        <Card
            title={name}
        >
            <ListItem
                title={firstName}
                subtitle={"Name"}
                bottomDivider
            />
            <ListItem
                title={lastName}
                subtitle={"Surname"}
                bottomDivider
            />
            <ListItem
                title={email}
                subtitle={"Email"}
                bottomDivider
            />
            <ListItem
                title={phone}
                subtitle={"Phone"}
                bottomDivider
            />
        </Card>
    );
}