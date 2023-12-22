import axios from "axios";
import { JSX, createSignal, onCleanup } from "solid-js";
import LoadingBar, { LoadingBarRef } from "solid-top-loading-bar";
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

  return (
    <div>
      <LoadingBar
        color="#f11946"
        loadingBar={loadingBar()}
        setLoadingBar={setLoadingBar}
      />

      <div id="popups" />
      {props.children}
    </div>
  );
};

export default App;
