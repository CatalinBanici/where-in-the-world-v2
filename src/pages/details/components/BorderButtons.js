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

  return (
    <div className="border-wrapper">
      <p>
        <strong>Border Countries: </strong>
      </p>
      <>
        {(countryCodesLoading && <div>loading borders</div>) ||
          (countryCodesError && <div>error borders</div>) ||
          (countryCodesSuccess &&
            countryCodesData?.map((element, index) => (
              <Link key={index} to={`../details/${element.name?.common}`}>
                {element.name?.common}
              </Link>
            )))}
        {!borderString && <div>no borders</div>}
      </>
    </div>
  );
}
