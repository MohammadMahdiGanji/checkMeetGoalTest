// import dependency
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import component
import App from "./app.tsx";

// import stype
import "./assets/input.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
