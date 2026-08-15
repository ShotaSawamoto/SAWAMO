import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "../app/page";
import ContactPage from "../app/contact/page";
import MobilePreview from "../app/mobile-preview/page";
import "../app/globals.css";

function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/contact") return <ContactPage />;
  if (path === "/mobile-preview") return <MobilePreview />;
  return <Home />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
