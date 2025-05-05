export type BaseMovie = {
    adult: boolean;
    backdrop_path : string;
    id : number;
    original_title: string;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video : boolean;
    vote_average: number;
    vote_count: number;
}

export type Movie = BaseMovie & {
    genre_ids: number[];
};

export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_result: number;
}

export type belongs_to_collection = {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

export type MovieDetailResponse = {
    belongs_to_collection: belongs_to_collection;
    budget:number;
    genres: Genre[];
    homepage: string;
    imdb_id: string;
    origin_country: string;
    production_companies: production_companies[];
    production_countries: production_countries[];
    revenue: number;
    runtime: number;
    spoken_languages: spoken_languages[];
    status: string;
    tagline: string;
}

export type spoken_languages = {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export type production_countries = {
    iso_3166_1: string;
    name: string;
}

export type production_companies = {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export type Genre ={
    id: number;
    name: string;
}