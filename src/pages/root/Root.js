// REACT
import React, { useEffect, useState } from "react";

// COMPONENTS
import Header from "./components/Header";
import Main from "./components/Main";

// STYLES
import "./root.css";

export default function Root() {
  // local storage theme key
  const THEME_KEY = "themeOptionKey";

  // get the theme state from the local storage
  const STORED_THEME_OPTION = localStorage.getItem(THEME_KEY)
    ? JSON.parse(localStorage.getItem(THEME_KEY))
    : "dark";

  // theme button states
  const [theme, setTheme] = useState(STORED_THEME_OPTION);

  // put the theme state to the local storage
  useEffect(() => {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  }, [theme]);

  // theme
  function handleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  return (
    <div className="app" data-theme={theme}>
      <div className="app-container">
        <Header theme={theme} handleTheme={handleTheme} />
        <Main />
      </div>
    </div>
  );
}
