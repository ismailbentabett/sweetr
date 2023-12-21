/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App";
import { Route, Router } from "@solidjs/router";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import HomeScreen from "./screens/Home";
import { AuthProvider } from "./context/authContext";

const root = document.getElementById("root");

render(
  () => (
    <Router root={HomeScreen}>
      <AuthProvider>
        <Route path="/" component={HomeScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
      </AuthProvider>
    </Router>
  ),

  root!
);
