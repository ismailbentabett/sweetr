// components/GuestLayout.tsx

import { useNavigate } from "@solidjs/router";
import { JSX } from "solid-js/jsx-runtime";
import { useAuth } from "../../context/authContext";
import { createComputed, createDeferred, createEffect } from "solid-js";

interface GuestLayoutProps {
  children:
    | number
    | boolean
    | Node
    | JSX.ArrayElement
    | (string & {})
    | null
    | undefined;
}

const GuestLayout = (props: GuestLayoutProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
const delayedIsAuthenticated = createDeferred(isAuthenticated);

  createComputed(() => {
    if (delayedIsAuthenticated()) {
      navigate("/");
    }
  });

  return <>{props.children}</>;
};

export default GuestLayout;
