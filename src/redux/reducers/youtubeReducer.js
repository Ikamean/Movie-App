import { getVideos } from '../../services/videoService';


const initialState = {
    "videos" : []
}

const youtubeReducer = (state=initialState, action) => {
    switch(action.type){
        case 'initialize_videos' : 
            state = { videos : action.data }
            return state
        default : return state
    }
}


export const initializeVideos = (movie_id) => {
    return async dispatch => {
        let res = await getVideos(movie_id);
        dispatch({
            type: 'initialize_videos',
            data: res
        })
    }
}


export default youtubeReducer