import React, { useEffect, useRef } from "react";
import L from "leaflet";
import * as d3 from "d3";
import MapChartService from "../services/MapChartService";

import "leaflet/dist/leaflet.css";

function MapChart({ data, categoria, detalhes, filterTreemapCategoria, filterTreemapDetalhes }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const filterData = {
      ...data,
      features:
        filterTreemapCategoria !== ""
          ? filterTreemapDetalhes !== ""
            ? data.features.filter(
                f =>
                  f.properties[categoria] == filterTreemapCategoria &&
                  f.properties[detalhes] == filterTreemapDetalhes
              )
            : data.features.filter(f => f.properties[categoria] == filterTreemapCategoria)
          : data.features
    };

    const map = L.map(mapRef.current, {}).setView([-14.235, -51.9253], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18
    }).addTo(map);

    const geoJsonLayer = L.geoJSON(null, {
      style: feature => {
        const color = "#ff7800";
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
      },
      onEachFeature: function (feature, layer) {
        const tooltipContent = MapChartService.obterTooltipMapa(feature.properties);
        layer.bindTooltip(tooltipContent);
      }
    }).addTo(map);

    geoJsonLayer.addData(filterData);

    return () => {
      map.remove();
    };
  }, [data, categoria, detalhes, filterTreemapCategoria, filterTreemapDetalhes]);

  return <div id="MapChart" ref={mapRef} style={{ height: "400px", width: "50%" }} />;
}

export default MapChart;
