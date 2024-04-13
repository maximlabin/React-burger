import { useState } from 'react';

type FormValues<T> = {
    values: T;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function useForm<T>(inputValues: T): FormValues<T> {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange };
}