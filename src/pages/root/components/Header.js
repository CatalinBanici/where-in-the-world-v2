// REACT ICONS
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

// STYLES
import "./header.css";

export default function Header({ theme, handleTheme }) {
  return (
    <header>
      <h1>Where in the world?</h1>
      <button onClick={handleTheme}>
        <span>{theme === "dark" ? <MdDarkMode /> : <MdOutlineDarkMode />}</span>
        Dark Mode
      </button>
    </header>
  );
}
