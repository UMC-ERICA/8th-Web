import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Movie, MovieDetailResponse, MovieResponse} from "../types/movie.ts";
import axios from "axios";
import useCustomFetch from "../src/hooks/useCustomFetch";

const MovieDetailPage = () => {
    const params = useParams();
    const url = `https://api.themoviedb.org/3/movie/${params.movieId}`

    const {isPending, isError, dats: movie} = useCustomFetch<MovieDetailResponse>(url)
    if (isPending) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return (
            <div>
                <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
            </div>
        );
    }
    console.log(params);
    return (
        <div>
            MovieDetailPage{params.movieId}
            {movie?.id}
            {movie?.production_companies.map((company) => company.name)}
            {movie?.original_title}
        </div>
    )
}

export default MovieDetailPage;