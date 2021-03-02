import axios from 'axios';

const key = process.env.REACT_APP_API_KEY;

const requestTokenUrl = `https://api.themoviedb.org/3/authentication/token/new?api_key=${key}`;

const guestIdUrl = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${key}`;


export const logoutService = async (session_ID) => {
    let res = await axios.delete(
            `https://api.themoviedb.org/3/authentication/session?api_key=${key}`,
            {
                "data" : {
                    "session_id" : session_ID
                } 
            });
    let data = res.data;
    return data
}

export const getUserSessionId = async (token) => {
    let res = await axios.post(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${key}`,
            {
                "request_token" : token
        });

    let data = res.data;
    return data;
}


export const getToken = async () => {
    let res = await axios.get(requestTokenUrl);
    let data = res.data;
    return data;
}

export const getGuestId = async () => {
    let res = await axios.get(guestIdUrl);
    let data = res.data;
    return data;
}

