import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
  },
});

axios.interceptors.response.use(null, (err) => {
  const error = {
    status: err.response?.status,
    original: err,
    validation: {},
    message: null,
  };

  switch (err.response?.status) {
    case 422:
      error.validation = err.response.data.errors;
      break;
    case 401:
      error.message = err.response.data.message;
      break;
    default:
      error.message = err.response?.data?.message || err.message;
  }

  return Promise.reject(error);
});

export default axios;
