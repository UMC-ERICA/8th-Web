import { useNavigate,useParams } from "react-router-dom";
import { Movie } from "../types/movies";
import { useState } from "react";

interface MovieCardProps {
    movie: Movie;
    category : string;

}

export default function MovieCard({movie}:MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const { category } = useParams();

    return (<div 
        onClick={() => navigate(`/movies/${category}/${movie.id}`)}
        className='relative rounded-xl shadow-lg overflow-hidden cursor-pointer w-44 transition-transform duration-500 hover:scale-105'
        onMouseEnter={()=> setIsHovered(true)}
        onMouseLeave={()=> setIsHovered(false)}> 
        
        <img src={`${import.meta.env.VITE_TMDB_URL}/w200${movie.poster_path}`}
        alt = {`${movie.title}영화의 이미지`}
        className=''
        />

        {isHovered &&(
            <div className='absolute inset-0 bg-gradient-to-t from black/50 to-transparent backdrop-blur-md flex flex-col justify-center items-center text-white'>
                <h2 className='text-lg font-bold leading-snug'>{movie.title}</h2>
                <p className='text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5'>{movie.overview}</p>
            </div>
        )}
    </div>
    );
}