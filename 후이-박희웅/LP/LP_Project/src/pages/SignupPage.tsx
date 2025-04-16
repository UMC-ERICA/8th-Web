import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";

const schema = z.object({
  email: z.string().email({message: "이메일 형식이 올바르지 않습니다."}),
  password: z.string().min(8, {message: "비밀번호는 최소 8자 이상이어야 합니다."}),
  name: z.string().min(1, {message: "이름을 입력해주세요."}),
  passwordConfirm: z.string().min(1, {message: "비밀번호 확인을 입력해주세요."})
}).refine((data) => data.password === data.passwordConfirm, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordConfirm"]
});

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormFields>({
    defaultValues: {
      email: "", 
      password: "", 
      name: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit : SubmitHandler<FormFields> = async (data) => {
    const { email, password, name } = data;

    const response = await postSignup({email, password, name});
    console.log(response);
  };

  return (
    <div className ="flex flex-col items-center justify-center h-full gap-4">
      <div className ="flex flex-col gap-3">
        <input 
          {...register("email")}
          name = "email"
          className ={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm 
          ${errors?.email ? "border-red-500 bg-red-50": "border-gray-300"}`} 
          type={"email"} 
          placeholder={"이메일"} />

        {errors?.email && <div className = "text-red-500 text-sm">{errors.email.message}</div>}
      
        <input 
          {...register("password")}
          className ={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-md
          ${errors?.password ? "border-red-500 bg-red-50": "border-gray-300"}`} 
          type={"password"} 
          placeholder={"비밀번호"} />

        {errors?.password && <div className = "text-red-500 text-sm">{errors.password.message}</div>}

        <input 
          {...register("passwordConfirm")}
          className ={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-md
          ${errors?.passwordConfirm ? "border-red-500 bg-red-50": "border-gray-300"}`} 
          type={"password"} 
          placeholder={"비밀번호 확인"} />

        {errors?.passwordConfirm && <div className = "text-red-500 text-sm">{errors.passwordConfirm.message}</div>}

        <input 
          {...register("name")}
          className ={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-md
          ${errors?.name ? "border-red-500 bg-red-50": "border-gray-300"}`} 
          type={"text"} 
          placeholder={"이름"} />

        {errors?.name && <div className = "text-red-500 text-sm">{errors.name.message}</div>}

        <button 
          type = "button" 
          onClick = {handleSubmit(onSubmit)} 
          disabled = {false}
          className ={"w-full bg-[#807bff] text-white p-[10px] rounded-md text-lg font-medium hover:bg-[#605bff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"}>
        회원가입</button>
      </div>
    </div>
  );
};

export default SignupPage;