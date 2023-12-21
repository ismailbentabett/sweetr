/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App";
import { Route, Router } from "@solidjs/router";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import HomeScreen from "./screens/Home";

const root = document.getElementById("root");

render(
  () => (
    <Router root={HomeScreen}>
      <Route path="/" component={HomeScreen} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
    </Router>
  ),

  root!
);
