// REACT ICONS
import { MdDarkMode, MdOutlineWbSunny } from "react-icons/md";

// REACT ROUTER
import { Link } from "react-router-dom";

// STYLES
import "./header.css";

export default function Header({ theme, handleTheme }) {
  return (
    <header>
      <h1 title="Navigate to Home Page">
        <Link to="/">Countries</Link>
      </h1>
      <button
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        onClick={handleTheme}
      >
        <span>{theme === "dark" ? <MdOutlineWbSunny /> : <MdDarkMode />}</span>
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}
