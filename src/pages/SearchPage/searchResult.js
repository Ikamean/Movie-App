import React from 'react';
import { useSelector } from 'react-redux';
import CategoryCard from '../../components/CategoryPage/categoryCard';
import {CategoryWrapper, CategoryTitle, GridList } from '../CategoryPage/categoryPage';
import styled from 'styled-components';

const SearchResult = () => {
    const result = useSelector( state => state.search.searchedMovies );
    if(result.length === 0) 
        return(
            <NotFound>
                No Movies Found
            </NotFound>
        )
    return(
        <CategoryWrapper>
                <CategoryTitle>Search Result</CategoryTitle>
                <GridList>
                { 
                    result.map( r => <CategoryCard key={r.id} movie={r} />) 
                }
                </GridList>
        </CategoryWrapper>
    )
}

export default SearchResult;

export const NotFound = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 40vh;

`