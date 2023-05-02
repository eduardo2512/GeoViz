/** @jsxImportSource @emotion/react */
import React, { useMemo } from "react";
import { css } from "@emotion/react";
import BasicSelect from "../shared/components/BasicSelect";

function FilterTreeMap({
  categoria,
  handleChangeCategoria,
  handleClearCategoria,
  detalhes,
  handleChangeDetalhes,
  handleClearDetalhes,
  valor,
  handleChangeValor,
  handleClearValor,
  calculoValor,
  handleChangeCalculoValor,
  handleClearCalculoValor,
  listOptions,
  disableFilters,
  optionsFilterCalcValue
}) {
  const disableFilterCalcValue = useMemo(() => (!valor ? true : false), [valor]);
  const listOptionsKey = useMemo(() => listOptions.map(option => option.key), [listOptions]);

  return (
    <aside
      css={css`
        display: flex;
        height: 100%;
        width: 220px;
      `}
    >
      <div
        css={css`
          display: flex;
          height: 100%;
          width: 222px;
          align-items: center;
          justify-content: flex-start;
          flex-direction: column;
          gap: 20px;
        `}
      >
        <h2
          css={css`
            color: #656d75;
            font-family: Raleway;
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            padding-top: 40px;
            padding-bottom: 50px;
          `}
        >
          Filtros
        </h2>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 50px;
          `}
        >
          <BasicSelect
            label={"Categoria"}
            listOptions={listOptionsKey}
            value={categoria}
            handleChange={handleChangeCategoria}
            disabled={disableFilters}
            handleClear={handleClearCategoria}
          />
          <BasicSelect
            label={"Detalhes"}
            listOptions={listOptionsKey}
            value={detalhes}
            handleChange={handleChangeDetalhes}
            disabled={disableFilters}
            handleClear={handleClearDetalhes}
          />
          <BasicSelect
            label={"Valor"}
            listOptions={listOptionsKey}
            value={valor}
            handleChange={handleChangeValor}
            disabled={disableFilters}
            handleClear={handleClearValor}
          />
          <BasicSelect
            label={"Cálculo valor"}
            listOptions={optionsFilterCalcValue}
            value={calculoValor}
            handleChange={handleChangeCalculoValor}
            disabled={disableFilterCalcValue}
            handleClear={handleClearCalculoValor}
          />
        </div>
      </div>
      <div
        css={css`
          height: 100%;
          width: 2px;
          background-color: #e3e8f1;
        `}
      />
    </aside>
  );
}

export default FilterTreeMap;
