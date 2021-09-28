export const initialState = {
  countryState: "Worldwide",
  allCountriesCovidData: "",
  casesType: "cases",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_COUNTRY":
      return {
        ...state,
        countryState: action.countryState,
      };

    case "ADD_ALL_COUNTRY_COVID_DATA":
      return {
        ...state,
        allCountriesCovidData: action.allCountriesCovidData,
      };

    case "SET_CASES_TYPE":
      return {
        ...state,
        casesType: action.casesType,
      };

    default:
      return state;
  }
};

export default reducer;
