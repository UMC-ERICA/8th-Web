
import {z} from 'zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSignup } from '../apis/auth';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';



const schema = z.object({
    email: z.string().email({message: "올바른 이메일 형식을 입력해주세요."}),
    password: z.string().min(8,{
        message: "비밀번호는 8자 이상이어야 합니다.",}).max(20, {
        message: "비밀번호는 20자 이상이어야 합니다.",}),
    passwordCheck: z.string().min(8,{
        message: "비밀번호는 8자 이상이어야 합니다.",}).max(20, {
        message: "비밀번호는 20자 이상이어야 합니다.",}),
    name: z.string().min(1, {message: "닉네임을 입력해주세요."}),
}).refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ['passwordCheck'],
});

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}, getValues, watch } = useForm<FormFields>({
        resolver: zodResolver(schema),
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
            passwordCheck: '',
            name: '',
        },

    })

    const email = watch("email");
    const password = watch("password");
    const passwordCheck = watch("passwordCheck");
    const name = watch("name");

    const emailValid = !errors.email && email !== "";
    const passwordValid = !errors.password && !errors.passwordCheck && password !== "" && passwordCheck !== "";
    const nameValid = !errors.name && name !== "";


    const onSubmit: SubmitHandler<FormFields> = async(data) => {
        const {passwordCheck, ...rest} = data;

        const response = await postSignup(rest);

        if (response.status){
            alert('회원가입이 완료되었습니다.');
            navigate('/my');
        }
        console.log(response);
    }
        
    return (
        <div className = 'flex flex-col items-center justify-center h-full gap-4'>
            <div className='w-[300px] bg-black text white flex flex-col gap-4'>
                <div className="flex items-center gap-2 text-base font-semibold mb-1">
                     <button onClick={() => (step === 1 ? navigate('/') : setStep(step-1))}
                            className="text-2xl hover:text-pink-500">
                            &lt;
                     </button>
                    <h1 className="text-center w-full -ml-4">회원가입</h1>
                </div>

                {step === 1 && (
                    <>
                        <button className = 'flex items-center justify-center border border-white py-[10px] rounded-sm gap-2 hover:bg-white hover:text-black transition-colors text-base w-full'>
                            <span>구글 로그인</span>
                        </button>
                        
                        <div className='flex items-center gap-3'>
                            <div className='flex-1 h-px bg-gray-600' />
                            <span className='text-sm text-gray-400'>OR</span>
                            <div className='flex-1 h-px bg-gray-600' />
                        </div>
                    </>
                )}
                {step === 1 && (
                    <>
                        <input
                        {...register("email")}
                        className= {`border w-full p-[10px] rounded-sm bg-black text-white
                            ${errors.email ? "border-red-500 bg-red-200 text black"  : "border-gray-300"}`}
                        placeholder="이메일을 입력해주세요"
                        type = {"email"}
                        />
                        {errors.email && (
                            <div className={'text-red-500 text-sm'}>{errors.email.message}</div>
                        )}

                        <button
                            onClick={() => setStep(2)}
                            disabled={!emailValid}
                            className='w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-400 transition-colors disabled:bg-gray-300'>
                                다음
                         </button>
                    </>
                )}

                {step === 2 && (
                    <>
                    <div className='flex items-center gap-2'>
                        <span className='text-white text-sm'>
                            {getValues('email')}
                        </span>
                    </div>

                    <div className='relative'>
                        <input
                            {...register("password")}
                             className= {`border w-full p-[10px] rounded-sm bg-black text-white 
                            ${errors.password ? "border-red-500 bg-red-200 text-black" : "border-gray-300"}`}
                            placeholder= "비밀번호를 입력해주세요"
                            type = {showPassword ? 'text' : 'password'}
                        />
                        <button
                            type = 'button'
                            onClick = {() => setShowPassword((prev) => !prev)}
                            className='absolute right-2 top-1/2 -translate-y-1/2 text-xl text-white'>
                                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </button>
                        </div>
                        {errors.password && (
                        <div className={'text-red-500 text-sm'}>{errors.password.message}</div>
                        )}

                    <div className='relative'>
                        <input
                           {...register("passwordCheck")}
                            className= {`border w-full p-[10px] rounded-sm bg-black text-white
                            ${errors.passwordCheck ? "border-red-500 bg-red-200 text-black" : "border-gray-300"}`}
                            placeholder="비밀번호를 다시 한 번 입력해주세요"
                            type = {showPasswordCheck ? 'text' : 'password'}
                        />
                        <button
                            type = 'button'
                            onClick = {() => setShowPasswordCheck((prev) => !prev)}
                            className='absolute right-2 top-1/2 -translate-y-1/2 text-xl text-white'>
                                {showPasswordCheck ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </button>
                        </div>
                        {errors.passwordCheck && (
                            <div className={'text-red-500 text-sm'}>{errors.passwordCheck.message}</div>
                         )}

                    <button
                        onClick={() => setStep(3)}
                        disabled={!passwordValid}
                        className='w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-400 transition-colors disabled:bg-gray-300'>
                            다음
                        </button>
                    </>
                )}
                
                {step === 3 && (
                    <>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-[100px] h-[100px] rounded-full bg-gray-400" />
                            <span className="text-white">{getValues('email')}</span>
                        </div>

                        <input
                            {...register("name")}
                            className= {`border w-full p-[10px] rounded-sm bg-black text-white
                            ${errors.name ? "border-red-500 bg-red-200 text-black" : "border-gray-300"}`}
                            placeholder="닉네임을 입력해주세요"
                            type = 'text'
                        />
                        {errors.name && (
                            <div className={'text-red-500 text-sm'}>{errors.name.message}</div>
                        )}

                        <button
                            type='button'
                            onClick={handleSubmit(onSubmit)}
                            disabled={!nameValid}
                            className='w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-400 transition-colors disabled:bg-gray-300'>
                                회원가입 완료
                            </button>
                    </>
                )}
            </div>
        </div>      
    );
};

export default SignupPage;