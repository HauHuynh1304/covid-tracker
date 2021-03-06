import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "../../utils/show-data-on-map/ShowDataOnMap";
import "./Map.css";

function Map({ casesType, countries, center, zoom }) {
  return (
    <div className="map">
      {countries?.length > 0 && (
        <LeafletMap center={center} zoom={zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {showDataOnMap(countries, casesType)}
        </LeafletMap>
      )}
    </div>
  );
}

export default Map;
