// components/GuestLayout.tsx

import { useNavigate } from "@solidjs/router";
import { JSX } from "solid-js/jsx-runtime";
import { useAuth } from "../../context/authContext";

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
  const { user } = useAuth();
  const navigate = useNavigate();
  if (user()) {
    console.log(user());
    navigate("/");
    return null;
  }
  return <>{props.children}</>;
};

export default GuestLayout;
