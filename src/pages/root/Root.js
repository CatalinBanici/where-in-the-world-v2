// REACT
import React, { useEffect, useState } from "react";

// COMPONENTS
import Header from "./components/Header";
import Main from "./components/Main";

// REACT ICONS
import { FaArrowUp } from "react-icons/fa";

// STYLES
import "./root.css";

export default function Root() {
  // local storage theme key
  const THEME_KEY = "themeOptionKey";

  // get the theme state from the local storage
  const STORED_THEME_OPTION = localStorage.getItem(THEME_KEY)
    ? JSON.parse(localStorage.getItem(THEME_KEY))
    : "dark";

  // theme and 'scroll to top' button states
  const [theme, setTheme] = useState(STORED_THEME_OPTION);

  const [showBackToTopButton, setShowBackToTopButton] = useState(false);

  // put the theme state to the local storage
  useEffect(() => {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  }, [theme]);

  // show the 'scroll to top' button when the user has started to scroll down a little
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowBackToTopButton(true);
      } else {
        setShowBackToTopButton(false);
      }
    });
  }, []);

  // theme
  function handleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  // scroll to top on click event
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="app" data-theme={theme}>
      <div className="app-container">
        <Header theme={theme} handleTheme={handleTheme} />
        <Main />

        {/* 'scroll to top' button */}
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
