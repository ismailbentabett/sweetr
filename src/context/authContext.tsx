import { JSX, createContext, createSignal, useContext } from "solid-js";

// Define the initial state of the authentication context
type AuthState = {
  isAuthenticated: boolean;
  user: string | null;
};

// Create the authentication context
const AuthContext = createContext<AuthState>();

// Create a provider component for the authentication context
const AuthProvider = (props: {
  children:
    | number
    | boolean
    | Node
    | JSX.ArrayElement
    | (string & {})
    | null
    | undefined;
}) => {
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const [user, setUser] = createSignal<string | null>(null);

  // Add any authentication logic here, such as login, logout, etc.

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: isAuthenticated(), user: user() }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuthContext };
