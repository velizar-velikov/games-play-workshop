import { useState } from 'react';

export function useForm(initialValues, submitCallback) {
    const [values, setvalues] = useState(initialValues);

    function changeHandler(event) {
        setvalues((currentValues) => ({
            ...currentValues,
            [event.target.name]: event.target.value,
        }));
    }

    function submitHandler(event) {
        event.preventDefault();
        submitCallback(values);
    }

    return {
        values,
        changeHandler,
        submitHandler,
    };
}
