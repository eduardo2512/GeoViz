/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useMemo, useEffect } from "react";
import HeaderContent from "../shared/components/HeaderContent";
import FilterTreeMap from "../components/FilterTreeMap";
import BasicSelect from "../shared/components/BasicSelect";
import InputGeoJson from "../components/InputGeoJson";
import HomeService from "../services/HomeService";
import MapChart from "../components/MapChart";
import TreemapChart from "../components/TreemapChart";
import GeoService from "../services/GeoService";

function Home() {
  const [uploadGeoJsonObject, setUploadGeoJsonObject] = useState(null);
  const [selectedGeoJsonObject, setSelectedGeoJsonObject] = useState(null);
  const [optionMapGeoJson, setOptionMapGeoJson] = useState("");
  const [valores, setValores] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [valor, setValor] = useState("");
  const [calculoValor, setCalculoValor] = useState("");
  const [disableFilters, setDisableFilters] = useState(true);

  useEffect(() => {
    fetchDataOptions();
  }, []);

  async function fetchDataOptions() {
    const options = await GeoService.getOptions();
    setValores(...valores, options);
  }

  const handleChangeOptionsMapGeoJson = async event => {
    if (event.target.value === "Nenhuma opção disponível") return;
    setOptionMapGeoJson(event.target.value);
    setDisableFilters(false);

    if (event.target.value === uploadGeoJsonObject?.name) {
      setSelectedGeoJsonObject(uploadGeoJsonObject);
    } else {
      const geojson = await GeoService.getGeoJson(event.target.value);
      setSelectedGeoJsonObject(geojson);
    }
  };

  const valuesFilter = useMemo(
    () => HomeService.obterValoresFiltro(selectedGeoJsonObject),
    [selectedGeoJsonObject]
  );

  const optionsFilterCalcValue = useMemo(
    () =>
      valor && valuesFilter
        ? valuesFilter.find(value => value.key === valor)?.isCategorical
          ? ["Contagem"]
          : ["Soma", "Media", "Contagem"]
        : [],
    [valor, valuesFilter]
  );

  const handleSetUploadGeoJsonObject = jsonInput => {
    setUploadGeoJsonObject(jsonInput);
    setValores([...valores, jsonInput?.name]);
  };

  const handleChangeCategoria = event => {
    if (event.target.value === "Nenhuma opção disponível") return;
    setCategoria(event.target.value);
  };

  const handleClearCategoria = _ => {
    setCategoria(null);
    setDetalhes(null);
    setValor(null);
    setCalculoValor(null);
  };

  const handleChangeDetalhes = event => {
    if (event.target.value === "Nenhuma opção disponível") return;
    setDetalhes(event.target.value);
  };

  const handleClearDetalhes = _ => {
    setDetalhes(null);
  };

  const handleChangeValor = event => {
    if (event.target.value === "Nenhuma opção disponível") return;
    setValor(event.target.value);
    setCalculoValor(null);
  };

  const handleClearValor = _ => {
    setValor(null);
    setCalculoValor(null);
  };

  const handleChangeCalculoValor = event => {
    if (event.target.value === "Nenhuma opção disponível") return;
    setCalculoValor(event.target.value);
  };

  const handleClearCalculoValor = _ => {
    setCalculoValor(null);
  };

  const FilterMap = () => {
    return (
      <div
        css={css`
          display: flex;
          gap: 10px;
        `}
      >
        <BasicSelect
          label={"Pesquise ou insira seu geojson"}
          listOptions={valores}
          value={optionMapGeoJson}
          handleChange={handleChangeOptionsMapGeoJson}
          width={400}
        />

        <InputGeoJson setJsonObject={handleSetUploadGeoJsonObject} />
      </div>
    );
  };

  return (
    <div
      css={css`
        height: 100%;
        width: 100%;
        display: flex;
      `}
    >
      <FilterTreeMap
        categoria={categoria}
        handleChangeCategoria={handleChangeCategoria}
        handleClearCategoria={handleClearCategoria}
        detalhes={detalhes}
        handleChangeDetalhes={handleChangeDetalhes}
        handleClearDetalhes={handleClearDetalhes}
        valor={valor}
        handleChangeValor={handleChangeValor}
        handleClearValor={handleClearValor}
        calculoValor={calculoValor}
        handleChangeCalculoValor={handleChangeCalculoValor}
        handleClearCalculoValor={handleClearCalculoValor}
        listOptions={valuesFilter}
        disableFilters={disableFilters}
        optionsFilterCalcValue={optionsFilterCalcValue}
      />

      <div
        css={css`
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
        `}
      >
        <HeaderContent title={"Visualização geográfica com treemap"}>{<FilterMap />}</HeaderContent>
        <div
          css={css`
            display: flex;
            height: 100%;
            width: 100%;
            justify-content: space-around;
            padding-top: 20px;
          `}
        >
          {selectedGeoJsonObject ? <MapChart data={selectedGeoJsonObject} /> : <></>}
          {selectedGeoJsonObject && categoria && valor && calculoValor ? (
            <TreemapChart
              data={selectedGeoJsonObject}
              categoria={categoria}
              detalhes={detalhes}
              valor={valor}
              calculoValor={calculoValor}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
