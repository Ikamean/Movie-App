
const initialState = {
    "category" : ""
}

const categoryReducer = (state=initialState, action) => {
    switch(action.type){
        case 'Initialize_Category' : 
            state = { ...state, category : action.data }
            return state
        default : return state
    }
}


export const initializeCategory = (value) => {
    return  dispatch => {
        dispatch({
            type: 'Initialize_Category',
            data: value
        })
    }
}


export default categoryReducer