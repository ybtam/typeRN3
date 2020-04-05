import {View} from "react-native";
import React from "react";
import {Button, Text} from "react-native-elements";
import {textInputArea} from "../../../styles";
import {useMutation} from "@apollo/client";
import {useForm} from "../../../hooks/useForm";
import {createTaskMutation} from "../../../graphql/mutations";
import TextField from "../../../components/textField";

const defaultState = {
    title: '',
    id: ''
};

const defaultState1 = {
    errors: {},
    isSubmitting: false,
};

export default function AddTask({route:{params}, navigation:{goBack}}) {

    const [createNewProject] = useMutation(createTaskMutation);
    const {values, handleChange, setValues} = useForm({
        title: '',
        id: params.id
    });
    const {values: values1, setValues: setValues1, handleChange: handleChange1} = useForm(defaultState1);

    async function submit() {
        if (values1.isSubmitting) return ;

        handleChange1("isSubmitting", false);

        let data;

        try {
            const response = await createNewProject({variables: values});
            data = response.data;
        }catch (e) {
            console.log(e);
        }

        const {createTask} = data;

        if (createTask == null || !createTask) {
            setValues1(values => ({
                ...values,
                errors: {
                    message:'something went wrong'
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
            <Text h4>Add New Task</Text>
            <View style={textInputArea.textFieldContainer}>
                <TextField value={values.name} name="title" placeholder={"Title"} onChangeText={handleChange}/>
                <Button title={"Add"} buttonStyle={{marginTop: 10}} onPress={async event =>{
                    event.preventDefault();
                    await submit();
                }}/>
            </View>
        </View>
    );
}
