import React, { useState, useEffect } from "react";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";

//rfce and press tab button --- ES7 shortcut for body creation

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

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
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => {
          console.log("error", error);
          alert(
            "An Error Occured. No trailer found for selected movie"
          );
        });
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <img
              className={`row_poster ${isLargeRow && "row_poster_large"}`}
              key={movie.id}
              //   src={`${base_url}${
              //     isLargeRow ? movie?.poster_path : movie?.backdrop_path
              //   }`}
              src={`${base_url}${movie?.poster_path}`}
              alt={movie.name || movie.title}
              onClick={() => handleClick(movie)}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
