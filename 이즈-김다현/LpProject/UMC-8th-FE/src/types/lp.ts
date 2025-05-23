import { CommonResponse, CursorBasedResponse } from "./common.ts";

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type Lp = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    tags: Tags[];
    likes: Likes[];
}


export type Tags = {
    id: number;
    name: string;
};

export type Likes = {
    id : number;
    userId: number;
    lpId: number;
};

export type RequestLpDto = {
    lpId: number;
};

export type ResponseLpDto = CommonResponse<Lp>

export type ResponseLikeLpDto = CommonResponse<{
    id: number;
    userId: number;
    lpId: number;
}>;