import { axiosInstance } from "./axios"
import { PaginationDto } from "../types/common.ts";
import { ResponseLpDto, ResponseLikeLpDto, RequestLpDto, ResponseCommentDto } from "../types/lp.ts";


export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpDto> => {
  const {data} = await axiosInstance.get("/v1/lps", {
    params: paginationDto
  });

  return data;
};

export const getLpDetail = async ({
  lpid,
} : RequestLpDto): Promise<ResponseLpDto> => {
  const {data} = await axiosInstance.get(`/v1/lps/${lpid}`);

  return data;
}

export const postLike = async ({
  lpid,
} : RequestLpDto) : Promise<ResponseLikeLpDto> => {
  const {data} = await axiosInstance.post(`/v1/lps/${lpid}/likes`);

  return data;
}
export const deleteLike = async ({
  lpid,
} : RequestLpDto) : Promise<ResponseLikeLpDto> => {
  const {data} = await axiosInstance.delete(`/v1/lps/${lpid}/likes`);

  return data;
}
export const getCommentList = async ({
  lpid,
} : RequestLpDto) : Promise<ResponseCommentDto> => {
  const {data} = await axiosInstance.get(`/v1/lps/${lpid}/comments`);

  return data;
}