import React, { useState, useEffect } from "react";
import requests from "./requests";
import axios from "./axios";
import YouTube from "react-youtube";
import "./SeriesDetails.css";

const API_KEY = "c9fdccb771653c10a333eda0eb30038c";

const BannerSectionSeries = (props) => {
  return (
    <>
      <header
        className="banner"
        style={{
          backgroundImage: `url(
        "https://image.tmdb.org/t/p/original/${props.movieData?.backdrop_path}")`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
        }}
      >
        <div className="banner-contents">
          <h1 className="banner_title">
            {props.movieData?.title ||
              props.movieData?.name ||
              props.movieData?.original_name}
          </h1>
          <div className="banner_buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">My List</button>
          </div>
          <h1 className="banner_description">
            {truncate(props.movieData?.overview, 150)}
          </h1>
        </div>
        <div className="banner_fadebottom"></div>
      </header>
    </>
  );
};

const SeriesDetailsSection = (props) => {
  const [dropdownvalue, setDropdownValue] = useState(1);
  const [episodeDetails, setEpisodeDetails] = useState();
  useEffect(() => {
    if (props.seriesDetails && props.seriesDetails.id) {
      async function fetchData() {
        const request = await axios.get(
          `https://api.themoviedb.org/3/tv/${props.seriesDetails.id}/season/${dropdownvalue}?api_key=${API_KEY}&language=en-US`
        );
        setEpisodeDetails(request.data);
      }
      fetchData();
    }
  }, [dropdownvalue, props.seriesDetails]);

  const handleOnChange = (e) => {
    setDropdownValue(e.target.value);
  };

  return (
    <div>
      <div className="seasons-dropdown-and-episodes">
        <select value={dropdownvalue} onChange={handleOnChange}>
          {props && props.seriesDetails && props.seriesDetails.seasons
            ? props.seriesDetails.seasons.map((item) => {
                return (
                  <option
                    key={item.season_number + 1}
                    value={item.season_number + 1}
                  >
                    Season {item.season_number + 1}
                  </option>
                );
              })
            : ""}
        </select>
        <div className="episodes-section">
          {episodeDetails && episodeDetails.episodes
            ? episodeDetails.episodes.map((item) => {
                return (
                  <div
                    className="episodes"
                    key={item.episode_number}
                    title={item.name}
                  >
                    Eps {item.episode_number} : {item.name}
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

const OtherDetails = (props) => {
  const [recomendations, setRecomendations] = useState([]);
  useEffect(() => {
    if (props.seriesDetails.id) {
      async function fetchData() {
        const request = await axios.get(
          `https://api.themoviedb.org/3/tv/${props.seriesDetails.id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
        );
        setRecomendations(request.data);
      }
      fetchData();
    }
  }, [props.seriesDetails]);

  console.log("recomendationsrecomendations", recomendations);
  let productionCompanyNames = [];
  let genresNames = [];

  if (props.seriesDetails && props.seriesDetails.production_companies) {
    props.seriesDetails.production_companies.map((companyName) => {
      productionCompanyNames.push(companyName.name);
    });
  }

  if (props.seriesDetails && props.seriesDetails.genres) {
    props.seriesDetails.genres.map((genres) => {
      genresNames.push(genres.name);
    });
  }

  return (
    <div className="other-details-section">
      <div className="series-poster-section">
        <img
          className="series-poster"
          src={`https://image.tmdb.org/t/p/original/${props.seriesDetails?.poster_path}`}
          alt={props.seriesDetails?.original_name}
        />
      </div>
      <div className="description-section">
        <div className="title-and-details">
          <h1>{props.seriesDetails?.original_name}</h1>
          <h5>
            Score: {props.seriesDetails?.vote_average}/{" "}
            {props.seriesDetails?.vote_count} rated
          </h5>
        </div>
        <div className="series-tagline">
          <h6>{props.seriesDetails?.tagline}</h6>
          <p>{props.seriesDetails?.episode_run_time}mins</p>
        </div>
        <div style={{ margin: "10px 0px" }}>
          {props.seriesDetails?.overview}
        </div>
        <div className="production-details">
          {props.seriesDetails && props.seriesDetails.production_countries
            ? props.seriesDetails.production_countries.map((countryName) => {
                return <div className="production-subdetails">Country : {countryName.name}</div>;
              })
            : ""}
          <div className="production-subdetails">Genre : {genresNames.join()}</div>
          <div className="production-subdetails">Released : {props.seriesDetails?.first_air_date}</div>
          <div className="production-subdetails">Production : {productionCompanyNames.join()}</div>
        </div>
      </div>
      <div className="you-may-also-like-section">
        <h4 style={{ color: "lightgray" }}>You may also like</h4>
        <div className="recomendations">
          {recomendations && recomendations.results
            ? recomendations.results.map((item) => {
                return (
                  <div className="recomendations-poster-and-name" key={item.id}>
                    <img
                      className="recomendations-posters"
                      src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
                    />
                    <div>{truncate(item.original_name, 18)}</div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

function SeriesDetails(props) {
  const [seriesDetails, setSeriesDetails] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/tv/${props.location.state.movieData.id}?api_key=${API_KEY}&language=en-US`
      );
      setSeriesDetails(request.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {/* show a banner of tv series */}
      {/*  seasons and episodes*/}
      {/* image and all the deatils */}
      <BannerSectionSeries movieData={props.location.state.movieData} />
      <SeriesDetailsSection seriesDetails={seriesDetails} />
      <hr />
      <OtherDetails seriesDetails={seriesDetails} />
    </div>
  );
}

export default SeriesDetails;
