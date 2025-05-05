import { PaginationDto } from "../types/common";
import { axiosInstance } from './axios.ts';

export const getLPList = async (paginationDto: PaginationDto) => {
    const { data } = await axiosInstance.get('/v1/lps', {
        params: paginationDto,
    });

    return data;
};