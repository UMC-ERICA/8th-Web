import { MovieDetails } from "../types/detail";

interface MovieInfoProps {
  detail: MovieDetails;
}

export default function MovieInfo({ detail }: MovieInfoProps) {
  return (
    <div className="flex bg-gray-900 text-white rounded-xxl overflow-hidden shadow-lg">
      <img
        src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
        alt={detail.title}
        className="bg-center"
      />

      <div className="p-6 flex flex-col justify-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">{detail.title}</h1>
          <p className="text-blue-300 text-sm mb-2"> 평균 {detail.vote_average}</p>
          <p className="text-blue-300 text-sm mb-2">개봉일: {detail.release_date}</p>
          <p className="text-blue-300 text-sm mb-2">상영 시간: {detail.runtime}</p>
          <p className="text-blue-400 text-xl mb-2">{detail.tagline}</p>
          <p className="text-sm text-gray-300 mb-2 leading-relaxed line-clamp-6">
            {detail.overview}
          </p>
        </div>

        <ul className="text-sm text-gray-400 space-y-5"></ul>
      </div>
    </div>
  );
}