// REACT
import React, { useEffect, useState } from "react";

// STYLES
import "./root.css";

// COMPONENTS
import Header from "./components/Header";
import Main from "./components/Main";

// REACT ICONS
import { FaArrowUp } from "react-icons/fa";

export default function Root() {
  const THEME_KEY = "themeOptionKey";

  const STORED_THEME_OPTION = localStorage.getItem(THEME_KEY)
    ? JSON.parse(localStorage.getItem(THEME_KEY))
    : "dark";

  const [theme, setTheme] = useState(STORED_THEME_OPTION);

  const [showBackToTopButton, setShowBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowBackToTopButton(true);
      } else {
        setShowBackToTopButton(false);
      }
    });
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
    console.log("theme option effect");
  }, [theme]);

  function handleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  return (
    <div className="app" data-theme={theme}>
      <div className="app-container">
        <Header theme={theme} handleTheme={handleTheme} />
        <Main />
        {showBackToTopButton && (
          <button
            className="back-to-top-button"
            onClick={scrollToTop}
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </button>
        )}
      </div>
    </div>
  );
}
