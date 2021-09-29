import React, { useState, useEffect } from "react";
import "./Header.css";
import { useStateValue } from "../../utils/redux/StateProvider";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

function Header() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [, dispatch] = useStateValue();
  const filter = createFilterOptions();

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            lat: country.countryInfo.lat,
            long: country.countryInfo.long,
          }));
          setCountries(countries);
          dispatch({
            type: "ADD_ALL_COUNTRY_COVID_DATA",
            allCountriesCovidData: data,
          });
        })
        .catch((e) => e);
    };
    getCountriesData();
  }, []);

  useEffect(() => {
    dispatch({
      type: "ADD_COUNTRY",
      countryState: country,
    });
    setCountry(country);
  }, [country]);

  // const onCountryChange = async (event) => {
  //   const countryInfo = event.target.value;
  //   dispatch({
  //     type: "ADD_COUNTRY",
  //     countryState: countryInfo,
  //   });
  //   setCountry(countryInfo);
  // };

  // const onCountryChange = async (event) => {
  //   const countryInfo = event.target.value;
  //   dispatch({
  //     type: "ADD_COUNTRY",
  //     countryState: countryInfo,
  //   });
  //   setCountry(countryInfo);
  // };

  return (
    <div className="header">
      <h1>COVID 19 TRACKER</h1>
      <Autocomplete
        value={country}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setCountry({
              title: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setCountry({
              title: newValue.inputValue,
            });
          } else {
            setCountry(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.name
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={countries}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          if (!option.name) {
            return (option = "Country not Found");
          }
          // Regular option
          return option.name;
        }}
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Search Country" />
        )}
      />
      {/* <FormControl>
        <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="Worldwide">Worldwide</MenuItem>
          {countries.map((country, index) => (
            <MenuItem value={country} key={index}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
    </div>
  );
}

export default Header;
