import {ChangeEvent, useEffect, useState} from "react";

interface UseFormProps<T> {
    initialValue: T;
    validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({initialValue, validate}: UseFormProps<T>) {
    const [values, setValues]: [T, React.Dispatch<React.SetStateAction<T>>] = useState(initialValue);
    const [touched, setTouched]: [Record<string, boolean>, React.Dispatch<React.SetStateAction<Record<string, boolean>>>] = useState<Record<string, boolean>>({});
    const [errors, setErrors]: [Record<string, string>, React.Dispatch<React.SetStateAction<Record<string, string>>>] = useState<Record<string, string>>({});

    const handleChange = (name: keyof T, text: string) => {
        setValues((prev: any) => ({
            ...prev,  // 변형된 기존 값 유지
            [name]: text,
        }));
    };

    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true,
        });
    }
    // 이메일 인풋, 패스워드 인풋, 속성들을 쭉 가져오는것
    const getInputProps = (name: keyof T) => {
        const value: T[keyof T] = values[name];

        const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            handleChange(name, e.target.value);
        };

        const onBlur = () => handleBlur(name);

        return {value, onChange, onBlur};
    };

    // values가 변경될 때 마다 에러 검증 로직이 실행됨.
// { email: "" }
    useEffect(() => {
        const newErrors: Record<keyof T, string> = validate(values);
        setErrors(newErrors);
    }, [validate, values]);


    return {values, errors, touched, getInputProps};
}

export default useForm;

