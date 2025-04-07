import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieDetails } from "../types/detail";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieInfo from "../components/MovieInfo";

export default function MovieDetailPage() {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [detail, setDetail] = useState<MovieDetails | null>(null);

  const { movieId } = useParams<{ category: string; movieId: string }>();

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsPending(true);
      try {
        const { data } = await axios.get<MovieDetails>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setDetail(data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-3xl text-red-500"> 에러가 발생했습니다... </div>
    );
  }

  if (isPending || !detail) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  

  return (
    <div>
  
      {isPending && (
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner />
        </div>
      )}
      {!isPending && detail && (
        <div className="p-10 max-w-4xl mx-auto">
          <MovieInfo detail={detail} />
        </div>
      )}
    </div>
  );
}