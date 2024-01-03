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
    countryDetailsSuccess && countryDetailsData[0]?.name?.nativeName;
  const nativeNameKeys = nativeName && Object.keys(nativeName);
  const nativeNameValues =
    nativeName && Object.values(nativeName).map((e) => e.common);

  console.log("countryDetailsData", countryDetailsData);

  const loading = true;

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
                src={countryDetailsData[0]?.flags?.png}
                alt={
                  countryDetailsData[0]?.flags?.alt ||
                  `Flag of ${countryDetailsData[0]?.name?.common}`
                }
              />
            </div>
            <div className="details">
              <h2>{countryDetailsData[0]?.name?.common}</h2>
              <ul className="details-wrapper">
                <li>
                  <strong> Native Names: </strong>
                  {(nativeName && (
                    <div className="native-names-container">
                      <div className="native-names-keys">
                        {nativeNameKeys?.map((e, i) => (
                          <div key={i}>{e}:</div>
                        ))}
                      </div>
                      <div className="native-names-values">
                        {nativeNameValues?.map((e, i) => (
                          <div key={i}>{e}</div>
                        ))}
                      </div>
                    </div>
                  )) || <div>none</div>}
                </li>
                <li>
                  <strong>Population: </strong>
                  {countryDetailsData[0]?.population
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                </li>
                <li>
                  <strong>Region: </strong>
                  {countryDetailsData[0]?.region || "none"}
                </li>
                <li>
                  <strong>Sub Region: </strong>
                  {countryDetailsData[0]?.subregion || "none"}
                </li>
                <li>
                  <strong>Capital: </strong>
                  {countryDetailsData[0]?.capital || "none"}
                </li>
                <li>
                  <strong>Top Level Domain: </strong>
                  {countryDetailsData[0]?.tld?.map((item) => item).join("; ") ||
                    "none"}
                </li>
                <li>
                  <strong>Currencies: </strong>
                  {(countryDetailsData[0]?.currencies &&
                    Object.keys(countryDetailsData[0]?.currencies).join(
                      "; "
                    )) ||
                    "none"}
                </li>
                <li>
                  <strong>Languages: </strong>
                  {(countryDetailsData[0]?.languages &&
                    Object.values(countryDetailsData[0]?.languages).join(
                      "; "
                    )) ||
                    "none"}
                </li>
              </ul>
              <div className="google-maps">
                <p>
                  View on{" "}
                  <Link
                    target="blank"
                    to={countryDetailsData[0]?.maps?.googleMaps}
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
