import { MovieInfo } from "../types/movieinfo";
import { MovieCredit } from "../types/moviecredit";

interface MovieTextProps {
  movie: MovieInfo;
  movieCredit: MovieCredit;
}

const TMDB_IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

export default function MovieText({ movie, movieCredit }: MovieTextProps) {
  const profileImageClass = "w-20 h-20 rounded-full";

  return (
    <div className="flex flex-row gap-6 p-4 bg-white rounded-lg shadow-md w-full h-full min-h-screen">
      <div className="w-1/3">
        <img
          src={`${TMDB_IMAGE_URL}${movie.poster_path}`}
          alt={`${movie.title} 영화의 이미지`}
          className="w-full h-auto rounded-lg shadow-sm object-cover"
        />
      </div>
      <div className="w-2/3">
        <h2 className="text-5xl font-bold mb-3 text-gray-800">{movie.title}</h2>
        <p className="text-gray-600 leading-relaxed text-xl whitespace-normal">{movie.overview}</p>

        <div className="flex flex-row gap-2">
          <span className="text-gray-600 text-sm">평점: {movie.vote_average}</span>
          <span className="text-gray-600 text-sm">좋아요: {movie.vote_count}</span>
        </div>

        <div className="flex flex-row gap-2">
          <span className="text-gray-600 text-sm">개봉일: {movie.release_date}</span>
          <span className="text-gray-600 text-sm">상영시간: {movie.runtime}분</span>
        </div>

        <div className="flex flex-row items-center gap-2">
          <span className="text-gray-600 text-sm">제작사: {movie.production_companies[0].name}</span>
          <img
            src={`${TMDB_IMAGE_URL}${movie.production_companies[0].logo_path}`}
            alt={`${movie.production_companies[0].name} 로고`}
            className="w-10 h-10 rounded-full"
          />
        </div>

        <div className="flex flex-row gap-2">
          <span className="text-gray-600 text-sm">장르: {movie.genres[0].name}</span>
        </div>

        <div className="flex flex-wrap gap-4 p-5 rounded-lg shadow-md mt-10 mb-10 max-h-[600px] overflow-y-auto">
          {movieCredit.cast.map((cast) => (
          <div key={cast.id} className="flex flex-col items-center">
            <img
              src={`${TMDB_IMAGE_URL}${cast.profile_path}`}
              alt={`${cast.name} 프로필 이미지`}
              className={profileImageClass}
            />
            <span className="text-xl text-gray-800 mt-2">출연: {cast.name}</span>
          </div>
          ))}
          </div>
      </div>
    </div>
  );
}