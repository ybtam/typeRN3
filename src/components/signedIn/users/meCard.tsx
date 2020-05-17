import {Card, ListItem} from "react-native-elements";
import React from "react";

export default function MeCard({me}) {
    return (
        <Card title={"Me: " + me.name}>
            <ListItem
                title={"Email:"}
                rightTitle={me.email}
                bottomDivider
            />
            <ListItem
                title={"Phone:"}
                rightTitle={me.phone}
                bottomDivider
            />
        </Card>
    );
}