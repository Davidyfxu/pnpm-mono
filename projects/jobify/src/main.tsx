import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import App from "./App.tsx";
import "./index.css";
import { AppProvider } from "./context/appContext";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
