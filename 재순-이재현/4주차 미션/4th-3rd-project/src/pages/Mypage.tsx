import {useEffect} from "react";
import {getMyInfo} from "../apis/auth.ts";
import {ResponseMyInfoDto} from "../types/auth.ts";

const MyPage = () => {
    useEffect(() => {
        const getData = async () => {
            const response: ResponseMyInfoDto = await getMyInfo();
            console.log(response);
        };

        getData();
    }, []);

    return <div>MyPage</div>;
};

export default MyPage;
