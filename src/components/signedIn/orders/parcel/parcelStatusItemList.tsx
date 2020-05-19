import {ListItem} from "react-native-elements";
import React from "react";

export default function ParcelStatusItemList({status}) {
    return (
        <ListItem
            title={status.location}
            subtitle={status.updateDate}
            rightTitle={status.status}
            bottomDivider
        />
    );
}