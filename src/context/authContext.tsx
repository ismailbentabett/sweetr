// context/AuthContext.js
import {
  createSignal,
  createEffect,
  createContext,
  useContext,
  JSX,
} from "solid-js";
import { authClient } from "../services/auth";
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = (
  props: JSX.IntrinsicAttributes & { value: unknown } & {
    children: JSX.Element;
  }
) => {
  const [user, setUser] = createSignal(null);

  // Check if the user is authenticated on page load
  createEffect(() => {
    // Make a request to your Laravel backend to check authentication status
    authClient
      .get(`user`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response: { data: any }) => setUser(response.data))
      .catch(() => setUser(null));
  });

  const login = async (credentials: { email: string; password: string }) => {
    try {
      // Fetch CSRF token
      await authClient.get(`sanctum/csrf-cookie`);

      // Make a request to login
      const response = await authClient.post(`login`, credentials);

      if (!response.data.token) {
        throw new Error("Login failed");
      }

      localStorage.setItem("token", response.data.token);

      // Make a request to get user data and update the user state
      const userResponse = await authClient.get(`user`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${response.data.token}`,
        },
      });

      setUser(userResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (userData: { name: string; email: string; password: string }) => {
    try {
      // Fetch CSRF token
      await authClient.get(`sanctum/csrf-cookie`);
      //get crsf from cookies 
      const cookies = Cookies.get('XSRF-TOKEN')
    // Make a request to register with the CSRF token in the headers
    const response = await authClient.post(`register`, userData, {
      headers: {
        'X-XSRF-TOKEN': cookies,
      },
    });
  
      localStorage.setItem("token", response.data.token);
  
      // Make a request to get user data and update the user state
      const userResponse = await authClient.get(`user`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${response.data.token}`,
        },
      });
  
      setUser(userResponse.data);
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle different types of errors appropriately
    }
  };
  

  const logout = async () => {
    console.log(`logout`);
    try {
      await authClient.post(
        `logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const value = { user, login, register, logout };

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
