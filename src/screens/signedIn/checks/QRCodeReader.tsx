import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {useMutation} from "@apollo/client";
import {checkInMutation, checkOutMutation} from "../../../graphql/mutations";

export default function QRCodeReader() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [checkInFunction] = useMutation(checkInMutation);
    const [checkOutFunction] = useMutation(checkOutMutation);


    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);

        if (data == "checkin"){
            try{
                const response = await checkInFunction();
                const {checkIn} = response.data;

                if (!checkIn) {
                    alert("Try again. Something went wrong");
                    return ;
                }

                alert(`Checked in at ${checkIn.createAt}`);
            }catch (e) {
                e.graphQLErrors.map(({message})=> alert(message));
            }
        }

        if (data == "checkout"){
            try{
                const response = await checkOutFunction();

                const {checkOut} = response.data;

                if (!checkOut) {
                    alert("You have not check in yet.");
                    return;
                }

                alert(`Check out at ${checkOut.createAt}.\nWorked for ${checkOut.minutes_worked} minutes`);
            }catch (e) {
                e.graphQLErrors.map(({message})=> alert(message));
            }

        }
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