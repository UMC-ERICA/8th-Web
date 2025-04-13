export type UserSignInformation = {
  email: string;
  password: string;
}

function validateUserSignInformation(values: UserSignInformation) {
  const errors : {email : string, password : string} = {
    email : "",
    password : "",
  };

  if (!values.email) {
    errors.email = "이메일을 입력해주세요.";  
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "이메일 형식이 올바르지 않습니다.";
  }

  if (!values.password) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (values.password.length < 8) {
    errors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
  }

  return errors;
}


function validateSignin(values: UserSignInformation) {
  return validateUserSignInformation(values);
  
}

export {validateSignin};