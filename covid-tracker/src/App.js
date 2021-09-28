import React, { useEffect, useState } from "react";
import "./App.css";
import BoxInfoCovid from "./components/box-info-covid/BoxInfoCovid";
import Header from "./components/header/Header";
import LineGraph from "./components/line-graph/LineGraph";
import Map from "./components/map/Map";
import Table from "./components/table/Table";
import "leaflet/dist/leaflet.css";
import { useStateValue } from "./utils/redux/StateProvider";

function App() {
  const [{ countryState, allCountriesCovidData, casesType }] = useStateValue();
  const [mapCenter, setMapCenter] = useState({
    lat: 16.463713,
    lng: 107.590866,
  });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    if (countryState?.lat && countryState?.long) {
      setMapCenter([countryState.lat, countryState.long]);
      setMapZoom(4);
    }
  }, [
    countryState?.lat
      ? countryState?.lat
      : "16.463713" || countryState?.long
      ? countryState?.long
      : "107.590866",
  ]);

  return (
    <div className="app">
      <div className="app__left">
        <Header />
        <BoxInfoCovid />
        <Map
          casesType={casesType}
          countries={allCountriesCovidData}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <div className="app__right">
        <Table />
        <div>
          <h3 className="app__right__map__title">
            {countryState?.name?.length > 0 ? countryState.name : "Worldwide"}{" "}
            new {casesType}
          </h3>
          <LineGraph casesType={casesType} />
        </div>
      </div>
    </div>
  );
}

export default App;
