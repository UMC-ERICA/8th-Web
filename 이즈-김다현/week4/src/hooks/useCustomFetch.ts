import axios from "axios";
import { useEffect, useState } from "react";

interface ApiResponse<T> {
    data: T | null;
    isPending: boolean;
    isError: boolean;
}

type Language = "ko-KR" | "en-US";

function useCustomFetch<T>(url:string, language: Language = "ko-KR"): ApiResponse<T> {
    const [data, setdata] = useState<T | null>(null);
    const [isPending, setisPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setisPending(true);

            try {
                const { data } = await axios.get<T>(url, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                    params: {
                        language,
                    }
                });

                setdata(data)
            } catch{
                setIsError(true);
            } finally {
                setisPending(false);
            }
        };
        fetchData();
    }, [url, language]);

    return {data, isPending, isError};
}

export default useCustomFetch;