import React from 'react';
import { useSelector } from 'react-redux';

import CategoryCard from '../../components/CategoryPage/categoryCard';
import { CategoryWrapper, CategoryTitle, GridList } from '../CategoryPage/categoryPage';
import { NotFound } from '../SearchPage/searchResult';

const RatedMovies = () => {


    const guestSession = localStorage.getItem('guestSessionID');
    const userSession = localStorage.getItem('userSessionID');

    const guestMovies = useSelector ( state => state.guestSession.guestRatedMovies );
    const userMovies = useSelector ( state => state.userSession.userFavourites );
    

    if(guestSession){
        if( guestMovies.length === 0){
            return(
                <NotFound>
                    Nothing to show
                </NotFound>
            )
        }
        return(
            <CategoryWrapper>
                <CategoryTitle>Favourite Movies</CategoryTitle>
                {  
                <GridList>

                    { guestMovies.map( g => <CategoryCard key={g.id} movie={g} /> ) }

                </GridList>
                }
            </CategoryWrapper>
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
            <CategoryWrapper>
                <CategoryTitle>Favourite Movies</CategoryTitle>
                {   userMovies.length > 0 ?
                    <GridList>
                        { userMovies.map( u => <CategoryCard key={u.id} movie={u} /> ) }
                    </GridList>
                    :
                    <NotFound>No Movies to show</NotFound>
                }
            </CategoryWrapper>
        )
    }

    

    return(
        <NotFound>
            You are Not Logged In
        </NotFound>
    )
}

export default RatedMovies