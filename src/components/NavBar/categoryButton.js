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
    @media (max-width: 650px) {
    padding: 2px;
    font-size: 1rem;
    color: ${ props => props.theme.colors.white }
  }

    &:hover{    
        color: ${ props => props.theme.colors.secondary };
        transition: all 0.5s ease;
    }   

    &:active{
        box-shadow: 1px 1px ${ props => props.theme.colors.secondary };
        transition: all 0.5s ease;
    }
`