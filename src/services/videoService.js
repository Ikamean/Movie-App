import axios from 'axios'

const key = process.env.REACT_APP_API_KEY;



export const getVideos = async (movie_id) => {
    let res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${key}&language=en-US`);
    let data = res.data.results;
    return data;
}