import { axiosInstance } from "./axios";
import { CommentListResponse } from "../types/comment";
import { PAGINATION_ORDER } from "../enums/common";

export const getComments = async ({ 
  lpId, 
  cursor, 
  limit = 10, 
  order = PAGINATION_ORDER.desc 
}: { 
  lpId: number; 
  cursor?: number; 
  limit?: number;
  order?: PAGINATION_ORDER;
}): Promise<CommentListResponse> => {
  const response = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: { cursor, limit, order }
  });
  return response.data;
};

export const createComment = async ({ 
    lpId, 
    content 
  }: { 
    lpId: number; 
    content: string;
  }): Promise<CommentListResponse> => {
    const response = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
      content
    });
    return response.data;
  };

  export const updateComment = async ({ 
    lpId, 
    commentId, 
    content 
  }: { 
    lpId: number;
    commentId: number;
    content: string;
  }): Promise<CommentListResponse> => {
    const response = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, {
      content
    });
    return response.data;
  };

  export const deleteComment = async ({ 
    lpId, 
    commentId 
  }: { 
    lpId: number;
    commentId: number;
  }): Promise<void> => {
    await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
  };