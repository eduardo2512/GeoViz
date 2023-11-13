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
import { DICIONARIO_ANO_TABELA } from "../shared/utils/DicionarioAnoTabela";

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
  const [filterTreemapCategoria, setFilterTreemapCategoria] = useState("");
  const [filterTreemapDetalhes, setFilterTreemapDetalhes] = useState("");
  const [slider, setSlider] = useState(0);

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
    setCategoria("");
    setDetalhes("");
    setValor("");
    setCalculoValor("");
    setDisableFilters(false);
    setFilterTreemapDetalhes("");
    setFilterTreemapCategoria("");

    if (event.target.value === uploadGeoJsonObject?.name) {
      setSelectedGeoJsonObject(uploadGeoJsonObject);
    } else {
      if (event.target.value === "eleicoes_presidente_haddadlula") {
        const tabela = `eleicoes_presidente_haddadlula_${DICIONARIO_ANO_TABELA["eleicoes_presidente_haddadlula"][0]}`;
        const geojson = await GeoService.getGeoJson(tabela);
        setSlider(DICIONARIO_ANO_TABELA["eleicoes_presidente_haddadlula"][0]);
        setSelectedGeoJsonObject(geojson);
      } else if (event.target.value === "eleicoes_presidente_bolsonaro") {
        const tabela = `eleicoes_presidente_bolsonaro_${DICIONARIO_ANO_TABELA["eleicoes_presidente_bolsonaro"][0]}`;
        const geojson = await GeoService.getGeoJson(tabela);
        setSlider(DICIONARIO_ANO_TABELA["eleicoes_presidente_bolsonaro"][0]);
        setSelectedGeoJsonObject(geojson);
      } else if (event.target.value === "cobertura_vacinal_bcg") {
        const tabela = `cobertura_vacinal_bcg_${DICIONARIO_ANO_TABELA["cobertura_vacinal_bcg"][0]}`;
        const geojson = await GeoService.getGeoJson(tabela);
        setSlider(DICIONARIO_ANO_TABELA["cobertura_vacinal_bcg"][0]);
        setSelectedGeoJsonObject(geojson);
      } else if (event.target.value === "cobertura_vacinal_febre_amarela") {
        const tabela = `cobertura_vacinal_febre_amarela_${DICIONARIO_ANO_TABELA["cobertura_vacinal_febre_amarela"][0]}`;
        const geojson = await GeoService.getGeoJson(tabela);
        setSlider(DICIONARIO_ANO_TABELA["cobertura_vacinal_febre_amarela"][0]);
        setSelectedGeoJsonObject(geojson);
      } else {
        const geojson = await GeoService.getGeoJson(event.target.value);
        setSelectedGeoJsonObject(geojson);
      }
    }
  };

  const handleSlider = async () => {
    const tabela = `${optionMapGeoJson}_${slider}`;
    const geojson = await GeoService.getGeoJson(tabela);
    setSelectedGeoJsonObject(geojson);
  };

  useEffect(() => {
    handleSlider();
  }, [slider, setSlider]);

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
    setFilterTreemapDetalhes("");
    setFilterTreemapCategoria("");
    handleClearValor();
  };

  const handleClearCategoria = _ => {
    setCategoria(null);
    setDetalhes(null);
    setValor(null);
    setCalculoValor(null);
    setFilterTreemapDetalhes("");
    setFilterTreemapCategoria("");
  };

  const handleChangeDetalhes = event => {
    if (event.target.value === "Nenhuma opção disponível") return;
    setDetalhes(event.target.value);
    setFilterTreemapDetalhes("");
    setFilterTreemapCategoria("");
  };

  const handleClearDetalhes = _ => {
    setDetalhes(null);
    setFilterTreemapDetalhes("");
    setFilterTreemapCategoria("");
  };

  const handleChangeValor = event => {
    if (event.target.value === "Nenhuma opção disponível") return;
    setValor(event.target.value);
    setCalculoValor(null);
  };

  const handleClearValor = _ => {
    setValor("");
    setCalculoValor("");
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
        optionMapGeoJson={optionMapGeoJson}
        slider={slider}
        setSlider={setSlider}
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
          {selectedGeoJsonObject ? (
            <MapChart
              data={selectedGeoJsonObject}
              categoria={categoria}
              detalhes={detalhes}
              filterTreemapCategoria={filterTreemapCategoria}
              filterTreemapDetalhes={filterTreemapDetalhes}
              valor={valor}
              key={categoria || detalhes || valor || selectedGeoJsonObject}
            />
          ) : (
            <></>
          )}
          {selectedGeoJsonObject && categoria && valor && calculoValor ? (
            <TreemapChart
              data={selectedGeoJsonObject}
              categoria={categoria}
              detalhes={detalhes}
              valor={valor}
              calculoValor={calculoValor}
              filterTreemapCategoria={filterTreemapCategoria}
              filterTreemapDetalhes={filterTreemapDetalhes}
              setFilterTreemapCategoria={setFilterTreemapCategoria}
              setFilterTreemapDetalhes={setFilterTreemapDetalhes}
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
