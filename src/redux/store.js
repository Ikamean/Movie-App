import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import configReducer from './reducers/configReducer';
import movieReducer from './reducers/movieReducer';
import currentReducer from './reducers/currentReducer';
import searchReducer from './reducers/searchReducer';
import genresReducer from './reducers/genresReducer';
import categoryReducer from './reducers/categoryReducer';
import loginReducer from './reducers/loginReducer';
import guestMoviesReducer from './reducers/guestMoviesReducer';
import sessionUserReducer from './reducers/userSessionReducer';
import similarReducer from './reducers/similarReducer';

const reducer = combineReducers({
    config : configReducer,
    movies : movieReducer,
    current : currentReducer,
    search : searchReducer,
    genres : genresReducer,
    category : categoryReducer,
    login : loginReducer,
    guestSession : guestMoviesReducer,
    userSession : sessionUserReducer,
    similar : similarReducer
})

const store = createStore(reducer,applyMiddleware(thunk))

export default store