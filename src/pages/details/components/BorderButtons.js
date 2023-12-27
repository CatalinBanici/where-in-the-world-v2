import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLazyGetCountriesByCodesQuery } from "../../../redux/api/countriesApi";
import "./borderButtons.css";

export default function BorderButtons({ countryDetailsData }) {
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
    console.log("codes effect ran");
  }, [borderString]);

  const loadingOrError = true;

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
