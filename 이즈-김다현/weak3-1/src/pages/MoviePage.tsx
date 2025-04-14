import { useEffect, useState } from "react";
import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";

export default function MoviePage() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect((): void => {
        const fetchMovies = async () : Promise<void> => {
            const {data} = await axios.get<MovieResponse>('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=2', // axios는 get으로 이뤄져 있음
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                }
            );

            setMovies(data.results);
        };

        fetchMovies();
    }, []);

    
    return (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
            {movies && movies.map((movie) : React.ReactElement => (
            <MovieCard key = {movie.id} movie={movie} />
        ))}</div>
    );
}


