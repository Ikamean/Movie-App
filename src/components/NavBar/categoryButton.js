import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { initializeCategory } from '../../redux/reducers/categoryReducer';
import styled from 'styled-components';
import { initializeHamburger } from '../../redux/reducers/hamburgerReducer';

const CategoryButton = ({ value }) => {
    const dispatch = useDispatch();
    const hamburger = useSelector( state => state.hamburger.open );
    const history = useHistory();

    const handleClick = () => {

        dispatch( initializeHamburger(!hamburger))
        localStorage.setItem('category', value);
        dispatch( initializeCategory(value));

        history.push(`/category`);

    }

    const handleExceptionCategory = (value) => {

        dispatch( initializeHamburger(!hamburger))
        history.push(`/${value}`)
    }





    
    if( value === 'Favourites'){
        return(
            
            <CategoryBtn onClick={()=>handleExceptionCategory('favourites')}>{value}</CategoryBtn>
        ) 
    }

    if( value === 'Latest'){
        return(
            <CategoryBtn onClick={()=> handleExceptionCategory('latest')}>{value}</CategoryBtn>
        ) 
    }

    return(
        <CategoryBtn onClick={()=>handleClick()}>{value}</CategoryBtn>
    )
}

export default CategoryButton

const CategoryBtn = styled.button`
    padding: 5px;
    background-color: transparent;
    color: ${ props => props.theme.colors.white };
    border: 1px solid transparent;
    outline: none;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 8px;
    width: 100%;
    text-align: left;

    @media (max-width: 650px) {
    padding: 2rem;
    font-size: 1.5rem;
    text-align: left;
    //display: block;
    font-weight: 400;
    color: ${ props => props.theme.colors.black };
    border-bottom: 1px solid ${ props => props.theme.colors.grey };
    &:active{
        background-color: #f8f9fa;    
        transition: all 0.5s ease;
    }
    
    }
    @media (min-width: 650px){
        font-weight: 400;
        color: ${ props => props.theme.colors.black };
        &:hover{
            background-color: #f8f9fa;
        }
    }

`