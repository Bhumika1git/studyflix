import { useContext } from "react";
import ThemeContext from "./themeContext";

function useTheme() {
  return useContext(ThemeContext);
}

export default useTheme;