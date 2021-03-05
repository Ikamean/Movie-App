import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { MdLanguage } from 'react-icons/md';
import { GiExpand } from 'react-icons/gi';
import styled from 'styled-components';


const MovieCard = ({ movie }) => {
    const [ openImage, setOpenImage ] = useState(false)

    const imgBaseUrl = useSelector( state => state.config.imagesConfig.secure_base_url);
    const history = useHistory();
    

    const handleClick = async () => {
        //await dispatch( initializeCurrentMovie(movie.id) );
        localStorage.setItem('currentMovieId',movie.id);
        history.push(`/movie/${movie.title}`);
    }
    
    return(
        <Card>
            
            <div>
                <ExpandBtn onClick={()=>setOpenImage(!openImage)}>
                    {movie.poster_path && <GiExpand />} 
                </ExpandBtn>
                <div onClick={()=>handleClick()}>
                    {
                    openImage && 
                    <ExpandedDetails>
                        <Poster loading='lazy' 
                        src={ `${imgBaseUrl}w300${movie.poster_path}`}
                        alt='Movie Poster'/>
                        <ExpandText>
                            <ExpandedTitle>
                                {movie.original_title}
                            </ExpandedTitle>

                            <VoteAverage>
                                <AiFillStar /> {movie.vote_average}
                            </VoteAverage>

                            <VoteAverage>
                                <MdLanguage /> {movie.original_language}
                            </VoteAverage>
                            {movie.overview}
                            
                        </ExpandText>
                    </ExpandedDetails>
                    }   
                </div>
                
                
                <HoverableImage onClick={()=>handleClick()}>

                <HoverableText>
                        <HoverableTextContainer>

                            <div>
                                {movie.original_title}
                            </div>

                            <VoteAverage>
                                <AiFillStar /> {movie.vote_average}
                            </VoteAverage>

                            <VoteAverage>
                                <MdLanguage /> {movie.original_language}
                            </VoteAverage>

                            
                            
                        </HoverableTextContainer>
                    
                </HoverableText>
                {
                    movie.poster_path  ?
                    !openImage && 
                    <picture>
                        <source media="(min-width:650px)" srcSet={ `${imgBaseUrl}w154${movie.poster_path}`} />

                        <Poster loading='lazy' 
                        src={ `${imgBaseUrl}w92${movie.poster_path}`}
                        alt='Movie Poster'/>

                    </picture>

                    : 
                        !openImage && 
                        <NoPoster src={require('../../Media/noposter.svg').default} width="92" height="138" alt='No Poster Available' />
                    
                }
                
                
                </HoverableImage>
                <Title>{movie.title}</Title>
            </div>
                <MovieDate>{movie.release_date}</MovieDate>
            
            

        </Card>
    )
}

export default MovieCard;



const ExpandBtn = styled.button`
    display: none;
    @media(min-width: 650px){
        display: block;
        background-color: transparent;
        color: black;
        border: none;
        outline: none;
        cursor: pointer;
        &:hover{
            font-size: 1rem;
        }
    }
`
const ExpandedDetails = styled.div`
    display: flex;
    width: 600px;
    align-items: flex-start;
    height: 450px;
    border-radius: 8px;
    background-color: ${ props => props.theme.colors.white };
    margin-bottom: 0.5em;
`
const ExpandText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    padding: 1rem;
    line-height: 1.1rem;
    font-weight: 500;
    color: black;
    height: 100%;
    border-right: 1px dotted ${ props => props.theme.colors.primary };
    border-radius: 8px;
    opacity: 0.9;
`
const ExpandedTitle = styled.div`
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    line-height: 1.5rem;
    &:hover{
        color: ${ props => props.theme.colors.primary }
    }
`
const VoteAverage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const HoverableText = styled.div`
    display: none;
    position: absolute;
    color: black;
    left: 92px;
    z-index: 1;
    background-color: white;
    border-radius: 0.5rem;
    padding: 0.5rem;
    font-weight: 400;
    font-size: 0.8rem;
    width: 100px;
    height: 100px;
    border: none;
    outline: none;
    font-weight: 600;
    @media(min-width: 650px){
        left: 154px;
    }
`

const HoverableImage = styled.div`
    position: relative;

    @media(min-width: 650px){

        &:hover ${ HoverableText }{
        display: block;
        transition: 0.5s all ease;
    }
    }
    @media(max-width: 650px){
        &:focus ${ HoverableText }{
        display: block;
        transition: 0.5s all ease;
    }
    }
    
`
const HoverableTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    height: 100%;
`


export const Title = styled.h3`
    font-weight: 700;
    color: ${ props=> props.theme.colors.black };
    cursor: pointer;
    text-align: center;
    &:hover{
        color: ${ props => props.theme.colors.secondary };
        transition: all 0.5s ease;
    }
    @media(max-width: 400px){
        font-size: 0.8rem;
    }
`
export const MovieDate = styled.p`
    color : rgb(0 0 0 / 60%);
    text-align: center;
    cursor: text;
` 


export const Poster = styled.img`
    border-radius: 8px;
    cursor: pointer;
    
`
export const NoPoster = styled.img`
    cursor: pointer;
    @media (min-width:650px) {
    height: 231px;
    width: 154px;
    }
`

const Card = styled.div`
    position: relative;
    border-radius: 30px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
`
