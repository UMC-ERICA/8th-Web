import {UserSignInInformation, validateSignin} from "../utils/validate.ts";
import useForm from "../hooks/useForm.ts";
import {postSignin} from "../apis/auth.ts";
import {useLocalStorage} from "../hooks/useLocalStorage.ts";
import {LOCAL_STORAGE_KEY} from "../constants/key.ts";


const LoginPage = () => {
    const {setItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {values, errors, touched, getInputProps} = useForm<UserSignInInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });


    const handleSubmit = async () => {
        const response = await postSignin(values);
        setItem(response.data.accessToken);
    };

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
            </div>
        </div>
    );
}
export default LoginPage;