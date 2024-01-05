// REACT
import React from "react";

// REDUX
import { useGetCountryByNameQuery } from "../../redux/api/countriesApi";

// REACT ROUTER
import { useNavigate, useParams, Link } from "react-router-dom";

// REACT ICONS
import { IoIosArrowRoundBack } from "react-icons/io";

// STYLES
import "./details.css";

// COMPONENTS
import BorderButtons from "./components/BorderButtons";
import DetailsLoading from "../loading/DetailsLoading";
import Error from "../error/Error";

export default function Details() {
  const { nameParam } = useParams();
  const navigate = useNavigate();

  // data for a single country
  const {
    data: countryDetailsData,
    isFetching: countryDetailsLoading,
    isSuccess: countryDetailsSuccess,
    isError: countryDetailsError,
  } = useGetCountryByNameQuery(nameParam);

  // extract the native names and currencies from a country to be rendered in the jsx
  const nativeName =
    countryDetailsSuccess && countryDetailsData[0]?.name?.nativeName;
  const nativeNameObjectKeys = nativeName && Object.keys(nativeName);
  const nativeNameObjectValues =
    nativeName && Object.values(nativeName).map((e) => e.common);

  const currencies = countryDetailsSuccess && countryDetailsData[0]?.currencies;
  const currenciesObjectKeys = currencies && Object.keys(currencies);
  const currenciesObjectValues =
    currencies && Object.values(currencies).map((e) => e);

  const currencyName = currencies && currenciesObjectValues.map((e) => e.name);
  const currencySymbol =
    currencies && currenciesObjectValues.map((e) => e.symbol);

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
                        {nativeNameObjectKeys?.map((e, i) => (
                          <div key={i}>{e}:</div>
                        ))}
                      </div>
                      <div className="native-names-values">
                        {nativeNameObjectValues?.map((e, i) => (
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
                  <div className="currencies-container">
                    {(currencies && (
                      <>
                        <div className="currencies-symbol">
                          {currencySymbol?.map((e, i) => (
                            <div key={i}>{e}</div>
                          ))}
                        </div>
                        <div className="currencies">
                          {currenciesObjectKeys?.map((e, i) => (
                            <div key={i}>{e}</div>
                          ))}
                        </div>
                        <div className="currencies-name">
                          {currencyName?.map((e, i) => (
                            <div key={i}>{`(${e})`}</div>
                          ))}
                        </div>
                      </>
                    )) ||
                      "none"}
                  </div>
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
