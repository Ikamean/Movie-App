import { getGenres } from '../../services/service';


const initialState = {
    "genres" : [],
    "currentGenre" : ''
}

const genresReducer = (state=initialState, action) => {
    switch(action.type){
        case 'Initialize_Genres' : 
            let movieGenres = action.data
            state = { ...state, genres : movieGenres }
            return state
        case 'Choose_Genre' :
            state = { ...state, currentGenre : action.data }
            return state
        default : return state
    }
}

export const chooseGenre = (id) => {
    return dispatch => {
        dispatch({
            type: 'Choose_Genre',
            data: id
        })
    }
}


export const initializeGenres = () => {
    return async dispatch => {
        let res = await getGenres();
        dispatch({
            type: 'Initialize_Genres',
            data: res.genres
        })
    }
}


export default genresReducer