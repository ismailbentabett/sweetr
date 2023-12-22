// App.tsx
import { JSX } from "solid-js";

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
  return (
    <div>
      <div id="popups" />
      {props.children}
    </div>
  );
};

export default App;
