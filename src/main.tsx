import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Apply the stored theme before first paint to avoid a flash of the wrong theme.
try {
  const t = localStorage.getItem("asta-theme");
  if (t === "light") document.documentElement.setAttribute("data-theme", "light");
} catch {}

// Register PWA service worker (offline cache, network-first navigation)
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
