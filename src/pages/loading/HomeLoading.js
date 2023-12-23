import React from "react";

import "./homeLoading.css";

export default function HomeLoading() {
  const loadingPlaceholder = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      {loadingPlaceholder.map((element) => (
        <li className="card-loading-container" key={element}>
          <div className="flag-loading"></div>
          <div className="details-loading">
            <div className="h3"></div>
            <div className="p"></div>
            <div className="p"></div>
            <div className="p"></div>
          </div>
        </li>
      ))}
    </>
  );
}
