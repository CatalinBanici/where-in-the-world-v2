// REACT
import React from "react";

// STYLES
import "./card.css";

export default function Card({ country }) {
  return (
    <>
      <div className="flag-container">
        <img
          src={country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
        />
      </div>
      <div className="details-container">
        <h3>{country.name.common}</h3>
        <p>
          Population:{" "}
          {country.population
            .toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
        </p>
        <p>Region: {country.region}</p>
        <p>Capital: {country.capital}</p>
      </div>
    </>
  );
}
