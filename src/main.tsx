import ReactDOM from "react-dom/client";
import Wrapper from "./Wrapper";
import "./i18n";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Wrapper />);
