// REACT
import React from "react";

// REACT ROUTER
import { Outlet } from "react-router-dom";

// STYLES
import "./main.css";

export default function Main() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
