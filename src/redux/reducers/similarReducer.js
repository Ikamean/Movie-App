import { getSimilar } from '../../services/service';


const initialState = {
    "movies" : []
}

const similarReducer = (state=initialState, action) => {
    switch(action.type){
        case 'Initialize_Similar' : 
            let config = action.data
            state = {...state, movies : config }
            return state
        default : return state
    }
}


export const initializeSimilar = (id) => {
    return async dispatch => {
        let res = await getSimilar(id);
        dispatch({
            type: 'Initialize_Similar',
            data: res
        })
    }
}


export default similarReducer