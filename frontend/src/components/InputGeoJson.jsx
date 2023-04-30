/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Logo from "../shared/assets/logoUpload.svg";

function InputGeoJson({ setJsonObject }) {
  const handleFileChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      try {
        const inputJson = JSON.parse(reader.result);
        setJsonObject(inputJson);
      } catch (error) {
        console.error("Erro ao analisar JSON:", error);
      }
    };
  };

  return (
    <>
      <label
        htmlFor="jsonFileInput"
        css={css`
          display: inline-block;
          background-image: url(${Logo});
          background-size: 70%;
          background-position: center;
          padding: 10px 20px;
          cursor: pointer;
          background-repeat: no-repeat;
        `}
      />
      <input
        type="file"
        id="jsonFileInput"
        name="jsonFileInput"
        accept="application/.geojson"
        onChange={handleFileChange}
        css={css`
          border: none;
          display: block;
          width: 0;
          height: 0;
          opacity: 0;
        `}
      />
    </>
  );
}

export default InputGeoJson;
