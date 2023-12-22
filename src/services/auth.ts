import axios from "axios";

export const authClient = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  withXSRFToken: true,
  
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
