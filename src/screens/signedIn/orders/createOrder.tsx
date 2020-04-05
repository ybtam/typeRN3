import {Picker, View} from "react-native";
import React, {useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {createOrderMutation, createProjectMutation} from "../../../graphql/mutations";
import {useForm} from "../../../hooks/useForm";
import {textInputArea} from "../../../styles";
import {Button, Text} from "react-native-elements";
import {companies_query} from "../../../graphql/queries";

const defaultState1 = {
    errors: {},
    isSubmitting: false,
};

export default function CreateOrder({navigation:{navigate}}) {

    const [company, setCompany] = useState(0);
    const {values: values1, setValues: setValues1, handleChange: handleChange1} = useForm(defaultState1);
    const [createNewOrder] = useMutation(createOrderMutation);

    const {data, loading, error} = useQuery(companies_query);
    if (loading) return null;
    if (error) return <Text>{error}</Text>;

    const {companies} = data;

    async function submit() {

        if (values1.isSubmitting) return ;

        handleChange1("isSubmitting", false);

        let data;

        try {
            const response = await createNewOrder();
            data = response.data;
        } catch (e){
            console.log(e);
        }

        const {createOrder} = data;

        if (createOrder == null || !createOrder) {
            setValues1(values => ({
                ...values,
                errors: {
                    message:'something went wrong'
                },
                isSubmitting: false
            }));
            return ;
        }

        setValues1(defaultState1);

        // navigate('Project',{
        //     id: createProject.id,
        //     name: createProject.name,
        // });
    }

    return (
        <View style={textInputArea.container}>
            <Text h4>Create new order</Text>
            <View style={textInputArea.textFieldContainer}>
                <Picker
                    selectedValue={company}
                    onValueChange={(itemValue) => setCompany(itemValue)}
                >
                    <Picker.Item label={"Choose company"} value={0}/>
                    {companies.map(company=><Picker.Item key={company.id} label={company.name} value={company.id}/>)}
                </Picker>
                <Button title={"Create"} buttonStyle={{marginTop: 10}} onPress={async event =>{
                    event.preventDefault();
                    await submit();
                }}/>
            </View>
        </View>
    );
}