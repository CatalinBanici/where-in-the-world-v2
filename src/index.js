// REACT
import React from "react";
import ReactDOM from "react-dom/client";

// REDUX
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { store } from "./redux/store";
import { countriesApi } from "./redux/api/countriesApi";

// STYLES
import "./index.css";

// COMPONENTS
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
