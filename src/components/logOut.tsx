import React from "react";
import {Button} from "react-native-elements";
import {gql, useMutation} from "@apollo/client";
import {useNavigation} from '@react-navigation/native';

const logOutMutation = gql`
    mutation{
      logout
    }
`;

export default function LogOutButton({buttonStyle}) {

    const [logOut] = useMutation(logOutMutation);
    const navigation = useNavigation();

    async function onPress() {
        let response;

        try {
            response = await logOut()
        }catch (e) {
            console.log(e);
            return ;
        }

        console.log(response);

        navigation.navigate('main');
    }

    return (
        <Button
            title={'Log Out'}
            buttonStyle={buttonStyle}
            onPress={onPress}
        />
    )
}
