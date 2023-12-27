import React from "react";
import "./detailsLoading.css";

export default function DetailsLoading() {
  return (
    <div className="details-loading-container">
      <div className="flag-details-loading-container">
        <div className="flag-details-loading"></div>
      </div>
      <div className="details-details-loading">
        <div className="h2-loading"></div>
        <ul className="ul-loading">
          <li className="li-loading"></li>
          <li className="li-loading"></li>
          <li className="li-loading"></li>
          <li className="li-loading"></li>
          <li className="li-loading"></li>
          <li className="li-loading"></li>
          <li className="li-loading"></li>
          <li className="li-loading"></li>
        </ul>
        <div className="google"></div>
        <div className="border-title-loading"></div>
        <div className="border-button-loading"></div>
      </div>
    </div>
  );
}
