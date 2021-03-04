

const initialState = {
    "open" : false
}

const hamburgerReducer = (state=initialState, action) => {
    switch(action.type){
        case 'initialize_hamburgerMenu' : 
            let config = action.data
            state = { open : config }
            return state
        default : return state
    }
}


export const initializeHamburger = (value) => {
    return dispatch => {
        dispatch({
            type: 'initialize_hamburgerMenu',
            data: value
        })
    }
}


export default hamburgerReducer