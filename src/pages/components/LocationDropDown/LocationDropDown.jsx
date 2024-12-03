import React, { useState, useEffect } from "react";
import { GetCountries, GetState, GetCity } from "react-country-state-city";

import "./LocationDropDown.css";

export default function LocationDropDown({ handleDropdownChange }) {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);
  const [location, setLocation] = useState({ country: "", state: "", city: "" });

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  // Fetch countries on mount
  useEffect(() => {
    GetCountries()
      .then((countries) => {
        setCountriesList(countries);
        const defaultCountry = countries.find((c) => c.name === "India");

        if (defaultCountry) {
          setCountryid(defaultCountry.id);
          setLocation((prev) => ({ ...prev, country: defaultCountry.name }));
          fetchStates(defaultCountry.id);
        }
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Fetch states based on selected country
  const fetchStates = (countryId) => {
    GetState(countryId)
      .then((states) => {
        setStateList(states);
        if (states.length > 0) {
          const defaultState = states[0];
          setStateid(defaultState.id);
          setLocation((prev) => ({ ...prev, state: defaultState.name }));
          fetchCities(countryId, defaultState.id);
        }
      })
      .catch((error) => console.error("Error fetching states:", error));
  };

  // Fetch cities based on selected state
  const fetchCities = (countryId, stateId) => {
    GetCity(countryId, stateId)
      .then((cities) => {
        setCityList(cities);
        if (cities.length > 0) {
          const defaultCity = cities[0];
          setCityid(defaultCity.id);
          setLocation((prev) => ({ ...prev, city: defaultCity.name }));
        }
      })
      .catch((error) => console.error("Error fetching cities:", error));
  };

  const handleCountryChange = (e) => {
    const selectedCountry = countriesList[e.target.value];
    setCountryid(selectedCountry.id);
    setStateList([]); // Reset state list
    setCityList([]); // Reset city list
    setLocation((prev) => ({ ...prev, country: selectedCountry.name, state: "", city: "" }));
    fetchStates(selectedCountry.id);
  };
  
  const handleStateChange = (e) => {
    const selectedState = stateList.find((state) => state.id === parseInt(e.target.value));
    setStateid(selectedState.id);
    setCityList([]); // Reset city list
    setLocation((prev) => ({ ...prev, state: selectedState.name, city: "" }));
    fetchCities(countryid, selectedState.id);
  };
  
  const handleCityChange = (e) => {
    const selectedCity = cityList.find((city) => city.id === parseInt(e.target.value));
    setCityid(selectedCity.id);
    setLocation((prev) => ({ ...prev, city: selectedCity.name }));
  };
  
  useEffect(() => {
    handleDropdownChange(location);
  }, [location]);
  
  return (
    <div className="input_dropdowns row d-flex flex-row g-2 p-0 mb-4">
      {/* Country Dropdown */}
      <div className="col-md-4 d-md-flex flex-column">
        <label className="input_label_c" htmlFor="country">
          <h5>Country</h5>
        </label>
        <select
          id="country"
          className="input_select_c"
          onChange={handleCountryChange}
          value={countriesList.findIndex((c) => c.id === countryid)}
        >
          {countriesList.map((item, index) => (
            <option key={item.id} value={index}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* State Dropdown */}
      <div className="col-md-4 d-flex flex-column">
        <label className="input_label_c" htmlFor="state">
          <h5>State</h5>
        </label>
        <select
          id="state"
          disabled={stateList.length === 0}
          className="input_select_c"
          onChange={handleStateChange}
          value={stateid}
        >
          {stateList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      <div className="col-md-4 d-flex flex-column">
        <label className="input_label_c" htmlFor="city">
          <h5>City</h5>
        </label>
        <select
          id="city"
          disabled={cityList.length === 0}
          className="input_select_c"
          onChange={handleCityChange}
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
