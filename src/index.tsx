// index.js
import { render } from "solid-js/web";
import App from "./App";
import { Route, Router } from "@solidjs/router";

import { AuthProvider } from "./context/authContext";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import "./index.css";
import { requireAuth } from "./middleware/auth";
import { requireGuest } from "./components/guards/guards";

const root = document.getElementById("root");

render(
  () => (
    <AuthProvider>
      <Router root={App}>
        <Route path="/" component={HomeScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
      </Router>
    </AuthProvider>
  ),
  root!
);
