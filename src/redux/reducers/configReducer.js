import { getConfiguration } from '../../services/service';


const initialState = {
    "imagesConfig" : []
}

const configReducer = (state=initialState, action) => {
    switch(action.type){
        case 'Initialize_Configuration' : 
            let config = action.data
            state = { ...state, imagesConfig : config }
            return state
        default : return state
    }
}


export const initializeConfiguration = () => {
    return async dispatch => {
        let res = await getConfiguration();
        dispatch({
            type: 'Initialize_Configuration',
            data: res.images
        })
    }
}


export default configReducer