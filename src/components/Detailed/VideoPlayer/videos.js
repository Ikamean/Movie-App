import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeVideos } from '../../../redux/reducers/youtubeReducer';
import Player from './player';
import { Similar, SimilarList, SimilarHeader } from '../detailed';

/// https://www.youtube.com/watch?v=

const Video = () => {
    const dispatch = useDispatch();
    const currentId = Number(localStorage.getItem('currentMovieId'));
    const videoList = useSelector( state => state.youtube.videos);

    useEffect(()=>{
        initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentId])
    
    // transform initialized videos into { key , id} object for localstorage 
    const transform = (key,id) => {
        return(
            {
                key: key,
                id: id
            }
        )
    }

    const initialize = async () => {
        await dispatch(initializeVideos(currentId));
        let transformedObject = videoList.map( v => transform(v.key, v.id));
        localStorage.setItem('Youtube',JSON.stringify(transformedObject));
    }

    

    

    //let videoData = JSON.parse(localStorage.getItem('Youtube'));


    return(
        <Similar>
            <SimilarHeader>
                Media
            </SimilarHeader>
            <SimilarList>
                {
                    videoList.map(
                        v => <Player key={v.key} video={v}/>
                    )
                }
            </SimilarList>
            
        </Similar>
    )
}

export default Video