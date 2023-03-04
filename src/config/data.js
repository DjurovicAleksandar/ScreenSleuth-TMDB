export const SIMILAR = movie_id => `
https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${API_KEY}>&language=en-US&page=1`;

export const SEARCH = query =>
  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`;

export const moviePage = (page = 1) => `&page=${page}`;

export const API_KEY = 'b7e7146ba1cc8340be5dbc77663289ed';

export const IMG_PATH = 'https://image.tmdb.org/t/p/original/';
export const POSTER_PATH = 'https://image.tmdb.org/t/p/w500/';

export const TRENDING = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=en-US`;
export const NOW_PLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`;
export const UPCOMING = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&region=US&with_release_type=2|3`;
export const TOP = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`;

export const TRAILER_KEY = `AIzaSyChhCOfy7IPx7kmkzDf5-FK5r0jFcpaKGA`;
