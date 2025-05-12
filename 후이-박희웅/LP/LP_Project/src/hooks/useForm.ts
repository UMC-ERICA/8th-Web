import { ChangeEvent, useEffect, useState } from "react";

interface UseFormProps<T> {
  initialValues: T; // {email: "", password: ""}
  validate: (values: T) => Record<keyof T, string>; // {email: "이메일 형식이 올바르지 않습니다.", password: "비밀번호는 최소 8자 이상이어야 합니다."}
}

function useForm<T>({initialValues, validate}: UseFormProps<T>) {
  const [values, setValues] = useState(initialValues);

  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>();

  const [errors, setErrors] = useState<Record<keyof T, string>>();

  const handleChange = (name:keyof T , text: string) => {
    setValues({...values, [name]: text});
  }
  const handleBlur = (name:keyof T) => {
    setTouched({...touched, [name]: true});
  }
  
  const getInputProps = (name:keyof T) => {
    const value = values[name];

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
      handleChange(name, e.target.value);
    
    const onBlur = () => handleBlur(name);

    return {
      value,
      onChange,
      onBlur,
    }
  }
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [values, validate]);

  return {
    values,
    errors,
    touched,
    getInputProps,
  }

}

export default useForm;