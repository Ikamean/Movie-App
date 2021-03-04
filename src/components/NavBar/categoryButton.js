import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { initializeCategory } from '../../redux/reducers/categoryReducer';
import styled from 'styled-components';

const CategoryButton = ({ value }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = () => {

        
        localStorage.setItem('category', value);
        dispatch( initializeCategory(value));

        history.push(`/category`);

    }



    
    if( value === 'Favourites'){
        return(
            
            <CategoryBtn onClick={()=>history.push('/favourites')}>{value}</CategoryBtn>
        ) 
    }

    if( value === 'Latest'){
        return(
            <CategoryBtn onClick={()=> history.push('/latest')}>{value}</CategoryBtn>
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
    @media (max-width: 360px) {
    padding: 2px;
    font-size: 13px;
  }

    &:hover{    
        color: ${ props => props.theme.colors.secondary };
        transition: all 0.5s ease;
    }   

    &:active{
        box-shadow: 1px 1px ${ props => props.theme.colors.secondary };
        
    }
`