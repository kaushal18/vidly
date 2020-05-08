import http from "./httpService";
import { apiEndpoint } from "../config.json";

export function register(user) {
  return http.post(`${apiEndpoint}/users`, user);
}
