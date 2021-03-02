import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Detailed from '../../components/Detailed/detailed';
import { initializeSimilar } from '../../redux/reducers/similarReducer';

const Latest = () =>{
    const latest = useSelector( state => state.movies.latest);
    const dispatch = useDispatch();
    

    const similarMovies = async () => {
        await dispatch(initializeSimilar(latest.id));
    }

    useEffect(()=> {
        similarMovies();
    },[])

    return(
        <Detailed movie={latest} />
    )
}

export default Latest