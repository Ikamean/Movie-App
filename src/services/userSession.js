import axios from 'axios';

const key = process.env.REACT_APP_API_KEY;



export const getUserDetails = async (session_Id) => {
    let res = await axios.get(`https://api.themoviedb.org/3/account?session_id=${session_Id}&api_key=${key}`);
    let data = res.data;
    return data;
}

export const getUserFavouriteMovies = async (session_id) => {
    let res = await axios.get(`https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${key}&language=en-US&sort_by=created_at.asc&page=1&session_id=${session_id}`);
    
    let data = res.data.results;
    return data;
}

export const userMarkFavouriteMovie = async (account_id,session_id,movie_Id,favourite) => {
    let res = await axios.post(`https://api.themoviedb.org/3/account/${account_id}/favorite?api_key=${key}&session_id=${session_id}`,
                                {
                                    "media_type": "movie",
                                    "media_id": movie_Id,
                                    "favorite": favourite
                                });
    let data = res.data
    return data
}