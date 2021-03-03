import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CategoryCard from '../../components/CategoryPage/categoryCard';
import { GridList, GridWrapper } from '../CategoryPage/categoryPage';
import styled from 'styled-components';
import { initializeSearchedMovies } from '../../redux/reducers/searchReducer';


const SearchResult = () => {

    const dispatch = useDispatch();
    let searchedValue = localStorage.getItem('searchValue');

    const result = useSelector( state => state.search.searchedMovies );

    const initializeSearch = async () => {
        await dispatch( initializeSearchedMovies(searchedValue) );
    }
    
    useEffect(()=>{
        initializeSearch();
    })
    
    if(result.length === 0) 
        return(
            <NotFound>
                No Movies Found
            </NotFound>
        )
    return( 
        <GridWrapper>
                <GridList>
                { 
                    result.map( r => <CategoryCard key={r.id} movie={r} />) 
                }
                </GridList>
        </GridWrapper>
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