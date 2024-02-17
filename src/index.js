import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
    <App />
  </BrowserRouter>
);
