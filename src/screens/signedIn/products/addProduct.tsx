import React, {useState} from "react";
import {Button, ListItem, Text} from "react-native-elements";
import {FlatList, Picker, View} from "react-native";
import {category} from "../../../interfaces";
import CategoriesOverlay from "../../../components/signedIn/products/categoriesOverlay";
import {textInputArea} from "../../../styles";
import TextField from "../../../components/textField";
import {useForm} from "../../../hooks/useForm";

const defaultState = {
    code: '',
    description: '',
};

const defaultState1 = {
    errors: {},
    isSubmitting: false,
};

export default function AddProduct({navigation:{goBack}}){
    const [category, setCategory] = useState({name:'', id:null});
    const {values, handleChange, setValues} = useForm(defaultState);
    const {values: values1, setValues: setValues1, handleChange: handleChange1} = useForm(defaultState1);

    async function submit() {
        if (values1.isSubmitting) return ;

        handleChange1("isSubmitting", false);

        let data;

        // try {
        //     const response = await createProductFunction({
        //         variables: {
        //             category:values
        //         }
        //     });
        //     data = response.data;
        // }catch (e) {
        //     console.log(e);
        // }

        if (!data) {
            setValues1(values => ({
                ...values,
                errors: {
                    message: 'product already exists'
                },
                isSubmitting: false
            }));
            return ;
        }

        const {addProduct} = data;

        if (addProduct == null || !addProduct) {
            setValues1(values => ({
                ...values,
                errors: {
                    message:'product already exists'
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
            <Text h2>Add new Product</Text>
            <View style={textInputArea.textFieldContainer}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: "center"
                }}>
                    <CategoriesOverlay setCategory ={setCategory}/>
                    <Text>Category: {category.name}</Text>
                </View>
                <TextField value={values.code} name={"code"} placeholder={"Code"} onChangeText={handleChange}/>
                <TextField value={values.description} name="description" placeholder="Description" onChangeText={handleChange} />
                <Button title ="Add" buttonStyle={{marginTop: 10}} onPress={async event=>{
                    event.preventDefault();
                    await submit();
                }}/>
            </View>
        </View>
    );
}