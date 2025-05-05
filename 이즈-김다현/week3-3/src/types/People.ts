export type People = {
    credit_type: string;
    department: string;
    job: string;
    media: Media;
    media_type: string;
    id: string;
    person: Person;
  };
  
  export type Media = {
    adult: boolean;
    backdrop_path: string;
    id: number;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
    character: string;
    episodes: [];
    seasons: Season[];
  };
  
  export type Season = {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    show_id: number;
  };
  
  export type Person = {
    adult: boolean;
    id: number;
    name: string;
    original_name: string;
    media_type: string;
    popularity: number;
    gender: number;
    known_for_department: string;
    profile_path: string;
  };