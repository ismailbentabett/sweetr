// components/Authenticatedlayout.tsx

import { useNavigate } from "@solidjs/router";
import { JSX } from "solid-js/jsx-runtime";
import { useAuth } from "../../context/authContext";
import MainSidebar from "../sidebars/Main";
import TrendsSidebar from "../sidebars/Trends";
import { createEffect, createSignal } from "solid-js";
import Modal from "../form/modal";

interface AuthenticatedlayoutProps {
  children:
    | number
    | boolean
    | Node
    | JSX.ArrayElement
    | (string & {})
    | null
    | undefined;
}

const Authenticatedlayout = (props: AuthenticatedlayoutProps) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  createEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });

  const [isOpen, setIsOpen] = createSignal(false);

  const handleOpenSidebar = (value: any) => {
    setIsOpen(value);
  };

  return (
    <div class="flex h-screen bg-gray-900 text-gray-100">
      {/* Main Content */}
      <div class="flex flex-grow">
        <div class="lg:w-1/4">
          <MainSidebar openSidebar={handleOpenSidebar} />
          <Modal isOpen={isOpen()} />
        </div>

        {/* Tweets Feed */}
        <main class="flex-1 p-4  border-x-1 border-solid border-gray-700  xl:max-w-3xl">
        <div class="flex-it h-14 p-4 xl:text-xl text-sm font-bold z-10 backdrop-blur-md bg-opacity-70">
                      Home
                    </div>
          {props.children}
        </main>

        <div class="hidden xl:block w-1/5 mx-4 mt-5">
          <TrendsSidebar />
        </div>
      </div>
    </div>
  );
};

export default Authenticatedlayout;
