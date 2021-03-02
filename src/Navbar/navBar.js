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
                    <Search />
            <LogoAndAcc>
                    <LogoBtn onClick={()=>handleClick()}><img alt="TMDBLogo" src={require('../Media/logo.svg').default} width="100" height="73.66" /> </LogoBtn>
                
                <Login />

            </LogoAndAcc>

                    
                    <CategoryList />
                
        </NAVBARCONTAINER>
    )
}

export default NavBar

const NAVBARCONTAINER = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    background-color: ${ props => props.theme.colors.primary };
    @media (max-width: 360px) {
    justify-content: center;
    font-size: 14px;
    }
`

const LogoAndAcc = styled.div`
    display: flex;
    justify-content: space-between;
`

const LogoBtn = styled.button`
    border-radius: 8px;
    border: 1px solid transparent;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    padding: 10px;
`