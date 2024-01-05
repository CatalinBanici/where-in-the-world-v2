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
        title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        onClick={handleTheme}
      >
        <span>{theme === "dark" ? <MdDarkMode /> : <MdOutlineWbSunny />}</span>
        {theme === "dark" ? "Light Theme" : "Dark Theme"}
      </button>
    </header>
  );
}
