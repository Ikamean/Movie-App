import { getToken, getUserSessionId } from '../../services/login';


const initialState = {
    "requestToken" : '',
    "userSession" : {}
}

const loginReducer = (state=initialState, action) => {
    switch(action.type){
        case 'Initialize_Token' : 
            state = { ...state, requestToken : action.data }
            return state
        case 'Initialize_User' :
            state = { ...state, userSession : action.data }
            return state
        default : return state
    }
}


export const initializeToken = () => {
    return async dispatch => {
        let res = await getToken();
        dispatch({
            type: 'Initialize_Token',
            data: res.request_token
        })
    }
}

export const initializeUser = (token) => {
    return async dispatch => {
        let res = await getUserSessionId(token);
        dispatch({
            type: 'Initialize_User',
            data: res
        })
    }
}


export default loginReducer