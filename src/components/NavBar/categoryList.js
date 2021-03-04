import React from 'react';
import CategoryButton from './categoryButton';
import styled from 'styled-components';
import { ImMenu3, ImMenu4 } from 'react-icons/im';
import { initializeHamburger } from '../../redux/reducers/hamburgerReducer';
import { useSelector, useDispatch } from 'react-redux';

const CategoryList = () => {
    const categoryArray = ["Top Rated", "Popular" , "Upcoming", "Latest", "Favourites" ]
    const dispatch = useDispatch();
    const hamburger = useSelector( state => state.hamburger.open );
    
    const handleHamburger = () =>{
        dispatch( initializeHamburger(!hamburger))
    }

    return(
        <>  
            <Hamburger onClick={()=>handleHamburger()}> 
            { !hamburger ? <ImMenu3 /> :  <ImMenu4 />  }
            </Hamburger>

            <CategoryDiv open={hamburger}>
            {
                categoryArray.map( c => <CategoryButton  key={c} value={c} /> )
            }
        </CategoryDiv>
        </>
        
    )
}

export default CategoryList

const CategoryDiv = styled.div`
    display:flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;

    @media (max-width: 650px) {
    
    display: ${ props => props.open ? 'flex' : "none" };
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100vh;
    width: 100%;
    margin: 1rem;
    background-color: ${ props => props.theme.colors.primary };
    color: ${ props => props.theme.colors.white }

    }
`
const Hamburger = styled.button`
    display: none;
    @media (max-width: 650px) {
        display: flex;
        background-color: ${ props => props.theme.colors.primary };
        border:none;
        outline: none;
        color: ${ props => props.theme.colors.white };
        font-size: 2rem;
        &:active{
            color: ${ props => props.theme.colors.secondary };
        }
    }
`