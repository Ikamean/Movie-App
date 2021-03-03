import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {getCompanyHomepage} from '../../services/service';

const Company = ({ company }) => {

    const imgBaseUrl = useSelector( state => state.config.imagesConfig.secure_base_url);

    const id = company.id;
    const urlRegex = /www/;

    const [ homepage, setHomepage] = useState('');

    const getPageUrl =  async () =>{
        let url = await getCompanyHomepage(id);
        setHomepage(url);
    }
    useEffect(()=>{
        getPageUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

    return(
        
            urlRegex.test(homepage) ? 
            <a href={homepage} target='_blank'  rel='noreferrer'>
            <CompanyCard>
                <CompanyName>
                    {company.name}
                </CompanyName>
                <CompanyImg>
                {
                        company.logo_path ? 
                        <picture>
                            <source media="(min-width:650px)" srcSet={ `${imgBaseUrl}w154${company.logo_path}`} />
    
                            <img loading='lazy' 
                            src={ `${imgBaseUrl}w92${company.logo_path}`}
                            alt='Movie Poster'/>
    
                        </picture>
    
                        : 
    
                            <img src={require('../../Media/noposter.svg').default} width="92" height="138" alt='No Poster Available' />
                        
                    } 
                </CompanyImg>
            </CompanyCard>
            </a>
            :
            <CompanyCard>
                <CompanyName>
                    {company.name}
                </CompanyName>
                <CompanyImg>
                {
                        company.logo_path ? 
                        <picture>
                            <source media="(min-width:650px)" srcSet={ `${imgBaseUrl}w154${company.logo_path}`} />
    
                            <img loading='lazy' 
                            src={ `${imgBaseUrl}w92${company.logo_path}`}
                            alt='Movie Poster'/>
    
                        </picture>
    
                        : 
    
                            <img src={require('../../Media/noposter.svg').default} width="92" height="138" alt='No Poster Available' />
                        
                    } 
                </CompanyImg>
            </CompanyCard>
        
    )
}

export default Company

    

const CompanyCard = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border: 1px solid #e3e3e3;
    box-shadow: 1px 1px #e3e3e3;
    border-radius: 8px;
    height: 200px;
    width: 100px;
    padding: 5px 10px;
    @media(min-width: 650px){
        height: 240px;
        width: 200px;
    }

`
const CompanyName = styled.h4`

`

const CompanyImg = styled.div`
    
`