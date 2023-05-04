import React, { useEffect, useRef } from "react";
import L from "leaflet";
import * as d3 from "d3";

import "leaflet/dist/leaflet.css";

function MapChart({ data }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current, {}).setView([-14.235, -51.9253], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18
    }).addTo(map);

    const geoJsonLayer = L.geoJSON(null, {
      style: feature => {
        const color = d3.interpolateYlOrRd(Math.random());
        return { color };
      },
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 8,
          fillColor: "#ff7800",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
      }
    }).addTo(map);

    geoJsonLayer.addData(data);

    return () => {
      map.remove();
    };
  }, [data]);

  return <div id="MapChart" ref={mapRef} style={{ height: "400px", width: "50%" }} />;
}

export default MapChart;
