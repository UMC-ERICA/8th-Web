import { useEffect, useState } from "react";
import axios from 'axios';
import { Movie, MovieResponse } from "../types/movies";
import {LoadingSpinner} from "../components/LoadingSpinner"
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCards";

export default function MoviePage() {
    const [movies,setMovies] = useState<Movie[]>([]);

    const[isPending,setIsPending] = useState(false);

    const[isError,setIsError] = useState(false);

    const[page,setPage] = useState(1);

    const {category} = useParams<{
        category: string; }>();

    useEffect(():void=>{
        const fetchMovies = async () : Promise<void> =>{
            setIsPending(true);

            try{
                const {data} = await axios.get<MovieResponse>(
                    `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
                    
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                           
                        },
                    }
                );
                setMovies(data.results);
            } catch{
                setIsError(true);
                console.error();
            } finally{
                setIsPending(false);
            }
        };    
            
        fetchMovies();
        
    },[page,category]);

    if (isError) {
        return <div>
            <span className='text-red-500 text-2xl'>에러가 발생했습니다</span>
        </div>
    }

    
    return (
        <>
        <div className='flex items-center justify-center gap-6 mt_5'>
            <button 
            className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md 
            hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
            cursor-pointer disabled:cursor-not_allowed'
            disabled = {page===1}
            onClick={() => setPage((prev) : number => prev -1)}>
            {`<`}</button>
            <span>{page}페이지</span>
            <button 
            className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md 
            hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
            cursor-pointer disabled:cursor-not_allowed'
            onClick ={() => setPage((prev):number => prev+1)}> {`>`} </button>
        </div>
        {isPending && (
            <div className=' flex items-center justify-center h-dvh'>
            <LoadingSpinner/></div>)}
        {!isPending &&(
            <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            { movies&&movies.map((movie): React.ReactElement => (
             <MovieCard key ={movie.id} movie={movie} category={category!} />
            ))}
    </div>
        )}
        </>
        
    );
}