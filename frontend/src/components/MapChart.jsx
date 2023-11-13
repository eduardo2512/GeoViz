import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import * as d3 from "d3";
import MapChartService from "../services/MapChartService";
import ModalComponente from "../shared/components/ModalComponente";
import { dicionarioMapBox } from "../shared/utils/DicionarioMapBox";

import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "leaflet-easybutton/src/easy-button.css";
import "leaflet-easybutton";
import "font-awesome/css/font-awesome.min.css";

import "leaflet.heat/dist/leaflet-heat"; // Import leaflet-heat.css

function MapChart({
  data,
  categoria,
  detalhes,
  filterTreemapCategoria,
  filterTreemapDetalhes,
  valor
}) {
  const mapboxToken =
    "pk.eyJ1IjoiZWR1YXJkbzI1MTIiLCJhIjoiY2xtdjh5ZGtqMGZtZzJrdDN4b2J4aXA4aCJ9.rQGZBuiqTXv85WZuZj7oRg";
  const mapRef = useRef(null);

  const [mapBox, setMapBox] = useState("Streets");
  const [visualizacao, setVisualizacao] = useState("Mapa normal");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  function getColor(valorAtual, maiorValor, menorValor) {
    const valor = maiorValor - menorValor;
    const cor =
      valorAtual > valor * 0.85
        ? "#800026"
        : valorAtual > valor * 0.7
        ? "#BD0026"
        : valorAtual > valor * 0.6
        ? "#E31A1C"
        : valorAtual > valor * 0.4
        ? "#FC4E2A"
        : valorAtual > valor * 0.2
        ? "#FD8D3C"
        : valorAtual > valor * 0.1
        ? "#FEB24C"
        : valorAtual > valor * 0.05
        ? "#FED976"
        : "#FFEDA0";

    return cor;
  }

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

    const map = L.map(mapRef.current, { fullscreenControl: true }).setView([-14.235, -51.9253], 4);

    const dataValues =
      valor !== "" ? filterData["features"].map(data => data["properties"][valor]) : [];
    const min = Math.min(...dataValues);
    const max = Math.max(...dataValues);

    L.tileLayer(
      `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`,
      {
        maxZoom: 18,
        id: dicionarioMapBox[mapBox],
        tileSize: 512,
        zoomOffset: -1
      }
    ).addTo(map);

    if (visualizacao === "Mapa normal" || visualizacao === "Mapa de coroplético") {
      const geoJsonLayer = L.geoJSON(null, {
        style: feature => {
          const fillColor =
            visualizacao === "Mapa de coroplético" && valor !== ""
              ? getColor(feature["properties"][valor], max, min)
              : "#ff7800";

          return {
            fillColor: fillColor,
            weight: 2,
            opacity: 1,
            color: MapChartService.obterTipoMapa(data) === "MultiLineString" ? "#ff7800" : "white",
            dashArray: "3",
            fillOpacity: 0.7
          };
        },
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 8,
            fillColor:
              visualizacao === "Mapa de coroplético" && valor !== ""
                ? getColor(feature["properties"][valor], max, min)
                : "#ff7800",
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
    }

    L.easyButton("fa-cog", handleOpen).addTo(map);

    if (visualizacao === "Mapa de calor") {
      const mapaDeCalor = MapChartService.obterMapaDeCalor(filterData);

      var heatmap = L.heatLayer(mapaDeCalor, {
        radius: calcularRaioPorZoom(map.getZoom()),
        minOpacity: 0.4,
        gradient: { 0.4: "blue", 0.65: "lime", 1: "red" },
        scaleRadius: true
      }).addTo(map);

      map.on("zoomend", function () {
        heatmap.setOptions({ radius: calcularRaioPorZoom(map.getZoom()) });
      });
    }

    return () => {
      map.remove();
    };
  }, [
    data,
    categoria,
    detalhes,
    filterTreemapCategoria,
    filterTreemapDetalhes,
    valor,
    mapBox,
    visualizacao
  ]);

  function calcularRaioPorZoom(zoom) {
    // Mapeie os níveis de zoom para valores de raio desejados
    var niveisDeZoom = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    const raios = [
      1.5625, 3.125, 6.25, 12.5, 25, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200,
      102400, 204800
    ];
    // Encontre o índice correspondente ao nível de zoom atual
    var indice = niveisDeZoom.indexOf(zoom);

    // Se o nível de zoom não estiver na lista, use o raio máximo
    if (indice === -1) {
      indice = niveisDeZoom.length - 1;
    }

    // Retorne o valor do raio correspondente ao nível de zoom atual
    return raios[indice];
  }

  return (
    <div style={{ width: "50%" }}>
      <div id="MapChart" ref={mapRef} style={{ height: "95%" }} />
      {open && (
        <ModalComponente
          open={open}
          setOpen={setOpen}
          mapBox={mapBox}
          setMapBox={setMapBox}
          visualizacao={visualizacao}
          setVisualizacao={setVisualizacao}
          disabledMapaCoropletico={valor === ""}
          disabledMapaDeCalor={MapChartService.obterTipoMapa(data) !== "Point"}
        />
      )}
    </div>
  );
}

export default MapChart;
