import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import { initializeSearchedMovies } from '../../redux/reducers/searchReducer';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Search = () => {
    const [ search, setSearch ] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const handleChange = (e) =>{
        e.preventDefault();
        setSearch(e.target.value);
        
    }

    const handleClick = async (e) => {
        e.preventDefault();

        if(search.length > 0){
            await dispatch( initializeSearchedMovies(search) );
            console.log(search);
            setSearch('');
            history.push('/search');
        }
    }

    return(
        <SearchDiv>
            <Input value={search} placeholder='Search for a movie' onChange={(e)=>handleChange(e)} /> 
            <SearchBtn onClick={(e)=>handleClick(e)}> Search </SearchBtn> 
            
        </SearchDiv>
    )
}

export default Search;

const SearchDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    outline: none;
`

const Input = styled.input`
    width: 80%;
    padding: 10px 20px;
    height: 46px;
    line-height: 46px;
    border: 1px solid transparent;
    border-radius: 30px;
    outline: none;
`


const SearchBtn = styled.button`
    border-radius: 15px;
    height: 46px;
    padding: 10px;
    border: none;
    outline: none;
    width: 20%;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    background-image: linear-gradient(to left, #0d253f, #163c5d, #1b557c, #1d709b, #198cbb, #009dc6, #00adcf, #00bed6, #33c4c8, #56c8ba, #74ccac, #90cea1);
    @media (max-width: 360px) {
    display:flex;
    font-size: 14px;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
`