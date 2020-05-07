import http from "./httpService";
import config from "../config.json";

export function getMovies() {
  return http.get(`${config.apiEndpoint}/movies`);
}

export function getMovie(id) {
  return http.get(`${config.apiEndpoint}/movies/${id}`);
}

export function deleteMovie(id) {
  http.delete(`${config.apiEndpoint}/movies/${id}`);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(`${config.apiEndpoint}/movies/${movie._id}`, body);
  }
  return http.post(`${config.apiEndpoint}/movies`, movie);
}
