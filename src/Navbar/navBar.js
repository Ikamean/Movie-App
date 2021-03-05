import React from 'react';
import Search from '../components/NavBar/search';
import CategoryList from '../components/NavBar/categoryList'
import { useHistory } from 'react-router-dom';
import Login from '../Login/login';
import styled from 'styled-components';



const NavBar = () => {
    

    const history = useHistory();

    const handleClick = async () => {
        history.push('/');
    }

    return(
        <NAVBARCONTAINER> 
            
            <LogoAndAcc>

                    <LogoBtn onClick={()=>handleClick()}><img alt="TMDBLogo" src={require('../Media/logo.svg').default} width="50" height="30" /> </LogoBtn>
                
                    <CategoryList />

                    <Login />

            </LogoAndAcc>

            <Search />
                    
                
        </NAVBARCONTAINER>
    )
}

export default NavBar

const NAVBARCONTAINER = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${ props => props.theme.colors.primary };
`

const LogoAndAcc = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const LogoBtn = styled.button`
    border-radius: 8px;
    margin: 1rem 1rem 1rem 1rem;
    border: 1px solid transparent;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    &:hover{
        opacity: 0.8;
    }
`