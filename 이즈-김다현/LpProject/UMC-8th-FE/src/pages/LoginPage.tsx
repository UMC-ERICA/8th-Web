import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/vaildate";
import { useNavigate } from "react-router-dom";
import logo from "../image/logo.png"; 

const LoginPage = () => {
    const { login, accessToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            navigate("/")
        }
    }, [navigate, accessToken]);


    const { values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });

    const handleSubmit = async () => {
        await login(values);
    };

    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
    }

    const isDisabled = Object.values(errors || {}).some((error) => error.length > 0) || 
    Object.values(values).some((value) => value === "");

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 bg-black">
            <div className="flex flex-col gap-3 text-violet-50">

                <input 
                {...getInputProps("email")}
                name="email"
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-b-sm" ${errors?.email && touched?.email ? "border-red-400 bg-red-200" : "border-gray-300"}`}
                type={"email"} 
                placeholder={"이메일"} />
                {errors?.email && touched?.email && (
                    <div className="text-red-400 text-sm">{errors.email}</div>
                )}

                <input 
                {...getInputProps("password")}
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-b-sm" ${errors?.password && touched?.password ? "border-red-400 bg-red-200" : "border-gray-300"}`}
                type={"password"}
                placeholder={"비밀번호"} />
                {errors?.password && touched?.password && (
                    <div className="text-red-400 text-sm">{errors.password}</div>
                )}

                <button
                type="button" 
                onClick={handleSubmit} 
                disabled={isDisabled}
                className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-200 transition-colors cursor-pointer disabled:bg-gray-400">
                    로그인
                </button>

                <button
                type="button" 
                onClick={handleGoogleLogin} 
                className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-200 transition-colors cursor-pointer disabled:bg-gray-400">
                    <div className="flex items-center justify-center gap-4">
                        <img src={logo} alt="Google Logo image" className="w-8 h-8" />
                        <span> 구글 로그인 </span>
                    </div>
                </button>
            </div>
        </div>
    )
};

export default LoginPage;