/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useMemo } from "react";
import HeaderContent from "../shared/components/HeaderContent";
import FilterTreeMap from "../components/FilterTreeMap";
import BasicSelect from "../shared/components/BasicSelect";
import InputGeoJson from "../components/InputGeoJson";
import HomeService from "../services/HomeService";
import MapChart from "../components/MapChart";
import TreemapChart from "../components/TreemapChart";

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

  const handleChangeOptionsMapGeoJson = event => {
    if (event.target.value === "Nenhuma opção disponível") return;
    setOptionMapGeoJson(event.target.value);
    setDisableFilters(false);

    if (event.target.value === uploadGeoJsonObject.name) {
      setSelectedGeoJsonObject(uploadGeoJsonObject);
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
          : ["Soma"]
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

  const handleChangeDetalhes = event => {
    if (event.target.value === "Nenhuma opção disponível") return;
    setDetalhes(event.target.value);
  };

  const handleChangeValor = event => {
    if (event.target.value === "Nenhuma opção disponível") return;
    setValor(event.target.value);
    setCalculoValor("");
  };

  const handleChangeCalculoValor = event => {
    if (event.target.value === "Nenhuma opção disponível") return;
    setCalculoValor(event.target.value);
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
        detalhes={detalhes}
        handleChangeDetalhes={handleChangeDetalhes}
        valor={valor}
        handleChangeValor={handleChangeValor}
        calculoValor={calculoValor}
        handleChangeCalculoValor={handleChangeCalculoValor}
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
          {selectedGeoJsonObject ? <TreemapChart data={selectedGeoJsonObject} /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default Home;
