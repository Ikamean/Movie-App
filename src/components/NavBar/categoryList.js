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
        <HamburgerContainer open={hamburger}>
            <Hamburger onClick={()=>handleHamburger()}> 
            { !hamburger ? <ImMenu3 /> :  <ImMenu4 />  }
            </Hamburger>
                <HamburgerMenu open={hamburger}>
                    {
                        categoryArray.map( c => 
                        <CategoryButton key={c}  value={c} />  )
                    }
                </HamburgerMenu>
        </HamburgerContainer>            
            

        <DropDown>

            <DropDownBtn>
                    Movies
            </DropDownBtn>
            
            <CategoryDiv>
                
                {
                    categoryArray.map( c => 
                    <CategoryButton key={c}   value={c} />  )
                }
            </CategoryDiv>
        </DropDown>    
        </>
        
    )
}

export default CategoryList

const HamburgerContainer = styled.div`
    display: none;
    @media(max-width: 650px){
        position: relative;
        display: inline-block;
    }
`

const HamburgerMenu = styled.div`
    display: ${ props => props.open ? "flex" : "none"};
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-end;
    position: fixed;
    height: 100vh;
    width: 100vw;
    left: 0;
    right: 0;
    background-color: ${ props => props.theme.colors.primary };
    z-index: 1;
`
const Hamburger = styled.button`
    
        margin: 0 0 0 1rem ;
        background-color: ${ props => props.theme.colors.primary };
        border:none;
        outline: none;
        color: ${ props => props.theme.colors.white };
        font-size: 2rem;
        &:active{
            color: ${ props => props.theme.colors.secondary };
            transition: 0.5s all ease;
        };
`

const DropDownBtn = styled.button`
    @media(min-width: 650px){
        display: block;
        border:none;
        outline:none;
        color: ${ props => props.theme.colors.white };
        font-weight: 700;
        background-color: inherit;
        font-size: 0.8rem;
        cursor: pointer;
        margin: 1rem;
    }
`
// Category List which is Togglable either with hamburger before 650px or Hover Dropdown after 650px
const CategoryDiv = styled.div`
    @media(min-width: 650px){
        display: none;
        position: absolute;
        border:none;
        outline: none;
        border-radius: 0.5rem;
        z-index: 1;
        padding: 1rem;
        
    }
`
// Drop Down menu, on Hover It Reveals Category List
const DropDown = styled.div`
    display: none;
    @media(min-width:650px){
    position: relative;
    display: inline-block;
    &:hover ${CategoryDiv} {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            text-align: left;
            background-color: ${ props => props.theme.colors.white };
            border: 1px solid rgba(0,0,0,0.15);
            width: 250px;
        }
        
    }
`


