
import { ResponseCommentDto } from "../types/lp";
import { CommentPaginationDto } from "../types/common";
import { axiosInstance } from "./axios";


export const getCommentList = async(params: CommentPaginationDto):Promise<ResponseCommentDto> =>{
    const{lpId, ...commentPaginationDto} = params;
    const {data} = await axiosInstance.get(`/v1/lps/${lpId}/comments`,{
        params:commentPaginationDto
        
    });
    return data;
}

