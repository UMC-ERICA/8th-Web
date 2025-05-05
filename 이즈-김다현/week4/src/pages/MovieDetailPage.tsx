import { useParams } from "react-router-dom";
import { MovieDetailResponse } from "../types/movie";
import useCustomFetch from "../hooks/useCustomFetch";

const MovieDetailPage = () => {
    const params = useParams();
    const url = `${import.meta.env.VITE_TMDB_BASEURL}/movie/${params.movieId}`

    const {isPending, isError, data:movie} = useCustomFetch<MovieDetailResponse>(url, "ko-KR");

        if(isPending) {
            return <div>Loading..</div>
        }

        if (isError) {
            return ( 
            <div>
                <span className="absolute inset-0 flex justify-center
             items-center text-blue-800 text-8xl animate-bounce">에러가 발생했습니다.</span>
            </div> );
        }
    
        return (
            <div className="flex flex-col md:flex-row bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg max-w-6xl mx-auto mt-10">
              <img
                src={`${import.meta.env.VITE_TMDB_IMAGEURL}${movie?.poster_path}`}
                alt={movie?.title}
                className="w-full md:w-1/3 object-cover"
              />
          
              <div className="p-6 flex flex-col justify-center md:w-2/3">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{movie?.title}</h1>
                  <p className="text-blue-300 text-sm mb-2">평균 평점: {movie?.vote_average}</p>
                  <p className="text-blue-300 text-sm mb-2">개봉일: {movie?.release_date}</p>
                  <p className="text-blue-300 text-sm mb-2">상영 시간: {movie?.runtime}분</p>
                  <p className="text-blue-400 text-xl mb-4 italic">{movie?.tagline}</p>
          
                  <p className="text-sm text-gray-300 mb-6 leading-relaxed whitespace-pre-line">
                    {movie?.overview}
                  </p>
                </div>
              </div>
            </div>
          );
        }
export default MovieDetailPage;