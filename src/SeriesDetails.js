import React, { useState, useEffect } from "react";
import requests from "./requests";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useHistory } from "react-router-dom";
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
        //   backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
          backgroundPositionX:"center"
        }}
      >
        <div className="banner-contents">
          <h1 className="banner_title">
            {props.movieData?.title ||
              props.movieData?.name ||
              props.movieData?.original_name}
          </h1>
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
  const [episodeDetails, setEpisodeDetails] = useState([]);
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
  }, [dropdownvalue, props.seriesDetails.id]);

  const handleOnChange = (e) => {
    setDropdownValue(e.target.value);
    props.descProp(null)
  };

  const onEpisodeClick = (episodeSelected) => {
    async function fetchData() {
        const request = await axios.get(
          `https://api.themoviedb.org/3/tv/${props.seriesDetails.id}/season/${episodeSelected.season_number}/episode/${episodeSelected.episode_number}?api_key=${API_KEY}&language=en-US`
        );
       props.descProp(request.data)
      }
      fetchData();
  };
  return (
    <div>
      <div className="seasons-dropdown-and-episodes">
        <select className="seasons-dropdown" value={dropdownvalue} onChange={handleOnChange}>
          {props && props.seriesDetails && props.seriesDetails.seasons
            ? props.seriesDetails.seasons.map((item) => {
                if (item.season_number !== 0) {
                  return (
                    <option key={item.season_number} value={item.season_number}>
                      Season {item.season_number}
                    </option>
                  );
                }
              })
            : ""}
        </select>
        <div className="episodes-section">
          {episodeDetails && episodeDetails.episodes
            ? episodeDetails.episodes.length>0?
            episodeDetails.episodes.map((item) => {
                return (
                  <div
                    className="episodes"
                    key={item.episode_number}
                    title={item.name}
                    onClick={()=>onEpisodeClick(item)}
                  >
                    Eps {item.episode_number} : {item.name}
                  </div>
                );
              }):<div className="no-episodes-found">No episodes found...</div>
            : ""}
        </div>
      </div>
    </div>
  );
};

const OtherDetails = (props) => {
  const [recomendations, setRecomendations] = useState([]);
  const history = useHistory()
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
  }, [props.seriesDetails.id]);

  let productionCompanyNames = [];
  let genresNames = [];
  let productionCountryNames=[]
  let crewMembers=[]
  let episodeCast=[]

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

  if (props.seriesDetails && props.seriesDetails.production_countries) {
    props.seriesDetails.production_countries.map((countryName) => {
      productionCountryNames.push(countryName.name);
    });
  }

  if (props.descriptionOfShowsAsPerEpisodes && props.descriptionOfShowsAsPerEpisodes.crew) {
    props.descriptionOfShowsAsPerEpisodes.crew.map((crew) => {
        crewMembers.push(crew.name+'('+crew.job+')');
    });
  }

  if (props.descriptionOfShowsAsPerEpisodes && props.descriptionOfShowsAsPerEpisodes.guest_stars) {
    props.descriptionOfShowsAsPerEpisodes.guest_stars.map((star) => {
        episodeCast.push(star.name+" "+'as'+" "+star.character);
    });
  }

  const onRecomendationsOptionClick=(movie)=>{
    props.descProp(null)
    window.scrollTo(0,0)
    history.push(`/tv/${movie.original_name}`, {
       movieData: movie
     })
  }
  return (
    <div className="other-details-section">
      <div className="series-poster-section">
        {props.descriptionOfShowsAsPerEpisodes ? (
          <img
            className="episode-poster"
            src={`https://image.tmdb.org/t/p/original/${props.descriptionOfShowsAsPerEpisodes?.still_path}`}
            alt={props.descriptionOfShowsAsPerEpisodes?.name}
          />
        ) : (
          <img
            className="series-poster"
            src={`https://image.tmdb.org/t/p/original/${props.seriesDetails?.poster_path}`}
            alt={props.seriesDetails?.original_name}
          />
        )}
      </div>
      <div className="description-section">
        {props.descriptionOfShowsAsPerEpisodes ? (
          <div className="selected-episode-description">
            <div className="title-and-details">
              <h3>
                Season {props.descriptionOfShowsAsPerEpisodes.season_number}-{" "}Episode {props.descriptionOfShowsAsPerEpisodes?.episode_number}:{" "}
                {props.descriptionOfShowsAsPerEpisodes?.name}
              </h3>
              <h5>
                <span style={{ color: "yellow" }}>
                  Score: {props.descriptionOfShowsAsPerEpisodes?.vote_average}
                </span>{" "}
                ({props.descriptionOfShowsAsPerEpisodes?.vote_count} rated)
              </h5>
            </div>
            <div style={{ margin: "10px 0px" }}>
              {props.descriptionOfShowsAsPerEpisodes?.overview}
            </div>
            <div className="production-details">
              {crewMembers.length > 0 && (
                <div className="production-subdetails">
                  Crew : {crewMembers.join()}
                </div>
              )}
              <div className="production-subdetails">
                Released : {props.descriptionOfShowsAsPerEpisodes?.air_date}
              </div>
              {episodeCast.length > 0 && (
                <div className="production-subdetails">
                  Casts : {episodeCast.join()}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="title-and-details">
              <h1>{props.seriesDetails?.original_name}</h1>
              <h5>
                <span style={{ color: "yellow" }}>
                  Score: {props.seriesDetails?.vote_average}
                </span>{" "}
                ({props.seriesDetails?.vote_count} rated)
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
              <div className="production-subdetails">
                Country : {productionCountryNames.join()}
              </div>
              <div className="production-subdetails">
                Genre : {genresNames.join()}
              </div>
              <div className="production-subdetails">
                Released : {props.seriesDetails?.first_air_date}
              </div>
              <div className="production-subdetails">
                Production : {productionCompanyNames.join()}
              </div>
            </div>
          </>
        )}
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
                      onClick={() => onRecomendationsOptionClick(item)}
                    />
                    <div>{truncate(item.name, 18)}</div>
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
  const [seriesdetails, setSeriesDetails] = useState([]);
  const [descriptionOfShowsAsPerEpisodes,setDescriptionOfShowsAsPerEpisodes] = useState()

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/tv/${props.location.state.movieData.id}?api_key=${API_KEY}&language=en-US`
      );
      setSeriesDetails(request.data);
    }
    fetchData();
  }, [props.location.state.movieData.id]);

  const callBackForDescriptionDetails = (item) => {
    setDescriptionOfShowsAsPerEpisodes(item)
  };
  

  return (
    <div>
      {/* show a banner of tv series */}
      {/*  seasons and episodes*/}
      {/* image and all the deatils */}
      <BannerSectionSeries movieData={props.location.state.movieData} />
      <SeriesDetailsSection seriesDetails={seriesdetails} descProp={callBackForDescriptionDetails}/>
      <hr />
      <OtherDetails seriesDetails={seriesdetails} descriptionOfShowsAsPerEpisodes={descriptionOfShowsAsPerEpisodes} descProp={callBackForDescriptionDetails}/>
    </div>
  );
}

export default SeriesDetails;

/**
 * To send data from child component to parent component,
 * 1] send a callback function as a prop to child component
 * ex: descProp={callBackForDescriptionDetails}
 * 2] Then in the child component access this props and set the value
 * ex: props.descProp(request.data)
 * 3] Then, in the parent component, weite the callback function and access the value set in child component
 * 
 * To send this value to another child component, send it as props and use accordingly
 */