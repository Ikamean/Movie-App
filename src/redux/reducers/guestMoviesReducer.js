import { getGuestRatedMovies } from '../../services/guestSession';


const initialState = {
    "guestRatedMovies" : []
}

const guestMoviesReducer = (state=initialState, action) => {
    switch(action.type){
        case 'Initialize_GuestRatedMovies' : 
            let config = action.data
            state = { ...state, guestRatedMovies : config }
            return state
        default : return state
    }
}


export const initializeGuestRatedMovies = (guest_session_id) => {
    return async dispatch => {
        let res = await getGuestRatedMovies(guest_session_id);
        dispatch({
            type: 'Initialize_GuestRatedMovies',
            data: res
        })
    }
}


export default guestMoviesReducer