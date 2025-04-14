import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {MovieResponse} from "../types/movie";
import MovieCard from "../components/LoadingSpinner";
import {LoadingSpinner} from "../components/LoadingSpinner";
import useCustomFetch from "../src/hooks/useCustomFetch";

const defualt function MovieDetailPage = () => {
    const params : Readonly<Params<string>> = useParams();

    //const [movies : Movie[], setMovie : React.Dispatch<React.SetStateAction> ] = useState<MovieDetailResponse>();
    // 1. 로딩 상태
   // const [isPending : boolean , setIsPending : React.Dispatch<React.SetStateAction>] = useState( initialState: false);
    // 2. 에러 상태
    //const [isError : boolean , setIsError : React.Dispatch<React.SetStateAction:>] = useState( initialState: false);

    const [page, setPage] = useState(false);

    const {category} = useParams<{
    category: string;
    }>();
    const url= `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`

    const{data:movies, isPending,isError} = useCustomFetch<MovieResponse>(url);


    //useEffect( effect: () => {
        //const fetchMovies = async () => {
            //setIsPending( value: true);

            //try {
                //const { data : MovieResponse } = await axios.get<MovieResponse>(
                   // url: `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
                   // config: {
                   // headers: {
                   //     Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                  //  },
              //  }
          //  );

             //   setMovies(data.results);
          //  } catch {
          //      setIsError( value: true);
          //  } finally {
         //       setIsPending( value: false);
         //   }
      //  };

     //   fetchMovies();
   // }, deps: [page, category]);

    if (isError) {
        return (
            <div>
                <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-center gap-6 mt-5">
                <button
                    className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition'
                    disabled={page === 1}
                    onClick={() => setPage( (prev : number ) => prev - 1)}
                >
                    {'<'}
                </button>
                <span>{page} 페이지</span>
                <button
                    className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition'
                    onClick={() => setPage((prev : number ) => prev + 1)}
                >
                    {'>'}
                </button>
            </div>
        </>
    );

    {isPending && (
        <div className="flex items-center justify-center h-dvh">
            <LoadingSpinner />
        </div>
    )}

    {!isPending && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    )}
}



    export default MovieDetailPage;