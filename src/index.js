import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextWrapper } from "./context/auth.context";
import { APIContextWrapper } from "./context/api.context";
import { GlobalContextWrapper } from "./context/global.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <APIContextWrapper>
      <AuthContextWrapper>
        <GlobalContextWrapper>
          <Router>
            <App />
          </Router>
        </GlobalContextWrapper>
      </AuthContextWrapper>
    </APIContextWrapper>
  </React.StrictMode>
);

reportWebVitals();
