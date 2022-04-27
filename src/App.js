import React,{useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'
import Row from "./Row"
import requests from "./requests";
import Banner from './Banner'
import Nav from './Nav'
import HomePage from './HomePage'
import Login from './Login'
import ProfileScreen from './ProfileScreen'
import SeriesDetails from './SeriesDetails'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import { auth } from "./firebase";
import { selectUser } from "./features/userSlice";
import { login, logout } from "./features/userSlice";
// import { createStore} from "redux";
// import { Provider } from 'react-redux';
// import { ConfigureStore } from './redux/configureStore';


//netflixclone2021 --- pwd for TMDB
/**
 * 
 *we need to install dependencies to work with trailer popups

 npm i react-youtube
 npm i movie-trailer
 */


//  const AppWrapper = () => {
//   // const store = ConfigureStore();

//   return (
//     <Provider store={store}> 
//       <App />  
//     </Provider>
//   )
// }


function App() {
const user= useSelector(selectUser);
// const user= null
const dispatch = useDispatch();

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((userAuth) => {
    if (userAuth) {
      dispatch(
        login({
          uid: userAuth.uid,
          email: userAuth.email,
        })
      );
    } else {
      dispatch(logout());
    }
  });
  return () => {
    unsubscribe();
  };
}, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <>
        <div className="App">
          <Nav />
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/movies">
            <Banner />
            <Row
              title="NETFLIX ORIGINALS"
              fetchUrl={requests.fetchNetflixOriginals}
              isNetflixOriginalTvShow={true}
            />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            <Row
              title="Romance Movies"
              fetchUrl={requests.fetchRomanceMovies}
            />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
          </Route>
          <Route path="/profile" component={ProfileScreen}/>
          <Route path="/tv/:seriesname" component={SeriesDetails}/>
        </div>
        </>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
// export default AppWrapper;
 