import { JSX, createEffect, createSignal } from "solid-js";
// @ts-ignore
import LoadingBar, { LoadingBarRef } from "solid-top-loading-bar";
import { useToast } from "./context/ToastContext";
import { Toaster } from "solid-toast";
import axios from "./helpers/axios";
import axiosInstance from "axios";

const App = (props: {
  children?:
    | number
    | boolean
    | Node
    | JSX.ArrayElement
    | (string & {})
    | null
    | undefined;
}) => {
  const [loadingBar, setLoadingBar] = createSignal<LoadingBarRef>();

  axios.interceptors.request.use(
    (config) => {
      // Start the loading bar when a request is initiated
      loadingBar()?.continuousStart();
      return config;
    },
    (error) => {
      // Handle request errors
      loadingBar()?.complete();
    }
  );
  axiosInstance.interceptors.request.use(
    (config) => {
      // Start the loading bar when a request is initiated
      loadingBar()?.continuousStart();
      return config;
    },
    (error) => {
      // Handle request errors
      loadingBar()?.complete();
    }
  );
  // Axios response interceptor
  axios.interceptors.response.use(
    (response) => {
      // Stop the loading bar when a response is received
      loadingBar()?.complete();
      return response;
    },
    (error) => {
      // Handle response errors
      loadingBar()?.complete();
    }
  );
  axiosInstance.interceptors.response.use(
    (response) => {
      // Stop the loading bar when a response is received
      loadingBar()?.complete();
      return response;
    },
    (error) => {
      // Handle response errors
      loadingBar()?.complete();
    }
  );

  return (
    <div>
      <LoadingBar
        color="#D91346"
        loadingBar={loadingBar()}
        setLoadingBar={setLoadingBar}
      />
      <Toaster position="top-center" gutter={8} />
      <div id="popups" />
      {props.children}
    </div>
  );
};

export default App;
