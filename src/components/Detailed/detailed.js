import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { TiMediaPlay } from 'react-icons/ti';
import { BsFillStarFill } from 'react-icons/bs';
import Company from './companies';
import CategoryCard from '../CategoryPage/categoryCard';
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { rateMovie } from '../../services/guestSession';
import { userMarkFavouriteMovie } from '../../services/userSession';
import {initializeGuestRatedMovies} from '../../redux/reducers/guestMoviesReducer';
import { initializeUserFavourites } from '../../redux/reducers/userSessionReducer';
import Video from './VideoPlayer/videos';

const Detailed = ({ movie }) => {

    const dispatch = useDispatch();

    const similarMovies = useSelector( state=> state.similar.movies )
    const imgBaseUrl = useSelector( state => state.config.imagesConfig.secure_base_url);
    const companies = movie.production_companies;

    const [ favourite, setFavourite ] = useState(false);
    const [ trigger, setTrigger ] = useState(false);
    
    const rating = 10;

    const guestFavourites = useSelector( state => state.guestSession.guestRatedMovies);
    const userFavourites = useSelector( state => state.userSession.userFavourites);

    const guestSession = localStorage.getItem('guestSessionID');
    const userSession = localStorage.getItem('userSessionID');
    const accountId = localStorage.getItem('accountId');


    const handleFavourite = async () => {
        if(guestSession && !favourite){
            let success = await rateMovie(movie.id, rating, 'guest_session_id', guestSession);
            await dispatch(initializeGuestRatedMovies(guestSession))
            setFavourite(success.success)
        }
        if(userSession){
            if(!favourite) {
                await userMarkFavouriteMovie(accountId,userSession,movie.id,true);
            }else{
                await userMarkFavouriteMovie(accountId,userSession,movie.id,false);
            }
            await dispatch(initializeUserFavourites(userSession))
            setTrigger(!trigger);
        }
    }
    

    useEffect(()=> {
        let added = false;
        if(guestSession){
            added = guestFavourites.some( g => g.id === movie.id )
            if(added){
                setFavourite(added);
            }
            //
        }
        if(userSession){
            added = userFavourites.some( g => g.id === movie.id )
            
            setFavourite(added);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favourite,trigger])

    return(
        <MovieDetailsWrapper>
            <Movie>
                <Image>
                {
                    movie.poster_path ? 
                    <picture>
                        <source media="(min-width:650px)" srcSet={ `${imgBaseUrl}w342${movie.poster_path}`} />

                        <Poster loading='lazy' 
                        src={ `${imgBaseUrl}w154${movie.poster_path}`}
                        alt='Movie Poster'/>

                    </picture>

                    : 

                        <NoPoster src={require('../../Media/noposter.svg').default} width="92" height="138" alt='No Poster Available' />
                    
                } 
                </Image>
                
                <Details>
                    {
                        (guestSession || userSession) &&
                        

                    <Heart onClick={()=>handleFavourite()} >
                        
                        {
                             // Handling Guest Session Liking
                            guestSession && !favourite && <FcLikePlaceholder />
                        }
                        {
                            guestSession && favourite && <FcLike /> 
                        }

                         {  // Handling User Session Liking and disliking
                            userSession && !favourite && <FcLikePlaceholder />
                        }
                        {
                            userSession && favourite && <FcLike />
                        }
                    
                    </Heart>

                    }
                        
                        
                    <Rating>
                        <Average> <BsFillStarFill /> {movie.vote_average} </Average>
                        <Runtime>
                            <TiMediaPlay/>{movie.runtime}
                        </Runtime>
                    </Rating>
                    <TitleAndRelease>
                        {
                            movie.homepage ? 
                            <a href={ movie.homepage } target='_blank' rel='noreferrer'> 
                            <Title> { movie.original_title } </Title>
                        </a>
                        :
                        <Title> { movie.original_title } </Title>
                        }
                            
                        
                        <ReleaseDate>{movie.release_date && `(${movie.release_date})`}</ReleaseDate>
                        
                    </TitleAndRelease>
                    
                    <GenreContainer>
                        { movie.genres && movie.genres.map( g => <Genre key={g.id}> {g.name} </Genre>  )}
                        
                    </GenreContainer>
                    
                    <TaglineContainer>
                        <Tagline><i>{movie.tagline}</i></Tagline>
                    </TaglineContainer>
                    
                    <OverviewContainer>
                        <OverviewHeader>
                            Overwiev
                        </OverviewHeader>
                        <OverwievContent>
                            {movie.overview}
                        </OverwievContent>
                    </OverviewContainer>
                </Details>
            
            </Movie>
    
            {  similarMovies && similarMovies.length > 0 &&
                
            <Similar>
                <SimilarHeader><i> Similar Movies </i></SimilarHeader>
                <SimilarList>
                    
                    { similarMovies.map( movie => <CategoryCard key={movie.id} movie={movie} /> )}
                </SimilarList>
            </Similar>   
            }
            <Video />
            { companies &&
                companies.length > 0 &&
                <Similar>
                    <SimilarHeader><i> Production Companies </i></SimilarHeader>
                    <SimilarList>
                        {companies.map( c=> <Company company={c} key={c.id} /> )}
                    </SimilarList>
                </Similar>
            }
            
        </MovieDetailsWrapper>   
    )
}

export default Detailed

const MovieDetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

const Heart = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem 0.1rem;
    width: 100%;
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 1rem;
    &:hover{
    background-color: ${ props => props.theme.colors.primary };
    padding: 0.5rem 1.5rem;
    font-size: 1.5rem;
    transition:  all 0.5s ease;
    }
`

export const Similar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem 3rem;
`
export const SimilarList = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    height: 100%;

`
export const SimilarHeader = styled.h3`
    font-weight: 600;
    opacity: 0.9;
    padding: 1rem;
`


const Movie = styled.div`
    display: flex;
    justify-content: flex-start;
    text-align: center;
    align-items: flex-start;
    height: --var(231 + 16)px;
    padding: 1rem 3rem;
    outline: none;
    border-radius: 8px;
    border: none;
    box-shadow : 1px 1px ${ props => props.theme.colors.primary }; 
    @media(min-width: 650px){
        padding: 2rem 4rem;
        height: --var(513 + 2rem)px;
    } 
`

// movie Details DIV
const Details = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 1rem 1rem;
    height: 231px;
    @media(min-width: 650px){
        height: 513px;
        justify-content: flex-start;
    } 
`

//title Containers
const TitleAndRelease = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    color: ${ props => props.theme.colors.black };
`
const Title = styled.h2`
    font-weight: 900;
    color: "#fff";
    font-size: 1rem;
    cursor: pointer;
    margin-right: 5px;
    outline: none;
    border: none;
    &:hover{
        color:  ${props => props.theme.colors.secondary };
        transition: 0.5s all ease
    }
    @media(min-width: 650px){
        font-size: 1.5rem;
    }
    @media(max-width: 400px){
        font-size: 0.8rem;
    }
`
const ReleaseDate = styled.p`
    font-weight: 400;
    opacity: 0.8;
    font-size: 1rem;
    
    @media(max-width: 400px){
        font-size: 0.6rem;
    }
`

// Genres

const GenreContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
    @media(max-width: 400px){
        flex-direction:column;
        justify-content: center;
        align-items: flex-start;
    }
`

const Genre = styled.p`
    opacity: 0.8;
    font-weight: 600;
    font-size: 0.8rem;
    margin-right: 5px;
    color: ${ props => props.theme.colors.primary };
    @media(max-width: 400px){
        font-size: 0.8rem;
    }
`
// Runtime

const Runtime = styled.div`
    display:flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.8rem;
    padding-left: 5px;
    @media(min-width: 650px){
        font-size: ${ props => props.theme.fontSizes.small}
    }
`
// Rating

const Rating = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 5px;
    
`

const Average = styled.p`
    font-weight: 600;
    font-size: 0.8rem;
    @media(min-width: 650px){
        font-size: ${ props => props.theme.fontSizes.small}
    }
`

// Tagline 
const TaglineContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 10px ;
    text-align: left;
`
const Tagline = styled.h3`
    opacity: 0.8;
    color: ${ props => props.theme.colors.primary };
    @media(max-width: 400px){
        font-size: 0.8rem;
    }
`
// Overwiev

const OverviewContainer = styled.div`
    display: none;
    @media(min-width:650px){
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 10px 0px;
        opacity: 0.8;
        text-align: left;
    }
    

`

const OverviewHeader = styled.h3`
    color: ${ props => props.theme.colors.black };
    font-weight: 800;
    padding-bottom: 5px; 
`

const OverwievContent = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: ${ props => props.theme.colors.primary };
    font-weight: 600;
    opacity: 1;
`

// Media Images and Posters and stuuf like that
const Image = styled.div`
    border: none;
    outline: none;
`

const Poster = styled.img`
    border-radius: 8px;
    
`

const NoPoster = styled.img`
    @media (min-width:650px) {
    height: 513px;
    width: 342px;
    }
`