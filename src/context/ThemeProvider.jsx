import { useEffect, useState } from "react";
import ThemeContext from "./themeContext";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("studyflix-theme");
    return storedTheme === "screen" ? "screen" : "paper";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("studyflix-theme", theme);
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