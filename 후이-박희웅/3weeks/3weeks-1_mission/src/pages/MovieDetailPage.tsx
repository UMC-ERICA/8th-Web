import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MovieInfo } from "../types/movieinfo";
import MovieText from "../components/MovieText";
export default function MovieDeailPage() {
  const [movieInfo , setMovieInfo] = useState<MovieInfo | null>(null);
  //1. 로딩 상태
  const [isPending, setIsPending] = useState(false);
  //2. 오류 상태
  const [isError, setIsError] = useState(false);

  const params = useParams<{category: string; id: string;}>();

  useEffect(() : void => {
    const fetchMovies = async () :Promise<void>=> {
      setIsPending(true);
      
      try{
        const {data}= await axios.get<MovieInfo>(
          `https://api.themoviedb.org/3/movie/${params.id}?language=ko-KR `,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
            },
          }
        );
        setMovieInfo(data);
      }catch{
        setIsError(true);
      }finally{
        setIsPending(false);
      }
    };

    fetchMovies();
  }, [params.id]);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <>
      {isPending && (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    )}

    {!isPending && (
      <div className="p-10 grid gap-4">
        {movieInfo && (<MovieText movie={movieInfo} />)}
    </div>
    )}
    </>
  );
}
