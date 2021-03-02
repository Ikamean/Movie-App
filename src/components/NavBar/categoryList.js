import React from 'react';
import CategoryButton from './categoryButton';
import styled from 'styled-components';

const CategoryList = () => {
    const categoryArray = ["Top Rated", "Popular" , "Upcoming", "Latest", "Favourites" ]

    return(
        <CategoryDiv>
            {
                categoryArray.map( c => <CategoryButton key={c} value={c} /> )
            }
        </CategoryDiv>
    )
}

export default CategoryList

const CategoryDiv = styled.div`
    display:flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    @media (max-width: 360px) {
    justify-content: center;
  }
`