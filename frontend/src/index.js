import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App";

import { AuthContextProvider } from "./context/authContext";
import { BASE_URL } from "./utils/config";

axios.defaults.baseURL = BASE_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </>
);

