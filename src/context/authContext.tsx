import { JSX, createContext, createSignal, useContext } from "solid-js";

// Define the initial state of the authentication context
type AuthState = {
  isAuthenticated: boolean;
  user: string | null;
  setIsAuthenticated?: (value: boolean) => void;
  setUser?: (value: string | null) => void;
  loading?: boolean;
  setLoading?: (value: boolean) => void;
};

// Create the authentication context
const AuthContext = createContext<AuthState>();

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
  const [loading, setLoading] = createSignal(true);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated(),
        user: user(),
        setIsAuthenticated,
        setUser,
        loading: loading(),
        setLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuthContext };
