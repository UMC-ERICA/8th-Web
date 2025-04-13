import axios from "axios";
import { useEffect, useState } from "react";

interface APIresponse<T> {
  data: T | null;
  isPending: boolean;
  isError: boolean;
}

  function useCustomFetch<T>(url: string) : APIresponse<T> {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);

      try {
        const {data} = await axios.get<T>(url,{
          headers:{
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setData(data);
        setIsPending(false);
      }catch{
        setIsError(true);
        setIsPending(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isPending, isError };
}

export default useCustomFetch;