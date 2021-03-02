import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import { initializeConfiguration } from './redux/reducers/configReducer';
import { initializePopular, initializeLatest, initializeTopRated, initializeUpcoming } from './redux/reducers/movieReducer';
import { initializeGenres } from './redux/reducers/genresReducer';
import { useDispatch } from 'react-redux';
import Home from './pages/Homepage/homePage';
import MoviePage from './pages/MoviePage/moviePage';
import CategoryPage from './pages/CategoryPage/categoryPage';
import NavBar from './Navbar/navBar';
import SearchResult from './pages/SearchPage/searchResult';
import RatedMovies from './pages/RatedMovies/ratedMoviesPage';
import { initializeGuestRatedMovies } from './redux/reducers/guestMoviesReducer';
import { initializeUserFavourites } from './redux/reducers/userSessionReducer';
import Theme from './Theme/theme';
import Footer from './Footer/footer';
import Latest from './pages/Latest/latest';

const App = () => {
  const dispatch = useDispatch()

  const guestSessionID = localStorage.getItem('guestSessionID');
  const sessionUserID = localStorage.getItem('userSessionID');
  
  const getRandomPage = () => {
    return Math.floor(Math.random() * 10) + 1
  }
  

  const initializeState = async () =>{
      let random = Number(getRandomPage());
      await dispatch (initializeConfiguration());
      await dispatch (initializePopular('popular',1));
      await dispatch (initializeTopRated('top_rated',1));
      await dispatch (initializeUpcoming('upcoming',1));
      await dispatch (initializeLatest('latest'));
      await dispatch (initializeGenres());
      if(guestSessionID){
        await dispatch(initializeGuestRatedMovies(guestSessionID));
      }
      if(sessionUserID){
        await dispatch(initializeUserFavourites(sessionUserID))
      }
      
  }


  useEffect(()=>{
      initializeState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch]);

  return(
    <>
    <Theme>
        <NavBar />

      <Switch>

        <Route exact  path='/'>
            <Home />
        </Route>

        <Route exact path='/favourites'>
          <RatedMovies />
        </Route>

        <Route exact path='/movie/:name'>
            <MoviePage />
        </Route>

        <Route exact path='/search'>
          <SearchResult />
        </Route>

        <Route exact path='/latest'>
          <Latest />
        </Route>

        <Route exact path='/category'>
          <CategoryPage />
        </Route>

        

      </Switch>
      <Footer />
    </Theme>
    </>
  )
}

export default App
