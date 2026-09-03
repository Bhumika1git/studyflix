import useTheme from "../context/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle ${theme}`}
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "paper" ? "screen" : "paper"} mode`}
    >
      <span className="theme-label">PAPER</span>

      <span className="theme-track">
        <span className="theme-dot"></span>
      </span>

      <span className="theme-label">SCREEN</span>
    </button>
  );
}

export default ThemeToggle;