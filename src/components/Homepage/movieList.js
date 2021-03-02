import React from 'react';
import MovieCard from './movieCard';
import styled from 'styled-components';

const MovieList = ({ data }) => {

    return(
        <HorizontalScroll >
            {
                data.map(movie=> <MovieCard key={movie.id} movie={movie} /> )
            }
        </HorizontalScroll>
    )
}

export default MovieList

const HorizontalScroll = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    height: 100%;
`