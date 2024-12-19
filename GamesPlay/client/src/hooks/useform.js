import { useEffect, useState } from 'react';

export function useForm(initialValues, submitCallback) {
    const [values, setValues] = useState(initialValues);

    // Reinitialize form values
    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    function changeHandler(event) {
        setValues((currentValues) => ({
            ...currentValues,
            [event.target.name]: event.target.value,
        }));
    }

    async function submitHandler(event) {
        event.preventDefault();
        await submitCallback(values);

        setValues(initialValues);
    }

    return {
        values,
        changeHandler,
        submitHandler,
    };
}
