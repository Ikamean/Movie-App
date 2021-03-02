import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Detailed from '../../components/Detailed/detailed';
import { initializeSimilar } from '../../redux/reducers/similarReducer';


const MoviePage = () => {
    const currentMovie = useSelector( state => state.current.current );
    const dispatch = useDispatch()
    
    const similarMovies = async () => {
        await dispatch(initializeSimilar(currentMovie.id));
    }

    useEffect(()=>{
        similarMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentMovie])

    return(
        <Detailed movie={ currentMovie } />
    )
}

export default MoviePage