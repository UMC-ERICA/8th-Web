
export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type MovieResponse = {
    page: number;
    results: Movie[]; // 실제로 들어오는 것은 여러 개의 영화 데이터이니 Movie의 배열로 표현
    total_pages: number;
    total_results: number;
}