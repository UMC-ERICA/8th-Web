import {UserSigninInformation, validateSignin} from '../utils/validate';
import useForm from "../hooks/useForm"
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const LoginPage = () => {
    const navigate = useNavigate();
    const {login, accessToken} = useAuth();

    useEffect(() => {
        if (accessToken) {
            navigate('/my');
        }
    }, [navigate, accessToken]);

    const {values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    })

    const handleSubmit = async () => {
        await login(values);
    };

    const handleGoogleLogin = async () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/v1/auth/google/login`;
    }

    //오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
    const isDisabled = 
    Object.values(errors || {}).some((error) => (error as string).length > 0) ||  //오류가 있으면 true
    Object.values(values).some((value) => value === ""); //입력값이 비어있으면 true

    return (
        <div className = 'flex flex-col items-center justify-center h-full gap-4'>
            <div className='w-[300px] bg-black text white flex flex-col gap-4'>
                <div className = 'flex items-center gap-2 text-base font-semibold mb-1'>
                    <button onClick={() => navigate('/')} className='text-2xl hover:text-pink-500'>
                        &lt;
                    </button>
                    <h1 className='text-center w-full -ml-4'>로그인</h1>
                </div>

                <button
                    type = 'button'
                    className='flex items-center justify-center border border-white py-[10px] px-[10px] rounded-sm
                    gap-2 hover:bg-white hover:text-black transition-colors text-base w-full'
                    onClick = {handleGoogleLogin}>
                    <span>구글 로그인</span>
                </button>

                <div className='flex items-center gap-3'>
                    <div className='flex-1 h-px bg-gray-600' />
                    <span className='text-sm text-gray-400'>OR</span>
                    <div className='flex-1 h-px bg-gray-600' />
                </div>

            
                <input
                    {...getInputProps("email")}
                    name="email"
                    className= {`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type = {"email"}
                    placeholder={"이메일"}
                />
                {errors?.email && touched?.email && (
                    <div className='text-red-500 text-sm'>{errors.email}</div>
                )}
                <input
                    {...getInputProps("password")}
                    className= {`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type = {"password"}
                    placeholder={"비밀번호"}
                />
                {errors?.password && touched?.password && (
                    <div className='text-red-500 text-sm'>{errors.password}</div>
                )}
                <button
                    type='button'
                    onClick={handleSubmit} disabled={isDisabled} 
                    className = 'w-full bg-green-600 text-white py-3 rounded-md text-lg font-medium hover:bg-green-700 transition-colors cursor-pointer disabled:bg-gray-300'
                >
                    로그인
                </button>
        
            </div>
            
        </div>
    );
}

export default LoginPage;