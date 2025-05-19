import { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
    id: number;
    name: string;
};

export type Likes = {
    id: number;
    userId: number;
    lpId:number;
}

export type Comment = {
    id: number;
    content:string;
    lpId: number;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    author: Author[];
          
}

export type Author = {
    id: number;
        name: string;
        email: string;
        bio: null;
        avatar: null;
        createdAt:Date;
        updatedAt: Date;
}

export type Lp={
    id: number;
        title: string;
        content: string;
        thumbnail: string;
        published: boolean;
        authorld: number;
        createdAt:Date;
        updatedAt: Date;
        tags: Tag[];
        likes: Likes[];
};

export type RequestLpDto = {
    lpId: number;
};
export type ResponseLpDto = CommonResponse<Lp>;
export type ResponseLpListDto = CursorBasedResponse<Lp[]>;
export type ResponseCommentDto = CursorBasedResponse<Comment[]>;
export type ResponseLikeLpDto = CommonResponse<{
    id:number;
    userId: number;
    lpId: number,
}>;