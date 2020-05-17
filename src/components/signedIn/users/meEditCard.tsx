import {Button, Card, ListItem, Text} from "react-native-elements";
import React from "react";
import TextField from "../../textField";

import {StyleSheet, View} from "react-native";
import {useMutation} from "@apollo/client";
import {updateUserMutation} from "../../../graphql/mutations";
import {useForm} from "../../../hooks/useForm";

const defaultState1 = {
    errors: {},
    isSubmitting: false,
};

export default function MeEditCard({me, setEdit} ) {

    const defaultState = {
        firstName: me.firstName,
        lastName: me.lastName,
        email: me.email,
        phone: me.phone
    };

    const {values, handleChange} = useForm(defaultState);
    const {values: values1, setValues: setValues1, handleChange: handleChange1} = useForm(defaultState1);
    const [updateUserData] = useMutation(updateUserMutation);

    async function submit() {
        if (values1.isSubmitting) return ;

        handleChange1("isSubmitting", false);

        let data;

        try {
            const response = await updateUserData({
                variables: {
                    user: values
                }
            });
            data = response.data;
            console.log(response);
        }catch (e) {
            console.log(e);
        }



        // if (!data) {
        //     setValues1(values => ({
        //         ...values,
        //         errors: {
        //             message: 'product already exists'
        //         },
        //         isSubmitting: false
        //     }));
        //     return ;
        // }
        //
        // const {addProduct} = data;
        //
        // if (addProduct == null || !addProduct) {
        //     setValues1(values => ({
        //         ...values,
        //         errors: {
        //             message:'product already exists'
        //         },
        //         isSubmitting: false
        //     }));
        //     return ;
        // }

        setValues1(defaultState1);
        setEdit(false);
    }

    return (
        <View>
            <Button title={"Save"} onPress={()=>submit()}/>
            <Card
                title={"Me: " + me.name}
            >
                <ListItem
                    title={"First Name: "}
                    rightElement={
                        <View style={styles.field}>
                            <TextField
                                value={values.firstName}
                                placeholder={values.firstName}
                                name={"firstName"}
                                onChangeText={handleChange}/>
                        </View>
                    }
                />

                <ListItem
                    title={"Last Name: "}
                    rightElement={
                        <View style={styles.field}>
                            <TextField
                                value={values.lastName}
                                placeholder={values.lastName}
                                name={"lastName"}
                                onChangeText={handleChange}/>
                        </View>
                    }
                />

                <ListItem
                    title={"Email: "}
                    rightElement={
                        <View style={styles.field}>
                            <TextField
                                value={values.email}
                                placeholder={values.email}
                                name={"email"}
                                onChangeText={handleChange}/>
                        </View>
                    }
                />

                <ListItem
                    title={"Phone:"}
                    rightElement={
                        <View style={styles.field}>
                            <TextField
                                value={values.phone}
                                placeholder={values.phone}
                                name={"phone"}
                                onChangeText={handleChange}/>
                        </View>
                    }
                />
            </Card>
        </View>
);
}

const styles = StyleSheet.create({
    field: {
        width: "80%",
        flexDirection:"row",
        alignItems:"center",
        alignContent: "center"
    },

});