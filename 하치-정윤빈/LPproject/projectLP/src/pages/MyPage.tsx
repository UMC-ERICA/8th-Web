import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResopnseMyInfoDto } from "../types/auth";

const MyPage = () =>{
    const [data, setData] = useState<ResopnseMyInfoDto>();

    useEffect(()=>{
        const getData = async() => {
            const response = await getMyInfo();
            console.log(response);
            setData(response)
        };
        getData();
    },[]);

    return (
        <div>{data?.data.name} {data?.data.email}</div>
    )
};
export default MyPage;