import axios from "axios";
import { toast } from "react-toastify";

// interceptor for global unexpected errors
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging unexpected error", error);
    toast.error("An unexpected error occured");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  // add jwt to header to access protected API endpoint
  // only users logged in (having valid JWT) can access API
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
