import { useState } from "react";
import { Movie } from "../types/movie";
import { useNavigate, useParams } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({movie}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const params = useParams<{category: string}>();

  return (
    <div 
    onClick={() : void | Promise<void> => navigate(`/movies/${params.category}/${movie.id}`)}
    className='relative rounded-xl shadow-lg overflow-hidden cursor-pointer
    w-44 transition-transform duration-500 hover:scale-105'
    onMouseEnter={() : void => setIsHovered(true)}
    onMouseLeave={() : void => setIsHovered(false)}
    >

  <img 
    src={`${import.meta.env.VITE_TMDB_IMAGE_URL_W200}${movie.poster_path}`}
    alt={`${movie.title} 영화의 이미지`}
    className=""
  />

    {isHovered && (
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 
      td-transparent backdrop-blur-md flex flex-col justify-center 
      item-center text-white p-4">
        <h2 className='text-lg font-bold leading-snug'>{movie.title}</h2>
        <p className='text-sm text-gray-300 leading-relaxed mt-2
        line-clamp-3'> 
        {movie.overview}
        </p>
      </div>
    )}
    </div>
  );
};