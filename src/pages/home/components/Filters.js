// REACT
import React, { useEffect, useRef, useState } from "react";

// REACT ICONS
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";

// STYLES
import "./filters.css";

export default function Filters({
  renderData,
  subRegionsArray,
  regionsArray,
  sortOption,
  setSortOption,
  filterByRegionOption,
  setFilterByRegionOption,
  filterBySubRegionOption,
  setFilterBySubRegionOption,
  filterSearchByNameOption,
  setFilterSearchByNameOption,
}) {
  // toggle open the filters menu on mobile display
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  // ref to the jsx elements that will manage the functionality to close the filters menu when the user clicks outside of it
  const filtersRef = useRef();
  const filterButtonRef = useRef();

  // functionality to close the filters menu when the user clicks outside of it (on mobile display)
  useEffect(() => {
    function closeOnOutsideClick(e) {
      if (
        filterMenuOpen &&
        filtersRef.current &&
        !filtersRef.current.contains(e.target) &&
        !filterButtonRef.current.contains(e.target)
      ) {
        setFilterMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, [filterMenuOpen]);

  return (
    <>
      <div className="search-total-container">
        {/* search input */}
        <div className="search-input-container">
          <span>
            <AiOutlineSearch />
          </span>
          <input
            type="search"
            placeholder="Search"
            value={filterSearchByNameOption}
            onChange={(e) => setFilterSearchByNameOption(e.target.value)}
          />
        </div>

        <div className="total-container">
          <h3>Total countries: {renderData?.length}</h3>
        </div>
      </div>

      {/* button that open and close the filters menu on mobile display */}
      <div className="filters-menu" ref={filterButtonRef}>
        <button onClick={() => setFilterMenuOpen(!filterMenuOpen)}>
          <span>Filters</span>
          <span>
            <AiOutlineMenu />
          </span>
          <span>
            {filterMenuOpen === true ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </button>
      </div>

      <div
        ref={filtersRef}
        className={`select-wrapper ${
          filterMenuOpen === true
            ? "select-wrapper-open"
            : "select-wrapper-closed"
        }`}
      >
        {/* sort option */}
        <div className="select-input-container">
          <label htmlFor="countrySorting">Sort by</label>
          <select
            id="countrySorting"
            name="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">None</option>
            <option value="pop+">Population 0 - 9</option>
            <option value="pop-">Population 9 - 0</option>
            <option value="name+">Name A - Z</option>
            <option value="name-">Name Z - A</option>
          </select>
          <span>
            <FaAngleDown />
          </span>
        </div>

        {/* filter by region option */}
        <div className="select-input-container">
          <label htmlFor="regionFilters">Filter by Region</label>
          <select
            id="regionFilters"
            name="filters"
            value={filterByRegionOption}
            onChange={(e) => {
              setFilterByRegionOption(e.target.value);
              setFilterBySubRegionOption("");
              setFilterSearchByNameOption("");
            }}
          >
            <option value="">All</option>
            {regionsArray.map((region, index) => (
              <option key={index}>{region}</option>
            ))}
          </select>
          <span>
            <FaAngleDown />
          </span>
        </div>

        {/* filter by subregion option */}
        <div className="select-input-container">
          <label htmlFor="subregionFilters">Filter by Subregion</label>
          <select
            id="subregionFilters"
            name="filters"
            value={filterBySubRegionOption}
            onChange={(e) => {
              setFilterBySubRegionOption(e.target.value);
              setFilterSearchByNameOption("");
            }}
          >
            <option value="">All</option>
            {subRegionsArray.map((subregion, index) => (
              <option key={index}>{subregion}</option>
            ))}
          </select>
          <span>
            <FaAngleDown />
          </span>
        </div>

        {/* clear filters button */}
        <button
          title="Clear Filters"
          className="clear-button"
          onClick={(e) => {
            setFilterByRegionOption("");
            setFilterBySubRegionOption("");
            setSortOption("");
            setFilterSearchByNameOption("");
          }}
        >
          Clear
        </button>
      </div>
    </>
  );
}
