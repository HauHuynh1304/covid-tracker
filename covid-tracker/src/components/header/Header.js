import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import "./Header.css";

function Header() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        })
        .catch((e) => console.log("error", e));
    };
    getCountriesData();
  }, []);
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };
  return (
    <div className="header">
      <h1>COVID 19 TRACKER</h1>
      <FormControl>
        <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="Worldwide">Worldwide</MenuItem>
          {countries.map((country, index) => (
            <MenuItem value={country.value} key={index}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;
