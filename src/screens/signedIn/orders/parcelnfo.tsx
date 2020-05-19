import React from "react";
import {Card, ListItem, Text} from "react-native-elements";
import {Button, FlatList, RefreshControl, View} from "react-native";
import {useMutation, useQuery} from "@apollo/client";
import {parcelInfo_query} from "../../../graphql/queries";
import {order, parcel, parcelStatus} from "../../../interfaces";
import OrderListItem from "../../../components/signedIn/orders/orderListItem";
import ParcelStatusItemList from "../../../components/signedIn/orders/parcel/parcelStatusItemList";
import {updateParcelInfo} from "../../../graphql/mutations";

interface parcelnfoData {
    parcelInfo: parcel
}

export default function ParcelInfo({route:{params:{orderId, parcel}}}) {

    const {data, error, loading, refetch} = useQuery<parcelnfoData>(parcelInfo_query, {
        variables:{
            order:{
                id: orderId
            },
            code: parcel.code
        }
    });

    const [updateShippingInfo] = useMutation(updateParcelInfo, {
        variables:{
            order:{
                id: orderId
            },
            code: parcel.code
        }
    })

    if (error) return null;

    if (loading) return null;

    const {parcelInfo} = data;

    async function updateInfo(){
        try {
            const response = await updateShippingInfo();

            const {updateParcelInfo} = response.data;

            if (updateParcelInfo) await refetch();

        }catch (e) {
            alert(e);
        }
    }

    return(
        <View style={{flex:1}}>
            <Card
                title={parcel.code}
                wrapperStyle={{flex:1}}
                containerStyle={{flex:1}}
            >
                <Button title={"Update"} onPress={()=>updateInfo()}/>
                <FlatList
                    data={parcelInfo.statusHistory.map(status => ({...status, key:status.id.toString()}))}
                    renderItem={({item}:{item:parcelStatus})=> <ParcelStatusItemList status={item}/>}
                />
            </Card>
        </View>
    )
}