import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiEndpoint } from "../config.json";

const tokenKey = "token";

http.setJwt(getJwt());

async function login(email, password) {
  const obj = { email, password };
  const { data: jwt } = await http.post(`${apiEndpoint}/auth`, obj);
  localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
};
