import React, { useState, useEffect, useRef} from "react";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useHistory } from "react-router-dom";
import "./Row.css";
import SeriesDetails from "./SeriesDetails";

//rfce and press tab button --- ES7 shortcut for body creation

const base_url = "https://image.tmdb.org/t/p/original/";
const API_KEY = "c9fdccb771653c10a333eda0eb30038c";

function Row({ title, fetchUrl ,isNetflixOriginalTvShow}) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const trailerRef = useRef()
  const history = useHistory()
  useEffect(() => {
    //[] => run only once when rows load{i.e; on page load}

    //we are sending request to 3rd party service, so use async
    //await -> it says wait for promise to come back after we make a request
    //fetchUrl is added to dependency array coz, we are adding a variable from outside the block
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "400px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (movie.media_type === "tv" || isNetflixOriginalTvShow) {
      history.push(`/tv/${movie.original_name}`, {
        movieData: movie
      })
    } else {
      if (trailerUrl) {
        setTrailerUrl("");
      } else {
        movieTrailer(movie?.name || movie?.title || movie?.original_title || "")
          .then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
            trailerRef.current.scrollIntoView({ behavior: 'smooth', block: "center"})
          })
          .catch((error) => {
            console.log("error", error);
            alert("An Error Occured. No trailer found for selected movie");
          });
      }
    }
  };

  return (
    <>
      <div className="row">
        <h4>{title}</h4>
        <div className="row_posters">
          {movies.map((movie) => {
            return (
              <img
                className={`row_poster`}
                key={movie.id}
                src={`${base_url}${movie?.poster_path}`}
                alt={movie.name || movie.title}
                onClick={() => handleClick(movie)}
              />
            );
          })}
        </div>
        <div className="poster_item_trailer" ref={trailerRef}>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
      </div>
    </>
  );
}

export default Row;
