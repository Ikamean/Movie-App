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
    padding: 20px;
    justify-content: space-between;
    align-items: flex-start;
`

const CategoryHeader = styled.h2`
    font-size: 1.5em;
    font-weight: 600;
    padding-bottom: 10px;
    padding-top: 20px;
`