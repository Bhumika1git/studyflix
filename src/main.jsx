import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/design-system.css";
import ThemeProvider from "./context/ThemeProvider";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);