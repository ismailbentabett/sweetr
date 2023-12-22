/*
 * This is the initial API interface
 * we set the base URL for the API
 */

import axios from "axios";

export const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true, // required to handle the CSRF token
});
