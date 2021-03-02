import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { TiMediaPlay } from 'react-icons/ti';
import { BsFillStarFill } from 'react-icons/bs';
import MovieCard from '../Homepage/movieCard';
import Company from './companies';


const Detailed = ({ movie }) => {
    const similarMovies = useSelector( state=> state.similar.movies )
    const imgBaseUrl = useSelector( state => state.config.imagesConfig.base_url);
    const backGroundUrl = movie.backdrop_path;
    const companies = movie.production_companies;


    useEffect(()=> {

    }, [])
    

    return(
        <div>
            <Background src={`${imgBaseUrl}original${backGroundUrl}`} />
            
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
    
            {   (similarMovies &&
                similarMovies.length > 0) &&
            <Similar>
                <SimilarHeader><i> Similar Movies </i></SimilarHeader>
                <SimilarList>
                    
                    { similarMovies.map( movie => <MovieCard key={movie.id} movie={movie} /> )}
                </SimilarList>
            </Similar>   
            }
            {
                companies.length > 0 &&
                <Similar>
                    <SimilarHeader><i> Production Companies </i></SimilarHeader>
                    <SimilarList>
                        {companies.map( c=> <Company company={c} key={c.id} /> )}
                    </SimilarList>
                </Similar>
            }
        </div>   
    )
}

export default Detailed
// `${imgBaseUrl}w92${movie.poster_path}`
// background-image: url(${props => props.img});
//


const Background = styled.img`
    position: absolute;
    opacity: 0.3;
    z-index: -1;
    width: 100%;
    height: 231px;
    @media(min-width: 650px){
        height: 513px;
    } 
`

const Similar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 10px 10px;
`
const SimilarList = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    height: 100%;

`
const SimilarHeader = styled.h3`
    font-weight: 600;
    opacity: 0.9;
`


const Movie = styled.div`
    display: flex;
    justify-content: flex-start;
    text-align: center;
    align-items: flex-start;
    height: 231px;
    margin: 20px 30px;
    outline: none;
    border-radius: 8px;
    border: 1px solid transparent;
    @media(min-width: 650px){
        margin: 50px 60px;
        height: 513px;
    } 
`

// movie Details DIV
const Details = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px 5px;
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
        font-size: 0.8rem;
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
`
const Tagline = styled.h3`
    opacity: 0.8;
    color: ${ props => props.theme.colors.primary };
    @media(max-width: 400px){
        font-size: 1rem;
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