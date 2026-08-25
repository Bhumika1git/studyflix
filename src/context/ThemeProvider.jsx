import { useEffect, useState } from "react";
import ThemeContext from "./themeContext";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("paper");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "paper" ? "screen" : "paper"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;