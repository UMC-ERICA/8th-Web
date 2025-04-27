import {CommonResponse} from './common';

//sign up
export type RequestSignupDto = {
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    password: string;
};

export type ResponseSignupDto = CommonResponse<{
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}>

//login
export type RequestSigninDto = {
    email: string;
    password: string;
}

export type ResponseSigninDto = CommonResponse<{
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
}>;

// 내 정보 조회
export type ResponseMyInfoDto = CommonResponse<{
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}>

