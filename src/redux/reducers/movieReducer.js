import { getMovies, getLatest } from '../../services/service';

const initialState = {
    "latest" : {},
    "popular" : [],
    "topRated" : [],
    "upcoming" : []
}

const movieReducer = (state=initialState, action) => {
    switch(action.type){
        case 'Initialize_Latest' :
            let latest = action.data
            state = { ...state, latest : latest }
            return state
        case 'Initialize_Popular' : 
            let popular = action.data
            state = { ...state, popular : popular }
            return state
        case 'Initialize_TopRated' :
            let top = action.data
            state = { ...state, topRated : top }
            return state
        case 'Initialize_Upcoming' :
            let coming = action.data
            state = { ...state, upcoming : coming }
            return state
        default : return state
    }
}

export const initializeLatest = (value) => {
    return async dispatch => {
        let res = await getLatest(value);
        dispatch({
            type: 'Initialize_Latest',
            data: res
        })
    }
}

export const initializePopular = (value,random) => {
    return async dispatch => {
        let res = await getMovies(value,random);
        dispatch({
            type: 'Initialize_Popular',
            data: res.results
        })
    }
}

export const initializeTopRated = (value,random) => {
    return async dispatch => {
        let res = await getMovies(value,random);
        dispatch({
            type: 'Initialize_TopRated',
            data: res.results
        })
    }
}

export const initializeUpcoming = (value,random) => {
    return async dispatch => {
        let res = await getMovies(value,random);
        dispatch({
            type: 'Initialize_Upcoming',
            data: res.results
        })
    }
}




export default movieReducer