import {useState} from "react";

export const useArray = (initialData) => {
    const [values, setValues] = useState(initialData);

    const handleChange = (name, value) => {
        setValues(values => ({
            ...values,
            [name]: value
        }));
    };

    return {
        handleChange,
        values,
        setValues
    }
};