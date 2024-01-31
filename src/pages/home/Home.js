// REACT
import React, { useState, useEffect } from "react";

// REACT ROUTER
import { Link } from "react-router-dom";

// REDUX
import {
  useGetAllCountriesQuery,
  useLazyGetCountriesByRegionQuery,
  useLazyGetCountriesBySubRegionQuery,
} from "../../redux/api/countriesApi";

// COMPONENTS
import Filters from "./components/Filters";
import Card from "./components/Card";
import HomeLoading from "../loading/HomeLoading";
import Error from "../error/Error";

// REACT ICONS
import { FaArrowUp } from "react-icons/fa";

// STYLES
import "./home.css";

export default function Home() {
  // data from the api
  const {
    data: allCountriesData,
    isFetching: allCountriesLoading,
    isSuccess: allCountriesSuccess,
    isError: allCountriesError,
  } = useGetAllCountriesQuery();
  const [
    triggerFetchRegionCountries,
    {
      data: regionCountriesData,
      isFetching: regionCountriesLoading,
      isSuccess: regionCountriesSuccess,
      isError: regionCountriesError,
    },
  ] = useLazyGetCountriesByRegionQuery();
  const [
    triggerFetchSubRegionCountries,
    {
      data: subRegionCountriesData,
      isFetching: subRegionCountriesLoading,
      isSuccess: subRegionCountriesSuccess,
      isError: subRegionCountriesError,
    },
  ] = useLazyGetCountriesBySubRegionQuery();

  // sesion storage keys
  const SORT_OPTION_KEY = "sortOptionKey";
  const REGION_OPTION_KEY = "regionFilterOptionKey";
  const SUBREGION_OPTION_KEY = "subregionFilterOptionKey";
  const SEARCH_OPTION_KEY = "searchFilterOptionKey";

  // get the filter and sort state from session storage
  const STORED_SORT_OPTION = sessionStorage.getItem(SORT_OPTION_KEY)
    ? JSON.parse(sessionStorage.getItem(SORT_OPTION_KEY))
    : "";
  const STORED_REGION_FILTER_OPTION = sessionStorage.getItem(REGION_OPTION_KEY)
    ? JSON.parse(sessionStorage.getItem(REGION_OPTION_KEY))
    : "";
  const STORED_SUBREGION_FILTER_OPTION = sessionStorage.getItem(
    SUBREGION_OPTION_KEY
  )
    ? JSON.parse(sessionStorage.getItem(SUBREGION_OPTION_KEY))
    : "";
  const STORED_SEARCH_FILTER_OPTION = sessionStorage.getItem(SEARCH_OPTION_KEY)
    ? JSON.parse(sessionStorage.getItem(SEARCH_OPTION_KEY))
    : "";

  // sort and filter state
  const [sortOption, setSortOption] = useState(STORED_SORT_OPTION);
  const [filterByRegionOption, setFilterByRegionOption] = useState(
    STORED_REGION_FILTER_OPTION
  );
  const [filterBySubRegionOption, setFilterBySubRegionOption] = useState(
    STORED_SUBREGION_FILTER_OPTION
  );
  const [filterSearchByNameOption, setFilterSearchByNameOption] = useState(
    STORED_SEARCH_FILTER_OPTION
  );

  // 'scroll to top' button state
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);

  // put the filter and sort state to the session storage
  useEffect(() => {
    sessionStorage.setItem(SORT_OPTION_KEY, JSON.stringify(sortOption));
  }, [sortOption]);

  useEffect(() => {
    sessionStorage.setItem(
      REGION_OPTION_KEY,
      JSON.stringify(filterByRegionOption)
    );
  }, [filterByRegionOption]);

  useEffect(() => {
    sessionStorage.setItem(
      SUBREGION_OPTION_KEY,
      JSON.stringify(filterBySubRegionOption)
    );
  }, [filterBySubRegionOption]);

  useEffect(() => {
    sessionStorage.setItem(
      SEARCH_OPTION_KEY,
      JSON.stringify(filterSearchByNameOption)
    );
  }, [filterSearchByNameOption]);

  // trigger api request when filter by region and subregion change
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

  // show the 'scroll to top' button when the user has started to scroll down a little
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowBackToTopButton(true);
      } else {
        setShowBackToTopButton(false);
      }
    });
  }, []);

  // scroll to top on click event
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // manage the data and rendering it based on the selected sort or filter option
  let renderData;
  let countryData;

  if (
    allCountriesLoading ||
    regionCountriesLoading ||
    subRegionCountriesLoading
  ) {
    renderData = <HomeLoading />;
  } else if (
    allCountriesError ||
    regionCountriesError ||
    subRegionCountriesError
  ) {
    renderData = <Error />;
  } else if (
    allCountriesSuccess ||
    regionCountriesSuccess ||
    subRegionCountriesSuccess
  ) {
    if (!filterByRegionOption && allCountriesData) {
      countryData = [...allCountriesData];
    }

    if (filterByRegionOption && regionCountriesData) {
      countryData = [...regionCountriesData];
    }

    if (filterBySubRegionOption && subRegionCountriesData) {
      countryData = [...subRegionCountriesData];
    }

    if (sortOption) {
      countryData?.sort((a, b) => {
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
      countryData = countryData?.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(filterSearchByNameOption.toLowerCase())
      );
    }

    renderData = countryData?.map((country, index) => (
      <li className="card-list" key={index}>
        <Link
          className="link-card"
          title="Click to view more details."
          to={`details/${country.name.common}`}
        >
          <Card country={country} />
        </Link>
      </li>
    ));
  }

  // extract the regions and subregions data to be rendered in the filters dropdown options
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

      {/* 'scroll to top' button */}
      {showBackToTopButton && (
        <button
          className="back-to-top-button"
          onClick={scrollToTop}
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
}
