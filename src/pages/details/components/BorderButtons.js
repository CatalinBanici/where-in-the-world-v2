// REACT
import React, { useEffect } from "react";

// REACT ROUTER
import { Link } from "react-router-dom";

// REDUX
import { useLazyGetCountriesByCodesQuery } from "../../../redux/api/countriesApi";

// STYLES
import "./borderButtons.css";

export default function BorderButtons({ countryDetailsData }) {
  // data from the api based on codes endpoint, which is 'borderString' param
  const [
    triggerFetchCodesCountries,
    {
      data: countryCodesData,
      isFetching: countryCodesLoading,
      isSuccess: countryCodesSuccess,
      isError: countryCodesError,
    },
  ] = useLazyGetCountriesByCodesQuery();

  const borderString =
    countryDetailsData && countryDetailsData[0].borders?.join(",");

  useEffect(() => {
    borderString && triggerFetchCodesCountries(borderString);
  }, [borderString]);

  return (
    <div className="border-wrapper">
      <p>
        <strong>Border Countries: </strong>
      </p>
      <div>
        {(countryCodesLoading && <p>Loading Borders...</p>) ||
          (countryCodesError && <p>Error: Could not get Borders Data</p>) ||
          (countryCodesSuccess &&
            countryCodesData?.map((element, index) => (
              <Link
                title={`Go to ${element.name?.common}`}
                key={index}
                to={`../details/${element.name?.common}`}
              >
                {element.name?.common}
              </Link>
            )))}
        {!borderString && <div>Island</div>}
      </div>
    </div>
  );
}
