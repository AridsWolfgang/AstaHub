import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./app/globals.css";

// Apply stored theme before paint (mirrors src/app/layout.tsx themeInitScript)
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
