import {UserSignInInformation, validateSignin} from "../utils/validate.ts";
import useForm from "../hooks/useForm.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const {login,accessToken} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
    }, [navigate,accessToken]);

    const {values, errors, touched, getInputProps} = useForm<UserSignInInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin
    });


    const handleSubmit = async () => {
            await login(values);
    };

    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_API_URL + "/v1/auth/google/login";
    }


    const isDisabled: boolean =
        Object.values(errors || {}).some((error: string) => error.length > 0) || // 에러가 있으면 true
        Object.values(values).some((value: string) => value === "");            // 입력값이 비어 있으면 true


    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">
                <input
                    {...getInputProps("email")}
                    name="email"
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm"
                    ${errors?.email && touched?.email ? "border-red-500 bf-red-200" : "border-gray-300"}`}
                    type={"email"}
                    placeholder={"이메일"}
                />
                {errors?.email && touched.email && (
                    <div className='text-red-500 text-sm'>{errors.email}</div>
                )}
                <input
                    {...getInputProps("password")}
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm"
                    ${errors?.email && touched?.email ? "border-red-500 bf-red-200" : "border-gray-300"}`}
                    type={"password"}
                    placeholder={"비밀번호"}
                />
                {errors?.password && touched.password && (
                    <div className='text-red-500 text-sm'>{errors.password}</div>
                )}
                <button type="button"
                        onClick={handleSubmit}
                        disabled={isDisabled}
                        className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
                >로그인
                </button>
                <button type="button"
                        onClick={handleGoogleLogin}
                        disabled={isDisabled}
                        className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
                >
                    <div className = "flex items-center" gap-4>
                        <img src="Google__G__logo.svg" alt="Google Logo"/>
                        <span>구글 로그인</span>
                    </div>
                </button>
            </div>
        </div>
    );
}
export default LoginPage;