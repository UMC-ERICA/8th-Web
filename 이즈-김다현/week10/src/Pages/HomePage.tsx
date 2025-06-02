import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch"
import type { MovieFilters, MovieResponse } from "../types/movie";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "",
    include_adult: false,
    language: "ko-KR",
  });

  const axiosRequestConfig = useMemo(() => ({
    params: {
      ...filters,
      page: 1,
    },
  }), [filters])

  const { data, error, isLoading } = useFetch<MovieResponse>(
    filters.query ? "/search/movie" : "/movie/popular",
    axiosRequestConfig,
  );


  const handleMovieFilters = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    }, [setFilters],
  )

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg">로딩 중입니다...</p>
        </div>
      ) : (
        <div className="mt-8">
          <MovieList movies={data?.results || []} />
        </div>
      )}
    </div>
  );
}