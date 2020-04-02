import {useState} from "react";

export const useForm = (initialData) => {
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
