import { postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useForm from "../hooks/useForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { UserSigninInformation, validateSignin } from "../utils/vaildate";

const LoginPage = () => {
    const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
    const { values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });

    const handleSubmit = async () => {
        console.log(values);

        try {
            const response = await postSignin(values);
            setItem(response.data.accessToken);
            console.log(response);
            // Navigate("/my");
        } catch (error: unknown) {
            if (error instanceof Error) {
              alert(error.message);
            } else {
              alert("알 수 없는 에러가 발생했습니다.");
            }
          }
        
    };

    const isDisabled = Object.values(errors || {}).some((error) => error.length > 0) || Object.values(values).some((value) => value === "");

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">

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
            </div>
        </div>
    )
};

export default LoginPage;