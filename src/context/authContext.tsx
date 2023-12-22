// context/AuthContext.js
import { createSignal, createEffect, createContext, useContext, JSX } from 'solid-js';
import axios from 'axios';

const AuthContext = createContext();
const baseUrl = import.meta.env.BASE_URL;

export const AuthProvider = (props: JSX.IntrinsicAttributes & { value: unknown } & { children: JSX.Element }) => {
  const [user, setUser] = createSignal(null);

  // Check if the user is authenticated on page load
  createEffect(() => {
    // Make a request to your Laravel backend to check authentication status
    axios.get(`${baseUrl}/user`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => setUser(response.data))
      .catch(() => setUser(null));
  });

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, credentials);

      if (!response.data.token) {
        throw new Error('Login failed');
      }

      localStorage.setItem('token', response.data.token);

      // Make a request to get user data and update the user state
      const userResponse = await axios.get(`${baseUrl}/user`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
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
      const response = await axios.post(`${baseUrl}/register`, userData);

      if (!response.data.token) {
        throw new Error('Registration failed');
      }

      localStorage.setItem('token', response.data.token);

      // Make a request to get user data and update the user state
      const userResponse = await axios.get(`${baseUrl}/user`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
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
      await axios.post(`${baseUrl}/logout`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error(error);
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
