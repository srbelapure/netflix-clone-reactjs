import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import Carousel from 'react-bootstrap/Carousel';
import "./Banner.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner(props) {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      //requests.fetchNetflixOriginals ---> this adds originals to banner. we can use anything of our choice
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovies(request.data.results)
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <header
      className="banner"
    >

      <Carousel activeIndex={index} onSelect={handleSelect} controls={true} touch={true} slide={false}>
        {movies.map((slide, i) => {
          return (
            <Carousel.Item key={slide.id}>
              <img
                className="d-block"
                src={`${base_url}${slide?.backdrop_path}`}
                alt="slider image"
              />
              <Carousel.Caption>
                <h3>{slide.name}</h3>
                <p className="slides-overview">{truncate(slide.overview, 100)}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </header>
  );
}

export default Banner;
