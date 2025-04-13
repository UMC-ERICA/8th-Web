import { RequestSigninDto, RequestSignupDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSignupDto } from "../types/auth";
import axiosInstance from "./axios";

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
  const {data: responseData} = await axiosInstance.post(
    `/v1/auth/signup`,
    body
  );

  return responseData;
}

export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
  const {data: responseData} = await axiosInstance.post(
    `/v1/auth/signin`,
    body
  );

  return responseData;
}

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const {data: responseData} = await axiosInstance.get(
    `/v1/users/me`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  return responseData;
}
