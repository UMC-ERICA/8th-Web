import useForm from "../hooks/useForm";
import { UserSignInformation, validateSignin } from "../utils/validate";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";

const LoginPage = () => {
  const {setItem} = useLocalStorage("accessToken");
  const {values, errors, touched, getInputProps,} = useForm<UserSignInformation>({
    initialValues: {email: "", password: ""},
    validate: validateSignin,
  });
  
  const handleSubmit = async () => {
    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
      console.log(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
        console.error(error);
      } else {
        alert("로그인에 실패했습니다.");
      }
    }
  }

  const isDisabled  = 
    Object.values(errors || {}).some((error) => error.length > 0 ||
    Object.values(values).some((value) => value.length === 0));
  
  return (
    <div className ="flex flex-col items-center justify-center h-full gap-4">
      <div className ="flex flex-col gap-3">
        <input 
          {...getInputProps("email")}
          className ={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm 
            ${errors?.email && touched?.email ? "border-red-500 bg-red-50": "border-gray-300"}`} 
          type={"email"} 
          placeholder={"이메일"} />
        {errors?.email && touched?.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
        <input 
          {...getInputProps("password")}
          className ={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-md
            ${errors?.password && touched?.password ? "border-red-500 bg-red-50": "border-gray-300"}`} 
          type={"password"} 
          placeholder={"비밀번호"} />
        {errors?.password && touched?.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
        <button 
          type = "button" 
          onClick = {handleSubmit} 
          disabled = {isDisabled}
          className ={"w-full bg-[#807bff] text-white p-[10px] rounded-md text-lg font-medium hover:bg-[#605bff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"}>
        로그인</button>
      </div>
    </div>
  );
};

export default LoginPage;