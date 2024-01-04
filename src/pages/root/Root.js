// REACT
import React, { useEffect, useState } from "react";

// STYLES
import "./root.css";

// COMPONENTS
import Header from "./components/Header";
import Main from "./components/Main";

export default function Root() {
  const THEME_KEY = "themeOptionKey";

  const STORED_THEME_OPTION = localStorage.getItem(THEME_KEY)
    ? JSON.parse(localStorage.getItem(THEME_KEY))
    : "dark";

  const [theme, setTheme] = useState(STORED_THEME_OPTION);

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
      </div>
    </div>
  );
}
