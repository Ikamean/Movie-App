import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { initializeCurrentMovie } from '../../redux/reducers/currentReducer';
import { rateMovie } from '../../services/guestSession';
import { userMarkFavouriteMovie } from '../../services/userSession'
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import styled from 'styled-components';
import {initializeGuestRatedMovies} from '../../redux/reducers/guestMoviesReducer';
import { initializeUserFavourites } from '../../redux/reducers/userSessionReducer';

const MovieCard = ({ movie }) => {
    const imgBaseUrl = useSelector( state => state.config.imagesConfig.secure_base_url);
    const history = useHistory();
    const dispatch = useDispatch();

    // to check if any Session is open to display favourites button.
    const guestSession = localStorage.getItem('guestSessionID');
    const userSession = localStorage.getItem('userSessionID');
    const accountId = localStorage.getItem('accountId');

    const [ favourite, setFavourite ] = useState(false);

    const guestFavourites = useSelector( state => state.guestSession.guestRatedMovies);
    const userFavourites = useSelector( state => state.userSession.userFavourites);

    let hideFavouriteButton = true;

    if(guestSession){
        hideFavouriteButton = guestFavourites.some( f => f.id === movie.id );
    }
    if(userSession){
        hideFavouriteButton = userFavourites.some( f => f.id === movie.id );
    }


    const movie_id = movie.id;
    const rating = 10;

    const handleClick = async () => {

        await dispatch( initializeCurrentMovie(movie.id) );

        history.push(`/movie/${movie.title}`);

    }

    const handleRate = async (e) => {
        e.preventDefault()
        
        setFavourite(true)

        if(guestSession){
            await rateMovie(movie_id, rating, 'guest_session_id', guestSession)
            await dispatch(initializeGuestRatedMovies(guestSession))
        }
        if(userSession){
            await userMarkFavouriteMovie(accountId,userSession,movie.id,true)
            await dispatch(initializeUserFavourites(userSession))
        }
        
    }
    const handleDeleteFavourite = async (e) =>{
        e.preventDefault()

        

        setFavourite(false);

        await userMarkFavouriteMovie(accountId,userSession,movie.id,false)
        await dispatch(initializeUserFavourites(userSession))
    }


    return(
        <Card>
                <Heart>
                    { (guestSession || userSession) &&
                    !favourite && !hideFavouriteButton  ?
                        <HeartBtn onClick={(e)=> handleRate(e)}><FcLikePlaceholder /></HeartBtn> : 
                        userSession ? 
                        <HeartBtn onClick={(e)=> handleDeleteFavourite(e)}><FcLike /></HeartBtn> :
                        guestSession && <DisabledHeartBtn > <FcLike /> </DisabledHeartBtn> 
                        
                    }
                </Heart>     
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
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
`
export const Heart = styled.div`
    width: 100%;
`
export const DisabledHeartBtn = styled.button`
    width:100%;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 30px;
    border: none;
    background-color: transparent;
    margin-bottom: 10px;
    transition: all 0.5s ease;
`
export const HeartBtn = styled.button`
    width:92px;
    padding: 10px;
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 30px;
    background-color: transparent;
    margin-bottom: 10px;
    transition: all 0.5s ease;
    @media(min-width:650px){
        width: 154px;
    }
    
`