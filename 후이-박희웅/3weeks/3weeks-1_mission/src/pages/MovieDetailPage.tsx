import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MovieInfo } from "../types/movieinfo";
import MovieText from "../components/MovieText";
import { MovieCredit } from "../types/moviecredit";
import useCustomFetch from "../hooks/useCustomFetch";

export default function MovieDeailPage() {
  const params = useParams<{category: string; id: string;}>();

  const {data: movieInfo, isPending : isPendingMovieInfo, isError : isErrorMovieInfo} = useCustomFetch<MovieInfo>
  (`${import.meta.env.VITE_TMDB_API_URL}/movie/${params.id}?language=${import.meta.env.VITE_TMDB_API_LANG}`);


  const {data: movieCredit, isPending : isPendingMovieCredit, isError : isErrorMovieCredit} = useCustomFetch<MovieCredit>
  (`https://api.themoviedb.org/3/movie/${params.id}/credits?language=ko-KR`);

  if (isErrorMovieInfo || isErrorMovieCredit) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <>
      {isPendingMovieInfo || isPendingMovieCredit && (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    )}

    {!isPendingMovieInfo && !isPendingMovieCredit && (
      <div className="p-10 grid gap-4">
        {movieInfo && movieCredit && (<MovieText movie={movieInfo} movieCredit={movieCredit}/>)}  
      </div>
    )}
    </>
  );
}
