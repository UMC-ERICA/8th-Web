import {Movie} from "../types/movie";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface MovieCardProps {
    movie: Movie;
}
export default function Moviecard({movie}: MovieCardProps): Element {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    return (
    <div 
    onClick={() => {
        navigate(`/movies/now_playing/${movie.id}`);
    }}
    className ='relative rounded-xl shadow-lg overflow-hidden cursor-pointer
    w-44 transition-transform duration-300 hover:scale-105'
        onMouseEnter = {() => setIsHovered(true)} 
        onMouseLeave = {(): void => setIsHovered(false)}
        >
        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={`${movie.title}의 이미지`}
        className=""
        />

        {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from black/50 to-transparent backdrop-blut-md 
            flex-col justify-center items-center text-white p-4">
            <h2 className="text-lg font bold leading-snug">{movie.title}</h2>
            <p className="text-sm text-gray-300 leading-relaxed mt-2
            line-clamp-5">
                {movie.overview}</p>
            </div>
            )}
    </div>
    );
}