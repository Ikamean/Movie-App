import axios from 'axios';

const key = process.env.REACT_APP_API_KEY;

const configurationUrl = `https://api.themoviedb.org/3/configuration?api_key=${key}`;

const latestUrl = `https://api.themoviedb.org/3/movie/latest?api_key=${key}&language=en-US`;

const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`;



export const getConfiguration = async () => {
    let res = await axios.get(configurationUrl);
    let data = res.data;
    return data;
}

export const getMovies = async (value,random) => {
    let res = await axios.get(`https://api.themoviedb.org/3/movie/${value}?api_key=${key}&language=en-US&page=${random}`);
    let data = res.data;
    return data;
}

export const getLatest = async () => {
    let res = await axios.get(latestUrl);
    let data = res.data;
    return data;
}


export const getDetailed = async (id) => {
    let res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`);
    let data = res.data;
    return data;
}

export const getSearchMovie = async (name) => {
    let res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${name}&page=1&include_adult=false`);
    let data = res.data.results;
    return data;
}

export const getGenres = async () => {
    let res = await axios.get(genresUrl);
    let data = res.data;
    return data;
}

export const getSimilar = async (movieId) => {
    let res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${key}&language=en-US&page=1`);
    let data = res.data.results;
    return data;
}

export const getCompanyHomepage = async (id) => {
    let res = await axios.get(`https://api.themoviedb.org/3/company/${id}?api_key=${key}`);
    let data = res.data.homepage;
    return data;
}

