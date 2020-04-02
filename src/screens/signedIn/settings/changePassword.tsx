import React from "react";
import {Button, Text} from "react-native-elements";
import TextField from "../../../components/textField";
import {gql, useMutation} from "@apollo/client";
import {View} from "react-native";
import {useForm} from "../../../hooks/useForm";
import {changePasswordMutation} from "../../../graphql/mutations";

const defaultState = {
    values: {
        old_password: '',
        new_password: '',
        new_password_2: '',
    },
};
const defaultState1 = {
    errors: {},
    isSubmitting: false,
};

export default function ChangePassword({navigation:{goBack}}){
    const [changingPassword] = useMutation(changePasswordMutation);
    const {values, handleChange, setValues} = useForm(defaultState);
    const {values:values1, handleChange:handleChange1, setValues:setValues1} = useForm(defaultState1);
    const {} = useForm(defaultState1);

    function errorMessage (message:string) {
        handleChange1("errors", {message: message});
        handleChange1("isSubmitting", false);
    }

    async function submit () {

        if (!values.old_password || !values.new_password || !values.new_password_2) {

            errorMessage('There are empty fields.');
            return;
        }

        if (values.new_password != values.new_password_2) {
            errorMessage("The new passwords don't match.");
            return ;
        }

        if (values.old_password == values.new_password){
            errorMessage("The new password is the same as the old one. Not allowed");
            return ;
        }

        if (values1.isSubmitting) return ;

        handleChange1("isSubmitting", true);

        let response: any;

        try {
            response = await changingPassword({
                variables: {
                    old_password: values.old_password,
                    new_password: values.new_password
                }
            });
        } catch (e) {
            console.log(e);
            errorMessage('Something went wrong. Try again.');
            return ;
        }

        console.log(response);

        const{changePassword} = response.data;

        if (!changePassword) {
            errorMessage('The original password is incorrect');
            return ;
        }

        setValues(defaultState);
        setValues1(defaultState1);

        goBack();
    }

    function displayErrorMessage () {
        if (values1.errors.message) return (<Text style={{color:'red'}}>{values1.errors.message}</Text>);
    }

    return (
        <View style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={{width: 200}}>
                {displayErrorMessage()}
                <TextField value={values.old_password} name="old_password" placeholder="Old password" onChangeText={handleChange} secureTextEntry/>
                <TextField value={values.anew_password} name="new_password" placeholder="New password" onChangeText={handleChange} secureTextEntry/>
                <TextField value={values.new_password_2} name="new_password_2" placeholder="New password again" onChangeText={handleChange} secureTextEntry/>
                <Button buttonStyle={{marginTop:10}} title={'Change password'} onPress={()=>submit()}/>
            </View>
        </View>
    );

}
