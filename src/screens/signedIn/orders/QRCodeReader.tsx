import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {useMutation} from "@apollo/client";
import {addShippingDetailsToOrderMutation, checkInMutation, checkOutMutation} from "../../../graphql/mutations";

export default function QRCodeReader({route:{params:{orderId}}, navigation:{goBack}}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [addParcelCode] = useMutation(addShippingDetailsToOrderMutation);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);

        data  = data.replace('\%', '');

        let response;

        try {
            response = await addParcelCode({
                variables:{
                    order: {
                        id: orderId
                    },
                    code: data
                }
            });

            console.log(response);
        }catch (e) {
            console.log(e)
        }

        const {addParcel} = response.data;

        if (addParcel.code === data) goBack();
    };



    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
            }}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}