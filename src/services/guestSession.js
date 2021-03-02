import axios from 'axios';

const key = process.env.REACT_APP_API_KEY;

export const rateMovie = async (movie_id, rating, session, session_ID) => {
    let res = await axios.post(
        `https://api.themoviedb.org/3/movie/${movie_id}/rating?api_key=${key}&${session}=${session_ID}`,
        {
            "value" : rating
        });
    let data = res.data;
    return data
}

export const getGuestRatedMovies = async (guest_session_id) => {
    let res = await axios.get(`https://api.themoviedb.org/3/guest_session/${guest_session_id}/rated/movies?api_key=${key}&language=en-US&sort_by=created_at.asc`);
    let data = res.data.results;
    return data
}