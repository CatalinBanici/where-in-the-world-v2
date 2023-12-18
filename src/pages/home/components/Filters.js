// REACT
import React, { useEffect, useRef, useState } from "react";

// REACT ICONS
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";

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
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const filtersRef = useRef();
  const filterButtonRef = useRef();

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
          <h3>Total countries: {renderData.length}</h3>
        </div>
      </div>

      <div className="filters-menu" ref={filterButtonRef}>
        <button onClick={() => setFilterMenuOpen(!filterMenuOpen)}>
          <span>Filters</span>
          <span>
            <AiOutlineMenu />
          </span>
          <span>
            <AiFillCaretDown />
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
            <AiFillCaretDown />
          </span>
        </div>

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
            <AiFillCaretDown />
          </span>
        </div>

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
            <AiFillCaretDown />
          </span>
        </div>

        <button
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
