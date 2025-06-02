import { useState } from "react";
import type { Movie } from "../types/movie";
import Modal from "./Modal";
import { axiosClient } from "../apis/axiosClient";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({movie} : MovieCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieDetail, setMovieDetail] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage = "https://images.ctfassets.net/em6l9zw4tzag/XSTZBaleYdbbtE4oiJesW/7709970e4cca45b0850617837206c4c1/1023_CRT9_404-hero.jpg?w=2520&h=945&q=50&fm=webp"
  
  const handleClick = async () => {
    setIsModalOpen(true);
    setIsLoading(true);
    try {
      const { data } = await axiosClient.get(`/movie/${movie.id}`, {
        params: {
          language: "ko-KR",
        }
      });
      setMovieDetail(data);
    } catch (error) {
      console.error("영화 정보를 가져오는데 실패했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div 
        className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
        onClick={handleClick}
      >
        <div className="relative h-80 overflow-hidden">
          <img 
            src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}`: fallbackImage} 
            alt={`${movie.title} 포스터`} 
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105" 
          />
          <div className="absolute right-2 top-2 rounded-md bg-blue-400 px-2 py-1 text-sm font-bold text-white">
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-lg font-bold text-gray-800">{movie.title}</h3>
          <p className="text-sm text-gray-600">
            {movie.release_date} | {movie.original_language.toUpperCase()}
          </p>
          <p className="mt-2 text-sm text-gray-700">
            {movie.overview.length > 100 ? `${movie.overview.slice(0,100)}...` : movie.overview}
          </p>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <p className="text-lg">로딩 중입니다...</p>
          </div>
        ) : movieDetail ? (
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-96 w-full object-cover md:w-64"
                src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
                alt={movieDetail.title}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {movieDetail.release_date}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {movieDetail.title}
              </h1>
              <p className="mt-4 text-gray-600">{movieDetail.overview}</p>
              <div className="mt-4">
                <span className="text-gray-600">평점: </span>
                <span className="text-yellow-500 font-bold">
                  {movieDetail.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-600 ml-2">
                  ({movieDetail.vote_count}명 참여)
                </span>
              </div>
              <div className="mt-4">
                <span className="text-gray-600">원제목: </span>
                <span className="font-medium">{movieDetail.original_title}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-96">
            <p className="text-lg text-red-500">영화 정보를 불러오는데 실패했습니다.</p>
          </div>
        )}
      </Modal>
    </>
  );
}

export default MovieCard;