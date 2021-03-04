import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


import styled from 'styled-components';


const MovieCard = ({ movie }) => {
    const imgBaseUrl = useSelector( state => state.config.imagesConfig.secure_base_url);
    const history = useHistory();


    

    const handleClick = async () => {
        //await dispatch( initializeCurrentMovie(movie.id) );
        localStorage.setItem('currentMovieId',movie.id);
        history.push(`/movie/${movie.title}`);
    }
    
    return(
        <Card>
            <div onClick={()=>handleClick()}>
                {
                    movie.poster_path ? 
                    <picture>
                        <source media="(min-width:650px)" srcSet={ `${imgBaseUrl}w154${movie.poster_path}`} />

                        <Poster loading='lazy' 
                        src={ `${imgBaseUrl}w92${movie.poster_path}`}
                        alt='Movie Poster'/>

                    </picture>

                    : 

                        <NoPoster src={require('../../Media/noposter.svg').default} width="92" height="138" alt='No Poster Available' />
                    
                } 
                <Title>{movie.title}</Title>
            </div>
                <MovieDate>{movie.release_date}</MovieDate>
            
            

        </Card>
    )
}

export default MovieCard;

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
    cursor: pointer;
    border-radius: 30px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
`
export const Heart = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 1rem;
    &:hover{
        background-color: ${ props => props.theme.colors.red };
        transition: all 0.5s ease;
    }
`
