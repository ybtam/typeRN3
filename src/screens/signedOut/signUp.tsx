import React from "react";
import {gql, useMutation} from "@apollo/client";
import {useForm} from "../../hooks/useForm";
import {View} from "react-native";
import TextField from "../../components/textField";
import {Button, Text} from "react-native-elements";
import {signUpMutation} from "../../graphql/mutations";

const defaultState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};

const defaultState1 = {
    errors: {},
    isSubmitting: false,
};

export default function SignUp({navigation:{navigate}}) {

    const [signUp] = useMutation(signUpMutation);
    const {values, handleChange, setValues} = useForm(defaultState);
    const {values: values1, setValues: setValues1, handleChange: handleChange1} = useForm(defaultState1);

    async function submit() {

        if (values1.isSubmitting) return ;

        handleChange1("isSubmitting", false);

        let data;

        try {
            const response = await signUp({variables: values});
            data = response.data;
        }catch (e) {
            console.log(e);
        }

        if (!data) {
            setValues1(values => ({
                ...values,
                errors: {
                    email: 'Already taken'
                },
                isSubmitting: false
            }));
            return ;
        }

        const {login} = data;

        if (login == null) {
            setValues1(values => ({
                ...values,
                errors: {
                    email: 'Already taken'
                },
                isSubmitting: false
            }));
            return ;
        }

        setValues(defaultState);
        setValues1(defaultState1);

        navigate('signedIn');
    }

    return (
            <View style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text h2>Sign up</Text>
                <View style={{width: 200, marginTop: 10}}>
                    <TextField value={values.firstName} name="firstName" placeholder="First name" onChangeText={handleChange} />
                    <TextField value={values.lastName} name="lastName" placeholder="Last name" onChangeText={handleChange}/>
                    { values1.errors.email && <Text style={{color:"red"}}>{values1.errors.email}</Text> }
                    <TextField value={values.email} name="email" placeholder = "Email" onChangeText={handleChange}/>
                    <TextField value={values.password} name="password" placeholder="Password" onChangeText={handleChange} secureTextEntry/>

                    <Button title="Create Account" buttonStyle={{marginTop: 10}} onPress={async event => {
                        event.preventDefault();
                        await submit();
                    }}/>
                    <Button title="Login" buttonStyle={{marginTop: 10}} onPress={() => navigate("LogIn")} />
                </View>
            </View>
        );
}
