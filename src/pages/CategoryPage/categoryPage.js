import React from 'react'
import { useSelector } from 'react-redux';
import CategoryCard from '../../components/CategoryPage/categoryCard';
import styled from 'styled-components';
import { FcRefresh } from "react-icons/fc";
import { useHistory } from 'react-router';

const CategoryPage = () => {
    const category = useSelector(state => state.category.category) || localStorage.getItem('category');
    const upComing = useSelector( state => state.movies.upcoming);
    const topRated = useSelector( state => state.movies.topRated);
    const popular = useSelector( state => state.movies.popular);

    const history = useHistory();

    console.log(category);



    if(category === 'Top Rated'){
        return(
                <GridWrapper >
                    <GridList >
                        
                        { 
                            topRated.map( t => <CategoryCard key={t.id} movie={t} /> )
                        }
                    </GridList>
                </GridWrapper>
        )
    }

    if(category === 'Popular'){
        return(
            <GridWrapper >
                <GridList >

                {
                    popular.map( t => <CategoryCard key={t.id} movie={t} /> )
                }

                </GridList>
            </GridWrapper>
        )
    }

    if(category === 'Upcoming'){
        return(
            <GridWrapper >
                <GridList >

                { 
                    upComing.map( t => <CategoryCard key={t.id} movie={t} /> )
                }
                </GridList>
            </GridWrapper>
        )
    }

    return(
        <Refresh>
            <RefreshBtn onClick={()=>history.push('/')}><FcRefresh /></RefreshBtn>
        </Refresh>
    )
}

export default CategoryPage

const RefreshBtn = styled.button`
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
    border-radius: 8px;
    &:hover{
        box-shadow: 2px 2px ${ props => props.theme.colors.primary };
        transition: 0.5s all ease
    }
    @media(min-width: 650px){
        padding: 20px 40px;
    }
`
const Refresh = styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    height: 40vh;
`

export const GridWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`




export const GridList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 1.5rem 1.5rem;
    @media (min-width: 750px) {
        grid-template-columns: 1fr 1fr 1fr 1fr  ; 
    }
    @media (min-width: 900px) {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr ; 
    }

    @media (max-width: 360px) {
        grid-template-columns: 1fr 1fr ;
  }
`