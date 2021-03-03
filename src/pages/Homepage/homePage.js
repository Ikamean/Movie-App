import React from 'react';
import MovieList from '../../components/Homepage/movieList';
import { useSelector } from 'react-redux';
import styled from 'styled-components';



const Home = () => {

    const popularMovieList = useSelector( state => state.movies.popular );
    const upcomingMovieList = useSelector( state => state.movies.upcoming );
    const topRatedMovieList = useSelector( state => state.movies.topRated );


    

    return(
        <>  
            <CategoryList>

                    <CategoryHeader> What's Popular</CategoryHeader>
                    <MovieList data = {popularMovieList}/>

                    <CategoryHeader>Upcoming</CategoryHeader>
                    <MovieList data = {upcomingMovieList} />

                    <CategoryHeader>Top Rated</CategoryHeader>
                    <MovieList data = {topRatedMovieList} />

            </CategoryList>
        </>
    )
}

export default Home




const CategoryList = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    justify-content: space-between;
    align-items: flex-start;
    @media(min-width: 650px){
        padding: 2rem 4rem;
    }
`

const CategoryHeader = styled.h2`
    font-size: 1.5em;
    font-weight: 600;

    padding: 2rem 0px 1rem 1rem;
    @media(min-width: 650px){
        padding: 3rem 0px 2rem 1rem;
    }
`