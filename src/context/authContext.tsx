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
const apiUrl = import.meta.env["VITE_API_URL"];

export const AuthProvider = (
  props: JSX.IntrinsicAttributes & { value: unknown } & {
    children: JSX.Element;
  }
) => {
  const [user, setUser] = createSignal(null);

  // Check if the user is authenticated on page load
  createEffect(() => {
    // Make a request to your Laravel backend to check authentication status
    axios
      .get(`${apiUrl}/user`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setUser(response.data))
      .catch(() => setUser(null));
  });

  const login = async (credentials: any) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, credentials);

      if (!response.data.token) {
        throw new Error("Login failed");
      }

      localStorage.setItem("token", response.data.token);

      // Make a request to get user data and update the user state
      const userResponse = await axios.get(`${apiUrl}/user`, {
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

  const logout = async () => {
    try {
      await axios.post(
        `${apiUrl}/logout`,
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
      console.error(error);
    }
  };

  const value = { user, login, logout };

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
