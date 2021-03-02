import React from 'react'
import styled from 'styled-components';
import { FaGithub, FaLinkedinIn, FaFacebook } from "react-icons/fa";

const Footer = () => {
   const userName = localStorage.getItem('AccountUsername');
   const name = localStorage.getItem('AccountName');


    return(
        <FooterWrapper>
            <AccountAndLogo>
                <img alt="TMDBLogo" src={require('../Media/logo.svg').default} width="100" height="73.66" />
                <a href={`https://www.themoviedb.org/login`} target='_blank' rel="noreferrer">
                <Hello> 
                        Hello {userName? userName : "Guest" } 
                </Hello>
                </a>
            </AccountAndLogo>

            <Ikamean>
                ikamean 2021
            </Ikamean>

            <SocialWrapper>

            <SocialBtn>
                <a href='https://github.com/ikamean' target='_blank'  rel="noreferrer"> < FaGithub width='100' height='100' /> </a>  
            </SocialBtn>

            <SocialBtn>
                <a href='https://www.linkedin.com/in/ikab/' target='_blank'  rel="noreferrer">
                    <FaLinkedinIn />
                </a>
            </SocialBtn>

            <SocialBtn>
                <a href='https://www.facebook.com/ikmean' target='_blank'  rel="noreferrer">
                    <FaFacebook />
                </a>
            </SocialBtn>
            </SocialWrapper>
            
            
            
            
        </FooterWrapper>
    )
}

const Ikamean = styled.div`
    padding: 20px;
    color: ${ props => props.theme.colors.white };
    font-weight: 600;
    border-radius: 8px;
    border: none;
    outline: none;
`

const FooterWrapper = styled.div`
    display:flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 30px;
    background-color: ${ props=> props.theme.colors.primary };
`

const SocialWrapper = styled.div`
    display:flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    @media (min-width:650px) {
    flex-direction: row;
    }
`

const AccountAndLogo = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
`

const SocialBtn = styled.button`
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px solid transparent;
    outline: none;
    cursor: pointer;
    display:flex;
    align-items: center;
    margin-bottom: 10px;
    &:hover{
        background-color: ${ props => props.theme.colors.tertiary};
        transition: all 0.5s ease;
    }
    @media (min-width:650px) {
    padding: 10px 20px;
    margin-right: 10px;
    }
`
const Hello = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: ${ props => props.theme.colors.white };
    color: ${ props => props.theme.colors.secondary };
    font-weight: 600;
    border: 1px solid transparent;
    outline: none;
    border-radius: 8px;

    &:hover{
        background-color: ${ props=> props.theme.colors.tertiary};
        color: ${ props => props.theme.colors.white };
        transition: all 0.5s ease;
    }
`

export default Footer