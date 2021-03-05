import React, { useEffect, useState } from 'react';
import { getGuestId } from '../services/login';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getToken, getUserSessionId, logoutService } from '../services/login';
import { getUserDetails } from '../services/userSession';
import { initializeGuestRatedMovies } from '../redux/reducers/guestMoviesReducer';
import styled from 'styled-components';
import { FaUserSecret, FaUserCircle } from "react-icons/fa";
import { BiArrowBack, BiLogOutCircle } from "react-icons/bi"


const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [ guest, setGuest ] = useState(false);
    const [ user, setUser ] = useState(false);
    
    const accountUsername = localStorage.getItem('AccountUsername');
    const accountName = localStorage.getItem('AccountName');
    

    const requestToken = localStorage.getItem('request_token');
    const authentification = localStorage.getItem('authentification');
    const userSessionID = localStorage.getItem('userSessionID');
    const guestSessionID = localStorage.getItem('guestSessionID');

    const handleGuestLogin = async () => {
        const guestSessionId = localStorage.getItem('guestSessionID');

        if( !guestSessionId ){
            const session = await getGuestId();
            if( session.success === true){
                localStorage.setItem('guestSessionID', session.guest_session_id);
                await dispatch(initializeGuestRatedMovies(session.guest_session_id));
            }
        }
        
        setGuest(true);
    }

    const generateToken = async () => {
        let tokenCredentials = await getToken()

        let token = localStorage.getItem('request_token');
        if(!token){
            localStorage.setItem('request_token', tokenCredentials.request_token);
        }
        
    }

    

    useEffect(()=>{
        generateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ requestToken, dispatch ])


    const handleAuthentication =  () => {
        localStorage.setItem('authentification', 'Loading'); 
    }

    const handleUserLoGin = async () => {
        let userSessionId =  await getUserSessionId(requestToken);
        
        if(userSessionId.success === true){

            localStorage.setItem('userSessionID', userSessionId.session_id)
            setUser(true);
            
            let accountDetails = await getUserDetails(userSessionId.session_id);
            

            localStorage.setItem('AccountUsername',accountDetails.username)
            localStorage.setItem('AccountName',accountDetails.name)
            localStorage.setItem('accountId', accountDetails.id)

            window.location.reload(true);
        }
    }

    
    const handleLogout = async () =>{
        const userSessionID = localStorage.getItem('userSessionID')
        localStorage.clear();

        if(userSessionID){
            await logoutService(userSessionID)
        
        }
        history.push('/');
        window.location.reload(true); 
    }


    if(guestSessionID){
        return(
            <DIV>
                <AccountCircle>
                    <FaUserSecret/>
                </AccountCircle>
                <Button onClick={()=>handleLogout()}> <BiLogOutCircle /></Button>
            </DIV>
        )
    }
    if(userSessionID){
        return(
            <DIV>
                <AccountCircle >
                    <FaUserCircle /> {accountUsername? accountUsername : accountName} {" "}
                </AccountCircle>
                <Button onClick={()=>handleLogout()}> <BiLogOutCircle /> </Button>
            </DIV>
        )
    }
    if(authentification){
        return(
            <DIV>
                <Button onClick={()=>handleUserLoGin()}>Login <FaUserCircle /></Button>
                <Button onClick={()=>handleLogout()}> <BiArrowBack/> </Button>
            </DIV>
        )
    }
    if(!guest && !user){
        return(
            <DIV>
                <Button bgColor='yellow' onClick={()=>handleGuestLogin()}>Guest <FaUserSecret/> </Button>
                <a href={`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000`} >
                    <Button onClick={()=>handleAuthentication()}>
                User <FaUserCircle />
                    </Button> 
                </a>

            </DIV>
        )
    }
}

export default Login

const DIV = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    
`
const Button = styled.button`
    padding: 0.5rem;
    margin-right: 1rem;
    cursor: pointer;
    width: 100px;
    border-radius: 8px;
    border: 1px solid transparent;
    background-color: ${ props => props.theme.colors.grey };
    color: ${ props => props.theme.colors.white };
    outline:none;
    font-weight: 700;
    &:hover{
        opacity: 0.7;
        transition: all 0.5s ease;
        padding: 0.4rem;
        font-size: 0.9rem;
    }
    &:active{
        border: 1px solid transparent;
    }
    @media(max-width: 360px){
        width: 60px;
    }
`

const AccountCircle = styled.div`
    width: 100%;
    display:flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 0.5rem;
    color: ${ props => props.theme.colors.white };
    font-size: 1.2rem;
`