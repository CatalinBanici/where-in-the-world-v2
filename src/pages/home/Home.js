// REACT
import React, { useState, useEffect } from "react";

// REDUX
import {
  useGetAllCountriesQuery,
  useLazyGetCountriesByRegionQuery,
  useLazyGetCountriesBySubRegionQuery,
} from "../../redux/api/countriesApi";
import Filters from "./components/Filters";
import { Link } from "react-router-dom";
import Card from "./components/Card";

// STYLES
import "./home.css";

export default function Home() {
  const {
    data: allCountriesData,
    isLoading: allCountriesLoading,
    error: allCountriesError,
  } = useGetAllCountriesQuery();
  const [
    triggerFetchRegionCountries,
    {
      data: regionCountriesData,
      isLoading: regionCountriesLoading,
      error: regionCountriesError,
    },
  ] = useLazyGetCountriesByRegionQuery();
  const [
    triggerFetchSubRegionCountries,
    {
      data: subRegionCountriesData,
      isLoading: subRegionCountriesLoading,
      error: subRegionCountriesError,
    },
  ] = useLazyGetCountriesBySubRegionQuery();

  const [sortOption, setSortOption] = useState("");
  const [filterByRegionOption, setFilterByRegionOption] = useState("");
  const [filterBySubRegionOption, setFilterBySubRegionOption] = useState("");
  const [filterSearchByNameOption, setFilterSearchByNameOption] = useState("");

  useEffect(() => {
    if (filterByRegionOption) {
      triggerFetchRegionCountries(filterByRegionOption);
    }
    console.log("filterByRegionOption effect");
  }, [filterByRegionOption]);

  useEffect(() => {
    if (filterBySubRegionOption) {
      triggerFetchSubRegionCountries(filterBySubRegionOption);
      console.log("filterBySubRegionOption effect");
    }
  }, [filterBySubRegionOption]);

  if (
    allCountriesLoading ||
    regionCountriesLoading ||
    subRegionCountriesLoading
  ) {
    return <div>Loading...</div>;
  }

  if (allCountriesError || regionCountriesError || subRegionCountriesError) {
    return <div>ERROR</div>;
  }

  let displayCountries;

  if (allCountriesData && !filterByRegionOption) {
    displayCountries = [...allCountriesData];
  } else if (regionCountriesData && filterByRegionOption) {
    displayCountries = [...regionCountriesData];
  } else {
    return null;
  }

  if (subRegionCountriesData && filterBySubRegionOption) {
    displayCountries = [...subRegionCountriesData];
  }

  if (filterSearchByNameOption) {
    displayCountries = displayCountries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(filterSearchByNameOption.toLowerCase())
    );
  }

  displayCountries.sort((a, b) => {
    switch (sortOption) {
      case "pop+":
        return a.population - b.population;
      case "pop-":
        return b.population - a.population;
      case "name+":
        return a.name.common.localeCompare(b.name.common);
      case "name-":
        return b.name.common.localeCompare(a.name.common);
      default:
        return null;
    }
  });

  const subRegions =
    (filterByRegionOption && regionCountriesData.map((e) => e.subregion)) ||
    allCountriesData.map((e) => e.subregion);
  const subRegionsArray = [...new Set(subRegions)];

  const regions = allCountriesData.map((e) => e.region);
  const regionsArray = [...new Set(regions)];

  console.log(displayCountries);

  return (
    <>
      <div className="filter-container">
        <Filters
          displayCountries={displayCountries}
          subRegionsArray={subRegionsArray}
          regionsArray={regionsArray}
          sortOption={sortOption}
          setSortOption={setSortOption}
          filterByRegionOption={filterByRegionOption}
          setFilterByRegionOption={setFilterByRegionOption}
          filterBySubRegionOption={filterBySubRegionOption}
          setFilterBySubRegionOption={setFilterBySubRegionOption}
          filterSearchByNameOption={filterSearchByNameOption}
          setFilterSearchByNameOption={setFilterSearchByNameOption}
        />
      </div>
      <ul className="card-container">
        {displayCountries.map((country, index) => (
          <li className="card-list" key={index}>
            <Link
              className="link-card"
              title="Click to view more details."
              to="details"
            >
              <Card country={country} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
