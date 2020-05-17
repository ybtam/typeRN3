import {Button, Text} from "react-native-elements";
import React from "react";
import {View} from "react-native";
import TextField from "../../../components/textField";
import {useForm} from "../../../hooks/useForm";
import {useMutation} from "@apollo/client";
import {createCompanyMutation} from "../../../graphql/mutations";
import {textInputArea} from "../../../styles";

const defaultState = {
    name: '',
    nip: '',
};

const defaultState1 = {
    errors: {},
    isSubmitting: false,
};

export default function AddCompany({navigation:{goBack}}) {

    const [createCompanyFunction] = useMutation(createCompanyMutation);
    const {values, handleChange, setValues} = useForm(defaultState);
    const {values: values1, setValues: setValues1, handleChange: handleChange1} = useForm(defaultState1);

    async function submit() {

        if (values1.isSubmitting) return ;

        handleChange1("isSubmitting", false);

        let data;

        try {
            const response = await createCompanyFunction({variables: values});
            data = response.data;
        }catch (e) {
            console.log(e);
        }

        if (!data) {
            setValues1(values => ({
                ...values,
                errors: {
                    message: 'nip already exists'
                },
                isSubmitting: false
            }));
            return ;
        }

        const {createCompany} = data;

        if (createCompany == null || !createCompany) {
            setValues1(values => ({
                ...values,
                errors: {
                    message:'nip already exists'
                },
                isSubmitting: false
            }));
            return ;
        }

        setValues(defaultState);
        setValues1(defaultState1);

        goBack();
    }

    return (
        <View style={textInputArea.container}>
            <Text h2>Add New Company</Text>
            <View style={textInputArea.textFieldContainer}>
                <TextField value={values.name} name="name" placeholder="Name" onChangeText={handleChange}/>
                <TextField value={values.nip} name="nip" placeholder="Nip" onChangeText={handleChange} />

                <Button title ="Add" buttonStyle={{marginTop: 10}} onPress={async event=>{
                    event.preventDefault();
                    await submit();
                }}/>
            </View>
        </View>
    );
}