import { getDetailed } from '../../services/service';

const initialState = {
    "current" : {}
}

const currentReducer = (state=initialState, action) => {
    switch(action.type){
        case 'Initialize_CurrentMovie' : 
            let currentMovie = action.data
            state = { current : currentMovie }
                return state
        case 'Reset' :
            state = { current : {} }
                return state
        default : return state
    }
}

export const resetCurrentMovie = () => {
    return  dispatch => {
        dispatch({
            type: 'Reset',
        })
    }
}

export const initializeCurrentMovie = (id) => {
    return async dispatch => {
        let res = await getDetailed(id);
        dispatch({
            type: 'Initialize_CurrentMovie',
            data: res
        })
    }
}

export default currentReducer