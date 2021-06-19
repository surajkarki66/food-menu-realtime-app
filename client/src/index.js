import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { SocketProvider } from "./contexts/SocketProvider";

ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
