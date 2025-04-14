import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {z} from "zod";
import { postSignup } from "../apis/auth";

const schema = z.object({
    email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
//비밀번호
    password: z.string()
    .min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
    })
    .max(20, {
        message: "비밀번호는 20자 이하여야 합니다."
    }),
//비밀번호 체크
    passwordCheck: z.string()
    .min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
    })
    .max(20, {
        message: "비밀번호는 20자 이하여야 합니다."
    }),
// 이름  
    name: z.string().min(1, {
        message: "이름을 입력해 주세요."
    })
})
    .refine((data) => data.password === data.passwordCheck, {
        message: "비밀번호가 일치하지 않습니다",
        path: ['passwordCheck'],
    });



type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
    const { register, handleSubmit, formState: {errors, isSubmitted}} = useForm<FormFields>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordCheck: "",
        },
        resolver: zodResolver(schema),
        mode: "onBlur",
    });

    const onSubmit:SubmitHandler<FormFields> = async (data) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordCheck, ...rest } = data;

        const response = await postSignup(rest);

        console.log(response);
    };


    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">

                <input //이메일
                {...register('email')}
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-b-sm" 
                ${errors?.email ? "border-red-400 bg-red-200" : "border-gray-300"}`}
                type={"email"} 
                placeholder={"이메일"} />

                {errors.email && 
                <div className={'text-red-400 text-sm'}>{errors.email.message}</div>
                }

                <input  //비번
                {...register('password')}
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-b-sm" 
                ${errors?.password ? "border-red-400 bg-red-200" : "border-gray-300"}`}
                type={"password"}
                placeholder={"비밀번호"} />

                {errors.password && 
                <div className={'text-red-400 text-sm'}>{errors.password.message}</div>
                }

                <input  //비번 체크
                {...register('passwordCheck')}
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-b-sm" 
                ${errors?.passwordCheck ? "border-red-400 bg-red-200" : "border-gray-300"}`}
                type={'password'}
                placeholder={"비밀번호 확인"} />

                {errors.passwordCheck && 
                <div className={'text-red-400 text-sm'}>{errors.passwordCheck.message}</div>
                }

                <input  //이름
                {...register('name')}
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-b-sm" 
                ${errors?.password ? "border-red-400 bg-red-200" : "border-gray-300"}`}
                type={"name"}
                placeholder={"이름"} />

                {errors.name && 
                <div className={'text-red-400 text-sm'}>{errors.name.message}</div>
                }

                <button
                disabled = {isSubmitted}
                type="button" 
                onClick={handleSubmit(onSubmit)} 
                className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-200 transition-colors cursor-pointer disabled:bg-gray-400">
                    회원가입
                </button>
            </div>
        </div>
    )
}

export default SignupPage;