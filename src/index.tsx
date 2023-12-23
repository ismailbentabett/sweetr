// index.js
import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";
import App from "./App";

import NotFound from "./components/NotFound";
import { AuthProvider } from "./context/authContext";
import "./index.css";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { SweetProvider } from "./context/sweetContext";

const root = document.getElementById("root");

render(
  () => (
    <AuthProvider>
      <SweetProvider>
        <Router root={App}>
          <Route path="/" component={HomeScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/:rest*" component={NotFound} />
        </Router>
      </SweetProvider>
    </AuthProvider>
  ),
  root!
);
