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
import userScreen from "./screens/userScreen";
import { UserProvider } from "./context/userContext";
import LikesScreen from "./screens/LikesScreen";

const root = document.getElementById("root");

render(
  () => (
    // @ts-ignore
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
            <Route path="/bookmarks" component={BookmarksScreen} />
            <Route path="/settings" component={SettingsScreen} />
            <Route path="/:rest*" component={NotFound} />
          </Router>
        </SweetProvider>
      </UserProvider>
    </AuthProvider>
  ),
  root!
);
function SettingsScreen(props: RouteSectionProps<unknown>): Element {
  throw new Error("Function not implemented.");
}

function BookmarksScreen(props: RouteSectionProps<unknown>): Element {
  throw new Error("Function not implemented.");
}
