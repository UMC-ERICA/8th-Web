import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import { MovieResponse } from "../types/movie";

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const {category} = useParams<{category: string}>();
  //.env파일에 만들어서 하려했는데 안되서 이렇게 함
  const url = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`;

  const {data: movies, isPending, isError} = useCustomFetch<MovieResponse>(url);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    )
  }


  return (
    <>
    <div className="flex items-center justify-center gap-6 mt-5">
      <button 
        className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
        hover:bg-[#c783d9] transition-all duration-200 disabled:bg-gray-300
        cursor-pointer disabled:cursor-not-allowed'
        disabled={page === 1}
        onClick={() : void => setPage(prev => prev - 1)}>
      {`<`}</button>
      <span>{page}페이지</span>
      <button
        className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
        hover:bg-[#c783d9] transition-all duration-200 cursor-pointer'
        disabled={page === 500}
        onClick={() : void => setPage(prev => prev + 1)}>
      {`>`}</button>
    </div>
    
    {isPending && (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    )}

    {!isPending && (
      <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 
      md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies ? (
          movies.results.map((movie) => 
            (<MovieCard key={movie.id} movie={movie} />)
          )
        ) : (
          <div className="col-span-full text-center text-gray-500">
            데이터가 없습니다.
          </div>
        )}
      </div>
    )}
    </>
  );
}
