import http from "./httpService";
import config from "../config.json";

export function getMovies() {
  return http.get(`${config.apiEndpoint}/movies`);
}

export function deleteMovie(id) {
  http.delete(`${config.apiEndpoint}/movies/${id}`);
}
