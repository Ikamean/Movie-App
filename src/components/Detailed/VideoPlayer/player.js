import React from 'react';
import styled from 'styled-components';

const Player = ({ video }) => {   
    return(
        <YoutubePlayer title='youtube'  src={`https://www.youtube.com/embed/${video.key}?autoplay=0&mute=1`}>
        </YoutubePlayer>
    )
}

export default Player

const YoutubePlayer = styled.iframe`
border-radius: 12px;
box-shadow: 4px 4px 14px #000;
width: 150px;
height: 150px;

@media(min-width:650px){
    width:300px;
    height:300px;
    margin: 30px;
}

`

