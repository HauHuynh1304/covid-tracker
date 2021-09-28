import React, { useEffect, useState } from "react";
import { useStateValue } from "../../utils/redux/StateProvider";
import BoxInfo from "../box-info/BoxInfo";
import "./BoxInfoCovid.css";
import numeral from "numeral";
import { prettyPrintStat } from "../../utils/show-data-on-map/ShowDataOnMap";

function BoxInfoCovid() {
  const [{ countryState, casesType }, dispatch] = useStateValue();
  const [countryInfo, setCountryInfo] = useState({});

  const setCasesType = (casesType) => {
    dispatch({
      type: "SET_CASES_TYPE",
      casesType: casesType,
    });
  };

  useEffect(() => {
    const getDataCovid = async () => {
      const url =
        countryState === "Worldwide" || !countryState
          ? "https://disease.sh/v3/covid-19/all"
          : `https://disease.sh/v3/covid-19/countries/${countryState?.name}`;
      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setCountryInfo(data);
        });
    };
    getDataCovid();
  }, [countryState?.name]); // wait for update countryState then run async function

  return (
    <div className="box__info__covid">
      <BoxInfo
        onClick={(e) => setCasesType("cases")}
        title="Coronavirus Cases"
        isRed
        active={casesType === "cases"}
        cases={prettyPrintStat(countryInfo.todayCases)}
        total={numeral(countryInfo.cases).format("0.0a")}
      />
      <BoxInfo
        onClick={(e) => setCasesType("recovered")}
        title="Recovered"
        active={casesType === "recovered"}
        cases={prettyPrintStat(countryInfo.todayRecovered)}
        total={numeral(countryInfo.recovered).format("0.0a")}
      />
      <BoxInfo
        onClick={(e) => setCasesType("deaths")}
        title="Deaths"
        isRed
        active={casesType === "deaths"}
        cases={prettyPrintStat(countryInfo.todayDeaths)}
        total={numeral(countryInfo.deaths).format("0.0a")}
      />
    </div>
  );
}

export default BoxInfoCovid;
