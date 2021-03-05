import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Detailed from '../../components/Detailed/detailed';
import { initializeSimilar } from '../../redux/reducers/similarReducer';
import { initializeCurrentMovie } from '../../redux/reducers/currentReducer';

const Latest = () =>{
    const latest = useSelector( state => state.movies.latest);
    const dispatch = useDispatch();
    localStorage.setItem('currentMovieId', latest.id);
    const currentId = Number(localStorage.getItem('currentMovieId'));

    const latestInitialization = async () => {
        await dispatch(initializeSimilar(latest.id));
        await dispatch(initializeCurrentMovie(currentId));
    }

    useEffect(()=> {
        latestInitialization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <Detailed movie={latest} />
    )
}

export default Latest