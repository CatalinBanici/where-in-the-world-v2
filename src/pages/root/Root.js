// REACT
import React, { useState } from "react";

// STYLES
import "./root.css";

// COMPONENTS
import Header from "./components/Header";
import Main from "./components/Main";

export default function Root() {
  const [theme, setTheme] = useState("dark");

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
