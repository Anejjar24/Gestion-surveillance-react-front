import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { SoftUIControllerProvider } from "context";
import { AuthProvider } from "services/authentification/AuthProvider"; // Ajoutez cette importation

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <SoftUIControllerProvider>
        <App />
      </SoftUIControllerProvider>
    </AuthProvider>
  </BrowserRouter>
);