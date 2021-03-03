import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Poster, NoPoster, MovieDate } from '../Homepage/movieCard';
import { initializeCurrentMovie } from '../../redux/reducers/currentReducer';

const CategoryCard = ({ movie }) => {
    const imgBaseUrl = useSelector( state => state.config.imagesConfig.secure_base_url);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = async () => {

        localStorage.setItem('currentMovieId',movie.id);
        
        await dispatch( initializeCurrentMovie(movie.id) );

        history.push(`/movie/${movie.title}`);

    }

    return(
        <>
        <Wrapper >
            <BorderWrapper>
                <PosterTitle onClick={()=>handleClick()}>
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
                
                    <CategoryTitle> { movie.title } </CategoryTitle>
                </PosterTitle>    
                    <MovieDate>{ movie.release_date }</MovieDate>
            </BorderWrapper>
            
        </Wrapper>
            
        </>
    )

}

export default CategoryCard

const BorderWrapper = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #e3e3e3;
    box-shadow: 1px 1px #e3e3e3;
    border-radius: 8px;
    height: 100%;
`

const PosterTitle = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`

export const CategoryTitle = styled.div`
    font-weight: 700;
    text-align: center;
    color: ${ props=> props.theme.colors.black };
    cursor: pointer;
    width: 92px;
    &:hover{
        color: ${ props => props.theme.colors.secondary };
        transition: all 0.5s ease;
    }
`

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    border: 1px solid transparent;
    @media (max-width: 360px) {
    padding: 5px;
    font-size: 13px;
  }
`