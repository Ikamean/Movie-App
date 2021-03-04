import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Detailed from '../../components/Detailed/detailed';
import { initializeCurrentMovie } from '../../redux/reducers/currentReducer';
import { initializeSimilar } from '../../redux/reducers/similarReducer';



const MoviePage = () => {
    const currentMovie = useSelector( state => state.current.current );
    const dispatch = useDispatch();
    const currentId = Number(localStorage.getItem('currentMovieId'));
    
    
    
    const similarMovies = async () => {
        await dispatch(initializeSimilar(currentId));
        await dispatch(initializeCurrentMovie(currentId));
    }

    useEffect(()=>{
        similarMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentId])

    return(
        <Detailed movie={ currentMovie } />
    )
}

export default MoviePage