import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext.jsx";

axios.defaults.baseURL =
  import.meta.env.VITE_REACT_APP_URI || "http://localhost:5000/api";
axios.defaults.withCredentials = true; //helps with cookies in the backend

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
