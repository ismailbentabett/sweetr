import axios from "axios";

export const authClient = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true, // required to handle the CSRF token
});
