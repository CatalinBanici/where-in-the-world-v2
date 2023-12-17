// REACT
import React from "react";

// REACT ICONS
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";

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
  function handleRegionFilterChange(e) {
    setFilterByRegionOption(e.target.value);
    setFilterBySubRegionOption("");
    setFilterSearchByNameOption("");
  }
  function handleSubRegionFilterChange(e) {
    setFilterBySubRegionOption(e.target.value);
    setFilterSearchByNameOption("");
  }
  function handleSortingChange(e) {
    setSortOption(e.target.value);
  }
  function handleSearchFilterChange(e) {
    setFilterSearchByNameOption(e.target.value);
  }
  function handleClearFiltersButton() {
    setFilterByRegionOption("");
    setFilterBySubRegionOption("");
    setSortOption("");
    setFilterSearchByNameOption("");
  }
  return (
    <>
      <div className="search-total-container">
        <div className="search-input-container">
          <span>
            <AiOutlineSearch />
          </span>
          <input
            type="search"
            placeholder="Search for a country..."
            value={filterSearchByNameOption}
            onChange={handleSearchFilterChange}
          />
        </div>

        <div className="total-container">
          <h3>Total countries: {renderData.length}</h3>
        </div>
      </div>

      <div className="select-wrapper">
        <div className="select-input-container">
          <label htmlFor="countrySorting">Sort by</label>
          <select
            id="countrySorting"
            name="sort"
            value={sortOption}
            onChange={handleSortingChange}
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
            onChange={handleRegionFilterChange}
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
            onChange={handleSubRegionFilterChange}
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

        <button className="clear-button" onClick={handleClearFiltersButton}>
          Clear
        </button>
      </div>
    </>
  );
}
