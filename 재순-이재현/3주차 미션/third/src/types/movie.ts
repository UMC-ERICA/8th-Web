export type Movie = {
    adult: boolean;
    backdrop_path: any; string: any;
    genre_ids: number[];
    id: number;
    original_language: String;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title:  string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export type MovieResponse = {
page: number;
total_pages: number;
total_results: number;
results: Movie[];
};