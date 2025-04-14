export type BaseMovie = {
    adult: boolean;
    backdrop_path: string;
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
}

export type Movie = BaseMovie & {
    genre_ids: number[]; 
};

export type MovieResponse = {
    page: number;
    results: Movie[]; // 실제로 들어오는 것은 여러 개의 영화 데이터이니 Movie의 배열로 표현
    total_pages: number;
    total_results: number;
}

type Genre = {
    id: number;
    name: string;
};

type ProductionCompany = {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
};

type ProductionCountries = {
    iso_3166_1: string;
    name: string;
};

type SpokenLanguages = {
    english_name: string;
    iso_639_1: string;
    name: string;
};

type BelongsToCollection = {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
};

export type MovieDetailResponce = BaseMovie & {
    belongs_to_collection: BelongsToCollection;
    budget: number;
    genres: Genre[];
    homepage: string;
    imdb_id: string;
    origin_country: string[];
    production_companies: ProductionCompany[];
    production_countries: ProductionCountries[];
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguages[];
    status: string;
    tagline: string;
};

export interface MovieCredit {
    id: number;
    cast: {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        origianal_name: string;
        popularity: number;
        profile_path: string;
        cast_id: number;
        character: string;
        credit_id: string;
        order: number;
    }[];
    crew: {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        origianal_name: string;
        popularity: number;
        profile_path: string;
        credit_id: string;
        department: string;
        job: string;
    }[];
}