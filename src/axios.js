import axios from "axios";

//base-url is used to make requests to movies DB
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;

//default exports can be automatically renamed when importing in a file, hence we are using axios from './axios in Row.js
