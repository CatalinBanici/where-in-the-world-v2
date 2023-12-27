import React, { useEffect } from "react";
import {
  useGetCountryByNameQuery,
  useLazyGetCountriesByCodesQuery,
} from "../../redux/api/countriesApi";
import { useNavigate, useParams, Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import "./details.css";
import BorderButtons from "./components/BorderButtons";
import DetailsLoading from "../loading/DetailsLoading";
import Error from "../error/Error";

export default function Details() {
  const { nameParam } = useParams();

  const {
    data: countryDetailsData,
    isFetching: countryDetailsLoading,
    isSuccess: countryDetailsSuccess,
    isError: countryDetailsError,
  } = useGetCountryByNameQuery(nameParam);

  const navigate = useNavigate();
  const nativeName =
    countryDetailsData &&
    Object.values(countryDetailsData[0]?.name.nativeName).pop();

  return (
    <>
      <div className="details-page">
        <div className="back-button-container">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <span>
              <IoIosArrowRoundBack />
            </span>
            Back
          </button>
        </div>
      </div>
      {(countryDetailsLoading && <DetailsLoading />) ||
        (countryDetailsError && <Error />) ||
        (countryDetailsSuccess && (
          <div className="extra-details-container">
            <div className="flag">
              <img
                src={countryDetailsData[0].flags.png}
                alt={
                  countryDetailsData[0].flags.alt ||
                  `Flag of ${countryDetailsData[0].name.common}`
                }
              />
            </div>
            <div className="details">
              <h2>{countryDetailsData[0].name.common}</h2>
              <ul className="details-wrapper">
                <li>
                  <strong> Native Names: </strong>
                  {Object.values(nativeName.common)}
                </li>
                <li>
                  <strong>Population: </strong>
                  {countryDetailsData[0].population
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                </li>
                <li>
                  <strong>Region: </strong>
                  {countryDetailsData[0].region}
                </li>
                <li>
                  <strong>Sub Region: </strong>
                  {countryDetailsData[0].subregion}
                </li>
                <li>
                  <strong>Capital: </strong>
                  {countryDetailsData[0].capital}
                </li>
                <li>
                  <strong>Top Level Domain: </strong>
                  {countryDetailsData[0].tld.map((item) => {
                    return item;
                  }) || "none"}
                </li>
                <li>
                  <strong>Currencies: </strong>
                  {Object.keys(countryDetailsData[0].currencies).join(", ")}
                </li>
                <li>
                  <strong>Languages: </strong>
                  {Object.values(countryDetailsData[0].languages).join(", ")}
                </li>
              </ul>
              <div className="google-maps">
                <p>
                  View on{" "}
                  <Link
                    target="blank"
                    to={countryDetailsData[0].maps.googleMaps}
                  >
                    Google Maps
                  </Link>
                </p>
              </div>
              <>
                <BorderButtons countryDetailsData={countryDetailsData} />
              </>
            </div>
          </div>
        ))}
    </>
  );
}
