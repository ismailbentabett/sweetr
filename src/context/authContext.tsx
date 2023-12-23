// context/AuthContext.js
import {
  createSignal,
  createEffect,
  createContext,
  useContext,
  JSX,
} from "solid-js";
import axios from "axios";

const AuthContext = createContext();
const baseUrl = "http://localhost:8000";

export const AuthProvider = (
  props: JSX.IntrinsicAttributes & { value: unknown } & {
    children: JSX.Element;
  }
) => {
  const [user, setUser] = createSignal(null);
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);

  createEffect(() => {
    axios
      .get(`${baseUrl}/api/user`, {
        withCredentials: true,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        withXSRFToken: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
        if (user()) {
          localStorage.setItem("user", JSON.stringify(user()));
          localStorage.setItem("isAuthenticated", "true");
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("user");
          localStorage.removeItem("isAuthenticated");
          setIsAuthenticated(false);
        }
      })

      .catch((error) => {
        console.error("Error checking authentication:", error);
        // Handle the error appropriately, e.g., redirect to login page
      });
  });

  const login = async (credentials: { email: string; password: string }) => {
    try {
      await axios.get(`${baseUrl}/sanctum/csrf-cookie`);
      await axios.post(`${baseUrl}/login`, credentials, {
        withCredentials: true,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        withXSRFToken: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const userResponse = await axios.get(`${baseUrl}/api/user`, {
        withCredentials: true,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        withXSRFToken: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setUser(userResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await axios.get(`${baseUrl}/sanctum/csrf-cookie`);
      await axios.post(`${baseUrl}/register`, userData, {
        withCredentials: true,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        withXSRFToken: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const userResponse = await axios.get(`${baseUrl}/api/user`, {
        withCredentials: true,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        withXSRFToken: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setUser(userResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    console.log(`${baseUrl}/logout`);
    try {
      await axios.post(
        `${baseUrl}/logout`,
        {},
        {
          withCredentials: true,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN",
          withXSRFToken: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    } catch (error) {
      console.log(error);
    }
  };

  const value = { user, login, register, logout, isAuthenticated };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
