import React from "react";
import {useForm} from "../../hooks/useForm";
import {Button, Text} from "react-native-elements";
import {View} from "react-native";
import TextField from "../../components/textField";
import {useMutation} from "@apollo/client";
import {logInMutation} from "../../graphql/mutations";

const defaultState = {
    email: '',
    password: '',
};
const defaultState1 = {
    errors: {},
    isSubmitting: false,
};

export default function LogIn({navigation: {navigate}}) {

    const [logIn] = useMutation(logInMutation);
    const {values, handleChange, setValues} = useForm(defaultState);
    const {values: values1, setValues: setValues1, handleChange: handleChange1} = useForm(defaultState1);

    async function submit() {

        if (values1.isSubmitting) return ;

        handleChange1("isSubmitting", false);

        let data;

        try {
            const response = await logIn({variables: values});
            data = response.data;
        }catch (e) {
            console.log(e);
        }

        if (!data) {
            setValues1(values => ({
                ...values,
                errors: {
                    message:'wrong email or password'
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
                    message:'wrong email or password'
                },
                isSubmitting: false
            }));
            return ;
        }

        setValues(defaultState);
        setValues1(defaultState1);

        navigate('main');
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
            <Text h2>Login</Text>
            {displayErrorMessage()}
            <View style={{width: 200, marginTop:10}}>
                <TextField value={values.email} name="email" placeholder="Email" onChangeText={handleChange}/>
                <TextField value={values.password} name="password" placeholder="Password" onChangeText={handleChange} secureTextEntry/>
                <Button title ="Log in" buttonStyle={{marginTop: 10}} onPress={async event=>{
                    event.preventDefault();
                    await submit();
                }}/>

                <Button title="Sign up" buttonStyle={{marginTop: 10}} onPress={()=> navigate('SignUp')} />
            </View>
        </View>
    );
}