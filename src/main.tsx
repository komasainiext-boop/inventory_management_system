import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Root element not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", (): void => {
    void navigator.serviceWorker.register("/sw.js");
  });
}
