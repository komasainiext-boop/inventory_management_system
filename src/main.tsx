import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Root element not found.");
}

const registerServiceWorker = async (): Promise<void> => {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  try {
    await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });
  } catch (error: unknown) {
    console.error("Service Worker registration failed:", error);
  }
};

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

void registerServiceWorker();
