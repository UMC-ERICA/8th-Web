import {CommonResponse, CursurBasedResponse} from './common.ts';

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
  name: string;
  email: string;
};

export type Author = {
  id: number;
  name: string;
  profileImage: string;
};

export type Lp={
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    likes: Likes[];
};

export type RequestLpDto = {
  lpid: number;
};

export type ResponseLpDto = CommonResponse<Lp>;
export type ResponseLpListDto = CursurBasedResponse<Lp[]>;
export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;
export type ResponseCommentDto = CommonResponse<{
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author[];
}>;