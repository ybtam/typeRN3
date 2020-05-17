import {Button, Text} from "react-native-elements";
import React from "react";
import {View} from "react-native";
import TextField from "../../../components/textField";
import {useForm} from "../../../hooks/useForm";
import {useMutation} from "@apollo/client";
import {createCategoryMutation} from "../../../graphql/mutations";
import {textInputArea} from "../../../styles";

const defaultState = {
    name: '',
    description: '',
};

const defaultState1 = {
    errors: {},
    isSubmitting: false,
};

export default function AddCategory({navigation:{goBack}}) {

    const [createCategoryFunction] = useMutation(createCategoryMutation);
    const {values, handleChange, setValues} = useForm(defaultState);
    const {values: values1, setValues: setValues1, handleChange: handleChange1} = useForm(defaultState1);

    async function submit() {

        if (values1.isSubmitting) return ;

        handleChange1("isSubmitting", false);

        let data;

        try {
            const response = await createCategoryFunction({
                variables: {
                    category:values
                }
            });
            data = response.data;
        }catch (e) {
            console.log(e);
        }

        if (!data) {
            setValues1(values => ({
                ...values,
                errors: {
                    message: 'category already exists'
                },
                isSubmitting: false
            }));
            return ;
        }

        const {createCategory} = data;

        if (createCategory == null || !createCategory) {
            setValues1(values => ({
                ...values,
                errors: {
                    message:'category already exists'
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
        <View style={{
        flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
    }}>
    <Text h2>Add New Category</Text>
        <View style={textInputArea.textFieldContainer}>
            <TextField value={values.name} name="name" placeholder="Name" onChangeText={handleChange}/>
            <TextField value={values.description} name="description" placeholder="Description" onChangeText={handleChange} />

            <Button title ="Add" buttonStyle={{marginTop: 10}} onPress={async event=>{
                event.preventDefault();
                await submit();
            }}/>
        </View>
    </View>
);
}