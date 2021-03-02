import { getSearchMovie } from '../../services/service';


const initialState = {
    "searchedMovies" : []
}

const searchReducer = (state=initialState, action) => {
    switch(action.type){
        case 'Initialize_Search' : 
            let searchedList = action.data
            state = { ...state, searchedMovies : searchedList }
            return state
        default : return state
    }
}


export const initializeSearchedMovies = (name) => {
    return async dispatch => {
        let res = await getSearchMovie(name);
        dispatch({
            type: 'Initialize_Search',
            data: res
        })
    }
}


export default searchReducer