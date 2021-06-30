import Row from "./Row"
import requests from "./requests";
import Banner from './Banner'
import Nav from './Nav'
import HomePage from './HomePage'
import Login from './Login'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

//netflixclone2021 --- pwd for TMDB
/**
 * 
 *we need to install dependencies to work with trailer popups

 npm i react-youtube
 npm i movie-trailer
 */

function App() {
  return (
    <BrowserRouter>
      <Switch>
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
              isLargeRow="true"
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
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
 