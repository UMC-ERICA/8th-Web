import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import { MovieResponse } from "../types/movie";

export default function MoviePage() {
    const [page, setPage] = useState(1);
    const { category } = useParams<{
        category: string;
    }>();

    const url = `${import.meta.env.VITE_TMDB_BASEURL}/movie/${category}?language=ko-KR&page=${page}`

    const {data:movies, isPending, isError} = useCustomFetch<MovieResponse[]>(url);


    if (isError) {
        return ( 
        <div>
            <span className="absolute inset-0 flex justify-center
         items-center text-blue-800 text-8xl animate-bounce">에러가 발생했습니다.</span>
        </div> );
    }
    
    return (
        <>
        <div className="flex items-center justify-center gap-6 mt-5">
            <button
            className="bg-[#3b87f8] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#4e5492] transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
            disabled = {page==1}
            onClick={() : void => setPage((prev) : number => prev -1 )}>{'<'}</button>
            <span>{page} 페이지</span>
            <button
            className="bg-[#3b87f8] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#4e5492] transition-all duration-200 cursor-pointer"
            onClick={() : void => setPage((prev) : number => prev +1 )}>{'>'}</button>
        </div>

        {isPending && (
            <div className="flex items-center justify-center h-dvh">
                <LoadingSpinner />
            </div>
        )}
        
        {!isPending && (
  <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
    {movies?.results.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
)}
        </>
    );
}


