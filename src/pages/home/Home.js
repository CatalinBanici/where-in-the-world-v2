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
    isFetching: allCountriesLoading,
    isSuccess: allCountriesSuccess,
    error: allCountriesError,
  } = useGetAllCountriesQuery();
  const [
    triggerFetchRegionCountries,
    {
      data: regionCountriesData,
      isFetching: regionCountriesLoading,
      isSuccess: regionCountriesSuccess,
      error: regionCountriesError,
    },
  ] = useLazyGetCountriesByRegionQuery();
  const [
    triggerFetchSubRegionCountries,
    {
      data: subRegionCountriesData,
      isFetching: subRegionCountriesLoading,
      isSuccess: subRegionCountriesSuccess,
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
  }, [filterByRegionOption]);

  useEffect(() => {
    if (filterBySubRegionOption) {
      triggerFetchSubRegionCountries(filterBySubRegionOption);
    }
  }, [filterBySubRegionOption]);

  let renderData;
  let countryData;

  if (
    allCountriesLoading ||
    regionCountriesLoading ||
    subRegionCountriesLoading
  ) {
    renderData = (
      <div style={{ color: "white", fontSize: "100px" }}>LOADING</div>
    );
  } else if (
    allCountriesError ||
    regionCountriesError ||
    subRegionCountriesError
  ) {
    renderData = <div style={{ color: "white", fontSize: "100px" }}>ERROR</div>;
  } else if (
    allCountriesSuccess ||
    regionCountriesSuccess ||
    subRegionCountriesSuccess
  ) {
    if (!filterByRegionOption && allCountriesData) {
      countryData = [...allCountriesData];
    } else if (filterByRegionOption && regionCountriesData) {
      countryData = [...regionCountriesData];
    } else {
      return null;
    }
    if (filterBySubRegionOption && subRegionCountriesData) {
      countryData = [...subRegionCountriesData];
    }

    if (sortOption) {
      countryData.sort((a, b) => {
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
    }

    if (filterSearchByNameOption) {
      countryData = countryData.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(filterSearchByNameOption.toLowerCase())
      );
    }

    renderData = countryData.map((country, index) => (
      <li className="card-list" key={index}>
        <Link
          className="link-card"
          title="Click to view more details."
          to="details"
        >
          <Card country={country} />
        </Link>
      </li>
    ));
  }

  const regions = allCountriesData?.map((e) => e.region);
  const regionsArray = [...new Set(regions)];

  const subRegions =
    (filterByRegionOption && regionCountriesData?.map((e) => e.subregion)) ||
    allCountriesData?.map((e) => e.subregion);
  const subRegionsArray = [...new Set(subRegions)];

  return (
    <>
      <div className="filter-container">
        <Filters
          renderData={renderData}
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
      <ul className="card-container">{renderData}</ul>
    </>
  );
}