import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeGuestRatedMovies } from '../../redux/reducers/guestMoviesReducer';
import { initializeUserFavourites } from '../../redux/reducers/userSessionReducer';

import CategoryCard from '../../components/CategoryPage/categoryCard';
import { GridList, GridWrapper } from '../CategoryPage/categoryPage';
import { NotFound } from '../SearchPage/searchResult';

const RatedMovies = () => {

    const dispatch = useDispatch();

    const guestSession = localStorage.getItem('guestSessionID');
    const userSession = localStorage.getItem('userSessionID');

    const guestMovies = useSelector ( state => state.guestSession.guestRatedMovies );
    const userMovies = useSelector ( state => state.userSession.userFavourites );
    
    const favoriteMovieInitialization =  async () => {

        guestSession && await dispatch(initializeGuestRatedMovies(guestSession));
        userSession && await dispatch(initializeUserFavourites(userSession));

    }

    useEffect(()=>{
        favoriteMovieInitialization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]) 

    if(guestSession){
        if( guestMovies.length === 0){
            return(
                <NotFound>
                    Nothing to show
                </NotFound>
            )
        }
        return(
                <GridWrapper >
                    <GridList>

                        { guestMovies.map( g => <CategoryCard key={g.id} movie={g} /> ) }

                    </GridList>
                </GridWrapper>
        )
    }

    if(userSession){
        if(userMovies.length === 0){
            return(
                <NotFound>
                    Nothing to show
                </NotFound>
            )
        }
        return(
            <GridWrapper>
                    <GridList>
                        { userMovies.map( u => <CategoryCard key={u.id} movie={u} /> ) }
                    </GridList>
            </GridWrapper>
        
        )
    }

    

    return(
        <NotFound>
            You are Not Logged In
        </NotFound>
    )
}

export default RatedMovies