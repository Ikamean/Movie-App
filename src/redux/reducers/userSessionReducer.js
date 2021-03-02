import { getUserFavouriteMovies } from '../../services/userSession';


const initialState = {
    "userFavourites" : []
}

const sessionUserReducer = (state=initialState, action) => {
    switch(action.type){
        case 'Initialize_UserFavourites' : 
            state = { ...state, userFavourites : action.data }
            return state
        default : return state
    }
}


export const initializeUserFavourites = (session_Id) => {
    return async dispatch => {
        let res = await getUserFavouriteMovies(session_Id);
        dispatch({
            type: 'Initialize_UserFavourites',
            data: res
        })
    }
}


export default sessionUserReducer