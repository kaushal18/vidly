import http from "./httpService";
import { apiEndpoint } from "../config.json";

export function getMovies() {
  return http.get(`${apiEndpoint}/movies`);
}

export function getMovie(id) {
  return http.get(`${apiEndpoint}/movies/${id}`);
}

export function deleteMovie(id) {
  http.delete(`${apiEndpoint}/movies/${id}`);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(`${apiEndpoint}/movies/${movie._id}`, body);
  }
  return http.post(`${apiEndpoint}/movies`, movie);
}
