const API_KEY = "c9fdccb771653c10a333eda0eb30038c";

const commonQuery=`with_original_language=en&include_adult=false&watch_region=US`

const requests = {
  fetchTrending: `/trending/all/day?api_key=${API_KEY}&${commonQuery}`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&${commonQuery}&timezone=America/New_York&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&${commonQuery}`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&${commonQuery}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&${commonQuery}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&${commonQuery}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&${commonQuery}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&${commonQuery}&with_genres=99`,
};

export default requests;
