import React, { useState, useEffect } from "react";
import { GetCountries, GetState, GetCity } from "react-country-state-city";

import "./LocationDropDown.css";

export default function LocationDropDown({ inputValue }) {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);

      const defaultCountry = result.find((country) => country.name === "India");

      setCountryid(defaultCountry.id);
      GetState(defaultCountry.id).then((states) => {
        setStateList(states);
        const defaultState = states.find(
          (state) => state.name === "Tamil Nadu"
        );
        setStateid(defaultState.id);
        GetCity(defaultCountry.id, defaultState.id).then((res) => {
          setCityList(res);
        });
      });
    });
  }, []);

  return (
    <div className="input_c d-flex  mb-4 row g-0 p-0 " >
      <div className="col d-md-flex flex-column p-0">
        <label className="input_label_c" htmlFor="country">
          <h5>Country</h5>
        </label>
        <select
          name="country"
          id="country"
          className="input_select_c"
          onChange={(e) => {
            console.log(e.target.value);
            const country = countriesList[e.target.value];
            console.log(stateList);
            setCountryid(country.id);
            GetState(country.id).then((result) => {
              setStateList(result);
            });
          }}
          value={countryid}
        >
          {countriesList.map((item, index) => (
            <option key={index} value={index}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col d-flex flex-column ms-2 p-0">
        <label className="input_label_c" htmlFor="state">
          <h5>State</h5>
        </label>
        <select
          name="state"
          id="state"
          className="input_select_c"
          onChange={(e) => {
            const stateId = e.target.value;
            console.log(stateId);
            console.log(stateList);
            const state = stateList.find((s) => s.id === parseInt(stateId));
            console.log(state);
            setStateid(state.id);
            GetCity(countryid, state.id).then((result) => {
              console.log("Fetched Cities: ", result);
              setCityList(result);
            });
          }}
          value={stateid}
        >
          {stateList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col d-flex flex-column ms-2 p-0">
        <label className="input_label_c" htmlFor="city">
          <h5>City</h5>
        </label>
        <select
          name="city"
          id="city"
          className="input_select_c"
          onChange={(e) => {
            const cityId = e.target.value;
            const city = cityList.find((s) => s.id === parseInt(cityId));
            setCityid(city.id);
          }}
          value={cityid}
        >
          {cityList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
