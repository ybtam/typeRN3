import {View} from "react-native";
import React from "react";
import {Button, Text} from "react-native-elements";
import {textInputArea} from "../../../styles";
import {useMutation} from "@apollo/client";
import {useForm} from "../../../hooks/useForm";
import {createProjectMutation} from "../../../graphql/mutations";
import TextField from "../../../components/textField";

const defaultState = {
    name: '',
};

const defaultState1 = {
    errors: {},
    isSubmitting: false,
};

export default function AddProject({navigation:{navigate}}) {

    const [createNewProject] = useMutation(createProjectMutation);
    const {values, handleChange, setValues} = useForm(defaultState);
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

        const {createProject} = data;

        if (createProject == null || !createProject) {
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

        navigate('Projects');
    }

    return (
        <View style={textInputArea.container}>
            <Text h4>Add New Project</Text>
            <View style={textInputArea.textFieldContainer}>
                <TextField value={values.name} name="name" placeholder={"Name"} onChangeText={handleChange}/>
                <Button title={"Add"} buttonStyle={{marginTop: 10}} onPress={async event =>{
                    event.preventDefault();
                    await submit();
                }}/>
            </View>
        </View>
    );
}
