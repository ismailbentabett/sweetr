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
import userScreen from "./screens/userScreen";
import { UserProvider } from "./context/userContext";
import LikesScreen from "./screens/LikesScreen";
import BookMarkScreen from "./screens/BookMarkScreen";
import SettingScreen from "./screens/SettingScreen";
import { ToastProvider } from "./context/ToastContext";

const root = document.getElementById("root");

render(
  () => (
    <ToastProvider>
      <AuthProvider>
        <UserProvider>
          <SweetProvider>
            <Router root={App}>
              <Route path="/" component={HomeScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/profile" component={ProfileScreen} />
              <Route path="/user/:id" component={userScreen} />
              <Route path="/likes" component={LikesScreen} />
              <Route path="/bookmarks" component={BookMarkScreen} />
              <Route path="/settings" component={SettingScreen} />
              <Route path="/:rest*" component={NotFound} />
            </Router>
          </SweetProvider>
        </UserProvider>
      </AuthProvider>
    </ToastProvider>
  ),
  root!
);
